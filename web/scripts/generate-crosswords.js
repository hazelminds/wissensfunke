// Kreuzworträtsel-Generator: baut aus scripts/crossword-wordbank.js per
// Backtracking-Platzierung echte, sich kreuzende Rätselgitter (kein
// Zufalls-Layout, jede Antwort kreuzt sich korrekt mit ihren Nachbarn) und
// schreibt das Ergebnis als statischen Content nach content/crossword-data.ts
// -- dasselbe Muster wie die anderen "vorgenerierten Pool, rotiert nach
// Kalendertag"-Inhalte (dailyQuizSets, whoami-data, ...). Läuft einmalig,
// nicht Teil der laufenden App; bei Bedarf einfach erneut ausführen, um den
// Pool zu vergrößern.
//
// Aufruf: node scripts/generate-crosswords.js

const fs = require("fs");
const path = require("path");
const wordBank = require("./crossword-wordbank.js");

// Drei Schwierigkeitsstufen -- wie bei Schiebepuzzle/Wer-bin-ich. Jede hat
// ihre eigene Ziel-Wortzahl und ihr eigenes Gitter-Limit; MAX_DIMENSION
// steigt mit der Wortzahl, damit sich mehr Wörter noch sauber kreuzen können.
const TIERS = [
  {
    key: "leicht",
    targetPuzzles: 32,
    minWords: 9,
    targetWords: 14,
    wordsPerAttempt: 45,
    attemptsPerPuzzle: 40,
    maxDimension: 13,
  },
  {
    key: "mittel",
    targetPuzzles: 24,
    minWords: 15,
    targetWords: 17,
    wordsPerAttempt: 55,
    attemptsPerPuzzle: 60,
    maxDimension: 15,
  },
  {
    key: "schwer",
    targetPuzzles: 16,
    minWords: 25,
    targetWords: 29,
    wordsPerAttempt: 100,
    attemptsPerPuzzle: 150,
    maxDimension: 19,
  },
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function key(r, c) {
  return `${r},${c}`;
}

/** Prüft, ob `word` bei (row, col) in Richtung `dir` gültig platziert werden
 * kann: keine widersprüchlichen Buchstaben, keine ungewollten Berührungen
 * mit Nachbarwörtern (nur echte Kreuzungen sind erlaubt). */
function canPlace(word, row, col, dir, cells) {
  const len = word.length;
  // Zelle direkt vor/nach dem Wort muss leer sein (kein Anhängen an ein
  // längeres Wort). Für "down" ist die Zelle NACH dem Wort bei row + len
  // (der Zeile nach dem LETZTEN Buchstaben), nicht bei row + 1 -- das war
  // ein Bug: row + 1 prüfte nur die Zeile nach dem ERSTEN Buchstaben und
  // ließ Wörter direkt in ein anderes, bereits platziertes Wort hineinlaufen
  // (z. B. "TROMMEL" + das "S" von "KRANKENHAUS" wurde als "TROMMELS" sichtbar).
  if (dir === "across") {
    if (cells.has(key(row, col - 1)) || cells.has(key(row, col + len))) return false;
  } else {
    if (cells.has(key(row - 1, col)) || cells.has(key(row + len, col))) return false;
  }

  let hasIntersection = false;
  for (let i = 0; i < len; i++) {
    const r = dir === "across" ? row : row + i;
    const c = dir === "across" ? col + i : col;
    const existing = cells.get(key(r, c));
    if (existing !== undefined) {
      if (existing !== word[i]) return false;
      hasIntersection = true;
    } else {
      // Neue (nicht kreuzende) Zelle: die Nachbarn quer zur Laufrichtung
      // müssen leer sein, sonst würde das Wort ein Nachbarwort ungewollt
      // berühren.
      if (dir === "across") {
        if (cells.has(key(r - 1, c)) || cells.has(key(r + 1, c))) return false;
      } else {
        if (cells.has(key(r, c - 1)) || cells.has(key(r, c + 1))) return false;
      }
    }
  }
  return hasIntersection || cells.size === 0;
}

function place(word, row, col, dir, cells) {
  for (let i = 0; i < word.length; i++) {
    const r = dir === "across" ? row : row + i;
    const c = dir === "across" ? col + i : col;
    cells.set(key(r, c), word[i]);
  }
}

/** Findet alle gültigen Kreuzungs-Platzierungen für `word` gegen den
 * aktuellen Gitterstand -- gibt nur Platzierungen zurück, deren resultierende
 * Bounding-Box innerhalb von maxDimension bleibt, und annotiert jede mit der
 * resultierenden Fläche, damit der Aufrufer die kompakteste wählen kann. */
function findPlacements(word, cells, bounds, maxDimension) {
  const placements = [];
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    for (const [k, existingLetter] of cells) {
      if (existingLetter !== letter) continue;
      const [r, c] = k.split(",").map(Number);
      // Als "across" quer zu einem bestehenden "down"-Wort (oder umgekehrt) --
      // wir probieren einfach beide Richtungen, canPlace verwirft Ungültiges.
      const acrossRow = r;
      const acrossCol = c - i;
      if (canPlace(word, acrossRow, acrossCol, "across", cells)) {
        addIfCompact(placements, word, acrossRow, acrossCol, "across", bounds, maxDimension);
      }
      const downRow = r - i;
      const downCol = c;
      if (canPlace(word, downRow, downCol, "down", cells)) {
        addIfCompact(placements, word, downRow, downCol, "down", bounds, maxDimension);
      }
    }
  }
  placements.sort((a, b) => a.area - b.area);
  return placements;
}

