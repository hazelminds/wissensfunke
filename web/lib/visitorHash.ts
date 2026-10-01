import "server-only";
import { createHmac } from "crypto";

/**
 * Täglich rotierender, nicht zurückrechenbarer Besucher-Hash für "eindeutige
 * Besucher" im Admin-Dashboard -- ohne Cookie, ohne gespeicherte IP. Die IP
 * fließt nur kurzzeitig hier im Server-Speicher in den HMAC ein, wird nie in
 * der Datenbank abgelegt. Der Hash wechselt mit jedem Kalendertag (UTC), lässt
 * sich also nicht über mehrere Tage hinweg zu einem Profil verknüpfen --
 * gleiches Prinzip wie bei datenschutzfreundlichen Analytics-Tools (z. B.
 * Plausible), die genau damit ganz ohne Cookie-Banner auskommen.
 */

// Fallback nur für lokale Entwicklung ohne gesetztes Secret -- in Produktion
// MUSS ANALYTICS_HASH_SECRET über die Umgebungsvariablen gesetzt sein, sonst
// wäre der Hash mit einem öffentlich bekannten Schlüssel berechenbar.
const FALLBACK_DEV_SECRET = "dev-only-insecure-fallback-salt";

function getSecret(): string {
  return process.env.ANALYTICS_HASH_SECRET || FALLBACK_DEV_SECRET;
}

function utcDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** `ip`/`userAgent` können fehlen (z. B. hinter einem Proxy ohne Header) --
 * liefert dann `null`, Aufrufer verzichten in dem Fall einfach auf den Hash
 * für diese Zeile, statt mit einem irreführenden Platzhalter zu zählen. */
export function hashVisitor(ip: string | null, userAgent: string | null, date: Date = new Date()): string | null {
  if (!ip) return null;
  const input = `${utcDayKey(date)}:${ip}:${userAgent ?? ""}`;
  return createHmac("sha256", getSecret()).update(input).digest("hex");
}
