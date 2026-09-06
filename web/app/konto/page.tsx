import { User as UserIcon } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "@/components/LoginForm";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/auth";
import { getServerStreak } from "@/lib/streak-server";

export default async function KontoPage() {
  const user = await getCurrentUser();
  const streak = user ? await getServerStreak(user.id) : null;

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto max-w-xl px-5 py-16">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
            <UserIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Dein Konto
            </h1>
            {user && <p className="text-sm text-ink-soft">{user.email}</p>}
          </div>
        </div>

        {!user ? (
          <div className="hairline rounded-3xl bg-surface p-5">
            <p className="mb-4 text-sm text-ink-soft">
              Melde dich per Magic Link an, um deine Serie zu sehen und Plus freizuschalten.
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
          <div className="hairline rounded-3xl bg-surface p-5">
            <p className="font-display font-bold text-ink">
              Serie: {streak?.count ?? 0} {streak?.count === 1 ? "Tag" : "Tage"}
            </p>
            <p className="mt-3 rounded-xl bg-primary-soft px-3 py-2 text-[13px] font-bold text-primary-dark">
              Konto-Details, Plus-Status und Streak-Badges kommen als Nächstes.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
