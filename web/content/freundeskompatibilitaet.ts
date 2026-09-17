/**
 * "Freundes-Kompatibilität" -- zwei Personen beantworten dieselben Fragen
 * (erst du, dann per Link deine Freundin/dein Freund) und bekommen am Ende
 * einen Übereinstimmungs-Wert. Keine "richtigen" Antworten, nur Vergleich.
 */

export interface CompatQuestion {
  question: string;
  options: string[];
}

export const compatQuestions: CompatQuestion[] = [
  {
    question: "Wie oft muss man sich melden, damit eine Freundschaft für dich noch „lebt“?",
    options: [
      "Am besten jeden Tag ein bisschen",
      "Ein-, zweimal die Woche reicht völlig",
      "Auch nach Monaten Funkstille ist es sofort wie vorher",
      "Unregelmäßig, aber wenn, dann intensiv",
    ],
  },
  {
    question: "Was ist für dich der Beweis für eine gute Freundschaft?",
    options: [
      "Dass wir uns alles erzählen können, auch die peinlichen Sachen",
      "Dass wir uns aufeinander verlassen können, wenn's drauf ankommt",
      "Dass wir zusammen einfach nur Quatsch machen können",
      "Dass wir uns gegenseitig ehrlich Feedback geben, auch unangenehmes",
    ],
  },
  {
    question: "Dein Freund/deine Freundin hat gerade Liebeskummer. Was machst du?",
    options: [
      "Ich höre erstmal einfach nur zu",
      "Ich komme sofort vorbei, mit Essen und einem Ablenkungsplan",
      "Ich schicke ein lustiges Meme, um die Stimmung zu heben",
      "Ich gebe eine ehrliche Einschätzung zur Lage, auch wenn's wehtut",
    ],
  },
  {
    question: "Wie verbringt ihr am liebsten Zeit zusammen?",
    options: [
      "Bei einem ruhigen Abend zu zweit, viel reden",
      "Bei einer gemeinsamen Aktivität — Sport, Kochen, was Kreatives",
      "Auf einer Feier oder unter Leuten",
      "Spontan, ohne festen Plan, einfach schauen was passiert",
    ],
  },
  {
    question: "Wie gehst du mit Streit unter Freunden um?",
    options: [
      "Ich spreche es sofort direkt an",
      "Ich brauche erst ein bisschen Abstand, dann rede ich",
      "Ich warte meist ab, bis es sich von selbst löst",
      "Ich hole mir eine dritte Meinung ein, bevor ich reagiere",
    ],
  },
  {
    question: "Was nervt dich am meisten an Freunden?",
    options: [
      "Unzuverlässigkeit — abgesagte Pläne in letzter Minute",
      "Wenn jemand ständig nur über sich selbst redet",
      "Wenn jemand sich nie meldet, aber Nähe erwartet",
      "Wenn jemand aus Angst zu verletzen nie ehrlich seine Meinung sagt",
    ],
  },
  {
    question: "Wie viele wirklich enge Freunde hast du am liebsten?",
    options: [
      "Einen oder zwei, aber die dafür richtig eng",
      "Eine kleine feste Gruppe von drei bis fünf",
      "Lieber viele verschiedene Leute für verschiedene Anlässe",
      "Kommt drauf an — Qualität ist wichtiger als eine Zahl",
    ],
  },
  {
    question: "Was würdest du für eine gute Freundschaft tun?",
    options: [
      "Mitten in der Nacht ans Telefon gehen, ohne zu zögern",
      "Einen Streit riskieren, um ehrlich zu sein",
      "Eigene Pläne canceln, wenn jemand mich wirklich braucht",
      "Einfach immer verlässlich da sein, ganz ohne große Gesten",
    ],
  },
];

export interface CompatTier {
  minPct: number;
  title: string;
  emoji: string;
  description: string;
  gradientClass: string;
  /** Ausführliche Analyse -- hinter dem Einmalkauf (siehe unlockPriceCents unten). */
  detail: string;
}