function addIfCompact(placements, word, row, col, dir, bounds, maxDimension) {
  const endRow = dir === "across" ? row : row + word.length - 1;
  const endCol = dir === "across" ? col + word.length - 1 : col;
  const newMinRow = Math.min(bounds.minRow, row);
  const newMaxRow = Math.max(bounds.maxRow, endRow);
  const newMinCol = Math.min(bounds.minCol, col);
  const newMaxCol = Math.max(bounds.maxCol, endCol);
  const height = newMaxRow - newMinRow + 1;
  const width = newMaxCol - newMinCol + 1;
  if (height > maxDimension || width > maxDimension) return;
  placements.push({ row, col, dir, area: height * width });
}

function generateOnePuzzle(pool, tier) {
  const words = shuffle(pool).slice(0, tier.wordsPerAttempt);
  words.sort((a, b) => b.answer.length - a.answer.length);

  const cells = new Map();
  const placedWords = [];

  // Erstes (längstes) Wort in die Mitte, horizontal.
  const first = words[0];
  place(first.answer, 0, 0, "across", cells);
  placedWords.push({ ...first, row: 0, col: 0, dir: "across" });
  const bounds = { minRow: 0, maxRow: 0, minCol: 0, maxCol: first.answer.length - 1 };

  for (let i = 1; i < words.length && placedWords.length < tier.targetWords; i++) {
    const w = words[i];
    if (placedWords.some((p) => p.answer === w.answer)) continue;
    const placements = findPlacements(w.answer, cells, bounds, tier.maxDimension);
    if (placements.length === 0) continue;
    // Unter den kompaktesten Kandidaten (kleinste resultierende Fläche)
    // zufällig wählen -- hält das Gitter dicht, ohne jedes Mal exakt
    // denselben Kandidaten zu bevorzugen.
    const bestArea = placements[0].area;
    const tied = placements.filter((p) => p.area === bestArea);
    const chosen = tied[Math.floor(Math.random() * tied.length)];
    place(w.answer, chosen.row, chosen.col, chosen.dir, cells);
    placedWords.push({ ...w, row: chosen.row, col: chosen.col, dir: chosen.dir });
    const endRow = chosen.dir === "across" ? chosen.row : chosen.row + w.answer.length - 1;
    const endCol = chosen.dir === "across" ? chosen.col + w.answer.length - 1 : chosen.col;
    bounds.minRow = Math.min(bounds.minRow, chosen.row);
    bounds.maxRow = Math.max(bounds.maxRow, endRow);
    bounds.minCol = Math.min(bounds.minCol, chosen.col);
    bounds.maxCol = Math.max(bounds.maxCol, endCol);
  }

  if (placedWords.length < tier.minWords) return null;

  // Gitter auf die tatsächlich belegte Fläche zuschneiden.
  let minRow = Infinity,
    maxRow = -Infinity,
    minCol = Infinity,
    maxCol = -Infinity;
  for (const k of cells.keys()) {
    const [r, c] = k.split(",").map(Number);
    minRow = Math.min(minRow, r);
    maxRow = Math.max(maxRow, r);
    minCol = Math.min(minCol, c);
    maxCol = Math.max(maxCol, c);
  }
  const rows = maxRow - minRow + 1;
  const cols = maxCol - minCol + 1;

  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  for (const [k, letter] of cells) {
    const [r, c] = k.split(",").map(Number);
    grid[r - minRow][c - minCol] = letter;
  }

  const normalized = placedWords.map((w) => ({
    answer: w.answer,
    clue: w.clue,
    row: w.row - minRow,
    col: w.col - minCol,
    dir: w.dir,
  }));

  // Nummerierung: eine Zelle bekommt eine Nummer, wenn dort ein Wort
  // (waagerecht und/oder senkrecht) beginnt -- Standard-Kreuzworträtsel-Konvention.
  const startsAcross = new Map(normalized.filter((w) => w.dir === "across").map((w) => [key(w.row, w.col), w]));
  const startsDown = new Map(normalized.filter((w) => w.dir === "down").map((w) => [key(w.row, w.col), w]));

  let num = 1;
  const numberedEntries = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const k = key(r, c);
      const a = startsAcross.get(k);
      const d = startsDown.get(k);
      if (!a && !d) continue;
      if (a) numberedEntries.push({ number: num, dir: "across", row: r, col: c, answer: a.answer, clue: a.clue });
      if (d) numberedEntries.push({ number: num, dir: "down", row: r, col: c, answer: d.answer, clue: d.clue });
      num++;
    }
  }

  return { rows, cols, grid, entries: numberedEntries };
}

