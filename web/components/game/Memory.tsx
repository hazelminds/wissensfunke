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
import { generateMemoryBoard, GRID_COLS, MEMORY_THEMES, type MemoryCard, type MemoryDifficulty } from "@/content/memory";

export interface ChallengeInfo {
  name: string;
  points: number;
  seconds: number;
}

const labelFor = (difficulty: MemoryDifficulty) =>
  difficulty === "medium" ? "Mittel" : difficulty === "hard" ? "Schwer" : "Leicht";

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/** Wie lange ein nicht passendes Paar aufgedeckt bleibt, bevor es sich
 * zurückdreht -- lang genug zum Merken, kurz genug, um nicht zu nerven. */
const MISMATCH_DELAY_MS = 800;

export function Memory({
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
  difficulty?: MemoryDifficulty;
  challenge?: ChallengeInfo | null;
  plusActive?: boolean;
}) {
  // Leer starten statt mit generateMemoryBoard() zu initialisieren: die Mischung
  // ist zufällig, würde also bei SSR und Hydration je einmal unterschiedlich
  // laufen und einen Hydration-Mismatch erzeugen (Server- und Client-Karten
  // würden auseinanderlaufen). Board wird stattdessen im Effekt unten -- rein
  // clientseitig, nach dem Mount -- einmalig erzeugt.
  const [cards, setCards] = useState<MemoryCard[]>([]);
  // Nur für die mittlere Stufe relevant (dort gibt's Foto-Themen) -- Default
  // ist das erste Thema in MEMORY_THEMES.
  const [themeId, setThemeId] = useState(MEMORY_THEMES[0].id);
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set());
  const [activeFlips, setActiveFlips] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [solved, setSolved] = useState(false);
  const [finalResult, setFinalResult] = useState<{ points: number; seconds: number } | null>(null);
  const [newBest, setNewBest] = useState<{ points: number; seconds: number } | null>(null);
  const [locked, setLocked] = useState(false);

  const cols = GRID_COLS[difficulty];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCards(generateMemoryBoard(difficulty, themeId));
    logGameEventAction(slug, "started").catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (solved) return;
    const t = setInterval(() => setElapsed((Date.now() - startTime) / 1000), 250);
    return () => clearInterval(t);
  }, [startTime, solved]);

  const solveScore = Math.max(80, 2500 - moves * 40 - Math.round(elapsed) * 3);

  // Wie bei SlidingPuzzle: einmal pro gelöster Runde, mit den zu diesem
  // Zeitpunkt schon finalen moves/elapsed.
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

  const reset = useCallback(
    (nextThemeId: string = themeId) => {
      setCards(generateMemoryBoard(difficulty, nextThemeId));
      setThemeId(nextThemeId);
      setMatchedIds(new Set());
      setActiveFlips([]);
      setMoves(0);
      setStartTime(Date.now());
      setElapsed(0);
      setSolved(false);
      setFinalResult(null);
      setNewBest(null);
      setLocked(false);
      logGameEventAction(slug, "started").catch(() => null);
    },
    [difficulty, slug, themeId],
  );

  const flipCard = useCallback(
    (id: number) => {
      if (locked || solved) return;
      if (matchedIds.has(id) || activeFlips.includes(id)) return;

      const nextFlips = [...activeFlips, id];
      setActiveFlips(nextFlips);

      if (nextFlips.length < 2) return;

      setLocked(true);
      setMoves((m) => m + 1);
      const [firstId, secondId] = nextFlips;
      const first = cards.find((c) => c.id === firstId);
      const second = cards.find((c) => c.id === secondId);

      if (first && second && first.value === second.value) {
        // Größe VOR dem setState berechnen (aus dem geschlossenen matchedIds,
        // aktuell dank useCallback-Dependency) statt in der setMatchedIds-
        // Updater-Funktion -- die muss rein bleiben, sonst löst der
        // Seiteneffekt (setSolved & Co.) hier drin genau die React-Warnung
        // "Cannot update a component while rendering a different component" aus.
        const nextMatchedSize = matchedIds.size + 2;
        setTimeout(() => {
          setMatchedIds((prev) => {
            const next = new Set(prev);
            next.add(firstId);
            next.add(secondId);
            return next;
          });
          setActiveFlips([]);
          setLocked(false);
          if (nextMatchedSize === cards.length) {
            setSolved(true);
            incrementTodayPlayCount();
            recordDailyCompletion();
            recordServerStreakCompletion().catch(() => null);
            logGameEventAction(slug, "completed").catch(() => null);
          }
        }, 200);
      } else {
        setTimeout(() => {
          setActiveFlips([]);
          setLocked(false);
        }, MISMATCH_DELAY_MS);
      }
    },
    [activeFlips, cards, locked, matchedIds, slug, solved],
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: `hsl(var(--${color}))` }}>
            Memory · {labelFor(difficulty)}
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{fmtTime(elapsed)}</span>
          <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{moves} Züge</span>
        </div>
      </div>

      {difficulty === "medium" && (
        <div className="relative mb-4">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pr-8">
            <span className="shrink-0 text-xs font-bold tracking-wide text-muted uppercase">Thema</span>
            {MEMORY_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => theme.id !== themeId && reset(theme.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition ${
                  theme.id === themeId ? "bg-primary text-white" : "hairline text-ink hover:bg-bg"
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
          {/* Ausblenden am rechten Rand -- Hinweis, dass sich die Themenreihe
           * weiter nach rechts scrollen lässt, statt einfach abgeschnitten zu wirken. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-bg to-transparent" />
        </div>
      )}

      {challenge && !solved && (
        <div className="mb-4">
          <ChallengeBanner name={challenge.name} points={challenge.points} seconds={challenge.seconds} />
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => reset()}
          className="hairline inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface"
        >
          <RefreshCw className="h-4 w-4" /> Neu mischen
        </button>
      </div>

      <div
        className="mx-auto grid w-full max-w-[480px] gap-2.5"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => {
          const isMatched = matchedIds.has(card.id);
          const isFaceUp = isMatched || activeFlips.includes(card.id);
          return (
            <button
              key={card.id}
              onClick={() => flipCard(card.id)}
              disabled={isMatched}
              className="aspect-square [perspective:800px]"
            >
              <div
                className={`relative h-full w-full transition-transform duration-300 [transform-style:preserve-3d] ${
                  isFaceUp ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                <div className="hairline absolute inset-0 flex items-center justify-center rounded-xl bg-surface text-lg font-bold text-muted [backface-visibility:hidden]">
                  ?
                </div>
                {card.kind === "image" ? (
                  <div
                    className={`absolute inset-0 rounded-xl bg-cover bg-center [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                      isMatched ? "ring-2 ring-green" : ""
                    }`}
                    style={{ backgroundImage: `url(${card.value})` }}
                  />
                ) : (
                  <div
                    className={`absolute inset-0 flex items-center justify-center rounded-xl text-3xl [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                      isMatched ? "bg-green-soft" : "bg-primary-soft"
                    }`}
                  >
                    {card.value}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {solved && (
        <div className="hairline mt-5 flex flex-col items-center gap-1 rounded-2xl bg-green-soft p-5 text-center">
          <Trophy className="mb-1 h-6 w-6 text-green" />
          <p className="font-display text-xl font-extrabold text-ink">Alle Paare gefunden!</p>
          <p className="text-sm text-muted">
            {moves} Züge · {fmtTime(elapsed)} · {solveScore} Punkte
          </p>
        </div>
      )}

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

      {newBest && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <Confetti />
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
