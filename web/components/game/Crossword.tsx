"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, RefreshCw, CheckCircle2 } from "lucide-react";
import type { CrosswordPuzzle, CrosswordEntry } from "@/content/crossword";
import { logGameEventAction } from "@/lib/actions/analytics";
import { saveSeenQuestionsAction } from "@/lib/actions/seenQuestions";
import { submitScoreAction } from "@/lib/actions/scores";
import { incrementTodayPlayCount } from "@/lib/dailyCap";

type Dir = "across" | "down";

function cellKey(r: number, c: number) {
  return `${r},${c}`;
}

/** Für jede weiße Zelle: welche Eintrags-Nummer sie ggf. trägt und welche
 * across/down-Einträge durch sie hindurchlaufen -- einmal berechnet, dann
 * für Klicks/Navigation/Prüfen wiederverwendet. */
function buildIndex(puzzle: CrosswordPuzzle) {
  const numberAt = new Map<string, number>();
  const acrossAt = new Map<string, CrosswordEntry>();
  const downAt = new Map<string, CrosswordEntry>();
  for (const e of puzzle.entries) {
    numberAt.set(cellKey(e.row, e.col), e.number);
    for (let i = 0; i < e.answer.length; i++) {
      const r = e.dir === "across" ? e.row : e.row + i;
      const c = e.dir === "across" ? e.col + i : e.col;
      if (e.dir === "across") acrossAt.set(cellKey(r, c), e);
      else downAt.set(cellKey(r, c), e);
    }
  }
  return { numberAt, acrossAt, downAt };
}

