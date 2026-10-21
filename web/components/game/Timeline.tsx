"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw, Trophy, X } from "lucide-react";
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
import { generateRound, type TimelineDifficulty, type TimelineEvent } from "@/content/timeline";

export interface ChallengeInfo {
  name: string;
  points: number;
  seconds: number;
}

const labelFor = (d: TimelineDifficulty) => (d === "medium" ? "Mittel" : d === "hard" ? "Schwer" : "Leicht");

/** Reine Funktion: wie viele der bereits platzierten Jahre liegen VOR `year`
 * -- das ist genau der Index, an dem `year` in die (aufsteigend sortierte)
 * Kette eingefügt werden muss. Alle Jahre im Pool sind eindeutig (siehe
 * content/timeline.ts), daher nie ein Unentschieden. */
function correctInsertIndex(placedYears: number[], year: number): number {
  let count = 0;
  for (const y of placedYears) if (y < year) count++;
  return count;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function Timeline({
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
  difficulty?: TimelineDifficulty;
  challenge?: ChallengeInfo | null;
  plusActive?: boolean;
}) {
  const [round, setRound] = useState(() => generateRound(difficulty));
  // Aufsteigend sortiert (ältestes zuerst) -- Darstellung dreht das für die
  // Anzeige (neuestes oben), siehe `displayed` unten.
  const [placed, setPlaced] = useState<TimelineEvent[]>(() => round.placed);
  const [deck, setDeck] = useState<TimelineEvent[]>(() => round.deck);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [wrongYear, setWrongYear] = useState<number | null>(null);
  const [lastCorrectYear, setLastCorrectYear] = useState<number | null>(null);
  const [finalResult, setFinalResult] = useState<{ points: number; seconds: number } | null>(null);
  const [newBest, setNewBest] = useState<{ points: number; seconds: number } | null>(null);

  const [dragging, setDragging] = useState(false);
  const [targetGap, setTargetGap] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{ thresholds: number[] } | null>(null);
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    logGameEventAction(slug, "started").catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (roundOver) return;
    const t = setInterval(() => setElapsed((Date.now() - startTime) / 1000), 250);
    return () => clearInterval(t);
  }, [startTime, roundOver]);

  const candidate = roundOver ? null : (deck[0] ?? null);

  const roundScore =
    Math.max(0, correctCount * 120 - Math.round(elapsed)) + (cleared ? 400 : 0);

  useEffect(() => {
    if (!roundOver) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFinalResult({ points: roundScore, seconds: Math.round(elapsed) });
    incrementTodayPlayCount();
    recordDailyCompletion();
    recordServerStreakCompletion().catch(() => null);
    logGameEventAction(slug, "completed").catch(() => null);
    submitScoreAction("puzzle", slug, roundScore, Math.round(elapsed), correctCount)
      .then((res) => {
        if (res.isNewBest) setNewBest({ points: roundScore, seconds: Math.round(elapsed) });
      })
      .catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundOver]);

  const reset = useCallback(() => {
    const next = generateRound(difficulty);
    setRound(next);
    setPlaced(next.placed);
    setDeck(next.deck);
    setCorrectCount(0);
    setStartTime(Date.now());
    setElapsed(0);
    setRoundOver(false);
    setCleared(false);
    setWrongYear(null);
    setLastCorrectYear(null);
    setFinalResult(null);
    setNewBest(null);
    setDragging(false);
    setTargetGap(null);
    logGameEventAction(slug, "started").catch(() => null);
  }, [difficulty, slug]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (roundOver || !candidate || !listRef.current) return;
    const cards = Array.from(listRef.current.querySelectorAll<HTMLElement>("[data-placed-card]"));
    // Eine Schwelle pro Karte (ihre vertikale Mitte) -- ergibt für n Karten
    // n+1 mögliche Lücken (vor allen, zwischen je zweien, nach allen):
    // Pointer oberhalb der Mitte von Karte i landet in Lücke i, sonst weiter
    // unten in einer spätere Lücke.
    const thresholds = cards.map((el) => {
      const r = el.getBoundingClientRect();
      return (r.top + r.bottom) / 2;
    });
    dragStateRef.current = { thresholds };
    pointerIdRef.current = e.pointerId;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    updateTargetGap(e.clientY, thresholds);
  };

  const updateTargetGap = (y: number, thresholds: number[]) => {
    let gap = thresholds.length;
    for (let i = 0; i < thresholds.length; i++) {
      if (y < thresholds[i]) {
        gap = i;
        break;
      }
    }
    setTargetGap(gap);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !dragStateRef.current) return;
    updateTargetGap(e.clientY, dragStateRef.current.thresholds);
  };

  const onPointerCancel = () => {
    setDragging(false);
    setTargetGap(null);
    dragStateRef.current = null;
  };

  const onPointerUp = () => {
    if (!dragging || targetGap === null || !candidate) {
      setDragging(false);
      return;
    }
    // Anzeige ist neuestes-zuerst (oben), die interne Kette aber aufsteigend
    // sortiert (ältestes zuerst) -- Lücke 0 oben entspricht also dem ENDE der
    // aufsteigenden Kette (jünger als alles), Lücke n unten dem ANFANG.
    const ascIndex = placed.length - targetGap;
    const correctIdx = correctInsertIndex(
      placed.map((p) => p.year),
      candidate.year,
    );
    setDragging(false);
    setTargetGap(null);

    if (ascIndex === correctIdx) {
      const nextPlaced = placed.slice();
      nextPlaced.splice(correctIdx, 0, candidate);
      const nextDeck = deck.slice(1);
      setPlaced(nextPlaced);
      setDeck(nextDeck);
      setCorrectCount((c) => c + 1);
      setLastCorrectYear(candidate.year);
      if (nextDeck.length === 0) {
        setCleared(true);
        setRoundOver(true);
      }
    } else {
      const nextPlaced = placed.slice();
      nextPlaced.splice(correctIdx, 0, candidate);
      setPlaced(nextPlaced);
      setDeck(deck.slice(1));
      setWrongYear(candidate.year);
      setLastCorrectYear(null);
      setRoundOver(true);
    }
  };

  const displayed = placed.slice().reverse();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: `hsl(var(--${color}))` }}>
            Zeitstrahl · {labelFor(difficulty)}
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{fmtTime(elapsed)}</span>
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{correctCount} richtig</span>
        </div>
      </div>

      {challenge && !roundOver && (
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
        className="mx-auto w-full max-w-[480px] select-none"
        style={{ touchAction: "none" }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <p className="mb-1 text-center text-xs font-semibold tracking-wide text-muted uppercase">↑ Nachher</p>

        <div ref={listRef} className="flex flex-col">
          <GapSlot active={dragging && targetGap === 0} />
          {displayed.map((ev, i) => {
            const isWrong = wrongYear !== null && ev.year === wrongYear;
            const isJustCorrect = lastCorrectYear !== null && ev.year === lastCorrectYear;
            return (
              <div key={ev.year}>
                <div
                  data-placed-card
                  className={`hairline rounded-xl px-4 py-3 ${
                    isWrong
                      ? "border-2 border-red-500 bg-red-500/10"
                      : isJustCorrect
                        ? "border-2 border-green bg-green-soft"
                        : "bg-surface"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-extrabold text-ink">
                        {ev.year} {isWrong && <X className="inline h-4 w-4 text-red-500" />}
                      </p>
                      <p className="text-sm font-medium text-ink">{ev.title}</p>
                    </div>
                  </div>
                  {isWrong && (
                    <p className="mt-1.5 text-xs text-red-500">
                      Hier gehört es eigentlich hin -- nicht, wo du es abgelegt hast.
                    </p>
                  )}
                </div>
                {i < displayed.length - 1 && <GapSlot active={dragging && targetGap === i + 1} />}
              </div>
            );
          })}
          <GapSlot active={dragging && targetGap === displayed.length} />
        </div>

        <p className="mt-1 text-center text-xs font-semibold tracking-wide text-muted uppercase">↓ Vorher</p>

        {candidate && !roundOver && (
          <div
            onPointerDown={onPointerDown}
            className="glow-primary mt-5 cursor-grab touch-none rounded-xl border-2 border-primary bg-primary-soft px-4 py-3.5 active:cursor-grabbing"
            style={{ touchAction: "none" }}
          >
            <p className="text-sm font-bold text-primary-dark">{candidate.title}</p>
            <p className="mt-0.5 text-[13px] text-primary-dark/80">{candidate.description}</p>
          </div>
        )}

        {roundOver && (
          <div className="mt-5 rounded-2xl border-2 border-line bg-surface p-5 text-center">
            {cleared ? (
              <>
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-soft">
                  <Trophy className="h-7 w-7 text-green" />
                </div>
                <p className="font-display text-2xl font-extrabold text-ink">Alle eingeordnet!</p>
              </>
            ) : (
              <p className="font-display text-2xl font-extrabold text-ink">Runde beendet</p>
            )}
            <p className="mt-1 text-sm text-muted">
              {correctCount} richtig · {fmtTime(elapsed)} · {roundScore} Punkte
            </p>
            <button
              onClick={reset}
              className="glow-primary mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" /> Nochmal spielen
            </button>
          </div>
        )}
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        Zieh die Karte an die richtige Stelle in der Zeitkette -- ein Fehler beendet die Runde.
      </p>

      {roundOver && finalResult && challenge && (
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

      {roundOver && finalResult && (
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
                ? `${name} hat bei "${title}" ${finalResult.points} Punkte erreicht -- schlägst du das?`
                : `Ich hab bei "${title}" ${finalResult.points} Punkte erreicht -- schlägst du das?`
            }
          />
        </div>
      )}

      {cleared && <Confetti />}

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

      {roundOver && <LeaderboardTeaser board="puzzle" plusActive={plusActive} />}
    </div>
  );
}

// Feste Höhe, nur die Füllung ändert sich (Farbe/Deckkraft) -- sonst würde
// eine wachsende Lücke während des Ziehens die Karten darunter verschieben
// und die am Dragstart einmal gemessenen Schwellenwerte liefen aus dem Ruder.
function GapSlot({ active }: { active: boolean }) {
  return (
    <div className="flex h-3 items-center justify-center">
      <div className={`h-1 w-full rounded-full transition-colors ${active ? "bg-primary" : "bg-transparent"}`} />
    </div>
  );
}
