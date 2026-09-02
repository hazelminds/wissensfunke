import Link from "next/link";
import { StreakBadge } from "@/components/StreakBadge";
import { getCurrentUser } from "@/lib/auth";
import { getServerStreak } from "@/lib/streak-server";
import { signOut } from "@/lib/actions/auth";

export async function SiteHeader({
  backHref,
  showStreak = false,
}: {
  backHref?: string;
  showStreak?: boolean;
}) {
  const user = await getCurrentUser();
  const serverStreak = showStreak && user ? await getServerStreak(user.id) : null;

  return (
    <header className="flex items-center justify-between gap-3">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#9b8cff] text-lg shadow-[0_4px_0_var(--nog-primary-dark)]">
          🧠
        </span>
        <span className="font-display text-lg font-bold text-ink">Noggl</span>
      </Link>
      <div className="flex items-center gap-3">
        {showStreak && <StreakBadge serverCount={user ? (serverStreak?.count ?? 0) : undefined} />}
        {backHref && (
          <Link href={backHref} className="text-[13px] font-bold text-primary-dark">
            ← Übersicht
          </Link>
        )}
        {user ? (
          <form action={signOut}>
            <button type="submit" className="text-[12px] font-bold text-muted hover:text-primary-dark">
              Abmelden
            </button>
          </form>
        ) : (
          <Link href="/login" className="text-[12px] font-bold text-primary-dark">
            Anmelden
          </Link>
        )}
      </div>
    </header>
  );
}
