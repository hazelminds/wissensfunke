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
  minCorrect: number;
  title: string;
  subtitle: string;
  emoji: string;
  gradientClass: string;
}

export interface QuizDefinition {
  slug: string;
  title: string;
  categoryIcons: Record<string, string>;
  questions: QuizQuestion[];
  ranks: QuizRank[];
  /** Preis der Tiefenauswertung — immer VOR dem Klick auf "Freischalten" sichtbar (Compliance §5). */
  unlockPriceCents: number;
  unlockTitle: string;
  unlockDescription: string;
}

export const quizzes: QuizDefinition[] = [
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
    ranks: [
      {
        minCorrect: 0,
        title: "Neugieriger Anfänger",
        subtitle: "Da geht noch was – guter Einstieg trotzdem!",
        emoji: "🌱",
        gradientClass: "from-[hsl(160,70%,45%)] to-[hsl(160,70%,35%)]",
      },
      {
        minCorrect: 2,
        title: "Solides Grundwissen",
        subtitle: "Die Basics sitzen sicher.",
        emoji: "🥉",
        gradientClass: "from-[hsl(28,95%,62%)] to-[hsl(28,95%,50%)]",
      },
      {
        minCorrect: 4,
        title: "Wissens-Ass",
        subtitle: "Fast alles richtig – sehr stark!",
        emoji: "🥈",
        gradientClass: "from-[hsl(12,90%,60%)] to-[hsl(12,90%,48%)]",
      },
      {
        minCorrect: 5,
        title: "Trivia-Champion",
        subtitle: "Perfekte Runde. Alle 5 Fragen richtig!",
        emoji: "🏆",
        gradientClass: "from-[hsl(45,95%,58%)] to-[hsl(45,95%,46%)]",
      },
    ],
    unlockPriceCents: 299,
    unlockTitle: "Themen-Analyse",
    unlockDescription: "Wo du wirklich glänzt – nach Kategorie sortiert",
  },
];

export function getQuiz(slug: string): QuizDefinition | undefined {
  return quizzes.find((q) => q.slug === slug);
}

export function rankFor(quiz: QuizDefinition, score: number): QuizRank {
  return [...quiz.ranks].reverse().find((r) => score >= r.minCorrect) ?? quiz.ranks[0];
}

export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}
