import "server-only";
import type { PaymentProvider } from "@/lib/payments/types";
import { stripeProvider } from "@/lib/payments/stripe";
import { micropaymentProvider } from "@/lib/payments/micropayment";

const providers: Record<string, PaymentProvider> = {
  stripe: stripeProvider,
  micropayment: micropaymentProvider,
};

/**
 * Aktiver Zahlungsanbieter, per Env-Variable umschaltbar — kein Code-Umbau
 * nötig, um zwischen micropayment.ch und Stripe zu wechseln oder später
 * beide parallel anzubieten.
 */
export function getPaymentProvider(): PaymentProvider {
  const id = process.env.PAYMENT_PROVIDER ?? "micropayment";
  const provider = providers[id];
  if (!provider) {
    throw new Error(`Unbekannter PAYMENT_PROVIDER: "${id}". Erlaubt: ${Object.keys(providers).join(", ")}`);
  }
  return provider;
}

export { PaymentProviderNotConfiguredError } from "@/lib/payments/types";
