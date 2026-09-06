import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { getQuiz } from "@/content/quizzes";
import { getDailyQuizSet, getDailyRiddle } from "@/content/daily";
import { getWhoAmIRound } from "@/content/whoami";
import { verifyUnlock, hasUserPurchased } from "@/lib/purchases";
import { getCurrentUser } from "@/lib/auth";
import { QuizPlayer } from "@/components/QuizPlayer";
import { DailyMiniQuiz } from "@/components/DailyMiniQuiz";
import { DailyRiddle } from "@/components/DailyRiddle";
import { SiteHeader } from "@/components/SiteHeader";
import { DailyCapGate } from "@/components/DailyCapGate";
import { SlidingPuzzle } from "@/components/game/SlidingPuzzle";
import { WhoAmI } from "@/components/game/WhoAmI";

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

  // Ab hier: Weekly-Freemium-Spiele -- unterliegen dem 2-Gratis-Runden-Limit
  // für eingeloggte Nicht-Plus-Nutzer (Base44-Vorbild), Gäste sind frei.
  const user = await getCurrentUser();
  const isLoggedIn = !!user;

  if (game.variant === "sliding") {
    return (
      <DailyCapGate isLoggedIn={isLoggedIn}>
        <SlidingPuzzle title={game.title} color={game.type} difficulty={game.difficulty} />
      </DailyCapGate>
    );
  }

  if (game.variant === "whoami") {
    const round = getWhoAmIRound("einstein");
    if (!round) return <ComingSoon title={game.title} emoji={game.emoji} teaser={game.teaser} />;
    return (
      <DailyCapGate isLoggedIn={isLoggedIn}>
        <WhoAmI title={game.title} color={game.type} round={round} />
      </DailyCapGate>
    );
  }

  const quiz = getQuiz(slug);
  if (quiz) {
    const fromPayment = provider && paymentRef ? await verifyUnlock(provider, paymentRef, slug) : false;
    const unlocked = fromPayment || (user ? await hasUserPurchased(user.id, slug) : false);
    return (
      <DailyCapGate isLoggedIn={isLoggedIn}>
        <QuizPlayer
          quiz={quiz}
          initiallyUnlocked={unlocked}
          checkoutError={checkoutError === "not_configured"}
        />
      </DailyCapGate>
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
