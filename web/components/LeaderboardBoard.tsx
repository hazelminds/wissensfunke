"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Lock } from "lucide-react";
import { leaderboards } from "@/content/leaderboard";

const MEDALS = ["🥇", "🥈", "🥉"];
const AVATAR_COLORS = ["bg-quiz", "bg-puzzle", "bg-psych", "bg-primary"];

export function LeaderboardBoard() {
  const [tab, setTab] = useState<"quiz" | "puzzle">("quiz");
  const entries = leaderboards[tab];

  return (
    <div>
      <div className="hairline mb-6 inline-flex rounded-full bg-surface p-1">
        {(["quiz", "puzzle"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === t ? "bg-primary text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t === "quiz" ? "🧠 Quiz" : "🧩 Puzzle"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {entries.map((entry, i) => {
          const locked = i >= 3;
          return (
            <div
              key={entry.username}
              className={`hairline flex items-center gap-4 rounded-2xl bg-surface p-4 ${
                locked ? "relative overflow-hidden" : ""
              }`}
            >
              <div className={locked ? "flex flex-1 items-center gap-4 blur-sm select-none" : "flex flex-1 items-center gap-4"}>
                <span className="w-6 shrink-0 text-center font-display font-bold text-ink">
                  {MEDALS[i] ?? i + 1}
                </span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-bold text-white ${
                    AVATAR_COLORS[i % AVATAR_COLORS.length]
                  }`}
                >
                  {entry.username[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-bold text-ink">{entry.username}</p>
                  <p className="truncate text-xs text-muted">{entry.subtitle}</p>
                </div>
                <div className="shrink-0 text-right text-sm text-muted">
                  <p className="tabular-nums">{entry.timeLabel} Zeit</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display font-bold text-ink tabular-nums">{entry.points}</p>
                  <p className="text-xs text-muted">Punkte</p>
                </div>
              </div>
              {locked && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-bg/60 text-xs font-semibold text-ink">
                  <Lock className="h-3.5 w-3.5" /> Nur mit Plus sichtbar
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Link
        href="/konto"
        className="glow-primary mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <Crown className="h-4 w-4" /> Plus freischalten für die volle Bestenliste
      </Link>
    </div>
  );
}
