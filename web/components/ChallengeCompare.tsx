import { Swords } from "lucide-react";
import { formatTimeLabel } from "@/lib/formatTime";

/** Kopfzeile eines Challenge-Links: zeigt, wer die Runde verschickt hat und
 * mit welchem Ergebnis -- bevor man selbst überhaupt angefangen hat. */
export function ChallengeBanner({ name, points, seconds }: { name: string; points: number; seconds: number }) {
  return (
    <div className="hairline flex items-center gap-2.5 rounded-2xl bg-primary-soft px-4 py-3.5 text-sm text-primary-dark">
      <Swords className="h-4 w-4 shrink-0" />
      <p>
        <strong>{name}</strong> hat dir eine Challenge geschickt: {points} Punkte in{" "}
        {formatTimeLabel(seconds)} — schlag sie!
      </p>
    </div>
  );
}

/** Ergebnis-Vergleich nach einer abgeschlossenen Challenge-Runde. */
export function ChallengeCompare({
  myPoints,
  mySeconds,
  opponentName,
  opponentPoints,
  opponentSeconds,
}: {
  myPoints: number;
  mySeconds: number;
  opponentName: string;
  opponentPoints: number;
  opponentSeconds: number;
}) {
  const verdict =
    myPoints > opponentPoints
      ? "Du gewinnst! 🎉"
      : myPoints < opponentPoints
        ? `${opponentName} gewinnt.`
        : "Unentschieden!";

  return (
    <div className="hairline flex flex-col gap-3 rounded-2xl bg-primary-soft p-4 text-primary-dark">
      <p className="flex items-center gap-2 font-display font-bold">
        <Swords className="h-4 w-4" /> {verdict}
      </p>
      <div className="flex items-center justify-between gap-3 text-[13px]">
        <span>
          Du: <strong>{myPoints} Punkte</strong>
          <br />
          <span className="text-xs">{formatTimeLabel(mySeconds)}</span>
        </span>
        <span className="text-right">
          {opponentName}: <strong>{opponentPoints} Punkte</strong>
          <br />
          <span className="text-xs">{formatTimeLabel(opponentSeconds)}</span>
        </span>
      </div>
    </div>
  );
}
