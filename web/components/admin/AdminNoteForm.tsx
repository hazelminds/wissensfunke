"use client";

import { useActionState, useRef } from "react";
import { StickyNote } from "lucide-react";

type NoteAction = (formData: FormData) => Promise<void>;
type FormState = { error: string | null };

export function AdminNoteForm({ action, userId }: { action: NoteAction; userId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<FormState, FormData>(async (_prev, formData) => {
    try {
      await action(formData);
      formRef.current?.reset();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Fehler beim Speichern." };
    }
  }, { error: null });

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-2.5">
      <input type="hidden" name="userId" value={userId} />
      <textarea
        name="note"
        required
        rows={3}
        placeholder="z. B. Support-Ticket #123: mehrfach Beschwerden wegen anstößiger Chat-Nachrichten."
        className="hairline rounded-2xl bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-primary/60"
      />
      <button
        type="submit"
        disabled={pending}
        className="btn-3d btn-3d-primary inline-flex w-fit items-center gap-1.5 px-4 py-2.5 text-sm disabled:opacity-60"
      >
        <StickyNote className="h-4 w-4" /> {pending ? "Speichert…" : "Notiz speichern"}
      </button>
      {state.error && <p className="text-[12.5px] font-semibold text-red">{state.error}</p>}
    </form>
  );
}
