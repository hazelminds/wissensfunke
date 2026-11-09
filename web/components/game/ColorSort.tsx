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

// Kleine Farb-Helfer fürs Glas-Leuchten -- jede Flüssigkeits-Schicht kriegt
// einen Verlauf von hell (oben, wie ein Lichtreflex) zu dunkel (unten),
// plus ein Umgebungsleuchten in der jeweils obersten Farbe der Flasche.
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function mix(hex: string, target: [number, number, number], amt: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [tr, tg, tb] = target;
  const nr = Math.round(r + (tr - r) * amt);
  const ng = Math.round(g + (tg - g) * amt);
  const nb = Math.round(b + (tb - b) * amt);
  return `rgb(${nr}, ${ng}, ${nb})`;
}
const lighten = (hex: string, amt: number) => mix(hex, [255, 255, 255], amt);
const darken = (hex: string, amt: number) => mix(hex, [0, 0, 0], amt);
function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const METAL_GRADIENT = "linear-gradient(135deg,#8a8f98,#e8ecf1 30%,#5c6270 55%,#d7dbe2 75%,#6b707c)";
const METAL_CAP_GRADIENT = "linear-gradient(135deg,#9aa1ad,#f1f4f8 35%,#5b616d 55%,#e3e7ec 75%,#7a818d)";

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
        <div className="hairline mx-auto flex max-w-[560px] flex-wrap items-end justify-center gap-3.5 rounded-2xl bg-surface p-6">
          {tubes.map((tube, i) => {
            const isSelected = selected === i;
            const emptySlots = capacity - tube.length;
            const topHex = tube.length ? puzzle.colors[tube[tube.length - 1]] : null;
            const frameGlow = isSelected
              ? "0 10px 22px -6px hsl(var(--primary) / 0.55), 0 0 0 2px hsl(var(--primary) / 0.9)"
              : topHex
                ? `0 6px 14px -6px rgba(0,0,0,.55), 0 0 16px -5px ${rgba(topHex, 0.45)}`
                : "0 6px 14px -6px rgba(0,0,0,.4)";
            return (
              <button
                key={i}
                onClick={() => onTubeClick(i)}
                className="flex flex-col items-center bg-transparent transition-transform"
                style={{ transform: isSelected ? "translateY(-10px)" : "none" }}
              >
                {/* Metallischer Verschluss */}
                <div
                  className="relative z-10 -mb-px"
                  style={{
                    width: size.width * 0.52,
                    height: 9,
                    borderRadius: "4px 4px 1px 1px",
                    background: METAL_CAP_GRADIENT,
                    boxShadow: "0 1px 2px rgba(0,0,0,.4)",
                  }}
                />
                {/* Metallrahmen */}
                <div
                  style={{
                    width: size.width,
                    padding: 3,
                    borderRadius: "11px 11px 26px 26px",
                    background: METAL_GRADIENT,
                    boxShadow: frameGlow,
                  }}
                >
                  {/* Glas-Innenraum mit glänzend verlaufender Füllung */}
                  <div
                    className="relative flex flex-col-reverse overflow-hidden"
                    style={{
                      width: "100%",
                      height: size.segment * capacity,
                      borderRadius: "9px 9px 23px 23px",
                      background:
                        "linear-gradient(180deg, hsla(0,0%,100%,.08), hsla(0,0%,100%,.015)), hsl(255 24% 9%)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-1.5 rounded-full"
                      style={{
                        top: 6,
                        bottom: 8,
                        width: 4,
                        background: "linear-gradient(180deg, hsla(0,0%,100%,.35), hsla(0,0%,100%,.03))",
                      }}
                    />
                    {tube.map((colorIdx, segIdx) => {
                      const hex = puzzle.colors[colorIdx];
                      return (
                        <div
                          key={segIdx}
                          style={{
                            height: size.segment,
                            background: `linear-gradient(180deg, ${lighten(hex, 0.32)}, ${hex} 55%, ${darken(hex, 0.22)})`,
                          }}
                        />
                      );
                    })}
                    {Array.from({ length: emptySlots }).map((_, idx) => (
                      <div key={`empty-${idx}`} style={{ height: size.segment }} />
                    ))}
                  </div>
                </div>
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
