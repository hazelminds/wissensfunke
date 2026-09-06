"use client";

import { Download } from "lucide-react";
import type { AdminUserRow } from "@/lib/adminData";

function csvEscape(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function AdminUserExportButton({ users }: { users: AdminUserRow[] }) {
  const onExport = () => {
    const header = ["E-Mail", "Registriert seit", "Käufe", "Umsatz (EUR)", "Admin (ja/nein)"];
    const rows = users.map((u) => [
      u.email ?? "",
      new Date(u.createdAt).toISOString(),
      String(u.purchaseCount),
      (u.purchaseTotalCents / 100).toFixed(2),
      u.isAdmin ? "ja" : "nein",
    ]);
    const csv = [header, ...rows].map((r) => r.map(csvEscape).join(",")).join("\n");
    const bom = "﻿";
    const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `noggl-nutzer-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={onExport}
      disabled={users.length === 0}
      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Download className="h-4 w-4" /> CSV exportieren
    </button>
  );
}
