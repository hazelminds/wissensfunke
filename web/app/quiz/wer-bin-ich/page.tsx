import Link from "next/link";
import { ArrowLeft, Clock, Crown, Lock, UserSearch } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { games } from "@/content/games";

const DIFFICULTY_SLUGS = ["wer-bin-ich-leicht", "wer-bin-ich-mittel", "wer-bin-ich-schwer"] as const;

const DIFFICULTY_LABEL: Record<(typeof DIFFICULTY_SLUGS)[number], string> = {
  "wer-bin-ich-leicht": "Leicht",
  "wer-bin-ich-mittel": "Mittel",
  "wer-bin-ich-schwer": "Schwer",
};

export default function WerBinIchPage() {
  const tiers = DIFFICULTY_SLUGS.map((slug) => games.find((g) => g.slug === slug)).filter(
    (g): g is NonNullable<typeof g> => !!g,
  );

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/kategorie/puzzle" />
      <main className="mx-auto max-w-4xl px-5 py-12">
        <Link
          href="/kategorie/puzzle"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Rätsel</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Wer bin ich?
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Sieben Hinweise, eine Person, ein Ort oder ein Werk -- wähle deine Schwierigkeit.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiers.map((g) => {
            const isFree = !g.isPremium;
            return (
              <Link
                key={g.slug}
                href={`/quiz/${g.slug}`}
                className="hairline group overflow-hidden rounded-2xl bg-surface transition-colors hover:border-primary/50"
              >
                <div
                  className="relative flex h-28 items-center justify-center"
                  style={{
                    background: "radial-gradient(circle at 30% 20%, hsl(var(--puzzle) / 0.28), transparent 70%)",
                  }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ background: "hsl(var(--puzzle))" }}
                  >
                    <UserSearch className="h-8 w-8" />
                  </div>
                  <span
                    className={`absolute top-3 right-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      isFree ? "bg-green-soft text-green-dark" : "bg-primary text-white"
                    }`}
                  >
                    {isFree ? (
                      "Gratis"
                    ) : (
                      <>
                        <Crown className="h-3 w-3" /> Plus
                      </>
                    )}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display text-lg font-bold text-ink">
                    {DIFFICULTY_LABEL[g.slug as (typeof DIFFICULTY_SLUGS)[number]]}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">{g.teaser}</p>
                  <div className="mt-2.5 flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {g.estMinutes} Min
                    </span>
                    {!isFree && (
                      <span className="flex items-center gap-1">
                        <Lock className="h-3 w-3" /> Nur mit Plus
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
