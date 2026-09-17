-- Support-Postfach: Nutzer:innen schreiben über /support eine Nachricht,
-- Admins sehen und beantworten sie im Admin-Bereich, die Antwort landet
-- als Konto-Benachrichtigung wieder beim Nutzer. Ein Ticket ist ein Thread
-- aus mehreren Nachrichten (support_messages), nicht ein einzelner Text.
--
-- Wie bei purchases/admin_users/plus_grants/user_admin_notes: keine
-- Policies für anon/authenticated, Zugriff ausschließlich über den
-- Service-Role-Client in server-only Code (lib/support.ts), mit expliziter
-- Prüfung "gehört dieses Ticket dieser Person?" in den Server Actions.

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  -- true = seit der letzten Ansicht dieser Seite gibt es was Neues.
  admin_unread boolean not null default true,
  user_unread boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists support_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references support_tickets(id) on delete cascade,
  sender text not null check (sender in ('user', 'admin')),
  author_id uuid references auth.users(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists support_tickets_user_id_idx on support_tickets (user_id);
create index if not exists support_messages_ticket_id_idx on support_messages (ticket_id);

alter table support_tickets enable row level security;
alter table support_messages enable row level security;
