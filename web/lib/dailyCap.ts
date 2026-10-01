/**
 * 2-Gratis-Runden-pro-Tag-Limit für eingeloggte Nicht-Plus-Nutzer auf
 * Weekly-Freemium-Spielen (Base44-Vorbild: Play.jsx). Gäste sind bewusst
 * NICHT limitiert — genau wie im Original.
 *
 * Aktuell geräte-lokal via localStorage (kein Scores-Tabellen-Tracking
 * in Supabase). Sobald die echte Scores-Tabelle steht, zieht das auf eine
 * serverseitige Zählung um, wie schon beim Streak-System.
 */

const STORAGE_KEY = "nog_daily_plays";
const DAILY_CAP = 2;

interface DailyPlayState {
  date: string; // YYYY-MM-DD
  count: number;
}

/** Lokales Kalenderdatum, nicht UTC -- toISOString() wäre UTC-basiert und
 * würde das Limit für Nutzer:innen östlich von UTC (z. B. UTC+8) erst
 * Stunden nach ihrer lokalen Mitternacht zurücksetzen. */
function todayKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readState(): DailyPlayState {
  if (typeof window === "undefined") return { date: todayKey(), count: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed = JSON.parse(raw) as DailyPlayState;
    return parsed.date === todayKey() ? parsed : { date: todayKey(), count: 0 };
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

export function getTodayPlayCount(): number {
  return readState().count;
}

export function hasReachedDailyCap(): boolean {
  return readState().count >= DAILY_CAP;
}

export function incrementTodayPlayCount(): void {
  const state = readState();
  const next: DailyPlayState = { date: todayKey(), count: state.count + 1 };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage nicht verfügbar — Limit gilt nur für diese Sitzung nicht.
  }
}
