"use client";

import { useState } from "react";
import { ArrowRight, Trophy, RefreshCw, Lightbulb, Sparkles } from "lucide-react";
import type { WhoAmIRound } from "@/content/whoami";
import { recordDailyCompletion } from "@/lib/streak";
import { recordServerStreakCompletion } from "@/lib/actions/streak";
import { incrementTodayPlayCount } from "@/lib/dailyCap";
import { LeaderboardTeaser } from "@/components/LeaderboardTeaser";

function normalize(s: string): string {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/^(der|die|das|the|ein|eine|a|an)\s+/i, "")
    .replace(/[^a-z0-9äöüß\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function WhoAmI({ title, color, round }: { title: string; color: string; round: WhoAmIRound }) {
  const { hints, solution, aliases } = round;
  const total = hints.length;

  const [revealed, setRevealed] = useState(1);
  const [guess, setGuess] = useState("");
  const [wrong, setWrong] = useState(0);
  const [status, setStatus] = useState<"won" | "lost" | null>(null);
  const [startTime] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);

  const isCorrect = (g: string) => {
    const n = normalize(g);
    if (!n || n.length < 2) return false;
    const targets = [solution, ...aliases].map(normalize).filter(Boolean);
    return targets.some((t) => t === n || (n.length >= 3 && (n.includes(t) || t.includes(n))));
  };

  const finish = (won: boolean) => {
    if (status) return;
    const dur = Math.round((Date.now() - startTime) / 1000);
    setElapsed(dur);
    setStatus(won ? "won" : "lost");
    incrementTodayPlayCount();
    if (won) {
      recordDailyCompletion();
      recordServerStreakCompletion().catch(() => null);
    }
  };

  const submitGuess = () => {
    if (status || !guess.trim()) return;
    if (isCorrect(guess)) {
      finish(true);
      return;
    }
    setWrong((w) => w + 1);
    setGuess("");
    if (revealed < total) setRevealed((r) => r + 1);
  };

  const revealNext = () => {
    if (revealed < total) setRevealed((r) => r + 1);
  };

  const restart = () => {
    setRevealed(1);
    setGuess("");
    setWrong(0);
    setStatus(null);
    setElapsed(0);
  };

  const finalScore = Math.max(100, 1000 - revealed * 120 - wrong * 60 - Math.round(elapsed) * 2);
  const hintsLeft = total - revealed;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: `hsl(var(--${color}))` }}
          >
            Wer bin ich? · Hinweis-Rätsel
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
            {title}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
          {status ? (
            <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{fmtTime(elapsed)}</span>
          ) : (
            <>
              <span className="hairline rounded-full px-3 py-1.5 tabular-nums">
                {revealed}/{total} Hinweise
              </span>
              {wrong > 0 && (
                <span className="hairline rounded-full px-3 py-1.5 tabular-nums">{wrong} Falsch</span>
              )}
            </>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted">
        Lies die Hinweise einer nach dem anderen und rate, wer gesucht ist. Je früher du&apos;s hast,
        desto mehr Punkte.
      </p>

      <div className="space-y-2.5">
        {hints.slice(0, revealed).map((hint, i) => (
          <div key={i} className="hairline flex items-start gap-3 rounded-2xl bg-surface p-3.5">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
              style={{ background: `hsl(var(--${color}))` }}
            >
              {i + 1}
            </div>
            <p className="pt-1 text-sm leading-relaxed text-ink">{hint}</p>
          </div>
        ))}
      </div>

      {!status && (
        <>
          {hintsLeft > 0 ? (
            <button
              onClick={revealNext}
              className="hairline mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface"
            >
              <Lightbulb className="h-4 w-4" /> Nächsten Hinweis zeigen ({hintsLeft} übrig)
            </button>
          ) : (
            <p className="mt-4 text-sm text-muted">Das war der letzte Hinweis — jetzt heißt es raten.</p>
          )}

          <div className="mt-6 flex items-center gap-2">
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitGuess()}
              placeholder="Deine Lösung…"
              className="hairline flex-1 rounded-full bg-surface px-5 py-3 text-sm text-ink outline-none focus:border-primary/60"
            />
            <button
              onClick={submitGuess}
              disabled={!guess.trim()}
              className="glow-primary inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
            >
              Lösen <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => finish(false)}
            className="mt-4 text-xs text-muted underline underline-offset-2 transition hover:text-ink"
          >
            Auflösung zeigen
          </button>
        </>
      )}

      {status && (
        <div className="hairline mt-8 rounded-2xl bg-surface p-6 text-center">
          <div
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
              status === "won" ? "bg-green-soft" : "bg-primary/15"
            }`}
          >
            {status === "won" ? (
              <Trophy className="h-7 w-7 text-green" />
            ) : (
              <Sparkles className="h-7 w-7 text-primary" />
            )}
          </div>
          <p className="font-display text-2xl font-extrabold text-ink">
            {status === "won" ? "Stimmt!" : "Auflösung"}
          </p>
          <p className="mt-1 text-sm text-muted">
            Die Antwort lautet <span className="font-semibold text-ink">{solution}</span>.
          </p>
          {status === "won" && (
            <p className="mt-2 text-sm text-muted">
              {revealed}/{total} Hinweise · {wrong} Falsch · {fmtTime(elapsed)} · {finalScore} Punkte
            </p>
          )}
          <button
            onClick={restart}
            className="glow-primary mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" /> Nochmal spielen
          </button>
        </div>
      )}

      {status === "won" && <LeaderboardTeaser board="puzzle" />}
    </div>
  );
}
