import { createElement } from "react";
import {
  Film,
  Music,
  Globe,
  Scroll,
  Brain,
  FlaskConical,
  Atom,
  Trophy,
  Palette,
  BookOpen,
  UtensilsCrossed,
  Leaf,
  Cpu,
  UserSearch,
  Languages,
  HeartPulse,
  Coins,
  Sparkles,
  Puzzle,
  Heart,
  type LucideIcon,
} from "lucide-react";
import type { GameType } from "@/content/games";

// Ordnet jedem Spiel-Titel ein passendes Lucide-Icon zu -- 1:1 aus Base44 übernommen.
// Reihenfolge ist wichtig -- spezifischere Regeln zuerst.
const RULES: [RegExp, LucideIcon][] = [
  [/wer bin ich|persönlich|berühmt|promi|star|biograf|genie|legend/, UserSearch],
  [/film|kino|movie|zitat/, Film],
  [/musik|music|song|hit|chart|band/, Music],
  [/geo|welt|land|stadt|kontinent|karte|flagge|hauptstadt/, Globe],
  [/geschicht|historie|antik|mittelalter|krieg|revolution|epoch/, Scroll],
  [/wissensch|physik|chemie|bio|medizin|labor|naturwissensch/, FlaskConical],
  [/raum|planet|stern|kosmos|galaxie|universum|weltraum/, Atom],
  [/sport|fußball|olympia|fitness|training|spiel/, Trophy],
  [/kunst|bild|malerei|museum|skulptur|design/, Palette],
  [/buch|literatur|autor|gedicht|roman|märchen|poesie/, BookOpen],
  [/ess|koch|gericht|küche|lebensmittel|getränk|food/, UtensilsCrossed],
  [/natur|tier|pflanze|baum|wald|garten|blume|berg|meer/, Leaf],
  [/tech|computer|internet|digital|^ki|robot|code|app/, Cpu],
  [/sprache|wort|grammatik|übersetz|fremd|vokab/, Languages],
  [/gesundheit|körper|stimmung|ernährung|schlaf|wellness/, HeartPulse],
  [/wirtschaft|geld|börse|markt|finanz|handel|bank/, Coins],
  [/geist|philosoph|denken|ethik|religion|weish/, Sparkles],
  [/schieb|puzzle|rätsel|logik|knob/, Puzzle],
  [/selbsttest|typ|charakter|persönlichkeits|ich\b/, Heart],
];

const FALLBACK: Record<GameType, LucideIcon> = { quiz: Brain, puzzle: Puzzle, psych: Heart };

export function getGameIcon(title: string, type: GameType): LucideIcon {
  const t = (title || "").toLowerCase();
  for (const [re, Icon] of RULES) {
    if (re.test(t)) return Icon;
  }
  return FALLBACK[type] || Brain;
}

/**
 * JSX-Wrapper um getGameIcon: `createElement` statt `const Icon = ...; <Icon/>`,
 * damit react-hooks/static-components nicht fälschlich "Komponente in Render
 * erzeugt" meldet (getGameIcon liefert stabile, bereits existierende Icons).
 */
export function GameIcon({
  title,
  type,
  className,
}: {
  title: string;
  type: GameType;
  className?: string;
}) {
  return createElement(getGameIcon(title, type), { className });
}
