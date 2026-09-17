"use client";

import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw, Share2 } from "lucide-react";
import {
  compatQuestions,
  decodeAnswers,
  encodeAnswers,
  tierForPct,
  unlockPriceCents,
  unlockTitle,
  unlockDescription,
} from "@/content/freundeskompatibilitaet";
import { formatPrice } from "@/content/quizzes";
import { createUnlockCheckout } from "@/lib/actions/checkout";
import { incrementTodayPlayCount } from "@/lib/dailyCap";

type Screen = "start" | "quiz" | "share" | "compare";

const letters = ["A", "B", "C", "D"];
const badgeColors = ["bg-primary", "bg-coral", "bg-green", "bg-gold"];
const attemptStorageKey = (code: string) => `wf_attempt_freundes-kompatibilitaet_${code}`;

export function FriendCompatibility({
  title,
  sharedCode,
  sharedName,
  initiallyUnlocked,
  checkoutError = false,
}: {
  title: string;
  sharedCode?: string;
  sharedName?: string;
  initiallyUnlocked: boolean;
  checkoutError?: boolean;
}) {
  const partnerAnswers = sharedCode ? decodeAnswers(sharedCode) : null;
  const isCompareMode = !!partnerAnswers;
  const unlocked = initiallyUnlocked;

  const [screen, setScreen] = useState<Screen>("start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const total = compatQuestions.length;
  const question = compatQuestions[current];

  // Rücksprung von der Zahlungsseite: der Client-State (answers) ging bei der
  // Navigation verloren -- hier aus localStorage restaurieren, damit man
  // nicht den ganzen Vergleich nochmal machen muss (gleiches Muster wie
  // QuizPlayer/RelationshipTest). Nur relevant für die Vergleichsseite, denn
  // nur dort gibt es überhaupt eine ausführliche Analyse zum Freischalten.
  useEffect(() => {
    if (!isCompareMode || !sharedCode) return;
    if (!initiallyUnlocked && !checkoutError) return;
    try {
      const raw = localStorage.getItem(attemptStorageKey(sharedCode));
      if (raw) {
        const saved = JSON.parse(raw) as { answers: number[] };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAnswers(saved.answers);
        setScreen("compare");
      }
    } catch {
      // localStorage nicht verfügbar -- kein Problem, Start-Screen bleibt.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (screen !== "compare" || !sharedCode) return;
    try {
      localStorage.setItem(attemptStorageKey(sharedCode), JSON.stringify({ answers }));
    } catch {
      // s.o.
    }
  }, [screen, sharedCode, answers]);

  function start() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setScreen("quiz");
  }

  function select(index: number) {
    if (selected !== null) return;
    setSelected(index);
    setAnswers((prev) => [...prev, index]);
  }

  function next() {
    if (current + 1 >= total) {
      incrementTodayPlayCount();
      setScreen(isCompareMode ? "compare" : "share");
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  }

  const shareUrl = (() => {
    if (typeof window === "undefined") return "";
    const code = encodeAnswers(answers);
    const url = new URL(window.location.origin + "/quiz/freundes-kompatibilitaet");
    url.searchParams.set("von", code);
    if (name.trim()) url.searchParams.set("name", name.trim());
    return url.toString();
  })();

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Zwischenablage nicht verfügbar (z. B. kein HTTPS/Berechtigung) --
      // der Link steht ohnehin sichtbar im Eingabefeld zum manuellen Kopieren.
    }
  }

  if (screen === "start") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-[28px] leading-tight font-bold text-ink text-balance">
            {title}
          </h1>
          {isCompareMode ? (
            <div className="rounded-xl bg-primary-soft px-4 py-3 text-[13.5px] font-semibold text-primary-dark">
              🔗 {sharedName ? `${sharedName} hat` : "Jemand hat"} den Test schon gemacht — jetzt
              bist du dran! Beantworte dieselben {total} Fragen, danach seht ihr eure
              Übereinstimmung.
            </div>
          ) : (
            <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
              Beantworte {total} Fragen zum Thema Freundschaft, teile danach den Link mit einer
              Freundin oder einem Freund — und seht, wie gut ihr zusammenpasst.
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-2 text-[12.5px] font-bold text-primary-dark">
              ⏱ {Math.ceil(total * 0.4)} Min.
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-coral-soft px-3.5 py-2 text-[12.5px] font-bold text-coral-dark">
              ❓ {total} Fragen
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-green-soft px-3.5 py-2 text-[12.5px] font-bold text-green-dark">
              🆓 Kostenlos
            </span>
          </div>
          {!isCompareMode && (
            <label className="mt-1 flex flex-col gap-1.5">
              <span className="text-[12.5px] font-bold text-muted">Dein Name (optional, für den Link)</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z. B. Mia"
                maxLength={30}
                className="hairline rounded-full bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-primary/60"
              />
            </label>
          )}
        </div>
        <button onClick={start} className="btn-3d btn-3d-primary w-full py-4 text-base">
          Test starten 🤝
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
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <button onClick={next} className="btn-3d btn-3d-primary py-4 text-base">
            {isLast ? (isCompareMode ? "Ergebnis ansehen 🎉" : "Weiter zum Teilen") : "Weiter"}
          </button>
        )}
      </div>
    );
  }

  if (screen === "share") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 pt-2 text-center">
          <div className="flex h-[100px] w-[100px] animate-[popIn_0.5s_cubic-bezier(.34,1.56,.64,1)] items-center justify-center rounded-full bg-gradient-to-br from-primary to-coral shadow-[0_8px_0_rgba(0,0,0,0.12)]">
            <Share2 className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-display text-xl font-bold text-ink">Geschafft!</h2>
          <p className="max-w-sm text-sm text-ink-soft">
            Jetzt den Link an eine Freundin oder einen Freund schicken — sobald sie/er die
            gleichen Fragen beantwortet hat, seht ihr eure Übereinstimmung.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border-2 border-line bg-surface p-3">
          <input
            readOnly
            value={shareUrl}
            onFocus={(e) => e.currentTarget.select()}
            className="flex-1 truncate bg-transparent text-[13px] text-ink-soft outline-none"
          />
          <button
            onClick={copyLink}
            className="glow-primary flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Kopiert!" : "Kopieren"}
          </button>
        </div>

        <button
          onClick={start}
          className="glow-primary inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <RefreshCw className="h-4 w-4" /> Nochmal machen
        </button>
      </div>
    );
  }

  // screen === "compare"
  const matches = answers.filter((a, i) => a === partnerAnswers![i]).length;
  const pct = Math.round((matches / total) * 100);
  const tier = tierForPct(pct);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 pt-2 text-center">
        <div
          className={`flex h-[130px] w-[130px] animate-[popIn_0.5s_cubic-bezier(.34,1.56,.64,1)] flex-col items-center justify-center rounded-full bg-gradient-to-br ${tier.gradientClass} shadow-[0_8px_0_rgba(0,0,0,0.12)]`}
        >
          <span className="text-4xl">{tier.emoji}</span>
          <span className="font-display text-[17px] font-bold text-white">{pct}%</span>
        </div>
        <h2 className="font-display text-xl font-bold text-ink">{tier.title}</h2>
        <p className="max-w-sm text-sm text-ink-soft">{tier.description}</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {compatQuestions.map((q, i) => {
          const same = answers[i] === partnerAnswers![i];
          return (
            <div key={i} className="hairline rounded-xl bg-surface p-3.5">
              <div className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                    same ? "bg-green" : "bg-red"
                  }`}
                >
                  {same ? "✓" : "✕"}
                </span>
                <p className="text-[13px] leading-snug font-semibold text-ink">{q.question}</p>
              </div>
              <div
                className={`mt-2 ml-[30px] flex flex-col gap-1 text-[12px] leading-relaxed text-ink-soft ${
                  !unlocked ? "pointer-events-none blur-[6px] opacity-55 select-none" : ""
                }`}
              >
                <p>
                  <span className="font-bold">Du:</span> {q.options[answers[i]]}
                </p>
                {!same && (
                  <p>
                    <span className="font-bold">{sharedName || "Freund:in"}:</span>{" "}
                    {q.options[partnerAnswers![i]]}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {checkoutError && (
        <div className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
          ⚙️ Die Bezahlfunktion wird gerade eingerichtet — die ausführliche Analyse ist in Kürze
          freischaltbar. Euer Ergebnis oben bleibt euch natürlich erhalten.
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-5">
        <div>
          <h3 className="font-display text-[16px] font-semibold text-ink">📊 {unlockTitle}</h3>
          <p className="text-[12.5px] text-muted">{unlockDescription}</p>
        </div>

        <p
          className={`text-[13.5px] leading-relaxed text-ink ${
            !unlocked ? "pointer-events-none blur-[6px] opacity-55 select-none" : ""
          }`}
        >
          {tier.detail}
        </p>

        {unlocked ? (
          <p className="flex items-center gap-1.5 text-[13.5px] font-extrabold text-green-dark">
            ✅ Freigeschaltet
          </p>
        ) : (
          <div className="flex items-center justify-between gap-3.5">
            <div>
              <p className="font-display text-xl font-bold text-gold-dark">
                {formatPrice(unlockPriceCents)}
              </p>
              <p className="text-[10.5px] font-bold text-muted">EINMALIG · KEIN ABO</p>
            </div>
            <form action={createUnlockCheckout.bind(null, "freundes-kompatibilitaet")}>
              {sharedCode && <input type="hidden" name="von" value={sharedCode} />}
              {sharedName && <input type="hidden" name="name" value={sharedName} />}
              <button type="submit" className="btn-3d btn-3d-primary px-5 py-3.5 text-[14.5px]">
                🔓 Freischalten
              </button>
            </form>
          </div>
        )}
      </div>

      <button
        onClick={start}
        className="glow-primary inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <RefreshCw className="h-4 w-4" /> Nochmal machen
      </button>
    </div>
  );
}
