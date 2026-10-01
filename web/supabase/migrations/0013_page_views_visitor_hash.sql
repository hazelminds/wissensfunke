-- Eindeutige Besucher zusätzlich zu rohen Seitenaufrufen, weiterhin ohne
-- Cookie und ohne gespeicherte IP-Adresse: visitor_hash ist ein täglich
-- rotierender HMAC-Hash aus Tag + IP + User-Agent (siehe lib/visitorHash.ts).
-- Die IP wird dafür nur kurzzeitig im Server-Speicher verwendet, nie in der
-- Datenbank abgelegt -- der Hash selbst lässt sich nicht zur IP zurückrechnen
-- und ändert sich jeden Tag neu, verknüpft also auch keine Besuche über
-- mehrere Tage hinweg. Gleiches Prinzip wie bei datenschutzfreundlichen
-- Analytics-Tools (z. B. Plausible), die genau damit ganz ohne
-- Cookie-Banner auskommen.

alter table page_views add column if not exists visitor_hash text;
create index if not exists page_views_visitor_hash_idx on page_views (visitor_hash);

alter table page_view_daily add column if not exists unique_visitors integer not null default 0;
