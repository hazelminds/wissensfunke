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

export interface GameModule {
  slug: string;
  title: string;
  teaser: string;
  emoji: string;
  category: string;
  level: ProductLevel;
  estMinutes: number;
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
    title: "Tages-Rätsel",
    teaser: "Ein neues Logik- oder Wortspiel-Rätsel, jeden Tag um Mitternacht.",
    emoji: "🧩",
    category: "Logik",
    level: "daily-free",
    estMinutes: 3,
  },
  {
    slug: "tages-mini-quiz",
    title: "Tages-Mini-Quiz",
    teaser: "Drei Fragen quer durchs Allgemeinwissen — für den Login-Streak.",
    emoji: "⚡",
    category: "Allgemeinwissen",
    level: "daily-free",
    estMinutes: 2,
  },

  // Ebene 2 – wöchentliche Selbst-Tests (Freemium)
  {
    slug: "allgemeinwissen",
    title: "Allgemeinwissen-Quiz",
    teaser: "Fünf Fragen quer durch fünf Themenwelten — direkt Ergebnis & Rang sehen.",
    emoji: "🌍",
    category: "Wissen",
    level: "weekly-freemium",
    estMinutes: 2,
  },
  {
    slug: "beziehungstyp",
    title: "Dein Beziehungstyp",
    teaser: "Wie tickst du in Beziehungen wirklich? Unterhaltsame Tendenz, keine Diagnose.",
    emoji: "💬",
    category: "Persönlichkeit",
    level: "weekly-freemium",
    estMinutes: 4,
  },
  {
    slug: "freundes-kompatibilitaet",
    title: "Freundes-Kompatibilität",
    teaser: "Macht den Test, teilt den Link, vergleicht eure Ergebnisse.",
    emoji: "🤝",
    category: "Kompatibilität",
    level: "weekly-freemium",
    estMinutes: 3,
  },
];
