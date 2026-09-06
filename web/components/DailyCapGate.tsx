"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Zap, Crown, ArrowRight } from "lucide-react";
import { hasReachedDailyCap } from "@/lib/dailyCap";

/**
 * Wrappt Weekly-Freemium-Spiele: jede:r Besucher:in (Gast oder eingeloggt)
 * darf davon insgesamt 2 Runden pro Tag gratis spielen, danach kommt die
 * Paywall mit zwei Optionen -- Tagespass (einmalig, nur heute unbegrenzt)
 * oder Plus-Abo (monatlich, dauerhaft). Täglicher Gratis-Anker
 * (Tages-Rätsel/-Mini-Quiz) läuft nie durch dieses Gate.
 */
export function DailyCapGate({ children }: { children: React.ReactNode }) {
  const [blocked, setBlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // SSR kennt localStorage nicht -- Cap-Status erst nach dem Mount lesen
    // (gleiches Muster wie StreakBadge).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBlocked(hasReachedDailyCap());
    setChecked(true);
  }, []);

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

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/konto"
            className="hairline flex items-center justify-between gap-3 rounded-2xl bg-surface p-4 text-left transition hover:border-primary/50"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                <Zap className="h-5 w-5 text-primary" />
              </span>
              <span>
                <span className="block font-display font-bold text-ink">
                  Heute unbegrenzt weiterspielen
                </span>
                <span className="block text-xs text-muted">Einmalig, nur für heute</span>
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
          </Link>

          <Link
            href="/konto"
            className="glow-primary flex items-center justify-between gap-3 rounded-2xl bg-primary p-4 text-left text-white transition hover:opacity-90"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Crown className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display font-bold">Plus-Abo</span>
                <span className="block text-xs text-white/80">
                  Monatlich, dauerhaft unbegrenzt + volle Bestenliste
                </span>
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
