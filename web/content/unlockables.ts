/**
 * Generischer Lookup für alles, was sich per Einmalkauf freischalten lässt --
 * Quizze (content/quizzes.ts) UND die Selbsttests (Beziehungstyp,
 * Freundes-Kompatibilität). `createUnlockCheckout` und die Purchases-Tabelle
 * kennen nur einen Slug, keinen Content-Typ -- diese Datei bildet die Brücke.
 */

import { getQuiz } from "./quizzes";
import * as beziehungstyp from "./beziehungstyp";
import * as freundeskompatibilitaet from "./freundeskompatibilitaet";

export interface UnlockableInfo {
  slug: string;
  title: string;
  unlockTitle: string;
  unlockPriceCents: number;
}

const psychUnlockables: Record<string, UnlockableInfo> = {
  beziehungstyp: {
    slug: "beziehungstyp",
    title: "Dein Beziehungstyp",
    unlockTitle: beziehungstyp.unlockTitle,
    unlockPriceCents: beziehungstyp.unlockPriceCents,
  },
  "freundes-kompatibilitaet": {
    slug: "freundes-kompatibilitaet",
    title: "Freundes-Kompatibilität",
    unlockTitle: freundeskompatibilitaet.unlockTitle,
    unlockPriceCents: freundeskompatibilitaet.unlockPriceCents,
  },
};

export function getUnlockable(slug: string): UnlockableInfo | undefined {
  const quiz = getQuiz(slug);
  if (quiz) {
    return {
      slug: quiz.slug,
      title: quiz.title,
      unlockTitle: quiz.unlockTitle,
      unlockPriceCents: quiz.unlockPriceCents,
    };
  }
  return psychUnlockables[slug];
}
