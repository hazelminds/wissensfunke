import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";
import type { AdminTicketRow } from "@/lib/support";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
}

export function AdminSupportTable({ tickets }: { tickets: AdminTicketRow[] }) {
  if (tickets.length === 0) {
    return (
      <div className="hairline rounded-2xl bg-surface p-6 text-center text-sm text-muted">
        Noch keine Support-Nachrichten.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {tickets.map((t) => (
        <Link
          key={t.id}
          href={`/admin/support/${t.id}`}
          className="hairline group flex items-center gap-3 rounded-2xl bg-surface p-4 transition hover:border-primary/50"
        >
          {t.adminUnread && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate font-display font-bold text-ink">{t.subject}</p>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  t.status === "open" ? "bg-primary-soft text-primary-dark" : "hairline text-muted"
                }`}
              >
                {t.status === "open" ? "Offen" : "Geschlossen"}
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
              <Mail className="h-3 w-3 shrink-0" /> {t.userEmail ?? "—"}
            </p>
            {t.lastMessagePreview && (
              <p className="mt-1 truncate text-[12.5px] text-ink-soft">{t.lastMessagePreview}</p>
            )}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <p className="text-[11px] text-muted">{formatDateTime(t.updatedAt)}</p>
            <ChevronRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" />
          </div>
        </Link>
      ))}
    </div>
  );
}
