"use client";

import { useActionState, useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

type DeleteAction = (formData: FormData) => Promise<void>;
type FormState = { error: string | null };

export function AdminDeleteUserForm({
  action,
  userId,
  email,
}: {
  action: DeleteAction;
  userId: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");
  const [state, formAction, pending] = useActionState<FormState, FormData>(async (_prev, formData) => {
    try {
      await action(formData);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Fehler beim Löschen." };
    }
  }, { error: null });

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-red-soft px-4 py-2.5 text-sm font-semibold text-red-dark transition hover:opacity-80"
      >
        <Trash2 className="h-4 w-4" /> Konto löschen
      </button>
    );
  }

  return (
    <div className="hairline flex flex-col gap-3 rounded-2xl border-red/40 bg-red-soft/40 p-4">
      <p className="flex items-center gap-1.5 text-sm font-bold text-red-dark">
        <AlertTriangle className="h-4 w-4" /> Unwiderruflich: löscht das Konto, alle Käufe, die Serie und
        den Plus-Status.
      </p>
      <p className="text-[13px] text-ink-soft">
        Zum Bestätigen die E-Mail-Adresse <span className="font-bold text-ink">{email}</span> eingeben:
      </p>
      <form action={formAction} className="flex items-center gap-2">
        <input type="hidden" name="userId" value={userId} />
        <input
          name="confirmEmail"
          value={confirmValue}
          onChange={(e) => setConfirmValue(e.target.value)}
          placeholder={email}
          className="hairline flex-1 rounded-full bg-bg px-4 py-2.5 text-sm text-ink outline-none focus:border-red/60"
        />
        <button
          type="submit"
          disabled={pending || confirmValue.trim().toLowerCase() !== email.trim().toLowerCase()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" /> {pending ? "Löscht…" : "Endgültig löschen"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="shrink-0 text-sm font-semibold text-muted hover:text-ink"
        >
          Abbrechen
        </button>
      </form>
      {state.error && <p className="text-[12.5px] font-semibold text-red">{state.error}</p>}
    </div>
  );
}
