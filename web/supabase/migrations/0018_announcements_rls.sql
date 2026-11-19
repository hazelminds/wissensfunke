-- Sicherheitslücke schließen: announcements war als einzige Tabelle ohne
-- RLS angelegt (0014_announcements.sql). Ohne RLS ist eine Tabelle über
-- Supabases REST-API mit dem öffentlichen Anon-Key frei les-/schreibbar --
-- der Anon-Key steht zwangsläufig im Browser-Bundle. Keine eigenen
-- Policies nötig: alle echten Lese-/Schreibzugriffe laufen über
-- lib/announcements.ts mit dem Service-Role-Client (umgeht RLS), die
-- Admin-Prüfung sitzt in lib/actions/announcements.ts. RLS ohne Policy =
-- für anon/authenticated komplett verriegelt, genau wie bei allen anderen
-- Tabellen dieses Projekts.

alter table announcements enable row level security;
