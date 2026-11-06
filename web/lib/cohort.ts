import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

/** Montag 00:00 UTC der Woche, in der `d` liegt -- Wochenstart wie im
 * deutschen Kalenderverständnis üblich. */
function startOfWeekUTC(d: Date): Date {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  date.setUTCDate(date.getUTCDate() + diffToMonday);
  return date;
}

function addWeeksUTC(d: Date, n: number): Date {
  const out = new Date(d);
  out.setUTCDate(out.getUTCDate() + n * 7);
  return out;
}

function isoDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export interface CohortRow {
  /** Anzeigeformat "TT.MM." des Wochenstarts (Montag). */
  weekLabel: string;
  weekStartISO: string;
  size: number;
  /** Prozent noch aktiv je Wochen-Offset ab Anmeldewoche (Index 0 = Anmeldewoche
   * selbst). null = diese Woche liegt noch in der Zukunft, nicht messbar. */
  retention: (number | null)[];
}

export interface CohortStats {
  /** Neueste Kohorte zuerst. */
  rows: CohortRow[];
  weekCount: number;
}

const EMPTY = (weekCount: number): CohortStats => ({ rows: [], weekCount });

/**
 * Kohorten-/Retentions-Tabelle fürs Admin-Dashboard: Nutzer:innen werden
 * nach Anmeldewoche gruppiert, "aktiv" heißt mindestens ein game_events-
 * Eintrag (Spiel gestartet/beendet) in der jeweiligen Woche. Betrachtet nur
 * die letzten `cohortWeeks` Anmeldewochen, sonst wächst die Tabelle über die
 * Zeit unbegrenzt.
 */
export async function getCohortStats(weekCount = 6, cohortWeeks = 10): Promise<CohortStats> {
  if (!isSupabaseConfigured()) return EMPTY(weekCount);
  const supabase = getSupabaseAdmin();

  const { data: usersPage } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const allUsers = usersPage?.users ?? [];
  if (allUsers.length === 0) return EMPTY(weekCount);

  const now = new Date();
  const currentWeekStart = startOfWeekUTC(now);
  const earliestCohortStart = addWeeksUTC(currentWeekStart, -(cohortWeeks - 1));

  const cohortByUser = new Map<string, Date>();
  for (const u of allUsers) {
    const weekStart = startOfWeekUTC(new Date(u.created_at));
    if (weekStart < earliestCohortStart) continue;
    cohortByUser.set(u.id, weekStart);
  }
  if (cohortByUser.size === 0) return EMPTY(weekCount);

  const { data: events } = await supabase
    .from("game_events")
    .select("user_id, created_at")
    .not("user_id", "is", null)
    .gte("created_at", earliestCohortStart.toISOString())
    .limit(50000);

  const activeWeeksByUser = new Map<string, Set<string>>();
  for (const e of events ?? []) {
    if (!e.user_id) continue;
    const weekKey = isoDateKey(startOfWeekUTC(new Date(e.created_at)));
    let set = activeWeeksByUser.get(e.user_id);
    if (!set) {
      set = new Set();
      activeWeeksByUser.set(e.user_id, set);
    }
    set.add(weekKey);
  }

  const cohortGroups = new Map<string, string[]>();
  for (const [userId, weekStart] of cohortByUser) {
    const key = isoDateKey(weekStart);
    const arr = cohortGroups.get(key);
    if (arr) arr.push(userId);
    else cohortGroups.set(key, [userId]);
  }

  const rows: CohortRow[] = [...cohortGroups.entries()]
    .map(([weekKey, userIds]) => {
      const weekStart = new Date(`${weekKey}T00:00:00Z`);
      const retention = Array.from({ length: weekCount }, (_, offset) => {
        const targetWeekStart = addWeeksUTC(weekStart, offset);
        if (targetWeekStart > now) return null;
        const targetKey = isoDateKey(targetWeekStart);
        const activeCount = userIds.filter((id) => activeWeeksByUser.get(id)?.has(targetKey)).length;
        return Math.round((activeCount / userIds.length) * 100);
      });
      return {
        weekLabel: weekStart.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
        weekStartISO: weekKey,
        size: userIds.length,
        retention,
      };
    })
    .sort((a, b) => (a.weekStartISO < b.weekStartISO ? 1 : -1));

  return { rows, weekCount };
}
