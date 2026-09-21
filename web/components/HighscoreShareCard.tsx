"use client";

import { useState } from "react";
import { Crown, Loader2, Share2 } from "lucide-react";
import { usePlusModal } from "@/components/PlusModalProvider";
import { wrapLines, safeFileSlug, primaryAppFonts, drawBrandMark, drawFooter, shareOrDownloadImage } from "@/lib/shareCard";
import { formatTimeLabel } from "@/lib/formatTime";

const GOLD_FROM = "hsl(45,95%,58%)";
const GOLD_TO = "hsl(28,90%,50%)";

/** Zeichnet die Highscore-Karte -- gleicher Aufbau wie ResultShareCard
 * (Marke, Farb-Badge, Titel, Fußzeile), aber mit Trophäe/Gold statt
 * Ergebnistyp-Farbe und dem erreichten Wert als großer Headline. */
async function renderCardImage({
  gameTitle,
  headline,
}: {
  gameTitle: string;
  headline: string;
}): Promise<Blob | null> {
  const { displayFont, bodyFont } = await primaryAppFonts();

  const W = 1080;
  const H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const cx = W / 2;

  ctx.fillStyle = "#120F1A";
  ctx.fillRect(0, 0, W, H);

  const badgeCy = H * 0.4;
  const badgeR = W * 0.17;
  const glow = ctx.createRadialGradient(cx, badgeCy, 0, cx, badgeCy, W * 0.8);
  glow.addColorStop(0, "hsla(45,95%,58%, 0.32)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  drawBrandMark(ctx, displayFont);

  const badgeGrad = ctx.createLinearGradient(cx - badgeR, badgeCy - badgeR, cx + badgeR, badgeCy + badgeR);
  badgeGrad.addColorStop(0, GOLD_FROM);
  badgeGrad.addColorStop(1, GOLD_TO);
  ctx.beginPath();
  ctx.arc(cx, badgeCy, badgeR, 0, Math.PI * 2);
  ctx.fillStyle = badgeGrad;
  ctx.fill();
  ctx.font = `${Math.round(badgeR * 0.95)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🏆", cx, badgeCy + badgeR * 0.06);

  let y = badgeCy + badgeR + 90;
  ctx.textBaseline = "alphabetic";
  ctx.font = `600 30px ${bodyFont}`;
  ctx.fillStyle = "#B9B4C4";
  ctx.fillText("NEUE BESTLEISTUNG", cx, y);

  y += 78;
  ctx.font = `700 82px ${displayFont}`;
  ctx.fillStyle = "#FAF8F4";
  for (const line of wrapLines(ctx, headline, W * 0.85)) {
    ctx.fillText(line, cx, y);
    y += 90;
  }

  y += 26;
  ctx.font = `400 36px ${bodyFont}`;
  ctx.fillStyle = "#CFCAD9";
  for (const line of wrapLines(ctx, gameTitle, W * 0.78)) {
    ctx.fillText(line, cx, y);
    y += 50;
  }

  drawFooter(ctx, bodyFont, cx, H - 130, GOLD_FROM, GOLD_TO, "Spiel auch auf Noggl");

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png", 0.95));
}

/**
 * Highscore als Bild-Karte teilen -- nur wenn die gerade gespielte Runde
 * wirklich eine neue persönliche Bestleistung für dieses Spiel ist (siehe
 * SubmitScoreResult.isNewBest, serverseitig anhand der bisherigen Runden
 * ermittelt, nicht client-seitig behauptet). Gleicher Plus-Verkaufshebel
 * wie bei ResultShareCard: für alle sichtbar, ohne Plus poppt beim Klick
 * die Plus-Übersicht auf statt die Karte zu bauen.
 */
export function HighscoreShareCard({
  gameTitle,
  category,
  points,
  timeSeconds,
  plusActive,
}: {
  gameTitle: string;
  category: "quiz" | "puzzle";
  points: number;
  timeSeconds: number;
  plusActive: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const { openPlusModal } = usePlusModal();

  const headline = category === "quiz" ? `${points} Punkte` : `${formatTimeLabel(timeSeconds)} Min.`;

  async function handleClick() {
    if (!plusActive) {
      openPlusModal();
      return;
    }
    setBusy(true);
    try {
      const blob = await renderCardImage({ gameTitle, headline });
      if (!blob) return;
      await shareOrDownloadImage(
        blob,
        `noggl-bestleistung-${safeFileSlug(gameTitle)}.png`,
        "Noggl",
        `Neue Bestleistung bei "${gameTitle}": ${headline}!`,
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
      {busy ? "Erstelle Bild…" : "Bestleistung als Bild teilen"}
    </button>
  );
}
