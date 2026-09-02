"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Server-seitiges Pendant zu lib/streak.ts (localStorage) — für eingeloggte
 * Nutzer die Quelle der Wahrheit. Ohne Login oder ohne konfiguriertes
 * Supabase-Projekt ein No-Op (Rückgabe null), der Aufrufer fällt dann auf
 * die lokale Variante zurück.
 */
export async function recordServerStreakCompletion() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("streaks")
    .select("count, last_completed_date")
    .eq("user_id", user.id)
    .maybeSingle();

  const today = todayKey();
  if (existing?.last_completed_date === today) {
    return { count: existing.count, lastCompletedDate: today };
  }

  const nextCount = existing?.last_completed_date === yesterdayKey() ? existing.count + 1 : 1;

  await supabase.from("streaks").upsert(
    { user_id: user.id, count: nextCount, last_completed_date: today, updated_at: new Date().toISOString() },
    { onConflict: "user_id" },
  );

  return { count: nextCount, lastCompletedDate: today };
}
