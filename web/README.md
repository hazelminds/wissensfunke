# Noggl — Web-App

Next.js-App (App Router, TypeScript, Tailwind CSS 4) für Noggl — kurzweilige Denkspiele für
Erwachsene (Rätsel, Quiz, Selbst-Tests). Domain: noggl.games. Ursprünglich unter dem
Arbeitstitel „Wissensfunke" konzipiert (siehe Konzept & Compliance-Vorgaben:
[`../reference/projekt-briefing.md`](../reference/projekt-briefing.md) — Name im Dokument noch
der alte, Inhalt weiterhin gültig). Referenz-Prototyp (Original-Design v4):
[`../reference/quiz-prototype-v4.html`](../reference/quiz-prototype-v4.html).

## Stack

- **Frontend + Backend:** Next.js (App Router) — Server Components für Content-Seiten,
  Route Handlers für Checkout/Webhooks/Auth-Callback, ein Projekt statt zweier Repos.
- **Datenbank + Auth:** Supabase (Postgres + eingebautes Auth, Magic-Link-Login).
- **Payments:** micropayment.ch (primär, noch nicht angebunden — siehe unten), Stripe als
  fertiger, aber aktuell geparkter Adapter. Provider-Wahl über `PAYMENT_PROVIDER` in `.env.local`.
- **Hosting:** Vercel.

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Werte aus Supabase-/Zahlungsanbieter-Dashboard eintragen
npm run dev                  # http://localhost:3000
```

Ohne jede Konfiguration laufen Startseite, Tages-Rätsel, Tages-Mini-Quiz und der
Allgemeinwissen-Quiz-Flow bereits vollständig (Streak dann geräte-lokal, kein Login möglich) —
nur „Anmelden" und der „Freischalten"-Button brauchen ein konfiguriertes Supabase-Projekt bzw.
einen konfigurierten Zahlungsanbieter.

### Supabase einrichten

Falls schon ein Supabase-Account besteht (z. B. von einem anderen Projekt): **ein neues,
eigenes Projekt** für Noggl anlegen — Projekte sind pro Account beliebig oft anlegbar,
eine gemeinsame Datenbank mit einem anderen Produkt wäre hier falsch.

1. Neues Projekt auf [supabase.com](https://supabase.com) → **New project**. Region idealerweise
   EU (Frankfurt), da die Zielgruppe deutschsprachig ist.
2. **SQL Editor** → beide Migrationen der Reihe nach ausführen (Inhalt der Dateien reinkopieren,
   „Run"): zuerst `supabase/migrations/0001_purchases.sql`, dann `0002_auth_streaks.sql`.
   (Alternativ per Supabase-CLI: `supabase link` + `supabase db push`.)
3. **Project Settings → API** → `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`,
   `anon` `public` Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `service_role` Key → `SUPABASE_SERVICE_ROLE_KEY` (geheim halten, nur serverseitig genutzt).
4. **Authentication → Sign In / Providers** → *Email* ist standardmäßig aktiv, das reicht für den
   Magic-Link-Login — nichts weiter zu tun.
5. **Authentication → URL Configuration** → *Site URL* auf `http://localhost:3000` setzen
   (später auf die echte Domain ändern) und unter *Redirect URLs* `http://localhost:3000/auth/callback`
   hinzufügen (bei Livegang zusätzlich `https://<domain>/auth/callback`).
6. **Für den Livegang wichtig:** Supabase verschickt Magic-Link-Mails über einen eigenen
   Test-Mailer mit sehr niedrigem Rate-Limit (nur zum Ausprobieren geeignet). Vor echtem
   Nutzerverkehr unter **Authentication → Settings → SMTP Settings** einen eigenen
   Mail-Versender hinterlegen, sonst laufen Anmeldungen bei mehr als ein paar Testnutzern ins Leere.

Damit sind Datenbank UND Auth eingerichtet — beides läuft über dasselbe Projekt, keine
weiteren Schritte nötig.

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
  globals.css             Design-Tokens v4 als Tailwind-Theme (--nog-* Variablen)
  page.tsx                 Startseite: listet alle Spiele nach Produktebene
  rechtliches/              Impressum, Datenschutz, AGB, Widerruf (Entwürfe, siehe unten)
  login/                    Magic-Link-Login
  auth/callback/             Tauscht den Magic-Link-Code gegen eine Session
  quiz/[slug]/                Spiel-Flow (Tages-Rätsel/-Quiz, Ebene-2-Quiz oder Platzhalter)
  api/webhooks/stripe/         Webhook: checkout.session.completed → purchases-Tabelle
