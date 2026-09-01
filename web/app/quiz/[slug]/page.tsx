import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/content/games";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 px-5 pt-8 pb-20">
      <Link href="/" className="text-[13px] font-bold text-primary-dark">
        ← Zurück zur Übersicht
      </Link>
      <div className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface p-6">
        <span className="text-3xl">{game.emoji}</span>
        <h1 className="font-display text-2xl font-bold text-ink">{game.title}</h1>
        <p className="text-[15px] leading-relaxed text-ink-soft">{game.teaser}</p>
        <p className="w-fit rounded-full bg-primary-soft px-3 py-1.5 text-[12.5px] font-bold text-primary-dark">
          Der Spielablauf für {game.title} wird im nächsten Schritt gebaut.
        </p>
      </div>
    </div>
  );
}
