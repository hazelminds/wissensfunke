/**
 * Runden-Medaillen für die Konto-Übersicht -- dieselbe Freischalt-Logik wie
 * bei den Streak-Medaillen (content/streakBadges.ts): Plus-exklusiv, Gratis-
 * Nutzer sehen alle Stufen als Anreiz, aber immer gesperrt. Zählt jede
 * abgeschlossene Runde über alle Spielarten hinweg (siehe totalRounds in
 * lib/stats.ts), nicht nur eine einzelne Spielart.
 */

export interface RoundBadge {
  id: string;
  title: string;
  threshold: number;
}

export const roundBadges: RoundBadge[] = [
  { id: "einstieg", title: "Einstieg", threshold: 1 },
  { id: "warmgespielt", title: "Warmgespielt", threshold: 10 },
  { id: "vielspieler", title: "Vielspieler", threshold: 50 },
  { id: "hundertschaft", title: "Hundertschaft", threshold: 100 },
  { id: "noggl-profi", title: "Noggl-Profi", threshold: 250 },
];
