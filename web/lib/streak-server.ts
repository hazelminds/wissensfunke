import "server-only";
import { createClient } from "@/lib/supabase/server";

export interface ServerStreak {
  count: number;
  lastCompletedDate: string | null;
}

/** Reiner Read, kein Server Action — wird nur aus Server Components aufgerufen (SiteHeader). */
export async function getServerStreak(userId: string): Promise<ServerStreak> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("streaks")
    .select("count, last_completed_date")
    .eq("user_id", userId)
    .maybeSingle();

  return data
    ? { count: data.count, lastCompletedDate: data.last_completed_date }
    : { count: 0, lastCompletedDate: null };
}