/**
 * Letzte, unabhängige Prüfung vor dem Ausliefern eines Rätsels: für jede
 * maximale waagerechte/senkrechte Buchstabenfolge im fertigen Gitter muss es
 * genau einen registrierten Eintrag mit exakt passendem Wort geben. Das ist
 * die einzige Prüfung, die wirklich garantiert, dass keine zwei Wörter
 * ungewollt ineinanderlaufen (siehe der Bug, der "TROMMEL" + das "S" von
 * "KRANKENHAUS" zu "TROMMELS" verschmelzen ließ) -- unabhängig von den
 * Platzierungs-Regeln in canPlace, die genau diesen Fehler hatten.
 */
function validatePuzzle(puzzle) {
  const { rows, cols, grid, entries } = puzzle;
  const acrossAt = new Map(entries.filter((e) => e.dir === "across").map((e) => [key(e.row, e.col), e]));
  const downAt = new Map(entries.filter((e) => e.dir === "down").map((e) => [key(e.row, e.col), e]));

  for (let r = 0; r < rows; r++) {
    let c = 0;
    while (c < cols) {
      if (grid[r][c] === null) {
        c++;
        continue;
      }
      const start = c;
      let word = "";
      while (c < cols && grid[r][c] !== null) {
        word += grid[r][c];
        c++;
      }
      if (word.length < 2) continue;
      const entry = acrossAt.get(key(r, start));
      if (!entry || entry.answer !== word) return false;
    }
  }

  for (let c = 0; c < cols; c++) {
    let r = 0;
    while (r < rows) {
      if (grid[r][c] === null) {
        r++;
        continue;
      }
      const start = r;
      let word = "";
      while (r < rows && grid[r][c] !== null) {
        word += grid[r][c];
        r++;
      }
      if (word.length < 2) continue;
      const entry = downAt.get(key(start, c));
      if (!entry || entry.answer !== word) return false;
    }
  }

  return true;
}

