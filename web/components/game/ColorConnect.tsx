"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import { generatePuzzle, type ColorConnectDifficulty, type ColorConnectPuzzle } from "@/content/colorConnect";

export interface ChallengeInfo {
  name: string;
  points: number;
  seconds: number;
}

const labelFor = (d: ColorConnectDifficulty) => (d === "medium" ? "Mittel" : d === "hard" ? "Schwer" : "Leicht");

function neighborsOf(cell: number, cols: number, rows: number): number[] {
  const r = Math.floor(cell / cols);
  const c = cell % cols;
  const out: number[] = [];
  if (r > 0) out.push(cell - cols);
  if (r < rows - 1) out.push(cell + cols);
  if (c > 0) out.push(cell - 1);
  if (c < cols - 1) out.push(cell + 1);
  return out;
}

function ownerOfCell(puzzle: ColorConnectPuzzle, paths: number[][], cell: number): number | null {
  for (let i = 0; i < puzzle.dots.length; i++) {
    if (puzzle.dots[i][0] === cell || puzzle.dots[i][1] === cell) return i;
  }
  for (let i = 0; i < paths.length; i++) {
    if (paths[i].includes(cell)) return i;
  }
  return null;
}

/** Reine Funktion (kein State-Zugriff) -- liefert `null` bei ungültigem/
 * folgenlosem Zug, sonst den neuen paths-Stand plus ob es ein "echter" Zug
 * war (zählt für die Züge-Anzeige; Zurückziehen zählt nicht). */
function computeExtend(
  puzzle: ColorConnectPuzzle,
  paths: number[][],
  color: number,
  cell: number,
): { paths: number[][]; isMove: boolean } | null {
  const path = paths[color];
  const last = path[path.length - 1];
  if (last === undefined || cell === last) return null;

  const existingIdx = path.indexOf(cell);
  if (existingIdx !== -1) {
    const copy = paths.slice();
    copy[color] = path.slice(0, existingIdx + 1);
    return { paths: copy, isMove: false };
  }

  if (!neighborsOf(last, puzzle.cols, puzzle.rows).includes(cell)) return null;

  const owner = ownerOfCell(puzzle, paths, cell);
  if (owner !== null && owner !== color) {
    const isForeignDot = puzzle.dots[owner][0] === cell || puzzle.dots[owner][1] === cell;
    if (isForeignDot) return null;
    const copy = paths.slice();
    copy[owner] = [];
    copy[color] = [...path, cell];
    return { paths: copy, isMove: true };
  }

  const copy = paths.slice();
  copy[color] = [...path, cell];
  return { paths: copy, isMove: true };
}

