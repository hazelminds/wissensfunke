import Link from "next/link";
import { Flame, Clock, Crown, Star } from "lucide-react";
import { games, gameTypeMeta } from "@/content/games";
import { GameIcon } from "@/lib/gameIcons";

export function FeaturedGames() {
  const featured = [...games].sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 6);

  return (
    <section className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-16 md:pt-20">
      <div className="mb-6 flex items-center gap-2">
        <Flame className="h-5 w-5 text-primary" />
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
          Gerade im Trend
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
        {featured.map((g) => {
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
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {g.estMinutes} Min
                  </span>
                  <span>· {gameTypeMeta[g.type].label}</span>
                  <span className="ml-auto flex items-center gap-0.5 text-primary">
                    <Star className="h-3 w-3 fill-current" /> 4.8
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
