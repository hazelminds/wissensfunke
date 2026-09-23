import Link from "next/link";
import { ArrowRight, BarChart3, Crown, Flame, LifeBuoy, LogOut, Snowflake, Sparkles, User as UserIcon } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "@/components/LoginForm";
import { PlusButton } from "@/components/PlusButton";
import { UsernameForm } from "@/components/konto/UsernameForm";
import { BadgeGrid } from "@/components/konto/BadgeGrid";
import { StreakProgressBar } from "@/components/konto/StreakProgressBar";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/auth";
import { getServerStreak, MAX_STREAK_FREEZES } from "@/lib/streak-server";
import { getPlusStatus } from "@/lib/plus";
import { getUnreadSupportCountForUser } from "@/lib/support";
import { getAchievementsSummary } from "@/lib/achievements";
import { signOut } from "@/lib/actions/auth";
import { updateUsernameAction } from "@/lib/actions/profile";
import { streakBadges } from "@/content/streakBadges";
import { roundBadges } from "@/content/roundBadges";

export default async function KontoPage() {
  const user = await getCurrentUser();
  const [streak, plus, unreadSupport, achievements] = await Promise.all([
    user ? getServerStreak(user.id) : null,
    user ? getPlusStatus(user.id) : null,
    user ? getUnreadSupportCountForUser(user.id) : 0,
    user ? getAchievementsSummary(user.id) : null,
  ]);
  const plusActive = plus?.active ?? false;
  const username = (user?.user_metadata?.username as string | undefined) ?? "";

  // Nächste noch nicht erreichte Streak-Stufe -- der Fortschrittsbalken
  // motiviert weiterzuspielen, unabhängig von Plus (die Medaille selbst
  // bleibt trotzdem Plus-exklusiv, siehe BadgeGrid unten).
  const nextStreakBadge = streakBadges.find((b) => (streak?.count ?? 0) < b.threshold) ?? null;

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto max-w-xl px-5 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
            <UserIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                Dein Konto
              </h1>
              {user && (
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    plusActive ? "bg-gold text-[hsl(28,40%,14%)]" : "hairline text-muted"
                  }`}
                >
                  {plusActive ? "Plus" : "Gratis"}
                </span>
              )}
            </div>
            {user && <p className="text-sm text-ink-soft">{user.email}</p>}
          </div>
        </div>

        {!user ? (
          <div className="hairline rounded-3xl bg-surface p-5">
            <p className="mb-4 text-sm text-ink-soft">
              Melde dich per Magic Link an, um deine Serie zu sehen und Plus freizuschalten.
            </p>
            {isSupabaseConfigured() ? (
              <LoginForm />
            ) : (
              <p className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
                ⚙️ Die Anmeldung wird gerade eingerichtet — komm bald wieder.
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {unreadSupport > 0 && (
              <Link
                href="/support"
                className="glow-primary flex items-center justify-between gap-3 rounded-2xl bg-primary p-4 text-left text-white transition hover:opacity-90"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <LifeBuoy className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display font-bold">
                      {unreadSupport === 1 ? "Neue Antwort vom Support" : `${unreadSupport} neue Antworten vom Support`}
                    </span>
                    <span className="block text-xs text-white/80">Jetzt ansehen</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            )}

            <div className="hairline rounded-3xl bg-surface p-5">
              <p className="flex items-center gap-2 font-display font-bold text-ink">
                <Crown className="h-4 w-4 text-gold" /> {plusActive ? "Plus-Status" : "Gratis-Status"}
              </p>
              <p className="mt-1.5 text-sm text-ink-soft">
                {plusActive
                  ? plus?.until
                    ? `Aktiv bis ${new Date(plus.until).toLocaleDateString("de-DE")}. Danke, dass du dabei bist!`
                    : "Dein Plus-Zugang ist aktiv. Danke, dass du dabei bist!"
                  : "Schalte Plus frei für die volle Bestenliste, deinen Spielernamen und zum Sammeln von Medaillen."}
              </p>
              {!plusActive && (
                <PlusButton className="glow-primary mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                  <Crown className="h-4 w-4" /> Plus entdecken
                </PlusButton>
              )}
            </div>

            <div className="hairline rounded-3xl bg-surface p-5">
              <div className="mb-1 flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-display font-bold text-ink">
                  <Flame className="h-4 w-4 text-primary" /> Deine Serie
                </p>
                <span className="text-xs font-bold text-muted">
                  {plusActive
                    ? `${streakBadges.filter((b) => (streak?.count ?? 0) >= b.threshold).length}/${streakBadges.length} Badges`
                    : `0/${streakBadges.length} Badges`}
                </span>
              </div>
              <p className="mb-4 text-sm text-ink-soft">
                Spiele täglich, um deine Serie auszubauen und neue Medaillen freizuschalten.
              </p>

              <div className="hairline mb-4 flex items-center justify-between rounded-2xl bg-bg px-4 py-3.5">
                <p className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
                  <Flame className="h-5 w-5 text-primary" />
                  {streak?.count ?? 0} {streak?.count === 1 ? "Tag" : "Tage"} in Folge
                </p>
                <p className="text-right text-xs text-muted">
                  Bestleistung
                  <br />
                  <span className="font-bold text-ink-soft">
                    {streak?.bestCount ?? 0} {streak?.bestCount === 1 ? "Tag" : "Tage"}
                  </span>
                </p>
              </div>

              {nextStreakBadge && <StreakProgressBar streakCount={streak?.count ?? 0} nextBadge={nextStreakBadge} />}

              <div
                className={`hairline mb-4 flex items-center gap-3 rounded-2xl px-4 py-3.5 ${
                  plusActive ? "bg-bg" : "bg-bg opacity-70"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    plusActive ? "bg-primary/15" : "bg-line"
                  }`}
                >
                  <Snowflake className={`h-4.5 w-4.5 ${plusActive ? "text-primary" : "text-muted"}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">
                    {plusActive
                      ? `${streak?.freezesAvailable ?? 0}/${MAX_STREAK_FREEZES} Streak-Schutz`
                      : "Streak-Schutz"}
                  </p>
                  <p className="text-xs text-muted">
                    {plusActive
                      ? "Rettet automatisch einen verpassten Tag, statt die Serie zu reißen. +1 pro Monat."
                      : "Nur mit Plus: rettet automatisch einen verpassten Tag."}
                  </p>
                </div>
              </div>

              <BadgeGrid
                icon={Flame}
                plusActive={plusActive}
                badges={streakBadges.map((badge) => {
                  const reached = (streak?.count ?? 0) >= badge.threshold;
                  return {
                    id: badge.id,
                    title: badge.title,
                    reached,
                    subtitle: plusActive ? (reached ? "Freigeschaltet" : `${badge.threshold} Tage übrig`) : "Nur mit Plus",
                  };
                })}
              />
            </div>

            <div className="hairline rounded-3xl bg-surface p-5">
              <div className="mb-1 flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-display font-bold text-ink">
                  <Sparkles className="h-4 w-4 text-primary" /> Weitere Medaillen
                </p>
                <span className="text-xs font-bold text-muted">
                  {plusActive
                    ? `${roundBadges.filter((b) => (achievements?.totalRounds ?? 0) >= b.threshold).length}/${roundBadges.length} Badges`
                    : `0/${roundBadges.length} Badges`}
                </span>
              </div>
              <p className="mb-4 text-sm text-ink-soft">
                Für jede gespielte Runde und für deine erste geknackte Bestleistung.
              </p>

              <div
                className={`hairline mb-4 flex items-center gap-3 rounded-2xl px-4 py-3.5 ${
                  plusActive ? "bg-bg" : "bg-bg opacity-70"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    plusActive && achievements?.hasFirstCrown ? "bg-primary/15" : "bg-line"
                  }`}
                >
                  <Crown
                    className={`h-4.5 w-4.5 ${plusActive && achievements?.hasFirstCrown ? "text-primary" : "text-muted"}`}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">Erste Krone</p>
                  <p className="text-xs text-muted">
                    {!plusActive
                      ? "Nur mit Plus: deine erste geknackte Bestleistung."
                      : achievements?.hasFirstCrown
                        ? "Freigeschaltet — du hast schon eine eigene Bestleistung übertroffen."
                        : "Schlag deine eigene Bestleistung in einem Spiel, um sie freizuschalten."}
                  </p>
                </div>
              </div>

              <BadgeGrid
                icon={Sparkles}
                plusActive={plusActive}
                badges={roundBadges.map((badge) => {
                  const reached = (achievements?.totalRounds ?? 0) >= badge.threshold;
                  return {
                    id: badge.id,
                    title: badge.title,
                    reached,
                    subtitle: plusActive
                      ? reached
                        ? "Freigeschaltet"
                        : `${badge.threshold - (achievements?.totalRounds ?? 0)} Runden übrig`
                      : "Nur mit Plus",
                  };
                })}
              />
            </div>

            <Link
              href="/konto/statistik"
              className="hairline flex items-center justify-between gap-3 rounded-2xl bg-surface p-4 text-left transition hover:border-primary/50"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-display font-bold text-ink">Deine Statistik</span>
                  <span className="block text-xs text-muted">Lieblingsspiel, Bestzeiten und mehr</span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
            </Link>

            <div className="hairline rounded-3xl bg-surface p-5">
              <p className="font-display font-bold text-ink">Spielername</p>
              <p className="mb-4 text-sm text-ink-soft">
                Wird in der Bestenliste angezeigt, sobald du Plus hast.
              </p>
              <UsernameForm action={updateUsernameAction} currentUsername={username} locked={!plusActive} />
            </div>

            {unreadSupport === 0 && (
              <Link
                href="/support"
                className="hairline inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
              >
                <LifeBuoy className="h-4 w-4" /> Support kontaktieren
              </Link>
            )}

            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
              >
                <LogOut className="h-4 w-4" /> Abmelden
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
