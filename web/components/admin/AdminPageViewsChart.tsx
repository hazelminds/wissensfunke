"use client";

import { useEffect, useState } from "react";
import { Eye, Globe2, Loader2, MonitorSmartphone } from "lucide-react";
import { getPageViewStatsAction } from "@/lib/actions/analytics";
import type { PageViewStats } from "@/lib/pageViews";

type Preset = "this-month" | "last-month" | "custom";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function toDateInputValue(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function thisMonthRange(): { from: Date; to: Date } {
  const now = new Date();
  return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: now };
}

function lastMonthRange(): { from: Date; to: Date } {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const to = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  return { from, to };
}

const deviceLabels: Record<string, string> = {
  desktop: "Desktop",
  mobile: "Handy",
  tablet: "Tablet",
  unknown: "Unbekannt",
};

const deviceIcons: Record<string, string> = {
  desktop: "🖥️",
  mobile: "📱",
  tablet: "📱",
  unknown: "❔",
};

export function AdminPageViewsChart() {
  const [preset, setPreset] = useState<Preset>("this-month");
  const [customFrom, setCustomFrom] = useState(() => toDateInputValue(lastMonthRange().from));
  const [customTo, setCustomTo] = useState(() => toDateInputValue(new Date()));
  const [stats, setStats] = useState<PageViewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function activeRange(): { from: Date; to: Date } {
    if (preset === "this-month") return thisMonthRange();
    if (preset === "last-month") return lastMonthRange();
    const from = customFrom ? new Date(`${customFrom}T00:00:00`) : lastMonthRange().from;
    const to = customTo ? new Date(`${customTo}T23:59:59.999`) : new Date();
    return { from, to };
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { from, to } = activeRange();
      try {
        const data = await getPageViewStatsAction(from.toISOString(), to.toISOString());
        if (!cancelled) {
          setStats(data);
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Statistik konnte nicht geladen werden.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, customFrom, customTo]);

  const maxDayViews = Math.max(1, ...(stats?.byDay.map((d) => d.views) ?? []));
  const maxPathViews = Math.max(1, ...(stats?.topPaths.map((p) => p.views) ?? []));
  const maxCountryViews = Math.max(1, ...(stats?.topCountries.map((c) => c.views) ?? []));

  return (
    <div className="hairline mt-6 rounded-2xl bg-surface p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display font-bold text-ink">
          <Eye className="h-4 w-4 text-primary" /> Seitenaufrufe
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          <PresetButton active={preset === "this-month"} onClick={() => setPreset("this-month")}>
            Dieser Monat
          </PresetButton>
          <PresetButton active={preset === "last-month"} onClick={() => setPreset("last-month")}>
            Letzter Monat
          </PresetButton>
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => {
                setCustomFrom(e.target.value);
                setPreset("custom");
              }}
              className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
            />
            <span className="text-xs text-muted">bis</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => {
                setCustomTo(e.target.value);
                setPreset("custom");
              }}
              className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" /> Lade Statistik…
        </div>
      ) : error ? (
        <p className="py-6 text-center text-sm text-red">{error}</p>
      ) : !stats || stats.total === 0 ? (
        <p className="py-6 text-center text-sm text-muted">Noch keine Seitenaufrufe in diesem Zeitraum.</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-ink-soft">
            <span className="font-display text-xl font-extrabold text-ink">{stats.total}</span> Aufrufe insgesamt
          </p>

          <div className="flex items-end gap-1.5 overflow-x-auto pb-1">
            {stats.byDay.map((d) => (
              <div key={d.date} className="flex shrink-0 flex-col items-center gap-1" style={{ width: 22 }}>
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-primary to-coral"
                  style={{ height: `${Math.max(4, (d.views / maxDayViews) * 80)}px` }}
                  title={`${d.date}: ${d.views}`}
                />
                <span className="rotate-45 text-[9px] whitespace-nowrap text-muted">{d.date.slice(8, 10)}.</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-ink">
                <Eye className="h-3.5 w-3.5 text-primary" /> Meistbesuchte Seiten
              </h4>
              <div className="flex flex-col gap-2.5">
                {stats.topPaths.map((p) => (
                  <div key={p.path} className="flex items-center gap-3">
                    <span className="w-[150px] shrink-0 truncate text-[12.5px] font-bold text-ink" title={p.path}>
                      {p.path}
                    </span>
                    <div className="h-5 flex-1 overflow-hidden rounded-full bg-bg">
                      <div
                        className="flex h-full items-center rounded-full bg-gradient-to-r from-primary to-coral px-2"
                        style={{ width: `${Math.max(8, (p.views / maxPathViews) * 100)}%` }}
                      >
                        <span className="text-[10.5px] font-bold whitespace-nowrap text-white">{p.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-ink">
                <Globe2 className="h-3.5 w-3.5 text-primary" /> Länder
              </h4>
              <div className="flex flex-col gap-2.5">
                {stats.topCountries.map((c) => (
                  <div key={c.country} className="flex items-center gap-3">
                    <span className="w-[60px] shrink-0 text-[12.5px] font-bold text-ink">{c.country}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded-full bg-bg">
                      <div
                        className="flex h-full items-center rounded-full bg-gradient-to-r from-green to-green-dark px-2"
                        style={{ width: `${Math.max(8, (c.views / maxCountryViews) * 100)}%` }}
                      >
                        <span className="text-[10.5px] font-bold whitespace-nowrap text-white">{c.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-ink">
              <MonitorSmartphone className="h-3.5 w-3.5 text-primary" /> Geräte
            </h4>
            <div className="flex flex-wrap gap-3">
              {stats.byDevice.map((d) => (
                <span
                  key={d.device}
                  className="hairline flex items-center gap-1.5 rounded-full bg-bg px-3.5 py-1.5 text-[12.5px] font-bold text-ink"
                >
                  <span>{deviceIcons[d.device] ?? "❔"}</span>
                  {deviceLabels[d.device] ?? d.device}: {d.views}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PresetButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
        active ? "bg-primary text-white" : "hairline text-ink hover:bg-bg"
      }`}
    >
      {children}
    </button>
  );
}
