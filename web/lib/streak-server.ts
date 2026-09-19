import "server-only";
import { createClient } from "@/lib/supabase/server";

/** Max. gleichzeitig gebunkerte Streak-Schutz-Freezes (Plus-Perk) -- +1/Monat,
 * gedeckelt. Geteilt zwischen Read (hier) und Write (lib/actions/streak.ts). */
export const MAX_STREAK_FREEZES = 2;

export interface ServerStreak {
  count: number;
  bestCount: number;
  lastCompletedDate: string | null;
  freezesAvailable: number;
}

/** Reiner Read, kein Server Action — wird nur aus Server Components aufgerufen (SiteHeader, Konto). */
export async function getServerStreak(userId: string): Promise<ServerStreak> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("streaks")
    .select("count, best_count, last_completed_date, freezes_available")
    .eq("user_id", userId)
    .maybeSingle();

  return data
    ? {
        count: data.count,
        bestCount: data.best_count,
        lastCompletedDate: data.last_completed_date,
        freezesAvailable: data.freezes_available,
      }
    : { count: 0, bestCount: 0, lastCompletedDate: null, freezesAvailable: 0 };
}
