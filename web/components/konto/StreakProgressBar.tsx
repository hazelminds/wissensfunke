import type { StreakBadge } from "@/content/streakBadges";

/** Fortschritt zur nächsten Streak-Stufe -- bewusst NICHT Plus-gegated,
 * anders als die Medaillen selbst (siehe BadgeGrid): soll auch Gratis-
 * Nutzer:innen mit Konto zum täglichen Wiederkommen motivieren, auch ohne
 * dass sie die Medaille schon einsammeln können. */
export function StreakProgressBar({ streakCount, nextBadge }: { streakCount: number; nextBadge: StreakBadge }) {
  const remaining = nextBadge.threshold - streakCount;
  const pct = Math.min(100, Math.round((streakCount / nextBadge.threshold) * 100));

  return (
    <div className="hairline mb-4 rounded-2xl bg-bg px-4 py-3.5">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-bold text-ink-soft">
          Noch {remaining} {remaining === 1 ? "Tag" : "Tage"} bis „{nextBadge.title}“
        </span>
        <span className="text-muted">
          {streakCount}/{nextBadge.threshold}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-coral transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