content/
  games.ts                  Content-Registry aller Spiele (Übergang bis zur DB-Anbindung)
  quizzes.ts                 Fragen/Ränge/Preis für Ebene-2-Quiz mit echtem Spielablauf
  daily.ts                    Fragen-/Rätsel-Pools für Ebene 1, datumsbasierte Rotation
components/
  QuizPlayer.tsx              Ebene-2-Fragen-Flow, Ergebnis-Screen, Paywall-Karte
  DailyMiniQuiz.tsx             Ebene-1-Mini-Quiz (3 Fragen, kein Paywall)
  DailyRiddle.tsx                Ebene-1-Tagesrätsel (Prompt + Lösung aufdecken)
  LoginForm.tsx                   Magic-Link-Formular mit Status-Feedback
  SiteHeader.tsx                    Gemeinsamer Header: Streak-Badge + Anmelden/Abmelden
  SiteFooter.tsx                      Globaler Footer (Rechtslinks), im Root-Layout gerendert
  StreakBadge.tsx                    Streak-Anzeige (Server-Wert oder localStorage-Fallback)
  LegalPage.tsx                       Gerüst für die vier Rechtsseiten (Entwurfs-Banner etc.)
lib/
  auth.ts                    getCurrentUser() + Supabase-konfiguriert?-Check (überall genutzt,
                               damit ohne Supabase-Projekt nichts abstürzt)
  supabase/                   Browser-, Server- & Service-Role-Client + Database-Typ
  payments/                    Provider-neutrale Schnittstelle + Stripe-/micropayment-Adapter
  actions/checkout.ts           Server Action: erstellt Checkout beim aktiven Provider
  actions/auth.ts                Server Actions: Magic-Link versenden, Abmelden
  actions/streak.ts               Server Action: Streak für eingeloggte Nutzer fortschreiben
  streak-server.ts                 Streak lesen (Server Component, z. B. SiteHeader)
  streak.ts                         Login-Streak-Fallback ohne Konto (localStorage)
  purchases.ts                       Kauf verifizieren/persistieren (Webhook + Self-Heal)
proxy.ts                       Hält die Supabase-Session frisch (Next 16: „middleware" → „proxy")
supabase/migrations/
  0001_purchases.sql            Schema für Einmalkäufe (provider-neutral)
  0002_auth_streaks.sql          streaks-Tabelle + user_id-Spalte auf purchases
