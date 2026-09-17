import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LifeBuoy, Mail, ShieldAlert } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import { getAdminTicketDetail, markTicketReadByAdmin } from "@/lib/support";
import { replyToTicketAsAdminAction, setTicketStatusAction } from "@/lib/actions/support";
import { TicketThread } from "@/components/support/TicketThread";

export default async function AdminSupportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caller = await getCurrentUser();
  const isAdmin = await isAdminUser(caller?.id, caller?.email);

  if (!isAdmin || !caller) {
    return (
      <div className="min-h-screen bg-bg">
        <SiteHeader backHref="/" />
        <main className="mx-auto max-w-md px-5 py-24 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-soft">
            <ShieldAlert className="h-7 w-7 text-red" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Kein Zugriff</h1>
          <p className="mt-2 text-sm text-ink-soft">Dieser Bereich ist nur für Administratoren.</p>
        </main>
      </div>
    );
  }

  const ticket = await getAdminTicketDetail(id);
  if (!ticket) notFound();

  await markTicketReadByAdmin(ticket.id);

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto max-w-2xl px-5 py-12">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zum Admin-Bereich
        </Link>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-ink">
              <LifeBuoy className="h-5 w-5 text-primary" /> {ticket.subject}
            </h1>
            <Link
              href={`/admin/nutzer/${ticket.userId}`}
              className="mt-1 inline-flex items-center gap-1 text-sm text-ink-soft transition hover:text-ink"
            >
              <Mail className="h-3.5 w-3.5" /> {ticket.userEmail ?? "—"}
            </Link>
          </div>

          <form action={setTicketStatusAction}>
            <input type="hidden" name="ticketId" value={ticket.id} />
            <input type="hidden" name="status" value={ticket.status === "open" ? "closed" : "open"} />
            <button
              type="submit"
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                ticket.status === "open"
                  ? "hairline text-ink hover:bg-surface"
                  : "bg-primary-soft text-primary-dark hover:opacity-80"
              }`}
            >
              {ticket.status === "open" ? "Als geschlossen markieren" : "Wieder öffnen"}
            </button>
          </form>
        </div>

        <div className="hairline rounded-3xl bg-surface p-5">
          <TicketThread
            ticketId={ticket.id}
            messages={ticket.messages}
            viewerRole="admin"
            replyAction={replyToTicketAsAdminAction}
            otherLabel={ticket.userEmail ?? "Nutzer:in"}
          />
        </div>
      </main>
    </div>
  );
}
