/**
 * Farbverbinden ("Color Connect"-Prinzip): farbige Punktepaare auf einem
 * Raster verbinden, Linien dürfen sich nicht kreuzen/verzweigen, gelöst ist
 * erst, wenn das GESAMTE Raster von Linien bedeckt ist.
 *
 * Generator-Idee: erst einen vollständigen Hamilton-Pfad über das ganze
 * Raster erzeugen (besucht jede Zelle genau einmal -- randomisierte Tiefen-
 * suche mit echtem Backtracking, rechteckige Raster sind dafür gutmütig
 * genug, dass das praktisch immer beim ersten Versuch klappt). Diesen Pfad
 * dann in so viele zusammenhängende Abschnitte zerschneiden, wie Farbpaare
 * gebraucht werden -- jeder Abschnitt ist automatisch eine gültige, nie
 * kreuzende Lösung, und zusammen decken sie garantiert jede Zelle ab. Dem
 * Spieler werden nur die beiden Enden jedes Abschnitts (die Punkte) gezeigt.
 */

export type ColorConnectDifficulty = "easy" | "medium" | "hard";

export interface ColorConnectLayout {
  cols: number;
  rows: number;
  pairs: number;
}

export const LAYOUTS: Record<ColorConnectDifficulty, ColorConnectLayout> = {
  easy: { cols: 6, rows: 8, pairs: 6 },
  medium: { cols: 8, rows: 9, pairs: 8 },
  hard: { cols: 8, rows: 9, pairs: 10 },
};

// Zehn gut unterscheidbare Farben -- mehr als die üblichen Noggl-Markenfarben
// hergeben, braucht dieses Spiel aber (bis zu 10 gleichzeitig sichtbare
// Linien bei "schwer").
export const COLORS: string[] = [
  "#E53935", // Rot
  "#1E88E5", // Blau
  "#43A047", // Grün
  "#FB8C00", // Orange
  "#8E24AA", // Lila
  "#D81B60", // Pink
  "#00ACC1", // Cyan
  "#6D4C41", // Braun
  "#283593", // Marineblau
  "#FDD835", // Gelb
];

export interface ColorConnectPuzzle {
  cols: number;
  rows: number;
  /** Pro Farbindex die beiden Endpunkt-Zellen (Raster-Index row*cols+col). */
  dots: [number, number][];
  /** Pro Farbindex die komplette Lösungs-Zellenfolge -- nie an den Spieler
   * zeigen, nur zur internen Validierung/für spätere Hinweise. */
  solution: number[][];
  colors: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function neighborsOf(cell: number, cols: number, rows: number): number[] {
  const r = Math.floor(cell / cols);
  const c = cell % cols;
  const out: number[] = [];
  if (r > 0) out.push(cell - cols);
  if (r < rows - 1) out.push(cell + cols);
  if (c > 0) out.push(cell - 1);
  if (c < cols - 1) out.push(cell + 1);
  return out;
}

/** Randomisierte Tiefensuche mit echtem Backtracking -- liefert `null`, wenn
 * dieser Versuch (mit diesem Zufalls-Startpunkt) in eine Sackgasse läuft;
 * der Aufrufer versucht es dann mit einem neuen Startpunkt erneut. */
function tryGenerateHamiltonianPath(cols: number, rows: number): number[] | null {
  const total = cols * rows;
  const visited = new Array(total).fill(false);
  const start = Math.floor(Math.random() * total);
  visited[start] = true;
  const path: number[] = [start];
  const optionsStack: number[][] = [orderCandidates(start, cols, rows, visited)];
  let steps = 0;
  const stepBudget = total * 400;

  while (path.length < total) {
    if (++steps > stepBudget) return null;
    const options = optionsStack[optionsStack.length - 1];
    let advanced = false;
    while (options.length > 0) {
      const candidate = options.pop()!;
      if (!visited[candidate]) {
        visited[candidate] = true;
        path.push(candidate);
        optionsStack.push(orderCandidates(candidate, cols, rows, visited));
        advanced = true;
        break;
      }
    }
    if (!advanced) {
      const removed = path.pop();
      if (removed === undefined) return null;
      visited[removed] = false;
      optionsStack.pop();
      if (path.length === 0) return null;
    }
  }
  return path;
}

/** Wie viele unbesuchte Nachbarn `cell` noch hat. */
function degreeOf(cell: number, cols: number, rows: number, visited: boolean[]): number {
  let d = 0;
  for (const n of neighborsOf(cell, cols, rows)) if (!visited[n]) d++;
  return d;
}

/** Warnsdorff-Regel (bekannt vom Springerproblem/Knight's Tour, genauso
 * wirksam für Hamilton-Pfade auf Gittern): zuerst die Kandidaten versuchen,
 * die selbst am wenigsten Anschlussmöglichkeiten übrig haben -- ein Zweig,
 * der sich sonst leicht abschnürt, wird dann gleich zuerst "aufgebraucht",
 * statt sich erst später als Sackgasse zu entpuppen und teures Backtracking
 * zu erzwingen. Zufällig gemischt vor dem (stabilen) Sortieren, damit
 * gleich-"enge" Kandidaten nicht immer in derselben Reihenfolge drankommen. */
function orderCandidates(cell: number, cols: number, rows: number, visited: boolean[]): number[] {
  const candidates = shuffle(neighborsOf(cell, cols, rows).filter((c) => !visited[c]));
  candidates.sort((a, b) => degreeOf(b, cols, rows, visited) - degreeOf(a, cols, rows, visited));
  // Stack-Reihenfolge: .pop() nimmt vom Ende -- also soll der am wenigsten
  // bewegliche Kandidat (niedrigster Grad) am Ende des Arrays stehen.
  return candidates;
}

function generateHamiltonianPath(cols: number, rows: number): number[] {
  for (let attempt = 0; attempt < 80; attempt++) {
    const path = tryGenerateHamiltonianPath(cols, rows);
    if (path) return path;
  }
  throw new Error(`Farbverbinden: kein Hamilton-Pfad für ${cols}x${rows} gefunden.`);
}

/** Zerschneidet den Pfad in `k` zusammenhängende Abschnitte (je mind. 2
 * Zellen), Längen zufällig verteilt statt gleich groß -- sonst sähe jede
 * Farbe gleich lang aus. */
function cutIntoSegments(path: number[], k: number): number[][] {
  const total = path.length;
  const minLen = 2;
  const lengths = new Array(k).fill(minLen);
  let remaining = total - minLen * k;
  while (remaining > 0) {
    const i = Math.floor(Math.random() * k);
    lengths[i]++;
    remaining--;
  }
  const segments: number[][] = [];
  let pos = 0;
  for (const len of lengths) {
    segments.push(path.slice(pos, pos + len));
    pos += len;
  }
  return shuffle(segments);
}

export function generatePuzzle(difficulty: ColorConnectDifficulty): ColorConnectPuzzle {
  const { cols, rows, pairs } = LAYOUTS[difficulty];
  const path = generateHamiltonianPath(cols, rows);
  const segments = cutIntoSegments(path, pairs);
  const colors = shuffle(COLORS).slice(0, pairs);
  const dots: [number, number][] = segments.map((seg) => [seg[0], seg[seg.length - 1]]);
  return { cols, rows, dots, solution: segments, colors };
}
