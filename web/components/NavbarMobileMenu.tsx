"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Trophy, Crown, User as UserIcon, LogIn } from "lucide-react";

export function NavbarMobileMenu({
  isLoggedIn,
  username,
}: {
  isLoggedIn: boolean;
  username: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="hairline flex h-10 w-10 items-center justify-center rounded-xl text-ink md:hidden"
        aria-label="Menü"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <nav className="absolute top-16 right-0 left-0 z-40 flex flex-col gap-1 border-t border-line bg-[hsl(var(--background))] px-5 py-4 md:hidden">
          <Link
            href="/#spiele"
            onClick={() => setOpen(false)}
            className="py-2.5 text-sm text-ink-soft hover:text-ink"
          >
            Spiele
          </Link>
          <Link
            href="/#tests"
            onClick={() => setOpen(false)}
            className="py-2.5 text-sm text-ink-soft hover:text-ink"
          >
            Tests
          </Link>
          <Link
            href="/bestenliste"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 py-2.5 text-sm text-ink-soft hover:text-ink"
          >
            <Trophy className="h-4 w-4" /> Bestenliste
          </Link>
          <Link
            href="/konto"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Crown className="h-4 w-4" /> Plus entdecken
          </Link>
          {isLoggedIn ? (
            <Link
              href="/konto"
              onClick={() => setOpen(false)}
              className="hairline mt-2 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink"
            >
              <UserIcon className="h-4 w-4" /> {username || "Konto"}
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="hairline mt-2 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink"
            >
              <LogIn className="h-4 w-4" /> Anmelden
            </Link>
          )}
        </nav>
      )}
    </>
  );
}
