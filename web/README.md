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

## Struktur

```
app/
  layout.tsx        Root-Layout: Fonts (Fredoka/Nunito), Metadata
  globals.css        Design-Tokens v4 als Tailwind-Theme (--wf-* Variablen)
  page.tsx            Startseite: listet alle Spiele nach Produktebene
  quiz/[slug]/         Einzelne Spiele/Tests (aktuell Platzhalter)
content/
  games.ts             Content-Registry (Übergang bis zur DB-Anbindung)
lib/
  supabase/            Browser- & Server-Client
  stripe.ts             Server-seitiger Stripe-Client
```

## Produktebenen (siehe Briefing Abschnitt 2)

1. **Täglicher Gratis-Anker** — Tages-Rätsel, Tages-Mini-Quiz, Login-Streak (kosmetisch)
2. **Wöchentliche Selbst-Tests (Freemium)** — Ergebnis gratis, Themen-Analyse als Einmalkauf 2–5 €
3. **Power-User-Mini-Abo** — alle Tiefenauswertungen, Archiv, werbefrei, Streak-Schutz, bis 4,99 €/Monat

Jede Ebene wird in einem eigenen Schritt implementiert (siehe Roadmap in der Haupt-Konversation).
