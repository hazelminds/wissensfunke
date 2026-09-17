import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { getQuiz } from "@/content/quizzes";
import { getDailyQuizSet, getDailyRiddle } from "@/content/daily";
import { getDailyWhoAmIRound, getRandomWhoAmIRound, type WhoAmIDifficulty } from "@/content/whoami";
import { verifyUnlock, hasUserPurchased } from "@/lib/purchases";
import { getCurrentUser } from "@/lib/auth";
import { getPlusStatus } from "@/lib/plus";
import { QuizPlayer } from "@/components/QuizPlayer";
import { DailyMiniQuiz } from "@/components/DailyMiniQuiz";
import { DailyRiddle } from "@/components/DailyRiddle";
import { SiteHeader } from "@/components/SiteHeader";
import { DailyCapGate } from "@/components/DailyCapGate";
import { SlidingPuzzle } from "@/components/game/SlidingPuzzle";
import { WhoAmI } from "@/components/game/WhoAmI";
import { RelationshipTest } from "@/components/game/RelationshipTest";
import { FriendCompatibility } from "@/components/game/FriendCompatibility";

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    provider?: string;
    ref?: string;
    checkout_error?: string;
    preview?: string;
    von?: string;
    name?: string;
  }>;
}) {
  const { slug } = await params;
  const {
    provider,
    ref: paymentRef,
    checkout_error: checkoutError,
    preview,
    von: friendCode,
    name: friendName,
  } = await searchParams;

  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  // Test-Vorschau: ?preview=plus zeigt die freigeschaltete Ansicht, ohne
  // echten Kauf/Login -- nur zum Gegenprüfen des Plus-Ergebnisses, keine
  // echte Berechtigungsprüfung.
  const previewUnlocked = preview === "plus";

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" showStreak={slug === "tages-raetsel" || slug === "tages-mini-quiz"} />
      <main className="mx-auto flex max-w-xl flex-col gap-8 px-5 pt-8 pb-20">
        {previewUnlocked && (
          <div className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
            🔍 Test-Vorschau aktiv — zeigt die Ansicht eines freigeschalteten/Plus-Mitglieds. Kein
            echter Kauf, keine echte Berechtigung.
          </div>
        )}
        <QuizContent
          slug={slug}
          game={game}
          provider={provider}
          paymentRef={paymentRef}
          checkoutError={checkoutError}
          previewUnlocked={previewUnlocked}
          friendCode={friendCode}
          friendName={friendName}
        />
      </main>
    </div>
  );
}

async function QuizContent({
  slug,
  game,
  provider,
  paymentRef,
  checkoutError,
  previewUnlocked,
  friendCode,
  friendName,
}: {
  slug: string;
  game: (typeof games)[number];
  provider?: string;
  paymentRef?: string;
  checkoutError?: string;
  previewUnlocked: boolean;
  friendCode?: string;
  friendName?: string;
}) {
  if (slug === "tages-mini-quiz") {
    return <DailyMiniQuiz quizSet={getDailyQuizSet()} />;
  }
  if (slug === "tages-raetsel") {
    return <DailyRiddle riddle={getDailyRiddle()} />;
  }

  // Ab hier: Weekly-Freemium-Spiele -- unterliegen dem 2-Gratis-Runden-Limit,
  // AUSSER für echte Plus-Mitglieder (Admin-Geschenk oder später echtes Abo).
  const user = await getCurrentUser();
  const plusActive = previewUnlocked || (user ? (await getPlusStatus(user.id)).active : false);

  if (game.variant === "sliding") {
    return (
      <DailyCapGate plusActive={plusActive}>
        <SlidingPuzzle slug={slug} title={game.title} color={game.type} difficulty={game.difficulty} />
      </DailyCapGate>
    );
  }

  if (game.variant === "whoami") {
    const difficulty = (game.difficulty ?? "easy") as WhoAmIDifficulty;
    // Leicht ist der tägliche Gratis-Anker (ein Rätsel/Tag, wie Tagesrätsel) --
    // Mittel/Schwer sind Plus-exklusiv mit beliebig vielen Runden/Tag.
    const round =
      game.level === "daily-free" ? getDailyWhoAmIRound(difficulty) : getRandomWhoAmIRound(difficulty);
    if (!round) return <ComingSoon title={game.title} emoji={game.emoji} teaser={game.teaser} />;
    const player = <WhoAmI slug={slug} title={game.title} color={game.type} round={round} />;
    return game.level === "daily-free" ? player : <DailyCapGate plusActive={plusActive}>{player}</DailyCapGate>;
  }

  if (game.variant === "psych-result" || game.variant === "psych-compat") {
    const fromPayment = provider && paymentRef ? await verifyUnlock(provider, paymentRef, slug) : false;
    const unlocked = previewUnlocked || fromPayment || (user ? await hasUserPurchased(user.id, slug) : false);

    if (game.variant === "psych-result") {
      return (
        <DailyCapGate plusActive={plusActive}>
          <RelationshipTest
            title={game.title}
            initiallyUnlocked={unlocked}
            checkoutError={checkoutError === "not_configured"}
          />
        </DailyCapGate>
      );
    }

    return (
      <DailyCapGate plusActive={plusActive}>
        <FriendCompatibility
          title={game.title}
          sharedCode={friendCode}
          sharedName={friendName}
          initiallyUnlocked={unlocked}
          checkoutError={checkoutError === "not_configured"}
        />
      </DailyCapGate>
    );
  }

  const quiz = getQuiz(slug);
  if (quiz) {
    const fromPayment = provider && paymentRef ? await verifyUnlock(provider, paymentRef, slug) : false;
    const unlocked = previewUnlocked || fromPayment || (user ? await hasUserPurchased(user.id, slug) : false);
    return (
      <DailyCapGate plusActive={plusActive}>
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
