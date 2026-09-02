"use client";

import { useEffect, useState } from "react";
import { readStreak } from "@/lib/streak";

/** Zeigt nichts beim ersten (Server-)Render, füllt sich nach dem Mount aus localStorage. */
export function StreakBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Bewusste Ausnahme: SSR kennt localStorage nicht, der erste Client-
    // Render muss also mit "nichts anzeigen" matchen (s. StartScreen-
    // Restore-Logik in QuizPlayer.tsx für dasselbe Muster).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(readStreak().count);
  }, []);

  if (!count) return null;

  return (
    <span className="flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1.5 text-[12.5px] font-bold text-gold-dark">
      🔥 {count} {count === 1 ? "Tag" : "Tage"} Streak
    </span>
  );
}
