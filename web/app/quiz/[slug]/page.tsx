import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Crown, Lock, ArrowRight, Zap } from "lucide-react";
import { games } from "@/content/games";
import { getQuiz } from "@/content/quizzes";
import { getDailyQuizSet, getDailyRiddle } from "@/content/daily";
import {
  getDailyWhoAmIRound,
  getRandomWhoAmIRound,
  getWhoAmIRoundsByDifficulty,
  type WhoAmIDifficulty,
} from "@/content/whoami";
import { verifyUnlock, hasUserPurchased } from "@/lib/purchases";
import { getCurrentUser } from "@/lib/auth";
import { getPlusStatus } from "@/lib/plus";
import { getSeenQuestions } from "@/lib/seenQuestionsServer";
import { pickUnseen } from "@/lib/seenQuestions";
import { getPsychTest } from "@/content/psychTests";
import { getCrosswordPool, getRandomCrossword, type CrosswordDifficulty } from "@/content/crossword";
import { QuizPlayer } from "@/components/QuizPlayer";
import { DailyMiniQuiz } from "@/components/DailyMiniQuiz";
import { DailyRiddle } from "@/components/DailyRiddle";
import { SiteHeader } from "@/components/SiteHeader";
import { DailyCapGate } from "@/components/DailyCapGate";
import { PlusButton } from "@/components/PlusButton";
import { SlidingPuzzle } from "@/components/game/SlidingPuzzle";
import { WhoAmI } from "@/components/game/WhoAmI";
import { Crossword } from "@/components/game/Crossword";
import { RelationshipTest } from "@/components/game/RelationshipTest";
import { FriendCompatibility } from "@/components/game/FriendCompatibility";
import { PsychResultTest } from "@/components/game/PsychResultTest";
import { formatPrice } from "@/content/quizzes";
import { plusTiers } from "@/content/plus";

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

  // Wirklich nur einen Schritt zurück, nicht auf die Startseite: die drei
  // "Wer bin ich?"-Stufen kommen von der eigenen Auswahlseite, die beiden
  // täglichen Anker haben keine Kategorie (nur von der Startseite verlinkt),
  // alles andere kommt aus der jeweiligen Kategorie-Übersicht.
  const backHref =
    slug === "wer-bin-ich-leicht" || slug === "wer-bin-ich-mittel" || slug === "wer-bin-ich-schwer"
      ? "/quiz/wer-bin-ich"
      : slug === "tages-raetsel" || slug === "tages-mini-quiz"
        ? "/"
        : `/kategorie/${game.type}`;

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" showStreak={slug === "tages-raetsel" || slug === "tages-mini-quiz"} />
      <main className="mx-auto flex max-w-xl flex-col gap-8 px-5 pt-8 pb-20">
        <Link
          href={backHref}
          className="-mb-4 inline-flex w-fit items-center gap-1.5 text-sm text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
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
  // Einziger wirklich unbegrenzter Anker: das Tagesrätsel. Alles andere,
  // inklusive Tages-Mini-Quiz und "Wer bin ich? · Leicht", zählt zu den
  // 2 Gratis-Runden/Tag für Gäste und eingeloggte Nicht-Plus-Nutzer:innen.
  if (slug === "tages-raetsel") {
    return <DailyRiddle riddle={getDailyRiddle()} />;
  }

  // Ab hier: Weekly-Freemium-Spiele -- unterliegen dem 2-Gratis-Runden-Limit,
  // AUSSER für echte Plus-Mitglieder (Admin-Geschenk oder später echtes Abo).
  const user = await getCurrentUser();
  const plusActive = previewUnlocked || (user ? (await getPlusStatus(user.id)).active : false);

  if (slug === "tages-mini-quiz") {
    return (
      <DailyCapGate plusActive={plusActive}>
        <DailyMiniQuiz quizSet={getDailyQuizSet()} />
      </DailyCapGate>
    );
  }

  if (game.variant === "sliding") {
    return (
      <DailyCapGate plusActive={plusActive}>
        <SlidingPuzzle slug={slug} title={game.title} color={game.type} difficulty={game.difficulty} />
      </DailyCapGate>
    );
  }

  if (game.variant === "crossword") {
    const difficulty: CrosswordDifficulty =
      game.difficulty === "hard" ? "schwer" : game.difficulty === "medium" ? "mittel" : "leicht";

    // "Schwer" ist echt Plus-exklusiv -- kein Gratis-Anteil wie sonst überall
    // (DailyCapGate), sondern ein harter Wall ganz ohne Vorschau-Runden.
    if (game.level === "subscriber-only" && !plusActive) {
      return <PlusOnlyLock title={game.title} />;
    }

    const pool = getCrosswordPool(difficulty);
    let puzzle;
    let pendingSeenKeys: string[] | undefined;
    if (user) {
      // Kontogebundenes "schon gesehen" wie bei Wissens-Quiz/Wer-bin-ich --
      // dieselbe Tabelle, hier pro ganzem Rätsel (Puzzle-ID) statt pro Frage.
      const seenKeys = await getSeenQuestions(user.id, slug);
      const { picked, nextSeen } = pickUnseen(pool, 1, new Set(seenKeys), (p) => p.id);
      puzzle = picked[0];
      pendingSeenKeys = [...nextSeen];
    } else {
      // Gäste: rein zufällig, wie bei "Wer bin ich?" -- kein Tracking ohne Konto.
      puzzle = getRandomCrossword(difficulty);
    }
    if (!puzzle) return <ComingSoon title={game.title} emoji={game.emoji} teaser={game.teaser} />;
    // Leicht/Mittel zählen zu den 2 Gratis-Runden/Tag wie alle anderen
    // Weekly-Freemium-Spiele. "Schwer" ist oben schon abgefangen -- hier
    // unten sind wir für Schwer also immer schon plusActive.
    return (
      <DailyCapGate plusActive={plusActive}>
        <Crossword slug={slug} title={game.title} puzzle={puzzle} pendingSeenKeys={pendingSeenKeys} />
      </DailyCapGate>
    );
  }

  if (game.variant === "whoami") {
    const difficulty = (game.difficulty ?? "easy") as WhoAmIDifficulty;
    // Leicht ist der tägliche Gratis-Anker (ein Rätsel/Tag, wie Tagesrätsel) --
    // Mittel/Schwer sind Plus-exklusiv mit beliebig vielen Runden/Tag.
    let round;
    let pendingSeenKeys: string[] | undefined;
    if (game.level === "daily-free") {
      round = getDailyWhoAmIRound(difficulty);
    } else if (user) {
      // Kontogebundenes "schon gesehen" wie bei den Wissens-Quiz -- dieselbe
      // Tabelle, hier nur pro ganzer Runde (Rätsel-Slug) statt pro Frage.
      // Persistiert wird clientseitig in WhoAmI (nie während des Renderns).
      const pool = getWhoAmIRoundsByDifficulty(difficulty);
      const seenKeys = await getSeenQuestions(user.id, slug);
      const { picked, nextSeen } = pickUnseen(pool, 1, new Set(seenKeys), (r) => r.slug);
      round = picked[0];
      pendingSeenKeys = [...nextSeen];
    } else {
      round = getRandomWhoAmIRound(difficulty);
    }
    if (!round) return <ComingSoon title={game.title} emoji={game.emoji} teaser={game.teaser} />;
    const player = (
      <WhoAmI
        slug={slug}
        title={game.title}
        color={game.type}
        round={round}
        pendingSeenKeys={pendingSeenKeys}
      />
    );
    // "Leicht" zeigt zwar das immer gleiche Tagesrätsel (siehe oben), zählt
    // aber -- anders als das Tagesrätsel selbst -- zu den 2 Gratis-Runden/Tag.
    return <DailyCapGate plusActive={plusActive}>{player}</DailyCapGate>;
  }

  if (game.variant === "psych-generic") {
    const test = getPsychTest(slug);
    if (!test) return <ComingSoon title={game.title} emoji={game.emoji} teaser={game.teaser} />;
    return (
      <DailyCapGate plusActive={plusActive}>
        <PsychResultTest test={test} plusActive={plusActive} />
      </DailyCapGate>
    );
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
    // Kontogebundenes "schon gesehen" nur für eingeloggte Nutzer:innen laden --
    // Gäste (undefined) fallen in QuizPlayer auf localStorage zurück.
    const initialSeenKeys = user ? await getSeenQuestions(user.id, slug) : undefined;
    return (
      <DailyCapGate plusActive={plusActive}>
        <QuizPlayer
          quiz={quiz}
          initiallyUnlocked={unlocked}
          checkoutError={checkoutError === "not_configured"}
          initialSeenKeys={initialSeenKeys}
        />
      </DailyCapGate>
    );
  }

  return <ComingSoon title={game.title} emoji={game.emoji} teaser={game.teaser} />;
}

