/**
 * "Nicht wiederholen, bis der Pool erschöpft ist" -- für die Wissens-Quiz
 * (einzelne Fragen aus einem Pool) UND "Wer bin ich?" Mittel/Schwer (ganze
 * Runden aus einem Pool), daher generisch über einen `keyOf`-Extractor statt
 * fest auf `.question` verdrahtet.
 *
 * Reine Sampling-Logik hier drin, ohne Wissen darüber, WOHER der "schon
 * gesehen"-Stand kommt -- Aufrufer entscheiden das: eingeloggt via
 * lib/actions/seenQuestions.ts (Konto, geräteübergreifend) bzw. serverseitig
 * direkt via lib/seenQuestionsServer.ts, sonst über die localStorage-
 * Fallbacks hier unten (Gast, nur dieses Gerät).
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

/** Zieht `size` Elemente aus `pool`, bevorzugt noch nicht in `seen`
 * enthaltene (per `keyOf` identifiziert). Reicht der unverbrauchte Rest
 * nicht, wird aus dem vollen Pool aufgefüllt und der Zyklus (durch
 * `nextSeen`) zurückgesetzt. Reine Funktion -- der Aufrufer entscheidet, wo
 * `seen` herkommt und wo `nextSeen` landet. */
export function pickUnseen<T>(
  pool: T[],
  size: number,
  seen: Set<string>,
  keyOf: (item: T) => string,
): { picked: T[]; nextSeen: Set<string> } {
  const n = Math.min(size, pool.length);
  const unseen = shuffle(pool.filter((item) => !seen.has(keyOf(item))));

  let picked: T[];
  let nextSeen: Set<string>;
  if (unseen.length >= n) {
    picked = unseen.slice(0, n);
    nextSeen = new Set(seen);
  } else {
    const usedKeys = new Set(unseen.map(keyOf));
    const refill = shuffle(pool.filter((item) => !usedKeys.has(keyOf(item))));
    picked = [...unseen, ...refill].slice(0, n);
    nextSeen = new Set(); // Zyklus erschöpft -- neuer Durchlauf beginnt mit dieser Runde.
  }

  picked.forEach((item) => nextSeen.add(keyOf(item)));
  return { picked, nextSeen };
}
