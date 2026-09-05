"use client";

import { useState } from "react";
import { dailyCategoryIcons, type DailyQuizSet } from "@/content/daily";
import { recordDailyCompletion } from "@/lib/streak";
import { recordServerStreakCompletion } from "@/lib/actions/streak";

type Answer = { correct: boolean };

export function DailyMiniQuiz({ quizSet }: { quizSet: DailyQuizSet }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [done, setDone] = useState(false);
  const [streakCount, setStreakCount] = useState(0);

  const question = quizSet.questions[current];
  const answered = selected !== null;
  const isLast = current === quizSet.questions.length - 1;
  const score = answers.filter((a) => a.correct).length;

  function selectAnswer(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswers((prev) => [...prev, { correct: index === question.correctIndex }]);
  }

  async function next() {
    if (isLast) {
      const local = recordDailyCompletion();
      // Server ist die Quelle der Wahrheit für eingeloggte Nutzer; ohne
      // Login/Supabase-Setup liefert die Action null, dann zählt localStorage.
      const server = await recordServerStreakCompletion().catch(() => null);
      setStreakCount(server?.count ?? local.count);
      setDone(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  }

  if (done) {
    return <DoneCard score={score} total={quizSet.questions.length} streakCount={streakCount} />;
  }

  const letters = ["A", "B", "C", "D"];
  const badgeColors = ["bg-primary", "bg-coral", "bg-green", "bg-gold"];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-2xl font-bold text-ink">Tages-Mini-Quiz</h1>
        <div className="flex justify-between px-1">
          {quizSet.questions.map((_, i) => {
            const result = answers[i];
            const isCurrent = i === current;
            return (
              <span
                key={i}
                className={[
                  "flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 font-display text-xs font-semibold transition-all",
                  result
                    ? result.correct
                      ? "border-green bg-green text-white"
                      : "border-red bg-red text-white"
                    : isCurrent
                      ? "border-primary text-primary shadow-[0_0_0_4px_var(--nog-primary-soft)]"
                      : "border-line bg-surface text-muted",
                ].join(" ")}
              >
                {result ? (result.correct ? "✓" : "✕") : i + 1}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="mb-2 flex w-fit items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-[12.5px] font-bold text-primary-dark">
          <span>{dailyCategoryIcons[question.category] ?? "❔"}</span>
          <span>{question.category}</span>
        </span>
        <h2 className="font-display text-xl leading-snug font-semibold text-ink text-balance">
          {question.question}
        </h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => {
          let state = "";
          if (answered) {
            if (i === question.correctIndex) state = "correct";
            else if (i === selected) state = "wrong";
            else state = "dim";
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => selectAnswer(i)}
              className={[
                "flex items-center gap-3 rounded-2xl border-2 p-3.5 text-left font-body text-[15px] font-bold text-ink shadow-[0_3px_0_var(--nog-line)] transition-transform",
                state === "correct" && "border-green bg-green-soft shadow-[0_3px_0_var(--nog-green)]",
                state === "wrong" && "border-red bg-red-soft shadow-[0_3px_0_var(--nog-red)]",
                state === "dim" && "border-line bg-surface opacity-45",
                state === "" && "border-line bg-surface hover:-translate-y-0.5",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] font-display text-[13.5px] font-bold text-white ${
                  state === "correct" ? "bg-green" : state === "wrong" ? "bg-red" : badgeColors[i]
                }`}
              >
                {letters[i]}
              </span>
              <span>{opt}</span>
              {state === "correct" && <span className="ml-auto text-base">✓</span>}
              {state === "wrong" && <span className="ml-auto text-base">✕</span>}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="rounded-xl bg-primary-soft p-4 text-sm leading-relaxed text-ink">
          {question.explanation}
        </div>
      )}

      {answered && (
        <button onClick={next} className="btn-3d btn-3d-primary py-4 text-base">
          {isLast ? "Fertig 🎉" : "Weiter"}
        </button>
      )}
    </div>
  );
}

function DoneCard({ score, total, streakCount }: { score: number; total: number; streakCount: number }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-line bg-surface p-6 text-center">
      <span className="text-4xl">⚡</span>
      <h1 className="font-display text-xl font-bold text-ink">
        {score}/{total} richtig — bis morgen!
      </h1>
      <p className="text-sm text-ink-soft">
        Neues Tages-Mini-Quiz gibt es um Mitternacht. {streakCount > 0 && (
          <>Dein Streak steht jetzt bei <strong>{streakCount} {streakCount === 1 ? "Tag" : "Tagen"}</strong>.</>
        )}
      </p>
    </div>
  );
}
