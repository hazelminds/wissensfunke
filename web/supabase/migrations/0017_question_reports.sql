-- "Fragen melden": Spieler:innen können eine Quiz-Frage als fehlerhaft/
-- unklar markieren (z.B. falsche Lösung hinterlegt, Erklärung widerspricht
-- sich) -- landet in einer Admin-Queue zur Qualitätskontrolle.
--
-- Der Fragentext wird als Schnappschuss gespeichert (nicht nur eine ID),
-- weil Fragen in content/quizzes.ts jederzeit bearbeitet/entfernt werden
-- können -- ohne Schnappschuss wüsste die Admin-Ansicht später nicht mehr,
-- worauf sich eine alte Meldung überhaupt bezog.
--
-- Keine Policies für anon/authenticated (wie bei purchases/game_events):
-- Zugriff ausschließlich über den Service-Role-Client in server-only Code.

create table if not exists question_reports (
  id uuid primary key default gen_random_uuid(),
  quiz_slug text not null,
  question_text text not null,
  reason text,
  user_id uuid,
  status text not null default 'open' check (status in ('open', 'resolved')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists question_reports_status_idx on question_reports (status);
create index if not exists question_reports_quiz_slug_idx on question_reports (quiz_slug);

alter table question_reports enable row level security;
