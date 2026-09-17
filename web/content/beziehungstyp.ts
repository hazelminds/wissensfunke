/**
 * "Dein Beziehungstyp" -- leichtes Persönlichkeits-Quiz, keine Diagnose.
 * Jede Antwortoption zählt auf einen von vier Beziehungstypen ein; am Ende
 * gewinnt der Typ mit den meisten Punkten (Gleichstand: erster Treffer in
 * relationshipTypes-Reihenfolge).
 */

export interface RelationshipOption {
  text: string;
  type: string;
}

export interface RelationshipQuestion {
  question: string;
  options: RelationshipOption[];
}

export interface RelationshipType {
  id: string;
  title: string;
  emoji: string;
  description: string;
  gradientClass: string;
}

export const relationshipTypes: RelationshipType[] = [
  {
    id: "romantiker",
    title: "Der Romantiker",
    emoji: "💕",
    description:
      "Du liebst mit dem ganzen Herzen und lässt dich gern von großen Gefühlen tragen. Kerzenschein-Dinner, spontane Liebesbotschaften, Gespräche bis spät in die Nacht — für dich ist Romantik kein Klischee, sondern Lebenselixier. Achte nur darauf, dass der Alltag mit deinen hohen Erwartungen mithalten kann.",
    gradientClass: "from-[hsl(340,80%,60%)] to-[hsl(340,80%,48%)]",
  },
  {
    id: "fels",
    title: "Der Fels in der Brandung",
    emoji: "🪨",
    description:
      "Verlässlichkeit ist für dich der Kern jeder guten Beziehung. Du musst nicht jeden Tag Feuerwerk erleben — ein ruhiger Alltag mit einem Menschen, auf den Verlass ist, bedeutet dir mehr als jede große Geste. Pass nur auf, dass aus Routine nicht Stillstand wird.",
    gradientClass: "from-[hsl(210,70%,55%)] to-[hsl(210,70%,42%)]",
  },
  {
    id: "freigeist",
    title: "Der Freigeist",
    emoji: "🦋",
    description:
      "Nähe ja, aber bitte mit Freiraum. Du brauchst eigene Projekte, eigene Freunde und Zeit für dich selbst, um in einer Beziehung aufzublühen. Für dich bedeutet Liebe, den anderen so zu nehmen, wie er ist — und selbst genauso frei sein zu dürfen. Sprich dein Bedürfnis nach Freiraum offen an, damit es nicht als Distanz missverstanden wird.",
    gradientClass: "from-[hsl(160,60%,48%)] to-[hsl(160,60%,36%)]",
  },
  {
    id: "beschuetzer",
    title: "Der Beschützer",
    emoji: "🛡️",
    description:
      "Du gibst in Beziehungen viel — vielleicht manchmal mehr, als gut für dich ist. Für Menschen, die dir wichtig sind, würdest du Berge versetzen, und du hast ein feines Gespür dafür, wann jemand Unterstützung braucht. Denk daran: Eine gute Beziehung ist keine Einbahnstraße — lass dich auch selbst beschützen.",
    gradientClass: "from-[hsl(38,90%,58%)] to-[hsl(28,90%,50%)]",
  },
];

