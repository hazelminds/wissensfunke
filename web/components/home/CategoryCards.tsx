import Link from "next/link";
import { ArrowRight, Check, Lock } from "lucide-react";
import { type GameType, gameTypeMeta } from "@/content/games";

const categories: { id: GameType; emoji: string; free: string; plus: string }[] = [
  { id: "quiz", emoji: "🧠", free: "5 Fragen pro Runde", plus: "30+ Fragen & Themenspecials" },
  { id: "puzzle", emoji: "🧩", free: "Tagesrätsel & 3 Starter", plus: "Erweiterte Rätsel-Sets" },
  { id: "psych", emoji: "💬", free: "Kurze Versionen", plus: "Ausführliche Ergebnisse & Profile" },
];

export function CategoryCards() {
  return (
    <section id="spiele" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-16 md:pt-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Drei Spielarten
          </p>
          <h2 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Womit spielst du heute?
          </h2>
        </div>
        <Link
          href="/konto"
          className="hidden items-center gap-1.5 text-sm text-ink-soft transition hover:text-ink sm:inline-flex"
        >
          Plus freischalten <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div id="tests" className="grid scroll-mt-24 gap-4 md:grid-cols-3 md:gap-5">
        {categories.map((c) => {
          const meta = gameTypeMeta[c.id];
          return (
            <Link
              href={`/kategorie/${c.id}`}
              key={c.id}
              className="hairline group relative block overflow-hidden rounded-3xl bg-surface p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                style={{ background: `hsl(var(--${c.id}))` }}
              />
              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                style={{ background: `hsl(var(--${c.id}) / 0.18)` }}
              >
                {c.emoji}
              </div>

              <h3 className="relative mt-5 font-display text-xl font-bold text-ink">
                {meta.label}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">
                {meta.description}
              </p>

              <div className="relative mt-5 space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-ink">
                  <Check className="h-4 w-4 text-green" /> {c.free}
                  <span className="ml-auto rounded-full bg-green-soft px-2 py-0.5 text-xs font-medium text-green-dark">
                    Gratis
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <Lock className="h-4 w-4 text-primary" /> {c.plus}
                  <span className="ml-auto rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary-dark">
                    Plus
                  </span>
                </div>
              </div>

              <div className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 text-sm font-semibold text-primary transition group-hover:bg-primary group-hover:text-white">
                Spielen <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
