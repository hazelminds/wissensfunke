"use client";

import { usePlusModal } from "@/components/PlusModalProvider";

/** Ersetzt jeden Link, dessen Zweck ist, "Plus entdecken" zu zeigen -- öffnet
 * das Modal statt zu /konto zu navigieren. Übernimmt exakt die Optik der
 * jeweiligen Stelle über `className`/`children`. */
export function PlusButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  /** Läuft vor dem Öffnen -- z. B. um ein Mobile-Menü zu schließen. */
  onClick?: () => void;
}) {
  const { openPlusModal } = usePlusModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openPlusModal();
      }}
    >
      {children}
    </button>
  );
}
