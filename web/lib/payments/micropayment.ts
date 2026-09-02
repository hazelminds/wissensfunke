import "server-only";
import { PaymentProviderNotConfiguredError } from "@/lib/payments/types";
import type { CheckoutRequest, CheckoutResult, PaymentProvider, PaymentVerification } from "@/lib/payments/types";

/**
 * micropayment.ch-Adapter — bewusst als Gerüst angelegt, NICHT lauffähig.
 *
 * Ich konnte die verbindliche API-Referenz (techdoc.micropayment.ch) aus
 * dieser Sandbox nicht abrufen (Netzwerk-Egress blockiert Anfragen an
 * micropayment.ch/.de komplett). Öffentlich auffindbarer Beispielcode ist
 * entweder ein leerer Platzhalter (github.com/micropayment/payment-api,
 * Stand: "TODO: Coming soon") oder ~15 Jahre alt und referenziert die alte
 * Debit-only-NVP-API — beides taugt nicht als Vorlage für eine echte
 * Zahlungsintegration.
 *
 * Was ich aus Suchtreffern zur aktuellen ControlCenter-Terminologie
 * zusammentragen konnte (wahrscheinlich, aber ungeprüft):
 *   - Es gibt eine "Project ID" (ControlCenter → Configuration → Projects)
 *   - Es gibt einen "Access key" (ControlCenter → Configuration → Access key)
 *   - Pro Projekt/Zahlungsmethode gibt es ein separates "secret" für die
 *     Notification-URL (ControlCenter → Payment methods → Configure
 *     project → Notification URL)
 *   - Zahlungen laufen vermutlich über eine gehostete Payment Page
 *     (Redirect, ähnlich Stripe Checkout), mit Rücksprung auf
 *     Success-/Cancel-URL und serverseitigem Notify-Callback
 *
 * TODO(MP) — sobald die Doku vorliegt, hier eintragen:
 *   1. Basis-URL der Payment-Page bzw. des Checkout-Endpunkts
 *   2. Exakte Parameternamen beim Erstellen einer Zahlung (Projekt-ID,
 *      Betrag/Währung, Beschreibung, Success-/Cancel-/Notify-URL, ...)
 *   3. Response-Format (Redirect-URL direkt? JSON mit Transaktions-ID?)
 *   4. Hash-/Signaturformel für die Notification (welche Felder, welcher
 *      Algorithmus, welches Secret)
 *   5. Endpunkt/Parameter, um eine Transaktion serverseitig nach Status
 *      abzufragen (Pendant zu Stripes `checkout.sessions.retrieve`)
 *
 * Env-Variablen sind in .env.example bereits vorgesehen
 * (MICROPAYMENT_PROJECT_ID, MICROPAYMENT_ACCESS_KEY, MICROPAYMENT_SECRET).
 */
export const micropaymentProvider: PaymentProvider = {
  id: "micropayment",

  async createCheckout(_request: CheckoutRequest): Promise<CheckoutResult> {
    throw new PaymentProviderNotConfiguredError(
      "micropayment",
      "API-Details (Endpunkt, Parameter, Hash-Verfahren) fehlen noch — siehe TODO(MP) in lib/payments/micropayment.ts.",
    );
  },

  async verifyPayment(_providerReference: string): Promise<PaymentVerification> {
    throw new PaymentProviderNotConfiguredError(
      "micropayment",
      "API-Details (Endpunkt, Parameter, Hash-Verfahren) fehlen noch — siehe TODO(MP) in lib/payments/micropayment.ts.",
    );
  },
};
