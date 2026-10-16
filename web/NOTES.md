# Business-Notizen (Tania)

Persistente Entscheidungen/Rahmenbedingungen, die bei künftigen Features (v. a. Payments)
berücksichtigt werden müssen. Wird automatisch über `CLAUDE.md` geladen.

## Zahlungsanbieter / Firmenstruktur

- **Hazelminds Communications Pte Ltd** (Singapur) hat **kein PayPal** und wird vermutlich auch
  keins bekommen: dafür bräuchte es neue Directoren, die selbst noch kein PayPal-Konto haben
  dürften -- das treibt die Kosten bei der Kanzlei deutlich hoch. **PayPal-Fehlen ist bewusst
  akzeptiert, kein Blocker.**
- **Priorität stattdessen:** Apple Pay und Google Pay über den neuen/zusätzlichen Anbieter
  abdecken (laufen technisch i. d. R. über Kreditkarten-Rails).
- **Sofortüberweisung-Äquivalent** ist bereits separat gelöst über **micropayment.ch** (siehe
  auch README -- dort als primärer, noch nicht angebundener Adapter gelistet).
- Bei micropayment.ch gibt es aber **keine Kreditkarte (KK)** -- und Apple/Google Pay hängen
  normalerweise mit an der KK-Schiene dran, laufen über micropayment.ch also nicht mit.
- Kandidat für den fehlenden KK/Apple-Pay/Google-Pay-Teil (Stand der Recherche): **Creem.io**
  (Merchant of Record, Singapur offiziell als Auszahlungsland bestätigt, 3,9 % + $0.40/Transaktion,
  kein Fixkosten-Sockel) -- aber **kein PayPal/SEPA/Klarna** laut offizieller Doku, was hier egal
  ist, da PayPal eh nicht kommt und SEPA/Sofort schon über micropayment.ch abgedeckt ist.
