"use client";

import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { PasswordLoginForm } from "@/components/PasswordLoginForm";

export function AuthMethodTabs() {
  const [method, setMethod] = useState<"magic" | "password">("magic");

  return (
    <div>
      <div className="hairline mb-5 inline-flex rounded-full bg-surface p-1">
        <button
          onClick={() => setMethod("magic")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            method === "magic" ? "bg-primary text-white" : "text-ink-soft hover:text-ink"
          }`}
        >
          Magic Link
        </button>
        <button
          onClick={() => setMethod("password")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            method === "password" ? "bg-primary text-white" : "text-ink-soft hover:text-ink"
          }`}
        >
          Passwort
        </button>
      </div>

      {method === "magic" ? <LoginForm /> : <PasswordLoginForm />}
    </div>
  );
}
