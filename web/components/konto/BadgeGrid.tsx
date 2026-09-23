import { Lock, type LucideIcon } from "lucide-react";

export interface BadgeItem {
  id: string;
  title: string;
  reached: boolean;
  subtitle: string;
}

/** Wiederverwendetes Raster für Medaillen-Übersichten (Streak, Runden, ...) --
 * gleiches Freischalt-Prinzip überall: sichtbar für alle, aber nur mit Plus
 * tatsächlich freigeschaltet (siehe Konto-Seite). */
export function BadgeGrid({ badges, plusActive, icon: Icon }: { badges: BadgeItem[]; plusActive: boolean; icon: LucideIcon }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {badges.map((badge) => {
        const unlocked = plusActive && badge.reached;
        return (
          <div
            key={badge.id}
            className={`hairline flex flex-col items-center gap-1.5 rounded-2xl p-3.5 text-center ${
              unlocked ? "bg-primary/15" : "bg-bg"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                unlocked ? "bg-primary text-white" : "bg-line text-muted"
              }`}
            >
              {unlocked ? <Icon className="h-4.5 w-4.5" /> : <Lock className="h-4 w-4" />}
            </div>
            <p className="text-[12.5px] leading-tight font-bold text-ink">{badge.title}</p>
            <p className="text-[11px] text-muted">{badge.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
