"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw, Eye, Trophy } from "lucide-react";
import { recordDailyCompletion } from "@/lib/streak";
import { recordServerStreakCompletion } from "@/lib/actions/streak";
import { incrementTodayPlayCount } from "@/lib/dailyCap";
import { LeaderboardTeaser } from "@/components/LeaderboardTeaser";

const IMAGE_URL = "/puzzle-noggl.svg";

type Difficulty = "easy" | "medium" | "hard";

const gridFor = (difficulty: Difficulty) => (difficulty === "medium" ? 4 : difficulty === "hard" ? 5 : 3);
const labelFor = (difficulty: Difficulty) =>
  difficulty === "medium" ? "Mittel" : difficulty === "hard" ? "Schwer" : "Leicht";

function adjacentCells(pos: number, n: number): number[] {
  const row = Math.floor(pos / n);
  const col = pos % n;
  const out: number[] = [];
  if (row > 0) out.push(pos - n);
  if (row < n - 1) out.push(pos + n);
  if (col > 0) out.push(pos - 1);
  if (col < n - 1) out.push(pos + 1);
  return out;
}

function isSolved(board: (number | null)[], n: number): boolean {
  const total = n * n;
  for (let i = 0; i < total - 1; i++) if (board[i] !== i) return false;
  return board[total - 1] === null;
}