export const relationshipQuestions: RelationshipQuestion[] = [
  {
    question: "Wie fühlst du dich am Anfang einer neuen Beziehung?",
    options: [
      { text: "Ich beobachte erstmal in Ruhe, bevor ich mich wirklich öffne.", type: "fels" },
      { text: "Total euphorisch — ich denke nur noch an die andere Person.", type: "romantiker" },
      { text: "Aufgeregt, aber meinen eigenen Freiraum gebe ich nicht auf.", type: "freigeist" },
      { text: "Ich will direkt wissen, wie ich für die Person da sein kann.", type: "beschuetzer" },
    ],
  },
  {
    question: "Dein Partner/deine Partnerin hatte einen richtig stressigen Tag. Was machst du?",
    options: [
      { text: "Ich übernehme sofort und kümmere mich um alles Organisatorische.", type: "beschuetzer" },
      { text: "Ich plane spontan etwas Schönes, um abzulenken.", type: "romantiker" },
      { text: "Ich bin einfach da, ganz ruhig, ohne großes Aufheben.", type: "fels" },
      { text: "Ich biete Hilfe an, dränge mich aber nicht auf.", type: "freigeist" },
    ],
  },
  {
    question: "Was ist dir in einer Beziehung am wichtigsten?",
    options: [
      { text: "Gegenseitiger Respekt vor der Individualität des anderen.", type: "freigeist" },
      { text: "Vertrauen und Verlässlichkeit im Alltag.", type: "fels" },
      { text: "Füreinander da zu sein, komme was wolle.", type: "beschuetzer" },
      { text: "Leidenschaft und tiefe emotionale Verbundenheit.", type: "romantiker" },
    ],
  },
  {
    question: "Wie gehst du mit Streit um?",
    options: [
      { text: "Ich ziehe mich erstmal zurück, ich brauche Abstand zum Nachdenken.", type: "freigeist" },
      { text: "Ich will sofort reden und alles klären, mit viel Gefühl.", type: "romantiker" },
      { text: "Ich mache mir vor allem Sorgen, ob es dem anderen gut geht.", type: "beschuetzer" },
      { text: "Ich brauche kurz Zeit, dann kläre ich es sachlich.", type: "fels" },
    ],
  },
  {
    question: "Wie sieht dein Traum-Date aus?",
    options: [
      { text: "Etwas Vertrautes, das wir schon oft zusammen gemacht haben.", type: "fels" },
      { text: "Ein spontaner Ausflug, bei dem jeder machen kann, worauf er Lust hat.", type: "freigeist" },
      { text: "Etwas, das ich extra und mit viel Liebe für die andere Person geplant habe.", type: "beschuetzer" },
      { text: "Kerzenschein, Musik, große Gesten — volles Programm.", type: "romantiker" },
    ],
  },
  {
    question: "Wie zeigst du am liebsten Zuneigung?",
    options: [
      { text: "Durch Fürsorge — ich sorge dafür, dass es dem anderen gut geht.", type: "beschuetzer" },
      { text: "Durch Worte, Komplimente, kleine Liebesbotschaften.", type: "romantiker" },
      { text: "Durch Verlässlichkeit — ich bin einfach da, Tag für Tag.", type: "fels" },
      { text: "Durch Zeit, die ich freiwillig und gerne mit der Person verbringe.", type: "freigeist" },
    ],
  },
  {
    question: "Was fürchtest du am meisten in einer Beziehung?",
    options: [
      { text: "Dass sich alles zu schnell verändert.", type: "fels" },
      { text: "Den eigenen Freiraum zu verlieren.", type: "freigeist" },
      { text: "Dass die Leidenschaft irgendwann verloren geht.", type: "romantiker" },
      { text: "Der anderen Person nicht genug zu sein.", type: "beschuetzer" },
    ],
  },
  {
    question: "Nach einem Jahr Beziehung fühlst du dich am wohlsten, wenn …",
    options: [
      { text: "… du das Gefühl hast, wirklich gebraucht zu werden.", type: "beschuetzer" },
      { text: "… ihr beide weiterhin eigene Hobbys und Freundeskreise pflegt.", type: "freigeist" },
      { text: "… ihr euch immer noch fühlt wie frisch verliebt.", type: "romantiker" },
      { text: "… ihr eine feste Routine und gemeinsame Rituale gefunden habt.", type: "fels" },
    ],
  },
];

export function resultTypeFor(scores: Record<string, number>): RelationshipType {
  let best = relationshipTypes[0];
  let bestScore = -1;
  for (const t of relationshipTypes) {
    const s = scores[t.id] ?? 0;
    if (s > bestScore) {
      bestScore = s;
      best = t;
    }
  }
  return best;
}
