-- § 356 Abs. 5 BGB: Das Widerrufsrecht bei digitalen Inhalten erlischt nur,
-- wenn die Person vor dem Kauf ausdrücklich zugestimmt hat, dass die
-- Freischaltung vor Ablauf der 14-tägigen Widerrufsfrist beginnt, UND zur
-- Kenntnis genommen hat, dass sie dadurch ihr Widerrufsrecht verliert. Ein
-- bloßer Hinweis in der Widerrufsbelehrung reicht dafür nicht -- es braucht
-- eine nachweisbare, auf genau diesen Kauf bezogene Erklärung (siehe
-- Checkbox im Checkout-Flow, lib/actions/checkout.ts). NULL = (noch) keine
-- dokumentierte Zustimmung, z. B. bei älteren Käufen vor Einführung dieser
-- Spalte -- für die gilt weiterhin das volle 14-Tage-Widerrufsrecht.

alter table purchases add column if not exists widerruf_verzicht_bestaetigt_um timestamptz;
