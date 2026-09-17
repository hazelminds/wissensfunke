"use client";

import { useActionState, useState } from "react";
import { Check } from "lucide-react";

type UpdateAction = (formData: FormData) => Promise<void>;
type FormState = { error: string | null; success: boolean };

export function AdminUsernameForm({
  action,
  userId,
  currentUsername,
}: {
  action: UpdateAction;
  userId: string;
  currentUsername: string;
}) {
  const [value, setValue] = useState(currentUsername);
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      try {
        await action(formData);
        return { error: null, success: true };
      } catch (err) {
        return { error: err instanceof Error ? err.message : "Fehler beim Speichern.", success: false };
      }
    },
    { error: null, success: false },
  );

  return (
    <form action={formAction} className="flex flex-col gap-2.5">
      <input type="hidden" name="userId" value={userId} />
      <div className="flex items-center gap-2">
        <input
          name="username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={24}
          placeholder="Spielername"
          className="hairline flex-1 rounded-2xl bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-primary/60"
        />
        <button
          type="submit"
          disabled={pending || value.trim().length < 2}
          className="btn-3d btn-3d-primary flex shrink-0 items-center gap-1.5 px-4 py-3 text-sm disabled:opacity-50"
        >
          <Check className="h-4 w-4" /> {pending ? "…" : "Setzen"}
        </button>
      </div>
      {state.error && <p className="text-[12.5px] font-semibold text-red">{state.error}</p>}
      {state.success && !state.error && (
        <p className="text-[12.5px] font-semibold text-green-dark">✅ Gespeichert.</p>
      )}
    </form>
  );
}