/**
 * Echter Plus-Wall ohne Gratis-Runden -- anders als DailyCapGate (2 Runden
 * gratis, danach Paywall) läuft hier serverseitig `plusActive` direkt in die
 * Blockade, kein Client-State/useEffect nötig.
 */
function PlusOnlyLock({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-md px-5 py-20 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
        <Lock className="h-8 w-8 text-primary" />
      </div>
      <p className="text-sm text-muted">Exklusiv für Plus</p>
      <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-ink-soft">
        Das große Rätsel mit mindestens 25 Begriffen ist Plus-Mitgliedern vorbehalten — ganz ohne
        Gratis-Runde. Hol dir Plus und leg direkt los.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <PlusButton className="hairline flex w-full items-center justify-between gap-3 rounded-2xl bg-surface p-4 text-left transition hover:border-primary/50">
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
              <Zap className="h-5 w-5 text-primary" />
            </span>
            <span>
              <span className="block font-display font-bold text-ink">Heute freischalten</span>
              <span className="block text-xs text-muted">
                {formatPrice(plusTiers[0].priceCents)} · einmalig, nur für heute
              </span>
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
        </PlusButton>

        <PlusButton className="glow-primary flex w-full items-center justify-between gap-3 rounded-2xl bg-primary p-4 text-left text-white transition hover:opacity-90">
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Crown className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display font-bold">Plus-Abo</span>
              <span className="block text-xs text-white/80">
                {formatPrice(plusTiers[1].priceCents)}/Monat · dauerhaft unbegrenzt + volle Bestenliste
              </span>
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </PlusButton>
      </div>
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
