"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Share2, X } from "lucide-react";
import { shareOrDownloadImage } from "@/lib/shareCard";

/**
 * Vorschau-Zwischenschritt für alle Teilen-Karten (Ergebnis, Highscore,
 * Wochen-Rückblick, ...): zeigt das fertig gerenderte Bild, bevor es
 * tatsächlich geteilt/heruntergeladen wird -- vorher ging der Klick direkt
 * in den nativen Teilen-Dialog, ohne dass der Nutzer das Bild je gesehen hat.
 */
export function SharePreviewModal({
  open,
  onClose,
  blob,
  fileName,
  shareTitle,
  shareText,
}: {
  open: boolean;
  onClose: () => void;
  blob: Blob | null;
  fileName: string;
  shareTitle: string;
  shareText: string;
}) {
  const [sharing, setSharing] = useState(false);
  const imgUrl = useMemo(() => (blob ? URL.createObjectURL(blob) : null), [blob]);

  useEffect(() => {
    return () => {
      if (imgUrl) URL.revokeObjectURL(imgUrl);
    };
  }, [imgUrl]);

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

  if (!open || !blob) return null;

  async function handleShare() {
    setSharing(true);
    try {
      await shareOrDownloadImage(blob!, fileName, shareTitle, shareText);
      onClose();
    } finally {
      setSharing(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="hairline relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-surface shadow-2xl"
        style={{ maxHeight: "min(92vh, 40rem)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
        >
          <X className="h-[18px] w-[18px]" />
        </button>

        <div className="overflow-y-auto p-5 pt-6">
          <h2 className="pr-8 font-display text-lg font-extrabold text-ink">Deine Karte</h2>
          <p className="mt-1 text-[12.5px] text-muted">So sieht sie aus, bevor du sie teilst.</p>

          {imgUrl && (
            <div className="hairline mt-4 overflow-hidden rounded-2xl">
              {/* Bewusst kein next/image: die Vorschau kommt aus einer
                  kurzlebigen Client-Blob-URL, kein optimierbarer Asset-Pfad. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgUrl} alt="Vorschau der Teilen-Karte" className="block w-full" />
            </div>
          )}

          <button
            onClick={handleShare}
            disabled={sharing}
            className="btn-3d btn-3d-primary mt-4 flex w-full items-center justify-center gap-2 py-3 text-[14px] disabled:opacity-60"
          >
            {sharing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
            {sharing ? "Öffne Teilen…" : "Jetzt teilen"}
          </button>
        </div>
      </div>
    </div>
  );
}
