"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInWithPassword, type PasswordFormState } from "@/lib/actions/auth";

const initialState: PasswordFormState = { status: "idle" };

export function PasswordLoginForm() {
  const [state, formAction, pending] = useActionState(signInWithPassword, initialState);

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
        {pending ? "Meldet an …" : "Anmelden"}
      </button>
      <div className="flex items-center justify-between text-[12px] font-bold">
        <Link href="/passwort-vergessen" className="text-primary-dark">
          Passwort vergessen?
        </Link>
        <Link href="/registrieren" className="text-primary-dark">
          Konto anlegen
        </Link>
      </div>
    </form>
  );
}
