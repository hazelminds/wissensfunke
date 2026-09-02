"use client";

import { useEffect, useState } from "react";
import { readStreak } from "@/lib/streak";

/**
 * `serverCount` kommt vom SiteHeader für eingeloggte Nutzer (Quelle der
 * Wahrheit, per Server Component vorab geladen). Ist er `undefined`
 * (nicht eingeloggt / nicht konfiguriert), wird nach dem Mount aus
 * localStorage nachgeladen — SSR kennt localStorage nicht, deshalb der
 * Umweg über einen Effect statt eines Lazy-Initializers.
 */
export function StreakBadge({ serverCount }: { serverCount?: number }) {
  const [count, setCount] = useState<number | null>(serverCount ?? null);

  useEffect(() => {
    if (serverCount !== undefined) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(readStreak().count);
  }, [serverCount]);

  if (!count) return null;

  return (
    <span className="flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1.5 text-[12.5px] font-bold text-gold-dark">
      🔥 {count} {count === 1 ? "Tag" : "Tage"} Streak
    </span>
  );
}
