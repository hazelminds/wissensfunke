"use client";

import { useEffect, useState } from "react";
import type { DailyRiddle as DailyRiddleData } from "@/content/daily";
import { recordDailyCompletion } from "@/lib/streak";
import { recordServerStreakCompletion } from "@/lib/actions/streak";
import { logGameEventAction } from "@/lib/actions/analytics";

export function DailyRiddle({ riddle }: { riddle: DailyRiddleData }) {
  useEffect(() => {
    logGameEventAction("tages-raetsel", "started").catch(() => null);
  }, []);

  const [revealed, setRevealed] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [freezesUsed, setFreezesUsed] = useState(0);

  async function reveal() {
    const local = recordDailyCompletion();
    const server = await recordServerStreakCompletion().catch(() => null);
    setStreakCount(server?.count ?? local.count);
    setFreezesUsed(server?.freezesUsed ?? 0);
    setRevealed(true);
    logGameEventAction("tages-raetsel", "completed").catch(() => null);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-bold text-ink">Tages-Rätsel</h1>

      <div className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-6">
        <span className="w-fit rounded-full bg-coral-soft px-3.5 py-1.5 text-[12.5px] font-bold text-coral-dark">
          🧩 Logik &amp; Wortspiel
        </span>
        <p className="font-display text-xl leading-snug font-semibold text-ink text-balance">
          {riddle.prompt}
        </p>

        {revealed ? (
          <div className="flex flex-col gap-2 rounded-xl bg-green-soft p-4">
            <p className="font-display text-[15px] font-bold text-green-dark">
              Lösung: {riddle.answer}
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">{riddle.explanation}</p>
          </div>
        ) : (
          <button onClick={reveal} className="btn-3d btn-3d-primary py-4 text-base">
            Lösung anzeigen
          </button>
        )}
      </div>

      {revealed && freezesUsed > 0 && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-primary-soft px-4 py-3.5 text-sm text-primary-dark">
          <span className="text-xl leading-none">🧊</span>
          <p>
            <strong>Streak-Schutz eingesetzt!</strong> {freezesUsed === 1 ? "Ein verpasster Tag wurde" : `${freezesUsed} verpasste Tage wurden`} automatisch ausgeglichen — deine Serie läuft weiter.
          </p>
        </div>
      )}

      {revealed && (
        <p className="text-center text-sm text-ink-soft">
          Neues Rätsel gibt es morgen.{" "}
          {streakCount > 0 && (
            <>
              Dein Streak steht jetzt bei <strong>{streakCount} {streakCount === 1 ? "Tag" : "Tagen"}</strong>.
            </>
          )}
        </p>
      )}
    </div>
  );
}
