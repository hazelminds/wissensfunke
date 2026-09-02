/**
 * Login-Streak, Ebene 1 (Briefing Abschnitt 2/4): rein kosmetisch, kein
 * Geldwert, kein Zufallselement — reißt bewusst ab, wenn ein Tag verpasst
 * wird ("Streak-Schutz" ist ein Ebene-3-Feature fürs Mini-Abo).
 *
 * Aktuell geräte-lokal via localStorage, weil es noch keine Konten gibt
 * (Ebene 1 Auth folgt). Sobald Supabase-Auth steht, zieht diese Logik
 * server-seitig auf eine `streaks`-Tabelle um — die Aufrufstellen
 * (recordDailyCompletion) bleiben dieselben.
 */

const STORAGE_KEY = "wf_streak";

export interface StreakState {
  count: number;
  lastCompletedDate: string; // YYYY-MM-DD
}

const EMPTY_STREAK: StreakState = { count: 0, lastCompletedDate: "" };

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dateKey(d);
}

export function readStreak(): StreakState {
  if (typeof window === "undefined") return EMPTY_STREAK;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StreakState) : EMPTY_STREAK;
  } catch {
    return EMPTY_STREAK;
  }
}

/**
 * Als abgeschlossen für heute vermerken. Zweimal am selben Tag aufrufen
 * (z. B. Tages-Rätsel UND Tages-Mini-Quiz) zählt nur einmal.
 */
export function recordDailyCompletion(): StreakState {
  const state = readStreak();
  const today = dateKey(new Date());
  if (state.lastCompletedDate === today) return state;

  const next: StreakState =
    state.lastCompletedDate === yesterdayKey()
      ? { count: state.count + 1, lastCompletedDate: today }
      : { count: 1, lastCompletedDate: today };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage nicht verfügbar — Streak bleibt für diese Sitzung leer.
  }
  return next;
}
