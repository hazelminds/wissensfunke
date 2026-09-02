"use client";

import { useEffect, useState } from "react";
import { type QuizDefinition, formatPrice, rankFor } from "@/content/quizzes";
import { createUnlockCheckout } from "@/lib/actions/checkout";

type Screen = "start" | "quiz" | "result";
type Answer = { category: string; correct: boolean };

const attemptStorageKey = (slug: string) => `wf_attempt_${slug}`;

export function QuizPlayer({
  quiz,
  initiallyUnlocked,
  checkoutError = false,
}: {
  quiz: QuizDefinition;
  initiallyUnlocked: boolean;
  checkoutError?: boolean;
}) {
  const [screen, setScreen] = useState<Screen>("start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const [revealed, setRevealed] = useState(initiallyUnlocked);

  // Rücksprung von der Zahlungsseite (Erfolg oder Fehler): der Client-State
  // (answers) ging bei der Navigation weg verloren — hier aus localStorage
  // restaurieren, damit man nicht das ganze Quiz nochmal machen muss.
  useEffect(() => {
    if (!initiallyUnlocked && !checkoutError) return;
    try {
      const raw = localStorage.getItem(attemptStorageKey(quiz.slug));
      if (raw) {
        const saved = JSON.parse(raw) as { answers: Answer[] };
        // Bewusste Ausnahme: SSR kennt localStorage nicht, der erste Client-
        // Render muss also mit "start" matchen — das Nachziehen aus dem
        // externen Speicher gehört genau hierher, nicht in einen Lazy-Initializer.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnswers(saved.answers);
        setScreen("result");
      }
    } catch {
      // localStorage nicht verfügbar (privater Modus o. ä.) — kein Problem,
      // Nutzer landet einfach wieder auf dem Start-Screen.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initiallyUnlocked) {
      const t = setTimeout(() => setRevealed(true), 150);
      return () => clearTimeout(t);
    }
  }, [initiallyUnlocked]);

  useEffect(() => {
    if (screen !== "result") return;
    try {
      localStorage.setItem(attemptStorageKey(quiz.slug), JSON.stringify({ answers }));
    } catch {
      // s.o.
    }
  }, [screen, quiz.slug, answers]);

  const score = answers.filter((a) => a.correct).length;
  const question = quiz.questions[current];
  const answered = selected !== null;

  function startQuiz() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setScreen("quiz");
  }

  function selectAnswer(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswers((prev) => [
      ...prev,
      { category: question.category, correct: index === question.correctIndex },
    ]);
  }

  function nextQuestion() {
    if (current + 1 >= quiz.questions.length) {
      setScreen("result");
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  }

  if (screen === "start") {
    return <StartScreen quiz={quiz} onStart={startQuiz} />;
  }

  if (screen === "quiz") {
    return (
      <QuizScreen
        quiz={quiz}
        current={current}
        answers={answers}
        question={question}
        selected={selected}
        onSelect={selectAnswer}
        onNext={nextQuestion}
      />
    );
  }

  return (
    <ResultScreen
      quiz={quiz}
      score={score}
      answers={answers}
      unlocked={unlocked}
      revealed={revealed}
      checkoutError={checkoutError}
      onUnlockedByOwner={() => {
        setUnlocked(true);
        setRevealed(true);
      }}
      onRestart={startQuiz}
    />
  );
}

function StartScreen({ quiz, onStart }: { quiz: QuizDefinition; onStart: () => void }) {
  const icons = Object.values(quiz.categoryIcons);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-[28px] leading-tight font-bold text-ink text-balance">
          {quiz.title}
        </h1>
        <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
          {quiz.questions.length} kurze Fragen. Direkt nach der letzten Antwort siehst du dein
          Ergebnis — die Themen-Analyse gibt es optional als Tiefenauswertung.
        </p>
        <div className="flex flex-wrap gap-2.5">
          {icons.map((icon, i) => (
            <span
              key={i}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-line bg-surface text-xl shadow-[0_3px_0_rgba(27,27,47,0.12)]"
            >
              {icon}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <MetaChip className="bg-primary-soft text-primary-dark">
            ⏱ {Math.ceil(quiz.questions.length * 0.5)} Min.
          </MetaChip>
          <MetaChip className="bg-coral-soft text-coral-dark">
            ❓ {quiz.questions.length} Fragen
          </MetaChip>
          <MetaChip className="bg-green-soft text-green-dark">🆓 Gratis-Ergebnis</MetaChip>
        </div>
      </div>
      <button onClick={onStart} className="btn-3d btn-3d-primary w-full py-4 text-base">
        Quiz starten 🚀
      </button>
    </div>
  );
}

function MetaChip({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-bold ${className}`}>
      {children}
    </span>
  );
}

function QuizScreen({
  quiz,
  current,
  answers,
  question,
  selected,
  onSelect,
  onNext,
}: {
  quiz: QuizDefinition;
  current: number;
  answers: Answer[];
  question: QuizDefinition["questions"][number];
  selected: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
}) {
  const letters = ["A", "B", "C", "D"];
  const badgeColors = ["bg-primary", "bg-coral", "bg-green", "bg-gold"];
  const progressPct = (current / quiz.questions.length) * 100;
  const answered = selected !== null;
  const isLast = current === quiz.questions.length - 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="h-3 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-coral transition-[width] duration-400"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between px-1">
          {quiz.questions.map((_, i) => {
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
          <span>{quiz.categoryIcons[question.category] ?? "❔"}</span>
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
              onClick={() => onSelect(i)}
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
        <div className="rounded-xl bg-primary-soft p-4 text-sm leading-relaxed text-[#3B3860]">
          {question.explanation}
        </div>
      )}

      {answered && (
        <button onClick={onNext} className="btn-3d btn-3d-primary py-4 text-base">
          {isLast ? "Ergebnis ansehen 🎉" : "Weiter"}
        </button>
      )}
    </div>
  );
}

function ResultScreen({
  quiz,
  score,
  answers,
  unlocked,
  revealed,
  checkoutError,
  onUnlockedByOwner,
  onRestart,
}: {
  quiz: QuizDefinition;
  score: number;
  answers: Answer[];
  unlocked: boolean;
  revealed: boolean;
  checkoutError: boolean;
  onUnlockedByOwner: () => void;
  onRestart: () => void;
}) {
  const rank = rankFor(quiz, score);

  useEffect(() => {
    if (score === quiz.questions.length) {
      const t = setTimeout(burstConfetti, 250);
      return () => clearTimeout(t);
    }
  }, [score, quiz.questions.length]);

  // Nach echter Rückkehr von Stripe ist `unlocked` bereits gesetzt — dieser
  // Callback existiert nur, damit ein späterer Login-Abgleich (Ebene 3,
  // Mini-Abo schaltet automatisch frei) denselben Reveal-Pfad nutzen kann.
  void onUnlockedByOwner;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 pt-2 text-center">
        <div
          className={`flex h-[130px] w-[130px] animate-[popIn_0.5s_cubic-bezier(.34,1.56,.64,1)] flex-col items-center justify-center rounded-full bg-gradient-to-br ${rank.gradientClass} shadow-[0_8px_0_rgba(0,0,0,0.12)]`}
        >
          <span className="text-4xl">{rank.emoji}</span>
          <span className="font-display text-[17px] font-bold text-white">
            {score}/{quiz.questions.length}
          </span>
        </div>
        <h2 className="font-display text-xl font-bold text-ink">{rank.title}</h2>
        <p className="text-sm text-ink-soft">{rank.subtitle}</p>
      </div>

      {checkoutError && (
        <div className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
          ⚙️ Die Bezahlfunktion wird gerade eingerichtet — die Themen-Analyse ist in Kürze
          freischaltbar. Dein Ergebnis oben bleibt dir natürlich erhalten.
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-5">
        <div>
          <h3 className="font-display text-[16px] font-semibold text-ink">
            📊 {quiz.unlockTitle}
          </h3>
          <p className="text-[12.5px] text-muted">{quiz.unlockDescription}</p>
        </div>

        <div className={`flex flex-col gap-3 ${!revealed ? "pointer-events-none blur-[6px] opacity-55 select-none" : ""}`}>
          {answers.map((a, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="w-[120px] shrink-0 text-[12.5px] font-bold text-ink">
                <span className="mr-1.5">{quiz.categoryIcons[a.category] ?? "❔"}</span>
                {a.category}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-md bg-line">
                <div
                  className={`h-full rounded-md transition-[width] duration-500 ${a.correct ? "bg-green" : "bg-red"}`}
                  style={{ width: revealed ? `${a.correct ? 100 : 15}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>

        {unlocked ? (
          <p className="flex items-center gap-1.5 text-[13.5px] font-extrabold text-green-dark">
            ✅ Freigeschaltet
          </p>
        ) : (
          <div className="flex items-center justify-between gap-3.5">
            <div>
              <p className="font-display text-xl font-bold text-gold-dark">
                {formatPrice(quiz.unlockPriceCents)}
              </p>
              <p className="text-[10.5px] font-bold text-muted">EINMALIG · KEIN ABO</p>
            </div>
            <form action={createUnlockCheckout.bind(null, quiz.slug)}>
              <button type="submit" className="btn-3d btn-3d-primary px-5 py-3.5 text-[14.5px]">
                🔓 Freischalten
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="flex gap-2.5">
        <button
          onClick={onRestart}
          className="btn-3d flex-1 border-2 border-line bg-surface py-3.5 text-sm text-ink shadow-[0_5px_0_var(--nog-line)] active:shadow-[0_1px_0_var(--nog-line)]"
        >
          🔁 Nochmal
        </button>
      </div>
    </div>
  );
}

function burstConfetti() {
  const colors = ["#6C5CE7", "#FF7A59", "#00C896", "#FFB800"];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.style.position = "fixed";
    p.style.top = "20vh";
    p.style.left = `${15 + Math.random() * 70}vw`;
    p.style.width = "8px";
    p.style.height = "12px";
    p.style.zIndex = "50";
    p.style.pointerEvents = "none";
    p.style.borderRadius = "2px";
    p.style.background = colors[i % colors.length];
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.transition = "transform 850ms ease-out, top 850ms cubic-bezier(.2,.8,.4,1), opacity 850ms ease-in";
    document.body.appendChild(p);
    requestAnimationFrame(() => {
      p.style.top = `${65 + Math.random() * 20}vh`;
      p.style.transform = `rotate(${Math.random() * 600 - 300}deg)`;
      p.style.opacity = "0";
    });
    setTimeout(() => p.remove(), 900);
  }
}
