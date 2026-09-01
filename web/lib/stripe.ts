import Stripe from "stripe";

/**
 * Einziger Stripe-Server-Client. Nur in Server-Kontexten importieren
 * (Route Handlers, Server Actions) — der Secret Key darf nie ins Bundle
 * des Browsers gelangen.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-08-26.dahlia",
});
