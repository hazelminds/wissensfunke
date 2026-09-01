import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { getQuiz } from "@/content/quizzes";
import { verifyUnlock } from "@/lib/purchases";
import { QuizPlayer } from "@/components/QuizPlayer";
import { SiteHeader } from "@/components/SiteHeader";

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { slug } = await params;
  const { session_id: sessionId } = await searchParams;

  const quiz = getQuiz(slug);
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  const unlocked = sessionId ? await verifyUnlock(sessionId, slug) : false;

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8 px-5 pt-8 pb-20">
      <SiteHeader backHref="/" />
      {quiz ? (
        <QuizPlayer quiz={quiz} initiallyUnlocked={unlocked} />
      ) : (
        <ComingSoon title={game.title} emoji={game.emoji} teaser={game.teaser} />
      )}
    </div>
  );
}

function ComingSoon({ title, emoji, teaser }: { title: string; emoji: string; teaser: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface p-6">
      <span className="text-3xl">{emoji}</span>
      <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
      <p className="text-[15px] leading-relaxed text-ink-soft">{teaser}</p>
      <p className="w-fit rounded-full bg-primary-soft px-3 py-1.5 text-[12.5px] font-bold text-primary-dark">
        Der Spielablauf für {title} wird im nächsten Schritt gebaut.
      </p>
    </div>
  );
}
