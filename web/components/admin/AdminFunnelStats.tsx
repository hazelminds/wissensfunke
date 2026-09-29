import { Eye, Gamepad2, UserPlus, ShoppingBag, Crown } from "lucide-react";
import type { FunnelStats } from "@/lib/funnel";

const STAGES: {
  key: keyof Pick<FunnelStats, "totalRegisteredUsers" | "usersWhoPlayed" | "usersWhoPurchased" | "usersWithActivePlus">;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: "totalRegisteredUsers", label: "Registriert", icon: <UserPlus className="h-4 w-4" /> },
  { key: "usersWhoPlayed", label: "Hat gespielt", icon: <Gamepad2 className="h-4 w-4" /> },
  { key: "usersWhoPurchased", label: "Hat gekauft", icon: <ShoppingBag className="h-4 w-4" /> },
  { key: "usersWithActivePlus", label: "Hat Plus", icon: <Crown className="h-4 w-4" /> },
];

export function AdminFunnelStats({ stats }: { stats: FunnelStats }) {
  const base = Math.max(1, stats.totalRegisteredUsers);

  return (
    <div>
      <div className="hairline rounded-2xl bg-surface p-5">
        <h3 className="mb-1 font-display font-bold text-ink">Trichter: registrierte Nutzer</h3>
        <p className="mb-4 text-[12.5px] text-muted">
          Von allen jemals registrierten Nutzern, wie viele haben je Stufe erreicht (Gesamtbestand, nicht auf
          einen Zeitraum begrenzt). Plus wird aktuell nur verschenkt, nicht direkt gekauft -- diese Stufe zeigt
          den aktuell aktiven Bestand.
        </p>

        <div className="flex flex-col gap-3">
          {STAGES.map((stage) => {
            const value = stats[stage.key];
            const pct = Math.round((value / base) * 100);
            return (
              <div key={stage.key} className="flex items-center gap-3">
                <span className="flex w-[130px] shrink-0 items-center gap-1.5 text-[13px] font-bold text-ink">
                  <span className="text-primary">{stage.icon}</span>
                  {stage.label}
                </span>
                <div className="h-6 flex-1 overflow-hidden rounded-full bg-bg">
                  <div
                    className="flex h-full items-center rounded-full bg-gradient-to-r from-primary to-coral px-2.5 transition-[width] duration-500"
                    style={{ width: `${Math.max(6, pct)}%` }}
                  >
                    <span className="text-[11px] font-bold whitespace-nowrap text-white">{value}</span>
                  </div>
                </div>
                <span className="w-[46px] shrink-0 text-right text-[12px] font-bold text-muted">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hairline mt-4 rounded-2xl bg-surface p-5">
        <h3 className="mb-1 flex items-center gap-2 font-display font-bold text-ink">
          <Eye className="h-4 w-4 text-primary" /> Top of Funnel (30 Tage)
        </h3>
        <p className="mb-4 text-[12.5px] text-muted">
          Seitenaufrufe und Spielstarts insgesamt -- ohne Cookie/Session-ID lassen sich Gäste nicht als
          eindeutige Besucher zählen, nur als Volumen.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <Kpi label="Seitenaufrufe" value={stats.pageViews30d} />
          <Kpi label="Spielstarts (Gast)" value={stats.gameStartsGuest30d} />
          <Kpi label="Spielstarts (eingeloggt)" value={stats.gameStartsRegistered30d} />
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="hairline rounded-xl bg-bg p-3">
      <p className="text-[11px] font-medium text-muted">{label}</p>
      <p className="mt-1 font-display text-xl font-extrabold text-ink">{value}</p>
    </div>
  );
}
