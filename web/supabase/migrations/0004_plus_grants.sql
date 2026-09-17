-- Ebene 3: manuell vergebenes Plus (Admin-Geschenk/Aktion), unabhängig vom
-- späteren echten Abo-Checkout. Ein Nutzer hat Plus, solange plus_until in
-- der Zukunft liegt. "Plus entziehen" setzt plus_until auf jetzt statt die
-- Zeile zu löschen, damit die Historie (wer hat wann wie lange geschenkt
-- bekommen) erhalten bleibt.

create table if not exists plus_grants (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plus_until timestamptz not null,
  granted_by uuid references auth.users(id) on delete set null,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table plus_grants enable row level security;

-- Keine Policies für anon/authenticated, exakt wie bei admin_users/purchases:
-- Zugriff ausschließlich über den Service-Role-Client in server-only Code
-- (lib/adminData.ts).
