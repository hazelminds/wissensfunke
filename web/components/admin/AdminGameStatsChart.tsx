"use client";

import { useEffect, useState } from "react";
import { BarChart3, Loader2 } from "lucide-react";
import { getGameStatsAction } from "@/lib/actions/analytics";
import type { GameStatRow } from "@/lib/analytics";

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
  // Tag 0 des aktuellen Monats == letzter Tag des Vormonats.
  const to = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  return { from, to };
}

export function AdminGameStatsChart() {
  const [preset, setPreset] = useState<Preset>("this-month");
  const [customFrom, setCustomFrom] = useState(() => toDateInputValue(lastMonthRange().from));
  const [customTo, setCustomTo] = useState(() => toDateInputValue(new Date()));
  const [rows, setRows] = useState<GameStatRow[]>([]);
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
        const data = await getGameStatsAction(from.toISOString(), to.toISOString());
        if (!cancelled) {
          setRows(data);
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

  const maxStarted = Math.max(1, ...rows.map((r) => r.started));

  return (
    <div className="hairline mt-6 rounded-2xl bg-surface p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display font-bold text-ink">
          <BarChart3 className="h-4 w-4 text-primary" /> Beliebtheit &amp; Lösequote
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
      ) : rows.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted">Noch keine Spiel-Daten in diesem Zeitraum.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((r) => (
            <div key={r.slug} className="flex items-center gap-3">
              <span className="w-[190px] shrink-0 truncate text-[13px] font-bold text-ink">
                <span className="mr-1.5">{r.emoji}</span>
                {r.title}
              </span>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-bg">
                <div
                  className="flex h-full items-center rounded-full bg-gradient-to-r from-primary to-coral px-2.5 transition-[width] duration-500"
                  style={{ width: `${Math.max(6, (r.started / maxStarted) * 100)}%` }}
                >
                  <span className="text-[11px] font-bold whitespace-nowrap text-white">{r.started}</span>
                </div>
              </div>
              <span className="w-[92px] shrink-0 text-right text-[12px] font-bold text-muted">
                {r.completed} gelöst
                <br />
                <span className={r.completionRate >= 50 ? "text-green-dark" : "text-coral-dark"}>
                  {r.completionRate}%
                </span>
              </span>
            </div>
          ))}
        </div>
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
