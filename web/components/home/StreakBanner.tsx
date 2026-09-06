import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getServerStreak } from "@/lib/streak-server";

export async function StreakBanner() {
  const user = await getCurrentUser();
  if (!user) return null;

  const streak = await getServerStreak(user.id);
  if (streak.count < 1) return null;

  const today = new Date().toDateString();
  const last = streak.lastCompletedDate ? new Date(streak.lastCompletedDate).toDateString() : null;
  const playedToday = last === today;

  return (
    <section className="mx-auto max-w-6xl px-5 pt-8">
      <div className="hairline flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-primary/15 via-surface to-surface p-5 sm:flex-row sm:items-center md:p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20">
          <Flame className="h-6 w-6 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-extrabold text-ink">
            Deine Serie: {streak.count} {streak.count === 1 ? "Tag" : "Tage"}
          </p>
          <p className="text-sm text-ink-soft">
            {playedToday
              ? "Super, heute schon gespielt — Serie gehalten. Komm morgen wieder."
              : "Spiel heute eine Runde, damit deine Serie nicht zurückgesetzt wird."}
          </p>
        </div>
        <Link
          href="/#spiele"
          className="glow-primary inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:ml-auto"
        >
          {playedToday ? "Mehr spielen" : "Serie retten"} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
