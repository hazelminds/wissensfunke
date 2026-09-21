/** Gemeinsame Canvas-Bausteine für teilbare Bild-Karten (Testergebnis,
 * Highscore, ...) -- kein "server-only", läuft im Client. */

export function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
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

export function safeFileSlug(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "bild"
  );
}

/**
 * Nur den primären next/font-Namen nehmen (nicht die mitgelieferte,
 * synthetische "... Fallback"-Metrikschrift) -- mit beiden zusammen im
 * selben Font-String lehnt Canvas den Font-Face-Abgleich ab und rendert
 * lautlos einen System-Font, obwohl exakt dieselbe Familie im DOM daneben
 * sichtbar korrekt greift. Nur Schriftschnitte verwenden, die auf der
 * jeweiligen Seite selbst schon sichtbar gerendert werden (z. B. 700 für
 * Überschriften) -- next/font lädt seine @font-face-Schnitte lazy und pro
 * Unicode-Bereich, ein Gewicht, das nirgends auf der Seite vorkommt, ist
 * beim Klick auf den Teilen-Button oft noch gar nicht geladen.
 */
export async function primaryAppFonts(): Promise<{ displayFont: string; bodyFont: string }> {
  await document.fonts.ready;
  const root = getComputedStyle(document.documentElement);
  const displayFont = `${root.getPropertyValue("--font-plus-jakarta").split(",")[0]?.trim() || "sans-serif"}, sans-serif`;
  const bodyFont = `${root.getPropertyValue("--font-inter").split(",")[0]?.trim() || "sans-serif"}, sans-serif`;
  return { displayFont, bodyFont };
}

/** Noggl-Marke oben links -- identisch auf jeder Karte. */
export function drawBrandMark(ctx: CanvasRenderingContext2D, displayFont: string) {
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
}

/** Fußzeile mit kleinem Farbstrich + Call-to-Action -- identisch auf jeder Karte. */
export function drawFooter(
  ctx: CanvasRenderingContext2D,
  bodyFont: string,
  cx: number,
  footerY: number,
  from: string,
  to: string,
  text: string,
) {
  const ruleGrad = ctx.createLinearGradient(cx - 40, 0, cx + 40, 0);
  ruleGrad.addColorStop(0, from);
  ruleGrad.addColorStop(1, to);
  ctx.fillStyle = ruleGrad;
  roundRectPath(ctx, cx - 40, footerY, 80, 5, 3);
  ctx.fill();

  ctx.font = `500 28px ${bodyFont}`;
  ctx.fillStyle = "#8B85A0";
  ctx.textAlign = "center";
  ctx.fillText(text, cx, footerY + 50);
}

/**
 * Teilt eine fertige Bild-Blob nativ als Datei (bevorzugt, z. B. direkt ins
 * WhatsApp-Teilen-Menü), fällt ohne Datei-Teilen (v. a. Desktop) auf einen
 * direkten Download zurück.
 */
export async function shareOrDownloadImage(
  blob: Blob,
  fileName: string,
  shareTitle: string,
  shareText: string,
): Promise<void> {
  const file = new File([blob], fileName, { type: "image/png" });

  if (typeof navigator !== "undefined" && navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: shareTitle, text: shareText });
    } catch {
      // Dialog abgebrochen -- kein Fehlerzustand nötig.
    }
    return;
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
