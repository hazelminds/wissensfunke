"use client";

import { useEffect } from "react";
import { X, Check, Sparkles } from "lucide-react";
import { plusFeatures, plusTiers } from "@/content/plus";
import { formatPrice } from "@/content/quizzes";

export function PlusModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Esc schließt, Scroll dahinter wird während des Modals eingefroren.
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
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="hairline relative w-full max-w-lg rounded-3xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-bg hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary to-coral px-6 pt-8 pb-7 text-center text-white">
          <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -right-8 -bottom-14 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="relative font-display text-[26px] font-extrabold tracking-tight">
            Plus entdecken
          </h2>
          <p className="relative mx-auto mt-1.5 max-w-sm text-[13.5px] text-white/85">
            Alles frei — mehr Runden, mehr Tiefe, mehr Vergleich.
          </p>
        </div>

        <div className="px-6 pt-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {plusFeatures.map((f) => (
              <div key={f.title} className="hairline flex items-start gap-2.5 rounded-2xl bg-bg p-3.5">
                <span className="text-xl leading-none">{f.emoji}</span>
                <div>
                  <p className="text-[13px] font-bold text-ink">{f.title}</p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-muted">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-6 pt-6 pb-6 sm:flex-row">
          {plusTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-1 flex-col gap-3 rounded-2xl border-2 p-4 ${
                tier.highlight ? "border-primary bg-primary-soft" : "border-line bg-bg"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10.5px] font-bold whitespace-nowrap text-white">
                  Bester Preis pro Runde
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">{tier.emoji}</span>
                <p className="font-display text-[15px] font-bold text-ink">{tier.title}</p>
              </div>
              <div>
                <span className="font-display text-2xl font-extrabold text-ink">
                  {formatPrice(tier.priceCents)}
                </span>
                <span className="ml-1 text-[12px] font-semibold text-muted">{tier.priceSuffix}</span>
              </div>
              <p className="text-[12px] leading-relaxed text-ink-soft">{tier.description}</p>
              <button
                type="button"
                className={`mt-1 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[13.5px] font-bold transition ${
                  tier.highlight
                    ? "glow-primary bg-primary text-white hover:opacity-90"
                    : "hairline text-ink hover:bg-surface"
                }`}
              >
                <Check className="h-4 w-4" /> Auswählen
              </button>
            </div>
          ))}
        </div>

        <p className="px-6 pb-6 text-center text-[11px] text-muted">
          Jederzeit kündbar. Kein Abo-Zwang beim Tages-Ticket. Bezahlfunktion wird gerade eingerichtet.
        </p>
      </div>
    </div>
  );
}
