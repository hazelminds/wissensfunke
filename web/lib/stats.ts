import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";
import { titleForSlug } from "@/lib/scores";
import { getServerStreak } from "@/lib/streak-server";

export interface GameRef {
  slug: string;
  title: string;
}

export interface UserStats {
  totalRounds: number;
  favoriteGame: (GameRef & { count: number }) | null;
  bestScore: (GameRef & { points: number }) | null;
  roundsThisWeek: number;
  roundsLastWeek: number;
  quiz: { count: number; avgPoints: number; best: (GameRef & { points: number }) | null };
  crossword: { count: number; bestTimeSeconds: number | null };
  sliding: { count: number; bestTimeSeconds: number | null; bestMoves: number | null };
  whoami: { count: number };
}

const EMPTY_STATS: UserStats = {
  totalRounds: 0,
  favoriteGame: null,
  bestScore: null,
  roundsThisWeek: 0,
  roundsLastWeek: 0,
  quiz: { count: 0, avgPoints: 0, best: null },
  crossword: { count: 0, bestTimeSeconds: null },
  sliding: { count: 0, bestTimeSeconds: null, bestMoves: null },
  whoami: { count: 0 },
};

/**
 * Persönliche Statistik fürs Konto -- zwei Quellen kombiniert:
 * `game_events` (event="completed") deckt JEDE Spielart ab, auch "Wer bin
 * ich?", das keinen Score schreibt -- daher Grundlage für Gesamtzahl,
 * Lieblingsspiel und den Wochenvergleich. `scores` liefert Punkte/Zeit/Züge,
 * aber nur für Quiz und Puzzle (Wissens-Quiz, Kreuzworträtsel, Schiebepuzzle).
 * Kreuzworträtsel/Schiebepuzzle teilen sich category="puzzle", werden hier
 * über den Slug-Präfix auseinandergehalten.
 */
