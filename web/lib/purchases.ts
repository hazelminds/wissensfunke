import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getPaymentProvider } from "@/lib/payments";
import type { PaymentVerification } from "@/lib/payments/types";

interface UpsertPurchaseInput extends PaymentVerification {
  provider: string;
  providerReference: string;
}

/**
 * Schreibt/aktualisiert die Kauf-Zeile für eine Provider-Referenz (Stripe-
 * Session-ID, micropayment-Transaktions-ID, ...). Wird vom jeweiligen
 * Webhook aufgerufen UND als Self-Heal von `verifyUnlock`.
 */
export async function upsertPurchase(input: UpsertPurchaseInput) {
  if (!input.quizSlug) return;

  const supabase = getSupabaseAdmin();
  await supabase.from("purchases").upsert(
    {
      quiz_slug: input.quizSlug,
      provider: input.provider,
      provider_reference: input.providerReference,
      provider_secondary_reference: input.secondaryReference,
      customer_email: input.customerEmail,
      user_id: input.userId,
      amount_cents: input.amountCents ?? 0,
      currency: input.currency ?? "eur",
      status: input.paid ? "paid" : "pending",
      paid_at: input.paid ? new Date().toISOString() : null,
    },
    { onConflict: "provider,provider_reference" },
  );
}

/** Eingeloggte Nutzer bleiben dauerhaft freigeschaltet, unabhängig von der URL. */
export async function hasUserPurchased(userId: string, quizSlug: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("quiz_slug", quizSlug)
    .eq("status", "paid")
    .limit(1)
    .maybeSingle();
  return Boolean(data);
}

/**
 * Prüft, ob eine Provider-Referenz ein bezahlter Kauf für genau dieses Quiz
 * ist. Erst die DB (schnell, kein Roundtrip zum Anbieter), sonst direkt
 * beim Anbieter nachfragen und die DB dabei gleich nachziehen.
 */
export async function verifyUnlock(
  provider: string,
  providerReference: string,
  quizSlug: string,
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("purchases")
    .select("status, quiz_slug")
    .eq("provider", provider)
    .eq("provider_reference", providerReference)
    .maybeSingle();

  if (data && data.quiz_slug === quizSlug) {
    return data.status === "paid";
  }

  const activeProvider = getPaymentProvider();
  if (activeProvider.id !== provider) return false;

  const verification = await activeProvider.verifyPayment(providerReference);
  if (verification.quizSlug !== quizSlug) return false;

  await upsertPurchase({ ...verification, provider, providerReference });
  return verification.paid;
}
