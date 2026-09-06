import Link from "next/link";

/** Global im Root-Layout gerendert, damit Impressum & Co. von jeder Seite aus erreichbar sind. */
export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-coral">
                <span className="font-display text-lg leading-none font-extrabold text-white">
                  N
                </span>
              </span>
              <span className="font-display text-xl font-extrabold text-ink">Noggl</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Spiele &amp; Tests für Erwachsene. Rein zur Unterhaltung — kein Download, direkt im
              Browser. Kein Glücksspiel, keine Gewinnchance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-semibold text-ink">Inhalte</p>
              <ul className="flex flex-col gap-2 text-ink-soft">
                <li>
                  <Link href="/#spiele" className="hover:text-ink">
                    Spiele
                  </Link>
                </li>
                <li>
                  <Link href="/#tests" className="hover:text-ink">
                    Tests
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-ink">Rechtliches</p>
              <ul className="flex flex-col gap-2 text-ink-soft">
                <li>
                  <Link href="/rechtliches/impressum" className="hover:text-ink">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/rechtliches/datenschutz" className="hover:text-ink">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href="/rechtliches/agb" className="hover:text-ink">
                    AGB
                  </Link>
                </li>
                <li>
                  <Link href="/rechtliches/widerruf" className="hover:text-ink">
                    Widerruf
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-ink">Hinweis</p>
              <p className="leading-relaxed text-ink-soft">
                Keine Beratung oder Diagnose. Ergebnisse sind Unterhaltung. Rechtstexte liegen als
                Entwurf vor.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Hazelminds Communications Pte. Ltd.</span>
          <span>Made for short breaks.</span>
        </div>
      </div>
    </footer>
  );
}
