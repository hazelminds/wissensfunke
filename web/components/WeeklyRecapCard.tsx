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

const HERO_FROM = "hsl(12,90%,60%)";
const HERO_TO = "hsl(28,95%,55%)";
const GOLD_FROM = "hsl(45,95%,58%)";
const GOLD_TO = "hsl(28,90%,50%)";
const GREEN_FROM = "hsl(160,70%,45%)";
const GREEN_TO = "hsl(170,65%,40%)";
const FIRE_FROM = "hsl(0,84%,60%)";
const FIRE_TO = "hsl(28,95%,55%)";

/** "16.–23. Sept." -- Datumsspanne der letzten 7 Tage (rollierend, dasselbe
 * Fenster wie die Recap-Daten selbst), fürs Zeitgefühl auf der Karte. */
function formatWeekRange(): string {
  const end = new Date();
  const start = new Date(end.getTime() - 6 * 24 * 60 * 60 * 1000);
  const dayFmt = new Intl.DateTimeFormat("de-DE", { day: "numeric" });
  const monthFmt = new Intl.DateTimeFormat("de-DE", { month: "short" });
  const startDay = dayFmt.format(start);
  const endDay = dayFmt.format(end);
  const startMonth = monthFmt.format(start);
  const endMonth = monthFmt.format(end);
  return startMonth === endMonth
    ? `${startDay}.–${endDay}. ${endMonth}`
    : `${startDay}. ${startMonth} – ${endDay}. ${endMonth}`;
}

/** Farbverlaufener Kreis mit zentriertem Emoji -- der wiederkehrende
 * "Abzeichen"-Baustein für jede Statistik auf der Karte. */
