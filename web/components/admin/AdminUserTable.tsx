import type { AdminUserRow } from "@/lib/adminData";
import { AdminUserExportButton } from "@/components/admin/AdminUserExportButton";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE");
}

function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export function AdminUserTable({ users }: { users: AdminUserRow[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">{users.length} Benutzer (aus Supabase Auth)</p>
        <AdminUserExportButton users={users} />
      </div>

      <div className="hairline overflow-hidden rounded-2xl bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">E-Mail</th>
                <th className="px-4 py-3 font-semibold">Registriert</th>
                <th className="px-4 py-3 font-semibold">Käufe</th>
                <th className="px-4 py-3 font-semibold">Umsatz</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-muted">
                    Keine Benutzer.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{u.email ?? "—"}</td>
                    <td className="px-4 py-3 text-muted">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3 text-ink">{u.purchaseCount || "—"}</td>
                    <td className="px-4 py-3 text-ink">
                      {u.purchaseTotalCents > 0 ? formatEuro(u.purchaseTotalCents) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
