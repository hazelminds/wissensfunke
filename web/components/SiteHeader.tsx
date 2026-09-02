import Link from "next/link";
import { StreakBadge } from "@/components/StreakBadge";

export function SiteHeader({ backHref, showStreak = false }: { backHref?: string; showStreak?: boolean }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#9b8cff] text-lg shadow-[0_4px_0_var(--wf-primary-dark)]">
          ⚡
        </span>
        <span className="font-display text-lg font-bold text-ink">Wissensfunke</span>
      </Link>
      <div className="flex items-center gap-3">
        {showStreak && <StreakBadge />}
        {backHref && (
          <Link href={backHref} className="text-[13px] font-bold text-primary-dark">
            ← Übersicht
          </Link>
        )}
      </div>
    </header>
  );
}
