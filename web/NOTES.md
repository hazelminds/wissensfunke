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
- **Creem.io geprüft und wieder verworfen:** zu junge/kleine Firma (gegr. 2024, ~2 Personen
  Stand Mitte 2025), keine auffindbare PCI-DSS/SOC2-Zertifizierung -- zu riskant, um Zahlungen
  drüber laufen zu lassen.
- **ComatsMedia (Tanias deutsches Einzelunternehmen, wo Citychatter läuft) als Standort für Noggl
  verworfen:** Mollie und Stripe haben diese Firma früher schon mal wegen Citychatter (Dating =
  Hochrisiko-Kategorie) rausgeworfen. Das Risiko hängt an der Firma, nicht am Produkt -- würde
  auch bei neuen Anbietern zu Ablehnung/strengerer Prüfung führen. Noggl bleibt daher unter
  **Hazelminds Pte Ltd** (saubere Historie, Stripe läuft dort schon).
- **MoR-Steuerautomatik (Paddle/Creem/etc.) bringt Tania keinen echten Vorteil** -- die VAT-Abwicklung
  läuft bei ihr ohnehin unabhängig von der Buchungsanzahl über einen eigenen VAT-Anbieter, nicht
  über den Zahlungsanbieter. Macht reine (günstigere) Payment-Service-Provider wieder attraktiv,
  trotz "keine Steuerautomatik".
- **Aktuelle Top-Kandidaten für den fehlenden KK/Apple-Pay/Google-Pay-Teil unter Hazelminds:**
  1. **Airwallex** (Top-Pick) -- in Singapur praktisch heimisch, gegr. 2015, gut finanziert (Serie G,
     8 Mrd. $ Bewertung, u. a. Visa/Mastercard als Investoren), PCI-DSS Level 1 + SOC1/SOC2,
     ab ca. 3,3-3,6 % + 0,50 S$, kein Fixkosten-Sockel, Apple/Google Pay dabei. Kein MoR (Hazelminds
     bleibt Verkäufer) -- hier egal, siehe oben.
  2. **Paddle** -- reifste/etablierteste Option (gegr. 2012, KKR-finanziert, PCI-DSS v4.0), aber
     teurer (5 % + 0,50 $) und MoR-Steuerautomatik bringt nichts Zusätzliches mehr.
  3. **Polar.sh** -- günstiger (4 % + 0,40 $), aber Firmenhintergrund (Gründungsjahr, Finanzierung,
     Singapur-Zulassung) nicht auffindbar/unklar -- vor Nutzung direkt bei denen klären.
- **Offener Punkt, kommt erst später:** Tania zieht ihre Kaufhistorie für Hazelminds aus dem
  eigenen Backend (nicht direkt aus Stripe) für die monatliche VAT-Meldung im Template ihres
  VAT-Anbieters. Für Noggl muss perspektivisch ein ähnlicher Export/Upload gebaut werden, sobald
  klar ist, welcher Zahlungsanbieter wie welche Daten liefert -- noch nicht konkret geplant.
