"use client";

import Link from "next/link";
import { useActionState } from "react";
import { updatePassword, type UpdatePasswordState } from "@/lib/actions/auth";

const initialState: UpdatePasswordState = { status: "idle" };

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, initialState);

  if (state.status === "done") {
    return (
      <div className="flex flex-col gap-2 rounded-2xl border-2 border-green bg-green-soft p-5 text-center">
        <span className="text-2xl">✅</span>
        <p className="font-display text-[15px] font-bold text-green-dark">Passwort geändert!</p>
        <Link href="/login" className="text-sm font-bold text-primary-dark">
          Jetzt anmelden →
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-ink">Neues Passwort</span>
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
        {pending ? "Speichert …" : "Passwort speichern"}
      </button>
    </form>
  );
}
