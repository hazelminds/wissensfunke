import Link from "next/link";
import { CalendarDays, Clock, Crown, ArrowRight } from "lucide-react";
import { games, gameTypeMeta, type GameModule } from "@/content/games";

const typeColorVar: Record<string, string> = {
  quiz: "--quiz",
  puzzle: "--puzzle",
  psych: "--psych",
};

/** Deterministisch: ein Spiel pro Kalendertag, rotiert durch den Pool (wie im Base44-Vorbild). */
function pickGameOfDay(): GameModule | null {
  const active = [...games].sort((a, b) => a.sortOrder - b.sortOrder);
  if (!active.length) return null;
  const dayIndex = Math.floor(Date.now() / 86400000);
  return active[dayIndex % active.length];
}

function formatTodayLabel(): string {
  return new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function GameOfDay() {
  const game = pickGameOfDay();
  if (!game) return null;

  const colorVar = typeColorVar[game.type];
  const today = formatTodayLabel();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 md:pt-14">
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
          Spiel des Tages
        </h2>
        <span className="ml-auto text-xs text-muted capitalize">{today}</span>
      </div>

      <Link
        href={`/quiz/${game.slug}`}
        className="hairline group block overflow-hidden rounded-3xl transition-colors hover:border-primary/50"
      >
        <div
          className="relative px-6 py-8 md:px-10 md:py-10"
          style={{
            background: `linear-gradient(120deg, hsl(var(${colorVar}) / 0.22), hsl(var(--card)) 70%)`,
          }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl text-white shadow-lg"
              style={{ background: `hsl(var(${colorVar}))` }}
            >
              {game.emoji}
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2 text-xs text-muted">
                <span
                  className="font-semibold tracking-wide uppercase"
                  style={{ color: `hsl(var(${colorVar}))` }}
                >
                  {gameTypeMeta[game.type].label}
                </span>
                {game.isPremium && (
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    <Crown className="h-3 w-3" /> Plus
                  </span>
                )}
              </div>
              <p className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
                {game.title}
              </p>
              <p className="mt-1.5 max-w-lg leading-relaxed text-ink-soft">{game.teaser}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {game.estMinutes} Min
                </span>
                <span>· Heute im Fokus</span>
              </div>
            </div>
            <div className="glow-primary inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition group-hover:opacity-90 sm:ml-auto">
              Jetzt spielen <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
