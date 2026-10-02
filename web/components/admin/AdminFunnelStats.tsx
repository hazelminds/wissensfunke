"use client";

import { useEffect, useState } from "react";
import { Eye, Gamepad2, UserPlus, ShoppingBag, Crown, Loader2 } from "lucide-react";
import { getFunnelStatsAction } from "@/lib/actions/analytics";
import type { FunnelStats } from "@/lib/funnel";

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

const STAGES: {
  key: keyof Pick<FunnelStats, "totalRegisteredUsers" | "usersWhoPlayed" | "usersWhoPurchased" | "usersWithActivePlus">;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: "totalRegisteredUsers", label: "Registriert", icon: <UserPlus className="h-4 w-4" /> },
  { key: "usersWhoPlayed", label: "Hat gespielt", icon: <Gamepad2 className="h-4 w-4" /> },
  { key: "usersWhoPurchased", label: "Hat gekauft", icon: <ShoppingBag className="h-4 w-4" /> },
  { key: "usersWithActivePlus", label: "Hat Plus", icon: <Crown className="h-4 w-4" /> },
];

export function AdminFunnelStats() {
  const [preset, setPreset] = useState<Preset>("this-month");
  const [customFrom, setCustomFrom] = useState(() => toDateInputValue(lastMonthRange().from));
  const [customTo, setCustomTo] = useState(() => toDateInputValue(new Date()));
  const [stats, setStats] = useState<FunnelStats | null>(null);
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
        const data = await getFunnelStatsAction(from.toISOString(), to.toISOString());
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

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display font-bold text-ink">Zeitraum</h3>
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
      ) : (
        stats && (
          <>
            <div className="hairline rounded-2xl bg-surface p-5">
              <h3 className="mb-1 font-display font-bold text-ink">Trichter: registrierte Nutzer</h3>
              <p className="mb-4 text-[12.5px] text-muted">
                Von allen im gewählten Zeitraum registrierten Nutzern, wie viele haben je Stufe erreicht --
                unabhängig davon, wann genau (klassische Cohort-Betrachtung). Plus wird aktuell nur verschenkt,
                nicht direkt gekauft -- diese Stufe zeigt den aktuell aktiven Bestand dieser Cohort.
              </p>

              <div className="flex flex-col gap-3">
                {STAGES.map((stage) => {
                  const value = stats[stage.key];
                  const base = Math.max(1, stats.totalRegisteredUsers);
                  const pct = Math.round((value / base) * 100);
                  return (
                    <div key={stage.key} className="flex items-center gap-3">
                      <span className="flex w-[130px] shrink-0 items-center gap-1.5 text-[13px] font-bold text-ink">
                        <span className="text-primary">{stage.icon}</span>
                        {stage.label}
                      </span>
                      <div className="h-6 flex-1 overflow-hidden rounded-full bg-bg">
                        <div
                          className="flex h-full items-center rounded-full bg-gradient-to-r from-primary to-coral px-2.5 transition-[width] duration-500"
                          style={{ width: `${Math.max(6, pct)}%` }}
                        >
                          <span className="text-[11px] font-bold whitespace-nowrap text-white">{value}</span>
                        </div>
                      </div>
                      <span className="w-[46px] shrink-0 text-right text-[12px] font-bold text-muted">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hairline mt-4 rounded-2xl bg-surface p-5">
              <h3 className="mb-1 flex items-center gap-2 font-display font-bold text-ink">
                <Eye className="h-4 w-4 text-primary" /> Top of Funnel (gewählter Zeitraum)
              </h3>
              <p className="mb-4 text-[12.5px] text-muted">
                Seitenaufrufe und Spielstarts insgesamt im gewählten Zeitraum -- ohne Cookie/Session-ID lassen
                sich Gäste nicht als eindeutige Besucher zählen, nur als Volumen.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <Kpi label="Seitenaufrufe" value={stats.pageViews} />
                <Kpi label="Spielstarts (Gast)" value={stats.gameStartsGuest} />
                <Kpi label="Spielstarts (eingeloggt)" value={stats.gameStartsRegistered} />
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="hairline rounded-xl bg-bg p-3">
      <p className="text-[11px] font-medium text-muted">{label}</p>
      <p className="mt-1 font-display text-xl font-extrabold text-ink">{value}</p>
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
