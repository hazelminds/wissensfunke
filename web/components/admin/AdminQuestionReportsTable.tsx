"use client";

import { useState } from "react";
import { Check, Flag, Mail, RotateCcw } from "lucide-react";
import { resolveQuestionReportAction, reopenQuestionReportAction } from "@/lib/actions/questionReports";
import type { QuestionReportRow } from "@/lib/questionReports";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
}

export function AdminQuestionReportsTable({ reports: initial }: { reports: QuestionReportRow[] }) {
  const [reports, setReports] = useState(initial);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const open = reports.filter((r) => r.status === "open");
  const resolved = reports.filter((r) => r.status === "resolved");

  const setStatus = async (id: string, status: "open" | "resolved") => {
    setPendingId(id);
    try {
      await (status === "resolved" ? resolveQuestionReportAction(id) : reopenQuestionReportAction(id));
      setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } finally {
      setPendingId(null);
    }
  };

  if (reports.length === 0) {
    return (
      <div className="hairline rounded-2xl bg-surface p-6 text-center text-sm text-muted">
        Noch keine gemeldeten Fragen.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        {open.length === 0 && (
          <p className="text-sm text-muted">Keine offenen Meldungen — alles abgearbeitet.</p>
        )}
        {open.map((r) => (
          <ReportCard
            key={r.id}
            report={r}
            pending={pendingId === r.id}
            action={
              <button
                onClick={() => setStatus(r.id, "resolved")}
                disabled={pendingId === r.id}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-soft px-3.5 py-1.5 text-[12.5px] font-semibold text-green-dark transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check className="h-3.5 w-3.5" /> {pendingId === r.id ? "…" : "Erledigt"}
              </button>
            }
          />
        ))}
      </div>

      {resolved.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <p className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase">
            <Flag className="h-3.5 w-3.5" /> Erledigt ({resolved.length})
          </p>
          {resolved.map((r) => (
            <ReportCard
              key={r.id}
              report={r}
              pending={pendingId === r.id}
              dimmed
              action={
                <button
                  onClick={() => setStatus(r.id, "open")}
                  disabled={pendingId === r.id}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> {pendingId === r.id ? "…" : "Wieder öffnen"}
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Gleiche Karte für offene wie erledigte Meldungen -- Grund/Melder/Zeitpunkt
 * bleiben auch nach "Erledigt" sichtbar (nur gedimmt), sonst verliert man
 * genau die Infos, die man zum Nachprüfen braucht. */
function ReportCard({
  report: r,
  pending,
  dimmed = false,
  action,
}: {
  report: QuestionReportRow;
  pending: boolean;
  dimmed?: boolean;
  action: React.ReactNode;
}) {
  return (
    <div
      className={`hairline flex flex-col gap-2 rounded-2xl p-4 transition-opacity ${
        dimmed ? "bg-surface/50 opacity-60" : "bg-surface"
      } ${pending ? "opacity-50" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary-dark">
            {r.quizSlug}
          </span>
          <p className="mt-1.5 text-[14px] font-semibold text-ink">{r.questionText}</p>
        </div>
        {action}
      </div>
      {r.reason && <p className="text-[13px] text-ink-soft">„{r.reason}“</p>}
      <div className="flex items-center gap-3 text-[11px] text-muted">
        <span className="flex items-center gap-1">
          <Mail className="h-3 w-3" /> {r.reporterEmail ?? "Gast"}
        </span>
        <span>{formatDateTime(r.createdAt)}</span>
      </div>
    </div>
  );
}
