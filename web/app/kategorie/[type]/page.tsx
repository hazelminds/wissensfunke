import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Crown } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { games, gameTypeMeta, type GameType } from "@/content/games";
import { GameIcon } from "@/lib/gameIcons";

export function generateStaticParams() {
  return Object.keys(gameTypeMeta).map((type) => ({ type }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isGameType(type)) notFound();

  const meta = gameTypeMeta[type];
  const items = games.filter((g) => g.type === type).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">{meta.label}</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          Themen wählen
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">{meta.description}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {items.length === 0 ? (
            <p className="col-span-full text-sm text-muted">
              Aktuell keine Runden in dieser Kategorie.
            </p>
          ) : (
            items.map((g) => {
              return (
              <Link
                key={g.slug}
                href={`/quiz/${g.slug}`}
                className="hairline group overflow-hidden rounded-2xl bg-surface transition-colors hover:border-primary/50"
              >
                <div
                  className="relative flex h-28 items-center justify-center sm:h-32"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, hsl(var(--${g.type}) / 0.28), transparent 70%)`,
                  }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{ background: `hsl(var(--${g.type}))` }}
                  >
                    <GameIcon title={g.title} type={g.type} className="h-8 w-8" />
                  </div>
                  {g.isPremium && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-white">
                      <Crown className="h-3 w-3" /> Plus
                    </span>
                  )}
                </div>
                <div className="p-3.5">
                  <p className="font-display text-[15px] font-bold text-ink">{g.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{g.teaser}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {g.estMinutes} Min
                    </span>
                  </div>
                </div>
              </Link>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

function isGameType(value: string): value is GameType {
  return value === "quiz" || value === "puzzle" || value === "psych";
}
