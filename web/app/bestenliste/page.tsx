import { Trophy } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { LeaderboardBoard } from "@/components/LeaderboardBoard";

export default function BestenlistePage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto max-w-xl px-5 py-16">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Bestenlisten</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink">
          Wer spielt am besten?
        </h1>
        <p className="mt-2 text-ink-soft">
          Getrennte Ranglisten für Quiz und Puzzle — mit Zeit und Zügen, exklusiv für Plus.
        </p>

        <div className="mt-8">
          <LeaderboardBoard />
        </div>

        <p className="mt-6 text-xs text-muted">
          Beispieldaten -- echte Werte erscheinen hier, sobald Runden gespielt werden.
        </p>
      </main>
    </div>
  );
}
