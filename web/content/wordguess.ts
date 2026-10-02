/**
 * Worträtsel (Wordle-Prinzip) — Ebene 1, täglicher Gratis-Anker wie
 * tages-raetsel/tages-mini-quiz: ein 5-Buchstaben-Wort pro Kalendertag,
 * für alle gleich, deterministisch per Datum ausgewählt, kein Zufall.
 *
 * Zwei getrennte Listen: WORD_LIST sind die Lösungs-Kandidaten (bewusst
 * kuratiert, erkennbare Alltagswörter -- das soll als Tageslösung auch
 * fair zu erraten sein). EXTRA_VALID_GUESSES erweitert nur, was als
 * Ratewort akzeptiert wird, ohne je selbst Lösung zu werden -- sonst
 * würden viele ganz normale deutsche Wörter (z. B. "ERNTE") beim Tippen
 * fälschlich als "kein Wort" abgelehnt, nur weil die Lösungs-Liste
 * bewusst schlank gehalten ist.
 */

import { dayNumber } from "./daily";

export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

/** Tag, an dem Puzzle Nr. 1 lief -- für eine menschenlesbare, bei 1
 * beginnende Zählung statt der riesigen rohen Unix-Epochentage. */
const LAUNCH_DATE = new Date("2026-10-01T00:00:00Z");

// Alle Großbuchstaben, ohne ß (im Deutschen in Versalschreibung ohnehin
// durch "SS" ersetzt, z. B. "WEISS") -- damit jede Position im Raster
// einem einzelnen Tile entspricht. 272 Wörter, keine Dopplungen, alle
// geprüft exakt 5 Zeichen lang -- reicht für knapp 9 Monate Tageslösungen
// ohne Wiederholung (Plus-Bonusrunden ziehen zufällig aus demselben Pool
// und können daher schon vorher mal wiederholen, siehe getBonusWord).
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
  "ORGEL", "ROBBE", "TAUBE", "HENNE", "GEIER", "KETTE", "GABEL", "ERNTE", "SAMEN", "KEIME",
  "ZWEIG", "RINDE", "BLATT", "HECKE", "WEIDE", "SUMPF", "GEHEN", "ESSEN", "SEHEN", "GEBEN",
  "LESEN", "REDEN", "BADEN", "MALEN", "RUFEN", "BLUSE", "WESTE", "TRUHE", "ETAGE", "KEKSE",
  "TORTE", "WURST", "QUARK", "CREME", "SOSSE", "KOHLE", "OTTER", "BIBER", "DACHS", "STIER",
  "STUTE", "PUTER", "ERPEL", "KÜKEN", "RABEN", "KRÄHE", "MOTTE", "ZECKE", "WANZE", "TULPE",
  "NELKE", "PALME", "FARNE", "MOOSE", "BUSCH", "DUNST", "FROST", "EISIG", "KLIMA", "ZONEN",
  "UHREN", "MÜNZE", "KABEL", "AKKUS", "CHIPS", "NOTEN", "LEHRE", "PAUSE", "BOXEN", "PREIS",
  "MIETE", "ÄRGER", "TROST", "GLÜCK", "UNMUT", "DEMUT", "SORGE",
  "ZIEGE", "RATTE", "MEISE", "FINKE", "KOBRA", "KANNE", "DOSEN", "TÜTEN", "KÖRBE", "NADEL",
  "SEIDE", "APFEL", "HAFER", "SPECK", "BROTE", "ESSIG", "CURRY", "REISE", "KÄLTE", "WÄRME",
  "HITZE", "FÜSSE", "ZÄHNE", "KEHLE", "HÜFTE", "FERSE", "WADEN", "BRAUE", "ANGST", "PANIK",
  "EIFER", "STILL", "WEISE", "KRANK", "HÖREN", "LEBEN", "HOLEN", "LEGEN", "NÄHEN", "BAUEN",
  "MÄHEN", "IMKER", "JÄGER", "STADT", "STAAT", "HEUTE", "IMMER", "SCHUH", "PULLI", "DIELE",
  "KÜCHE", "AUTOS", "BOOTE", "FÄHRE", "BERGE", "WÜSTE", "KASSE", "KONTO", "EICHE", "BUCHE",
  "AHORN", "ROSEN", "LILIE", "GROSS", "HEISS",
];

// Nur als Ratewort gültig, nie als Tageslösung -- 73 weitere geprüft
// exakt 5-buchstabige deutsche Wörter, keine Dopplungen mit WORD_LIST.
const EXTRA_VALID_GUESSES: string[] = [
  "HECHT", "LARVE", "RAUPE", "KÄFER", "WESPE", "MÜCKE", "FEIGE", "ORKAN", "MUTIG", "TREUE",
  "MACHT", "KRAFT", "STARK", "SANFT", "RASCH", "LEISE", "LAUTE", "PFADE", "GASSE", "ALLEE",
  "PARKS", "JAHRE", "HEFTE", "TEXTE", "WORTE", "TEAMS", "IDEEN", "TRAUM", "ZIELE", "PLANE",
  "VERSE", "REIME", "KLANG", "WEINE", "BIERE", "MILCH", "HAARE", "OHREN", "AUGEN", "HÄNDE",
  "BEINE", "HABEN", "SAGEN", "ENDEN", "FRAGE", "GRUND", "SINNE", "ZWECK",
  "ECHSE", "ASSEL", "ZWIRN", "KNOPF", "GLATT", "TAUEN", "FERNE", "TIEFE", "BREIT", "FEGEN",
  "CELLO", "MÄUSE", "RÄDER", "OASEN", "HÖHLE", "TÄLER", "MEERE", "BÄLLE", "TOREN", "NETZE",
  "RINGE", "ERLEN", "MASSE", "ATOME", "KOMET",
];

const WORD_SET = new Set([...WORD_LIST, ...EXTRA_VALID_GUESSES]);

export function getDailyWord(date: Date = new Date()): string {
  return WORD_LIST[dayNumber(date) % WORD_LIST.length];
}

/** Bei 1 beginnende, menschenlesbare Rätselnummer ("Worträtsel Nr. 12"). */
export function getPuzzleNumber(date: Date = new Date()): number {
  return dayNumber(date) - dayNumber(LAUNCH_DATE) + 1;
}

/** Für Plus-Bonusrunden (bis zu 5 Runden/Tag statt nur der einen
 * Tageslösung): zufälliges Wort aus demselben Lösungs-Pool, ohne die in
 * `exclude` übergebenen Wörter (z. B. die heutige Tageslösung und bereits
 * in dieser Sitzung gespielte Bonusrunden) -- vermeidet nur die direkte
 * Wiederholung, keine langfristige Zyklus-Garantie wie bei getDailyWord. */
export function getBonusWord(exclude: string[] = []): string {
  const excludeSet = new Set(exclude.map((w) => normalizeGuess(w)));
  const pool = WORD_LIST.filter((w) => !excludeSet.has(w));
  const candidates = pool.length > 0 ? pool : WORD_LIST;
  return candidates[Math.floor(Math.random() * candidates.length)];
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
