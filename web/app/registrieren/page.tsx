import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { RegisterForm } from "@/components/RegisterForm";
import { isSupabaseConfigured } from "@/lib/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader backHref="/" />
      <main className="mx-auto flex max-w-md flex-col gap-8 px-5 pt-8 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-bold text-ink">Konto anlegen</h1>
          <p className="text-[14px] leading-relaxed text-ink-soft">
            Mit Passwort statt Magic Link — praktisch, falls E-Mails mal nicht ankommen.
          </p>
        </div>
        {isSupabaseConfigured() ? (
          <RegisterForm />
        ) : (
          <p className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
            ⚙️ Die Anmeldung wird gerade eingerichtet — komm bald wieder.
          </p>
        )}
        <p className="text-center text-[13px] text-ink-soft">
          Schon ein Konto?{" "}
          <Link href="/login" className="font-bold text-primary-dark">
            Anmelden
          </Link>
        </p>
      </main>
    </div>
  );
}