export const compatTiers: CompatTier[] = [
  {
    minPct: 0,
    title: "Gegensätze ziehen sich an",
    emoji: "🧲",
    description: "Kaum eine Antwort war gleich — und trotzdem seid ihr Freunde. Das sagt mehr über eure Freundschaft als jeder Test.",
    gradientClass: "from-[hsl(260,60%,58%)] to-[hsl(260,60%,46%)]",
    detail:
      "Bei den meisten Fragen habt ihr komplett unterschiedlich geantwortet — und trotzdem funktioniert eure Freundschaft. Das ist ein gutes Zeichen: Ihr schätzt euch nicht wegen der Gemeinsamkeiten, sondern weil ihr euch gegenseitig neue Perspektiven zeigt. Solche Freundschaften sind oft besonders bereichernd, solange ihr eure unterschiedlichen Bedürfnisse — etwa wie oft man sich meldet oder wie man Streit klärt — offen anspricht, statt sie als selbstverständlich vorauszusetzen.",
  },
  {
    minPct: 30,
    title: "Bunte Mischung",
    emoji: "🎨",
    description: "Ihr tickt in einigen Dingen ziemlich unterschiedlich — genau das macht eure Freundschaft spannend.",
    gradientClass: "from-[hsl(28,90%,58%)] to-[hsl(12,85%,52%)]",
    detail:
      "Ihr liegt bei einigen zentralen Themen auf einer Linie, tickt aber bei anderen — etwa wie ihr mit Streit umgeht oder wie viel Nähe ihr braucht — ziemlich unterschiedlich. Das ist völlig normal und macht eure Freundschaft interessant. Wichtig ist, bei den Punkten, wo ihr euch unterscheidet, bewusst aufeinander zuzugehen, statt anzunehmen, der andere tickt automatisch wie man selbst.",
  },
  {
    minPct: 55,
    title: "Eingespieltes Team",
    emoji: "🤝",
    description: "Ihr ergänzt euch gut und liegt bei den wichtigen Dingen auf einer Linie.",
    gradientClass: "from-[hsl(160,60%,48%)] to-[hsl(160,60%,36%)]",
    detail:
      "Bei den meisten Fragen wart ihr euch einig — ihr müsst euch selten erklären, weil ihr intuitiv versteht, wie der andere tickt. Das macht den Alltag als Freunde leicht: Ihr könnt euch aufeinander verlassen, ohne viele Worte zu brauchen. Die wenigen Punkte, bei denen ihr unterschiedlich geantwortet habt, lohnen sich trotzdem für ein kurzes Gespräch.",
  },
  {
    minPct: 80,
    title: "Zwillingsseelen",
    emoji: "👯",
    description: "Ihr tickt erstaunlich gleich! Kein Wunder, dass ihr euch so gut versteht.",
    gradientClass: "from-[hsl(340,80%,60%)] to-[hsl(340,80%,48%)]",
    detail:
      "Fast jede Antwort war identisch — kein Wunder, dass ihr euch blind versteht. Solche Freundschaften fühlen sich oft an, als würde man sich selbst gegenübersitzen: gleiche Erwartungen an Nähe, gleicher Umgang mit Konflikten, gleiches Verständnis von Loyalität. Der einzige Risikofaktor bei so viel Übereinstimmung: Achtet darauf, euch trotzdem gegenseitig zu challengen und neue Perspektiven reinzulassen.",
  },
];

export function tierForPct(pct: number): CompatTier {
  return [...compatTiers].reverse().find((t) => pct >= t.minPct) ?? compatTiers[0];
}

/** Preis der ausführlichen Analyse — immer VOR dem Klick auf "Freischalten" sichtbar (Compliance §5). */
export const unlockPriceCents = 299;
export const unlockTitle = "Ausführliche Analyse";
export const unlockDescription = "Was euer Ergebnis wirklich über eure Freundschaft aussagt.";

/** Kodiert die Antwort-Indizes kompakt für die URL (z.B. "0-2-1-3-0-1-2-3"). */
export function encodeAnswers(indices: number[]): string {
  return indices.join("-");
}

export function decodeAnswers(code: string): number[] | null {
  const parts = code.split("-").map((p) => Number.parseInt(p, 10));
  if (parts.length !== compatQuestions.length) return null;
  if (parts.some((n) => Number.isNaN(n) || n < 0 || n > 3)) return null;
  return parts;
}
