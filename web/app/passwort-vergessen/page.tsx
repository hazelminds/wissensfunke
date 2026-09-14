import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { isSupabaseConfigured } from "@/lib/auth";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto flex max-w-md flex-col gap-8 px-5 pt-8 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-bold text-ink">Passwort vergessen</h1>
          <p className="text-[14px] leading-relaxed text-ink-soft">
            Trag deine E-Mail-Adresse ein, wir schicken dir einen Link zum Zurücksetzen.
          </p>
        </div>
        {isSupabaseConfigured() ? (
          <ForgotPasswordForm />
        ) : (
          <p className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
            ⚙️ Die Anmeldung wird gerade eingerichtet — komm bald wieder.
          </p>
        )}
        <p className="text-center text-[13px] text-ink-soft">
          <Link href="/login" className="font-bold text-primary-dark">
            ← Zurück zur Anmeldung
          </Link>
        </p>
      </main>
    </div>
  );
}
