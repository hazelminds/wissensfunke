-- Für die Konto-Übersicht: "Bestleistung" neben der aktuellen Serie zeigen.
-- best_count wird nie kleiner als count -- ein simples GREATEST beim
-- Hochzählen in lib/actions/streak.ts reicht, keine eigene Trigger-Logik.

alter table streaks add column if not exists best_count integer not null default 0;

-- Bestehende Zeilen: bisherige count-Werte als Startwert für best_count übernehmen.
update streaks set best_count = count where best_count < count;
