"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { PlusModal } from "@/components/PlusModal";

interface PlusModalContextValue {
  openPlusModal: () => void;
}

const PlusModalContext = createContext<PlusModalContextValue | null>(null);

/** Einmal in app/layout.tsx montiert -- macht "Plus entdecken" von überall im
 * Baum aufrufbar, ohne href="/konto"-Umwege oder Prop-Drilling. */
export function PlusModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openPlusModal = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openPlusModal }), [openPlusModal]);

  return (
    <PlusModalContext.Provider value={value}>
      {children}
      <PlusModal open={open} onClose={() => setOpen(false)} />
    </PlusModalContext.Provider>
  );
}

export function usePlusModal(): PlusModalContextValue {
  const ctx = useContext(PlusModalContext);
  if (!ctx) throw new Error("usePlusModal muss innerhalb von PlusModalProvider verwendet werden.");
  return ctx;
}
