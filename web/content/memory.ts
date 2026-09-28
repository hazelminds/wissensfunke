/** Memory (Pärchen finden) -- Standard-Set ist Emoji, damit jede Runde ohne
 * neue Asset-Pflege auskommt. Die mittlere Stufe zeigt stattdessen wählbare
 * Foto-Themen (KI-generiert, siehe MEMORY_THEMES) -- Auswahl-UI in Memory.tsx. */

export type MemoryDifficulty = "easy" | "medium" | "hard";

const EMOJI_POOL = [
  "🐶", "🐱", "🦊", "🐼", "🐨", "🦁", "🐸", "🐧", "🦄", "🐢",
  "🍎", "🍋", "🍇", "🍉", "🍕", "🍔", "🍩", "🍓", "🥑", "🌽",
  "⚽", "🏀", "🎸", "🎨", "🎲", "🎯", "🚀", "⚓", "🔑", "💡",
  "⭐", "🌙", "☀️", "🌈", "❄️", "🔥", "🌊", "🍀", "🌵", "🌸",
];

export interface MemoryTheme {
  id: string;
  label: string;
  /** Bild-Pool, mehr als für eine Runde nötig, damit nicht jede Runde
   * dieselbe Auswahl zeigt. Dateien liegen unter public/memory-<id>/. */
  images: string[];
}

/** Foto-Themen für die mittlere Stufe -- die Auswahl oben in Memory.tsx
 * zeigt genau diese Liste, in dieser Reihenfolge. Neues Thema hinzufügen:
 * Bilder unter public/memory-<id>/ ablegen und hier eintragen, mehr ist
 * nicht nötig. */
export const MEMORY_THEMES: MemoryTheme[] = [
  {
    id: "tierwelt",
    label: "Tierwelt",
    images: [
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
    ],
  },
  {
    id: "staedte",
    label: "Städte",
    images: [
      "/memory-staedte/paris.jpg",
      "/memory-staedte/new-york.jpg",
      "/memory-staedte/london.jpg",
      "/memory-staedte/rom.jpg",
      "/memory-staedte/venedig.jpg",
      "/memory-staedte/sydney.jpg",
      "/memory-staedte/rio-de-janeiro.jpg",
      "/memory-staedte/dubai.jpg",
      "/memory-staedte/peking.jpg",
      "/memory-staedte/tokio.jpg",
      "/memory-staedte/moskau.jpg",
      "/memory-staedte/barcelona.jpg",
      "/memory-staedte/istanbul.jpg",
      "/memory-staedte/amsterdam.jpg",
      "/memory-staedte/san-francisco.jpg",
      "/memory-staedte/kairo.jpg",
    ],
  },
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

/** `themeId` gilt nur für die mittlere Stufe (Foto-Themen) -- fehlt er oder
 * passt er zu keinem MEMORY_THEMES-Eintrag, wird das erste Thema genommen. */
export function generateMemoryBoard(difficulty: MemoryDifficulty, themeId?: string): MemoryCard[] {
  const pairCount = PAIR_COUNT[difficulty];
  const usesPhotoTheme = difficulty === "medium";
  const theme = MEMORY_THEMES.find((t) => t.id === themeId) ?? MEMORY_THEMES[0];
  const kind: MemoryCard["kind"] = usesPhotoTheme ? "image" : "emoji";
  const pool = usesPhotoTheme ? theme.images : EMOJI_POOL;

  const chosen = shuffle(pool).slice(0, pairCount);
  const doubled = shuffle([...chosen, ...chosen]);
  return doubled.map((value, id) => ({ id, kind, value }));
}
