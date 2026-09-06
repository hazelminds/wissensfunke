import { Trophy } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export default function BestenlistePage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto max-w-xl px-5 py-16 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
          Bestenliste
        </h1>
        <p className="mt-3 text-ink-soft">
          Sobald Nutzer:innen Runden spielen und Punkte sammeln, siehst du hier die Rangliste — mit
          voller Sichtbarkeit für Plus-Mitglieder. Kommt als Nächstes.
        </p>
      </main>
    </div>
  );
}
