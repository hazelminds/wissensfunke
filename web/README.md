# Wissensfunke — Web-App

Next.js-App (App Router, TypeScript, Tailwind CSS 4) für die Rätsel-/Quiz-/Selbst-Test-Seite
„Wissensfunke". Konzept & Compliance-Vorgaben: [`../reference/projekt-briefing.md`](../reference/projekt-briefing.md).
Referenz-Prototyp (Original-Design v4): [`../reference/quiz-prototype-v4.html`](../reference/quiz-prototype-v4.html).

## Stack

- **Frontend + Backend:** Next.js (App Router) — Server Components für Content-Seiten,
  Route Handlers für Checkout/Webhooks, ein Projekt statt zweier Repos.
- **Datenbank + Auth:** Supabase (Postgres + eingebautes Auth).
- **Payments:** Stripe (Checkout für Einmalkäufe, Billing + Customer Portal fürs Mini-Abo).
- **Hosting:** Vercel.

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Werte aus Supabase- und Stripe-Dashboard eintragen
npm run dev                  # http://localhost:3000
```

### Supabase einrichten

1. Projekt auf [supabase.com](https://supabase.com) anlegen.
2. `supabase/migrations/0001_purchases.sql` im SQL-Editor ausführen (oder
   per Supabase-CLI: `supabase db push`).
3. `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` und
   `SUPABASE_SERVICE_ROLE_KEY` aus Project Settings → API in `.env.local`.

### Stripe einrichten

1. Testmodus-Keys aus dem Stripe-Dashboard → `STRIPE_SECRET_KEY`,
   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
2. Lokal Webhooks weiterleiten: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   — die dabei ausgegebene `whsec_...` in `STRIPE_WEBHOOK_SECRET` eintragen.
3. Ohne Webhook funktioniert die Freischaltung trotzdem: `lib/purchases.ts`
   verifiziert die Session beim Rücksprung von Stripe direkt (Self-Heal).

## Struktur

```
app/
  layout.tsx             Root-Layout: Fonts (Fredoka/Nunito), Metadata
  globals.css             Design-Tokens v4 als Tailwind-Theme (--wf-* Variablen)
  page.tsx                 Startseite: listet alle Spiele nach Produktebene
  quiz/[slug]/              Quiz-Flow (echter Spielablauf, wenn in content/quizzes.ts vorhanden)
  api/webhooks/stripe/       Webhook: checkout.session.completed → purchases-Tabelle
content/
  games.ts                  Content-Registry aller Spiele (Übergang bis zur DB-Anbindung)
  quizzes.ts                 Fragen/Ränge/Preis für Quiz mit echtem Spielablauf
components/
  QuizPlayer.tsx              Fragen-Flow, Ergebnis-Screen, Paywall-Karte
  SiteHeader.tsx                Gemeinsamer Header (Startseite + Quiz-Seiten)
lib/
  supabase/                  Browser-, Server- & Service-Role-Client + Database-Typ
  stripe.ts                   Lazy Stripe-Server-Client
  actions/checkout.ts          Server Action: erstellt Stripe-Checkout-Session
  purchases.ts                  Kauf verifizieren/persistieren (Webhook + Self-Heal)
supabase/migrations/
  0001_purchases.sql            Schema für Einmalkäufe
```

## Produktebenen (siehe Briefing Abschnitt 2)

1. **Täglicher Gratis-Anker** — Tages-Rätsel, Tages-Mini-Quiz, Login-Streak (kosmetisch) — offen
2. **Wöchentliche Selbst-Tests (Freemium)** — ✅ Quiz-Flow, Ergebnis, Paywall-Karte, Stripe-Einmalkauf
   für „Allgemeinwissen-Quiz" fertig. Weitere Tests (Beziehungstyp, Freundes-Kompatibilität) brauchen
   noch eigene Fragenkataloge in `content/quizzes.ts`.
3. **Power-User-Mini-Abo** — alle Tiefenauswertungen, Archiv, werbefrei, Streak-Schutz, bis 4,99 €/Monat — offen

### Bewusste Lücken in Ebene 2 (bis Ebene 1/3 stehen)

- **Kein Login nötig für den Kauf** — Freischaltung hängt an der Stripe-Session
  (`?session_id=...` beim Rücksprung), nicht an einem Nutzerkonto. Das ist
  bewusst so (Freemium ohne Hürde), heißt aber: neu laden ohne den
  Query-Parameter zeigt wieder die Paywall. Mit Ebene 1 (Auth) wird der Kauf
  zusätzlich an `user_id` verknüpft und bleibt dauerhaft freigeschaltet.
- **Widerrufsrecht-Consent** (§ 356 Abs. 5 BGB) ist im Checkout noch nicht als
  Checkbox umgesetzt — braucht zuerst den fertigen Rechtstext (Briefing
  Abschnitt 8).
