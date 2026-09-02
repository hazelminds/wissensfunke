# Wissensfunke — Web-App

Next.js-App (App Router, TypeScript, Tailwind CSS 4) für die Rätsel-/Quiz-/Selbst-Test-Seite
„Wissensfunke". Konzept & Compliance-Vorgaben: [`../reference/projekt-briefing.md`](../reference/projekt-briefing.md).
Referenz-Prototyp (Original-Design v4): [`../reference/quiz-prototype-v4.html`](../reference/quiz-prototype-v4.html).

## Stack

- **Frontend + Backend:** Next.js (App Router) — Server Components für Content-Seiten,
  Route Handlers für Checkout/Webhooks, ein Projekt statt zweier Repos.
- **Datenbank + Auth:** Supabase (Postgres + eingebautes Auth).
- **Payments:** micropayment.ch (primär, noch nicht angebunden — siehe unten), Stripe als
  fertiger, aber aktuell geparkter Adapter. Provider-Wahl über `PAYMENT_PROVIDER` in `.env.local`.
- **Hosting:** Vercel.

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Werte aus Supabase-/Zahlungsanbieter-Dashboard eintragen
npm run dev                  # http://localhost:3000
```

Ohne jede Konfiguration laufen die Startseite, das Tages-Rätsel, das Tages-Mini-Quiz und der
Allgemeinwissen-Quiz-Flow bereits vollständig — nur der „Freischalten"-Button (Einmalkauf)
braucht einen konfigurierten Zahlungsanbieter.

### Supabase einrichten

1. Projekt auf [supabase.com](https://supabase.com) anlegen.
2. `supabase/migrations/0001_purchases.sql` im SQL-Editor ausführen (oder
   per Supabase-CLI: `supabase db push`).
3. `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` und
   `SUPABASE_SERVICE_ROLE_KEY` aus Project Settings → API in `.env.local`.

### Zahlungsanbieter einrichten

**micropayment.ch (Ziel, aktuell nicht funktionsfähig):** `lib/payments/micropayment.ts` ist ein
Gerüst mit klar markierten TODOs — die verbindliche API-Referenz (techdoc.micropayment.ch) war aus
dieser Entwicklungsumgebung nicht erreichbar (Netzwerk-Egress blockiert). Sobald Zugangsdaten/Doku
vorliegen: Endpunkt, Parameter und Hash-Verfahren in dieser Datei eintragen, `MICROPAYMENT_*`
Variablen in `.env.local` setzen — der Rest der App (Server Action, Seite, DB) ist bereits
provider-neutral und braucht keine Änderung.

**Stripe (Alternative, funktionsfähig):** `PAYMENT_PROVIDER=stripe` setzen, dann Testmodus-Keys
aus dem Dashboard → `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. Für Webhooks lokal:
`stripe listen --forward-to localhost:3000/api/webhooks/stripe` (die ausgegebene `whsec_...` in
`STRIPE_WEBHOOK_SECRET`). Auch ohne Webhook funktioniert die Freischaltung: `lib/purchases.ts`
verifiziert die Session beim Rücksprung direkt beim Anbieter (Self-Heal).

## Struktur

```
app/
  layout.tsx             Root-Layout: Fonts (Fredoka/Nunito), Metadata
  globals.css             Design-Tokens v4 als Tailwind-Theme (--wf-* Variablen)
  page.tsx                 Startseite: listet alle Spiele nach Produktebene
  quiz/[slug]/              Spiel-Flow (Tages-Rätsel/-Quiz, Ebene-2-Quiz oder Platzhalter)
  api/webhooks/stripe/       Webhook: checkout.session.completed → purchases-Tabelle
content/
  games.ts                  Content-Registry aller Spiele (Übergang bis zur DB-Anbindung)
  quizzes.ts                 Fragen/Ränge/Preis für Ebene-2-Quiz mit echtem Spielablauf
  daily.ts                    Fragen-/Rätsel-Pools für Ebene 1, datumsbasierte Rotation
components/
  QuizPlayer.tsx              Ebene-2-Fragen-Flow, Ergebnis-Screen, Paywall-Karte
  DailyMiniQuiz.tsx             Ebene-1-Mini-Quiz (3 Fragen, kein Paywall)
  DailyRiddle.tsx                Ebene-1-Tagesrätsel (Prompt + Lösung aufdecken)
  SiteHeader.tsx                   Gemeinsamer Header, optional mit Streak-Badge
  StreakBadge.tsx                   Zeigt den aktuellen Streak (aus localStorage)
lib/
  supabase/                  Browser-, Server- & Service-Role-Client + Database-Typ
  payments/                   Provider-neutrale Schnittstelle + Stripe-/micropayment-Adapter
  actions/checkout.ts          Server Action: erstellt Checkout beim aktiven Provider
  purchases.ts                  Kauf verifizieren/persistieren (Webhook + Self-Heal)
  streak.ts                      Login-Streak, aktuell geräte-lokal (localStorage)
supabase/migrations/
  0001_purchases.sql            Schema für Einmalkäufe (provider-neutral)
```

## Produktebenen (siehe Briefing Abschnitt 2)

1. **Täglicher Gratis-Anker** — ✅ Tages-Rätsel (7 Rätsel im Pool) und Tages-Mini-Quiz (7 Sets à
   3 Fragen) rotieren datumsbasiert, komplett kostenlos. Streak zählt Tage mit abgeschlossener
   Aktivität, reißt bei einem verpassten Tag ab (Schutz ist Ebene-3-Feature). Noch geräte-lokal,
   siehe Lücken unten.
2. **Wöchentliche Selbst-Tests (Freemium)** — ✅ Quiz-Flow, Ergebnis, Paywall-Karte fertig für
   „Allgemeinwissen-Quiz". Checkout ruft den aktiven Zahlungsanbieter auf (siehe oben — aktuell
   ohne konfigurierten Anbieter, Button zeigt einen freundlichen Hinweis statt zu crashen). Weitere
   Tests (Beziehungstyp, Freundes-Kompatibilität) brauchen noch eigene Fragenkataloge.
3. **Power-User-Mini-Abo** — alle Tiefenauswertungen, Archiv, werbefrei, Streak-Schutz, bis 4,99 €/Monat — offen

### Bewusste Lücken (bis Auth/Ebene 3 stehen)

- **Streak ist geräte-lokal** (`lib/streak.ts`, localStorage) — es gibt noch keine Konten. Andere
  Browser/Geräte sehen einen eigenen Streak. Zieht mit Ebene-1-Auth auf eine `streaks`-Tabelle um;
  die Aufrufstellen (`recordDailyCompletion`) bleiben dabei gleich.
- **Kein Login nötig für den Einmalkauf** — Freischaltung hängt an der Provider-Referenz
  (`?provider=...&ref=...` beim Rücksprung), nicht an einem Nutzerkonto. Neu laden ohne die
  Query-Parameter zeigt wieder die Paywall. Mit Ebene 1 (Auth) wird der Kauf zusätzlich an
  `user_id` verknüpft und bleibt dauerhaft freigeschaltet.
- **Widerrufsrecht-Consent** (§ 356 Abs. 5 BGB) ist im Checkout noch nicht als Checkbox
  umgesetzt — braucht zuerst den fertigen Rechtstext (Briefing Abschnitt 8).
