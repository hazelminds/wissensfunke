/**
 * "Nicht wiederholen, bis der Pool erschöpft ist" für die Wissens-Quiz.
 *
 * Reine Sampling-Logik hier drin, ohne Wissen darüber, WOHER der "schon
 * gesehen"-Stand kommt -- QuizPlayer entscheidet das: eingeloggt via
 * lib/actions/seenQuestions.ts (Konto, geräteübergreifend), sonst über die
 * localStorage-Fallbacks hier unten (Gast, nur dieses Gerät).
 */

const STORAGE_PREFIX = "nog_seen_";

function storageKey(slug: string): string {
  return `${STORAGE_PREFIX}${slug}`;
}

export function questionKey(q: { question: string }): string {
  return q.question;
}

/** Gast-Fallback: kein Konto zum Dran-binden, bleibt geräte-lokal. */
export function readSeenLocal(slug: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(storageKey(slug));
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function writeSeenLocal(slug: string, seen: Set<string>): void {
  try {
    localStorage.setItem(storageKey(slug), JSON.stringify([...seen]));
  } catch {
    // localStorage nicht verfügbar -- Wiederholungssperre gilt nur für diese Sitzung nicht.
  }
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Zieht `size` Fragen aus `pool`, bevorzugt noch nicht in `seen` enthaltene.
 * Reicht der unverbrauchte Rest nicht, wird aus dem vollen Pool aufgefüllt
 * und der Zyklus (durch `nextSeen`) zurückgesetzt. Reine Funktion -- der
 * Aufrufer entscheidet, wo `seen` herkommt und wo `nextSeen` landet. */
export function pickUnseen<T extends { question: string }>(
  pool: T[],
  size: number,
  seen: Set<string>,
): { picked: T[]; nextSeen: Set<string> } {
  const n = Math.min(size, pool.length);
  const unseen = shuffle(pool.filter((q) => !seen.has(questionKey(q))));

  let picked: T[];
  let nextSeen: Set<string>;
  if (unseen.length >= n) {
    picked = unseen.slice(0, n);
    nextSeen = new Set(seen);
  } else {
    const usedKeys = new Set(unseen.map(questionKey));
    const refill = shuffle(pool.filter((q) => !usedKeys.has(questionKey(q))));
    picked = [...unseen, ...refill].slice(0, n);
    nextSeen = new Set(); // Zyklus erschöpft -- neuer Durchlauf beginnt mit dieser Runde.
  }

  picked.forEach((q) => nextSeen.add(questionKey(q)));
  return { picked, nextSeen };
}
