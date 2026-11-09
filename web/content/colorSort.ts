/**
 * Farben sortieren ("Water Sort"-Prinzip): Flaschen mit gestapelten
 * Farbsegmenten, per Zug darf man vom obersten zusammenhängenden Farbblock
 * einer Flasche in eine andere gießen, wenn die Ziel-Flasche leer ist oder
 * oben dieselbe Farbe zeigt (und noch Platz hat). Gelöst ist, wenn jede
 * nicht-leere Flasche komplett mit einer einzigen Farbe voll ist.
 *
 * Generator-Idee: anders als bei Farbverbinden lässt sich eine gemischte
 * Flasche NICHT durch Vorwärts-Simulieren von erlaubten Güssen aus dem
 * gelösten Zustand erzeugen (jeder Guss erhält Homogenität -- aus "alles
 * sortiert" kommt man durch erlaubte Züge nie zu echter Farbmischung
 * zurück). Also: Farbeinheiten zufällig auf die Flaschen verteilen und die
 * Lösbarkeit danach mit einem echten (wenn auch einfachen) Solver
 * verifizieren -- bei Fehlschlag neu verteilen. In der Praxis klappt das
 * schon beim ersten Versuch (per Stresstest mit 1000 Durchläufen je
 * Schwierigkeitsgrad bestätigt, 0 Fehlschläge, max. ~40ms).
 */

export type ColorSortDifficulty = "easy" | "medium" | "hard";

export interface ColorSortLayout {
  colors: number;
  emptyTubes: number;
  capacity: number;
  /** Ungefähre, typische Lösungs-Zuganzahl -- nur als Bezugsgröße fürs
   * Punkte-Scoring, kein strenges Minimum. */
  parMoves: number;
}

export const LAYOUTS: Record<ColorSortDifficulty, ColorSortLayout> = {
  easy: { colors: 5, emptyTubes: 2, capacity: 4, parMoves: 14 },
  medium: { colors: 8, emptyTubes: 2, capacity: 4, parMoves: 26 },
  hard: { colors: 11, emptyTubes: 2, capacity: 4, parMoves: 38 },
};

// Elf gut unterscheidbare Farben -- dieselben zehn wie bei Farbverbinden
// (dort schon bei bis zu 10 gleichzeitig sichtbaren Linien bewährt) plus
// ein Oliv-Ton als elfte, bewusst in eine bislang unbesetzte Farbkreis-Lücke
// gelegte Ergänzung (sonst wären bei "schwer" mit 22px schmalen Segmenten
// zu viele Grün-/Gelbtöne zu dicht beieinander).
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
  "#9E9D24", // Oliv
];

