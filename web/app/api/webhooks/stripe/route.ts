import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { upsertPurchase } from "@/lib/purchases";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: "Webhook nicht konfiguriert" }, { status: 400 });
  }

  const body = await request.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    return NextResponse.json({ error: `Signatur ungültig: ${message}` }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    const quizSlug = session.metadata?.quizSlug;
    if (quizSlug) {
      await upsertPurchase({
        provider: "stripe",
        providerReference: session.id,
        quizSlug,
        paid: session.payment_status === "paid",
        customerEmail: session.customer_details?.email ?? null,
        amountCents: session.amount_total ?? null,
        currency: session.currency ?? null,
        userId: session.metadata?.userId || null,
        secondaryReference:
          typeof session.payment_intent === "string" ? session.payment_intent : null,
      });
    }
  }

  return NextResponse.json({ received: true });
}
