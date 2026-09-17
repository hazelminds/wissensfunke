import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Ban, Crown, KeyRound, ShieldAlert, StickyNote, UserRoundCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import { getAdminUserDetail } from "@/lib/adminData";
import { grantPlusAction, revokePlusAction } from "@/lib/actions/admin";
import {
  addUserNoteAction,
  banUserAction,
  unbanUserAction,
  adminSetUsernameAction,
  adminSetPasswordAction,
  deleteUserAction,
} from "@/lib/actions/adminUserDetail";
import { AdminNoteForm } from "@/components/admin/AdminNoteForm";
import { AdminUsernameForm } from "@/components/admin/AdminUsernameForm";
import { AdminPasswordForm } from "@/components/admin/AdminPasswordForm";
import { AdminDeleteUserForm } from "@/components/admin/AdminDeleteUserForm";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE");
}

function formatEuro(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
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

  const detail = await getAdminUserDetail(id);
  if (!detail) notFound();

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zum Admin-Bereich
        </Link>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                {detail.email ?? "Unbekannt"}
              </h1>
              {detail.isBanned && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-soft px-2.5 py-1 text-xs font-bold text-red-dark">
                  <Ban className="h-3 w-3" /> Gesperrt
                </span>
              )}
              {detail.plusActive && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2.5 py-1 text-xs font-bold text-gold-dark">
                  <Crown className="h-3 w-3" /> Plus
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">
              Registriert {formatDate(detail.createdAt)} · Login{" "}
              {detail.lastSignInAt ? formatDate(detail.lastSignInAt) : "nie"} · {detail.purchaseCount} Käufe
              {detail.purchaseTotalCents > 0 ? ` (${formatEuro(detail.purchaseTotalCents)})` : ""}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* Plus */}
          <section className="hairline rounded-3xl bg-surface p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display font-bold text-ink">
              <Crown className="h-4 w-4 text-gold" /> Plus
            </h2>
            <p className="mb-3 text-sm text-ink-soft">
              {detail.plusActive && detail.plusUntil
                ? `Aktiv bis ${formatDate(detail.plusUntil)}.`
                : detail.plusUntil
                  ? `Abgelaufen am ${formatDate(detail.plusUntil)}.`
                  : "Noch kein Plus geschenkt."}
            </p>
            <div className="flex items-center gap-2">
              <form action={grantPlusAction} className="flex items-center gap-1.5">
                <input type="hidden" name="userId" value={detail.id} />
                <input
                  type="number"
                  name="days"
                  defaultValue={30}
                  min={1}
                  max={3650}
                  className="hairline w-16 rounded-full bg-bg px-2.5 py-1.5 text-xs text-ink outline-none focus:border-primary/60"
                  aria-label="Anzahl Tage"
                />
                <button
                  type="submit"
                  className="hairline inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-bg"
                >
                  <Crown className="h-3 w-3" /> Tage schenken
                </button>
              </form>
              {detail.plusActive && (
                <form action={revokePlusAction}>
                  <input type="hidden" name="userId" value={detail.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-full bg-red-soft px-3 py-1.5 text-xs font-semibold text-red-dark transition hover:opacity-80"
                  >
                    Entziehen
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Spielername */}
          <section className="hairline rounded-3xl bg-surface p-5">
            <h2 className="mb-1 font-display font-bold text-ink">Spielername</h2>
            <p className="mb-3 text-sm text-ink-soft">
              Als Admin unabhängig vom Plus-Status setzbar — z. B. um einen unangebrachten Namen zu
              entfernen.
            </p>
            <AdminUsernameForm
              action={adminSetUsernameAction}
              userId={detail.id}
              currentUsername={detail.username}
            />
          </section>

          {/* Passwort */}
          <section className="hairline rounded-3xl bg-surface p-5">
            <h2 className="mb-1 flex items-center gap-2 font-display font-bold text-ink">
              <KeyRound className="h-4 w-4 text-primary" /> Passwort
            </h2>
            <p className="mb-3 text-sm text-ink-soft">
              Setzt ein neues Passwort — z. B. wenn jemand im Support ausgesperrt ist. Das alte
              Passwort wird danach ungültig.
            </p>
            <AdminPasswordForm action={adminSetPasswordAction} userId={detail.id} />
          </section>

          {/* Sperren / Löschen */}
          <section className="hairline rounded-3xl bg-surface p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display font-bold text-ink">
              <ShieldAlert className="h-4 w-4 text-red" /> Konto-Status
            </h2>
            <div className="flex flex-wrap items-center gap-2.5">
              {detail.isBanned ? (
                <form action={unbanUserAction}>
                  <input type="hidden" name="userId" value={detail.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full bg-green-soft px-4 py-2.5 text-sm font-semibold text-green-dark transition hover:opacity-80"
                  >
                    <UserRoundCheck className="h-4 w-4" /> Sperre aufheben
                  </button>
                </form>
              ) : (
                <form action={banUserAction}>
                  <input type="hidden" name="userId" value={detail.id} />
                  <button
                    type="submit"
                    className="hairline inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-bg"
                  >
                    <Ban className="h-4 w-4" /> Konto sperren
                  </button>
                </form>
              )}
              <AdminDeleteUserForm action={deleteUserAction} userId={detail.id} email={detail.email ?? ""} />
            </div>
          </section>

          {/* Notizen */}
          <section className="hairline rounded-3xl bg-surface p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display font-bold text-ink">
              <StickyNote className="h-4 w-4 text-primary" /> Interne Notizen
            </h2>
            <p className="mb-4 text-sm text-ink-soft">
              Nur für Admins sichtbar — z. B. für Support-Fälle, wenn jemand auffällig wird.
            </p>

            <AdminNoteForm action={addUserNoteAction} userId={detail.id} />

            {detail.notes.length > 0 && (
              <div className="mt-5 flex flex-col gap-2.5">
                {detail.notes.map((n) => (
                  <div key={n.id} className="hairline rounded-xl bg-bg p-3.5">
                    <p className="text-sm whitespace-pre-wrap text-ink">{n.note}</p>
                    <p className="mt-1.5 text-[11px] text-muted">
                      {formatDateTime(n.createdAt)}
                      {n.createdByEmail ? ` · ${n.createdByEmail}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
