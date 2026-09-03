import { LegalPage } from "@/components/LegalPage";

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="placeholder">{children}</span>;
}

export default function WiderrufPage() {
  return (
    <LegalPage title="Widerrufsbelehrung" updated="Entwurf, noch nicht final">
      <p>
        <Placeholder>
          Basiert auf der gesetzlichen Muster-Widerrufsbelehrung (Anlage 1 zu Art. 246a § 1 Abs. 2
          EGBGB), angepasst für digitale Inhalte nach § 356 Abs. 5 BGB. Kontaktdaten unten
          ergänzen und vor Livegang anwaltlich bestätigen lassen.
        </Placeholder>
      </p>

      <section>
        <h2>Widerrufsrecht</h2>
        <p>
          Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen einen über Noggl
          geschlossenen Kaufvertrag über digitale Inhalte zu widerrufen. Die Widerrufsfrist
          beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
        </p>
        <p>
          Um dein Widerrufsrecht auszuüben, musst du uns —{" "}
          <Placeholder>
            Hazelminds Communications Pte. Ltd., 1 North Bridge Road, #B1-35, High Street Centre,
            Singapore 179094, Telefon: ZU ERGÄNZEN, E-Mail: ZU ERGÄNZEN
          </Placeholder>{" "}
          — mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine
          E-Mail) über deinen Entschluss, diesen Vertrag zu widerrufen, informieren. Du kannst
          dafür das untenstehende Muster-Widerrufsformular verwenden, das jedoch nicht
          vorgeschrieben ist.
        </p>
        <p>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung über die Ausübung
          des Widerrufsrechts vor Ablauf der Widerrufsfrist absendest.
        </p>
      </section>

      <section>
        <h2>Folgen des Widerrufs</h2>
        <p>
          Wenn du diesen Vertrag widerrufst, erstatten wir dir alle Zahlungen, die wir von dir
          erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem die
          Mitteilung über deinen Widerruf bei uns eingegangen ist. Für diese Rückzahlung
          verwenden wir dasselbe Zahlungsmittel, das du bei der ursprünglichen Transaktion
          eingesetzt hast, es sei denn, mit dir wurde ausdrücklich etwas anderes vereinbart.
        </p>
      </section>

      <section>
        <h2>Vorzeitiges Erlöschen des Widerrufsrechts</h2>
        <p>
          Dein Widerrufsrecht erlischt vorzeitig, wenn wir mit der Ausführung des Vertrags (d. h.
          der Freischaltung der Tiefenauswertung) begonnen haben, nachdem du
        </p>
        <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <li>
            ausdrücklich zugestimmt hast, dass wir mit der Ausführung des Vertrags vor Ablauf der
            Widerrufsfrist beginnen, und
          </li>
          <li>
            deine Kenntnis davon bestätigt hast, dass du durch deine Zustimmung mit Beginn der
            Ausführung des Vertrags dein Widerrufsrecht verlierst.
          </li>
        </ol>
        <p>
          <Placeholder>
            ZU BAUEN (noch nicht umgesetzt): Diese ausdrückliche Zustimmung + Kenntnisbestätigung
            muss als aktive, dokumentierte Checkbox im Checkout-Flow eingeholt werden (siehe
            Kommentar in lib/actions/checkout.ts) — ohne das ist die vorzeitige Erlöschung nicht
            wirksam vereinbart und Käufer:innen behalten das volle 14-Tage-Widerrufsrecht.
          </Placeholder>
        </p>
      </section>

      <section>
        <h2>Muster-Widerrufsformular</h2>
        <p>
          (Wenn du den Vertrag widerrufen willst, kannst du dieses Formular ausfüllen und
          zurücksenden.)
        </p>
        <p>
          An <Placeholder>Hazelminds Communications Pte. Ltd., Adresse/E-Mail wie oben</Placeholder>:
        </p>
        <p>
          Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der
          folgenden digitalen Inhalte:
          <br />
          — Bestellt am: _______________
          <br />
          — Name der Verbraucher:in: _______________
          <br />
          — Anschrift der Verbraucher:in: _______________
          <br />
          — Datum: _______________
        </p>
      </section>
    </LegalPage>
  );
}
