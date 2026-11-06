"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getCohortStatsAction } from "@/lib/actions/analytics";
import type { CohortStats } from "@/lib/cohort";

export function AdminCohortStats() {
  const [stats, setStats] = useState<CohortStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getCohortStatsAction()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setError("Statistik konnte nicht geladen werden.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" /> Lade Kohorten…
      </div>
    );
  }
  if (error) return <p className="py-6 text-center text-sm text-red">{error}</p>;
  if (!stats || stats.rows.length === 0) {
    return (
      <div className="hairline rounded-2xl bg-surface p-6 text-center text-sm text-muted">
        Noch zu wenig Daten für eine Kohorten-Ansicht.
      </div>
    );
  }

  return <CohortTable stats={stats} />;
}

export function CohortTable({ stats }: { stats: CohortStats }) {
  return (
    <div className="hairline rounded-2xl bg-surface p-5">
      <h3 className="mb-1 font-display font-bold text-ink">Kohorten-Retention</h3>
      <p className="mb-4 text-[12.5px] text-muted">
        Nutzer:innen gruppiert nach Anmeldewoche (Zeilen). Jede Spalte zeigt, wie viel Prozent einer
        Kohorte in der jeweiligen Woche seit Anmeldung mindestens eine Runde gespielt haben.
        &bdquo;–&rdquo; heißt: diese Woche liegt noch in der Zukunft.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-1 text-[12px]">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left font-semibold text-muted">Anmeldewoche</th>
              <th className="px-2 py-1 text-right font-semibold text-muted">Größe</th>
              {Array.from({ length: stats.weekCount }, (_, i) => (
                <th key={i} className="px-2 py-1 text-center font-semibold text-muted">
                  W{i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.rows.map((row) => (
              <tr key={row.weekStartISO}>
                <td className="px-2 py-1.5 font-semibold whitespace-nowrap text-ink">{row.weekLabel}</td>
                <td className="px-2 py-1.5 text-right text-muted">{row.size}</td>
                {row.retention.map((pct, i) => (
                  <td key={i} className="p-0.5">
                    <div
                      className="flex h-8 items-center justify-center rounded-lg font-bold text-ink"
                      style={{
                        backgroundColor:
                          pct === null ? "hsl(var(--border))" : `hsl(var(--primary) / ${0.08 + (pct / 100) * 0.72})`,
                      }}
                    >
                      {pct === null ? <span className="text-muted">–</span> : `${pct}%`}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
