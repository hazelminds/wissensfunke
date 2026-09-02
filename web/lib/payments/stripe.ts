import "server-only";
import { getStripe } from "@/lib/stripe";
import type { CheckoutRequest, CheckoutResult, PaymentProvider, PaymentVerification } from "@/lib/payments/types";

/**
 * Stripe-Adapter — funktionsfähig und getestet (siehe Ebene-2-Commit), aber
 * auf Wunsch aktuell geparkt: micropayment.ch ist der primäre Anbieter
 * (siehe lib/payments/index.ts). Bleibt hier vollständig erhalten, falls
 * Stripe später zusätzlich oder stattdessen aktiviert wird — dann reicht
 * `PAYMENT_PROVIDER=stripe` in der Umgebung.
 */
export const stripeProvider: PaymentProvider = {
  id: "stripe",

  async createCheckout(request: CheckoutRequest): Promise<CheckoutResult> {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: request.currency,
            unit_amount: request.amountCents,
            product_data: {
              name: request.title,
              description: request.description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { quizSlug: request.quizSlug, userId: request.userId ?? "" },
      // Stripe ersetzt {CHECKOUT_SESSION_ID} im finalen Redirect selbst.
      success_url: `${request.successUrl}&ref={CHECKOUT_SESSION_ID}`,
      cancel_url: request.cancelUrl,
    });

    if (!session.url) {
      throw new Error("Stripe hat keine Checkout-URL zurückgegeben.");
    }

    return { redirectUrl: session.url, providerReference: session.id };
  },

  async verifyPayment(providerReference: string): Promise<PaymentVerification> {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(providerReference);

    return {
      paid: session.payment_status === "paid",
      quizSlug: session.metadata?.quizSlug ?? null,
      customerEmail: session.customer_details?.email ?? null,
      amountCents: session.amount_total ?? null,
      currency: session.currency ?? null,
      userId: session.metadata?.userId || null,
      secondaryReference:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
    };
  },
};
