"use server";

import { getCurrentUser } from "@/lib/auth";
import {
  submitScore,
  getLeaderboard,
  type ScoreCategory,
  type LeaderboardEntry,
  type SubmitScoreResult,
} from "@/lib/scores";

/** Wird direkt aus den Spiel-Komponenten aufgerufen, wenn eine Runde
 * abgeschlossen ist -- verschluckt jeden Fehler, damit ein DB-Hänger nie
 * das Ergebnis-Erlebnis stört. Gäste (kein User) werden übersprungen, dann
 * ohne "neue Bestleistung" (kein Konto, keine Historie zum Vergleichen). */
export async function submitScoreAction(
  category: ScoreCategory,
  slug: string,
  points: number,
  timeSeconds: number,
  moves: number | null,
): Promise<SubmitScoreResult> {
  try {
    const user = await getCurrentUser();
    if (!user) return { isNewBest: false, previousBest: null };
    return await submitScore(user.id, category, slug, points, timeSeconds, moves);
  } catch {
    // Bestenliste ist nice-to-have, nie blockierend fürs Spielerlebnis.
    return { isNewBest: false, previousBest: null };
  }
}

export async function getLeaderboardAction(category: ScoreCategory): Promise<LeaderboardEntry[]> {
  return getLeaderboard(category);
}
