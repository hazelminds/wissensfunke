-- Ergänzt die IP-Adresse zum Zeitpunkt der Widerrufsverzicht-Zustimmung
-- (siehe 0015) -- gehört zur Nachweis-Dokumentation für genau diesen Kauf
-- (wer hat wann von wo aus zugestimmt), nicht zur anonymen Seitenaufruf-
-- Statistik (dort wird bewusst keine IP gespeichert, siehe page_views).
-- Rechtsgrundlage: Art. 6 Abs. 1 lit. b/c DSGVO (Vertragserfüllung bzw.
-- Nachweispflicht gegenüber Verbraucherschutzrecht).

alter table purchases add column if not exists widerruf_verzicht_ip text;
