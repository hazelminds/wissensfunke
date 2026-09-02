-- Ebene 1 Auth: Streak zieht von localStorage auf ein echtes Konto um,
-- Käufe lassen sich jetzt optional (nicht zwingend) mit einem Konto
-- verknüpfen. Nutzt Supabase Auth (auth.users) — kein eigenes users-Table.

create table if not exists streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  count integer not null default 0,
  last_completed_date date,
  updated_at timestamptz not null default now()
);

alter table streaks enable row level security;

create policy "select own streak" on streaks
  for select using (auth.uid() = user_id);

create policy "insert own streak" on streaks
  for insert with check (auth.uid() = user_id);

create policy "update own streak" on streaks
  for update using (auth.uid() = user_id);

-- Käufe: weiterhin ohne Login möglich (Freemium ohne Hürde), aber wenn
-- eingeloggt, wird der Kauf jetzt zusätzlich am Konto festgemacht, damit er
-- geräteübergreifend freigeschaltet bleibt statt nur über die Provider-
-- Referenz in der URL.
alter table purchases add column if not exists user_id uuid references auth.users(id) on delete set null;
create index if not exists purchases_user_id_idx on purchases (user_id);
