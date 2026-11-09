"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Trophy } from "lucide-react";
import { recordDailyCompletion } from "@/lib/streak";
import { recordServerStreakCompletion } from "@/lib/actions/streak";
import { incrementTodayPlayCount } from "@/lib/dailyCap";
import { logGameEventAction } from "@/lib/actions/analytics";
import { submitScoreAction } from "@/lib/actions/scores";
import { LeaderboardTeaser } from "@/components/LeaderboardTeaser";
import { ChallengeBanner, ChallengeCompare } from "@/components/ChallengeCompare";
import { ChallengeButton } from "@/components/ChallengeButton";
import { HighscoreBanner } from "@/components/HighscoreBanner";
import { HighscoreShareCard } from "@/components/HighscoreShareCard";
import { Confetti } from "@/components/Confetti";
import { HighscoreCelebration } from "@/components/HighscoreCelebration";
import {
  generatePuzzle,
  canPour,
  applyPour,
  isSolved,
  LAYOUTS,
  type ColorSortDifficulty,
  type ColorSortPuzzle,
} from "@/content/colorSort";

export interface ChallengeInfo {
  name: string;
  points: number;
  seconds: number;
}

const labelFor = (d: ColorSortDifficulty) => (d === "medium" ? "Mittel" : d === "hard" ? "Schwer" : "Leicht");

