/**
 * Content-Registry für alle Spiele/Tests.
 *
 * Bewusst als Daten-Array statt hartcodierter Seiten: neue Rätsel/Quiz/Tests
 * sollen sich später ohne Code-Änderung einpflegen lassen (siehe Briefing
 * Abschnitt 7). Diese Datei ist der Übergangszustand vor der echten
 * Datenbank-Anbindung — die Struktur (Felder, ProductLevel) bleibt beim
 * Umzug nach Supabase gleich.
 */

export type ProductLevel = "daily-free" | "weekly-freemium" | "subscriber-only";

/** Die drei Spielarten aus dem Base44-Vorbild -- steuert Kategorie-Farbe & Icon. */
export type GameType = "quiz" | "puzzle" | "psych";

export interface GameModule {
  slug: string;
  title: string;
  teaser: string;
  emoji: string;
  category: string;
  level: ProductLevel;
  estMinutes: number;
  type: GameType;
  isPremium: boolean;
  sortOrder: number;
  /** Nur für type "puzzle": welche Puzzle-Mechanik gerendert wird. */
  variant?: "sliding" | "whoami";
  /** Nur für die Sliding-Puzzle-Variante: Rastergröße. */
  difficulty?: "easy" | "medium" | "hard";
  /** false = taucht nicht in /kategorie/[type] auf (z.B. der tägliche Anker,
   * der schon auf der Startseite prominent verlinkt ist). Default true. */
  inCategoryBrowser?: boolean;
}

export const levelMeta: Record<
  ProductLevel,
  { label: string; description: string; badgeClass: string }
> = {
  "daily-free": {
    label: "Täglicher Gratis-Anker",
    description: "Jeden Tag neu, komplett kostenlos, kein Zufallselement mit Vermögenswert.",
    badgeClass: "bg-green-soft text-green-dark",
  },
  "weekly-freemium": {
    label: "Wöchentlicher Selbst-Test",
    description: "Grobes Ergebnis immer gratis sichtbar — Themen-Analyse optional als Einmalkauf.",
    badgeClass: "bg-primary-soft text-primary-dark",
  },
  "subscriber-only": {
    label: "Power-User-Bereich",
    description: "Im Mini-Abo enthalten: alle Tiefenauswertungen, Archiv, werbefrei.",
    badgeClass: "bg-gold-soft text-gold-dark",
  },
};

