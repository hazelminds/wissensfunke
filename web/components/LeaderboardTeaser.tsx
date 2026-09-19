"use client";

import { useEffect, useState } from "react";
import { Trophy, Crown, ArrowRight } from "lucide-react";
import { PlusButton } from "@/components/PlusButton";
import { getLeaderboardAction } from "@/lib/actions/scores";
import type { LeaderboardEntry } from "@/lib/scores";

const AVATAR_COLORS = ["bg-quiz", "bg-puzzle"];

/** Kompakte, verschwommene Bestenlisten-Vorschau -- Base44-Vorbild: am Ende
 * jeder Runde ein Plus-Teaser, statt die Bestenliste nur separat zu zeigen.
 * Lädt die echten Top-2 client-seitig nach (die umgebenden Spiel-Komponenten
 * sind selbst schon Client-Components ohne Server-Daten zur Hand) -- zeigt
 * sich erst, sobald es tatsächlich Einträge gibt. */
export function LeaderboardTeaser({ board }: { board: "quiz" | "puzzle" }) {
  const [top, setTop] = useState<LeaderboardEntry[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getLeaderboardAction(board)
      .then((entries) => {
        if (!cancelled) setTop(entries.slice(0, 2));
      })
      .catch(() => {
        if (!cancelled) setTop([]);
      });
    return () => {
      cancelled = true;
    };
  }, [board]);

  if (!top || top.length === 0) return null;

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

      <PlusButton className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:opacity-80">
        <Crown className="h-4 w-4" /> Plus freischalten und Bestenliste sehen{" "}
        <ArrowRight className="h-4 w-4" />
      </PlusButton>
    </div>
  );
}
