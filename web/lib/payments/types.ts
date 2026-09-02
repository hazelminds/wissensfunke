/**
 * Provider-neutrale Schnittstelle für Einmalkäufe. Ein Provider (Stripe,
 * micropayment.ch, ...) muss nur diese zwei Methoden implementieren — der
 * Rest der App (Server Action, Webhook, Erfolgsseite) kennt keine
 * anbieterspezifischen Details mehr.
 */

export interface CheckoutRequest {
  quizSlug: string;
  amountCents: number;
  currency: "eur" | "chf";
  title: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  /** URL, zu der der Nutzer weitergeleitet wird (Stripe Checkout, micropayment Payment Page, ...). */
  redirectUrl: string;
  /** Anbieter-eigene Referenz (Session-/Transaktions-ID) — wird in `purchases.provider_reference` gespeichert. */
  providerReference: string;
}

export interface PaymentVerification {
  paid: boolean;
  quizSlug: string | null;
  customerEmail: string | null;
  amountCents: number | null;
  currency: string | null;
  /** Zweite Referenz des Anbieters (z. B. Stripe payment_intent), falls vorhanden. */
  secondaryReference: string | null;
}

export interface PaymentProvider {
  readonly id: "stripe" | "micropayment";
  createCheckout(request: CheckoutRequest): Promise<CheckoutResult>;
  /** Fragt den Zahlungsstatus einer Referenz beim Anbieter ab (Self-Heal, falls der Webhook noch nicht da war). */
  verifyPayment(providerReference: string): Promise<PaymentVerification>;
}

export class PaymentProviderNotConfiguredError extends Error {
  constructor(providerId: string, detail: string) {
    super(`Zahlungsanbieter „${providerId}“ ist noch nicht konfiguriert: ${detail}`);
    this.name = "PaymentProviderNotConfiguredError";
  }
}
