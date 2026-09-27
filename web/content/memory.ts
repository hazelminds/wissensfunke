/** Memory (Pärchen finden) -- Emoji statt Bilder, damit jede Runde ohne
 * neue Asset-Pflege auskommt. Ein großzügiger Pool pro Runde zufällig
 * gezogen, damit sich ein 3×4-Raster nicht wie immer dasselbe Set anfühlt. */

export type MemoryDifficulty = "easy" | "medium" | "hard";

const EMOJI_POOL = [
  "🐶", "🐱", "🦊", "🐼", "🐨", "🦁", "🐸", "🐧", "🦄", "🐢",
  "🍎", "🍋", "🍇", "🍉", "🍕", "🍔", "🍩", "🍓", "🥑", "🌽",
  "⚽", "🏀", "🎸", "🎨", "🎲", "🎯", "🚀", "⚓", "🔑", "💡",
  "⭐", "🌙", "☀️", "🌈", "❄️", "🔥", "🌊", "🍀", "🌵", "🌸",
];

export const PAIR_COUNT: Record<MemoryDifficulty, number> = {
  easy: 6,
  medium: 8,
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
  emoji: string;
}

export function generateMemoryBoard(difficulty: MemoryDifficulty): MemoryCard[] {
  const pairCount = PAIR_COUNT[difficulty];
  const chosenEmoji = shuffle(EMOJI_POOL).slice(0, pairCount);
  const doubled = shuffle([...chosenEmoji, ...chosenEmoji]);
  return doubled.map((emoji, id) => ({ id, emoji }));
}
