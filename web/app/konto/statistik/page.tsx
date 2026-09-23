import Link from "next/link";
import { BarChart3, Crown, HelpCircle, Puzzle, ScrollText, Sparkles, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "@/components/LoginForm";
import { WeeklyRecapCard } from "@/components/WeeklyRecapCard";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/auth";
import { getPlusStatus } from "@/lib/plus";
import { getUserStats, getWeeklyRecap } from "@/lib/stats";
import { formatTimeLabel } from "@/lib/scores";

export default async function StatistikPage() {
  const user = await getCurrentUser();
  const stats = user ? await getUserStats(user.id) : null;
  const weeklyRecap = user ? await getWeeklyRecap(user.id) : null;
  const plusActive = user ? (await getPlusStatus(user.id)).active : false;

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/konto" />
      <main className="mx-auto max-w-xl px-5 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">Deine Statistik</h1>
            <p className="text-sm text-ink-soft">Alles, was du bisher gespielt hast, auf einen Blick.</p>
          </div>
        </div>

        {!user ? (
          <div className="hairline rounded-3xl bg-surface p-5">
            <p className="mb-4 text-sm text-ink-soft">
              Melde dich an, um deine Statistik zu sehen — sie sammelt sich mit jeder gespielten Runde.
            </p>
            {isSupabaseConfigured() ? (
              <LoginForm />
            ) : (
              <p className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
                ⚙️ Die Anmeldung wird gerade eingerichtet — komm bald wieder.
              </p>
            )}
          </div>
        ) : !stats || stats.totalRounds === 0 ? (
          <div className="hairline flex flex-col items-center gap-3 rounded-3xl bg-surface p-8 text-center">
            <span className="text-4xl">🎲</span>
            <p className="font-display font-bold text-ink">Noch keine Runde gespielt</p>
            <p className="text-sm text-ink-soft">
              Spiel eine Runde — deine Statistik füllt sich danach von ganz allein.
            </p>
            <Link
              href="/#spiele"
              className="btn-3d btn-3d-primary mt-2 px-5 py-2.5 text-sm"
            >
              Jetzt spielen
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <StatTile
                icon={<Sparkles className="h-4.5 w-4.5 text-primary" />}
                label="Runden gespielt"
                value={String(stats.totalRounds)}
              />
              <StatTile
                icon={<Trophy className="h-4.5 w-4.5 text-primary" />}
                label="Bester Punktestand"
                value={stats.bestScore ? `${stats.bestScore.points}` : "—"}
                sub={stats.bestScore?.title}
              />
              <StatTile
                icon={<Puzzle className="h-4.5 w-4.5 text-primary" />}
                label="Lieblingsspiel"
                value={stats.favoriteGame?.title ?? "—"}
                sub={stats.favoriteGame ? `${stats.favoriteGame.count}× gespielt` : undefined}
              />
              <StatTile
                icon={<ScrollText className="h-4.5 w-4.5 text-primary" />}
                label="Diese Woche"
                value={`${stats.roundsThisWeek} ${stats.roundsThisWeek === 1 ? "Runde" : "Runden"}`}
                sub={
                  stats.roundsThisWeek > stats.roundsLastWeek
                    ? `▲ mehr als letzte Woche (${stats.roundsLastWeek})`
                    : stats.roundsThisWeek < stats.roundsLastWeek
                      ? `▼ weniger als letzte Woche (${stats.roundsLastWeek})`
                      : `= wie letzte Woche (${stats.roundsLastWeek})`
                }
              />
            </div>

            {weeklyRecap && <WeeklyRecapCard recap={weeklyRecap} plusActive={plusActive} />}

            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-wide text-muted uppercase">Nach Spielart</p>

              {stats.quiz.count > 0 && (
                <GameStatRow
                  emoji="🧠"
                  title="Wissens-Quiz"
                  lines={[
                    `${stats.quiz.count} ${stats.quiz.count === 1 ? "Runde" : "Runden"} gespielt`,
                    `Ø ${stats.quiz.avgPoints} Punkte`,
                    stats.quiz.best ? `Beste Runde: ${stats.quiz.best.points} Punkte (${stats.quiz.best.title})` : null,
                  ]}
                />
              )}

              {stats.crossword.count > 0 && (
                <GameStatRow
                  emoji="📝"
                  title="Kreuzworträtsel"
                  lines={[
                    `${stats.crossword.count} ${stats.crossword.count === 1 ? "Rätsel" : "Rätsel"} gelöst`,
                    stats.crossword.bestTimeSeconds !== null
                      ? `Schnellste Zeit: ${formatTimeLabel(stats.crossword.bestTimeSeconds)} Min.`
                      : null,
                  ]}
                />
              )}

              {stats.sliding.count > 0 && (
                <GameStatRow
                  emoji="🧩"
                  title="Schiebepuzzle"
                  lines={[
                    `${stats.sliding.count} ${stats.sliding.count === 1 ? "Puzzle" : "Puzzle"} gelöst`,
                    stats.sliding.bestTimeSeconds !== null
                      ? `Schnellste Zeit: ${formatTimeLabel(stats.sliding.bestTimeSeconds)} Min.`
                      : null,
                    stats.sliding.bestMoves !== null ? `Wenigste Züge: ${stats.sliding.bestMoves}` : null,
                  ]}
                />
              )}

              {stats.whoami.count > 0 && (
                <GameStatRow
                  emoji="🕵️"
                  title="Wer bin ich?"
                  lines={[`${stats.whoami.count} ${stats.whoami.count === 1 ? "Runde" : "Runden"} gespielt`]}
                />
              )}
            </div>

            <p className="flex items-center gap-1.5 text-xs text-muted">
              <HelpCircle className="h-3.5 w-3.5 shrink-0" />
              Zählt nur, was du eingeloggt gespielt hast — Runden als Gast fehlen hier.
            </p>

            <Link
              href="/bestenliste"
              className="hairline flex items-center gap-2.5 rounded-2xl px-4 py-3.5 text-sm font-semibold text-ink-soft transition hover:text-ink"
            >
              <Crown className="h-4 w-4 text-gold" /> Zur Bestenliste
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="hairline rounded-2xl bg-surface p-4">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15">{icon}</div>
      <p className="text-[11px] font-bold tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-0.5 truncate font-display text-base font-extrabold text-ink">{value}</p>
      {sub && <p className="mt-0.5 truncate text-[11px] text-muted">{sub}</p>}
    </div>
  );
}

function GameStatRow({
  emoji,
  title,
  lines,
}: {
  emoji: string;
  title: string;
  lines: (string | null)[];
}) {
  return (
    <div className="hairline rounded-2xl bg-surface p-4">
      <p className="mb-1.5 flex items-center gap-2 font-display font-bold text-ink">
        <span className="text-lg leading-none">{emoji}</span> {title}
      </p>
      <div className="flex flex-col gap-0.5">
        {lines
          .filter((l): l is string => l !== null)
          .map((line, i) => (
            <p key={i} className="text-[13px] text-ink-soft">
              {line}
            </p>
          ))}
      </div>
    </div>
  );
}