export function Crossword({
  slug,
  title,
  puzzle,
  pendingSeenKeys,
}: {
  slug: string;
  title: string;
  puzzle: CrosswordPuzzle;
  pendingSeenKeys?: string[];
}) {
  const index = useMemo(() => buildIndex(puzzle), [puzzle]);
  const [userGrid, setUserGrid] = useState<(string | null)[][]>(() =>
    puzzle.grid.map((row) => row.map((cell) => (cell === null ? null : ""))),
  );
  const [active, setActive] = useState<{ row: number; col: number } | null>(null);
  const [activeDir, setActiveDir] = useState<Dir>("across");
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [solved, setSolved] = useState(false);

  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const startTimeRef = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    logGameEventAction(slug, "started").catch(() => null);
    if (pendingSeenKeys) saveSeenQuestionsAction(slug, pendingSeenKeys).catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle.id]);

  const activeEntry: CrosswordEntry | null = active
    ? (activeDir === "across" ? index.acrossAt.get(cellKey(active.row, active.col)) : index.downAt.get(cellKey(active.row, active.col))) ?? null
    : null;

  function focusCell(row: number, col: number) {
    const el = inputRefs.current.get(cellKey(row, col));
    el?.focus();
  }

  function selectCell(row: number, col: number) {
    if (active && active.row === row && active.col === col) {
      // Zweiter Klick auf dieselbe Zelle: Richtung wechseln, falls möglich.
      const other: Dir = activeDir === "across" ? "down" : "across";
      const hasOther = other === "across" ? index.acrossAt.has(cellKey(row, col)) : index.downAt.has(cellKey(row, col));
      if (hasOther) setActiveDir(other);
      return;
    }
    setActive({ row, col });
    const hasAcross = index.acrossAt.has(cellKey(row, col));
    const hasDown = index.downAt.has(cellKey(row, col));
    setActiveDir((prev) => (prev === "across" && hasAcross ? "across" : prev === "down" && hasDown ? "down" : hasAcross ? "across" : "down"));
    focusCell(row, col);
  }

  function selectEntry(entry: CrosswordEntry) {
    setActive({ row: entry.row, col: entry.col });
    setActiveDir(entry.dir);
    focusCell(entry.row, entry.col);
  }

  function nextCell(row: number, col: number, dir: Dir, delta: number): { row: number; col: number } | null {
    const r = dir === "across" ? row : row + delta;
    const c = dir === "across" ? col + delta : col;
    if (r < 0 || r >= puzzle.rows || c < 0 || c >= puzzle.cols) return null;
    if (puzzle.grid[r][c] === null) return null;
    return { row: r, col: c };
  }

  /** Nur die reine Vollständigkeitsprüfung -- keine Seiteneffekte/Zeitmessung
   * hier drin, damit diese Funktion für den Compiler eindeutig "pure" bleibt
   * (siehe handleInput, wo die eigentliche Zeitmessung/Punktevergabe passiert). */
  function isComplete(grid: (string | null)[][]): boolean {
    for (let r = 0; r < puzzle.rows; r++) {
      for (let c = 0; c < puzzle.cols; c++) {
        const solution = puzzle.grid[r][c];
        if (solution === null) continue;
        if ((grid[r][c] ?? "") !== solution) return false;
      }
    }
    return true;
  }

  function handleCompletion() {
    completedRef.current = true;
    setSolved(true);
    incrementTodayPlayCount();
    logGameEventAction(slug, "completed").catch(() => null);
    if (revealed) return;
    // Nur aus handleInput() erreichbar, also nie während des Renderns --
    // der Linter kann das bei einem inline in derselben Komponente
    // definierten Event-Handler offenbar nicht auflösen (anders als bei
    // einem an eine Kind-Komponente durchgereichten Handler, siehe
    // QuizPlayer.tsx mit identischem Date.now()-Muster ohne Warnung).
    // eslint-disable-next-line react-hooks/purity
    const elapsedSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    const points = Math.max(100, 1000 - elapsedSeconds * 2);
    submitScoreAction("puzzle", slug, points, elapsedSeconds, null).catch(() => null);
  }

  function handleInput(row: number, col: number, raw: string) {
    const letter = raw.toUpperCase().replace(/[^A-ZÄÖÜ]/g, "").slice(-1);
    const next = userGrid.map((r) => r.slice());
    next[row][col] = letter || "";
    setUserGrid(next);

    if (!completedRef.current && isComplete(next)) handleCompletion();

    if (letter) {
      const dest = nextCell(row, col, activeDir, 1);
      if (dest) focusCell(dest.row, dest.col);
    }
  }

  function handleKeyDown(row: number, col: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !userGrid[row][col]) {
      const dest = nextCell(row, col, activeDir, -1);
      if (dest) {
        // Ohne preventDefault greift die native Backspace-Löschung nach dem
        // synchronen Fokus-Wechsel auf die NEU fokussierte (vorherige) Zelle
        // durch und löscht dort versehentlich den schon getippten Buchstaben
        // -- das war der Bug, der mehrfaches Hin-und-Her-Klicken nötig machte.
        e.preventDefault();
        focusCell(dest.row, dest.col);
      }
      return;
    }
    if (e.key === "ArrowRight") {
      const dest = nextCell(row, col, "across", 1);
      if (dest) {
        setActive(dest);
        setActiveDir("across");
        focusCell(dest.row, dest.col);
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      const dest = nextCell(row, col, "across", -1);
      if (dest) {
        setActive(dest);
        setActiveDir("across");
        focusCell(dest.row, dest.col);
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      const dest = nextCell(row, col, "down", 1);
      if (dest) {
        setActive(dest);
        setActiveDir("down");
        focusCell(dest.row, dest.col);
      }
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const dest = nextCell(row, col, "down", -1);
      if (dest) {
        setActive(dest);
        setActiveDir("down");
        focusCell(dest.row, dest.col);
      }
      e.preventDefault();
    }
  }

  function reveal() {
    setUserGrid(puzzle.grid.map((row) => row.slice()));
    setRevealed(true);
    setChecked(false);
    completedRef.current = true; // keine Punktevergabe nach Aufdecken
    setSolved(true);
    logGameEventAction(slug, "completed").catch(() => null);
  }

  function restart() {
    completedRef.current = false;
    setUserGrid(puzzle.grid.map((row) => row.map((cell) => (cell === null ? null : ""))));
    setActive(null);
    setChecked(false);
    setRevealed(false);
    setSolved(false);
    startTimeRef.current = Date.now();
    logGameEventAction(slug, "started").catch(() => null);
  }

  const totalCells = puzzle.grid.flat().filter((c) => c !== null).length;
  const filledCells = userGrid.flat().filter((c) => c).length;

  const acrossEntries = puzzle.entries.filter((e) => e.dir === "across").sort((a, b) => a.number - b.number);
  const downEntries = puzzle.entries.filter((e) => e.dir === "down").sort((a, b) => a.number - b.number);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
        <div className="flex items-center justify-between text-xs font-semibold text-muted">
          <span>{filledCells}/{totalCells} Felder ausgefüllt</span>
          {activeEntry && (
            <span className="max-w-[65%] truncate text-right text-ink-soft">
              {activeEntry.number}. {activeDir === "across" ? "waagerecht" : "senkrecht"}: {activeEntry.clue}
            </span>
          )}
        </div>
      </div>

      {solved && (
        <div
          className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${
            revealed ? "bg-gold-soft text-gold-dark" : "bg-green-soft text-green-dark"
          }`}
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {revealed ? "Lösung aufgedeckt." : "Gelöst! Stark gemacht."}
        </div>
      )}

      <div className="overflow-x-auto pb-1">
        <div
          className="mx-auto grid w-fit gap-[2px] rounded-lg bg-line p-[2px]"
          style={{ gridTemplateColumns: `repeat(${puzzle.cols}, 22px)` }}
        >
          {puzzle.grid.map((row, r) =>
            row.map((cell, c) => {
              if (cell === null) return <div key={cellKey(r, c)} className="h-[22px] w-[22px] bg-line" />;
              const isActive = active?.row === r && active?.col === c;
              const inActiveEntry =
                activeEntry &&
                ((activeEntry.dir === "across" &&
                  activeEntry.row === r &&
                  c >= activeEntry.col &&
                  c < activeEntry.col + activeEntry.answer.length) ||
                  (activeEntry.dir === "down" &&
                    activeEntry.col === c &&
                    r >= activeEntry.row &&
                    r < activeEntry.row + activeEntry.answer.length));
              const number = index.numberAt.get(cellKey(r, c));
              const value = userGrid[r][c] ?? "";
              const isCorrect = checked && value && value === cell;
              const isWrong = checked && value && value !== cell;
              return (
                <div key={cellKey(r, c)} className="relative h-[22px] w-[22px]">
                  {number !== undefined && (
                    <span className="pointer-events-none absolute top-[1px] left-[2px] z-10 text-[7px] font-bold text-muted">
                      {number}
                    </span>
                  )}
                  <input
                    ref={(el) => {
                      if (el) inputRefs.current.set(cellKey(r, c), el);
                      else inputRefs.current.delete(cellKey(r, c));
                    }}
                    value={value}
                    maxLength={1}
                    disabled={revealed}
                    onFocus={(e) => {
                      selectCell(r, c);
                      // Bestehenden Buchstaben markieren, damit ein neuer
                      // Tastendruck ihn direkt ersetzt -- ohne das blockiert
                      // maxLength=1 jede weitere Eingabe in eine schon
                      // gefüllte Zelle (nichts zum Ersetzen markiert), man
                      // müsste erst per Backspace/Pfeiltasten manuell leeren.
                      e.target.select();
                    }}
                    onClick={(e) => {
                      selectCell(r, c);
                      e.currentTarget.select();
                    }}
                    onChange={(e) => handleInput(r, c, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(r, c, e)}
                    className={`h-[22px] w-[22px] bg-surface text-center text-[13px] font-bold text-ink uppercase outline-none ${
                      isActive
                        ? "bg-primary-soft ring-2 ring-primary"
                        : inActiveEntry
                          ? "bg-primary-soft/40"
                          : ""
                    } ${isCorrect ? "text-green-dark" : ""} ${isWrong ? "text-red" : ""}`}
                  />
                </div>
              );
            }),
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {!solved && (
          <button
            onClick={() => setChecked(true)}
            className="hairline rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-bg"
          >
            Prüfen
          </button>
        )}
        {!solved && (
          <button
            onClick={reveal}
            className="hairline flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition hover:bg-bg"
          >
            <Eye className="h-3.5 w-3.5" /> Lösung anzeigen
          </button>
        )}
        {solved && (
          <button onClick={restart} className="btn-3d btn-3d-primary flex items-center gap-1.5 px-5 py-2.5 text-sm">
            <RefreshCw className="h-4 w-4" /> Neues Rätsel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ClueList title="Waagerecht" entries={acrossEntries} activeEntry={activeEntry} onSelect={selectEntry} />
        <ClueList title="Senkrecht" entries={downEntries} activeEntry={activeEntry} onSelect={selectEntry} />
      </div>
    </div>
  );
}

function ClueList({
  title,
  entries,
  activeEntry,
  onSelect,
}: {
  title: string;
  entries: CrosswordEntry[];
  activeEntry: CrosswordEntry | null;
  onSelect: (entry: CrosswordEntry) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold tracking-wide text-muted uppercase">{title}</p>
      <ul className="flex flex-col gap-1.5">
        {entries.map((e) => {
          const isActive = activeEntry?.number === e.number && activeEntry?.dir === e.dir;
          return (
            <li key={`${e.dir}-${e.number}`}>
              <button
                onClick={() => onSelect(e)}
                className={`w-full rounded-lg px-2 py-1 text-left text-[13px] leading-snug transition ${
                  isActive ? "bg-primary-soft font-semibold text-primary-dark" : "text-ink-soft hover:bg-bg"
                }`}
              >
                <span className="font-bold">{e.number}.</span> {e.clue}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
