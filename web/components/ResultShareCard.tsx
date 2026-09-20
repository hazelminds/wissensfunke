"use client";

import { useState } from "react";
import { Loader2, Share2 } from "lucide-react";

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

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const attempt = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(attempt).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = attempt;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function safeFileSlug(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "ergebnis"
  );
}

/**
 * Zeichnet die im Entwurf abgestimmte Karte direkt per Canvas (kein DOM-
 * Screenshot-Tool nötig) -- Marke, Farb-Badge mit Emoji, Titel, Kurztext,
 * Fußzeile. Nutzt dieselben next/font-Familien wie der Rest der App, damit
 * das Bild exakt zur echten Typografie passt statt einem Systemfont.
 *
 * Wichtig: nur Schriftschnitte verwenden, die auf der Ergebnis-Seite selbst
 * schon sichtbar gerendert werden (hier: font-bold/700 für Überschriften,
 * 400/500/600 für Fließtext) -- next/font lädt seine @font-face-Schnitte
 * lazy und pro Unicode-Bereich, ein Gewicht wie 800, das nirgends auf der
 * Seite vorkommt, ist beim Klick auf den Button oft noch gar nicht geladen.
 * `document.fonts.ready` wartet nur auf bereits angestoßene Ladevorgänge.
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
  await document.fonts.ready;
  const root = getComputedStyle(document.documentElement);
  // Nur den primären next/font-Namen nehmen (nicht die mitgelieferte, synthetische
  // "... Fallback"-Metrikschrift) -- mit beiden zusammen im selben Font-String
  // lehnt Canvas den Font-Face-Abgleich ab und rendert lautlos einen System-
  // Font, obwohl exakt dieselbe Familie im DOM daneben sichtbar korrekt greift.
  const displayFont = `${root.getPropertyValue("--font-plus-jakarta").split(",")[0]?.trim() || "sans-serif"}, sans-serif`;
  const bodyFont = `${root.getPropertyValue("--font-inter").split(",")[0]?.trim() || "sans-serif"}, sans-serif`;

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

  // Noggl-Marke oben links
  const markSize = 60;
  const markX = 84;
  const markY = 84;
  const markGrad = ctx.createLinearGradient(markX, markY, markX + markSize, markY + markSize);
  markGrad.addColorStop(0, "#F5623D");
  markGrad.addColorStop(1, "#FA9238");
  roundRectPath(ctx, markX, markY, markSize, markSize, 17);
  ctx.fillStyle = markGrad;
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 34px ${displayFont}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("N", markX + markSize / 2, markY + markSize / 2 + 3);

  ctx.font = `700 36px ${displayFont}`;
  ctx.fillStyle = "#F3F0EA";
  ctx.textAlign = "left";
  ctx.fillText("Noggl", markX + markSize + 18, markY + markSize / 2 + 2);

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

  const footerY = H - 130;
  const ruleGrad = ctx.createLinearGradient(cx - 40, 0, cx + 40, 0);
  ruleGrad.addColorStop(0, from);
  ruleGrad.addColorStop(1, to);
  ctx.fillStyle = ruleGrad;
  roundRectPath(ctx, cx - 40, footerY, 80, 5, 3);
  ctx.fill();

  ctx.font = `500 28px ${bodyFont}`;
  ctx.fillStyle = "#8B85A0";
  ctx.fillText("Mach den Test auf Noggl", cx, footerY + 50);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png", 0.95));
}

/**
 * Plus-Perk: Ergebnis als Bild-Karte teilen statt als Text. Baut die Karte
 * per Canvas (kein Screenshot-Tool, volle Kontrolle über Layout/Schrift),
 * teilt sie bevorzugt nativ als Bilddatei -- fällt ohne Datei-Teilen (v. a.
 * Desktop) auf einen direkten Download zurück.
 */
export function ResultShareCard({
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
}) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    try {
      const blob = await renderCardImage({ testTitle, resultTitle, resultEmoji, description, gradientClass });
      if (!blob) return;
      const fileName = `noggl-${safeFileSlug(resultTitle)}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      if (typeof navigator !== "undefined" && navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Noggl",
            text: `Mein Ergebnis bei "${testTitle}": ${resultTitle}`,
          });
        } catch {
          // Dialog abgebrochen -- kein Fehlerzustand nötig.
        }
        return;
      }

      // Kein natives Datei-Teilen (v. a. Desktop) -- direkt als Bild herunterladen.
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
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
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
      {busy ? "Erstelle Bild…" : "Ergebnis als Bild teilen"}
    </button>
  );
}
