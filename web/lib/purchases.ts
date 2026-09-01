import "server-only";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Schreibt/aktualisiert die Kauf-Zeile für eine Stripe-Checkout-Session.
 * Wird vom Webhook aufgerufen (Normalfall) UND als Self-Heal von
 * `verifyUnlock` (falls die Erfolgsseite vor dem Webhook eintrifft, z. B.
 * lokal ohne `stripe listen`).
 */
export async function upsertPurchaseFromSession(session: Stripe.Checkout.Session) {
  const quizSlug = session.metadata?.quizSlug;
  if (!quizSlug) return;

  const supabase = getSupabaseAdmin();
  await supabase.from("purchases").upsert(
    {
      quiz_slug: quizSlug,
      stripe_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      customer_email: session.customer_details?.email ?? null,
      amount_cents: session.amount_total ?? 0,
      currency: session.currency ?? "eur",
      status: session.payment_status === "paid" ? "paid" : "pending",
      paid_at: session.payment_status === "paid" ? new Date().toISOString() : null,
    },
    { onConflict: "stripe_session_id" },
  );
}

/**
 * Prüft, ob eine Checkout-Session ein bezahlter Kauf für genau dieses Quiz
 * ist. Erst die DB (schnell, kein Stripe-Roundtrip), sonst direkt bei
 * Stripe nachfragen und die DB dabei gleich nachziehen.
 */
export async function verifyUnlock(sessionId: string, quizSlug: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("purchases")
    .select("status, quiz_slug")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (data && data.quiz_slug === quizSlug) {
    return data.status === "paid";
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.metadata?.quizSlug !== quizSlug) return false;

  await upsertPurchaseFromSession(session);
  return session.payment_status === "paid";
}
