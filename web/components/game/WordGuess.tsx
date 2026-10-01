"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Share2, Trophy } from "lucide-react";
import {
  WORD_LENGTH,
  MAX_ATTEMPTS,
  isValidGuess,
  normalizeGuess,
  evaluateGuess,
  isWin,
  type LetterState,
} from "@/content/wordguess";
import { recordDailyCompletion } from "@/lib/streak";
import { recordServerStreakCompletion } from "@/lib/actions/streak";
import { logGameEventAction } from "@/lib/actions/analytics";
import { Confetti } from "@/components/Confetti";

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "Ü"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"],
  ["ENTER", "Y", "X", "C", "V", "B", "N", "M", "⌫"],
];

const STATE_PRIORITY: Record<LetterState, number> = { absent: 0, present: 1, correct: 2 };

const STORAGE_KEY = "nog_wordguess_state";

interface StoredWordGuessState {
  puzzleNumber: number;
  guesses: string[];
  status: "playing" | "won" | "lost";
}

export function WordGuess({ solution, puzzleNumber }: { solution: string; puzzleNumber: number }) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [freezesUsed, setFreezesUsed] = useState(0);
  const [shared, setShared] = useState(false);
  // Erst nach dem Wiederherstellungs-Versuch unten wird der Speicher-Effekt
  // scharf geschaltet -- sonst würde er den leeren Startzustand sofort über
  // einen schon gespeicherten Stand drüberschreiben.
  const [hydrated, setHydrated] = useState(false);

  // Fortschritt für das heutige Rätsel wiederherstellen (Neuladen/erneuter
  // Besuch soll das Ergebnis nicht verwerfen, wie beim Vorbild). Schlüssel
  // ist die serverseitig berechnete puzzleNumber, kein eigenes Datum nötig.
  useEffect(() => {
    // SSR kennt localStorage nicht -- Wiederherstellung kann nur hier,
    // clientseitig nach dem Mount, passieren (gleiches Muster wie StreakBadge).
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as StoredWordGuessState;
        if (saved.puzzleNumber === puzzleNumber) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setGuesses(saved.guesses);
          setStatus(saved.status);
          if (saved.status !== "playing") setStreakCount(recordDailyCompletion().count);
        }
      }
    } catch {
      // localStorage nicht verfügbar/kaputter Inhalt -- einfach frisch starten.
    }
    setHydrated(true);
    logGameEventAction("tages-wort", "started").catch(() => null);
  }, [puzzleNumber]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const toSave: StoredWordGuessState = { puzzleNumber, guesses, status };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // localStorage nicht verfügbar -- Fortschritt gilt dann nur für diese Sitzung.
    }
  }, [hydrated, puzzleNumber, guesses, status]);

  const evaluations = useMemo(() => guesses.map((g) => evaluateGuess(g, solution)), [guesses, solution]);

  // Bester bekannter Zustand je Buchstabe, für die Tastatur-Einfärbung
  // (grün schlägt gelb schlägt grau, nie zurückstufen).
  const keyStates = useMemo(() => {
    const map = new Map<string, LetterState>();
    guesses.forEach((g, row) => {
      [...g].forEach((letter, i) => {
        const state = evaluations[row][i];
        const existing = map.get(letter);
        if (!existing || STATE_PRIORITY[state] > STATE_PRIORITY[existing]) map.set(letter, state);
      });
    });
    return map;
  }, [guesses, evaluations]);

  const finishRound = useCallback(
    async (won: boolean) => {
      setStatus(won ? "won" : "lost");
      const local = recordDailyCompletion();
      const server = await recordServerStreakCompletion().catch(() => null);
      setStreakCount(server?.count ?? local.count);
      setFreezesUsed(server?.freezesUsed ?? 0);
      if (won) logGameEventAction("tages-wort", "completed").catch(() => null);
    },
    [],
  );

  const submitGuess = useCallback(() => {
    if (status !== "playing") return;
    if (current.length < WORD_LENGTH) {
      setError("Zu wenig Buchstaben");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (!isValidGuess(current)) {
      setError("Kein Wort aus unserer Liste");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError(null);
    const guess = normalizeGuess(current);
    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);
    setCurrent("");

    const states = evaluateGuess(guess, solution);
    if (isWin(states)) {
      finishRound(true);
    } else if (nextGuesses.length >= MAX_ATTEMPTS) {
      finishRound(false);
    }
  }, [current, status, guesses, solution, finishRound]);

  const typeLetter = useCallback(
    (letter: string) => {
      if (status !== "playing") return;
      setError(null);
      setCurrent((c) => (c.length < WORD_LENGTH ? c + letter : c));
    },
    [status],
  );

  const backspace = useCallback(() => {
    if (status !== "playing") return;
    setError(null);
    setCurrent((c) => c.slice(0, -1));
  }, [status]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter") {
        submitGuess();
        return;
      }
      if (e.key === "Backspace") {
        backspace();
        return;
      }
      const key = e.key.toUpperCase();
      if (/^[A-ZÄÖÜ]$/.test(key)) typeLetter(key);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [submitGuess, backspace, typeLetter]);

  async function share() {
    const grid = evaluations
      .map((row) => row.map((s) => (s === "correct" ? "🟩" : s === "present" ? "🟨" : "⬜")).join(""))
      .join("\n");
    const result = status === "won" ? `${guesses.length}/${MAX_ATTEMPTS}` : `X/${MAX_ATTEMPTS}`;
    const text = `Noggl Worträtsel #${puzzleNumber} ${result}\n\n${grid}\n\nnoggl.app`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // Dialog abgebrochen -- kein Fehlerzustand nötig.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Zwischenablage nicht verfügbar -- ohne Teilen-Dialog bleibt nur
      // der erneute Versuch, kein zusätzlicher Fallback nötig.
    }
  }

  const rows = Array.from({ length: MAX_ATTEMPTS }, (_, row) => {
    if (row < guesses.length) return { letters: [...guesses[row]], states: evaluations[row], active: false };
    if (row === guesses.length)
      return {
        letters: [...current.padEnd(WORD_LENGTH, " ")].map((c) => (c === " " ? "" : c)),
        states: null,
        active: true,
      };
    return { letters: Array(WORD_LENGTH).fill(""), states: null, active: false };
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Wort des Tages</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Worträtsel #{puzzleNumber} · errate das {WORD_LENGTH}-Buchstaben-Wort in {MAX_ATTEMPTS} Versuchen.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-xs flex-col gap-1.5">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid gap-1.5 ${row.active && shake ? "animate-[shake_0.4s]" : ""}`}
            style={{ gridTemplateColumns: `repeat(${WORD_LENGTH}, minmax(0, 1fr))` }}
          >
            {row.letters.map((letter, i) => {
              const state = row.states?.[i];
              const bgClass =
                state === "correct"
                  ? "bg-green text-white border-green"
                  : state === "present"
                    ? "bg-gold text-white border-gold"
                    : state === "absent"
                      ? "bg-muted/30 text-ink-soft border-transparent"
                      : "bg-surface text-ink hairline";
              return (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-lg border-2 font-display text-xl font-extrabold uppercase transition-colors duration-300 ${bgClass}`}
                  style={{ transitionDelay: state ? `${i * 120}ms` : "0ms" }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {error && <p className="text-center text-sm font-semibold text-coral-dark">{error}</p>}

      {status === "playing" && (
        <div className="mx-auto flex w-full max-w-md flex-col gap-1.5">
          {KEYBOARD_ROWS.map((krow, i) => (
            <div key={i} className="flex justify-center gap-1.5">
              {krow.map((key) => {
                const isAction = key === "ENTER" || key === "⌫";
                const state = !isAction ? keyStates.get(key) : undefined;
                const bgClass =
                  state === "correct"
                    ? "bg-green text-white"
                    : state === "present"
                      ? "bg-gold text-white"
                      : state === "absent"
                        ? "bg-muted/40 text-ink-soft"
                        : "hairline bg-surface text-ink hover:bg-bg";
                return (
                  <button
                    key={key}
                    onClick={() => (key === "ENTER" ? submitGuess() : key === "⌫" ? backspace() : typeLetter(key))}
                    className={`flex h-11 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                      isAction ? "min-w-[52px] px-2" : "min-w-[30px] flex-1"
                    } ${bgClass}`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {status !== "playing" && (
        <div
          className={`hairline flex flex-col items-center gap-2 rounded-2xl p-5 text-center ${
            status === "won" ? "bg-green-soft" : "bg-surface"
          }`}
        >
          {status === "won" ? (
            <>
              <Trophy className="mb-1 h-6 w-6 text-green" />
              <p className="font-display text-xl font-extrabold text-ink">
                Geschafft in {guesses.length} {guesses.length === 1 ? "Versuch" : "Versuchen"}!
              </p>
            </>
          ) : (
            <p className="font-display text-xl font-extrabold text-ink">
              Das Wort war: <span className="text-primary">{solution}</span>
            </p>
          )}

          <button
            onClick={share}
            className="btn-3d btn-3d-primary mt-2 flex items-center gap-2 px-6 py-3 text-sm"
          >
            {shared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {shared ? "Kopiert!" : "Ergebnis teilen"}
          </button>
        </div>
      )}

      {status !== "playing" && freezesUsed > 0 && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-primary-soft px-4 py-3.5 text-sm text-primary-dark">
          <span className="text-xl leading-none">🧊</span>
          <p>
            <strong>Streak-Schutz eingesetzt!</strong>{" "}
            {freezesUsed === 1 ? "Ein verpasster Tag wurde" : `${freezesUsed} verpasste Tage wurden`}{" "}
            automatisch ausgeglichen — deine Serie läuft weiter.
          </p>
        </div>
      )}

      {status !== "playing" && (
        <p className="text-center text-sm text-ink-soft">
          Neues Worträtsel gibt es morgen.{" "}
          {streakCount > 0 && (
            <>
              Dein Streak steht jetzt bei{" "}
              <strong>
                {streakCount} {streakCount === 1 ? "Tag" : "Tagen"}
              </strong>
              .
            </>
          )}
        </p>
      )}

      {status === "won" && <Confetti />}
    </div>
  );
}
