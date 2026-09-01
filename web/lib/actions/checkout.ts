"use server";

import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { getQuiz } from "@/content/quizzes";

/**
 * Server Action hinter dem "Freischalten"-Button. Der Preis wird serverseitig
 * aus content/quizzes.ts gelesen (nie vom Client übergeben) — sonst könnte
 * eine manipulierte Anfrage einen anderen Betrag erzwingen.
 */
export async function createUnlockCheckout(quizSlug: string) {
  const quiz = getQuiz(quizSlug);
  if (!quiz) {
    throw new Error(`Unbekanntes Quiz: ${quizSlug}`);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: quiz.unlockPriceCents,
          product_data: {
            name: `${quiz.unlockTitle} — ${quiz.title}`,
            description:
              "Einmalkauf, digitaler Inhalt, sofortiger Zugriff. Kein Abo.",
          },
        },
        quantity: 1,
      },
    ],
    metadata: { quizSlug },
    success_url: `${siteUrl}/quiz/${quizSlug}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/quiz/${quizSlug}`,
    // § 356 Abs. 5 BGB: Widerrufsrecht erlischt bei digitalen Inhalten nur mit
    // ausdrücklicher, dokumentierter Zustimmung — Checkbox/Consent-Text folgt,
    // sobald die Rechtstexte stehen (siehe Briefing Abschnitt 8).
  });

  if (!session.url) {
    throw new Error("Stripe hat keine Checkout-URL zurückgegeben.");
  }

  redirect(session.url);
}
