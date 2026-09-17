"use server";

import { redirect } from "next/navigation";
import { getUnlockable } from "@/content/unlockables";
import { getPaymentProvider, PaymentProviderNotConfiguredError } from "@/lib/payments";
import { getCurrentUser } from "@/lib/auth";

/**
 * Server Action hinter dem "Freischalten"-Button. Der Preis wird serverseitig
 * aus content/unlockables.ts gelesen (nie vom Client übergeben) — sonst könnte
 * eine manipulierte Anfrage einen anderen Betrag erzwingen. Welcher Anbieter
 * (micropayment/Stripe) bedient wird, entscheidet lib/payments/index.ts.
 *
 * `formData` kommt automatisch von React, wenn diese Action per
 * `.bind(null, slug)` an ein <form action={...}> gehängt wird -- optionale
 * versteckte Felder (z. B. `von`/`name` bei Freundes-Kompatibilität) landen
 * hier und werden an success-/cancelUrl drangehängt, damit der
 * Vergleichs-Kontext den Bezahl-Redirect übersteht.
 */
export async function createUnlockCheckout(quizSlug: string, formData?: FormData) {
  const unlockable = getUnlockable(quizSlug);
  if (!unlockable) {
    throw new Error(`Unbekannter Inhalt: ${quizSlug}`);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const provider = getPaymentProvider();
  const user = await getCurrentUser();

  const extraParams = new URLSearchParams();
  const von = formData?.get("von");
  const name = formData?.get("name");
  if (typeof von === "string" && von) extraParams.set("von", von);
  if (typeof name === "string" && name) extraParams.set("name", name);
  const extraSuffix = extraParams.size > 0 ? `&${extraParams.toString()}` : "";

  let redirectUrl: string;
  try {
    const result = await provider.createCheckout({
      quizSlug,
      userId: user?.id ?? null,
      amountCents: unlockable.unlockPriceCents,
      currency: "eur",
      title: `${unlockable.unlockTitle} — ${unlockable.title}`,
      description: "Einmalkauf, digitaler Inhalt, sofortiger Zugriff. Kein Abo.",
      // § 356 Abs. 5 BGB: Widerrufsrecht erlischt bei digitalen Inhalten nur mit
      // ausdrücklicher, dokumentierter Zustimmung — Checkbox/Consent-Text folgt,
      // sobald die Rechtstexte stehen (siehe Briefing Abschnitt 8).
      // Anbieter hängen ihre eigene Referenz selbst an diese Basis-URL an
      // (Stripe z. B. per `{CHECKOUT_SESSION_ID}`-Templating) — siehe die
      // jeweilige createCheckout()-Implementierung in lib/payments/*.
      successUrl: `${siteUrl}/quiz/${quizSlug}?provider=${provider.id}${extraSuffix}`,
      cancelUrl: `${siteUrl}/quiz/${quizSlug}${extraParams.size > 0 ? `?${extraParams.toString()}` : ""}`,
    });
    redirectUrl = result.redirectUrl;
  } catch (err) {
    if (err instanceof PaymentProviderNotConfiguredError) {
      redirect(`/quiz/${quizSlug}?checkout_error=not_configured${extraSuffix}`);
    }
    throw err;
  }

  redirect(redirectUrl);
}
