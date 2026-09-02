import { SiteHeader } from "@/components/SiteHeader";
import { LoginForm } from "@/components/LoginForm";
import { isSupabaseConfigured } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-8 px-5 pt-8 pb-20">
      <SiteHeader backHref="/" />
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-bold text-ink">Anmelden</h1>
        <p className="text-[14px] leading-relaxed text-ink-soft">
          Mit Konto bleibt dein Streak geräteübergreifend erhalten und freigeschaltete
          Tiefenauswertungen bleiben dauerhaft freigeschaltet.
        </p>
      </div>
      {isSupabaseConfigured() ? (
        <LoginForm />
      ) : (
        <p className="rounded-xl bg-gold-soft px-4 py-3 text-[13px] font-semibold text-gold-dark">
          ⚙️ Die Anmeldung wird gerade eingerichtet — komm bald wieder.
        </p>
      )}
    </div>
  );
}
