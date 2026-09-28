"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Crown, ArrowRight } from "lucide-react";
import { PlusButton } from "@/components/PlusButton";
import { getLeaderboardAction } from "@/lib/actions/scores";
import type { LeaderboardEntry } from "@/lib/scores";

const AVATAR_COLORS = ["bg-quiz", "bg-puzzle"];

/** Kompakte Bestenlisten-Vorschau am Ende jeder Runde -- Base44-Vorbild.
 * Lädt die echten Top-2 client-seitig nach (die umgebenden Spiel-Komponenten
 * sind selbst schon Client-Components ohne Server-Daten zur Hand) -- zeigt
 * sich erst, sobald es tatsächlich Einträge gibt. Ohne Plus verschwommen mit
 * Upsell; mit Plus echte Namen/Punkte und ein Link zur vollen Liste statt
 * des Upsells. */
export function LeaderboardTeaser({ board, plusActive = false }: { board: "quiz" | "puzzle"; plusActive?: boolean }) {
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
        <div className={`flex flex-col gap-2 ${plusActive ? "" : "blur-sm select-none"}`}>
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
        {!plusActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/50 text-xs font-semibold text-ink">
            Nur mit Plus sichtbar
          </div>
        )}
      </div>

      {plusActive ? (
        <Link
          href="/bestenliste"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:opacity-80"
        >
          Zur Bestenliste <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <PlusButton className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:opacity-80">
          <Crown className="h-4 w-4" /> Plus freischalten und Bestenliste sehen{" "}
          <ArrowRight className="h-4 w-4" />
        </PlusButton>
      )}
    </div>
  );
}
