-- Interne Support-Notizen pro Nutzer:in -- nur für Admins sichtbar, taucht
-- nirgendwo im normalen Produkt auf. Sperren/Löschen laufen direkt über die
-- Supabase-Auth-Admin-API (ban_duration/deleteUser), brauchen also keine
-- eigene Tabelle.

create table if not exists user_admin_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  note text not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists user_admin_notes_user_id_idx on user_admin_notes (user_id);

alter table user_admin_notes enable row level security;

-- Keine Policies für anon/authenticated, exakt wie bei admin_users/purchases:
-- Zugriff ausschließlich über den Service-Role-Client in server-only Code
-- (lib/adminData.ts).
