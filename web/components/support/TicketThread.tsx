"use client";

import { useActionState, useRef } from "react";
import { Send } from "lucide-react";

type ReplyAction = (formData: FormData) => Promise<void>;
type FormState = { error: string | null };

export interface ThreadMessage {
  id: string;
  sender: "user" | "admin";
  body: string;
  createdAt: string;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
}

/**
 * Ein Nachrichtenverlauf + Antwortformular. `viewerRole` bestimmt, welche
 * Seite als "Du" erscheint -- auf /support ist das der Nutzer, im
 * Admin-Bereich der Support. `replyAction` bekommt zusätzlich zum
 * Formularinhalt die ticketId als verstecktes Feld mit.
 */
export function TicketThread({
  ticketId,
  messages,
  viewerRole,
  replyAction,
  otherLabel = "Support",
}: {
  ticketId: string;
  messages: ThreadMessage[];
  viewerRole: "user" | "admin";
  replyAction: ReplyAction;
  otherLabel?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<FormState, FormData>(async (_prev, formData) => {
    try {
      await replyAction(formData);
      formRef.current?.reset();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Fehler beim Senden." };
    }
  }, { error: null });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2.5">
        {messages.map((m) => {
          const isViewer = m.sender === viewerRole;
          return (
            <div key={m.id} className={`flex ${isViewer ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isViewer ? "bg-primary text-white" : "hairline bg-surface text-ink"
                }`}
              >
                <p className="mb-1 text-[11px] font-bold opacity-70">
                  {isViewer ? "Du" : otherLabel}
                </p>
                <p className="whitespace-pre-wrap">{m.body}</p>
                <p className="mt-1.5 text-[10px] opacity-60">{formatDateTime(m.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form ref={formRef} action={formAction} className="flex flex-col gap-2.5">
        <input type="hidden" name="ticketId" value={ticketId} />
        <textarea
          name="body"
          required
          rows={3}
          maxLength={4000}
          placeholder="Antworten…"
          className="hairline rounded-2xl bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-primary/60"
        />
        <button
          type="submit"
          disabled={pending}
          className="btn-3d btn-3d-primary inline-flex w-fit items-center gap-1.5 px-4 py-2.5 text-sm disabled:opacity-60"
        >
          <Send className="h-4 w-4" /> {pending ? "…" : "Antworten"}
        </button>
        {state.error && <p className="text-[12.5px] font-semibold text-red">{state.error}</p>}
      </form>
    </div>
  );
}
