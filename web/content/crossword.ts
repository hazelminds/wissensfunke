import { crosswordPuzzles, type CrosswordPuzzle, type CrosswordEntry } from "./crossword-data";

export type { CrosswordPuzzle, CrosswordEntry };

export function getCrosswordPool(): CrosswordPuzzle[] {
  return crosswordPuzzles;
}

export function getCrosswordById(id: string): CrosswordPuzzle | undefined {
  return crosswordPuzzles.find((p) => p.id === id);
}

/** Für Gäste ohne Konto (kein "schon gesehen"-Tracking) -- wie getRandomWhoAmIRound. */
export function getRandomCrossword(): CrosswordPuzzle {
  return crosswordPuzzles[Math.floor(Math.random() * crosswordPuzzles.length)];
}
