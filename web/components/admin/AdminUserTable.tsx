"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown, Ban, ChevronRight, Crown, Shield, ShieldOff, X, XCircle } from "lucide-react";
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

type PayFilter = "all" | "paying" | "free";
type SortKey = "createdAt" | "lastSignInAt" | "purchaseCount" | "purchaseTotalCents" | "plusUntil";
type SortDir = "asc" | "desc";

const sortLabels: Record<SortKey, string> = {
  createdAt: "Registriert",
  lastSignInAt: "Login",
  purchaseCount: "Käufe",
  purchaseTotalCents: "Umsatz",
  plusUntil: "Plus",
};

/** Datumsvergleich auf Tagesebene (YYYY-MM-DD-Präfix) -- reicht für "von/bis"-Filter. */
function inDateRange(iso: string | null, from: string, to: string): boolean {
  if (!iso) return false;
  const day = iso.slice(0, 10);
  if (from && day < from) return false;
  if (to && day > to) return false;
  return true;
}

/** null sortiert immer ans Ende, unabhängig von der Richtung. */
function compareNullable(a: string | number | null, b: string | number | null, dir: SortDir): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  const mult = dir === "asc" ? 1 : -1;
  if (a < b) return -1 * mult;
  if (a > b) return 1 * mult;
  return 0;
}

function SortHeader({
  sortKeyName,
  activeKey,
  dir,
  onToggle,
  children,
}: {
  sortKeyName: SortKey;
  activeKey: SortKey;
  dir: SortDir;
  onToggle: (key: SortKey) => void;
  children: React.ReactNode;
}) {
  const active = activeKey === sortKeyName;
  return (
    <th className="px-4 py-3 font-semibold">
      <button
        onClick={() => onToggle(sortKeyName)}
        className={`inline-flex items-center gap-1 transition hover:text-ink ${active ? "text-ink" : ""}`}
      >
        {children}
        {active ? (
          dir === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </button>
    </th>
  );
}

export function AdminUserTable({
  users,
  currentUserId,
}: {
  users: AdminUserRow[];
  currentUserId: string;
}) {
  const [payFilter, setPayFilter] = useState<PayFilter>("all");
  const [regFrom, setRegFrom] = useState("");
  const [regTo, setRegTo] = useState("");
  const [loginFrom, setLoginFrom] = useState("");
  const [loginTo, setLoginTo] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const hasActiveFilters = payFilter !== "all" || regFrom || regTo || loginFrom || loginTo;

  function resetFilters() {
    setPayFilter("all");
    setRegFrom("");
    setRegTo("");
    setLoginFrom("");
    setLoginTo("");
  }

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (payFilter === "paying" && u.purchaseCount === 0) return false;
      if (payFilter === "free" && u.purchaseCount > 0) return false;
      if ((regFrom || regTo) && !inDateRange(u.createdAt, regFrom, regTo)) return false;
      if ((loginFrom || loginTo) && !inDateRange(u.lastSignInAt, loginFrom, loginTo)) return false;
      return true;
    });
  }, [users, payFilter, regFrom, regTo, loginFrom, loginTo]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      switch (sortKey) {
        case "createdAt":
          return compareNullable(a.createdAt, b.createdAt, sortDir);
        case "lastSignInAt":
          return compareNullable(a.lastSignInAt, b.lastSignInAt, sortDir);
        case "purchaseCount":
          return compareNullable(a.purchaseCount, b.purchaseCount, sortDir);
        case "purchaseTotalCents":
          return compareNullable(a.purchaseTotalCents, b.purchaseTotalCents, sortDir);
        case "plusUntil":
          return compareNullable(a.plusUntil, b.plusUntil, sortDir);
        default:
          return 0;
      }
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {sorted.length === users.length
            ? `${users.length} Benutzer (aus Supabase Auth)`
            : `${sorted.length} von ${users.length} Benutzern`}
          {" · sortiert nach "}
          {sortLabels[sortKey]} ({sortDir === "asc" ? "aufsteigend" : "absteigend"})
        </p>
        <div className="flex items-center gap-3">
          <AdminCreateTestUserForm action={createTestUserAction} />
          <AdminUserExportButton users={sorted} />
        </div>
      </div>

      <div className="hairline mb-4 flex flex-wrap items-end gap-4 rounded-2xl bg-surface p-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-muted uppercase">Zahlstatus</span>
          <div className="hairline flex rounded-full p-0.5">
            {(["all", "paying", "free"] as PayFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setPayFilter(f)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  payFilter === f ? "bg-primary text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {f === "all" ? "Alle" : f === "paying" ? "Zahlend" : "Kostenlos"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-muted uppercase">Registriert</span>
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={regFrom}
              onChange={(e) => setRegFrom(e.target.value)}
              className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
            />
            <span className="text-xs text-muted">bis</span>
            <input
              type="date"
              value={regTo}
              onChange={(e) => setRegTo(e.target.value)}
              className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-muted uppercase">Login</span>
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={loginFrom}
              onChange={(e) => setLoginFrom(e.target.value)}
              className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
            />
            <span className="text-xs text-muted">bis</span>
            <input
              type="date"
              value={loginTo}
              onChange={(e) => setLoginTo(e.target.value)}
              className="hairline rounded-full bg-bg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-ink"
          >
            <X className="h-3 w-3" /> Filter zurücksetzen
          </button>
        )}
      </div>

      <div className="hairline overflow-hidden rounded-2xl bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">E-Mail</th>
                <SortHeader sortKeyName="createdAt" activeKey={sortKey} dir={sortDir} onToggle={toggleSort}>
                  Registriert
                </SortHeader>
                <SortHeader sortKeyName="lastSignInAt" activeKey={sortKey} dir={sortDir} onToggle={toggleSort}>
                  Login
                </SortHeader>
                <SortHeader sortKeyName="purchaseCount" activeKey={sortKey} dir={sortDir} onToggle={toggleSort}>
                  Käufe
                </SortHeader>
                <SortHeader
                  sortKeyName="purchaseTotalCents"
                  activeKey={sortKey}
                  dir={sortDir}
                  onToggle={toggleSort}
                >
                  Umsatz
                </SortHeader>
                <SortHeader sortKeyName="plusUntil" activeKey={sortKey} dir={sortDir} onToggle={toggleSort}>
                  Plus
                </SortHeader>
                <th className="px-4 py-3 font-semibold">Rechte</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-muted">
                    {users.length === 0 ? "Keine Benutzer." : "Keine Benutzer entsprechen den Filtern."}
                  </td>
                </tr>
              ) : (
                sorted.map((u) => (
                  <tr key={u.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">
                      <Link
                        href={`/admin/nutzer/${u.id}`}
                        className="group inline-flex items-center gap-1.5 hover:text-primary"
                      >
                        {u.email ?? "—"}
                        {u.isBanned && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-soft px-2 py-0.5 text-[10px] font-bold text-red-dark">
                            <Ban className="h-2.5 w-2.5" /> Gesperrt
                          </span>
                        )}
                        <ChevronRight className="h-3.5 w-3.5 text-muted opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3 text-muted">
                      {u.lastSignInAt ? formatDate(u.lastSignInAt) : "—"}
                    </td>
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
