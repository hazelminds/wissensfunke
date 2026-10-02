import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";
import { getAllPlusStatuses } from "@/lib/plus";

export interface FunnelStats {
  /** Seitenaufrufe im gewählten Zeitraum -- absichtlich keine Einzelbesucher
   * zählbar, da page_views ohne Cookie/Session-ID trackt (siehe lib/pageViews.ts). */
  pageViews: number;
  /** Gestartete Spielrunden im gewählten Zeitraum, aufgeteilt nach Gast/eingeloggt. */
  gameStartsGuest: number;
  gameStartsRegistered: number;
  /** Cohort = Nutzer:innen, die im gewählten Zeitraum registriert wurden.
   * Die folgenden Werte zeigen, wie viele davon JE (auch nach dem Zeitraum)
   * die jeweilige Stufe erreicht haben -- klassische Cohort-Logik, nicht
   * "hat das auch noch im selben Zeitraum gemacht". Plus ist aktuell nur per
   * Admin-Geschenk erreichbar (kein Self-Service-Kauf), daher zählt
   * usersWithActivePlus den aktuellen Bestand dieser Cohort. */
  totalRegisteredUsers: number;
  usersWhoPlayed: number;
  usersWhoPurchased: number;
  usersWithActivePlus: number;
}

const EMPTY: FunnelStats = {
  pageViews: 0,
  gameStartsGuest: 0,
  gameStartsRegistered: 0,
  totalRegisteredUsers: 0,
  usersWhoPlayed: 0,
  usersWhoPurchased: 0,
  usersWithActivePlus: 0,
};

/** Trichter Gast -> Plus fürs Admin-Dashboard, für einen wählbaren Zeitraum
 * [from, to]. Guest-Traffic (Seitenaufrufe, Gast-Spielstarts) lässt sich nur
 * als Volumen im Zeitraum zeigen, nicht als eindeutige Besucher -- daher
 * getrennt von der Nutzer-Cohort (alle im Zeitraum registrierten Nutzer). */
export async function getFunnelStats(from: Date, to: Date): Promise<FunnelStats> {
  if (!isSupabaseConfigured()) return EMPTY;
  const supabase = getSupabaseAdmin();
  const fromISO = from.toISOString();
  const toISO = to.toISOString();

  const [{ data: usersPage }, { data: pageViewsInRange }, { data: gameStartsInRange }, { data: allGameStarts }, { data: purchases }, plusMap] =
    await Promise.all([
      supabase.auth.admin.listUsers({ perPage: 1000 }),
      supabase.from("page_views").select("id").gte("created_at", fromISO).lte("created_at", toISO).limit(50000),
      supabase
        .from("game_events")
        .select("user_id")
        .eq("event", "started")
        .gte("created_at", fromISO)
        .lte("created_at", toISO)
        .limit(50000),
      supabase.from("game_events").select("user_id").eq("event", "started").limit(50000),
      supabase.from("purchases").select("user_id").eq("status", "paid"),
      getAllPlusStatuses(),
    ]);

  const allUsers = usersPage?.users ?? [];
  const cohort = allUsers.filter((u) => {
    const created = new Date(u.created_at);
    return created >= from && created <= to;
  });

  const startsInRange = gameStartsInRange ?? [];
  const playedUserIds = new Set((allGameStarts ?? []).filter((r) => r.user_id).map((r) => r.user_id as string));
  const purchasedUserIds = new Set((purchases ?? []).filter((r) => r.user_id).map((r) => r.user_id as string));

  return {
    pageViews: (pageViewsInRange ?? []).length,
    gameStartsGuest: startsInRange.filter((r) => !r.user_id).length,
    gameStartsRegistered: startsInRange.filter((r) => r.user_id).length,
    totalRegisteredUsers: cohort.length,
    usersWhoPlayed: cohort.filter((u) => playedUserIds.has(u.id)).length,
    usersWhoPurchased: cohort.filter((u) => purchasedUserIds.has(u.id)).length,
    usersWithActivePlus: cohort.filter((u) => plusMap.get(u.id)?.active).length,
  };
}