function initBoard(n: number): { board: (number | null)[]; empty: number } {
  const total = n * n;
  const board: (number | null)[] = Array.from({ length: total }, (_, i) => (i < total - 1 ? i : null));
  let empty = total - 1;
  let prev = -1;
  const steps = n * n * 10;
  for (let k = 0; k < steps; k++) {
    const opts = adjacentCells(empty, n).filter((x) => x !== prev);
    const pick = opts[Math.floor(Math.random() * opts.length)];
    board[empty] = board[pick];
    board[pick] = null;
    prev = empty;
    empty = pick;
  }
  if (isSolved(board, n)) {
    const opts = adjacentCells(empty, n);
    const pick = opts[0];
    board[empty] = board[pick];
    board[pick] = null;
    empty = pick;
  }
  return { board, empty };
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface DragState {
  pos: number;
  axis: "x" | "y";
  dir: number;
  start: { x: number; y: number };
  offset: number;
}

export function SlidingPuzzle({
  title,
  color,
  difficulty = "easy",
}: {
  title: string;
  color: string;
  difficulty?: Difficulty;
}) {
  const n = gridFor(difficulty);

  const [{ board, empty }, setState] = useState(() => initBoard(n));
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [drag, setDrag] = useState<DragState | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState(0);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const update = () => setBoardSize(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tileSize = boardSize / n || 0;

  useEffect(() => {
    if (solved) return;
    const t = setInterval(() => setElapsed((Date.now() - startTime) / 1000), 250);
    return () => clearInterval(t);
  }, [startTime, solved]);

  const reset = useCallback(() => {
    setState(initBoard(n));
    setMoves(0);
    setStartTime(Date.now());
    setElapsed(0);
    setSolved(false);
    setDrag(null);
  }, [n]);

  const tryMove = useCallback(
    (pos: number) => {
      if (solved) return;
      if (!adjacentCells(empty, n).includes(pos)) return;
      const nextBoard = board.slice();
      nextBoard[empty] = nextBoard[pos];
      nextBoard[pos] = null;
      const newEmpty = pos;
      setState({ board: nextBoard, empty: newEmpty });
      setMoves((m) => m + 1);
      if (isSolved(nextBoard, n)) {
        setSolved(true);
        incrementTodayPlayCount();
        recordDailyCompletion();
        recordServerStreakCompletion().catch(() => null);
      }
    },
    [board, empty, n, solved],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>, pos: number) => {
    if (solved) return;
    if (!adjacentCells(empty, n).includes(pos)) return;
    const row = Math.floor(empty / n);
    const col = empty % n;
    const prow = Math.floor(pos / n);
    const pcol = pos % n;
    let axis: "x" | "y";
    let dir: number;
    if (prow === row) {
      axis = "x";
      dir = col - pcol;
    } else {
      axis = "y";
      dir = row - prow;
    }
    setDrag({ pos, axis, dir, start: { x: e.clientX, y: e.clientY }, offset: 0 });
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    const delta = drag.axis === "x" ? e.clientX - drag.start.x : e.clientY - drag.start.y;
    const clamped =
      drag.dir > 0 ? Math.max(0, Math.min(tileSize, delta)) : Math.min(0, Math.max(-tileSize, delta));
    setDrag((d) => (d ? { ...d, offset: clamped } : d));
  };

  const finishDrag = () => {
    if (!drag) return;
    const threshold = tileSize * 0.3;
    if (Math.abs(drag.offset) > threshold) tryMove(drag.pos);
    setDrag(null);
  };

  const solveScore = Math.max(80, 2500 - moves * 6 - Math.round(elapsed) * 3);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: `hsl(var(--${color}))` }}
          >
            Schiebepuzzle · {labelFor(difficulty)}
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
            {title}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{fmtTime(elapsed)}</span>
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{moves} Züge</span>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={reset}
          className="hairline inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface"
        >
          <RefreshCw className="h-4 w-4" /> Neu mischen
        </button>
        <button
          onClick={() => setShowPreview((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
            showPreview ? "bg-primary text-white" : "hairline text-ink hover:bg-surface"
          }`}
        >
          <Eye className="h-4 w-4" /> {showPreview ? "Vorschau aus" : "Vorschau"}
        </button>
      </div>

      <div
        ref={boardRef}
        className="hairline relative mx-auto aspect-square w-full max-w-[480px] touch-none rounded-2xl bg-surface select-none"
        style={{ touchAction: "none" }}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerLeave={finishDrag}
        onPointerCancel={finishDrag}
      >
        {showPreview && (
          <div
            className="absolute inset-0 z-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMAGE_URL})` }}
          />
        )}

        {board.map((tile, pos) => {
          if (tile === null) return null;
          const row = Math.floor(pos / n);
          const col = pos % n;
          const homeRow = Math.floor(tile / n);
          const homeCol = tile % n;
          const cellPct = 100 / n;
          const isDragging = drag?.pos === pos;
          const tx = isDragging && drag.axis === "x" ? drag.offset : 0;
          const ty = isDragging && drag.axis === "y" ? drag.offset : 0;
          const movable = !solved && adjacentCells(empty, n).includes(pos);
          return (
            <div
              key={tile}
              onPointerDown={(e) => onPointerDown(e, pos)}
              onClick={() => !drag && tryMove(pos)}
              className={`absolute rounded-[6px] bg-cover bg-no-repeat ${isDragging ? "z-10 shadow-2xl" : "z-0"} ${
                movable ? "cursor-grab active:cursor-grabbing" : "cursor-default"
              }`}
              style={{
                width: `${cellPct}%`,
                height: `${cellPct}%`,
                left: `${col * cellPct}%`,
                top: `${row * cellPct}%`,
                transform: `translate(${tx}px, ${ty}px)`,
                transition: isDragging ? "none" : "transform 180ms ease, left 180ms ease, top 180ms ease",
                backgroundImage: `url(${IMAGE_URL})`,
                backgroundSize: `${n * 100}% ${n * 100}%`,
                backgroundPosition: `${(homeCol / (n - 1)) * 100}% ${(homeRow / (n - 1)) * 100}%`,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              {n <= 4 && (
                <span className="absolute right-1 bottom-1 text-[10px] font-bold text-white/70 tabular-nums">
                  {tile + 1}
                </span>
              )}
            </div>
          );
        })}

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
        Ziehe eine Kachel neben der Lücke in die freie Stelle — oder tippe sie an. {n}×{n} Felder.
      </p>

      {solved && <LeaderboardTeaser board="puzzle" />}
    </div>
  );
}
