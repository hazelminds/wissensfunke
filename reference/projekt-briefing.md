# Projekt-Briefing: Rätsel-/Quiz-/Selbst-Test-Seite (Arbeitstitel „Wissensfunke")

Dieses Dokument fasst alles zusammen, was in der Konzeptions-Runde erarbeitet wurde – gedacht als Übergabe an Claude Code für den eigentlichen technischen Aufbau. Es ist ein lebendes Dokument: vieles ist entschieden, einiges bewusst noch offen (siehe Abschnitt 8).

---

## 1. Projektüberblick

Neue, **eigenständige** Unterhaltungs-Website mit Rätseln, Quiz und Selbst-Tests. Rein zur Unterhaltung – **keine Gewinnmöglichkeit**, kein Bezug zu Tanias bestehenden Dating-/Community-Portalen (2Hazelz, Justlo, Linduu etc.), eigene Marke, eigenes visuelles Konzept.

**Zielgruppe:** breite, deutschsprachige Nutzerschaft, die kurze Unterhaltungsformate mag (Rätsel, Wissenstests, Persönlichkeitstests) und bereit ist, kleine Beträge dafür zu zahlen.

---

## 2. Produktstruktur – drei Ebenen

**Ebene 1 – Täglicher Gratis-Anker (kostenlos, kein Geld involviert)**
- Tages-Rätsel (wechselnd: Sudoku, Wortspiel, Logik-Rätsel)
- Kurzes Tages-Mini-Quiz
- Login-Streak mit rein kosmetischen Belohnungen (Abzeichen etc.) – **kein** Geldwert, kein Zufallselement mit Vermögenswert

**Ebene 2 – Wöchentliche Selbst-Tests/Quiz (Freemium)**
- Grobes Ergebnis **immer sofort gratis sichtbar** (wichtig, siehe Compliance-Abschnitt)
- Vertiefte Auswertung / Themen-Analyse als **Einmalkauf, 2–5 €**
- Themen: Persönlichkeit, Beziehungstyp, Kompatibilität mit Freunden/Partner, Allgemeinwissen – bewusst unterhaltsam statt diagnostisch formuliert

**Ebene 3 – Power-User-Mini-Abo (bis ca. 4,99 €/Monat)**
- Zugriff auf alle Tiefenauswertungen statt Einzelkauf
- Archiv aller bisherigen Rätsel/Tests
- Werbefreiheit
- „Streak-Schutz" (ein verpasster Tag reißt den Streak nicht ab)

**Viraler Wachstumshebel:** Kompatibilitäts-/Freundestests mit Teilen-Funktion (Nutzer A macht Test → Link an Nutzer B → beide sehen Vergleich). Organisches Wachstum ohne Ad-Budget.

### Monetarisierungs-Matrix
| Feature | Modell | Preis |
|---|---|---|
| Tages-Rätsel & Mini-Quiz | gratis | – |
| Tiefenauswertung einzelner Test | Einmalkauf | 2–5 € |
| Alle Tests + Archiv + werbefrei | Mini-Abo | bis 4,99 €/Monat |

---

## 3. Compliance-Anforderungen (verbindlich, nicht optional)

Diese Regeln stammen aus einer ausführlichen Recherche zu Apple/Google/Zahlungsdienstleister- und deutschem Glücksspielrecht und **müssen** in der Umsetzung berücksichtigt werden:

1. **Keine Gewinnmöglichkeit, niemals.** Kein Cash-out, keine handelbaren/übertragbaren Zufalls-Items. Das ist der Kernpunkt, der die gesamte Seite außerhalb der Glücksspiel-Definition hält (Glücksspielstaatsvertrag: Einsatz + Zufall + Gewinnchance müssen alle drei vorliegen – bei uns fehlt Gewinnchance komplett).
2. **Keine Casino-Optik** (Slots, Roulette, Kartenspiel-im-Wett-Look) – sonst greift Apples „Simulated Gambling"-Einstufung mit Pflicht-Alterskennzeichnung 17+.
3. **Keine Rubbellos-/Scratch-Card-Optik** für Freischalt-Momente – zu nah an echten Glücksspiel-Assoziationen (Soforlotterie). Stattdessen: Fortschrittsbalken, Reveal-Animation, kurzer Konfetti-Moment o. ä.
4. **Kein „Gewinn"/„Jackpot"/„Preis"-Vokabular** im Marketing/UI-Text, selbst wenn nichts ausgezahlt wird.
5. **Preis immer VOR dem Klick auf „Freischalten"/„Ergebnis anzeigen" sichtbar machen** – nicht erst danach (Sunk-Cost-Trigger gilt als irreführend, siehe Fastic-Klage der Verbraucherzentrale).
6. **Kündigungsbutton-Pflicht** für das Mini-Abo (seit 2022 in Deutschland gesetzlich vorgeschrieben) – gut sichtbar, genauso leicht wie der Abschluss.
7. **Widerrufsrecht bei digitalen Inhalten (§ 356 Abs. 5 BGB):** 14 Tage Widerruf, außer der Nutzer stimmt ausdrücklich und dokumentiert zu, dass das Widerrufsrecht mit sofortigem Zugriff erlischt.
8. **Keine „kostenlos, wenn du X schaffst"-Mechanik** (Challenge nicht erfüllt → automatisch kostenpflichtig) – exakt das Muster, das Fastic gerade gerichtlich zerlegt wird.
9. **Selbst-Tests mit psychologischem/gesundheitlichem Einschlag:** unterhaltsam framen, nicht diagnostisch („dein Ergebnis zeigt eine Tendenz", nicht „du bist …"). Keine Heilversprechen (Heilmittelwerbegesetz).
10. **Keine gefakten/nicht gekennzeichneten Bewertungen oder Testimonials.**
11. **Zahlungsseite:** Da keine Gewinnmöglichkeit besteht, ist **keine** Glücksspiellizenz und **keine** MCC 7995 nötig – normale Kategorien für digitale Inhalte/Abos bei Stripe/PayPal o. ä. reichen (Standard-E-Commerce, kein High-Risk-Segment).

