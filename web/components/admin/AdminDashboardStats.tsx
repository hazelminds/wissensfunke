import { Users, ShoppingBag, Coins, Flame } from "lucide-react";
import type { AdminStats } from "@/lib/adminData";

function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export function AdminDashboardStats({ stats }: { stats: AdminStats }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi icon={<Users className="h-5 w-5" />} label="Registrierte Nutzer" value={stats.totalUsers} />
        <Kpi icon={<ShoppingBag className="h-5 w-5" />} label="Bezahlte Käufe" value={stats.totalPurchases} />
        <Kpi icon={<Coins className="h-5 w-5" />} label="Umsatz gesamt" value={formatEuro(stats.totalRevenueCents)} />
        <Kpi
          icon={<Flame className="h-5 w-5" />}
          label="Meistgekauft"
          value={stats.topQuizSlug ?? "—"}
          small
        />
      </div>

      <div className="hairline mt-6 rounded-2xl bg-surface p-5 text-sm text-ink-soft">
        Charts zu Trefferquote und Beliebtheit pro Thema kommen, sobald das Punkte-Tracking
        (scores-Tabelle) live ist — die Kennzahlen oben sind bereits echt, aus Supabase Auth und
        den Käufen.
      </div>
    </div>
  );
}

function Kpi({ icon, label, value, small }: { icon: React.ReactNode; label: string; value: string | number; small?: boolean }) {
  return (
    <div className="hairline rounded-2xl bg-surface p-4">
      <div className="flex items-center gap-2 text-muted">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
          {icon}
        </span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className={`mt-3 font-display font-extrabold text-ink ${small ? "truncate text-base" : "text-2xl"}`}>
        {value}
      </p>
    </div>
  );
}
