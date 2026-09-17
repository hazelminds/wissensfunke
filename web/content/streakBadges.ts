/**
 * Streak-Medaillen für die Konto-Übersicht. Das Sammeln (echtes Freischalten
 * eines erreichten Badges) ist ein Plus-Feature -- Gratis-Nutzer sehen alle
 * sechs Stufen als Anreiz, aber immer gesperrt, unabhängig vom eigenen
 * Streak-Stand (siehe app/konto/page.tsx).
 */

export interface StreakBadge {
  id: string;
  title: string;
  threshold: number;
}

export const streakBadges: StreakBadge[] = [
  { id: "auflegen", title: "Auflegen", threshold: 1 },
  { id: "drei-tage", title: "Drei-Tage-Serie", threshold: 3 },
  { id: "woche", title: "Wochenstreak", threshold: 7 },
  { id: "zwei-wochen", title: "Zwei-Wochen-Serie", threshold: 14 },
  { id: "monat", title: "Monatsserie", threshold: 30 },
  { id: "century", title: "Century", threshold: 100 },
];
