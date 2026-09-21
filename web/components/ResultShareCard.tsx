"use client";

import { useState } from "react";
import { Crown, Loader2, Share2 } from "lucide-react";
import { usePlusModal } from "@/components/PlusModalProvider";
import { wrapLines, safeFileSlug, primaryAppFonts, drawBrandMark, drawFooter, shareOrDownloadImage } from "@/lib/shareCard";

/** Erste(r) Satz als Kurzfassung fürs Bild -- die App-Beschreibungen sind oft
 * ein ganzer Absatz, auf einer Story-Karte muss ein knapper Ausschnitt reichen. */
function shortDescription(text: string, maxLen = 130): string {
  const firstSentence = text.split(/(?<=[.!?])\s/)[0] ?? text;
  if (firstSentence.length <= maxLen) return firstSentence;
  return firstSentence.slice(0, maxLen - 1).trimEnd() + "…";
}

/** Tailwind-Arbitrary-Value-Klassen wie "from-[hsl(210,70%,55%)] to-[hsl(210,70%,42%)]"
 * -- dieselben Verlaufsfarben, die auch der In-App-Ergebnis-Kreis schon nutzt,
 * nur als rohe Farbwerte fürs Canvas statt als CSS-Klasse. */
function parseGradientColors(gradientClass: string): [string, string] {
  const matches = gradientClass.match(/hsl\([^)]+\)/g);
  return matches && matches.length >= 2 ? [matches[0], matches[1]] : ["hsl(12,90%,60%)", "hsl(28,95%,55%)"];
}

/**
 * Zeichnet die im Entwurf abgestimmte Karte direkt per Canvas (kein DOM-
 * Screenshot-Tool nötig) -- Marke, Farb-Badge mit Emoji, Titel, Kurztext,
 * Fußzeile. Nutzt dieselben next/font-Familien wie der Rest der App, damit
 * das Bild exakt zur echten Typografie passt statt einem Systemfont.
 */
async function renderCardImage({
  testTitle,
  resultTitle,
  resultEmoji,
  description,
  gradientClass,
}: {
  testTitle: string;
  resultTitle: string;
  resultEmoji: string;
  description: string;
  gradientClass: string;
}): Promise<Blob | null> {
  const { displayFont, bodyFont } = await primaryAppFonts();

  const W = 1080;
  const H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const [from, to] = parseGradientColors(gradientClass);
  const cx = W / 2;

  ctx.fillStyle = "#120F1A";
  ctx.fillRect(0, 0, W, H);

  const badgeCy = H * 0.4;
  const badgeR = W * 0.17;
  const glow = ctx.createRadialGradient(cx, badgeCy, 0, cx, badgeCy, W * 0.8);
  glow.addColorStop(0, from.replace("hsl(", "hsla(").replace(")", ", 0.32)"));
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  drawBrandMark(ctx, displayFont);

  // Farb-Badge mit Emoji
  const badgeGrad = ctx.createLinearGradient(cx - badgeR, badgeCy - badgeR, cx + badgeR, badgeCy + badgeR);
  badgeGrad.addColorStop(0, from);
  badgeGrad.addColorStop(1, to);
  ctx.beginPath();
  ctx.arc(cx, badgeCy, badgeR, 0, Math.PI * 2);
  ctx.fillStyle = badgeGrad;
  ctx.fill();
  ctx.font = `${Math.round(badgeR * 0.95)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(resultEmoji, cx, badgeCy + badgeR * 0.06);

  let y = badgeCy + badgeR + 90;
  ctx.textBaseline = "alphabetic";
  ctx.font = `600 30px ${bodyFont}`;
  ctx.fillStyle = "#B9B4C4";
  ctx.fillText(testTitle.toUpperCase(), cx, y);

  y += 78;
  ctx.font = `700 82px ${displayFont}`;
  ctx.fillStyle = "#FAF8F4";
  for (const line of wrapLines(ctx, resultTitle, W * 0.85)) {
    ctx.fillText(line, cx, y);
    y += 90;
  }

  y += 26;
  ctx.font = `400 36px ${bodyFont}`;
  ctx.fillStyle = "#CFCAD9";
  for (const line of wrapLines(ctx, shortDescription(description), W * 0.78)) {
    ctx.fillText(line, cx, y);
    y += 50;
  }

  drawFooter(ctx, bodyFont, cx, H - 130, from, to, "Mach den Test auf Noggl");

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png", 0.95));
}

/**
 * Ergebnis als Bild-Karte teilen statt als Text -- echte Funktion nur mit
 * Plus, aber der Button ist für alle sichtbar: ohne Plus poppt beim Klick
 * direkt die Plus-Übersicht auf statt die Karte zu bauen, zusätzlicher
 * Verkaufshebel an einem Punkt, wo gerade echtes Ergebnis-Interesse da ist.
 */
export function ResultShareCard({
  testTitle,
  resultTitle,
  resultEmoji,
  description,
  gradientClass,
  plusActive,
}: {
  testTitle: string;
  resultTitle: string;
  resultEmoji: string;
  description: string;
  gradientClass: string;
  plusActive: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const { openPlusModal } = usePlusModal();

  async function handleClick() {
    if (!plusActive) {
      openPlusModal();
      return;
    }
    setBusy(true);
    try {
      const blob = await renderCardImage({ testTitle, resultTitle, resultEmoji, description, gradientClass });
      if (!blob) return;
      await shareOrDownloadImage(
        blob,
        `noggl-${safeFileSlug(resultTitle)}.png`,
        "Noggl",
        `Mein Ergebnis bei "${testTitle}": ${resultTitle}`,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      className="hairline inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-surface disabled:opacity-60"
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : plusActive ? (
        <Share2 className="h-4 w-4" />
      ) : (
        <Crown className="h-4 w-4 text-gold" />
      )}
      {busy ? "Erstelle Bild…" : "Ergebnis als Bild teilen"}
    </button>
  );
}
