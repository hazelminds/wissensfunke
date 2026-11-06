import { LegalPage } from "@/components/LegalPage";

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="placeholder">{children}</span>;
}

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" updated="Entwurf, noch nicht final">
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          Hazelminds Communications Pte. Ltd., 1 North Bridge Road, #B1-35, High Street Centre,
          Singapore 179094 (siehe <a href="/rechtliches/impressum">Impressum</a>).
        </p>
        <p>
          <Placeholder>
            ZU PRÜFEN: Da der Verantwortliche außerhalb der EU/des EWR sitzt und Angebote gezielt
            an Personen in der EU richtet, ist nach Art. 27 DSGVO voraussichtlich eine Vertretung
            in der EU zu benennen (Name/Anschrift hier ergänzen), sofern keine Ausnahme greift.
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>2. Welche Daten wir verarbeiten</h2>
        <h3>a) Beim Besuch der Seite (Server-/Hosting-Logs)</h3>
        <p>
          Beim Aufruf der Seite verarbeitet unser Hosting-Anbieter Vercel automatisch technische
          Daten (IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Browser-/Geräteinformationen) zur
          Bereitstellung und Absicherung des Angebots. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an fehlerfreiem, sicherem Betrieb).
        </p>
        <h3>b) Bei Registrierung/Login</h3>
        <p>
          Für den Login per Magic-Link verarbeiten wir deine E-Mail-Adresse sowie technische
          Session-Daten (Cookies zur Anmeldeverwaltung). Eine Registrierung über Social-Login-
          Anbieter (z. B. Google, Apple) bieten wir nicht an. Rechtsgrundlage: Art. 6 Abs. 1 lit. b
          DSGVO (Erfüllung des Nutzungsvertrags).
        </p>
        <h3>c) Spielstand/Streak</h3>
        <p>
          Ist kein Konto vorhanden, speichern wir deinen Streak-Fortschritt ausschließlich lokal
          in deinem Browser (localStorage) — diese Daten verlassen dein Gerät nicht. Bei
          bestehendem Konto speichern wir den Streak-Stand serverseitig, verknüpft mit deinem
          Konto. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <h3>d) Käufe/Zahlungen</h3>
        <p>
          Zahlungen laufen über eine gehostete Bezahlseite unseres jeweiligen Zahlungsanbieters
          (Weiterleitung, wie bei Stripe Checkout üblich). Wir verarbeiten dabei nur Kaufreferenz,
          Betrag, Zeitpunkt und — sofern vom Zahlungsanbieter übermittelt — deine E-Mail-Adresse.
          Karten- oder sonstige Zahlungsdaten geben wir zu keinem Zeitpunkt selbst entgegen und
          speichern sie auch nicht: die eigentliche Zahlungsabwicklung findet ausschließlich beim
          Zahlungsdienstleister statt, wir erhalten im Anschluss lediglich eine
          Zahlungsbestätigung. Zusätzlich speichern wir zu jedem Kauf digitaler Inhalte
          Zeitpunkt und IP-Adresse deiner Zustimmung, dass die Freischaltung sofort beginnt und du
          dadurch dein Widerrufsrecht für diesen Kauf verlierst (§ 356 Abs. 5 BGB) — als Nachweis
          für genau diese eine Erklärung, nicht zu Tracking-Zwecken. Rechtsgrundlage: Art. 6
          Abs. 1 lit. b und c DSGVO (Vertragserfüllung bzw. Nachweispflicht).
        </p>
        <h3>e) Spiel-Nutzung (eigene Statistik)</h3>
        <p>
          Wir zeichnen auf, wenn eine Runde eines Spiels gestartet bzw. abgeschlossen wird (Spiel,
          Zeitpunkt), um zu sehen, welche Spiele beliebt sind und wie oft eine Runde zu Ende
          gespielt wird. Bei bestehendem Konto ist das mit deinem Konto verknüpft, als Gast ohne
          Personenbezug. Es handelt sich um eine eigene, selbst betriebene Auswertung (keine
          Weitergabe an bzw. kein Einsatz eines externen Analyse-Dienstleisters). Rechtsgrundlage:
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Weiterentwicklung des
          Angebots).
        </p>
        <h3>f) Support-Anfragen</h3>
        <p>
          Über den Support-Bereich (an dein Konto gebunden, Login erforderlich) verarbeiten wir
          Betreff und Inhalt deiner Nachricht sowie den Antwortverlauf, um deine Anfrage zu
          bearbeiten. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <h3>g) Anonyme Seitenaufruf-Statistik</h3>
        <p>
          Zur Verbesserung des Angebots erfassen wir Seitenaufrufe (aufgerufene Seite, verlinkende
          Domain, Land laut technischem Edge-Header unseres Hosting-Anbieters, grober Gerätetyp).
          Dabei werden weder Cookies gesetzt noch deine IP-Adresse gespeichert: für die Kennzahl
          „eindeutige Besucher&quot; bilden wir stattdessen serverseitig einen Hash aus
          Kalendertag, IP-Adresse und Browser-Kennung, der täglich wechselt und sich nicht auf
          deine IP-Adresse zurückrechnen lässt — Besuche lassen sich damit nicht über mehrere Tage
          hinweg zu einem Profil verknüpfen, vergleichbar mit datenschutzfreundlichen
          Analyse-Tools wie Plausible. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Reichweitenmessung ohne dauerhaften Personenbezug).
        </p>
      </section>

      <section>
        <h2>3. Newsletter/E-Mail-Erinnerungen</h2>
        <p>
          Nur wenn du uns deine E-Mail-Adresse gibst und dem ausdrücklich zustimmst, senden wir
          dir gelegentlich E-Mails zu deiner Nutzung (z. B. eine Erinnerung an deinen Streak). Du
          kannst diese Einwilligung jederzeit widerrufen — über den Abmeldelink in jeder E-Mail
          oder formlos an uns. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).{" "}
          <Placeholder>
            Funktion ist angekündigt, technisch aber noch nicht umgesetzt -- vor Livegang den
            eingesetzten Versanddienstleister (voraussichtlich Brevo) unten bei den
            Dienstleistern ergänzen und Opt-in/Abmeldelogik hier nachschärfen.
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>4. Eingesetzte Dienstleister (Auftragsverarbeitung)</h2>
        <ul>
          <li>
            <strong>Supabase</strong> (Datenbank &amp; Authentifizierung) —{" "}
            <Placeholder>
              ZU ERGÄNZEN: Serverstandort/Subunternehmer-Liste des konkreten Projekts, Abschluss
              eines Auftragsverarbeitungsvertrags (AVV) bestätigen und hier referenzieren
            </Placeholder>
            .
          </li>
          <li>
            <strong>Vercel Inc.</strong> (Hosting) —{" "}
            <Placeholder>
              ZU BESTÄTIGEN: Serverstandort/Drittlandtransfer (Vercel sitzt in den USA),
              Standardvertragsklauseln (SCC) referenzieren, Auftragsverarbeitungsvertrag
              abschließen
            </Placeholder>
            .
          </li>
          <li>
            <strong>Zahlungsdienstleister</strong> —{" "}
            <Placeholder>
              ZU ERGÄNZEN, sobald final entschieden (micropayment.ch und/oder Stripe): Name,
              Sitz, Datenschutzhinweis des Anbieters verlinken, AVV/Auftragsverarbeitung prüfen
            </Placeholder>
            .
          </li>
          <li>
            <strong>E-Mail-Versand</strong> (Newsletter/Erinnerungen) —{" "}
            <Placeholder>
              ZU ERGÄNZEN, sobald technisch angebunden (voraussichtlich Brevo): Name, Sitz,
              Datenschutzhinweis verlinken, AVV/Auftragsverarbeitung prüfen
            </Placeholder>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Cookies &amp; lokaler Speicher</h2>
        <p>
          Wir setzen technisch notwendige Cookies zur Anmeldeverwaltung (Session) sowie
          localStorage für den geräte-lokalen Streak-Fallback ohne Konto ein. Für die eigene
          Spiel- und Seitenaufruf-Statistik (siehe 2e und 2g) werden keine Cookies gesetzt und
          kein lokaler Speicher verwendet. Aktuell setzen wir keine Analyse- oder
          Werbe-Tracking-Cookies bzw. -Pixel ein (z. B. kein Meta/Facebook-Pixel, kein Google
          Analytics).{" "}
          <Placeholder>
            ZU AKTUALISIEREN, sobald Analyse- oder Werbe-Tracking (z. B. Meta-Pixel) hinzukommt --
            dafür vorab eine Einwilligung per Cookie-Consent-Banner einholen (§ 25 TTDSG/TDDDG
            bzw. Art. 6 Abs. 1 lit. a DSGVO) und diesen Abschnitt entsprechend erweitern.
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>6. Speicherdauer</h2>
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck
          erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Das unterscheidet
          sich deutlich danach, ob du etwas gekauft hast oder nicht:
        </p>
        <ul>
          <li>
            <strong>Konto ohne Kauf:</strong> Wir löschen dein Konto und die zugehörigen Daten auf
            Anfrage (über den Support-Bereich). Es gelten dafür keine gesetzlichen
            Aufbewahrungsfristen.
          </li>
          <li>
            <strong>Kaufbezogene Daten (Kaufreferenz, Betrag, Zeitpunkt, E-Mail, Nachweis zum
            Widerrufsverzicht):</strong> Diese bewahren wir mindestens 5 Jahre auf, auch wenn du
            dein Konto zwischenzeitlich löschen lässt — maßgeblich ist hier nicht deutsches,
            sondern{" "}
            <Placeholder>
              singapurisches Recht, da Hazelminds Communications Pte. Ltd. eine singapurische
              Gesellschaft ist: Section 199 Companies Act und das Einkommensteuerrecht verlangen
              jeweils eine Aufbewahrung von mindestens 5 Jahren ab Ende des betreffenden
              Geschäfts-/Steuerjahres (nicht die oft für deutsche Unternehmen zitierten 10 Jahre
              nach HGB/AO) -- vor Livegang durch die Kanzlei/Steuerberatung bestätigen lassen.
            </Placeholder>{" "}
            Rechtsgrundlage für die Aufbewahrung trotz Löschwunsch: Art. 17 Abs. 3 Buchst. b DSGVO.
          </li>
          <li>
            <strong>Seitenaufruf-Rohdaten</strong> (siehe 2g): spätestens nach 90 Tagen zu
            anonymen Tages-Summen verdichtet, die Einzel-Zeilen werden danach gelöscht.
          </li>
          <li>
            <strong>Spiel-Statistik</strong> (siehe 2e):{" "}
            <Placeholder>noch keine feste Löschfrist definiert.</Placeholder>
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Deine Rechte</h2>
        <p>Du hast das Recht auf:</p>
        <ul>
          <li>Auskunft über die zu deiner Person gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Beschwerde bei einer Datenschutzaufsichtsbehörde</li>
        </ul>
        <p>Kontakt für Anfragen: info@noggl.games</p>
      </section>

      <section>
        <h2>8. Datenschutzbeauftragte:r</h2>
        <p>
          <Placeholder>
            ZU PRÜFEN: Ob nach Art. 37 DSGVO bzw. anwendbarem lokalem Recht die Pflicht zur
            Bestellung einer/eines Datenschutzbeauftragten besteht (abhängig von Umfang der
            Datenverarbeitung).
          </Placeholder>
        </p>
      </section>
    </LegalPage>
  );
}
