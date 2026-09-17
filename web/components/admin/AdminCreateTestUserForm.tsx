"use client";

import { useActionState, useRef, useState } from "react";
import { Dices, UserPlus, X } from "lucide-react";

type CreateUserAction = (formData: FormData) => Promise<void>;
type FormState = { error: string | null; success: string | null };

function randomPassword(): string {
  const bytes = new Uint8Array(9);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/[+/=]/g, "").slice(0, 12);
}

export function AdminCreateTestUserForm({ action }: { action: CreateUserAction }) {
  const [open, setOpen] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [state, formAction, pending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      try {
        await action(formData);
        return { error: null, success: `${formData.get("email")} wurde angelegt.` };
      } catch (err) {
        return { error: err instanceof Error ? err.message : "Fehler beim Anlegen.", success: null };
      }
    },
    { error: null, success: null },
  );

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hairline inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-ink transition hover:bg-bg"
      >
        <UserPlus className="h-3.5 w-3.5" /> Testnutzer anlegen
      </button>
    );
  }

  return (
    <div className="hairline flex flex-col gap-2 rounded-2xl bg-surface p-3.5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold text-ink">Testnutzer anlegen</p>
        <button onClick={() => setOpen(false)} className="text-muted transition hover:text-ink">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <form action={formAction} className="flex flex-wrap items-center gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="test@noggl.app"
          className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
        />
        <div className="flex items-center gap-1">
          <input
            ref={passwordRef}
            type="text"
            name="password"
            required
            minLength={6}
            placeholder="Passwort"
            className="hairline w-28 rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
          />
          <button
            type="button"
            title="Zufälliges Passwort einsetzen"
            onClick={() => {
              if (passwordRef.current) passwordRef.current.value = randomPassword();
            }}
            className="hairline flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-bg"
          >
            <Dices className="h-3 w-3" />
          </button>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="btn-3d btn-3d-primary px-3.5 py-1.5 text-xs disabled:opacity-60"
        >
          {pending ? "Wird angelegt…" : "Anlegen"}
        </button>
      </form>
      {state.error && <p className="text-xs font-semibold text-red">{state.error}</p>}
      {state.success && <p className="text-xs font-semibold text-green-dark">✅ {state.success}</p>}
    </div>
  );
}
