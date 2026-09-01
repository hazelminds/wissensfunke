-- Ebene 2: Einmalkäufe für Tiefenauswertungen.
-- Kein Nutzerkonto-Zwang beim Kauf (Freemium ohne Login-Hürde) — die Zeile
-- wird über die Stripe-Checkout-Session-ID freigeschaltet. Sobald Ebene 1
-- (Auth) steht, kommt eine nullable `user_id`-Spalte dazu, um Käufe mit
-- Konten zu verknüpfen, ohne bestehende Zeilen zu brechen.

create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  quiz_slug text not null,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  customer_email text,
  amount_cents integer not null,
  currency text not null default 'eur',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists purchases_quiz_slug_idx on purchases (quiz_slug);

alter table purchases enable row level security;

-- Keine Policies für anon/authenticated: Zugriff ausschließlich über den
-- Service-Role-Client im Webhook- bzw. Verifikations-Server-Code.
