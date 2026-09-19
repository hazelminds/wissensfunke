-- Streak-Schutz (Plus-Perk, s. Kommentar in lib/streak.ts: "'Streak-Schutz' ist
-- ein Ebene-3-Feature fürs Mini-Abo" -- war von Anfang an so geplant).
-- Plus-Mitglieder sammeln automatisch bis zu 2 Freezes (1 pro Monat), die
-- einen verpassten Tag retten statt die Serie auf 1 zurückzusetzen.
-- freezes_granted_month (Format 'YYYY-MM') verhindert Mehrfach-Gutschrift im
-- selben Kalendermonat -- Logik in lib/actions/streak.ts, keine DB-Trigger.
alter table streaks add column if not exists freezes_available integer not null default 0;
alter table streaks add column if not exists freezes_granted_month text;
