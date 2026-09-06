import Link from "next/link";
import { Trophy, Crown, User as UserIcon, LogIn } from "lucide-react";
import { StreakBadge } from "@/components/StreakBadge";
import { NavbarMobileMenu } from "@/components/NavbarMobileMenu";
import { getCurrentUser } from "@/lib/auth";
import { getServerStreak } from "@/lib/streak-server";
import { signOut } from "@/lib/actions/auth";

/** Navbar im Base44-Aufbau: Logo, Nav-Links, Bestenliste, Plus-CTA, Konto/Anmelden. */
export async function SiteHeader({
  backHref,
  showStreak = false,
}: {
  backHref?: string;
  showStreak?: boolean;
}) {
  const user = await getCurrentUser();
  const serverStreak = showStreak && user ? await getServerStreak(user.id) : null;
  const username = (user?.user_metadata?.username as string | undefined) ?? user?.email ?? null;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[hsl(var(--background)/0.7)] backdrop-blur-xl">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="glow-primary flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-coral">
            <span className="font-display text-lg leading-none font-extrabold text-white">N</span>
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">Noggl</span>
          {backHref && (
            <Link
              href={backHref}
              className="ml-3 hidden text-[13px] font-bold text-primary-dark sm:inline"
            >
              ← Übersicht
            </Link>
          )}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#spiele" className="text-sm text-ink-soft transition-colors hover:text-ink">
            Spiele
          </Link>
          <Link href="/#tests" className="text-sm text-ink-soft transition-colors hover:text-ink">
            Tests
          </Link>
          <Link
            href="/bestenliste"
            className="flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <Trophy className="h-4 w-4" /> Bestenliste
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          {showStreak && (
            <StreakBadge serverCount={user ? (serverStreak?.count ?? 0) : undefined} />
          )}
          <Link
            href="/konto"
            className="glow-primary hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:inline-flex"
          >
            <Crown className="h-4 w-4" /> Plus
          </Link>
          {user ? (
            <>
              <Link
                href="/konto"
                className="hairline hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface sm:inline-flex"
              >
                <UserIcon className="h-4 w-4" /> {username || "Konto"}
              </Link>
              <form action={signOut} className="hidden sm:block">
                <button
                  type="submit"
                  className="text-[12px] font-bold text-muted hover:text-primary-dark"
                >
                  Abmelden
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="hairline hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface sm:inline-flex"
            >
              <LogIn className="h-4 w-4" /> Anmelden
            </Link>
          )}
          <NavbarMobileMenu isLoggedIn={!!user} username={username} />
        </div>
      </div>
    </header>
  );
}
