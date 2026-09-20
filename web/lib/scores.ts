import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";
import { getAllPlusStatuses } from "@/lib/plus";
import { games } from "@/content/games";
import { formatTimeLabel } from "@/lib/formatTime";

export { formatTimeLabel };

export type ScoreCategory = "quiz" | "puzzle";

/** Eine Zeile pro abgeschlossener Runde -- nur für eingeloggte Nutzer:innen
 * (Gäste haben keine dauerhafte Identität, die auf einer Bestenliste Sinn
 * ergäbe). Wird für jede Runde geschrieben, unabhängig vom Plus-Status --
 * sichtbar in der Bestenliste ist ein Score erst mit Plus + Spielername
 * (siehe getLeaderboard), die Rohdaten bleiben aber erhalten. */
export async function submitScore(
  userId: string,
  category: ScoreCategory,
  slug: string,
  points: number,
  timeSeconds: number,
  moves: number | null,
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseAdmin();
  await supabase.from("scores").insert({
    user_id: userId,
    category,
    slug,
    points,
    time_seconds: timeSeconds,
    moves,
  });
}

export interface LeaderboardEntry {
  username: string;
  subtitle: string;
  timeLabel: string;
  points: number;
}

export function titleForSlug(slug: string): string {
  return games.find((g) => g.slug === slug)?.title ?? slug;
}

/**
 * Bestenliste für eine Kategorie: pro Nutzer:in nur die beste Punktzahl,
 * absteigend sortiert. Sichtbar ist ein Eintrag nur, wenn die Person aktives
 * Plus hat UND einen Spielernamen gesetzt hat (beides Voraussetzung, um
 * überhaupt einen anzeigbaren Namen zu haben -- siehe lib/actions/profile.ts).
 * Rohdaten für alle Nutzer:innen bleiben in der scores-Tabelle erhalten,
 * auch wenn sie hier (noch) nicht auftauchen.
 */
export async function getLeaderboard(category: ScoreCategory, limit = 20): Promise<LeaderboardEntry[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();

  const { data: rows } = await supabase
    .from("scores")
    .select("user_id, slug, points, time_seconds")
    .eq("category", category)
    .order("points", { ascending: false })
    .limit(1000);

  if (!rows || rows.length === 0) return [];

  // rows sind bereits nach points absteigend sortiert -- die erste Zeile
  // pro user_id ist also automatisch deren beste.
  const bestByUser = new Map<string, (typeof rows)[number]>();
  for (const row of rows) {
    if (!bestByUser.has(row.user_id)) bestByUser.set(row.user_id, row);
  }

  const [{ data: usersPage }, plusMap] = await Promise.all([
    supabase.auth.admin.listUsers({ perPage: 1000 }),
    getAllPlusStatuses(),
  ]);
  const userMap = new Map((usersPage?.users ?? []).map((u) => [u.id, u]));

  const entries: LeaderboardEntry[] = [];
  for (const [userId, row] of bestByUser.entries()) {
    const plus = plusMap.get(userId);
    const username = (userMap.get(userId)?.user_metadata?.username as string | undefined)?.trim();
    if (!plus?.active || !username) continue;
    entries.push({
      username,
      subtitle: titleForSlug(row.slug),
      timeLabel: formatTimeLabel(row.time_seconds),
      points: row.points,
    });
  }

  return entries.sort((a, b) => b.points - a.points).slice(0, limit);
}
