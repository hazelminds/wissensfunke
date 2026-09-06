import { Shield, ShieldOff } from "lucide-react";
import type { AdminUserRow } from "@/lib/adminData";
import { AdminUserExportButton } from "@/components/admin/AdminUserExportButton";
import { grantAdminAction, revokeAdminAction } from "@/lib/actions/admin";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE");
}

function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export function AdminUserTable({
  users,
  currentUserId,
}: {
  users: AdminUserRow[];
  currentUserId: string;
}) {
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
                <th className="px-4 py-3 font-semibold">Rechte</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-muted">
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
                    <td className="px-4 py-3">
                      {u.isBootstrapAdmin ? (
                        <span
                          title="Admin über ADMIN_EMAILS -- hier nicht entziehbar"
                          className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white"
                        >
                          <Shield className="h-3 w-3" /> Admin (fest)
                        </span>
                      ) : u.isAdmin ? (
                        <form action={revokeAdminAction}>
                          <input type="hidden" name="userId" value={u.id} />
                          <button
                            type="submit"
                            disabled={u.id === currentUserId}
                            className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <ShieldOff className="h-3 w-3" /> Admin entziehen
                          </button>
                        </form>
                      ) : (
                        <form action={grantAdminAction}>
                          <input type="hidden" name="userId" value={u.id} />
                          <button
                            type="submit"
                            className="hairline inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-ink transition hover:bg-bg"
                          >
                            <Shield className="h-3 w-3" /> Zum Admin machen
                          </button>
                        </form>
                      )}
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
