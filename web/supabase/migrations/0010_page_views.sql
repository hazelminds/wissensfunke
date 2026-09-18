-- Seitenaufruf-Tracking ohne Cookies und ohne gespeicherte IP-Adresse:
-- pro Seitenwechsel ein anonymes Event (Pfad, verlinkende Domain, Land laut
-- Vercel-Edge-Header, grober Gerätetyp). Kein persistenter Client-seitiger
-- Identifier -- Einzelaufrufe lassen sich nicht über eine Sitzung hinweg
-- verknüpfen.
--
-- Wie bei game_events: keine Policies für anon/authenticated, Zugriff
-- ausschließlich über den Service-Role-Client in server-only Code
-- (lib/pageViews.ts), Schreiben über die eigene Server Action.
--
-- page_view_daily ist die verdichtete Ablage für alte Rohdaten: rollupOldPageViews()
-- fasst page_views-Zeilen älter als 90 Tage zu Tages-Summen zusammen und
-- löscht danach die Einzelzeilen, damit die Tabelle nicht unbegrenzt wächst.

create table if not exists page_views (
  id bigint generated always as identity primary key,
  path text not null,
  referrer text,
  country text not null default 'unknown',
  device text not null default 'unknown',
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_idx on page_views (created_at);
create index if not exists page_views_path_idx on page_views (path);

alter table page_views enable row level security;

create table if not exists page_view_daily (
  day date not null,
  path text not null,
  country text not null default 'unknown',
  device text not null default 'unknown',
  views integer not null default 0,
  primary key (day, path, country, device)
);

alter table page_view_daily enable row level security;
