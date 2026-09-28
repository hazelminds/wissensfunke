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
      "/memory-tierwelt/nashorn.jpg",
      "/memory-tierwelt/nilpferd.jpg",
      "/memory-tierwelt/kamel.jpg",
      "/memory-tierwelt/erdmaennchen.jpg",
      "/memory-tierwelt/faultier.jpg",
      "/memory-tierwelt/pfau.jpg",
      "/memory-tierwelt/seepferdchen.jpg",
      "/memory-tierwelt/schildkroete.jpg",
      "/memory-tierwelt/eisbaer.jpg",
      "/memory-tierwelt/gorilla.jpg",
      "/memory-tierwelt/kaenguru.jpg",
      "/memory-tierwelt/otter.jpg",
      "/memory-tierwelt/igel.jpg",
      "/memory-tierwelt/reh.jpg",
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
      "/memory-staedte/berlin.jpg",
      "/memory-staedte/athen.jpg",
      "/memory-staedte/hongkong.jpg",
      "/memory-staedte/singapur.jpg",
      "/memory-staedte/prag.jpg",
      "/memory-staedte/wien.jpg",
      "/memory-staedte/toronto.jpg",
      "/memory-staedte/chicago.jpg",
      "/memory-staedte/los-angeles.jpg",
      "/memory-staedte/mexiko-stadt.jpg",
      "/memory-staedte/marrakesch.jpg",
      "/memory-staedte/bangkok.jpg",
      "/memory-staedte/seoul.jpg",
      "/memory-staedte/kapstadt.jpg",
    ],
  },
  {
    id: "pflanzen",
    label: "Pflanzen",
    images: [
      "/memory-pflanzen/rose.jpg",
      "/memory-pflanzen/sonnenblume.jpg",
      "/memory-pflanzen/kaktus.jpg",
      "/memory-pflanzen/orchidee.jpg",
      "/memory-pflanzen/tulpe.jpg",
      "/memory-pflanzen/farn.jpg",
      "/memory-pflanzen/bambus.jpg",
      "/memory-pflanzen/efeu.jpg",
      "/memory-pflanzen/lavendel.jpg",
      "/memory-pflanzen/mohnblume.jpg",
      "/memory-pflanzen/bonsai.jpg",
      "/memory-pflanzen/venusfliegenfalle.jpg",
      "/memory-pflanzen/palme.jpg",
      "/memory-pflanzen/seerose.jpg",
      "/memory-pflanzen/gaensebluemchen.jpg",
      "/memory-pflanzen/sukkulente.jpg",
      "/memory-pflanzen/kirschbluete.jpg",
      "/memory-pflanzen/ahornbaum.jpg",
      "/memory-pflanzen/eiche.jpg",
      "/memory-pflanzen/weide.jpg",
      "/memory-pflanzen/distel.jpg",
      "/memory-pflanzen/klee.jpg",
      "/memory-pflanzen/dahlie.jpg",
      "/memory-pflanzen/hibiskus.jpg",
      "/memory-pflanzen/aloe-vera.jpg",
      "/memory-pflanzen/monstera.jpg",
      "/memory-pflanzen/schneegloeckchen.jpg",
      "/memory-pflanzen/narzisse.jpg",
      "/memory-pflanzen/weinrebe.jpg",
      "/memory-pflanzen/pampasgras.jpg",
    ],
  },
  {
    id: "unterwasser",
    label: "Unter Wasser",
    images: [
      "/memory-unterwasser/clownfisch.jpg",
      "/memory-unterwasser/hai.jpg",
      "/memory-unterwasser/walhai.jpg",
      "/memory-unterwasser/qualle.jpg",
      "/memory-unterwasser/oktopus.jpg",
      "/memory-unterwasser/tintenfisch.jpg",
      "/memory-unterwasser/meeresschildkroete.jpg",
      "/memory-unterwasser/rochen.jpg",
      "/memory-unterwasser/korallenriff.jpg",
      "/memory-unterwasser/anglerfisch.jpg",
      "/memory-unterwasser/seestern.jpg",
      "/memory-unterwasser/muschel.jpg",
      "/memory-unterwasser/seeanemone.jpg",
      "/memory-unterwasser/buckelwal.jpg",
      "/memory-unterwasser/orca.jpg",
      "/memory-unterwasser/hummer.jpg",
      "/memory-unterwasser/krabbe.jpg",
      "/memory-unterwasser/seeigel.jpg",
      "/memory-unterwasser/schwarm-fische.jpg",
      "/memory-unterwasser/schiffswrack.jpg",
      "/memory-unterwasser/u-boot.jpg",
      "/memory-unterwasser/taucher.jpg",
      "/memory-unterwasser/schatztruhe.jpg",
      "/memory-unterwasser/nautilus.jpg",
      "/memory-unterwasser/kugelfisch.jpg",
      "/memory-unterwasser/papageifisch.jpg",
      "/memory-unterwasser/seepferdchen.jpg",
      "/memory-unterwasser/seegurke.jpg",
      "/memory-unterwasser/delfin.jpg",
      "/memory-unterwasser/versunkene-statue.jpg",
    ],
  },
  {
    id: "gaming",
    label: "Gaming",
    images: [
      "/memory-gaming/gameboy.jpg",
      "/memory-gaming/tamagotchi.jpg",
      "/memory-gaming/arcade-automat.jpg",
      "/memory-gaming/joystick.jpg",
      "/memory-gaming/gamepad.jpg",
      "/memory-gaming/retro-spielkonsole.jpg",
      "/memory-gaming/moderner-controller.jpg",
      "/memory-gaming/vr-brille.jpg",
      "/memory-gaming/gaming-maus.jpg",
      "/memory-gaming/mechanische-tastatur.jpg",
      "/memory-gaming/gaming-headset.jpg",
      "/memory-gaming/lenkrad.jpg",
      "/memory-gaming/tanzmatte.jpg",
      "/memory-gaming/handheld-konsole.jpg",
      "/memory-gaming/gaming-stuhl.jpg",
      "/memory-gaming/gaming-pc.jpg",
      "/memory-gaming/spielmodul.jpg",
      "/memory-gaming/roehrenfernseher.jpg",
      "/memory-gaming/retro-maze-automat.jpg",
      "/memory-gaming/controller-ladestation.jpg",
      "/memory-gaming/retro-taschenspiel.jpg",
      "/memory-gaming/controller-analog.jpg",
      "/memory-gaming/snes-controller.jpg",
      "/memory-gaming/spielhalle-neon.jpg",
      "/memory-gaming/power-glove.jpg",
      "/memory-gaming/controller-classic-nes.jpg",
      "/memory-gaming/retro-computer.jpg",
      "/memory-gaming/pixel-trophy.jpg",
      "/memory-gaming/gaming-schreibtisch-setup.jpg",
      "/memory-gaming/flipper-automat.jpg",
    ],
  },
  {
    id: "weltraum",
    label: "Weltraum",
    images: [
      "/memory-weltraum/astronaut.jpg",
      "/memory-weltraum/rakete.jpg",
      "/memory-weltraum/saturn.jpg",
      "/memory-weltraum/ufo.jpg",
      "/memory-weltraum/sternschnuppe.jpg",
      "/memory-weltraum/mond.jpg",
      "/memory-weltraum/galaxie.jpg",
      "/memory-weltraum/raumstation.jpg",
      "/memory-weltraum/komet.jpg",
      "/memory-weltraum/erde-weltraum.jpg",
      "/memory-weltraum/mars.jpg",
      "/memory-weltraum/schwarzes-loch.jpg",
      "/memory-weltraum/sonnenfinsternis.jpg",
      "/memory-weltraum/sternennebel.jpg",
      "/memory-weltraum/marsrover.jpg",
      "/memory-weltraum/jupiter.jpg",
      "/memory-weltraum/mondlandefaehre.jpg",
      "/memory-weltraum/weltraumteleskop.jpg",
      "/memory-weltraum/asteroid.jpg",
      "/memory-weltraum/sternbild.jpg",
      "/memory-weltraum/polarlicht.jpg",
      "/memory-weltraum/sonnensystem.jpg",
      "/memory-weltraum/raumanzug.jpg",
      "/memory-weltraum/meteorit.jpg",
      "/memory-weltraum/milchstrasse.jpg",
      "/memory-weltraum/venus.jpg",
      "/memory-weltraum/uranus.jpg",
      "/memory-weltraum/sternwarte.jpg",
      "/memory-weltraum/raumkapsel.jpg",
      "/memory-weltraum/mondkrater.jpg",
    ],
  },
  {
    id: "vintage",
    label: "Vintage",
    images: [
      "/memory-vintage/schreibmaschine.jpg",
      "/memory-vintage/schallplatte.jpg",
      "/memory-vintage/roehrenradio.jpg",
      "/memory-vintage/waehlscheibentelefon.jpg",
      "/memory-vintage/polaroid-kamera.jpg",
      "/memory-vintage/taschenuhr.jpg",
      "/memory-vintage/grammophon.jpg",
      "/memory-vintage/petroleumlampe.jpg",
      "/memory-vintage/fernglas.jpg",
      "/memory-vintage/globus.jpg",
      "/memory-vintage/tintenfass.jpg",
      "/memory-vintage/wanduhr.jpg",
      "/memory-vintage/koffer-vintage.jpg",
      "/memory-vintage/naehmaschine.jpg",
      "/memory-vintage/filmkamera.jpg",
      "/memory-vintage/jukebox.jpg",
      "/memory-vintage/plattenspieler-koffer.jpg",
      "/memory-vintage/spieluhr.jpg",
      "/memory-vintage/vintage-fahrrad.jpg",
      "/memory-vintage/lupenglas.jpg",
      "/memory-vintage/alte-landkarte.jpg",
      "/memory-vintage/zylinderhut.jpg",
      "/memory-vintage/schreibfeder.jpg",
      "/memory-vintage/morsegeraet.jpg",
      "/memory-vintage/muenzsammlung.jpg",
      "/memory-vintage/kompass-vintage.jpg",
      "/memory-vintage/teleskop-vintage.jpg",
      "/memory-vintage/schaukelpferd.jpg",
      "/memory-vintage/blechspielzeug.jpg",
      "/memory-vintage/naehkorb.jpg",
    ],
  },
  {
    id: "cocktails",
    label: "Cocktails",
    images: [
      "/memory-cocktails/mojito.jpg",
      "/memory-cocktails/martini.jpg",
      "/memory-cocktails/margarita.jpg",
      "/memory-cocktails/pina-colada.jpg",
      "/memory-cocktails/whiskey.jpg",
      "/memory-cocktails/rotwein.jpg",
      "/memory-cocktails/weisswein.jpg",
      "/memory-cocktails/champagner.jpg",
      "/memory-cocktails/bier.jpg",
      "/memory-cocktails/mai-tai.jpg",
      "/memory-cocktails/cosmopolitan.jpg",
      "/memory-cocktails/gin-tonic.jpg",
      "/memory-cocktails/bloody-mary.jpg",
      "/memory-cocktails/daiquiri.jpg",
      "/memory-cocktails/negroni.jpg",
      "/memory-cocktails/sangria.jpg",
      "/memory-cocktails/tequila-shot.jpg",
      "/memory-cocktails/espresso-martini.jpg",
      "/memory-cocktails/mimosa.jpg",
      "/memory-cocktails/old-fashioned.jpg",
      "/memory-cocktails/aperol-spritz.jpg",
      "/memory-cocktails/pisco-sour.jpg",
      "/memory-cocktails/caipirinha.jpg",
      "/memory-cocktails/long-island-iced-tea.jpg",
      "/memory-cocktails/rum-punch.jpg",
      "/memory-cocktails/sekt.jpg",
      "/memory-cocktails/cocktailbar.jpg",
      "/memory-cocktails/cocktail-shaker.jpg",
      "/memory-cocktails/whiskey-fass.jpg",
      "/memory-cocktails/fruchtcocktail.jpg",
    ],
  },
  {
    id: "kaffee",
    label: "Café-Kultur",
    images: [
      "/memory-kaffee/cappuccino.jpg",
      "/memory-kaffee/espresso.jpg",
      "/memory-kaffee/latte-art.jpg",
      "/memory-kaffee/cold-brew.jpg",
      "/memory-kaffee/french-press.jpg",
      "/memory-kaffee/kaffeebohnen.jpg",
      "/memory-kaffee/kaffeemuehle.jpg",
      "/memory-kaffee/kaffeetasse.jpg",
      "/memory-kaffee/karamellmakiato.jpg",
      "/memory-kaffee/milchkaenchen.jpg",
      "/memory-kaffee/mokka.jpg",
      "/memory-kaffee/pain-au-chocolat.jpg",
      "/memory-kaffee/teekanne.jpg",
      "/memory-kaffee/zimtstange.jpg",
      "/memory-kaffee/keksstapel-kaffee.jpg",
      "/memory-kaffee/kaffeesatz.jpg",
      "/memory-kaffee/siebtraeger.jpg",
      "/memory-kaffee/barista-tasse.jpg",
      "/memory-kaffee/kaffeekanne.jpg",
      "/memory-kaffee/tee.jpg",
      "/memory-kaffee/chai-latte.jpg",
      "/memory-kaffee/kaffeekirschen.jpg",
      "/memory-kaffee/cafe-terrasse.jpg",
      "/memory-kaffee/thermosbecher.jpg",
      "/memory-kaffee/sahnehaeubchen-kaffee.jpg",
      "/memory-kaffee/tuerkischer-kaffee.jpg",
      "/memory-kaffee/kaffeevollautomat.jpg",
      "/memory-kaffee/zimtschnecke.jpg",
      "/memory-kaffee/affogato.jpg",
      "/memory-kaffee/eiskaffee.jpg",
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
