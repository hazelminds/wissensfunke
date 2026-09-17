"use client";

import { useActionState, useRef } from "react";
import { Send } from "lucide-react";

type CreateAction = (formData: FormData) => Promise<void>;
type FormState = { error: string | null };

export function NewTicketForm({ action }: { action: CreateAction }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<FormState, FormData>(async (_prev, formData) => {
    try {
      await action(formData);
      formRef.current?.reset();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Fehler beim Senden." };
    }
  }, { error: null });

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <input
        name="subject"
        required
        maxLength={120}
        placeholder="Worum geht's? (Betreff)"
        className="hairline rounded-2xl bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-primary/60"
      />
      <textarea
        name="body"
        required
        rows={5}
        maxLength={4000}
        placeholder="Beschreib dein Anliegen so genau wie möglich…"
        className="hairline rounded-2xl bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-primary/60"
      />
      <button
        type="submit"
        disabled={pending}
        className="btn-3d btn-3d-primary inline-flex w-fit items-center gap-1.5 px-5 py-3 text-sm disabled:opacity-60"
      >
        <Send className="h-4 w-4" /> {pending ? "Wird gesendet…" : "Nachricht senden"}
      </button>
      {state.error && <p className="text-[12.5px] font-semibold text-red">{state.error}</p>}
    </form>
  );
}
