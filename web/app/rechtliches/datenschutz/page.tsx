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
          Beim Aufruf der Seite verarbeitet unser Hosting-Anbieter automatisch technische Daten
          (IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Browser-/Geräteinformationen) zur
          Bereitstellung und Absicherung des Angebots. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an fehlerfreiem, sicherem Betrieb).
        </p>
        <h3>b) Bei Registrierung/Login</h3>
        <p>
          Für den Login per Magic-Link verarbeiten wir deine E-Mail-Adresse sowie technische
          Session-Daten (Cookies zur Anmeldeverwaltung). Rechtsgrundlage: Art. 6 Abs. 1 lit. b
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
          Für Einmalkäufe verarbeiten wir Kaufreferenz, Betrag, Zeitpunkt und — sofern vom
          Zahlungsanbieter übermittelt — deine E-Mail-Adresse. Die eigentliche Zahlungsabwicklung
          (inkl. Kartendaten) erfolgt ausschließlich beim eingesetzten Zahlungsdienstleister; diese
          Daten laufen nicht über unsere eigenen Systeme. Rechtsgrundlage: Art. 6 Abs. 1 lit. b
          DSGVO.
        </p>
      </section>

      <section>
        <h2>3. Eingesetzte Dienstleister (Auftragsverarbeitung)</h2>
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
            <strong>Hosting (Vercel oder vergleichbar)</strong> —{" "}
            <Placeholder>
              ZU ERGÄNZEN, sobald Hosting final gewählt ist: Serverstandort, Drittlandtransfer
              prüfen (z. B. USA), ggf. Standardvertragsklauseln (SCC) referenzieren
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
        </ul>
      </section>

      <section>
        <h2>4. Cookies &amp; lokaler Speicher</h2>
        <p>
          Wir setzen technisch notwendige Cookies zur Anmeldeverwaltung (Session) sowie
          localStorage für den geräte-lokalen Streak-Fallback ohne Konto ein. Aktuell werden keine
          Analyse- oder Marketing-Cookies verwendet.{" "}
          <Placeholder>
            ZU AKTUALISIEREN, sobald Analyse-/Marketing-Tools hinzukommen (dann i. d. R.
            Einwilligung nach § 25 TTDSG/TDDDG bzw. Art. 6 Abs. 1 lit. a DSGVO nötig, inkl.
            Cookie-Consent-Banner).
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>5. Speicherdauer</h2>
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck
          erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.{" "}
          <Placeholder>
            ZU ERGÄNZEN: konkrete Löschfristen je Datenkategorie (Konto nach Löschung, Kaufbelege
            nach handels-/steuerrechtlichen Fristen, Logs nach X Tagen).
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>6. Deine Rechte</h2>
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
        <p>
          Kontakt für Anfragen: <Placeholder>ZU ERGÄNZEN (E-Mail-Adresse)</Placeholder>
        </p>
      </section>

      <section>
        <h2>7. Datenschutzbeauftragte:r</h2>
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
