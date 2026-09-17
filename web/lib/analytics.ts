import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";
import { games } from "@/content/games";
import { getUnlockable } from "@/content/unlockables";

export type GameEventType = "started" | "completed";

/** Feuert-und-vergisst-Tracking pro Runde -- Fehlerbehandlung übernimmt die
 * aufrufende Server Action (logGameEventAction), damit ein DB-Hänger nie den
 * Spielfluss unterbricht. */
export async function logGameEvent(
  slug: string,
  event: GameEventType,
  userId: string | null,
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseAdmin();
  await supabase.from("game_events").insert({ slug, event, user_id: userId });
}

export interface GameStatRow {
  slug: string;
  title: string;
  emoji: string;
  started: number;
  completed: number;
  completionRate: number;
}

/** Aggregiert Spiel-Events im Zeitraum [from, to] pro Slug, absteigend nach
 * Beliebtheit (gestartete Runden) -- Grundlage für die Admin-Charts. */
export async function getGameStats(from: Date, to: Date): Promise<GameStatRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("game_events")
    .select("slug, event")
    .gte("created_at", from.toISOString())
    .lte("created_at", to.toISOString());

  const counts = new Map<string, { started: number; completed: number }>();
  (data ?? []).forEach((row) => {
    const entry = counts.get(row.slug) ?? { started: 0, completed: 0 };
    if (row.event === "started") entry.started += 1;
    else entry.completed += 1;
    counts.set(row.slug, entry);
  });

  const metaBySlug = new Map(games.map((g) => [g.slug, { title: g.title, emoji: g.emoji }]));

  return [...counts.entries()]
    .map(([slug, c]) => {
      const meta = metaBySlug.get(slug);
      return {
        slug,
        title: meta?.title ?? slug,
        emoji: meta?.emoji ?? "🎮",
        started: c.started,
        completed: c.completed,
        completionRate: c.started > 0 ? Math.round((c.completed / c.started) * 100) : 0,
      };
    })
    .sort((a, b) => b.started - a.started);
}

export interface RevenueRow {
  slug: string;
  title: string;
  revenueCents: number;
  purchaseCount: number;
}

/** Umsatz pro Spiel im Zeitraum [from, to], absteigend -- gefiltert auf
 * tatsächlich bezahlte Käufe (paid_at), nicht nur angelegte Checkout-Versuche. */
export async function getRevenueByGame(from: Date, to: Date): Promise<RevenueRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("purchases")
    .select("quiz_slug, amount_cents")
    .eq("status", "paid")
    .gte("paid_at", from.toISOString())
    .lte("paid_at", to.toISOString());

  const totals = new Map<string, { revenueCents: number; purchaseCount: number }>();
  (data ?? []).forEach((p) => {
    const entry = totals.get(p.quiz_slug) ?? { revenueCents: 0, purchaseCount: 0 };
    entry.revenueCents += p.amount_cents;
    entry.purchaseCount += 1;
    totals.set(p.quiz_slug, entry);
  });

  return [...totals.entries()]
    .map(([slug, t]) => ({
      slug,
      title: getUnlockable(slug)?.title ?? slug,
      revenueCents: t.revenueCents,
      purchaseCount: t.purchaseCount,
    }))
    .sort((a, b) => b.revenueCents - a.revenueCents);
}
