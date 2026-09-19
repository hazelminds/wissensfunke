-- Echte Bestenlisten-Daten statt der bisherigen Beispieldaten
-- (content/leaderboard.ts). Eine Zeile pro abgeschlossener Runde; die
-- Bestenliste zeigt pro Nutzer:in nur die beste Punktzahl je Kategorie.
--
-- Wie bei game_events/page_views: keine Policies für anon/authenticated,
-- Zugriff ausschließlich über den Service-Role-Client in server-only Code
-- (lib/scores.ts). Nur eingeloggte Nutzer:innen schreiben (Gäste haben keine
-- dauerhafte Identität für eine Bestenliste) -- sichtbar in der Bestenliste
-- ist ein Score trotzdem erst, wenn die Person aktives Plus UND einen
-- gesetzten Spielernamen hat (siehe getLeaderboard).

create table if not exists scores (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('quiz', 'puzzle')),
  slug text not null,
  points integer not null,
  time_seconds integer not null,
  moves integer,
  created_at timestamptz not null default now()
);

create index if not exists scores_category_points_idx on scores (category, points desc);
create index if not exists scores_user_category_idx on scores (user_id, category);

alter table scores enable row level security;
