"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { formatPrice } from "@/content/quizzes";
import { createUnlockCheckout } from "@/lib/actions/checkout";
import { usePlusModal } from "@/components/PlusModalProvider";

/** Zwischenschritt beim Klick auf "Freischalten": Einzelkauf bleibt die
 * prominente Standardoption (bringt pro Runde mehr als ein Plus-Abo), Plus
 * kommt nur als ruhiger Hinweis darunter -- kein zweiter Verkaufsscreen,
 * öffnet stattdessen das bestehende große Plus-Modal. */
export function UnlockChoiceModal({
  open,
  onClose,
  quizSlug,
  quizTitle,
  unlockPriceCents,
}: {
  open: boolean;
  onClose: () => void;
  quizSlug: string;
  quizTitle: string;
  unlockPriceCents: number;
}) {
  const { openPlusModal } = usePlusModal();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="hairline relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-surface shadow-2xl"
        style={{ maxHeight: "min(90vh, 34rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-bg hover:text-ink"
        >
          <X className="h-[18px] w-[18px]" />
        </button>

        <div className="overflow-y-auto p-5 pt-6">
          <h2 className="pr-8 font-display text-lg font-extrabold text-ink">Wie möchtest du freischalten?</h2>
          <p className="mt-1 text-[12.5px] text-muted">Themen-Analyse zu „{quizTitle}“</p>

          <div className="mt-4 flex flex-col gap-3 rounded-2xl border-2 border-primary bg-primary-soft p-4">
            <span className="w-fit rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide text-primary-dark uppercase">
              Empfohlen für dieses Quiz
            </span>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                🔓
              </div>
              <div>
                <p className="text-[14.5px] font-bold text-ink">Nur dieses Quiz</p>
                <p className="text-[11.5px] text-ink-soft">Sofort freigeschaltet, dauerhaft verfügbar</p>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-extrabold text-ink">
                {formatPrice(unlockPriceCents)}
              </span>
              <span className="text-[10.5px] font-bold text-muted">EINMALIG · KEIN ABO</span>
            </div>
            <form action={createUnlockCheckout.bind(null, quizSlug)}>
              <button type="submit" className="btn-3d btn-3d-primary w-full py-3 text-[14px]">
                Jetzt Insights freischalten
              </button>
            </form>
          </div>

          <div className="my-4 flex items-center gap-2.5 text-[10.5px] font-semibold text-muted">
            <div className="h-px flex-1 bg-line" /> ODER <div className="h-px flex-1 bg-line" />
          </div>

          <div className="hairline flex items-center gap-3 rounded-2xl p-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg text-[15px]">
              👑
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-bold text-ink">Alle Quizze auf einmal?</p>
              <p className="text-[11px] text-muted">Mit Plus automatisch enthalten, ohne Einzelkauf.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                openPlusModal();
              }}
              className="shrink-0 text-[12px] font-bold whitespace-nowrap text-gold"
            >
              Plus ansehen →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
