"use client";

import { useState } from "react";

/**
 * Checkbox + Kaufbutton für jeden "Freischalten"-Einstieg (digitale
 * Einmalkäufe). § 356 Abs. 5 BGB: das Widerrufsrecht erlischt nur, wenn die
 * Person VOR dem Kauf ausdrücklich zustimmt, dass die Freischaltung sofort
 * beginnt, und zur Kenntnis nimmt, dass sie dadurch ihr Widerrufsrecht
 * verliert -- beides in einer Checkbox statt zwei einschüchternden Kästchen
 * (so handhaben's auch größere Anbieter digitaler Inhalte). Button bleibt
 * deaktiviert, bis angehakt; serverseitig prüft createUnlockCheckout das
 * zusätzlich nach (siehe lib/actions/checkout.ts).
 */
export function UnlockPurchaseForm({
  action,
  hiddenFields,
  buttonClassName,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  hiddenFields?: Record<string, string>;
  buttonClassName: string;
  children: React.ReactNode;
}) {
  const [accepted, setAccepted] = useState(false);

  return (
    <form action={action} className="flex flex-col gap-2.5">
      {hiddenFields &&
        Object.entries(hiddenFields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
      <label className="flex items-start gap-2 text-left text-[11.5px] leading-snug text-muted">
        <input
          type="checkbox"
          name="widerrufVerzicht"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          Ich stimme zu, dass die Freischaltung sofort beginnt, bevor die 14-tägige
          Widerrufsfrist abläuft — mir ist bewusst, dass ich dadurch mein Widerrufsrecht für
          diesen Kauf verliere.
        </span>
      </label>
      <button type="submit" disabled={!accepted} className={`${buttonClassName} disabled:cursor-not-allowed disabled:opacity-40`}>
        {children}
      </button>
    </form>
  );
}