function drawIconBadge(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  emoji: string,
  from: string,
  to: string,
) {
  const grad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
  grad.addColorStop(0, from);
  grad.addColorStop(1, to);
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.font = `${Math.round(radius * 1.1)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, cx, cy + radius * 0.06);
}

/** Ein paar leise, verstreute Farbpunkte fürs Auge -- rein dekorativ, bewusst
 * spärlich und am Rand, damit der Text immer lesbar bleibt. */
function drawScatteredDots(ctx: CanvasRenderingContext2D) {
  const colors = [HERO_FROM, GOLD_FROM, GREEN_FROM, FIRE_TO];
  const dots = [
    [70, 260], [1000, 300], [50, 700], [1020, 640], [90, 1120], [1000, 1080],
    [60, 1500], [1010, 1460], [130, 1750], [950, 1780],
  ];
  dots.forEach(([x, y], i) => {
    ctx.beginPath();
    ctx.arc(x, y, 4 + (i % 3) * 2, 0, Math.PI * 2);
    ctx.fillStyle = colors[i % colors.length].replace("hsl(", "hsla(").replace(")", ", 0.35)");
    ctx.fill();
  });
}

/** Berechnet Zeilenumbruch (max. 2 Zeilen) und Gesamthöhe der Spotlight-Karte
 * im Voraus -- gebraucht, um den gesamten Statistik-Block vor dem Zeichnen
 * lotrecht zentrieren zu können. */
function layoutSpotlight(
  ctx: CanvasRenderingContext2D,
  displayFont: string,
  title: string,
  width: number,
  padX: number,
  badgeR: number,
) {
  ctx.font = `700 34px ${displayFont}`;
  const textX = padX + badgeR * 2 + 28;
  const maxTextWidth = width - textX - padX;
  const lines = wrapLines(ctx, title, maxTextWidth).slice(0, 2);
  const lineHeight = 42;
  const height = Math.max(180, 56 + lines.length * lineHeight + 46);
  return { lines, height, textX, maxTextWidth };
}

function drawSpotlightCard(
  ctx: CanvasRenderingContext2D,
  bodyFont: string,
  displayFont: string,
  cx: number,
  y: number,
  width: number,
  height: number,
  lines: string[],
  countLabel: string,
) {
  const left = cx - width / 2;
  const padX = 44;
  const badgeR = 46;

  ctx.fillStyle = "rgba(250,190,60,0.09)";
  roundRectPath(ctx, left, y, width, height, 28);
  ctx.fill();

  const barGrad = ctx.createLinearGradient(left, y, left, y + height);
  barGrad.addColorStop(0, GOLD_FROM);
  barGrad.addColorStop(1, GOLD_TO);
  ctx.fillStyle = barGrad;
  roundRectPath(ctx, left, y, 8, height, 4);
  ctx.fill();

  drawIconBadge(ctx, left + padX + badgeR, y + height / 2, badgeR, "🏆", GOLD_FROM, GOLD_TO);

  const textX = left + padX + badgeR * 2 + 28;
  let ty = y + 54;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `700 24px ${bodyFont}`;
  ctx.fillStyle = "#E4C572";
  ctx.fillText("LIEBLINGSSPIEL DER WOCHE", textX, ty);

  ty += 44;
  ctx.font = `700 34px ${displayFont}`;
  ctx.fillStyle = "#FAF8F4";
  for (const line of lines) {
    ctx.fillText(line, textX, ty);
    ty += 42;
  }

  ctx.font = `600 26px ${bodyFont}`;
  ctx.fillStyle = "#B9B4C4";
  ctx.fillText(countLabel, textX, ty + 4);
}

function drawMiniTile(
  ctx: CanvasRenderingContext2D,
  bodyFont: string,
  displayFont: string,
  x: number,
  y: number,
  width: number,
  height: number,
  emoji: string,
  label: string,
  value: string,
  from: string,
  to: string,
) {
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  roundRectPath(ctx, x, y, width, height, 28);
  ctx.fill();

  const cx = x + width / 2;
  const badgeR = 42;
  const badgeCy = y + 66;
  drawIconBadge(ctx, cx, badgeCy, badgeR, emoji, from, to);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = `700 30px ${displayFont}`;
  ctx.fillStyle = "#FAF8F4";
  const [line] = wrapLines(ctx, value, width - 36);
  ctx.fillText(line, cx, badgeCy + badgeR + 54);

  ctx.font = `600 22px ${bodyFont}`;
  ctx.fillStyle = "#8B85A0";
  ctx.fillText(label, cx, badgeCy + badgeR + 86);
}

const DAY_LABELS = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];

/** Kleines Balkendiagramm "Runden pro Tag" -- füllt den sonst leeren unteren
 * Kartenbereich mit echtem Inhalt statt nur Dekoration, und zeigt auf einen
 * Blick, wie sich die Woche verteilt hat (nicht nur den einzelnen Bestwert). */
function drawActivityChart(
  ctx: CanvasRenderingContext2D,
  bodyFont: string,
  displayFont: string,
  cx: number,
  y: number,
  width: number,
  dailyCounts: number[],
): number {
  const left = cx - width / 2;
  const cardHeight = 380;
  const maxBarHeight = 200;

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  roundRectPath(ctx, left, y, width, cardHeight, 28);
  ctx.fill();

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `700 24px ${bodyFont}`;
  ctx.fillStyle = "#B9B4C4";
  ctx.fillText("AKTIVITÄT DIESE WOCHE", left + 44, y + 56);

  const maxCount = Math.max(1, ...dailyCounts);
  const chartLeft = left + 44;
  const chartRight = left + width - 44;
  const chartWidth = chartRight - chartLeft;
  const barGap = 20;
  const barWidth = (chartWidth - barGap * (dailyCounts.length - 1)) / dailyCounts.length;
  const baseline = y + 96 + maxBarHeight;

  const activeGrad = ctx.createLinearGradient(0, baseline - maxBarHeight, 0, baseline);
  activeGrad.addColorStop(0, HERO_TO);
  activeGrad.addColorStop(1, HERO_FROM);

  dailyCounts.forEach((count, i) => {
    const barX = chartLeft + i * (barWidth + barGap);
    const barHeight = count === 0 ? 8 : Math.max(16, (count / maxCount) * maxBarHeight);
    const isMax = count === maxCount && count > 0;

    if (count > 0) {
      ctx.textAlign = "center";
      ctx.font = `700 24px ${displayFont}`;
      ctx.fillStyle = isMax ? "#FAF8F4" : "#8B85A0";
      ctx.fillText(String(count), barX + barWidth / 2, baseline - barHeight - 16);
    }

    ctx.fillStyle = isMax ? activeGrad : "rgba(255,255,255,0.14)";
    roundRectPath(ctx, barX, baseline - barHeight, barWidth, barHeight, 10);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.font = `600 22px ${bodyFont}`;
    ctx.fillStyle = "#8B85A0";
    ctx.fillText(DAY_LABELS[i], barX + barWidth / 2, baseline + 38);
  });

  return cardHeight;
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

  const glow = ctx.createRadialGradient(cx, H * 0.28, 0, cx, H * 0.28, W * 0.95);
  glow.addColorStop(0, "hsla(12,90%,60%, 0.3)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  drawScatteredDots(ctx);
  drawBrandMark(ctx, displayFont);

  let y = 330;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = `700 34px ${bodyFont}`;
  ctx.fillStyle = "#B9B4C4";
  ctx.fillText("DEINE WOCHE", cx, y);

  y += 60;
  const rangeLabel = formatWeekRange();
  ctx.font = `600 26px ${bodyFont}`;
  const rangeWidth = ctx.measureText(rangeLabel).width + 56;
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  roundRectPath(ctx, cx - rangeWidth / 2, y - 34, rangeWidth, 50, 25);
  ctx.fill();
  ctx.fillStyle = "#CFCAD9";
  ctx.fillText(rangeLabel, cx, y);

  y += 150;
  const heroGlow = ctx.createRadialGradient(cx, y - 50, 0, cx, y - 50, 280);
  heroGlow.addColorStop(0, "hsla(20,95%,58%,0.35)");
  heroGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = heroGlow;
  ctx.fillRect(0, 0, W, H);

  ctx.font = `700 150px ${displayFont}`;
  const heroGrad = ctx.createLinearGradient(cx - 200, 0, cx + 200, 0);
  heroGrad.addColorStop(0, HERO_FROM);
  heroGrad.addColorStop(1, HERO_TO);
  ctx.fillStyle = heroGrad;
  ctx.fillText(String(recap.rounds), cx, y);

  y += 70;
  ctx.font = `600 40px ${bodyFont}`;
  ctx.fillStyle = "#FAF8F4";
  ctx.fillText(recap.rounds === 1 ? "gespielte Runde" : "gespielte Runden", cx, y);

  const blockWidth = W * 0.82;
  const blockLeft = cx - blockWidth / 2;
  const gap = 24;

  const spotlight = recap.favoriteGame
    ? layoutSpotlight(ctx, displayFont, `${recap.favoriteGame.title}`, blockWidth, 44, 46)
    : null;
  const miniTiles: { emoji: string; label: string; value: string; from: string; to: string }[] = [];
  if (recap.bestWeekday) {
    miniTiles.push({ emoji: "📅", label: "BESTER TAG", value: recap.bestWeekday, from: GREEN_FROM, to: GREEN_TO });
  }
  if (recap.streakCount > 0) {
    miniTiles.push({
      emoji: "🔥",
      label: "STREAK",
      value: recap.streakCount === 1 ? "1 Tag" : `${recap.streakCount} Tage`,
      from: FIRE_FROM,
      to: FIRE_TO,
    });
  }
  const miniTileHeight = 220;

  // Bewusst nicht voll im Restraum zentriert (das ließ den Block wie
  // losgelöst zwischen zwei Lücken schweben) -- knapp unter der Hero-Zahl
  // anfangen, die eine große Lücke bleibt unten vor der Fußzeile, genau wie
  // bei ResultShareCard/HighscoreShareCard.
  const footerY = H - 130;
  let blockY = y + 90;

  if (spotlight && recap.favoriteGame) {
    drawSpotlightCard(
      ctx,
      bodyFont,
      displayFont,
      cx,
      blockY,
      blockWidth,
      spotlight.height,
      spotlight.lines,
      `${recap.favoriteGame.count}× gespielt`,
    );
    blockY += spotlight.height + gap;
  }

  if (miniTiles.length === 2) {
    const tileWidth = (blockWidth - gap) / 2;
    miniTiles.forEach((tile, i) => {
      drawMiniTile(
        ctx,
        bodyFont,
        displayFont,
        blockLeft + i * (tileWidth + gap),
        blockY,
        tileWidth,
        miniTileHeight,
        tile.emoji,
        tile.label,
        tile.value,
        tile.from,
        tile.to,
      );
    });
    blockY += miniTileHeight + gap;
  } else if (miniTiles.length === 1) {
    const tile = miniTiles[0];
    const tileWidth = blockWidth * 0.55;
    drawMiniTile(
      ctx,
      bodyFont,
      displayFont,
      cx - tileWidth / 2,
      blockY,
      tileWidth,
      miniTileHeight,
      tile.emoji,
      tile.label,
      tile.value,
      tile.from,
      tile.to,
    );
    blockY += miniTileHeight + gap;
  }

  if (recap.dailyCounts.some((c) => c > 0)) {
    drawActivityChart(ctx, bodyFont, displayFont, cx, blockY, blockWidth, recap.dailyCounts);
  }

  drawFooter(ctx, bodyFont, cx, footerY, HERO_FROM, HERO_TO, "Spiel auch auf Noggl");

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
