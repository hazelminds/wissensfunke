-- Ankündigungsbanner für die Startseite. Zeitraum ist tagesgenau gemeint
-- (sichtbar ab 00:01 des Start-Tages bis 23:59 des End-Tages, jeweils
-- deutsche Zeit) -- siehe lib/announcements.ts für die Berlin-Tag-Logik.
-- Der zusätzliche "active"-Schalter erlaubt ein Pausieren, ohne Text oder
-- Zeitraum zu verlieren.

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  active boolean not null default true,
  start_date date not null,
  end_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists announcements_active_dates_idx
  on announcements (active, start_date, end_date);
