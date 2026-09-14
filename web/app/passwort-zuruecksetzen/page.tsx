import { SiteHeader } from "@/components/SiteHeader";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { isSupabaseConfigured } from "@/lib/auth";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto flex max-w-md flex-col gap-8 px-5 pt-8 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-bold text-ink">Neues Passwort setzen</h1>
          <p className="text-[14px] leading-relaxed text-ink-soft">
            Falls du gerade über den Link aus der E-Mail hier gelandet bist, kannst du direkt ein
            neues Passwort vergeben.
          </p>
        </div>
        {isSupabaseConfigured() ? (
          <ResetPasswordForm />
        ) : (
          <p className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
            ⚙️ Die Anmeldung wird gerade eingerichtet — komm bald wieder.
          </p>
        )}
      </main>
    </div>
  );
}
