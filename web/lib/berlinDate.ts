/** Heutiges Kalenderdatum in Europa/Berlin als YYYY-MM-DD -- in einer
 * eigenen, server-freien Datei, damit sowohl server-only Code (lib/
 * announcements.ts) als auch Client-Komponenten (die Admin-Statusanzeige)
 * sie importieren können, ohne die server-only-Grenze zu verletzen. */
export function berlinToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Berlin" });
}
