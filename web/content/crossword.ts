import {
  crosswordPuzzlesLeicht,
  crosswordPuzzlesMittel,
  crosswordPuzzlesSchwer,
  type CrosswordPuzzle,
  type CrosswordEntry,
} from "./crossword-data";

export type { CrosswordPuzzle, CrosswordEntry };
export type CrosswordDifficulty = "leicht" | "mittel" | "schwer";

const poolsByDifficulty: Record<CrosswordDifficulty, CrosswordPuzzle[]> = {
  leicht: crosswordPuzzlesLeicht,
  mittel: crosswordPuzzlesMittel,
  schwer: crosswordPuzzlesSchwer,
};

export function getCrosswordPool(difficulty: CrosswordDifficulty): CrosswordPuzzle[] {
  return poolsByDifficulty[difficulty];
}

/** Für Gäste ohne Konto (kein "schon gesehen"-Tracking) -- wie getRandomWhoAmIRound. */
export function getRandomCrossword(difficulty: CrosswordDifficulty): CrosswordPuzzle {
  const pool = poolsByDifficulty[difficulty];
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Für Challenge-Links: dasselbe Rätsel wie die Person, die den Link
 * verschickt hat, statt eins neu zu ziehen -- nur so ist der Vergleich fair. */
export function getCrosswordById(id: string): CrosswordPuzzle | null {
  for (const pool of Object.values(poolsByDifficulty)) {
    const found = pool.find((p) => p.id === id);
    if (found) return found;
  }
  return null;
}
