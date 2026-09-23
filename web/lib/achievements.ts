import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

export interface AchievementsSummary {
  /** Alle abgeschlossenen Runden über alle Spielarten hinweg -- Basis für
   * die Runden-Medaillen (content/roundBadges.ts). */
  totalRounds: number;
  /** "Erste Krone": mindestens einmal die eigene bisherige Bestleistung für
   * irgendein Spiel wirklich übertroffen (nicht nur die allererste Runde
   * eines Spiels gespielt -- die hat nichts, was sie übertreffen könnte). */
  hasFirstCrown: boolean;
}

/** Läuft die eigenen scores-Zeilen in Spielreihenfolge durch und prüft, ob
 * irgendeine Runde die bis dahin beste Punktzahl für genau dieses Spiel
 * (Slug) übertroffen hat -- dieselbe Definition wie isNewBest in
 * lib/scores.ts, hier aber rückblickend über die ganze Historie statt nur
 * für die gerade abgeschlossene Runde. */
export function hasEverImprovedPersonalBest(rows: { slug: string; points: number }[]): boolean {
  const bestBySlug = new Map<string, number>();
  for (const row of rows) {
    const prevBest = bestBySlug.get(row.slug);
    if (prevBest !== undefined && row.points > prevBest) return true;
    bestBySlug.set(row.slug, Math.max(prevBest ?? row.points, row.points));
  }
  return false;
}

export async function getAchievementsSummary(userId: string): Promise<AchievementsSummary> {
  if (!isSupabaseConfigured()) return { totalRounds: 0, hasFirstCrown: false };
  const supabase = getSupabaseAdmin();

  const [{ count }, { data: scoreRows }] = await Promise.all([
    supabase
      .from("game_events")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("event", "completed"),
    supabase.from("scores").select("slug, points").eq("user_id", userId).order("created_at", { ascending: true }),
  ]);

  return {
    totalRounds: count ?? 0,
    hasFirstCrown: hasEverImprovedPersonalBest(scoreRows ?? []),
  };
}
