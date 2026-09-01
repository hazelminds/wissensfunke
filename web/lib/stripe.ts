import Stripe from "stripe";

/**
 * Lazy Singleton statt Modul-Top-Level-Instanz: `new Stripe()` wirft sofort,
 * wenn der Key fehlt/kein String ist — das darf nicht beim Build (Next
 * wertet Route-Handler-Module während "Collecting page data" aus) passieren,
 * nur wenn eine Server-Aktion den Client tatsächlich benutzt.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (!cached) {
    cached = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-08-26.dahlia",
    });
  }
  return cached;
}