export async function getUserStats(userId: string): Promise<UserStats> {
  if (!isSupabaseConfigured()) return EMPTY_STATS;
  const supabase = getSupabaseAdmin();

  const [{ data: events }, { data: scores }] = await Promise.all([
    supabase.from("game_events").select("slug, created_at").eq("user_id", userId).eq("event", "completed"),
    supabase.from("scores").select("category, slug, points, time_seconds, moves").eq("user_id", userId),
  ]);

  const eventRows = events ?? [];
  const scoreRows = scores ?? [];

  const totalRounds = eventRows.length;

  const countsBySlug = new Map<string, number>();
  for (const e of eventRows) countsBySlug.set(e.slug, (countsBySlug.get(e.slug) ?? 0) + 1);
  let favoriteGame: UserStats["favoriteGame"] = null;
  for (const [slug, count] of countsBySlug) {
    if (!favoriteGame || count > favoriteGame.count) favoriteGame = { slug, title: titleForSlug(slug), count };
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const now = Date.now();
  let roundsThisWeek = 0;
  let roundsLastWeek = 0;
  for (const e of eventRows) {
    const ageDays = (now - new Date(e.created_at).getTime()) / dayMs;
    if (ageDays >= 0 && ageDays < 7) roundsThisWeek += 1;
    else if (ageDays >= 7 && ageDays < 14) roundsLastWeek += 1;
  }

  let bestScore: UserStats["bestScore"] = null;
  for (const s of scoreRows) {
    if (!bestScore || s.points > bestScore.points) bestScore = { points: s.points, slug: s.slug, title: titleForSlug(s.slug) };
  }

  const quizRows = scoreRows.filter((s) => s.category === "quiz");
  let quizBest: UserStats["quiz"]["best"] = null;
  for (const s of quizRows) {
    if (!quizBest || s.points > quizBest.points) quizBest = { points: s.points, slug: s.slug, title: titleForSlug(s.slug) };
  }
  const quiz = {
    count: quizRows.length,
    avgPoints: quizRows.length ? Math.round(quizRows.reduce((sum, s) => sum + s.points, 0) / quizRows.length) : 0,
    best: quizBest,
  };

  const crosswordRows = scoreRows.filter((s) => s.category === "puzzle" && s.slug.startsWith("kreuzwortraetsel-"));
  const crossword = {
    count: crosswordRows.length,
    bestTimeSeconds: crosswordRows.length ? Math.min(...crosswordRows.map((s) => s.time_seconds)) : null,
  };

  const slidingRows = scoreRows.filter((s) => s.category === "puzzle" && s.slug.startsWith("schiebepuzzle-"));
  const slidingMoves = slidingRows.map((s) => s.moves).filter((m): m is number => m !== null);
  const sliding = {
    count: slidingRows.length,
    bestTimeSeconds: slidingRows.length ? Math.min(...slidingRows.map((s) => s.time_seconds)) : null,
    bestMoves: slidingMoves.length ? Math.min(...slidingMoves) : null,
  };

  const whoami = { count: eventRows.filter((e) => e.slug.startsWith("wer-bin-ich-")).length };

  return { totalRounds, favoriteGame, bestScore, roundsThisWeek, roundsLastWeek, quiz, crossword, sliding, whoami };
}

export interface WeeklyRecap {
  rounds: number;
  favoriteGame: (GameRef & { count: number }) | null;
  bestWeekday: string | null;
  streakCount: number;
  /** Runden pro Wochentag, Montag zuerst (7 Einträge) -- fürs kleine
   * Aktivitäts-Balkendiagramm auf der geteilten Karte. */
  dailyCounts: number[];
}

const WEEKDAY_NAMES = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
// JS Date.getDay() zählt Sonntag als 0 -- fürs Balkendiagramm wird Montag
// zuerst gebraucht, daher diese Umsortierung von Index (0=So..6=Sa) zu
// Montag-zuerst-Reihenfolge.
const MONDAY_FIRST_ORDER = [1, 2, 3, 4, 5, 6, 0];

/**
 * Kurzer "Deine Woche"-Rückblick fürs Teilen (letzte 7 Tage, rollierend --
 * dieselbe Definition wie roundsThisWeek oben). Eigene, schlanke Abfrage
 * statt getUserStats() wiederzuverwenden, weil hier nur auf diesen Zeitraum
 * eingegrenzte Daten gebraucht werden, keine Gesamt-Historie. `null`, wenn
 * diese Woche noch gar nichts gespielt wurde -- dann gibt's nichts zu teilen.
 */
export async function getWeeklyRecap(userId: string): Promise<WeeklyRecap | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseAdmin();

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [{ data: events }, streak] = await Promise.all([
    supabase
      .from("game_events")
      .select("slug, created_at")
      .eq("user_id", userId)
      .eq("event", "completed")
      .gte("created_at", sevenDaysAgo),
    getServerStreak(userId),
  ]);

  const rows = events ?? [];
  if (rows.length === 0) return null;

  const countsBySlug = new Map<string, number>();
  const countsByWeekday = new Map<number, number>();
  for (const e of rows) {
    countsBySlug.set(e.slug, (countsBySlug.get(e.slug) ?? 0) + 1);
    const weekday = new Date(e.created_at).getDay();
    countsByWeekday.set(weekday, (countsByWeekday.get(weekday) ?? 0) + 1);
  }

  let favoriteGame: WeeklyRecap["favoriteGame"] = null;
  for (const [slug, count] of countsBySlug) {
    if (!favoriteGame || count > favoriteGame.count) favoriteGame = { slug, title: titleForSlug(slug), count };
  }

  let bestWeekday: WeeklyRecap["bestWeekday"] = null;
  let bestWeekdayCount = 0;
  for (const [weekday, count] of countsByWeekday) {
    if (count > bestWeekdayCount) {
      bestWeekdayCount = count;
      bestWeekday = WEEKDAY_NAMES[weekday];
    }
  }

  const dailyCounts = MONDAY_FIRST_ORDER.map((weekday) => countsByWeekday.get(weekday) ?? 0);

  return { rounds: rows.length, favoriteGame, bestWeekday, streakCount: streak.count, dailyCounts };
}
