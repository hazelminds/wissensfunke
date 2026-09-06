-- Rechteverwaltung: wer Admin ist, steht jetzt in der Datenbank statt nur
-- in einer Vercel-Umgebungsvariable. ADMIN_EMAILS bleibt als Bootstrap
-- (siehe lib/admin.ts) -- ohne mindestens einen Weg "von außen" gäbe es
-- keine Möglichkeit, den allerersten Admin zu ernennen.
--
-- Komplett ohne RLS-Policies für anon/authenticated, exakt wie bei
-- purchases: Zugriff ausschließlich über den Service-Role-Client in
-- server-only Code (lib/adminData.ts). Kein Nutzer kann diese Tabelle
-- direkt lesen oder schreiben.

create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;
