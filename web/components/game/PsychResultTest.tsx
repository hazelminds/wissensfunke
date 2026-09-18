"use client";

import { useState } from "react";
import { Crown, RefreshCw } from "lucide-react";
import { resultTypeFor, type PsychResultType, type PsychTestDefinition } from "@/content/psychTests";
import { logGameEventAction } from "@/lib/actions/analytics";
import { incrementTodayPlayCount } from "@/lib/dailyCap";
import { PlusButton } from "@/components/PlusButton";

type Screen = "start" | "quiz" | "result";

const letters = ["A", "B", "C", "D"];
const badgeColors = ["bg-primary", "bg-coral", "bg-green", "bg-gold"];

/** Gemeinsame Komponente für alle 24 neuen Selbsttests -- anders als
 * Beziehungstyp/Freundes-Kompatibilität (eigene Komponenten, Einzelkauf)
 * laufen die hier alle über dieselbe Logik und werden per Plus-Status
 * freigeschaltet, nicht per Kauf. */
export function PsychResultTest({ test, plusActive }: { test: PsychTestDefinition; plusActive: boolean }) {
  const [screen, setScreen] = useState<Screen>("start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const total = test.questions.length;
  const question = test.questions[current];

  function start() {
    setCurrent(0);
    setSelected(null);
    setScores({});
    setScreen("quiz");
    logGameEventAction(test.slug, "started").catch(() => null);
  }

  function select(index: number) {
    if (selected !== null) return;
    setSelected(index);
    const type = question.options[index].type;
    setScores((prev) => ({ ...prev, [type]: (prev[type] ?? 0) + 1 }));
  }

  function next() {
    if (current + 1 >= total) {
      incrementTodayPlayCount();
      setScreen("result");
      logGameEventAction(test.slug, "completed").catch(() => null);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  }

  if (screen === "start") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-[28px] leading-tight font-bold text-ink text-balance">
            {test.title}
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">{test.teaser}</p>
          <div className="flex flex-wrap gap-2.5">
            {test.resultTypes.map((t) => (
              <span
                key={t.id}
                className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-line bg-surface text-xl shadow-[0_3px_0_rgba(27,27,47,0.12)]"
              >
                {t.emoji}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-2 text-[12.5px] font-bold text-primary-dark">
              ⏱ {Math.ceil(total * 0.5)} Min.
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-coral-soft px-3.5 py-2 text-[12.5px] font-bold text-coral-dark">
              ❓ {total} Fragen
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-green-soft px-3.5 py-2 text-[12.5px] font-bold text-green-dark">
              🆓 Kostenlos
            </span>
          </div>
        </div>
        <button onClick={start} className="btn-3d btn-3d-primary w-full py-4 text-base">
          Test starten {test.emoji}
        </button>
      </div>
    );
  }

  if (screen === "quiz") {
    const progressPct = (current / total) * 100;
    const answered = selected !== null;
    const isLast = current === total - 1;

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="h-3 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-coral transition-[width] duration-400"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-[12.5px] font-semibold text-muted">
            Frage {current + 1} von {total}
          </p>
        </div>

        <h2 className="font-display text-xl leading-snug font-semibold text-ink text-balance">
          {question.question}
        </h2>

        <div className="flex flex-col gap-2.5">
          {question.options.map((opt, i) => {
            const state = answered ? (i === selected ? "selected" : "dim") : "";
            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => select(i)}
                className={[
                  "flex items-center gap-3 rounded-2xl border-2 p-3.5 text-left font-body text-[15px] font-bold text-ink shadow-[0_3px_0_var(--nog-line)] transition-transform",
                  state === "selected" && "border-primary bg-primary-soft shadow-[0_3px_0_var(--nog-primary)]",
                  state === "dim" && "border-line bg-surface opacity-45",
                  state === "" && "border-line bg-surface hover:-translate-y-0.5",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span
                  className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] font-display text-[13.5px] font-bold text-white ${
                    state === "selected" ? "bg-primary" : badgeColors[i]
                  }`}
                >
                  {letters[i]}
                </span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <button onClick={next} className="btn-3d btn-3d-primary py-4 text-base">
            {isLast ? "Ergebnis ansehen 🎉" : "Weiter"}
          </button>
        )}
      </div>
    );
  }

  const result: PsychResultType = resultTypeFor(test, scores);
  const totalAnswered = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 pt-2 text-center">
        <div
          className={`flex h-[130px] w-[130px] animate-[popIn_0.5s_cubic-bezier(.34,1.56,.64,1)] flex-col items-center justify-center rounded-full bg-gradient-to-br ${result.gradientClass} shadow-[0_8px_0_rgba(0,0,0,0.12)]`}
        >
          <span className="text-4xl">{result.emoji}</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-ink">{result.title}</h2>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-5">
        <p className="text-[14.5px] leading-relaxed text-ink-soft">{result.description}</p>

        <div className="flex flex-col gap-2">
          <p className="text-[12.5px] font-bold text-muted">Deine Mischung</p>
          {test.resultTypes.map((t) => {
            const pct = Math.round(((scores[t.id] ?? 0) / totalAnswered) * 100);
            return (
              <div key={t.id} className="flex items-center gap-2.5">
                <span className="w-6 shrink-0 text-center text-base">{t.emoji}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${t.gradientClass}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-9 shrink-0 text-right text-[12px] font-bold text-muted">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-5">
        <div>
          <h3 className="font-display text-[16px] font-semibold text-ink">📊 Ausführliche Analyse</h3>
          <p className="text-[12.5px] text-muted">Stärken, Stolpersteine und ein Tipp für dich.</p>
        </div>

        <div
          className={`flex flex-col gap-3 text-[13.5px] leading-relaxed ${
            !plusActive ? "pointer-events-none blur-[6px] opacity-55 select-none" : ""
          }`}
        >
          <p className="text-ink">
            <span className="font-bold">Deine Stärken:</span> {result.strengths}
          </p>
          <p className="text-ink">
            <span className="font-bold">Worauf du achten solltest:</span> {result.watchOut}
          </p>
          <p className="text-ink">
            <span className="font-bold">Tipp:</span> {result.tip}
          </p>
        </div>

        {plusActive ? (
          <p className="flex items-center gap-1.5 text-[13.5px] font-extrabold text-green-dark">
            ✅ Freigeschaltet mit Plus
          </p>
        ) : (
          <PlusButton className="glow-primary flex items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-[14.5px] font-bold text-white transition hover:opacity-90">
            <Crown className="h-4 w-4" /> Mit Plus freischalten
          </PlusButton>
        )}
      </div>

      <p className="text-center text-[12px] text-muted">
        Nur zur Unterhaltung, keine psychologische Diagnose oder Beratung.
      </p>

      <button
        onClick={start}
        className="glow-primary inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <RefreshCw className="h-4 w-4" /> Nochmal machen
      </button>
    </div>
  );
}
