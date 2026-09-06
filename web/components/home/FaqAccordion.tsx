"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQ = [
  {
    q: "Was ist Noggl?",
    a: "Noggl ist eine Unterhaltungsplattform für Erwachsene mit kurzen Quizrunden, kleinen Rätseln und Selbst-Tests. Alles läuft direkt im Browser — kein Download, kein Konto nötig zum Reinschnuppern.",
  },
  {
    q: "Sind die psychologischen Tests ernsthaft?",
    a: "Nein. Die Selbst-Tests sind reine Unterhaltung und ersetzen keine Beratung oder Diagnose. Ergebnisse sind Anregungen zum Nachdenken, keine professionelle Einschätzung.",
  },
  {
    q: "Brauche ich ein Konto?",
    a: "Nein. Viele Kurzrunden sind gratis und ohne Anmeldung spielbar. Ein kostenloses Konto brauchst du nur für die Bestenliste, deine Serie und Plus-Inhalte.",
  },
  {
    q: "Was bringt Plus?",
    a: "Plus schaltet zusätzliche Tiefenauswertungen und Inhalte frei. Du kannst zwischen einmaligem Kauf und einem monatlichen Mini-Abo wählen.",
  },
  {
    q: "Wie funktioniert die tägliche Serie?",
    a: "Spiel an aufeinanderfolgenden Tagen, um deine Serie auszubauen. Ein Tag Pause setzt die Serie zurück auf eins — also besser jeden Tag eine kurze Runde.",
  },
  {
    q: "Kann ich jederzeit kündigen?",
    a: "Ja. Das monatliche Mini-Abo lässt sich jederzeit mit einem Klick beenden; der Zugang bleibt bis zum Ende des bezahlten Zeitraums aktiv.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 pt-20 md:pt-24">
      <div className="mb-6 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
          Häufige Fragen
        </h2>
      </div>
      <div className="hairline rounded-2xl bg-surface px-5">
        {FAQ.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className={i < FAQ.length - 1 ? "border-b border-line" : ""}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 py-4 text-left font-display text-[15px] font-bold text-ink"
                aria-expanded={isOpen}
              >
                {item.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <p className="pb-4 leading-relaxed text-ink-soft">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
