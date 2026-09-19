/**
 * Inhalt für "Plus entdecken" (PlusModal) -- Feature-Liste und Preis-Varianten.
 * Rein informativ/visuell bislang: die Buttons im Modal lösen noch keinen
 * echten Checkout aus (kommt, sobald die Bezahlanbindung dafür steht).
 */

export interface PlusFeature {
  emoji: string;
  title: string;
  description: string;
}

export const plusFeatures: PlusFeature[] = [
  {
    emoji: "🎮",
    title: "Unbegrenzt spielen",
    description: "Keine Tageslimits mehr — so viele Runden wie du willst, im gebuchten Zeitraum.",
  },
  {
    emoji: "🧊",
    title: "Streak-Schutz",
    description: "Mal einen Tag verpasst? Pro Monat rettet dich automatisch ein Streak-Schutz, statt dass deine Serie abreißt.",
  },
  {
    emoji: "📊",
    title: "Ausführliche Auswertungen",
    description: "Lösung, Erklärung und Themen-Analyse zu jeder Runde — nicht nur das Endergebnis.",
  },
  {
    emoji: "🏆",
    title: "Volle Bestenliste",
    description: "Sieh, wo du im Vergleich zu allen anderen stehst — nach Punkten, Zeit und Zügen.",
  },
  {
    emoji: "✍️",
    title: "Individueller Nutzername",
    description: "Wähl deinen eigenen Namen für die Bestenliste, statt einer anonymen Kennung.",
  },
];

export interface PlusTier {
  id: "day" | "month";
  title: string;
  emoji: string;
  priceCents: number;
  priceSuffix: string;
  description: string;
  highlight?: boolean;
}

export const plusTiers: PlusTier[] = [
  {
    id: "day",
    title: "Tages-Ticket",
    emoji: "⚡",
    priceCents: 499,
    priceSuffix: "einmalig",
    description: "Für heute unbegrenzt spielen — perfekt zum Reinschnuppern.",
  },
  {
    id: "month",
    title: "Monats-Abo",
    emoji: "👑",
    priceCents: 999,
    priceSuffix: "pro Monat",
    description: "Dauerhaft unbegrenzt, jederzeit kündbar — der beste Preis pro Runde.",
    highlight: true,
  },
];