---

## 4. Design-System – Version 4 (freigegeben)

Nach mehreren Iterationen (dunkle Quiz-Show-Optik → zu unruhiger Neo-Brutalismus/Sticker-Look → zu steriler Editorial-Minimalismus) ist **Variante 4** die freigegebene Richtung: an erfolgreichen Gamification-/Quiz-Apps (Duolingo, Kahoot) orientiert, aber eigenständig gestaltet – **keine 1:1-Kopie**.

### Farben (CSS-Variablen, exakt übernehmen)
```css
--bg: #FAFAFF;            /* Seitenhintergrund, sehr helles kühles Weiß */
--surface: #FFFFFF;       /* Karten/Flächen */
--ink: #1B1B2F;           /* Haupttextfarbe */
--primary: #6C5CE7;       /* Marken-Indigo/Violett – Haupt-CTA-Farbe */
--primary-dark: #4E3FC4;  /* 3D-Button-Schattenkante für primary */
--primary-soft: #EFECFF;  /* helle Tinte für Chips/Badges */
--coral: #FF7A59;         /* Sekundärakzent */
--coral-dark: #E85A38;
--coral-soft: #FFEDE7;
--green: #00C896;         /* richtig/Erfolg */
--green-dark: #00A67D;
--green-soft: #DFFBF3;
--red: #FF5A6E;           /* falsch */
--red-dark: #E04054;
--red-soft: #FFE6E9;
--gold: #FFB800;          /* perfektes Ergebnis / Trophäen-Stufe */
--gold-dark: #E29E00;
--gold-soft: #FFF4D9;
--muted: #8A8AA3;
--line: rgba(27,27,47,0.08);
```

### Typografie
- **Display/Headlines/Buttons/Zahlen:** „Fredoka" (Google Font), Gewichte 500/600/700
- **Fließtext/UI:** „Nunito" (Google Font), Gewichte 400/600/700/800

### Signatur-UI-Elemente (das macht den Look aus)
- **3D-„Gummi"-Buttons**: Vollfarbe + versetzter Schatten in dunklerer Farbtonstufe darunter; beim Klick bewegt sich der Button nach unten, Schatten verschwindet (Duolingo-Prinzip)
- **Fortschritt als Icon-Kette, NICHT als schlichte Punkte**: nummerierte Kreise pro Frage, die sich beim Beantworten mit ✓ (richtig, grün) oder ✕ (falsch, rot) füllen
- **Kategorie-Chips mit Emoji-Icons** statt reinem Text: 🌍 Geografie, 🧬 Biologie, 🏛️ Geschichte, ⚗️ Chemie, 🎨 Kunst
- **Antwortoptionen mit farbigen Buchstaben-Badges** (A/B/C/D), Farbfolge: primary → coral → green → gold. Bei Auswahl: richtig = grün getönter Hintergrund + ✓, falsch = rot getönter Hintergrund + ✕, übrige gedimmt
- **Ergebnis-Badge**: großer runder Badge mit Emoji + Farbverlauf je Rang-Stufe, sanfte Pop-In-Animation:
  - 0–1 richtig: 🌱 „Neugieriger Anfänger" – grüner Verlauf
  - 2–3 richtig: 🥉 „Solides Grundwissen" – coral-Verlauf
  - 4 richtig: 🥈 „Wissens-Ass" – violetter Verlauf
  - 5 richtig: 🏆 „Trivia-Champion" – goldener Verlauf
- **Kurzer, dosierter Konfetti-Moment NUR bei perfektem Ergebnis** (5/5) – kein Dauerfeuerwerk, ca. 18 Partikel, unter 1 Sekunde
- **Paywall als freundliche „Shop-Karte"**, kein bedrohlicher Sperrbildschirm: verschwommene Balken-Vorschau der Themen-Analyse, Preis-Tag, 3D-Button „Freischalten"; beim Klick wachsen die echten Balken sanft rein

