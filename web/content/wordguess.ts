/**
 * Worträtsel (Wordle-Prinzip) — Ebene 1, täglicher Gratis-Anker wie
 * tages-raetsel/tages-mini-quiz: ein 5-Buchstaben-Wort pro Kalendertag,
 * für alle gleich, deterministisch per Datum ausgewählt, kein Zufall.
 *
 * Lösung UND erlaubte Rateversuche kommen bewusst aus demselben kuratierten
 * Pool (WORD_LIST) statt aus einem separaten riesigen Wörterbuch -- jeder
 * gültige Ratewürfel ist dadurch garantiert ein echtes Wort, ohne dass ein
 * zweiter, viel größerer Wörterbuch-Datensatz gepflegt werden müsste.
 */

import { dayNumber } from "./daily";

export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

/** Tag, an dem Puzzle Nr. 1 lief -- für eine menschenlesbare, bei 1
 * beginnende Zählung statt der riesigen rohen Unix-Epochentage. */
const LAUNCH_DATE = new Date("2026-10-01T00:00:00Z");

// Alle Großbuchstaben, ohne ß (im Deutschen in Versalschreibung ohnehin
// durch "SS" ersetzt, z. B. "WEISS") -- damit jede Position im Raster
// einem einzelnen Tile entspricht. 137 Wörter, keine Dopplungen, alle
// geprüft exakt 5 Zeichen lang.
export const WORD_LIST: string[] = [
  "STUHL", "TISCH", "WOLKE", "BLUME", "KATZE", "VOGEL", "FISCH", "PFERD", "SCHAF", "FUCHS",
  "LUCHS", "ZEBRA", "TIGER", "PANDA", "KOALA", "ADLER", "FALKE", "SPATZ", "AMSEL", "MANGO",
  "GUAVE", "OLIVE", "BIRNE", "HONIG", "GURKE", "SALAT", "ERBSE", "BOHNE", "LINSE", "NUDEL",
  "PIZZA", "SUPPE", "COUCH", "REGAL", "LAMPE", "KERZE", "BODEN", "DECKE", "PAKET", "BRIEF",
  "STIFT", "MAPPE", "SONNE", "STERN", "REGEN", "HAGEL", "NEBEL", "STURM", "BLITZ", "FLUSS",
  "HÜGEL", "WIESE", "ACKER", "INSEL", "STIRN", "LIPPE", "ZUNGE", "WANGE", "NAGEL", "BAUCH",
  "LUNGE", "MAGEN", "LEBER", "NIERE", "LIEBE", "STOLZ", "SCHAM", "MUSIK", "SERIE", "ROMAN",
  "RENTE", "MONAT", "WOCHE", "ABEND", "NACHT", "RADIO", "HANDY", "TASTE", "DRUCK", "JACKE",
  "SCHAL", "MÜTZE", "SOCKE", "ANZUG", "KLEID", "WEISS", "BRAUN", "BEIGE", "MALER", "BAUER",
  "PILOT", "AGENT", "MAUER", "PFAHL", "SEGEL", "ANKER", "KARTE", "ATLAS", "VATER", "ONKEL",
  "TANTE", "ENKEL", "NEFFE", "FEUER", "STEIN", "EISEN", "STOFF", "LEDER", "WOLLE", "ZANGE",
  "EIMER", "BESEN", "KLEIN", "KREIS", "WAAGE", "TEICH", "KANAL", "BUCHT", "KÜSTE", "SÜDEN",
  "OSTEN", "EBENE", "HAFEN", "MARKT", "PLATZ", "TAFEL", "FARBE", "GEIGE", "FLÖTE", "HARFE",
  "ORGEL", "ROBBE", "TAUBE", "HENNE", "GEIER", "KETTE", "GABEL",
];

const WORD_SET = new Set(WORD_LIST);

export function getDailyWord(date: Date = new Date()): string {
  return WORD_LIST[dayNumber(date) % WORD_LIST.length];
}

/** Bei 1 beginnende, menschenlesbare Rätselnummer ("Worträtsel Nr. 12"). */
export function getPuzzleNumber(date: Date = new Date()): number {
  return dayNumber(date) - dayNumber(LAUNCH_DATE) + 1;
}

export function normalizeGuess(input: string): string {
  return input.toUpperCase().trim();
}

export function isValidGuess(input: string): boolean {
  const guess = normalizeGuess(input);
  return guess.length === WORD_LENGTH && WORD_SET.has(guess);
}

export type LetterState = "correct" | "present" | "absent";

/**
 * Klassischer Zwei-Pass-Wordle-Algorithmus: erst alle exakten Treffer
 * markieren und aus dem verbleibenden Buchstaben-Pool der Lösung entfernen,
 * dann für den Rest prüfen, ob der Buchstabe woanders in der Lösung noch
 * übrig ist. Der zweite Pass ist nötig, damit doppelte Buchstaben korrekt
 * behandelt werden (z. B. Lösung "ERBSE" mit zwei E, Versuch "EBENE").
 */
export function evaluateGuess(guess: string, solution: string): LetterState[] {
  const guessLetters = [...normalizeGuess(guess)];
  const solutionLetters = [...normalizeGuess(solution)];
  const result: LetterState[] = new Array(guessLetters.length).fill("absent");
  const remaining = [...solutionLetters];

  guessLetters.forEach((letter, i) => {
    if (letter === solutionLetters[i]) {
      result[i] = "correct";
      remaining[i] = null as unknown as string;
    }
  });

  guessLetters.forEach((letter, i) => {
    if (result[i] === "correct") return;
    const idx = remaining.indexOf(letter);
    if (idx !== -1) {
      result[i] = "present";
      remaining[idx] = null as unknown as string;
    }
  });

  return result;
}

export function isWin(states: LetterState[]): boolean {
  return states.every((s) => s === "correct");
}
