"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { getPlusStatus } from "@/lib/plus";
import { MAX_STREAK_FREEZES } from "@/lib/streak-server";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function currentMonthKey(): string {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

/** Ganze Tage zwischen zwei YYYY-MM-DD-Daten (b nach a). */
function daysBetween(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(`${b}T00:00:00Z`).getTime() - new Date(`${a}T00:00:00Z`).getTime()) / msPerDay);
}

/**
 * Server-seitiges Pendant zu lib/streak.ts (localStorage) — für eingeloggte
 * Nutzer die Quelle der Wahrheit. Ohne Login oder ohne konfiguriertes
 * Supabase-Projekt ein No-Op (Rückgabe null), der Aufrufer fällt dann auf
 * die lokale Variante zurück.
 *
 * Streak-Schutz (Plus-Perk): Plus-Mitglieder bekommen pro Kalendermonat einen
 * Freeze gutgeschrieben (gedeckelt auf MAX_STREAK_FREEZES), "lazy" beim
 * nächsten Abschluss statt per Cron-Job. Wurde genau ein Tag verpasst und ist
 * ein Freeze vorhanden, wird er automatisch verbraucht und die Serie läuft
 * weiter, statt auf 1 zurückzufallen.
 */
export async function recordServerStreakCompletion() {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const [{ data: existing }, plus] = await Promise.all([
    supabase
      .from("streaks")
      .select("count, best_count, last_completed_date, freezes_available, freezes_granted_month")
      .eq("user_id", user.id)
      .maybeSingle(),
    getPlusStatus(user.id),
  ]);

  const today = todayKey();
  if (existing?.last_completed_date === today) {
    return {
      count: existing.count,
      bestCount: existing.best_count,
      lastCompletedDate: today,
      freezesAvailable: existing.freezes_available,
      freezesUsed: 0,
    };
  }

  const month = currentMonthKey();
  let freezesAvailable = existing?.freezes_available ?? 0;
  if (plus.active && existing?.freezes_granted_month !== month) {
    freezesAvailable = Math.min(MAX_STREAK_FREEZES, freezesAvailable + 1);
  }
  const freezesGrantedMonth = plus.active ? month : (existing?.freezes_granted_month ?? null);

  const missedDays = existing?.last_completed_date ? daysBetween(existing.last_completed_date, today) - 1 : null;

  let nextCount: number;
  let freezesUsed = 0;
  if (existing?.last_completed_date === yesterdayKey()) {
    nextCount = existing.count + 1;
  } else if (plus.active && missedDays !== null && missedDays >= 1 && missedDays <= freezesAvailable) {
    // Lücke durch Streak-Schutz überbrückt -- entsprechend viele Freezes weg, Serie bleibt.
    freezesUsed = missedDays;
    freezesAvailable -= freezesUsed;
    nextCount = existing!.count + 1;
  } else {
    nextCount = 1;
  }
  const nextBest = Math.max(nextCount, existing?.best_count ?? 0);

  await supabase.from("streaks").upsert(
    {
      user_id: user.id,
      count: nextCount,
      best_count: nextBest,
      last_completed_date: today,
      freezes_available: freezesAvailable,
      freezes_granted_month: freezesGrantedMonth,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  return { count: nextCount, bestCount: nextBest, lastCompletedDate: today, freezesAvailable, freezesUsed };
}
