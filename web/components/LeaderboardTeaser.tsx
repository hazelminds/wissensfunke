import Link from "next/link";
import { Trophy, Crown, ArrowRight } from "lucide-react";
import { leaderboards } from "@/content/leaderboard";

const AVATAR_COLORS = ["bg-quiz", "bg-puzzle"];

/** Kompakte, verschwommene Bestenlisten-Vorschau -- Base44-Vorbild: am Ende
 * jeder Runde ein Plus-Teaser, statt die Bestenliste nur separat zu zeigen. */
export function LeaderboardTeaser({ board }: { board: "quiz" | "puzzle" }) {
  const top = leaderboards[board].slice(0, 2);

  return (
    <div className="hairline mt-6 w-full overflow-hidden rounded-2xl bg-surface p-4 text-left">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
        <Trophy className="h-4 w-4 text-primary" /> Bestenliste
      </div>

      <div className="relative flex flex-col gap-2">
        <div className="flex flex-col gap-2 blur-sm select-none">
          {top.map((entry, i) => (
            <div key={entry.username} className="flex items-center gap-3 text-sm">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${AVATAR_COLORS[i]}`}
              >
                {entry.username[0]}
              </span>
              <span className="flex-1 truncate font-semibold text-ink">{entry.username}</span>
              <span className="tabular-nums text-muted">{entry.points} Punkte</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-bg/50 text-xs font-semibold text-ink">
          Nur mit Plus sichtbar
        </div>
      </div>

      <Link
        href="/konto"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:opacity-80"
      >
        <Crown className="h-4 w-4" /> Plus freischalten und Bestenliste sehen{" "}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
