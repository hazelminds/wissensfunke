-- Spiel-Telemetrie: ein Event pro Runden-Start und pro tatsächlichem
-- Abschluss/Lösen, je Spiel-Slug. Grundlage für die Beliebtheits- und
-- Lösequote-Charts im Admin-Dashboard.
--
-- Wie bei support_tickets/plus_grants: keine Policies für anon/authenticated,
-- Zugriff ausschließlich über den Service-Role-Client in server-only Code
-- (lib/analytics.ts) -- Schreiben ist bewusst unauthentifiziert möglich
-- (auch Gäste ohne Login spielen), aber nur über die eigene Server Action,
-- nie direkt vom Client aus.

create table if not exists game_events (
  id bigint generated always as identity primary key,
  slug text not null,
  event text not null check (event in ('started', 'completed')),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists game_events_slug_created_idx on game_events (slug, created_at);
create index if not exists game_events_created_idx on game_events (created_at);

alter table game_events enable row level security;
