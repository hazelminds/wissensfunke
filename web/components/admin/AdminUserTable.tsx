import { Crown, Shield, ShieldOff, XCircle } from "lucide-react";
import type { AdminUserRow } from "@/lib/adminData";
import { AdminUserExportButton } from "@/components/admin/AdminUserExportButton";
import {
  grantAdminAction,
  revokeAdminAction,
  grantPlusAction,
  revokePlusAction,
  createTestUserAction,
} from "@/lib/actions/admin";
import { AdminCreateTestUserForm } from "@/components/admin/AdminCreateTestUserForm";

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
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">{users.length} Benutzer (aus Supabase Auth)</p>
        <div className="flex items-center gap-3">
          <AdminCreateTestUserForm action={createTestUserAction} />
          <AdminUserExportButton users={users} />
        </div>
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
                <th className="px-4 py-3 font-semibold">Plus</th>
                <th className="px-4 py-3 font-semibold">Rechte</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-muted">
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
                      <div className="flex flex-col gap-1.5">
                        {u.plusActive && u.plusUntil ? (
                          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gold-soft px-2.5 py-1 text-xs font-semibold text-gold-dark">
                            <Crown className="h-3 w-3" /> bis {formatDate(u.plusUntil)}
                          </span>
                        ) : (
                          <span className="text-xs text-muted">
                            {u.plusUntil ? `Abgelaufen (${formatDate(u.plusUntil)})` : "Kein Plus"}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5">
                          <form action={grantPlusAction} className="flex items-center gap-1">
                            <input type="hidden" name="userId" value={u.id} />
                            <input
                              type="number"
                              name="days"
                              defaultValue={30}
                              min={1}
                              max={3650}
                              className="hairline w-14 rounded-full bg-bg px-2 py-1 text-xs text-ink outline-none focus:border-primary/60"
                              aria-label="Anzahl Tage"
                            />
                            <button
                              type="submit"
                              className="hairline inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-ink transition hover:bg-bg"
                            >
                              <Crown className="h-3 w-3" /> Schenken
                            </button>
                          </form>
                          {u.plusActive && (
                            <form action={revokePlusAction}>
                              <input type="hidden" name="userId" value={u.id} />
                              <button
                                type="submit"
                                className="inline-flex items-center gap-1 rounded-full bg-red-soft px-2.5 py-1 text-xs font-semibold text-red-dark transition hover:opacity-80"
                              >
                                <XCircle className="h-3 w-3" /> Entziehen
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
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
