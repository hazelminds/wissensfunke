"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Crown, ArrowRight } from "lucide-react";
import { hasReachedDailyCap } from "@/lib/dailyCap";

/**
 * Wrappt Weekly-Freemium-Spiele: eingeloggte Nicht-Plus-Nutzer dürfen davon
 * insgesamt 2 Runden pro Tag gratis spielen, danach kommt die Paywall
 * (Base44-Vorbild). Gäste sind nicht limitiert. Täglicher Gratis-Anker
 * (Tages-Rätsel/-Mini-Quiz) läuft nie durch dieses Gate.
 */
export function DailyCapGate({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
}) {
  const [blocked, setBlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // SSR kennt localStorage nicht -- Cap-Status erst nach dem Mount lesen
    // (gleiches Muster wie StreakBadge).
    if (isLoggedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBlocked(hasReachedDailyCap());
    }
    setChecked(true);
  }, [isLoggedIn]);

  if (!checked) return null;

  if (blocked) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <p className="text-sm text-muted">Tageslimit erreicht</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink">
          2 kostenlose Runden gespielt
        </h1>
        <p className="mt-3 text-ink-soft">
          Du hast heute schon 2 Runden gratis gespielt. Ab der 3. brauchst du Plus — oder komm
          morgen wieder.
        </p>
        <Link
          href="/konto"
          className="glow-primary mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <Crown className="h-4 w-4" /> Plus freischalten <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
