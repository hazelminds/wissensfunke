import Link from "next/link";
import { games, levelMeta, type ProductLevel } from "@/content/games";
import { SiteHeader } from "@/components/SiteHeader";

const SECTION_ORDER: ProductLevel[] = ["daily-free", "weekly-freemium"];

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-14 px-5 pb-20 pt-8">
      <SiteHeader />
      <Hero />
      {SECTION_ORDER.map((level) => (
        <GameSection key={level} level={level} />
      ))}
      <SubscriptionTeaser />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="font-display text-[30px] leading-tight font-bold text-ink text-balance">
        Rätsel, Quiz &amp; Selbst-Tests — nur zur Unterhaltung
      </h1>
      <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
        Jeden Tag ein neues Gratis-Rätsel, jede Woche ein neuer Selbst-Test. Ohne
        Einsatz, ohne Gewinnchance — reine Unterhaltung mit optionalen
        Tiefenauswertungen für alle, die mehr wissen wollen.
      </p>
    </section>
  );
}

function GameSection({ level }: { level: ProductLevel }) {
  const meta = levelMeta[level];
  const items = games.filter((g) => g.level === level);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span
          className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${meta.badgeClass}`}
        >
          {meta.label}
        </span>
        <p className="text-[13px] text-ink-soft">{meta.description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((game) => (
          <GameCard key={game.slug} slug={game.slug} title={game.title} teaser={game.teaser} emoji={game.emoji} category={game.category} estMinutes={game.estMinutes} />
        ))}
      </div>
    </section>
  );
}

function GameCard({
  slug,
  title,
  teaser,
  emoji,
  category,
  estMinutes,
}: {
  slug: string;
  title: string;
  teaser: string;
  emoji: string;
  category: string;
  estMinutes: number;
}) {
  return (
    <Link
      href={`/quiz/${slug}`}
      className="group flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface p-4 shadow-[0_3px_0_var(--wf-line)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_5px_0_var(--wf-line)]"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-line bg-surface text-lg">
          {emoji}
        </span>
        <div>
          <p className="font-display text-[15px] font-semibold text-ink">{title}</p>
          <p className="text-[11.5px] font-bold tracking-wide text-muted uppercase">
            {category} · {estMinutes} Min.
          </p>
        </div>
      </div>
      <p className="text-[13.5px] leading-relaxed text-ink-soft">{teaser}</p>
    </Link>
  );
}

function SubscriptionTeaser() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-[17px] font-semibold text-ink">
          🏆 Power-User-Mini-Abo
        </h2>
        <p className="font-display text-[21px] font-bold text-gold-dark">
          bis 4,99&nbsp;€<span className="text-[13px] font-semibold text-muted"> / Monat</span>
        </p>
      </div>
      <ul className="flex flex-col gap-1.5 text-[13.5px] text-ink-soft">
        <li>✓ Alle Tiefenauswertungen statt Einzelkauf</li>
        <li>✓ Archiv aller bisherigen Rätsel &amp; Tests</li>
        <li>✓ Werbefrei</li>
        <li>✓ Streak-Schutz — ein verpasster Tag reißt den Streak nicht ab</li>
      </ul>
      <p className="text-[11.5px] font-semibold text-muted">
        Jederzeit mit einem Klick kündbar · 14 Tage Widerrufsrecht bei digitalen Inhalten
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line pt-6 text-[12px] text-muted">
      <p>
        Wissensfunke ist ein eigenständiges Unterhaltungsangebot ohne
        Gewinnmöglichkeit — kein Glücksspiel. Rechtstexte (Impressum,
        Datenschutz, AGB, Widerrufsbelehrung) folgen vor dem Livegang.
      </p>
    </footer>
  );
}
