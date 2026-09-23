"use client";

import { useState } from "react";
import { Crown, Loader2, Share2 } from "lucide-react";
import { usePlusModal } from "@/components/PlusModalProvider";
import {
  roundRectPath,
  wrapLines,
  primaryAppFonts,
  drawBrandMark,
  drawFooter,
  shareOrDownloadImage,
} from "@/lib/shareCard";
import type { WeeklyRecap } from "@/lib/stats";

const FROM = "hsl(12,90%,60%)";
const TO = "hsl(28,95%,55%)";

/** Zeichnet eine einzelne Statistik-Zeile als abgerundete Box -- Emoji links,
 * Label/Wert rechts daneben, zentriert auf der Karte. */
function drawStatRow(
  ctx: CanvasRenderingContext2D,
  bodyFont: string,
  displayFont: string,
  cx: number,
  y: number,
  width: number,
  height: number,
  emoji: string,
  label: string,
  value: string,
) {
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  roundRectPath(ctx, cx - width / 2, y, width, height, 24);
  ctx.fill();

  const padX = 40;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = "44px sans-serif";
  ctx.fillText(emoji, cx - width / 2 + padX, y + height / 2 + 2);

  const textX = cx - width / 2 + padX + 68;
  ctx.font = `600 26px ${bodyFont}`;
  ctx.fillStyle = "#B9B4C4";
  ctx.fillText(label, textX, y + height / 2 - 20);

  ctx.font = `700 32px ${displayFont}`;
  ctx.fillStyle = "#FAF8F4";
  const maxValueWidth = width - padX * 2 - 68;
  const [firstLine] = wrapLines(ctx, value, maxValueWidth);
  ctx.fillText(firstLine, textX, y + height / 2 + 20);
}

async function renderCardImage(recap: WeeklyRecap): Promise<Blob | null> {
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

  const glow = ctx.createRadialGradient(cx, H * 0.32, 0, cx, H * 0.32, W * 0.9);
  glow.addColorStop(0, "hsla(12,90%,60%, 0.28)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  drawBrandMark(ctx, displayFont);

  let y = 340;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = `700 34px ${bodyFont}`;
  ctx.fillStyle = "#B9B4C4";
  ctx.fillText("DEINE WOCHE", cx, y);

  y += 130;
  ctx.font = `700 150px ${displayFont}`;
  const heroGrad = ctx.createLinearGradient(cx - 200, 0, cx + 200, 0);
  heroGrad.addColorStop(0, FROM);
  heroGrad.addColorStop(1, TO);
  ctx.fillStyle = heroGrad;
  ctx.fillText(String(recap.rounds), cx, y);

  y += 70;
  ctx.font = `600 40px ${bodyFont}`;
  ctx.fillStyle = "#FAF8F4";
  ctx.fillText(recap.rounds === 1 ? "gespielte Runde" : "gespielte Runden", cx, y);

  const rowWidth = W * 0.82;
  const rowHeight = 128;
  const rowGap = 28;

  const rows: { emoji: string; label: string; value: string }[] = [];
  if (recap.favoriteGame) {
    rows.push({
      emoji: "🏆",
      label: "LIEBLINGSSPIEL",
      value: `${recap.favoriteGame.title} (${recap.favoriteGame.count}×)`,
    });
  }
  if (recap.bestWeekday) {
    rows.push({ emoji: "📅", label: "BESTER TAG", value: recap.bestWeekday });
  }
  if (recap.streakCount > 0) {
    rows.push({ emoji: "🔥", label: "STREAK", value: recap.streakCount === 1 ? "1 Tag" : `${recap.streakCount} Tage` });
  }

  // Statistik-Zeilen mittig im Raum zwischen Hero-Zahl und Fußzeile platzieren,
  // statt sie oben zu stapeln -- sonst klafft bei weniger Zeilen (z. B. kein
  // Streak) eine hässliche Lücke zum Boden der Karte.
  const footerY = H - 130;
  const rowsTop = y + 60;
  const rowsBottom = footerY - 90;
  const totalRowsHeight = rows.length * rowHeight + Math.max(0, rows.length - 1) * rowGap;
  let rowY = rowsTop + Math.max(0, (rowsBottom - rowsTop - totalRowsHeight) / 2);

  for (const row of rows) {
    drawStatRow(ctx, bodyFont, displayFont, cx, rowY, rowWidth, rowHeight, row.emoji, row.label, row.value);
    rowY += rowHeight + rowGap;
  }

  drawFooter(ctx, bodyFont, cx, footerY, FROM, TO, "Spiel auch auf Noggl");

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png", 0.95));
}

/**
 * "Deine Woche"-Rückblick als Bild-Karte teilen -- gleicher Plus-Verkaufshebel
 * wie Ergebnis-/Highscore-Karte: für alle sichtbar, ohne Plus poppt beim
 * Klick die Plus-Übersicht auf statt die Karte zu bauen.
 */
export function WeeklyRecapCard({ recap, plusActive }: { recap: WeeklyRecap; plusActive: boolean }) {
  const [busy, setBusy] = useState(false);
  const { openPlusModal } = usePlusModal();

  async function handleClick() {
    if (!plusActive) {
      openPlusModal();
      return;
    }
    setBusy(true);
    try {
      const blob = await renderCardImage(recap);
      if (!blob) return;
      await shareOrDownloadImage(
        blob,
        "noggl-meine-woche.png",
        "Noggl",
        `Meine Woche bei Noggl: ${recap.rounds} ${recap.rounds === 1 ? "Runde" : "Runden"} gespielt!`,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      className="hairline flex w-full items-center justify-center gap-1.5 rounded-2xl px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-surface disabled:opacity-60"
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : plusActive ? (
        <Share2 className="h-4 w-4" />
      ) : (
        <Crown className="h-4 w-4 text-gold" />
      )}
      {busy ? "Erstelle Bild…" : "Deine Woche als Bild teilen"}
    </button>
  );
}
