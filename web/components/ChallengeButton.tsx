"use client";

import { useState } from "react";
import { Check, Swords } from "lucide-react";

/**
 * "Freund herausfordern" -- baut den Link mit dem optional eingegebenen
 * Namen, öffnet bevorzugt den nativen Teilen-Dialog (WhatsApp/Mail/Nachrichten
 * je nach Gerät), fällt ohne `navigator.share` (z. B. Desktop) auf Kopieren
 * in die Zwischenablage zurück. Kein Konto nötig, um selbst zu challengen.
 */
export function ChallengeButton({
  buildUrl,
  shareTitle,
  buildShareText,
}: {
  buildUrl: (name: string) => string;
  shareTitle: string;
  buildShareText: (name: string) => string;
}) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  async function challenge() {
    const trimmedName = name.trim();
    const url = buildUrl(trimmedName);
    const text = buildShareText(trimmedName);

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text, url });
      } catch {
        // Dialog abgebrochen -- kein Fehlerzustand nötig.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Zwischenablage nicht verfügbar (z. B. kein HTTPS/Berechtigung) --
      // ohne Teilen-Dialog und ohne Zwischenablage bleibt nur der erneute
      // Versuch, kein zusätzlicher Fallback nötig für diesen Rand-Fall.
    }
  }

  return (
    <div className="flex flex-col items-center gap-2.5">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Dein Name (optional)"
        maxLength={24}
        className="hairline w-full max-w-[220px] rounded-full bg-surface px-4 py-2 text-center text-sm text-ink outline-none placeholder:text-muted"
      />
      <button
        onClick={challenge}
        className="hairline inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-surface"
      >
        {copied ? <Check className="h-4 w-4" /> : <Swords className="h-4 w-4" />}
        {copied ? "Link kopiert!" : "Freund herausfordern"}
      </button>
    </div>
  );
}
