import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

/** Rohdaten älter als das werden zu Tages-Summen verdichtet und gelöscht --
 * hält page_views klein, ohne die Statistik zu verlieren (siehe rollupOldPageViews). */
const ROLLUP_AFTER_DAYS = 90;
/** Batch-Größe pro Rollup-Durchlauf, damit ein einzelner Aufruf nie zu viele
 * Zeilen auf einmal liest/schreibt -- läuft bei Bedarf einfach beim nächsten
 * Admin-Seitenaufruf weiter. */
const ROLLUP_BATCH_SIZE = 5000;

function classifyDevice(userAgent: string | null): string {
  if (!userAgent) return "unknown";
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet/.test(ua)) return "tablet";
  if (/mobile|iphone|android/.test(ua)) return "mobile";
  return "desktop";
}

/** Nur die verlinkende Domain wird gespeichert, nie die volle Referrer-URL --
 * die könnte Query-Parameter mit potenziell sensiblen Daten enthalten. */
function referrerDomain(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname;
  } catch {
    return null;
  }
}

/** Anonymes Seitenaufruf-Event -- kein Cookie, keine gespeicherte IP, kein
 * über Sitzungen hinweg verknüpfbarer Identifier. `country` kommt aus dem
 * Vercel-Edge-Header (x-vercel-ip-country), nie aus einer gespeicherten IP. */
export async function logPageView(
  path: string,
  referrer: string | null,
  country: string | null,
  userAgent: string | null,
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseAdmin();
  await supabase.from("page_views").insert({
    path,
    referrer: referrerDomain(referrer),
    country: country ?? "unknown",
    device: classifyDevice(userAgent),
  });
}

export interface PageViewStats {
  total: number;
  byDay: { date: string; views: number }[];
  topPaths: { path: string; views: number }[];
  topCountries: { country: string; views: number }[];
  byDevice: { device: string; views: number }[];
}

/** Aggregiert Seitenaufrufe im Zeitraum [from, to] -- Grundlage fürs Admin-
 * Dashboard. Liest bewusst nur aus der Rohdaten-Tabelle: die üblichen
 * Zeiträume dort (dieser/letzter Monat) liegen weit innerhalb der 90-Tage-
 * Aufbewahrung vor dem Rollup, ein älterer Zeitraum bräuchte zusätzlich
 * page_view_daily -- aktuell nicht nötig, da keine Presets so weit zurückgehen. */
export async function getPageViewStats(from: Date, to: Date): Promise<PageViewStats> {
  if (!isSupabaseConfigured()) {
    return { total: 0, byDay: [], topPaths: [], topCountries: [], byDevice: [] };
  }
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("page_views")
    .select("path, country, device, created_at")
    .gte("created_at", from.toISOString())
    .lte("created_at", to.toISOString())
    .limit(50000);

  const rows = data ?? [];
  const byDayMap = new Map<string, number>();
  const pathMap = new Map<string, number>();
  const countryMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();

  for (const r of rows) {
    const day = r.created_at.slice(0, 10);
    byDayMap.set(day, (byDayMap.get(day) ?? 0) + 1);
    pathMap.set(r.path, (pathMap.get(r.path) ?? 0) + 1);
    countryMap.set(r.country, (countryMap.get(r.country) ?? 0) + 1);
    deviceMap.set(r.device, (deviceMap.get(r.device) ?? 0) + 1);
  }

  const sortDesc = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]);

  return {
    total: rows.length,
    byDay: [...byDayMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, views]) => ({ date, views })),
    topPaths: sortDesc(pathMap)
      .slice(0, 10)
      .map(([path, views]) => ({ path, views })),
    topCountries: sortDesc(countryMap)
      .slice(0, 10)
      .map(([country, views]) => ({ country, views })),
    byDevice: sortDesc(deviceMap).map(([device, views]) => ({ device, views })),
  };
}

/**
 * Verdichtet page_views-Zeilen älter als ROLLUP_AFTER_DAYS zu Tages-Summen
 * in page_view_daily und löscht danach die Einzelzeilen -- hält die
 * Rohdaten-Tabelle im kostenlosen Supabase-Tarif klein. Verarbeitet pro
 * Aufruf nur eine Batch; bei mehr alten Zeilen holt der nächste Aufruf
 * (nächster Admin-Seitenaufruf) den Rest nach. Addiert zu bereits
 * vorhandenen Tages-Summen, statt sie zu überschreiben -- ein Rollup kann
 * also mehrfach über denselben Tag laufen, ohne Daten zu verlieren.
 */
export async function rollupOldPageViews(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseAdmin();
  const cutoff = new Date(Date.now() - ROLLUP_AFTER_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const { data: oldRows } = await supabase
    .from("page_views")
    .select("id, path, country, device, created_at")
    .lt("created_at", cutoff)
    .order("created_at", { ascending: true })
    .limit(ROLLUP_BATCH_SIZE);

  if (!oldRows || oldRows.length === 0) return;

  const grouped = new Map<string, { day: string; path: string; country: string; device: string; views: number }>();
  for (const row of oldRows) {
    const day = row.created_at.slice(0, 10);
    const key = `${day}|${row.path}|${row.country}|${row.device}`;
    const entry = grouped.get(key) ?? { day, path: row.path, country: row.country, device: row.device, views: 0 };
    entry.views += 1;
    grouped.set(key, entry);
  }

  for (const entry of grouped.values()) {
    const { data: existing } = await supabase
      .from("page_view_daily")
      .select("views")
      .eq("day", entry.day)
      .eq("path", entry.path)
      .eq("country", entry.country)
      .eq("device", entry.device)
      .maybeSingle();
    await supabase.from("page_view_daily").upsert({
      day: entry.day,
      path: entry.path,
      country: entry.country,
      device: entry.device,
      views: (existing?.views ?? 0) + entry.views,
    });
  }

  await supabase
    .from("page_views")
    .delete()
    .in(
      "id",
      oldRows.map((r) => r.id),
    );
}
