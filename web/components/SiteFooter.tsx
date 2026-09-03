import Link from "next/link";

/** Global im Root-Layout gerendert, damit Impressum & Co. von jeder Seite aus erreichbar sind. */
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line px-5 py-8 text-[12px] text-muted">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-x-4 gap-y-1.5 font-bold">
          <Link href="/rechtliches/impressum" className="hover:text-primary-dark">
            Impressum
          </Link>
          <Link href="/rechtliches/datenschutz" className="hover:text-primary-dark">
            Datenschutz
          </Link>
          <Link href="/rechtliches/agb" className="hover:text-primary-dark">
            AGB
          </Link>
          <Link href="/rechtliches/widerruf" className="hover:text-primary-dark">
            Widerruf
          </Link>
        </nav>
        <p>© {new Date().getFullYear()} Hazelminds Communications Pte. Ltd.</p>
      </div>
    </footer>
  );
}
