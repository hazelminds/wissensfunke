"use client";

import { useState } from "react";
import { Check, Flag, Mail } from "lucide-react";
import { resolveQuestionReportAction } from "@/lib/actions/questionReports";
import type { QuestionReportRow } from "@/lib/questionReports";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
}

export function AdminQuestionReportsTable({ reports: initial }: { reports: QuestionReportRow[] }) {
  const [reports, setReports] = useState(initial);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const open = reports.filter((r) => r.status === "open");
  const resolved = reports.filter((r) => r.status === "resolved");

  const resolve = async (id: string) => {
    setPendingId(id);
    try {
      await resolveQuestionReportAction(id);
      setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)));
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
          <div key={r.id} className="hairline flex flex-col gap-2 rounded-2xl bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary-dark">
                  {r.quizSlug}
                </span>
                <p className="mt-1.5 text-[14px] font-semibold text-ink">{r.questionText}</p>
              </div>
              <button
                onClick={() => resolve(r.id)}
                disabled={pendingId === r.id}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-soft px-3.5 py-1.5 text-[12.5px] font-semibold text-green-dark transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check className="h-3.5 w-3.5" /> {pendingId === r.id ? "…" : "Erledigt"}
              </button>
            </div>
            {r.reason && <p className="text-[13px] text-ink-soft">„{r.reason}“</p>}
            <div className="flex items-center gap-3 text-[11px] text-muted">
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" /> {r.reporterEmail ?? "Gast"}
              </span>
              <span>{formatDateTime(r.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>

      {resolved.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase">
            <Flag className="h-3.5 w-3.5" /> Erledigt ({resolved.length})
          </p>
          {resolved.map((r) => (
            <div key={r.id} className="hairline flex flex-col gap-1 rounded-2xl bg-surface/50 p-3.5 opacity-60">
              <span className="w-fit rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary-dark">
                {r.quizSlug}
              </span>
              <p className="text-[13px] text-ink-soft">{r.questionText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
