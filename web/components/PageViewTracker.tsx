"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logPageViewAction } from "@/lib/actions/analytics";

/** Unsichtbar im Root-Layout gemountet -- meldet jeden Seitenwechsel einmal.
 * Absichtlich nur `usePathname` (kein `useSearchParams`), damit weder eine
 * Suspense-Grenze nötig ist noch Query-Parameter mitgeloggt werden. */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    logPageViewAction(pathname, document.referrer || null).catch(() => null);
  }, [pathname]);

  return null;
}
