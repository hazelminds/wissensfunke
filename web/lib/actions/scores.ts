"use server";

import { getCurrentUser } from "@/lib/auth";
import { submitScore, getLeaderboard, type ScoreCategory, type LeaderboardEntry } from "@/lib/scores";

/** Wird direkt aus den Spiel-Komponenten aufgerufen, wenn eine Runde
 * abgeschlossen ist -- verschluckt jeden Fehler, damit ein DB-Hänger nie
 * das Ergebnis-Erlebnis stört. Gäste (kein User) werden übersprungen. */
export async function submitScoreAction(
  category: ScoreCategory,
  slug: string,
  points: number,
  timeSeconds: number,
  moves: number | null,
): Promise<void> {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    await submitScore(user.id, category, slug, points, timeSeconds, moves);
  } catch {
    // Bestenliste ist nice-to-have, nie blockierend fürs Spielerlebnis.
  }
}

export async function getLeaderboardAction(category: ScoreCategory): Promise<LeaderboardEntry[]> {
  return getLeaderboard(category);
}
