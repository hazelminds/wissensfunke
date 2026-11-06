"use client";

import { useState } from "react";
import { Flag, Check } from "lucide-react";
import { reportQuestionAction } from "@/lib/actions/questionReports";

/** Kleiner, unaufdringlicher Melde-Link direkt unter einer Quiz-Frage/
 * Erklärung -- für "diese Frage/Antwort ist falsch oder unklar". Kein Login
 * nötig, Fragentext wird als Schnappschuss mitgeschickt (siehe
 * lib/questionReports.ts), damit die Admin-Queue auch nach späteren
 * Content-Änderungen noch weiß, worauf sich die Meldung bezog. */
export function ReportQuestionButton({ quizSlug, questionText }: { quizSlug: string; questionText: string }) {
  const [state, setState] = useState<"idle" | "open" | "sending" | "done">("idle");
  const [reason, setReason] = useState("");

  if (state === "done") {
    return (
      <p className="flex items-center gap-1.5 text-[12px] font-semibold text-green-dark">
        <Check className="h-3.5 w-3.5" /> Danke, wir schauen uns das an.
      </p>
    );
  }

  if (state === "idle") {
    return (
      <button
        onClick={() => setState("open")}
        className="flex items-center gap-1.5 text-[12px] font-semibold text-muted transition hover:text-ink"
      >
        <Flag className="h-3.5 w-3.5" /> Frage melden
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Was stimmt nicht? (optional)"
        rows={2}
        maxLength={500}
        className="hairline w-full resize-none rounded-xl bg-bg px-3 py-2 text-[13px] text-ink outline-none focus:border-primary/60"
      />
      <div className="flex gap-2">
        <button
          disabled={state === "sending"}
          onClick={async () => {
            setState("sending");
            await reportQuestionAction(quizSlug, questionText, reason);
            setState("done");
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[12.5px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Flag className="h-3.5 w-3.5" /> {state === "sending" ? "Sendet…" : "Melden"}
        </button>
        <button
          onClick={() => setState("idle")}
          className="text-[12.5px] font-semibold text-muted hover:text-ink"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