function isSolved(puzzle: ColorConnectPuzzle, paths: number[][]): boolean {
  let total = 0;
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (path.length === 0) return false;
    const [a, b] = puzzle.dots[i];
    const first = path[0];
    const last = path[path.length - 1];
    const connects = (first === a && last === b) || (first === b && last === a);
    if (!connects) return false;
    total += path.length;
  }
  return total === puzzle.cols * puzzle.rows;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function ColorConnect({
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
  difficulty?: ColorConnectDifficulty;
  challenge?: ChallengeInfo | null;
  plusActive?: boolean;
}) {
  const [puzzle, setPuzzle] = useState(() => generatePuzzle(difficulty));
  const [paths, setPaths] = useState<number[][]>(() => puzzle.dots.map(() => []));
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [solved, setSolved] = useState(false);
  const [finalResult, setFinalResult] = useState<{ points: number; seconds: number } | null>(null);
  const [newBest, setNewBest] = useState<{ points: number; seconds: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardRect, setBoardRect] = useState({ width: 0, height: 0 });

  useEffect(() => {
    logGameEventAction(slug, "started").catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setBoardRect({ width: r.width, height: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (solved) return;
    const t = setInterval(() => setElapsed((Date.now() - startTime) / 1000), 250);
    return () => clearInterval(t);
  }, [startTime, solved]);

  useEffect(() => {
    if (isSolved(puzzle, paths)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSolved(true);
      incrementTodayPlayCount();
      recordDailyCompletion();
      recordServerStreakCompletion().catch(() => null);
      logGameEventAction(slug, "completed").catch(() => null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths]);

  const totalCells = puzzle.cols * puzzle.rows;
  const extraMoves = Math.max(0, moves - totalCells);
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
    setPaths(next.dots.map(() => []));
    setActiveColor(null);
    setMoves(0);
    setStartTime(Date.now());
    setElapsed(0);
    setSolved(false);
    setFinalResult(null);
    setNewBest(null);
    logGameEventAction(slug, "started").catch(() => null);
  }, [difficulty, slug]);

  const cellFromPoint = useCallback(
    (clientX: number, clientY: number): number | null => {
      const el = boardRef.current;
      if (!el || boardRect.width === 0) return null;
      const r = el.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      if (x < 0 || y < 0 || x >= r.width || y >= r.height) return null;
      const col = Math.min(puzzle.cols - 1, Math.floor((x / r.width) * puzzle.cols));
      const row = Math.min(puzzle.rows - 1, Math.floor((y / r.height) * puzzle.rows));
      return row * puzzle.cols + col;
    },
    [boardRect, puzzle.cols, puzzle.rows],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (solved) return;
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (cell === null) return;

    // Zelle gehört schon zu einer gezeichneten Linie (an irgendeiner Stelle,
    // nicht nur an den beiden Punkten) -- dort wieder aufnehmen: Linie bis
    // zu dieser Stelle zurückschneiden, Weiterziehen hängt von da an neu an.
    // Ohne das ließ sich eine einmal begonnene Linie nur komplett neu von
    // einem der beiden Punkte aus zeichnen, nie von der Mitte aus weiter --
    // genau das fühlte sich an, als würde das Ziehen nicht mehr gehen.
    const ownerIdx = paths.findIndex((p) => p.includes(cell));
    if (ownerIdx !== -1) {
      const idx = paths[ownerIdx].indexOf(cell);
      setPaths((prev) => {
        const copy = prev.slice();
        copy[ownerIdx] = prev[ownerIdx].slice(0, idx + 1);
        return copy;
      });
      setActiveColor(ownerIdx);
      boardRef.current?.setPointerCapture?.(e.pointerId);
      return;
    }

    const colorIdx = puzzle.dots.findIndex(([a, b]) => a === cell || b === cell);
    if (colorIdx === -1) return;
    setPaths((prev) => {
      const copy = prev.slice();
      copy[colorIdx] = [cell];
      return copy;
    });
    setActiveColor(colorIdx);
    boardRef.current?.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activeColor === null || solved) return;
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (cell === null) return;
    setPaths((prev) => {
      const result = computeExtend(puzzle, prev, activeColor, cell);
      if (!result) return prev;
      if (result.isMove) setMoves((m) => m + 1);
      return result.paths;
    });
  };

  const endDrag = () => setActiveColor(null);

  const unfilledCount = totalCells - paths.reduce((sum, p) => sum + p.length, 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: `hsl(var(--${color}))` }}>
            Farbverbinden · {labelFor(difficulty)}
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

      <div
        ref={boardRef}
        className="hairline relative mx-auto w-full max-w-[480px] touch-none rounded-2xl bg-surface select-none"
        style={{ touchAction: "none", aspectRatio: `${puzzle.cols} / ${puzzle.rows}` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Rasterlinien als Hintergrund */}
        <div
          className="pointer-events-none absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${puzzle.cols}, 1fr)`,
            gridTemplateRows: `repeat(${puzzle.rows}, 1fr)`,
          }}
        >
          {Array.from({ length: puzzle.cols * puzzle.rows }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/10" />
          ))}
        </div>

        {/* Linien */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${puzzle.cols} ${puzzle.rows}`}
          preserveAspectRatio="none"
        >
          {paths.map((path, idx) => {
            if (path.length < 2) return null;
            const points = path
              .map((cell) => {
                const r = Math.floor(cell / puzzle.cols);
                const c = cell % puzzle.cols;
                return `${c + 0.5},${r + 0.5}`;
              })
              .join(" ");
            return (
              <polyline
                key={idx}
                points={points}
                fill="none"
                stroke={puzzle.colors[idx]}
                strokeWidth={0.48}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </svg>

        {/* Punkte */}
        {puzzle.dots.map(([a, b], idx) => (
          <div key={idx}>
            {[a, b].map((cell) => {
              const r = Math.floor(cell / puzzle.cols);
              const c = cell % puzzle.cols;
              return (
                <div
                  key={cell}
                  className="pointer-events-none absolute flex items-center justify-center"
                  style={{
                    width: `${100 / puzzle.cols}%`,
                    height: `${100 / puzzle.rows}%`,
                    left: `${(c / puzzle.cols) * 100}%`,
                    top: `${(r / puzzle.rows) * 100}%`,
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{ width: "62%", height: "62%", backgroundColor: puzzle.colors[idx] }}
                  />
                </div>
              );
            })}
          </div>
        ))}

        {solved && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-bg/85 px-6 text-center backdrop-blur-sm">
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
        Zieh von einem Punkt zum gleichfarbigen Punkt -- die Linien dürfen sich nicht kreuzen, und am Ende muss
        das ganze Feld bedeckt sein.
        {!solved && unfilledCount > 0 && ` Noch ${unfilledCount} freie Felder.`}
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
