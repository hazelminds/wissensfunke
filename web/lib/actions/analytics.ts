"use server";

import { headers } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import {
  logGameEvent,
  getGameStats,
  getRevenueByGame,
  type GameEventType,
  type GameStatRow,
  type RevenueRow,
} from "@/lib/analytics";
import { logPageView, getPageViewStats, type PageViewStats } from "@/lib/pageViews";

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

/** Wird einmal pro Seitenwechsel aus PageViewTracker aufgerufen. Land und
 * Gerätetyp kommen aus Request-Headern (nie aus einer gespeicherten IP) --
 * siehe lib/pageViews.ts für Details zum Cookie-/Datenschutz-freien Ansatz. */
export async function logPageViewAction(path: string, referrer: string | null): Promise<void> {
  try {
    const h = await headers();
    const country = h.get("x-vercel-ip-country");
    const userAgent = h.get("user-agent");
    await logPageView(path, referrer, country, userAgent);
  } catch {
    // Tracking ist nice-to-have, nie blockierend für die Navigation.
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

export async function getRevenueByGameAction(fromISO: string, toISO: string): Promise<RevenueRow[]> {
  await requireAdmin();
  return getRevenueByGame(new Date(fromISO), new Date(toISO));
}

export async function getPageViewStatsAction(fromISO: string, toISO: string): Promise<PageViewStats> {
  await requireAdmin();
  return getPageViewStats(new Date(fromISO), new Date(toISO));
}