function generatePuzzlesForTier(tier) {
  const puzzles = [];
  const seenSignatures = new Set();
  let guard = 0;
  let rejected = 0;
  while (puzzles.length < tier.targetPuzzles && guard < tier.targetPuzzles * tier.attemptsPerPuzzle) {
    guard++;
    const puzzle = generateOnePuzzle(wordBank, tier);
    if (!puzzle) continue;
    if (!validatePuzzle(puzzle)) {
      rejected++;
      continue;
    }
    const signature = puzzle.entries
      .map((e) => e.answer)
      .sort()
      .join("|");
    if (seenSignatures.has(signature)) continue; // zu ähnlich zu einem schon erzeugten Rätsel
    seenSignatures.add(signature);
    puzzle.id = `cw-${tier.key}-${String(puzzles.length + 1).padStart(2, "0")}`;
    puzzles.push(puzzle);
  }
  if (rejected > 0) console.warn(`[${tier.key}] Rejected ${rejected} invalid puzzle(s) during generation (retried).`);
  return puzzles;
}

function tsStringLiteral(s) {
  return JSON.stringify(s);
}

function renderPuzzle(p) {
  const gridLiteral = p.grid
    .map((row) => `      [${row.map((cell) => (cell === null ? "null" : tsStringLiteral(cell))).join(", ")}]`)
    .join(",\n");
  const entriesLiteral = p.entries
    .map(
      (e) =>
        `      { number: ${e.number}, dir: "${e.dir}", row: ${e.row}, col: ${e.col}, answer: ${tsStringLiteral(
          e.answer,
        )}, clue: ${tsStringLiteral(e.clue)} }`,
    )
    .join(",\n");
  return `  {
    id: ${tsStringLiteral(p.id)},
    rows: ${p.rows},
    cols: ${p.cols},
    grid: [
${gridLiteral},
    ],
    entries: [
${entriesLiteral},
    ],
  }`;
}

const puzzlesByTier = {};
for (const tier of TIERS) {
  const puzzles = generatePuzzlesForTier(tier);
  puzzlesByTier[tier.key] = puzzles;
  const wordCounts = puzzles.map((p) => p.entries.length);
  const sizes = puzzles.map((p) => `${p.rows}x${p.cols}`);
  console.log(
    `[${tier.key}] Generated ${puzzles.length}/${tier.targetPuzzles} puzzles -- words min/max/avg: ` +
      `${Math.min(...wordCounts)}/${Math.max(...wordCounts)}/${(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length).toFixed(1)}, sizes: ${sizes.join(", ")}`,
  );
}

const exportName = { leicht: "crosswordPuzzlesLeicht", mittel: "crosswordPuzzlesMittel", schwer: "crosswordPuzzlesSchwer" };

const header = `/**
 * Vorgenerierte Kreuzworträtsel-Gitter -- erzeugt von scripts/generate-crosswords.js
 * aus scripts/crossword-wordbank.js. Nicht von Hand bearbeiten; bei Bedarf
 * das Skript erneut laufen lassen (überschreibt diese Datei komplett).
 *
 * Drei Schwierigkeitsstufen (Leicht/Mittel/Schwer), analog Schiebepuzzle/
 * Wer-bin-ich. Auswahl pro Runde läuft wie beim Wissens-Quiz über
 * pickUnseen() (siehe content/crossword.ts) -- kein Wiederholen, solange der
 * jeweilige Pool nicht ausgeschöpft ist, kontogebunden bzw. geräte-lokal für Gäste.
 */

export interface CrosswordEntry {
  number: number;
  dir: "across" | "down";
  row: number;
  col: number;
  answer: string;
  clue: string;
}

export interface CrosswordPuzzle {
  id: string;
  rows: number;
  cols: number;
  /** null = schwarze/leere Zelle, sonst der Buchstabe an dieser Stelle. */
  grid: (string | null)[][];
  entries: CrosswordEntry[];
}

${TIERS.map(
  (tier) => `export const ${exportName[tier.key]}: CrosswordPuzzle[] = [
${puzzlesByTier[tier.key].map(renderPuzzle).join(",\n")},
];
`,
).join("\n")}`;

const outPath = path.join(__dirname, "..", "content", "crossword-data.ts");
fs.writeFileSync(outPath, header);
console.log("Wrote", outPath);
