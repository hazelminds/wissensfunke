"use client";

import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

const DISMISSED_KEY = "nog_announcement_dismissed";

/** Zeigt die aktuelle Admin-Ankündigung, solange sie nicht für diese Person
 * weggeklickt wurde. Start unsichtbar (statt den Banner erst zu zeigen und
 * dann wegzuklappen), damit wer schon weggeklickt hat keinen kurzen
 * Flackereffekt sieht -- der Vergleich mit localStorage kann erst nach der
 * Hydration laufen. */
export function AnnouncementBanner({ id, message }: { id: string; message: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(localStorage.getItem(DISMISSED_KEY) !== id);
    } catch {
      setVisible(true);
    }
  }, [id]);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-coral">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-5 py-2.5">
        <Sparkles className="h-4 w-4 shrink-0 text-white" />
        <p className="text-center text-[13.5px] font-bold text-white">{message}</p>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(DISMISSED_KEY, id);
            } catch {
              // localStorage kann blockiert sein (privater Modus etc.) -- dann bleibt die
              // Ankündigung für diese Sitzung einfach nur per Klick weg, nicht dauerhaft.
            }
            setVisible(false);
          }}
          aria-label="Ankündigung schließen"
          className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
