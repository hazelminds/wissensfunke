import { Trophy } from "lucide-react";

/** Kurzer Hinweis direkt über/neben dem "Bestleistung teilen"-Button, damit
 * der Moment auch optisch als was Besonderes markiert ist, nicht nur der
 * Button selbst. */
export function HighscoreBanner() {
  return (
    <div className="hairline flex items-center gap-2.5 rounded-2xl bg-gold-soft px-4 py-3.5 text-sm text-gold-dark">
      <Trophy className="h-4 w-4 shrink-0" />
      <p>
        <strong>Neue Bestleistung!</strong> Das war deine bisher beste Runde bei diesem Spiel.
      </p>
    </div>
  );
}
