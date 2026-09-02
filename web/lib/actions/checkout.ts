"use server";

import { redirect } from "next/navigation";
import { getQuiz } from "@/content/quizzes";
import { getPaymentProvider, PaymentProviderNotConfiguredError } from "@/lib/payments";
import { getCurrentUser } from "@/lib/auth";

/**
 * Server Action hinter dem "Freischalten"-Button. Der Preis wird serverseitig
 * aus content/quizzes.ts gelesen (nie vom Client übergeben) — sonst könnte
 * eine manipulierte Anfrage einen anderen Betrag erzwingen. Welcher Anbieter
 * (micropayment/Stripe) bedient wird, entscheidet lib/payments/index.ts.
 */
export async function createUnlockCheckout(quizSlug: string) {
  const quiz = getQuiz(quizSlug);
  if (!quiz) {
    throw new Error(`Unbekanntes Quiz: ${quizSlug}`);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const provider = getPaymentProvider();
  const user = await getCurrentUser();

  let redirectUrl: string;
  try {
    const result = await provider.createCheckout({
      quizSlug,
      userId: user?.id ?? null,
      amountCents: quiz.unlockPriceCents,
      currency: "eur",
      title: `${quiz.unlockTitle} — ${quiz.title}`,
      description: "Einmalkauf, digitaler Inhalt, sofortiger Zugriff. Kein Abo.",
      // § 356 Abs. 5 BGB: Widerrufsrecht erlischt bei digitalen Inhalten nur mit
      // ausdrücklicher, dokumentierter Zustimmung — Checkbox/Consent-Text folgt,
      // sobald die Rechtstexte stehen (siehe Briefing Abschnitt 8).
      // Anbieter hängen ihre eigene Referenz selbst an diese Basis-URL an
      // (Stripe z. B. per `{CHECKOUT_SESSION_ID}`-Templating) — siehe die
      // jeweilige createCheckout()-Implementierung in lib/payments/*.
      successUrl: `${siteUrl}/quiz/${quizSlug}?provider=${provider.id}`,
      cancelUrl: `${siteUrl}/quiz/${quizSlug}`,
    });
    redirectUrl = result.redirectUrl;
  } catch (err) {
    if (err instanceof PaymentProviderNotConfiguredError) {
      redirect(`/quiz/${quizSlug}?checkout_error=not_configured`);
    }
    throw err;
  }

  redirect(redirectUrl);
}
