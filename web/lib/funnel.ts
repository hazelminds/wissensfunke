import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";
import { getAllPlusStatuses } from "@/lib/plus";

export interface FunnelStats {
  /** Seitenaufrufe der letzten 30 Tage -- absichtlich keine Einzelbesucher
   * zählbar, da page_views ohne Cookie/Session-ID trackt (siehe lib/pageViews.ts). */
  pageViews30d: number;
  /** Gestartete Spielrunden der letzten 30 Tage, aufgeteilt nach Gast/eingeloggt. */
  gameStartsGuest30d: number;
  gameStartsRegistered30d: number;
  /** Cohort über alle registrierten Nutzer (nicht zeitraumgebunden): wie
   * viele haben je Trichterstufe je erreicht. Plus ist aktuell nur per
   * Admin-Geschenk erreichbar (kein Self-Service-Kauf), daher zählt
   * usersWithActivePlus den aktuellen Bestand, kein "hat je gekauft". */
  totalRegisteredUsers: number;
  usersWhoPlayed: number;
  usersWhoPurchased: number;
  usersWithActivePlus: number;
}

const EMPTY: FunnelStats = {
  pageViews30d: 0,
  gameStartsGuest30d: 0,
  gameStartsRegistered30d: 0,
  totalRegisteredUsers: 0,
  usersWhoPlayed: 0,
  usersWhoPurchased: 0,
  usersWithActivePlus: 0,
};

/** Trichter Gast -> Plus fürs Admin-Dashboard. Guest-Traffic (Seitenaufrufe,
 * Gast-Spielstarts) lässt sich nur als Volumen zeigen, nicht als eindeutige
 * Besucher -- daher zwei getrennte Blöcke: Top-of-Funnel-Volumen (30 Tage)
 * und eine Nutzer-Cohort (alle registrierten Nutzer, unabhängig vom Zeitraum). */
export async function getFunnelStats(): Promise<FunnelStats> {
  if (!isSupabaseConfigured()) return EMPTY;
  const supabase = getSupabaseAdmin();
  const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [{ data: usersPage }, { data: pageViews30d }, { data: gameStarts30d }, { data: allGameStarts }, { data: purchases }, plusMap] =
    await Promise.all([
      supabase.auth.admin.listUsers({ perPage: 1000 }),
      supabase.from("page_views").select("id").gte("created_at", since30d).limit(50000),
      supabase.from("game_events").select("user_id").eq("event", "started").gte("created_at", since30d).limit(50000),
      supabase.from("game_events").select("user_id").eq("event", "started").limit(50000),
      supabase.from("purchases").select("user_id").eq("status", "paid"),
      getAllPlusStatuses(),
    ]);

  const users = usersPage?.users ?? [];
  const starts30d = gameStarts30d ?? [];

  const playedUserIds = new Set((allGameStarts ?? []).filter((r) => r.user_id).map((r) => r.user_id as string));
  const purchasedUserIds = new Set((purchases ?? []).filter((r) => r.user_id).map((r) => r.user_id as string));
  const activePlusCount = [...plusMap.values()].filter((p) => p.active).length;

  return {
    pageViews30d: (pageViews30d ?? []).length,
    gameStartsGuest30d: starts30d.filter((r) => !r.user_id).length,
    gameStartsRegistered30d: starts30d.filter((r) => r.user_id).length,
    totalRegisteredUsers: users.length,
    usersWhoPlayed: users.filter((u) => playedUserIds.has(u.id)).length,
    usersWhoPurchased: users.filter((u) => purchasedUserIds.has(u.id)).length,
    usersWithActivePlus: activePlusCount,
  };
}