### Bewusst vermieden
- Casino-/Slot-/Roulette-Optik
- Rubbellos-/Scratch-Card-Metapher
- Halftone-Muster, Rotation, harte Offset-Schatten überall (das war Variante 2 – als „zu bunt/unruhig/quirlig" verworfen)
- Reine Punkte/Striche als Fortschrittsanzeige (explizit durch Icon-Kette ersetzt)

---

## 5. Bestehender Prototyp (Referenz-Code vorhanden)

Es existiert bereits ein vollständig funktionierender, eigenständiger HTML/CSS/JS-Prototyp (`wissensquiz-prototyp-v4.html`), der das oben beschriebene Design 1:1 umsetzt – inklusive:
- Start-Screen mit Kategorie-Icons und Meta-Chips
- Quiz-Flow mit 5 Beispielfragen (Geografie, Biologie, Geschichte, Chemie, Kunst), Fortschritts-Icon-Kette, Erklärungstext nach jeder Antwort
- Ergebnis-Screen mit Rang-Badge, verschwommener Themen-Analyse hinter Paywall-Karte, Freischalt-Demo (kein echtes Geld), Konfetti bei perfektem Ergebnis

**Empfehlung:** Diese Datei Claude Code direkt als Referenz mitgeben – der komplette CSS- und JS-Code (Farbwerte, Animationen, Interaktionslogik) kann von dort übernommen bzw. in die echte Projektstruktur (Komponenten, echtes Backend, echte Zahlungsanbindung) überführt werden, statt alles neu zu beschreiben.

Zusätzlich existiert ein separates Tool `monetarisierungs-rechner.html` (Umsatz-/Gewinn-Modellrechner mit Annahmen zu Besucherzahl, Conversion-Raten, Abo-Churn, Zahlungsgebühren) – kein Teil der eigentlichen Seite, sondern ein Planungs-Hilfsmittel. Verwendete Standardannahmen darin: 20.000 Besucher/Monat, 2 % Einmalkauf-Conversion (3,50 €), 0,5 % Abo-Conversion (4,99 €/Monat), 15 % monatliche Kündigungsrate, 2,9 % + 0,30 € Zahlungsgebühr, 50 € Fixkosten.

---

## 6. Wettbewerber-Referenzen (Inspiration, nicht kopieren)

- **16personalities.com** – kostenloser Test, grobes Ergebnis immer gratis, vertiefte Auswertung („Premium Career Kit") als Einmalkauf. Vorbild für das Freemium-Muster bei Selbst-Tests.
- **costarastrology.com (Co-Star)** – Gratis-Kern + Freundes-Kompatibilität als viraler Hebel, ABER: wird für intransparente Zusatzkosten kritisiert. Warnbeispiel für Preistransparenz.
- **Sudoku.com (Easybrain)** – Kernspiel gratis, Kleinstkäufe für Werbefreiheit/Hilfen. Vorbild für Monetarisierung des täglichen Rätsel-Teils.
- **testedich.de** – größtes deutsches Quiz-Portal, beweist Marktgröße für dieses Content-Format in Deutschland (dort primär werbefinanziert, nicht per Kleinbetrag).
- **Design-Inspiration (nicht Content):** Duolingo, Kahoot – für die UI-Sprache in Abschnitt 4.

---

## 7. Technische Fragen, die Claude Code klären/vorschlagen sollte

Diese Punkte wurden in der Konzeptions-Runde bewusst nicht entschieden – hier sollte Claude Code Vorschläge machen bzw. nachfragen:
- Tech-Stack (z. B. Next.js/React-Frontend + Backend/DB-Lösung wie Supabase/Postgres)
- Hosting/Deployment-Ziel
- Zahlungsanbieter-Integration (Stripe/PayPal/andere) – technisch anzubinden, ohne dass echte Zahlungsdaten je durch die KI selbst laufen
- Datenmodell für Nutzer, Testergebnisse, Käufe/Abos, Content-Verwaltung (damit neue Tests ohne Code-Änderung eingepflegt werden können)
- Umsetzung des Kündigungsbuttons und der Widerrufs-/Consent-Logik (Punkt 6+7 in Abschnitt 3)

---

## 8. Noch offen / bewusst nicht entschieden

- **Markenname:** „Wissensfunke" ist nur ein Arbeitstitel aus dem Prototyp, kein finaler Name
- **Domain:** noch nicht gewählt
- **Vollständiger Content-Backlog:** bisher nur 5 Beispiel-Wissensfragen; echte Seite braucht deutlich mehr Fragen/Tests pro Kategorie sowie ausformulierte Persönlichkeits-/Kompatibilitätstests
- **Rechtstexte:** AGB, Datenschutzerklärung, Impressum, Widerrufsbelehrung müssen als Entwürfe erstellt und vor Livegang von einer Anwältin/einem Anwalt geprüft werden (insbesondere wegen der laufenden Verbraucherzentrale-Klagewelle gegen Abo-Fallen)
- **Rechtsform/Betreiber des Projekts:** noch nicht festgelegt, wer die Seite rechtlich betreibt

---

*Erstellt aus einer Konzeptions-Session zwischen Tania und Claude. Enthält Rechercheergebnisse zu Recht/Compliance sowie ein vollständiges, freigegebenes Design-System samt funktionierendem Referenz-Prototyp.*
