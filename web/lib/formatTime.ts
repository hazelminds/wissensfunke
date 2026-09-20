/** Reine Formatierung, kein Server-Code -- separat von lib/scores.ts (das
 * "server-only" importiert), damit auch Client-Komponenten sie nutzen können,
 * z. B. für die Challenge-Vergleichsanzeige in Crossword/SlidingPuzzle. */
export function formatTimeLabel(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.max(0, Math.round(totalSeconds % 60));
  return `${m}:${s.toString().padStart(2, "0")}`;
}
