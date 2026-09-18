/**
 * Generisches Gerüst für die "Selbsttests"-Erweiterung (24 neue Tests) --
 * anders als Beziehungstyp/Freundes-Kompatibilität (eigene, handgeschriebene
 * Komponenten) laufen diese alle über eine gemeinsame Komponente
 * (PsychResultTest) und werden per Plus-Status statt Einzelkauf freigeschaltet:
 * die kurze Beschreibung sieht jede:r, die ausführliche Analyse (Stärken/
 * Worauf achten/Tipp) nur mit Plus.
 *
 * Die eigentlichen 24 Test-Inhalte liegen in psych-tests-data.ts (wie die
 * Fragen-Pools der Wissens-Quiz in quiz-pools-data*.ts).
 */

export interface PsychTestOption {
  text: string;
  type: string;
}

export interface PsychTestQuestion {
  question: string;
  options: PsychTestOption[];
}

export interface PsychResultType {
  id: string;
  title: string;
  emoji: string;
  gradientClass: string;
  /** Kurz, für alle sichtbar (Gratis). */
  description: string;
  /** Ab hier Plus-exklusiv. */
  strengths: string;
  watchOut: string;
  tip: string;
}

export interface PsychTestDefinition {
  slug: string;
  title: string;
  teaser: string;
  emoji: string;
  estMinutes: number;
  questions: PsychTestQuestion[];
  resultTypes: PsychResultType[];
}

/** Wie bei Beziehungstyp: der Typ mit den meisten Treffern gewinnt. */
export function resultTypeFor(test: PsychTestDefinition, scores: Record<string, number>): PsychResultType {
  let best = test.resultTypes[0];
  let bestScore = -1;
  test.resultTypes.forEach((rt) => {
    const s = scores[rt.id] ?? 0;
    if (s > bestScore) {
      bestScore = s;
      best = rt;
    }
  });
  return best;
}

import { psychTestsData } from "./psych-tests-data";

export const psychTests: PsychTestDefinition[] = psychTestsData;

export function getPsychTest(slug: string): PsychTestDefinition | undefined {
  return psychTests.find((t) => t.slug === slug);
}
