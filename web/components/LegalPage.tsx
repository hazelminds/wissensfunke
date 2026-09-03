import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * Gemeinsames Gerüst für Impressum/Datenschutz/AGB/Widerruf. Der
 * Entwurfs-Hinweis ist absichtlich unübersehbar — diese Texte sind
 * Platzhalter, keine geprüfte Rechtsberatung (siehe README/Handover).
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-5 pt-8 pb-20">
      <SiteHeader backHref="/" />

      <div className="flex flex-col gap-2 rounded-2xl border-2 border-gold bg-gold-soft px-5 py-4 text-[13px] leading-relaxed text-gold-dark">
        <p className="font-display text-[13px] font-bold uppercase tracking-wide">
          ⚠️ Entwurf — noch nicht rechtsverbindlich geprüft
        </p>
        <p>
          Dieser Text ist eine erste Fassung zur internen Vorbereitung. Er ersetzt keine
          Rechtsberatung und darf erst nach Prüfung durch eine Rechtsanwältin bzw. einen
          Rechtsanwalt (und für steuerliche Fragen ggf. eine Steuerberatung) live gehen.
        </p>
      </div>

      <article className="flex flex-col gap-6">
        <header className="flex flex-col gap-1.5">
          <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
          <p className="text-[12px] font-semibold text-muted">Stand: {updated} · Entwurf</p>
        </header>
        <div className="legal-prose flex flex-col gap-5 text-[14.5px] leading-relaxed text-ink-soft">
          {children}
        </div>
      </article>

      <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-6 text-[12.5px] font-bold text-primary-dark">
        <Link href="/rechtliches/impressum">Impressum</Link>
        <Link href="/rechtliches/datenschutz">Datenschutz</Link>
        <Link href="/rechtliches/agb">AGB</Link>
        <Link href="/rechtliches/widerruf">Widerruf</Link>
      </nav>
    </div>
  );
}
