"use server";

import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import { logGameEvent, getGameStats, type GameEventType, type GameStatRow } from "@/lib/analytics";

/** Wird direkt aus den Spiel-Komponenten aufgerufen (nicht über ein Formular) --
 * verschluckt jeden Fehler, damit ein DB-Hänger nie den Spielfluss stört. */
export async function logGameEventAction(slug: string, event: GameEventType): Promise<void> {
  try {
    const user = await getCurrentUser();
    await logGameEvent(slug, event, user?.id ?? null);
  } catch {
    // Tracking ist nice-to-have, nie blockierend fürs Spielerlebnis.
  }
}

async function requireAdmin() {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }
  return caller;
}

export async function getGameStatsAction(fromISO: string, toISO: string): Promise<GameStatRow[]> {
  await requireAdmin();
  return getGameStats(new Date(fromISO), new Date(toISO));
}
