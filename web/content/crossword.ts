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
