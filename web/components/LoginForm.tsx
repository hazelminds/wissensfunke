"use client";

import { useActionState } from "react";
import { signInWithMagicLink, type MagicLinkState } from "@/lib/actions/auth";

const initialState: MagicLinkState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signInWithMagicLink, initialState);

  if (state.status === "sent") {
    return (
      <div className="flex flex-col gap-2 rounded-2xl border-2 border-green bg-green-soft p-5 text-center">
        <span className="text-2xl">📬</span>
        <p className="font-display text-[15px] font-bold text-green-dark">Link verschickt!</p>
        <p className="text-sm text-[#0F4A3A]">
          Check dein Postfach ({state.message}) und klick auf den Anmelde-Link.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-ink">E-Mail-Adresse</span>
        <input
          type="email"
          name="email"
          required
          placeholder="du@example.com"
          className="rounded-xl border-2 border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none focus:border-primary"
        />
      </label>
      {state.status === "error" && (
        <p className="text-[13px] font-semibold text-red-dark">{state.message}</p>
      )}
      <button type="submit" disabled={pending} className="btn-3d btn-3d-primary py-3.5 text-[15px] disabled:opacity-60">
        {pending ? "Sende Link …" : "Anmelde-Link senden"}
      </button>
      <p className="text-center text-[12px] text-muted">
        Kein Passwort nötig — wir schicken dir einen Login-Link per E-Mail.
      </p>
    </form>
  );
}
