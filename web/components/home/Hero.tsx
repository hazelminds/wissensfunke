import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-quiz/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-10 md:pt-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="hairline inline-flex items-center gap-1.5 rounded-full bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Für Erwachsene · Nur Unterhaltung ·
            Keine Beratung
          </span>

          <h1
            className="mt-5 font-display leading-[1.02] font-extrabold tracking-tight text-ink"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)" }}
          >
            Noggl für
            <br />
            <span className="bg-gradient-to-r from-primary via-[hsl(var(--glow))] to-psych bg-clip-text text-transparent">
              den Kopf.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Schnelle Quizrunden, kleine Rätsel und Selbst-Tests für zwischendurch. Gratis starten —
            vertiefen mit Plus.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#spiele"
              className="glow-primary inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
            >
              Jetzt gratis spielen <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/konto"
              className="hairline inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ink transition hover:bg-surface"
            >
              Plus entdecken
            </Link>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative hidden h-[26rem] sm:block sm:h-[30rem]">
      <div className="hairline absolute top-0 right-4 w-56 rotate-3 rounded-2xl bg-surface p-4 shadow-2xl">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-quiz/20">
            <span className="text-lg">🧠</span>
          </div>
          <div>
            <p className="text-xs text-muted">Quiz</p>
            <p className="font-display text-sm font-bold text-ink">Weltereignisse</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-4/5 rounded bg-line" />
          <div className="h-2.5 w-2/3 rounded bg-line" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="hairline h-9 rounded-lg bg-quiz/15" />
            <div className="hairline h-9 rounded-lg bg-primary/20" />
            <div className="h-9 rounded-lg bg-line/60" />
            <div className="h-9 rounded-lg bg-line/60" />
          </div>
        </div>
      </div>

      <div className="hairline absolute top-24 left-0 w-52 -rotate-6 rounded-2xl bg-surface p-4 shadow-2xl">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-puzzle/20">
            <span className="text-lg">🧩</span>
          </div>
          <p className="font-display text-sm font-bold text-ink">Rätsel · 3-Sterne</p>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="hairline aspect-square rounded-md bg-puzzle/15" />
          ))}
        </div>
      </div>

      <div className="hairline absolute right-10 bottom-0 w-60 rotate-2 rounded-2xl bg-surface p-4 shadow-2xl">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-psych/20">
            <span className="text-lg">💬</span>
          </div>
          <div>
            <p className="text-xs text-muted">Selbsttest</p>
            <p className="font-display text-sm font-bold text-ink">Welcher Typ bist du?</p>
          </div>
        </div>
        <div className="mb-1.5 h-2 w-full rounded bg-line" />
        <div className="mb-3 h-2 w-3/4 rounded bg-line" />
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Frage 4 / 8</span>
          <span className="font-semibold text-primary">Gratis</span>
        </div>
      </div>
    </div>
  );
}