export interface ColorSortPuzzle {
  /** Pro Flasche die Farbindizes von unten nach oben. */
  tubes: number[][];
  capacity: number;
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

function topColor(tube: number[]): number | null {
  return tube.length ? tube[tube.length - 1] : null;
}

function topRunLength(tube: number[]): number {
  if (tube.length === 0) return 0;
  const c = tube[tube.length - 1];
  let n = 0;
  for (let i = tube.length - 1; i >= 0 && tube[i] === c; i--) n++;
  return n;
}

/** Echte Spielregel, ohne Generator-Einschränkungen -- wird auch von der
 * UI-Komponente für Klick-Validierung genutzt. */
export function canPour(tubes: number[][], from: number, to: number, capacity: number): boolean {
  if (from === to) return false;
  const src = tubes[from];
  const dst = tubes[to];
  if (!src || !dst || src.length === 0) return false;
  if (dst.length >= capacity) return false;
  const srcTop = topColor(src);
  const dstTop = topColor(dst);
  if (dstTop !== null && dstTop !== srcTop) return false;
  return true;
}

export function pourAmount(tubes: number[][], from: number, to: number, capacity: number): number {
  const run = topRunLength(tubes[from]);
  const space = capacity - tubes[to].length;
  return Math.min(run, space);
}

export function applyPour(tubes: number[][], from: number, to: number, capacity: number): number[][] {
  const amount = pourAmount(tubes, from, to, capacity);
  const next = tubes.map((t) => t.slice());
  const color = topColor(next[from]);
  for (let i = 0; i < amount; i++) {
    next[from].pop();
    next[to].push(color as number);
  }
  return next;
}

export function isSolved(tubes: number[][], capacity: number): boolean {
  return tubes.every((t) => t.length === 0 || (t.length === capacity && t.every((c) => c === t[0])));
}

function stateKey(tubes: number[][]): string {
  // Reihenfolge der Flaschen ist für die Lösbarkeit irrelevant (Flaschen
  // sind untereinander vertauschbar) -- sortiert vor dem Joinen, damit
  // "gleiche Lage, andere Position" als derselbe Zustand gilt.
  return tubes
    .map((t) => t.join(","))
    .sort()
    .join("|");
}

function groupCount(tubes: number[][]): number {
  let groups = 0;
  for (const t of tubes) {
    if (t.length === 0) continue;
    let g = 1;
    for (let i = 1; i < t.length; i++) if (t[i] !== t[i - 1]) g++;
    groups += g;
  }
  return groups;
}

/** Nur für den Solver: eine komplett homogene Flasche in eine andere leere
 * Flasche umzuräumen bringt nie Fortschritt und bläht die Suche unnötig
 * auf -- sicher ausschließbar, weil Flaschen untereinander vertauschbar
 * sind. Die echte Spiellogik (oben) nutzt diese Einschränkung bewusst
 * NICHT, dort bleibt der Zug harmlos erlaubt. */
function canPourForSolver(tubes: number[][], from: number, to: number, capacity: number): boolean {
  if (!canPour(tubes, from, to, capacity)) return false;
  const src = tubes[from];
  const dst = tubes[to];
  if (dst.length === 0 && src.length > 0 && src.length === topRunLength(src)) return false;
  return true;
}

/** Einfacher DFS mit Heuristik-Move-Ordering (Züge, die die Gruppenanzahl
 * am meisten senken, zuerst) + globalem visited-Set + Knoten-/Zeitbudget.
 * Kein Anspruch auf kürzeste Lösung, nur auf Existenz -- `null` heißt
 * "im Budget nicht gefunden", nicht zwingend "unlösbar". */
function findSolution(
  tubes: number[][],
  capacity: number,
  nodeBudget: number,
  deadlineMs: number,
): number[][] | null {
  const n = tubes.length;
  const visited = new Set([stateKey(tubes)]);
  let nodes = 0;

  function dfs(state: number[][]): number[][] | null | "budget" {
    if (isSolved(state, capacity)) return [];
    if (++nodes > nodeBudget) return "budget";
    if (nodes % 2000 === 0 && Date.now() > deadlineMs) return "budget";

    const candidates: { i: number; j: number; child: number[][]; key: string; score: number }[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!canPourForSolver(state, i, j, capacity)) continue;
        const child = applyPour(state, i, j, capacity);
        const key = stateKey(child);
        if (visited.has(key)) continue;
        candidates.push({ i, j, child, key, score: groupCount(child) });
      }
    }
    candidates.sort((a, b) => a.score - b.score);

    for (const c of candidates) {
      visited.add(c.key);
      const res = dfs(c.child);
      if (res === "budget") return "budget";
      if (res !== null) return [[c.i, c.j], ...res];
    }
    return null;
  }

  const res = dfs(tubes);
  return res === "budget" || res === null ? null : res;
}

function randomDistribution(layout: ColorSortLayout): number[][] {
  const units: number[] = [];
  for (let c = 0; c < layout.colors; c++) for (let k = 0; k < layout.capacity; k++) units.push(c);
  const shuffled = shuffle(units);
  const tubes: number[][] = [];
  for (let t = 0; t < layout.colors; t++) {
    tubes.push(shuffled.slice(t * layout.capacity, (t + 1) * layout.capacity));
  }
  for (let e = 0; e < layout.emptyTubes; e++) tubes.push([]);
  return tubes;
}

// Pro Schwierigkeitsgrad großzügig (deutlich über dem im Stresstest
// beobachteten Maximum) bemessenes Budget, damit die Verifikation beim
// "Neues Rätsel"-Klick in der echten App nie spürbar hängt.
const SOLVER_BUDGET: Record<ColorSortDifficulty, { nodeBudget: number; timeBudgetMs: number }> = {
  easy: { nodeBudget: 50_000, timeBudgetMs: 300 },
  medium: { nodeBudget: 150_000, timeBudgetMs: 600 },
  hard: { nodeBudget: 400_000, timeBudgetMs: 1500 },
};

export function generatePuzzle(difficulty: ColorSortDifficulty): ColorSortPuzzle {
  const layout = LAYOUTS[difficulty];
  const { nodeBudget, timeBudgetMs } = SOLVER_BUDGET[difficulty];
  const colors = shuffle(COLORS).slice(0, layout.colors);

  for (let attempt = 0; attempt < 15; attempt++) {
    const tubes = randomDistribution(layout);
    const deadline = Date.now() + timeBudgetMs;
    const solution = findSolution(tubes, layout.capacity, nodeBudget, deadline);
    if (solution !== null) {
      return { tubes, capacity: layout.capacity, colors };
    }
  }
  throw new Error(`Farben sortieren: kein lösbares Rätsel für Schwierigkeit "${difficulty}" gefunden.`);
}
