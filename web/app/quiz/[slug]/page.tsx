import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { getQuiz } from "@/content/quizzes";
import { getDailyQuizSet, getDailyRiddle } from "@/content/daily";
import { verifyUnlock } from "@/lib/purchases";
import { QuizPlayer } from "@/components/QuizPlayer";
import { DailyMiniQuiz } from "@/components/DailyMiniQuiz";
import { DailyRiddle } from "@/components/DailyRiddle";
import { SiteHeader } from "@/components/SiteHeader";

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ provider?: string; ref?: string; checkout_error?: string }>;
}) {
  const { slug } = await params;
  const { provider, ref: paymentRef, checkout_error: checkoutError } = await searchParams;

  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8 px-5 pt-8 pb-20">
      <SiteHeader backHref="/" showStreak={slug === "tages-raetsel" || slug === "tages-mini-quiz"} />
      <QuizContent slug={slug} game={game} provider={provider} paymentRef={paymentRef} checkoutError={checkoutError} />
    </div>
  );
}

async function QuizContent({
  slug,
  game,
  provider,
  paymentRef,
  checkoutError,
}: {
  slug: string;
  game: (typeof games)[number];
  provider?: string;
  paymentRef?: string;
  checkoutError?: string;
}) {
  if (slug === "tages-mini-quiz") {
    return <DailyMiniQuiz quizSet={getDailyQuizSet()} />;
  }
  if (slug === "tages-raetsel") {
    return <DailyRiddle riddle={getDailyRiddle()} />;
  }

  const quiz = getQuiz(slug);
  if (quiz) {
    const unlocked = provider && paymentRef ? await verifyUnlock(provider, paymentRef, slug) : false;
    return (
      <QuizPlayer quiz={quiz} initiallyUnlocked={unlocked} checkoutError={checkoutError === "not_configured"} />
    );
  }

  return <ComingSoon title={game.title} emoji={game.emoji} teaser={game.teaser} />;
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
