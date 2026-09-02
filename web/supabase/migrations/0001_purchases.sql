-- Ebene 2: Einmalkäufe für Tiefenauswertungen.
-- Provider-neutral (Spalte `provider`) — micropayment.ch ist der geplante
-- primäre Anbieter, Stripe bleibt als Alternative/Fallback im Code.
-- Kein Nutzerkonto-Zwang beim Kauf (Freemium ohne Login-Hürde) — die Zeile
-- wird über die Provider-Referenz (Checkout-Session-/Transaktions-ID)
-- freigeschaltet. Sobald Ebene 1 (Auth) steht, kommt eine nullable
-- `user_id`-Spalte dazu, um Käufe mit Konten zu verknüpfen.

create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  quiz_slug text not null,
  provider text not null,
  provider_reference text not null,
  provider_secondary_reference text,
  customer_email text,
  amount_cents integer not null,
  currency text not null default 'eur',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create unique index if not exists purchases_provider_reference_idx
  on purchases (provider, provider_reference);
create index if not exists purchases_quiz_slug_idx on purchases (quiz_slug);

alter table purchases enable row level security;

-- Keine Policies für anon/authenticated: Zugriff ausschließlich über den
-- Service-Role-Client im Webhook- bzw. Verifikations-Server-Code.
