import { LifeBuoy, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "@/components/LoginForm";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { TicketThread } from "@/components/support/TicketThread";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/auth";
import { getUserTickets, markTicketsReadByUser } from "@/lib/support";
import { createSupportTicketAction, replyToTicketAsUserAction } from "@/lib/actions/support";

export default async function SupportPage() {
  const user = await getCurrentUser();

  if (user) {
    // Beim Öffnen als gelesen markieren -- einfacher Seiteneffekt beim
    // Rendern, kein eigener Klick nötig (gleiches Prinzip wie anderswo im
    // Admin-Bereich für "zuletzt gesehen").
    await markTicketsReadByUser(user.id);
  }
  const tickets = user ? await getUserTickets(user.id) : [];

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto max-w-xl px-5 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
            <LifeBuoy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">Support</h1>
            <p className="text-sm text-ink-soft">Wir antworten dir hier, direkt in deinem Konto.</p>
          </div>
        </div>

        {!user ? (
          <div className="hairline rounded-3xl bg-surface p-5">
            <p className="mb-4 text-sm text-ink-soft">
              Melde dich an, um uns eine Nachricht zu schicken — deine Anfragen und unsere
              Antworten findest du danach immer hier wieder.
            </p>
            {isSupabaseConfigured() ? (
              <LoginForm />
            ) : (
              <p className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
                ⚙️ Die Anmeldung wird gerade eingerichtet — komm bald wieder.
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <section className="hairline rounded-3xl bg-surface p-5">
              <h2 className="mb-3 flex items-center gap-2 font-display font-bold text-ink">
                <MessageCircle className="h-4 w-4 text-primary" /> Neue Nachricht
              </h2>
              <NewTicketForm action={createSupportTicketAction} />
            </section>

            {tickets.length > 0 && (
              <div className="flex flex-col gap-5">
                <p className="text-sm font-bold text-muted">Deine bisherigen Nachrichten</p>
                {tickets.map((t) => (
                  <section key={t.id} className="hairline rounded-3xl bg-surface p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-display font-bold text-ink">{t.subject}</h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          t.status === "open"
                            ? "bg-primary-soft text-primary-dark"
                            : "hairline text-muted"
                        }`}
                      >
                        {t.status === "open" ? "Offen" : "Geschlossen"}
                      </span>
                    </div>
                    <TicketThread
                      ticketId={t.id}
                      messages={t.messages}
                      viewerRole="user"
                      replyAction={replyToTicketAsUserAction}
                      otherLabel="Support"
                    />
                  </section>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
