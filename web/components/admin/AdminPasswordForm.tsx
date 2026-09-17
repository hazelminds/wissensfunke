"use client";

import { useActionState, useRef, useState } from "react";
import { Dices, KeyRound } from "lucide-react";

type SetPasswordAction = (formData: FormData) => Promise<void>;
type FormState = { error: string | null; success: boolean };

function randomPassword(): string {
  const bytes = new Uint8Array(9);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/[+/=]/g, "").slice(0, 12);
}

export function AdminPasswordForm({ action, userId }: { action: SetPasswordAction; userId: string }) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      try {
        await action(formData);
        setValue("");
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
          ref={passwordRef}
          name="password"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          minLength={6}
          placeholder="Neues Passwort"
          className="hairline flex-1 rounded-2xl bg-bg px-4 py-3 text-sm text-ink outline-none focus:border-primary/60"
        />
        <button
          type="button"
          title="Zufälliges Passwort einsetzen"
          onClick={() => setValue(randomPassword())}
          className="hairline flex shrink-0 items-center justify-center rounded-full p-3 text-ink transition hover:bg-bg"
        >
          <Dices className="h-4 w-4" />
        </button>
        <button
          type="submit"
          disabled={pending || value.trim().length < 6}
          className="btn-3d btn-3d-primary flex shrink-0 items-center gap-1.5 px-4 py-3 text-sm disabled:opacity-50"
        >
          <KeyRound className="h-4 w-4" /> {pending ? "…" : "Setzen"}
        </button>
      </div>
      {state.error && <p className="text-[12.5px] font-semibold text-red">{state.error}</p>}
      {state.success && !state.error && (
        <p className="text-[12.5px] font-semibold text-green-dark">
          ✅ Neues Passwort gesetzt — jetzt an die Person weitergeben.
        </p>
      )}
    </form>
  );
}