```

## Produktebenen (siehe Briefing Abschnitt 2)

1. **Täglicher Gratis-Anker** — ✅ Tages-Rätsel (7 Rätsel im Pool) und Tages-Mini-Quiz (7 Sets à
   3 Fragen) rotieren datumsbasiert, komplett kostenlos. Streak zählt Tage mit abgeschlossener
   Aktivität, reißt bei einem verpassten Tag ab (Schutz ist Ebene-3-Feature). Für eingeloggte
   Nutzer läuft der Streak serverseitig (`streaks`-Tabelle), sonst als localStorage-Fallback.
2. **Wöchentliche Selbst-Tests (Freemium)** — ✅ Quiz-Flow, Ergebnis, Paywall-Karte fertig für
   „Allgemeinwissen-Quiz". Checkout ruft den aktiven Zahlungsanbieter auf (siehe oben — aktuell
   ohne konfigurierten Anbieter, Button zeigt einen freundlichen Hinweis statt zu crashen). Käufe
   eingeloggter Nutzer bleiben dauerhaft freigeschaltet (`hasUserPurchased`), unabhängig vom
   Rücksprung-Link. Weitere Tests (Beziehungstyp, Freundes-Kompatibilität) brauchen noch eigene
   Fragenkataloge.
3. **Power-User-Mini-Abo** — alle Tiefenauswertungen, Archiv, werbefrei, Streak-Schutz, bis 4,99 €/Monat — offen

### Auth im Detail

Magic-Link-Login (kein Passwort) über Supabase Auth. `lib/auth.ts` prüft vor jedem Zugriff, ob
`NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` überhaupt gesetzt sind — ohne
Supabase-Projekt bleibt die App exakt im bisherigen Zustand (kein Login möglich, Streak/Käufe
laufen wie zuvor lokal bzw. über die URL-Referenz, nichts crasht).

### Bewusste Lücken

- **Kein Merge des lokalen Streaks beim ersten Login** — wer vorher ohne Konto gespielt hat und
  sich dann anmeldet, startet serverseitig bei 0. Der localStorage-Wert geht nicht verloren,
  wird aber (noch) nicht automatisch übernommen.
- **Kein „Meine Käufe"/Kontobereich** — Nutzer sehen ihre freigeschalteten Tests aktuell nur,
  indem sie den jeweiligen Test erneut öffnen (dann automatisch entsperrt).
- **Widerrufsrecht-Consent** (§ 356 Abs. 5 BGB) ist im Checkout noch nicht als Checkbox
  umgesetzt — braucht zuerst den fertigen Rechtstext (Briefing Abschnitt 8).

## Rechtstexte (`/rechtliches/*`)

Impressum, Datenschutz, AGB und Widerruf existieren jetzt als **Entwürfe** (gelber
„Entwurf"-Banner auf jeder Seite, `[ZU ERGÄNZEN]`-Platzhalter rot markiert). Das sind erste
Fassungen zur Vorbereitung, keine geprüfte Rechtsberatung — vor Livegang zwingend von einer
Anwältin/einem Anwalt (und für Steuerfragen einer Steuerberatung) prüfen lassen.

**Wichtigster offener Punkt, unabhängig vom Feintuning der Texte:** Der Betreiber laut Recherche
(hazelminds-communications.com) ist **Hazelminds Communications Pte. Ltd., Singapur** (UEN
202326202E) — keine EU-/DE-Gesellschaft. Das ändert einiges gegenüber einem „normalen" deutschen
Impressum:

- **EU-Vertretung nach Art. 27 DSGVO:** Anbieter außerhalb der EU/des EWR, die gezielt EU-Bürger:innen
  ansprechen, müssen in der Regel eine Vertretung in der EU benennen. Noch nicht geklärt, ob eine
  Ausnahme greift oder eine Vertretung benannt werden muss.
- **EU-Umsatzsteuer (OSS):** Digitale Inhalte an Verbraucher:innen in der EU verkauft ein
  Nicht-EU-Unternehmen grundsätzlich unter EU-Umsatzsteuerpflicht (One-Stop-Shop-Verfahren) —
  unabhängig vom Sitz in Singapur. Braucht steuerliche Prüfung, bevor echtes Geld fließt.
  Zahlungsdienstleister (Stripe/micropayment.ch) haben teils eigene Anforderungen an
  Nicht-EU-Vertragspartner — beim gewählten Anbieter erfragen.
- **Rechtswahl/Gerichtsstand in den AGB:** Zwingende verbraucherschützende Vorschriften am
  Wohnsitz der Käufer:innen (Art. 6 Rom-I-VO) lassen sich vertraglich nicht wegbedingen —
  eine AGB-Klausel zugunsten singapurischen Rechts schützt nicht automatisch vor deutschem/EU-
  Verbraucherrecht. Braucht anwaltliche Formulierung.
- **Diskrepanz gefunden:** Die bei ACRA hinterlegte Geschäftstätigkeit lautet laut Recherche
  „Softwareentwicklung (außer Games)" — während die Firmen-Website selbst „Game Development" als
  Leistung bewirbt und Noggl ein Spiele-Produkt ist. Wert, mit der Geschäftsführung/Steuerberatung
  abzugleichen, ob die eingetragene Tätigkeit angepasst werden muss.

**Fehlende Kontaktdaten:** Telefonnummer und E-Mail-Adresse des Betreibers waren über Websuche
nicht auffindbar (die Original-Domain war aus dieser Umgebung nicht direkt abrufbar, siehe
`EGRESS_BLOCKED` an anderer Stelle in diesem Dokument) — beides ist in allen vier Texten als
Platzhalter markiert und muss ergänzt werden; Telefon/E-Mail sind Pflichtangaben im Impressum.

**Weitere offene Punkte in den Texten selbst** (jeweils als `[ZU ERGÄNZEN]`/`[ZU PRÜFEN]`
markiert): Name der Geschäftsführung, ob ein presserechtlich Verantwortlicher nach § 18 Abs. 2
MStV nötig ist, aktueller Stand der EU-Streitschlichtungsplattform (wurde ggf. 2025 eingestellt —
unbedingt aktuellen Stand prüfen, nicht ungeprüft übernehmen), konkrete Auftragsverarbeitungsverträge
mit Supabase/Hosting/Zahlungsanbieter, Datenschutzbeauftragte:r-Pflicht, Löschfristen, finale
Preise/Steuerausweis, Haftungsklausel, Kündigungsmodalitäten fürs Abo.

Kurz: **Diese Entwürfe zeigen, wie die Seiten strukturiert sind und was inhaltlich reingehört —
nicht, dass Noggl schon rechtssicher live gehen kann.** Vor allem die Singapur-Frage sollte früh
mit einer im internationalen/deutschen Recht erfahrenen Kanzlei besprochen werden, weil sie
möglicherweise beeinflusst, wie das Geschäft überhaupt strukturiert sein sollte (z. B. ob eine
EU-Gesellschaft für den Verkauf an EU-Verbraucher:innen sinnvoller wäre).