export const games: GameModule[] = [
  // Ebene 1 – täglicher Gratis-Anker
  {
    slug: "tages-raetsel",
    title: "Tagespuzzle",
    teaser: "Das tägliche Logikrätsel zum Knobeln.",
    emoji: "🧩",
    category: "Logik",
    level: "daily-free",
    estMinutes: 3,
    type: "puzzle",
    isPremium: false,
    sortOrder: 1,
  },
  {
    slug: "tages-mini-quiz",
    title: "Tages-Mini-Quiz",
    teaser: "Drei Fragen quer durchs Allgemeinwissen — für den Login-Streak.",
    emoji: "⚡",
    category: "Allgemeinwissen",
    level: "daily-free",
    estMinutes: 2,
    type: "quiz",
    isPremium: false,
    sortOrder: 2,
    inCategoryBrowser: false,
  },

  // Puzzle-Kategorie -- Reihenfolge 1:1 wie im Base44-Vorbild
  {
    slug: "wer-bin-ich-genie",
    title: "Wer bin ich? — Genie",
    teaser: "Sieben Hinweise führen zu einer berühmten Persönlichkeit. Rate so früh wie möglich.",
    emoji: "🔎",
    category: "Rätsel",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "puzzle",
    variant: "whoami",
    isPremium: false,
    sortOrder: 10,
  },
  {
    slug: "schiebepuzzle-leicht",
    title: "Schiebepuzzle Leicht",
    teaser: "Ein 3×3-Bildpuzzle — schiebe die Kacheln mit der Maus an die richtige Stelle.",
    emoji: "🧩",
    category: "Logik",
    level: "weekly-freemium",
    estMinutes: 2,
    type: "puzzle",
    variant: "sliding",
    difficulty: "easy",
    isPremium: false,
    sortOrder: 11,
  },
  {
    slug: "schiebepuzzle-mittel",
    title: "Schiebepuzzle Mittel",
    teaser: "Das 4×4-Bildpuzzle — mehr Kacheln, mehr Knobelei.",
    emoji: "🧩",
    category: "Logik",
    level: "weekly-freemium",
    estMinutes: 4,
    type: "puzzle",
    variant: "sliding",
    difficulty: "medium",
    isPremium: false,
    sortOrder: 12,
  },
  {
    slug: "wer-bin-ich-king-of-pop",
    title: "Wer bin ich? — King of Pop",
    teaser: "Sieben Hinweise auf einen echten Star. Wer ist gesucht?",
    emoji: "🔎",
    category: "Rätsel",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "puzzle",
    variant: "whoami",
    isPremium: false,
    sortOrder: 13,
  },
  {
    slug: "schiebepuzzle-schwer",
    title: "Schiebepuzzle Schwer",
    teaser: "5×5 Kacheln für echte Puzzler — das volle Bild aus 24 Teilen zusammenschieben.",
    emoji: "🧩",
    category: "Logik",
    level: "subscriber-only",
    estMinutes: 7,
    type: "puzzle",
    variant: "sliding",
    difficulty: "hard",
    isPremium: true,
    sortOrder: 14,
  },
  {
    slug: "wer-bin-ich-wahrzeichen",
    title: "Wer bin ich? — Wahrzeichen",
    teaser: "Sieben Hinweise auf ein weltberühmtes Bauwerk. Errate es.",
    emoji: "🔎",
    category: "Rätsel",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "puzzle",
    variant: "whoami",
    isPremium: false,
    sortOrder: 15,
  },
  {
    slug: "wer-bin-ich-meisterdetektiv",
    title: "Wer bin ich? — Meisterdetektiv",
    teaser: "Sieben Hinweise auf eine fiktive Legende. Wer ist es?",
    emoji: "🔎",
    category: "Rätsel",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "puzzle",
    variant: "whoami",
    isPremium: false,
    sortOrder: 16,
  },
  {
    slug: "wer-bin-ich-meisterwerk",
    title: "Wer bin ich? — Meisterwerk",
    teaser: "Sieben Hinweise auf ein berühmtes Gemälde. Weißt du's?",
    emoji: "🔎",
    category: "Rätsel",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "puzzle",
    variant: "whoami",
    isPremium: false,
    sortOrder: 17,
  },

  // Quiz-Kategorie -- Reihenfolge 1:1 wie im Base44-Vorbild
  {
    slug: "filmzitate",
    title: "Filmzitate",
    teaser: "Erkenne den Film am berühmten Zitat.",
    emoji: "🎬",
    category: "Unterhaltung",
    level: "weekly-freemium",
    estMinutes: 2,
    type: "quiz",
    isPremium: false,
    sortOrder: 20,
  },
  {
    slug: "weltereignisse-xxl",
    title: "Weltereignisse XXL",
    teaser: "Erweiterte Runde mit über 30 Fragen weltweit.",
    emoji: "🌐",
    category: "Wissen",
    level: "subscriber-only",
    estMinutes: 8,
    type: "quiz",
    isPremium: true,
    sortOrder: 21,
  },
  {
    slug: "geschichte",
    title: "Geschichte",
    teaser: "Von Antike bis Mauerfall — reise durch die Menschheitsgeschichte.",
    emoji: "📜",
    category: "Wissen",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "quiz",
    isPremium: false,
    sortOrder: 22,
  },
  {
    slug: "geographie",
    title: "Geographie",
    teaser: "Hauptstädte, Flüsse, Kontinente — dein Weltwissen auf dem Prüfstand.",
    emoji: "🌍",
    category: "Wissen",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "quiz",
    isPremium: false,
    sortOrder: 23,
  },
  {
    slug: "zeitgeschehen",
    title: "Zeitgeschehen",
    teaser: "Was bewegt die Welt aktuell? Nachrichten & Trends der letzten Jahre.",
    emoji: "🧠",
    category: "Wissen",
    level: "weekly-freemium",
    estMinutes: 4,
    type: "quiz",
    isPremium: false,
    sortOrder: 24,
  },
  {
    slug: "wissenschaft-natur",
    title: "Wissenschaft & Natur",
    teaser: "Physik, Chemie, Biologie — vermesse die Naturgesetze.",
    emoji: "🧪",
    category: "Wissen",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "quiz",
    isPremium: false,
    sortOrder: 25,
  },
  {
    slug: "sport",
    title: "Sport",
    teaser: "Rekorde, Regeln, Legenden — für Fußball- und Olympia-Fans.",
    emoji: "🏆",
    category: "Unterhaltung",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "quiz",
    isPremium: false,
    sortOrder: 26,
  },
  {
    slug: "musik",
    title: "Musik",
    teaser: "Von Beethoven bis Beats — Noten, Stars und Instrumente.",
    emoji: "🎵",
    category: "Unterhaltung",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "quiz",
    isPremium: false,
    sortOrder: 27,
  },
  {
    slug: "literatur-sprache",
    title: "Literatur & Sprache",
    teaser: "Autoren, Bestseller und Sprachkuriositäten.",
    emoji: "📖",
    category: "Wissen",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "quiz",
    isPremium: false,
    sortOrder: 28,
  },
  {
    slug: "essen-trinken",
    title: "Essen & Trinken",
    teaser: "Zutaten, Herkunft und Köstlichkeiten rund um den Globus.",
    emoji: "🍽️",
    category: "Unterhaltung",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "quiz",
    isPremium: false,
    sortOrder: 29,
  },
  {
    slug: "technik-digital",
    title: "Technik & Digital",
    teaser: "Bytes, KI und Gadgets — für Technik-Affine.",
    emoji: "💻",
    category: "Wissen",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "quiz",
    isPremium: false,
    sortOrder: 30,
  },
  {
    slug: "gemischt",
    title: "Gemischt",
    teaser: "Ein bunter Mix aus 20 Fragen über alle Themen — für echte Allrounder. Plus-Runde.",
    emoji: "🧠",
    category: "Wissen",
    level: "subscriber-only",
    estMinutes: 6,
    type: "quiz",
    isPremium: true,
    sortOrder: 31,
  },

  // Selbsttests -- unverändert, noch nicht neu abgeglichen
  {
    slug: "beziehungstyp",
    title: "Dein Beziehungstyp",
    teaser: "Wie tickst du in Beziehungen wirklich? Unterhaltsame Tendenz, keine Diagnose.",
    emoji: "💬",
    category: "Persönlichkeit",
    level: "weekly-freemium",
    estMinutes: 4,
    type: "psych",
    isPremium: false,
    sortOrder: 40,
  },
  {
    slug: "freundes-kompatibilitaet",
    title: "Freundes-Kompatibilität",
    teaser: "Macht den Test, teilt den Link, vergleicht eure Ergebnisse.",
    emoji: "🤝",
    category: "Kompatibilität",
    level: "weekly-freemium",
    estMinutes: 3,
    type: "psych",
    isPremium: false,
    sortOrder: 41,
  },
];

export const gameTypeMeta: Record<GameType, { label: string; description: string }> = {
  quiz: {
    label: "Quiz",
    description: "Schnelle Wissensrunden — Allgemein, Filme, Weltwissen & mehr.",
  },
  puzzle: {
    label: "Puzzle",
    description: "Kurze Logik- und Bilderrätsel zum Knobeln zwischendurch.",
  },
  psych: {
    label: "Selbsttests",
    description: "Kurzweilige Persönlichkeitsspiele — Unterhaltung, keine Beratung.",
  },
};
