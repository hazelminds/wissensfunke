/**
 * Vollständige Quiz-Definitionen für Ebene 2 (wöchentliche Selbst-Tests).
 * Nur Slugs, die hier einen Eintrag haben, bekommen den echten Spielablauf
 * unter /quiz/[slug] — alle anderen Einträge aus content/games.ts zeigen
 * weiterhin den "wird gebaut"-Platzhalter.
 */

export interface QuizQuestion {
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizRank {
  /** Anteil richtiger Antworten (0–1), ab dem dieser Rang gilt -- prozentual statt
   * absolut, damit dieselben Ränge für jede Rundengröße funktionieren. */
  minCorrectPct: number;
  title: string;
  subtitle: string;
  emoji: string;
  gradientClass: string;
}

export interface QuizDefinition {
  slug: string;
  title: string;
  categoryIcons: Record<string, string>;
  /** Gesamter Fragen-Pool -- pro Runde wird daraus zufällig eine Teilmenge
   * der Größe roundSize gezogen (siehe QuizPlayer), damit sich Wiederholungen
   * nicht gleich anfühlen. */
  questions: QuizQuestion[];
  /** Anzahl Fragen pro gespielter Runde. */
  roundSize: number;
  /** "immediate" (Standard, wenn weggelassen): Richtig/Falsch wird direkt nach
   * jeder Antwort angezeigt, inkl. Erklärung. "end": keine Rückmeldung
   * während der Runde -- erst im Ergebnis sieht man pro Frage, ob man richtig
   * lag (gratis); die richtige Antwort und mehr Hintergrundinfos gibt es erst
   * mit Freischaltung/Plus. */
  revealTiming?: "immediate" | "end";
  ranks: QuizRank[];
  /** Preis der Tiefenauswertung — immer VOR dem Klick auf "Freischalten" sichtbar (Compliance §5). */
  unlockPriceCents: number;
  unlockTitle: string;
  unlockDescription: string;
}

/** Wiederverwendbare Standard-Rangstufen -- passen für jede Rundengröße, weil
 * sie über den Anteil richtiger Antworten definiert sind, nicht über eine
 * feste Zahl. */
export const STANDARD_RANKS: QuizRank[] = [
  {
    minCorrectPct: 0,
    title: "Neugieriger Anfänger",
    subtitle: "Da geht noch was – guter Einstieg trotzdem!",
    emoji: "🌱",
    gradientClass: "from-[hsl(160,70%,45%)] to-[hsl(160,70%,35%)]",
  },
  {
    minCorrectPct: 0.4,
    title: "Solides Grundwissen",
    subtitle: "Die Basics sitzen sicher.",
    emoji: "🥉",
    gradientClass: "from-[hsl(28,95%,62%)] to-[hsl(28,95%,50%)]",
  },
  {
    minCorrectPct: 0.75,
    title: "Wissens-Ass",
    subtitle: "Fast alles richtig – sehr stark!",
    emoji: "🥈",
    gradientClass: "from-[hsl(12,90%,60%)] to-[hsl(12,90%,48%)]",
  },
  {
    minCorrectPct: 1,
    title: "Trivia-Champion",
    subtitle: "Perfekte Runde – alles richtig!",
    emoji: "🏆",
    gradientClass: "from-[hsl(45,95%,58%)] to-[hsl(45,95%,46%)]",
  },
];

import { geschichteQuestions, filmzitateQuestions, gemischtQuestions } from "./quiz-pools-data";
import {
  geographieQuestions,
  zeitgeschehenQuestions,
  wissenschaftNaturQuestions,
  sportQuestions,
  musikQuestions,
  literaturSpracheQuestions,
  essenTrinkenQuestions,
  technikDigitalQuestions,
  weltereignisseXxlQuestions,
} from "./quiz-pools-data-2";
import { dailyCategoryIcons } from "./daily";

export const quizzes: QuizDefinition[] = [
  {
    slug: "geschichte",
    title: "Geschichte",
    categoryIcons: {
      Antike: "🏛️",
      Mittelalter: "🏰",
      "Frühe Neuzeit": "⚔️",
      Neuzeit: "📜",
      Zeitgeschichte: "🌍",
    },
    questions: geschichteQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "filmzitate",
    title: "Filmzitate",
    categoryIcons: {
      Drama: "🎭",
      Action: "💥",
      Komödie: "😂",
      "Sci-Fi": "🚀",
      Animation: "🎨",
      Fantasy: "🧙",
    },
    questions: filmzitateQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jedem Zitat",
  },
  {
    slug: "gemischt",
    title: "Gemischt",
    categoryIcons: dailyCategoryIcons,
    questions: gemischtQuestions,
    roundSize: 30,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    // Plus-exklusives Quiz: die Themen-Analyse ist bereits mit dem Abo
    // enthalten, kein zusätzlicher Einmalkauf obendrauf (siehe QuizPlayer).
    unlockPriceCents: 0,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage, inklusive mit Plus",
  },
  {
    slug: "geographie",
    title: "Geographie",
    categoryIcons: {
      Europa: "🏛️",
      Asien: "🏯",
      Afrika: "🦁",
      Amerika: "🗽",
      "Ozeanien & Antarktis": "🐧",
    },
    questions: geographieQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "zeitgeschehen",
    title: "Zeitgeschehen",
    categoryIcons: {
      "Politik & Gesellschaft": "🏛️",
      Wirtschaft: "💰",
      "Wissenschaft & Technik": "🔬",
      "Kultur & Sport": "🎭",
      "Umwelt & Klima": "🌱",
    },
    questions: zeitgeschehenQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "wissenschaft-natur",
    title: "Wissenschaft & Natur",
    categoryIcons: {
      Physik: "⚛️",
      Chemie: "⚗️",
      Biologie: "🧬",
      "Erde & Klima": "🌋",
      Astronomie: "🔭",
    },
    questions: wissenschaftNaturQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "sport",
    title: "Sport",
    categoryIcons: {
      Fußball: "⚽",
      Olympia: "🏅",
      Wintersport: "⛷️",
      Motorsport: "🏎️",
      "Weitere Sportarten": "🎾",
    },
    questions: sportQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "musik",
    title: "Musik",
    categoryIcons: {
      Klassik: "🎻",
      "Pop & Rock": "🎸",
      "Hip-Hop & Elektro": "🎧",
      "Instrumente & Theorie": "🎹",
      Musikgeschichte: "📻",
    },
    questions: musikQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "literatur-sprache",
    title: "Literatur & Sprache",
    categoryIcons: {
      Weltliteratur: "📖",
      "Deutsche Literatur": "📚",
      "Sprachen & Wortschatz": "🗣️",
      "Grammatik & Kuriositäten": "✍️",
      "Bestseller & Moderne": "📕",
    },
    questions: literaturSpracheQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "essen-trinken",
    title: "Essen & Trinken",
    categoryIcons: {
      "Internationale Küche": "🌮",
      "Zutaten & Gewürze": "🧂",
      Getränke: "🍹",
      "Süßes & Gebäck": "🍰",
      "Kochtechniken & Geschichte": "👨‍🍳",
    },
    questions: essenTrinkenQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "technik-digital",
    title: "Technik & Digital",
    categoryIcons: {
      "Internet & Software": "💻",
      "KI & Zukunftstech": "🤖",
      "Hardware & Gadgets": "📱",
      "Erfindungen & Geschichte": "💡",
      "Social Media & Apps": "📲",
    },
    questions: technikDigitalQuestions,
    roundSize: 8,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage",
  },
  {
    slug: "weltereignisse-xxl",
    title: "Weltereignisse XXL",
    categoryIcons: {
      "Politik & Diplomatie": "🏛️",
      "Wirtschaft & Handel": "💱",
      "Wissenschaft & Technik": "🔬",
      "Kultur & Gesellschaft": "🎭",
      "Umwelt & Klima": "🌍",
      "Sport-Großereignisse": "🏆",
    },
    questions: weltereignisseXxlQuestions,
    roundSize: 30,
    revealTiming: "end",
    ranks: STANDARD_RANKS,
    // Plus-exklusives Quiz: die Themen-Analyse ist bereits mit dem Abo
    // enthalten, kein zusätzlicher Einmalkauf obendrauf (siehe QuizPlayer).
    unlockPriceCents: 0,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Die richtigen Antworten und mehr Hintergrund zu jeder Frage, inklusive mit Plus",
  },
  {
    slug: "allgemeinwissen",
    title: "Allgemeinwissen-Quiz",
    categoryIcons: {
      Geografie: "🌍",
      Biologie: "🧬",
      Geschichte: "🏛️",
      Chemie: "⚗️",
      Kunst: "🎨",
    },
    questions: [
      {
        category: "Geografie",
        question: "Welches Land hat aktuell die meisten Einwohner der Welt?",
        options: ["China", "Indien", "USA", "Indonesien"],
        correctIndex: 1,
        explanation:
          "Indien hat China laut UN-Schätzungen um 2023 als bevölkerungsreichstes Land der Welt abgelöst.",
      },
      {
        category: "Biologie",
        question: "Wie viele Knochen hat ein erwachsener Mensch normalerweise?",
        options: ["186", "206", "226", "246"],
        correctIndex: 1,
        explanation:
          "Ein erwachsenes Skelett besteht aus 206 Knochen – Babys kommen mit deutlich mehr zur Welt, viele wachsen später zusammen.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr fiel die Berliner Mauer?",
        options: ["1987", "1989", "1991", "1993"],
        correctIndex: 1,
        explanation: "Am 9. November 1989 öffneten sich die Grenzübergänge in Berlin.",
      },
      {
        category: "Chemie",
        question: "Für welches Element steht das chemische Symbol „Au“?",
        options: ["Silber", "Aluminium", "Gold", "Argon"],
        correctIndex: 2,
        explanation: "„Au“ kommt vom lateinischen Wort „aurum“ für Gold.",
      },
      {
        category: "Kunst",
        question: "Wer malte die Mona Lisa?",
        options: ["Michelangelo", "Raffael", "Botticelli", "Leonardo da Vinci"],
        correctIndex: 3,
        explanation:
          "Leonardo da Vinci begann das Gemälde um 1503 – es hängt heute im Louvre in Paris.",
      },
    ],
    roundSize: 5,
    ranks: STANDARD_RANKS,
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Wo du wirklich glänzt – nach Kategorie sortiert",
  },
];

export function getQuiz(slug: string): QuizDefinition | undefined {
  return quizzes.find((q) => q.slug === slug);
}

export function rankFor(quiz: QuizDefinition, score: number, roundLength: number): QuizRank {
  const pct = roundLength === 0 ? 0 : score / roundLength;
  return [...quiz.ranks].reverse().find((r) => pct >= r.minCorrectPct) ?? quiz.ranks[0];
}

export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

/** Zieht `size` zufällige, unterschiedliche Fragen aus dem Pool (Fisher-Yates-Teilshuffle). */
export function sampleQuestions(pool: QuizQuestion[], size: number): QuizQuestion[] {
  const arr = [...pool];
  const n = Math.min(size, arr.length);
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}
