-- Kontogebundenes "nicht wiederholen, bis der Pool erschöpft ist" für die
-- Wissens-Quiz (siehe lib/seenQuestions.ts / lib/seenQuestionsServer.ts).
-- Eine Zeile pro (Nutzer, Quiz) mit der Liste bereits gezeigter Fragen als
-- Array statt einer Zeile pro Frage -- genau die Form, die vorher in
-- localStorage lag, nur jetzt pro Konto statt pro Gerät.
--
-- Gäste ohne Login bleiben bewusst außen vor und laufen weiter über
-- localStorage (siehe QuizPlayer.tsx) -- kein Konto zum Dran-binden.

create table if not exists seen_questions (
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_slug text not null,
  keys text[] not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, quiz_slug)
);

alter table seen_questions enable row level security;

-- Wie bei den anderen Tabellen: keine Policies für anon/authenticated,
-- Zugriff ausschließlich über den Service-Role-Client in server-only Code.
