import { LegalPage } from "@/components/LegalPage";

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="placeholder">{children}</span>;
}

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" updated="Entwurf, noch nicht final">
      <section>
        <h2>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
        <p>
          Hazelminds Communications Pte. Ltd.
          <br />
          1 North Bridge Road, #B1-35, High Street Centre
          <br />
          Singapore 179094
          <br />
          Singapur
        </p>
      </section>

      <section>
        <h3>Vertreten durch</h3>
        <p>
          <Placeholder>ZU ERGÄNZEN: Name(n) der/des Geschäftsführer(s)/Director(s)</Placeholder>
        </p>
      </section>

      <section>
        <h3>Kontakt</h3>
        <p>
          Telefon: <Placeholder>ZU ERGÄNZEN</Placeholder>
          <br />
          E-Mail: <Placeholder>ZU ERGÄNZEN</Placeholder>
        </p>
      </section>

      <section>
        <h3>Unternehmensregister</h3>
        <p>
          Eingetragen bei ACRA (Accounting and Corporate Regulatory Authority, Singapur)
          <br />
          Unique Entity Number (UEN): 202326202E
        </p>
      </section>

      <section>
        <h3>Umsatzsteuer</h3>
        <p>
          EU-USt-OSS-Registrierung liegt vor.{" "}
          <Placeholder>ZU ERGÄNZEN: konkrete USt-IdNr./OSS-Registrierungsnummer hier eintragen</Placeholder>
        </p>
      </section>

      <section>
        <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
        <p>
          <Placeholder>ZU ERGÄNZEN, sofern presserechtlich/redaktionell relevant</Placeholder>
        </p>
      </section>

      <section>
        <h2>EU-Streitschlichtung</h2>
        <p>
          <Placeholder>
            ZU PRÜFEN: Aktueller Status der EU-Online-Streitbeilegungsplattform (Verweis ggf.
            entfallen oder angepasst nötig) sowie Angaben zur Teilnahme/Nicht-Teilnahme an einem
            Verbraucherschlichtungsverfahren nach VSBG.
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
      </section>

      <section>
        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir
          keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
          übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich.
        </p>
      </section>
    </LegalPage>
  );
}
