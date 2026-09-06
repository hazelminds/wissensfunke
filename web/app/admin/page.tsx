import { ShieldAlert } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurrentUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { getAdminStats, listAdminUsers } from "@/lib/adminData";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { AdminDashboardStats } from "@/components/admin/AdminDashboardStats";
import { AdminUserTable } from "@/components/admin/AdminUserTable";
import { AdminGamesTable } from "@/components/admin/AdminGamesTable";

export default async function AdminPage() {
  const user = await getCurrentUser();
  const isAdmin = isAdminEmail(user?.email);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-bg">
        <SiteHeader backHref="/" />
        <main className="mx-auto max-w-md px-5 py-24 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-soft">
            <ShieldAlert className="h-7 w-7 text-red" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Kein Zugriff</h1>
          <p className="mt-2 text-sm text-ink-soft">
            {user
              ? "Dieser Bereich ist nur für Administratoren."
              : "Bitte melde dich mit deinem Admin-Konto an."}
          </p>
        </main>
      </div>
    );
  }

  const [stats, users] = await Promise.all([getAdminStats(), listAdminUsers()]);

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">Admin</h1>
        <p className="mt-1 text-sm text-ink-soft">Spiele, Fragen und Benutzer verwalten.</p>

        <AdminTabs
          dashboard={<AdminDashboardStats stats={stats} />}
          games={<AdminGamesTable />}
          users={<AdminUserTable users={users} />}
        />
      </main>
    </div>
  );
}
