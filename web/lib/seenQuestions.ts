/**
 * "Nicht wiederholen, bis der Pool erschöpft ist" -- geräte-lokal
 * (localStorage) pro Quiz-Slug. Reicht der Rest an unverbrauchten Fragen für
 * eine Runde nicht mehr aus, gilt der Zyklus als durch: die Runde wird aus
 * dem vollen Pool aufgefüllt und ein neuer Zyklus beginnt direkt danach.
 *
 * Bewusst nur geräte-/browserlokal, kein Server-Abgleich über Konten hinweg --
 * gleiches Prinzip wie lib/dailyCap.ts.
 */

const STORAGE_PREFIX = "nog_seen_";

function storageKey(slug: string): string {
  return `${STORAGE_PREFIX}${slug}`;
}

function questionKey(q: { question: string }): string {
  return q.question;
}

function readSeen(slug: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(storageKey(slug));
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeSeen(slug: string, seen: Set<string>): void {
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

/** Zieht `size` Fragen aus `pool`, bevorzugt noch nicht gesehene. */
export function sampleUnseenQuestions<T extends { question: string }>(
  slug: string,
  pool: T[],
  size: number,
): T[] {
  const n = Math.min(size, pool.length);
  const seen = readSeen(slug);
  const unseen = shuffle(pool.filter((q) => !seen.has(questionKey(q))));

  let picked: T[];
  if (unseen.length >= n) {
    picked = unseen.slice(0, n);
  } else {
    const usedKeys = new Set(unseen.map(questionKey));
    const refill = shuffle(pool.filter((q) => !usedKeys.has(questionKey(q))));
    picked = [...unseen, ...refill].slice(0, n);
    seen.clear(); // Zyklus erschöpft -- neuer Durchlauf beginnt mit dieser Runde.
  }

  picked.forEach((q) => seen.add(questionKey(q)));
  writeSeen(slug, seen);
  return picked;
}