// Flaschengröße passt sich der Schwierigkeit an -- bei "schwer" stehen bis
// zu 13 Flaschen gleichzeitig auf dem Feld, da muss jede schmaler sein.
const SIZE_BY_DIFFICULTY: Record<ColorSortDifficulty, { width: number; segment: number }> = {
  easy: { width: 56, segment: 28 },
  medium: { width: 50, segment: 25 },
  hard: { width: 44, segment: 22 },
};

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function ColorSort({
  slug,
  title,
  color,
  difficulty = "easy",
  challenge,
  plusActive = false,
}: {
  slug: string;
  title: string;
  color: string;
  difficulty?: ColorSortDifficulty;
  challenge?: ChallengeInfo | null;
  plusActive?: boolean;
}) {
  const [puzzle, setPuzzle] = useState<ColorSortPuzzle>(() => generatePuzzle(difficulty));
  const [tubes, setTubes] = useState<number[][]>(() => puzzle.tubes.map((t) => t.slice()));
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [solved, setSolved] = useState(false);
  const [finalResult, setFinalResult] = useState<{ points: number; seconds: number } | null>(null);
  const [newBest, setNewBest] = useState<{ points: number; seconds: number } | null>(null);

  const size = SIZE_BY_DIFFICULTY[difficulty];
  const capacity = puzzle.capacity;
  const parMoves = LAYOUTS[difficulty].parMoves;

  useEffect(() => {
    logGameEventAction(slug, "started").catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (solved) return;
    const t = setInterval(() => setElapsed((Date.now() - startTime) / 1000), 250);
    return () => clearInterval(t);
  }, [startTime, solved]);

  useEffect(() => {
    if (isSolved(tubes, capacity)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSolved(true);
      incrementTodayPlayCount();
      recordDailyCompletion();
      recordServerStreakCompletion().catch(() => null);
      logGameEventAction(slug, "completed").catch(() => null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tubes]);

  const extraMoves = Math.max(0, moves - parMoves);
  const solveScore = Math.max(80, 2200 - extraMoves * 15 - Math.round(elapsed) * 2);

  useEffect(() => {
    if (!solved) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFinalResult({ points: solveScore, seconds: Math.round(elapsed) });
    submitScoreAction("puzzle", slug, solveScore, Math.round(elapsed), moves)
      .then((res) => {
        if (res.isNewBest) setNewBest({ points: solveScore, seconds: Math.round(elapsed) });
      })
      .catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved]);

  const reset = useCallback(() => {
    const next = generatePuzzle(difficulty);
    setPuzzle(next);
    setTubes(next.tubes.map((t) => t.slice()));
    setSelected(null);
    setMoves(0);
    setStartTime(Date.now());
    setElapsed(0);
    setSolved(false);
    setFinalResult(null);
    setNewBest(null);
    logGameEventAction(slug, "started").catch(() => null);
  }, [difficulty, slug]);

  const onTubeClick = (i: number) => {
    if (solved) return;
    if (selected === null) {
      if (tubes[i].length > 0) setSelected(i);
      return;
    }
    if (selected === i) {
      setSelected(null);
      return;
    }
    if (canPour(tubes, selected, i, capacity)) {
      setTubes((prev) => applyPour(prev, selected, i, capacity));
      setMoves((m) => m + 1);
      setSelected(null);
      return;
    }
    // Ungültiger Guss -- falls die angeklickte Flasche selbst Inhalt hat,
    // komfortabler direkt dorthin umschalten statt nichts zu tun.
    setSelected(tubes[i].length > 0 ? i : null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: `hsl(var(--${color}))` }}>
            Farben sortieren · {labelFor(difficulty)}
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{fmtTime(elapsed)}</span>
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{moves} Züge</span>
        </div>
      </div>

      {challenge && !solved && (
        <div className="mb-4">
          <ChallengeBanner name={challenge.name} points={challenge.points} seconds={challenge.seconds} />
        </div>
      )}

      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={reset}
          className="hairline inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface"
        >
          <RefreshCw className="h-4 w-4" /> Neues Rätsel
        </button>
      </div>

      <div className="relative">
        <div className="hairline mx-auto flex max-w-[560px] flex-wrap items-end justify-center gap-3 rounded-2xl bg-surface p-6">
          {tubes.map((tube, i) => {
            const isSelected = selected === i;
            const emptySlots = capacity - tube.length;
            return (
              <button
                key={i}
                onClick={() => onTubeClick(i)}
                className="flex flex-col-reverse overflow-hidden rounded-b-xl rounded-t-md border-2 bg-bg/40 transition-transform"
                style={{
                  width: size.width,
                  height: size.segment * capacity + 6,
                  borderColor: isSelected ? "hsl(var(--primary))" : "hsl(var(--border))",
                  transform: isSelected ? "translateY(-10px)" : "none",
                  boxShadow: isSelected ? "0 6px 14px -4px hsl(var(--primary) / 0.5)" : "none",
                }}
              >
                {tube.map((colorIdx, segIdx) => (
                  <div
                    key={segIdx}
                    style={{ height: size.segment, backgroundColor: puzzle.colors[colorIdx] }}
                  />
                ))}
                {Array.from({ length: emptySlots }).map((_, idx) => (
                  <div key={`empty-${idx}`} style={{ height: size.segment }} />
                ))}
              </button>
            );
          })}
        </div>

        {solved && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-2xl bg-bg/85 px-6 text-center backdrop-blur-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-soft">
              <Trophy className="h-7 w-7 text-green" />
            </div>
            <p className="font-display text-2xl font-extrabold text-ink">Gelöst!</p>
            <p className="mt-1 text-sm text-muted">
              {moves} Züge · {fmtTime(elapsed)} · {solveScore} Punkte
            </p>
            <button
              onClick={reset}
              className="glow-primary mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" /> Nochmal spielen
            </button>
          </div>
        )}
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        Tippe eine Flasche an, dann die Zielflasche -- die oberste Farbe wird umgegossen. Passt nur auf eine leere
        Flasche oder auf dieselbe Farbe obenauf. Ziel: jede Flasche am Ende leer oder einfarbig voll.
      </p>

      {solved && finalResult && challenge && (
        <div className="mt-5">
          <ChallengeCompare
            myPoints={finalResult.points}
            mySeconds={finalResult.seconds}
            opponentName={challenge.name}
            opponentPoints={challenge.points}
            opponentSeconds={challenge.seconds}
          />
        </div>
      )}

      {solved && finalResult && (
        <div className="mt-5">
          <ChallengeButton
            shareTitle={title}
            buildUrl={(name) => {
              const url = new URL(window.location.origin + `/quiz/${slug}`);
              if (name) url.searchParams.set("name", name);
              url.searchParams.set("pts", String(finalResult.points));
              url.searchParams.set("zeit", String(finalResult.seconds));
              return url.toString();
            }}
            buildShareText={(name) =>
              name
                ? `${name} hat "${title}" mit ${finalResult.points} Punkten gelöst -- schlägst du das?`
                : `Ich hab "${title}" mit ${finalResult.points} Punkten gelöst -- schlägst du das?`
            }
          />
        </div>
      )}

      {solved && <Confetti />}

      {newBest && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <HighscoreCelebration />
          <HighscoreBanner />
          <HighscoreShareCard
            gameTitle={title}
            category="puzzle"
            points={newBest.points}
            timeSeconds={newBest.seconds}
            plusActive={plusActive}
          />
        </div>
      )}

      {solved && <LeaderboardTeaser board="puzzle" plusActive={plusActive} />}
    </div>
  );
}
