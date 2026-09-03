import { LegalPage } from "@/components/LegalPage";

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="placeholder">{children}</span>;
}

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" updated="Entwurf, noch nicht final">
      <section>
        <h2>1. Geltungsbereich</h2>
        <p>
          Diese AGB gelten für die Nutzung von Noggl (noggl.games), betrieben von Hazelminds
          Communications Pte. Ltd. (siehe <a href="/rechtliches/impressum">Impressum</a>), sowie
          für den Kauf digitaler Inhalte (Tiefenauswertungen einzelner Tests) und ein optionales
          Abo mit erweitertem Zugang.
        </p>
      </section>

      <section>
        <h2>2. Leistungsbeschreibung</h2>
        <ul>
          <li>Tages-Rätsel und Tages-Mini-Quiz sind dauerhaft kostenlos nutzbar.</li>
          <li>
            Wöchentliche Selbst-Tests zeigen ein grobes Ergebnis immer kostenlos; die vertiefte
            Auswertung ist ein kostenpflichtiger Einmalkauf.
          </li>
          <li>
            Ein optionales Abonnement (aktuell noch nicht aktiv) gibt Zugriff auf alle
            Tiefenauswertungen, ein Archiv sowie Werbefreiheit.
          </li>
        </ul>
        <p>
          Noggl ist ein reines Unterhaltungsangebot ohne Gewinnmöglichkeit — es besteht zu keinem
          Zeitpunkt eine Chance auf einen Geld- oder Sachgewinn.
        </p>
      </section>

      <section>
        <h2>3. Vertragsschluss und Preise</h2>
        <p>
          Der Preis einer Tiefenauswertung wird vor dem Klick auf „Freischalten&quot; angezeigt. Mit
          Klick auf „Freischalten&quot; wirst du zur Zahlungsseite des jeweiligen Zahlungsdienstleisters
          weitergeleitet; der Vertrag kommt mit erfolgreichem Zahlungsabschluss zustande.
        </p>
        <p>
          Aktuelle Beispielpreise: Einmalkauf einer Tiefenauswertung{" "}
          <Placeholder>ab 2,99 €, endgültige Preisstruktur noch nicht final</Placeholder>; Abo{" "}
          <Placeholder>bis 4,99 €/Monat, noch nicht final</Placeholder>.{" "}
          <Placeholder>
            ZU ERGÄNZEN: ob Preise als Brutto-/Endpreise inkl. gesetzlicher USt. ausgewiesen
            werden (abhängig von der finalen steuerlichen Einordnung, siehe Datenschutz/Impressum).
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>4. Digitale Inhalte &amp; Widerrufsrecht</h2>
        <p>
          Beim Kauf einer Tiefenauswertung handelt es sich um digitale Inhalte, die nicht auf
          einem körperlichen Datenträger geliefert werden. Einzelheiten zum Widerrufsrecht und zu
          dessen vorzeitigem Erlöschen bei ausdrücklicher Zustimmung findest du in der{" "}
          <a href="/rechtliches/widerruf">Widerrufsbelehrung</a>.
        </p>
      </section>

      <section>
        <h2>5. Abonnement (sobald aktiv)</h2>
        <ul>
          <li>Abrechnung monatlich im Voraus, automatische Verlängerung bis zur Kündigung.</li>
          <li>
            Kündigung jederzeit mit einem Klick über einen Kündigungsbutton im Konto möglich —
            gleich leicht zugänglich wie der Abschluss.
          </li>
          <li>
            <Placeholder>
              ZU ERGÄNZEN, sobald final: Kündigungsfrist/Wirksamkeitszeitpunkt, Verhalten bei
              Nichtzahlung, Verlängerungslogik.
            </Placeholder>
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Nutzungsrechte</h2>
        <p>
          Mit dem Kauf erhältst du ein einfaches, nicht übertragbares Recht zur persönlichen
          Nutzung der freigeschalteten Inhalte. Eine Weitergabe, Vervielfältigung oder
          gewerbliche Nutzung ist nicht gestattet.
        </p>
      </section>

      <section>
        <h2>7. Haftung</h2>
        <p>
          <Placeholder>
            ZU ERGÄNZEN durch Rechtsberatung: übliche Haftungsbeschränkung (Vorsatz/grobe
            Fahrlässigkeit, wesentliche Vertragspflichten, Ausschluss mittelbarer Schäden) unter
            Berücksichtigung des anwendbaren Verbraucherschutzrechts.
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>8. Änderungen dieser AGB</h2>
        <p>
          <Placeholder>
            ZU ERGÄNZEN: Verfahren für Änderungsmitteilungen und Widerspruchsrecht bei
            bestehenden Verträgen (insbesondere beim Abo).
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>9. Anwendbares Recht &amp; Streitbeilegung</h2>
        <p>
          <Placeholder>
            ZU KLÄREN MIT RECHTSBERATUNG: Der Anbieter sitzt außerhalb der EU (Singapur), verkauft
            aber gezielt an Verbraucher:innen in Deutschland/der EU. Zwingende
            verbraucherschützende Vorschriften des Aufenthaltsstaats der Verbraucher:innen
            (Art. 6 Rom-I-VO) bleiben davon regelmäßig unberührt — eine Rechtswahl zugunsten
            singapurischen Rechts kann diesen Schutz nicht aushebeln. Endgültige Formulierung von
            Rechtswahl- und Gerichtsstandsklausel braucht anwaltliche Prüfung.
          </Placeholder>
        </p>
      </section>
    </LegalPage>
  );
}
