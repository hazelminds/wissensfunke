"use client";

import { useActionState } from "react";
import { signUpWithPassword, type RegisterState } from "@/lib/actions/auth";

const initialState: RegisterState = { status: "idle" };

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(signUpWithPassword, initialState);

  if (state.status === "sent") {
    return (
      <div className="flex flex-col gap-2 rounded-2xl border-2 border-green bg-green-soft p-5 text-center">
        <span className="text-2xl">📬</span>
        <p className="font-display text-[15px] font-bold text-green-dark">Fast geschafft!</p>
        <p className="text-sm text-ink-soft">
          Check dein Postfach ({state.message}) und bestätige dein Konto über den Link.
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
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-ink">Passwort</span>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="Mind. 8 Zeichen"
          className="rounded-xl border-2 border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none focus:border-primary"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-ink">Passwort wiederholen</span>
        <input
          type="password"
          name="passwordConfirm"
          required
          minLength={8}
          placeholder="••••••••"
          className="rounded-xl border-2 border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none focus:border-primary"
        />
      </label>
      {state.status === "error" && (
        <p className="text-[13px] font-semibold text-red-dark">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn-3d btn-3d-primary py-3.5 text-[15px] disabled:opacity-60"
      >
        {pending ? "Legt Konto an …" : "Konto anlegen"}
      </button>
    </form>
  );
}
