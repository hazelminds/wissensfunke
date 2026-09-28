/** Memory (Pärchen finden) -- Standard-Set ist Emoji, damit jede Runde ohne
 * neue Asset-Pflege auskommt. Die mittlere Stufe zeigt stattdessen ein erstes
 * Foto-Set ("Tierwelt", KI-generiert) als Pilot für weitere Themen später --
 * noch ohne Auswahl-UI, da es bislang nur dieses eine Set gibt. */

export type MemoryDifficulty = "easy" | "medium" | "hard";

const EMOJI_POOL = [
  "🐶", "🐱", "🦊", "🐼", "🐨", "🦁", "🐸", "🐧", "🦄", "🐢",
  "🍎", "🍋", "🍇", "🍉", "🍕", "🍔", "🍩", "🍓", "🥑", "🌽",
  "⚽", "🏀", "🎸", "🎨", "🎲", "🎯", "🚀", "⚓", "🔑", "💡",
  "⭐", "🌙", "☀️", "🌈", "❄️", "🔥", "🌊", "🍀", "🌵", "🌸",
];

/** "Tierwelt"-Fotoset für die mittlere Stufe -- Dateien unter
 * public/memory-tierwelt/, mehr als für eine Runde nötig, damit nicht jede
 * Runde dieselben 10 Tiere zeigt. */
const TIERWELT_IMAGES = [
  "/memory-tierwelt/loewe.jpg",
  "/memory-tierwelt/elefant.jpg",
  "/memory-tierwelt/zebra.jpg",
  "/memory-tierwelt/giraffe.jpg",
  "/memory-tierwelt/tiger.jpg",
  "/memory-tierwelt/panda.jpg",
  "/memory-tierwelt/fuchs.jpg",
  "/memory-tierwelt/eule.jpg",
  "/memory-tierwelt/papagei.jpg",
  "/memory-tierwelt/delfin.jpg",
  "/memory-tierwelt/pinguin.jpg",
  "/memory-tierwelt/koala.jpg",
  "/memory-tierwelt/wolf.jpg",
  "/memory-tierwelt/flamingo.jpg",
  "/memory-tierwelt/chamaeleon.jpg",
  "/memory-tierwelt/waschbaer.jpg",
];

export const PAIR_COUNT: Record<MemoryDifficulty, number> = {
  easy: 6,
  medium: 10,
  hard: 12,
};

/** Spaltenzahl fürs CSS-Grid -- Reihenzahl ergibt sich daraus automatisch
 * (Kartenzahl = 2 × Paare). */
export const GRID_COLS: Record<MemoryDifficulty, number> = {
  easy: 3,
  medium: 4,
  hard: 4,
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface MemoryCard {
  id: number;
  kind: "emoji" | "image";
  value: string;
}

export function generateMemoryBoard(difficulty: MemoryDifficulty): MemoryCard[] {
  const pairCount = PAIR_COUNT[difficulty];
  const useTierwelt = difficulty === "medium";
  const kind: MemoryCard["kind"] = useTierwelt ? "image" : "emoji";
  const pool = useTierwelt ? TIERWELT_IMAGES : EMOJI_POOL;

  const chosen = shuffle(pool).slice(0, pairCount);
  const doubled = shuffle([...chosen, ...chosen]);
  return doubled.map((value, id) => ({ id, kind, value }));
}
