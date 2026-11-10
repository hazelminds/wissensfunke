"use client";

import { useCallback, useEffect, useState } from "react";
import { Delete, RefreshCw, Trophy } from "lucide-react";
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
import { generatePuzzle, rc, boxOf, type SudokuDifficulty, type SudokuPuzzle } from "@/content/sudoku";

export interface ChallengeInfo {
  name: string;
  points: number;
  seconds: number;
}

const labelFor = (d: SudokuDifficulty) => (d === "medium" ? "Mittel" : d === "hard" ? "Schwer" : "Leicht");

/** Reine Hilfsfunktion (kein State-Zugriff): true, wenn die Zahl an `i` mit
 * einer gleichen Zahl in derselben Zeile/Spalte/3x3-Box kollidiert. Zeigt
 * dem Spieler nur, dass es gerade widersprüchlich ist -- verrät nie, was
 * richtig wäre. */
function hasConflict(grid: number[], i: number): boolean {
  const v = grid[i];
  if (v === 0) return false;
  const [r, c] = rc(i);
  const b = boxOf(r, c);
  for (let j = 0; j < 81; j++) {
    if (j === i || grid[j] !== v) continue;
    const [r2, c2] = rc(j);
    if (r2 === r || c2 === c || boxOf(r2, c2) === b) return true;
  }
  return false;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function Sudoku({
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
  difficulty?: SudokuDifficulty;
  challenge?: ChallengeInfo | null;
  plusActive?: boolean;
}) {
  const [puzzle, setPuzzle] = useState<SudokuPuzzle>(() => generatePuzzle(difficulty));
  const [grid, setGrid] = useState<number[]>(() => puzzle.puzzle.slice());
  const [selected, setSelected] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [solved, setSolved] = useState(false);
  const [finalResult, setFinalResult] = useState<{ points: number; seconds: number } | null>(null);
  const [newBest, setNewBest] = useState<{ points: number; seconds: number } | null>(null);

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
    if (grid.every((v, i) => v === puzzle.solution[i])) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSolved(true);
      incrementTodayPlayCount();
      recordDailyCompletion();
      recordServerStreakCompletion().catch(() => null);
      logGameEventAction(slug, "completed").catch(() => null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid]);

  const solveScore = Math.max(100, 2000 - mistakes * 60 - Math.round(elapsed) * 2);

  useEffect(() => {
    if (!solved) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFinalResult({ points: solveScore, seconds: Math.round(elapsed) });
    submitScoreAction("puzzle", slug, solveScore, Math.round(elapsed), mistakes)
      .then((res) => {
        if (res.isNewBest) setNewBest({ points: solveScore, seconds: Math.round(elapsed) });
      })
      .catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved]);

  const reset = useCallback(() => {
    const next = generatePuzzle(difficulty);
    setPuzzle(next);
    setGrid(next.puzzle.slice());
    setSelected(null);
    setMistakes(0);
    setStartTime(Date.now());
    setElapsed(0);
    setSolved(false);
    setFinalResult(null);
    setNewBest(null);
    logGameEventAction(slug, "started").catch(() => null);
  }, [difficulty, slug]);

  const enterDigit = (digit: number) => {
    if (solved || selected === null) return;
    if (puzzle.puzzle[selected] !== 0) return; // vorgegebene Zelle, nicht editierbar
    if (digit !== 0 && grid[selected] !== puzzle.solution[selected]) {
      setMistakes((m) => m + 1);
    }
    setGrid((prev) => {
      const next = prev.slice();
      next[selected] = digit;
      return next;
    });
  };

  const selectedValue = selected !== null ? grid[selected] : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: `hsl(var(--${color}))` }}>
            Sudoku · {labelFor(difficulty)}
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{fmtTime(elapsed)}</span>
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{mistakes} Fehler</span>
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

      <div className="hairline relative mx-auto w-fit rounded-2xl bg-surface p-6">
        <div className="grid grid-cols-9 gap-[1px] overflow-hidden rounded-xl bg-line p-[1px]">
          {grid.map((value, i) => {
            const [r, c] = rc(i);
            const isGiven = puzzle.puzzle[i] !== 0;
            const isSelected = selected === i;
            const [sr, sc] = selected !== null ? rc(selected) : [-1, -1];
            const isPeer =
              selected !== null && selected !== i && (sr === r || sc === c || boxOf(sr, sc) === boxOf(r, c));
            const isSameValue = selectedValue !== null && selectedValue !== 0 && value === selectedValue;
            const conflict = hasConflict(grid, i);
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex h-9 w-9 items-center justify-center text-base font-bold transition ${
                  conflict ? "text-red" : isGiven ? "text-ink" : "text-primary"
                }`}
                style={{
                  backgroundColor: isSelected
                    ? "hsl(var(--primary) / 0.28)"
                    : isSameValue
                      ? "hsl(var(--primary) / 0.18)"
                      : isPeer
                        ? "hsl(var(--primary) / 0.08)"
                        : isGiven
                          ? "hsl(var(--border) / 0.5)"
                          : "transparent",
                  borderRight: c % 3 === 2 && c !== 8 ? "2px solid hsl(var(--ink) / 0.35)" : undefined,
                  borderBottom: r % 3 === 2 && r !== 8 ? "2px solid hsl(var(--ink) / 0.35)" : undefined,
                }}
              >
                {value !== 0 ? value : ""}
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
              {mistakes} Fehler · {fmtTime(elapsed)} · {solveScore} Punkte
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

      {!solved && (
        <div className="mx-auto mt-5 grid w-fit grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button
              key={d}
              onClick={() => enterDigit(d)}
              disabled={selected === null || puzzle.puzzle[selected] !== 0}
              className="hairline flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-ink transition hover:bg-surface disabled:opacity-30"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => enterDigit(0)}
            disabled={selected === null || puzzle.puzzle[selected] !== 0}
            className="hairline flex h-11 w-11 items-center justify-center rounded-xl text-ink-soft transition hover:bg-surface disabled:opacity-30"
          >
            <Delete className="h-4 w-4" />
          </button>
        </div>
      )}

      <p className="mt-5 text-center text-sm text-muted">
        Tippe ein Feld an, dann eine Zahl. Jede Zahl darf pro Zeile, Spalte und 3×3-Block nur einmal vorkommen --
        Widersprüche werden rot markiert.
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
