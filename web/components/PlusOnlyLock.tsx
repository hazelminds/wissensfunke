"use client";

import { useEffect } from "react";
import { Lock, Zap, Crown, ArrowRight } from "lucide-react";
import { usePlusModal } from "@/components/PlusModalProvider";
import { PlusButton } from "@/components/PlusButton";
import { plusTiers } from "@/content/plus";
import { formatPrice } from "@/content/quizzes";

/**
 * Echter Plus-Wall ohne Gratis-Runden -- anders als DailyCapGate (2 Runden
 * gratis, danach Paywall) für Spiele mit sichtbarem "Plus"-Abzeichen
 * (level: "subscriber-only"). Das Plus-Modal (Übersicht: was Plus bringt +
 * die 2 Varianten Tages-Ticket/Abo) poppt beim Aufruf direkt automatisch auf,
 * diese Seite bleibt als Erklärung/Rückfallebene sichtbar, falls die Person
 * das Modal wegklickt und es sich nochmal ansehen will.
 */
export function PlusOnlyLock({ title, description }: { title: string; description: string }) {
  const { openPlusModal } = usePlusModal();

  useEffect(() => {
    openPlusModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-md px-5 py-20 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
        <Lock className="h-8 w-8 text-primary" />
      </div>
      <p className="text-sm text-muted">Exklusiv für Plus</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-ink-soft">
        {description} Ganz ohne Gratis-Runde — hol dir Plus und leg direkt los.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <PlusButton className="hairline flex w-full items-center justify-between gap-3 rounded-2xl bg-surface p-4 text-left transition hover:border-primary/50">
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
              <Zap className="h-5 w-5 text-primary" />
            </span>
            <span>
              <span className="block font-display font-bold text-ink">Heute freischalten</span>
              <span className="block text-xs text-muted">
                {formatPrice(plusTiers[0].priceCents)} · einmalig, nur für heute
              </span>
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
        </PlusButton>

        <PlusButton className="glow-primary flex w-full items-center justify-between gap-3 rounded-2xl bg-primary p-4 text-left text-white transition hover:opacity-90">
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Crown className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display font-bold">Plus-Abo</span>
              <span className="block text-xs text-white/80">
                {formatPrice(plusTiers[1].priceCents)}/Monat · dauerhaft unbegrenzt + volle Bestenliste
              </span>
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </PlusButton>
      </div>
    </div>
  );
}
