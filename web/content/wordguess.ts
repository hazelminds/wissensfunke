/**
 * Worträtsel (Wordle-Prinzip) — Ebene 1, täglicher Gratis-Anker wie
 * tages-raetsel/tages-mini-quiz: ein 5-Buchstaben-Wort pro Kalendertag,
 * für alle gleich, deterministisch per Datum ausgewählt, kein Zufall.
 *
 * Zwei getrennte Listen: WORD_LIST sind die Lösungs-Kandidaten (bewusst
 * kuratiert, erkennbare Alltagswörter -- das soll als Tageslösung auch
 * fair zu erraten sein). EXTRA_VALID_GUESSES erweitert nur, was als
 * Ratewort akzeptiert wird, ohne je selbst Lösung zu werden -- sonst
 * würden viele ganz normale deutsche Wörter (z. B. "ERNTE") beim Tippen
 * fälschlich als "kein Wort" abgelehnt, nur weil die Lösungs-Liste
 * bewusst schlank gehalten ist.
 */

import { dayNumber } from "./daily";

export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

/** Tag, an dem Puzzle Nr. 1 lief -- für eine menschenlesbare, bei 1
 * beginnende Zählung statt der riesigen rohen Unix-Epochentage. */
const LAUNCH_DATE = new Date("2026-10-01T00:00:00Z");

// Alle Großbuchstaben, ohne ß (im Deutschen in Versalschreibung ohnehin
// durch "SS" ersetzt, z. B. "WEISS") -- damit jede Position im Raster
// einem einzelnen Tile entspricht. 272 Wörter, keine Dopplungen, alle
// geprüft exakt 5 Zeichen lang -- reicht für knapp 9 Monate Tageslösungen
// ohne Wiederholung (Plus-Bonusrunden ziehen zufällig aus demselben Pool
// und können daher schon vorher mal wiederholen, siehe getBonusWord).
export const WORD_LIST: string[] = [
  "STUHL", "TISCH", "WOLKE", "BLUME", "KATZE", "VOGEL", "FISCH", "PFERD", "SCHAF", "FUCHS",
  "LUCHS", "ZEBRA", "TIGER", "PANDA", "KOALA", "ADLER", "FALKE", "SPATZ", "AMSEL", "MANGO",
  "GUAVE", "OLIVE", "BIRNE", "HONIG", "GURKE", "SALAT", "ERBSE", "BOHNE", "LINSE", "NUDEL",
  "PIZZA", "SUPPE", "COUCH", "REGAL", "LAMPE", "KERZE", "BODEN", "DECKE", "PAKET", "BRIEF",
  "STIFT", "MAPPE", "SONNE", "STERN", "REGEN", "HAGEL", "NEBEL", "STURM", "BLITZ", "FLUSS",
  "HÜGEL", "WIESE", "ACKER", "INSEL", "STIRN", "LIPPE", "ZUNGE", "WANGE", "NAGEL", "BAUCH",
  "LUNGE", "MAGEN", "LEBER", "NIERE", "LIEBE", "STOLZ", "SCHAM", "MUSIK", "SERIE", "ROMAN",
  "RENTE", "MONAT", "WOCHE", "ABEND", "NACHT", "RADIO", "HANDY", "TASTE", "DRUCK", "JACKE",
  "SCHAL", "MÜTZE", "SOCKE", "ANZUG", "KLEID", "WEISS", "BRAUN", "BEIGE", "MALER", "BAUER",
  "PILOT", "AGENT", "MAUER", "PFAHL", "SEGEL", "ANKER", "KARTE", "ATLAS", "VATER", "ONKEL",
  "TANTE", "ENKEL", "NEFFE", "FEUER", "STEIN", "EISEN", "STOFF", "LEDER", "WOLLE", "ZANGE",
  "EIMER", "BESEN", "KLEIN", "KREIS", "WAAGE", "TEICH", "KANAL", "BUCHT", "KÜSTE", "SÜDEN",
  "OSTEN", "EBENE", "HAFEN", "MARKT", "PLATZ", "TAFEL", "FARBE", "GEIGE", "FLÖTE", "HARFE",
  "ORGEL", "ROBBE", "TAUBE", "HENNE", "GEIER", "KETTE", "GABEL", "ERNTE", "SAMEN", "KEIME",
  "ZWEIG", "RINDE", "BLATT", "HECKE", "WEIDE", "SUMPF", "GEHEN", "ESSEN", "SEHEN", "GEBEN",
  "LESEN", "REDEN", "BADEN", "MALEN", "RUFEN", "BLUSE", "WESTE", "TRUHE", "ETAGE", "KEKSE",
  "TORTE", "WURST", "QUARK", "CREME", "SOSSE", "KOHLE", "OTTER", "BIBER", "DACHS", "STIER",
  "STUTE", "PUTER", "ERPEL", "KÜKEN", "RABEN", "KRÄHE", "MOTTE", "ZECKE", "WANZE", "TULPE",
  "NELKE", "PALME", "FARNE", "MOOSE", "BUSCH", "DUNST", "FROST", "EISIG", "KLIMA", "ZONEN",
  "UHREN", "MÜNZE", "KABEL", "AKKUS", "CHIPS", "NOTEN", "LEHRE", "PAUSE", "BOXEN", "PREIS",
  "MIETE", "ÄRGER", "TROST", "GLÜCK", "UNMUT", "DEMUT", "SORGE",
  "ZIEGE", "RATTE", "MEISE", "FINKE", "KOBRA", "KANNE", "DOSEN", "TÜTEN", "KÖRBE", "NADEL",
  "SEIDE", "APFEL", "HAFER", "SPECK", "BROTE", "ESSIG", "CURRY", "REISE", "KÄLTE", "WÄRME",
  "HITZE", "FÜSSE", "ZÄHNE", "KEHLE", "HÜFTE", "FERSE", "WADEN", "BRAUE", "ANGST", "PANIK",
  "EIFER", "STILL", "WEISE", "KRANK", "HÖREN", "LEBEN", "HOLEN", "LEGEN", "NÄHEN", "BAUEN",
  "MÄHEN", "IMKER", "JÄGER", "STADT", "STAAT", "HEUTE", "IMMER", "SCHUH", "PULLI", "DIELE",
  "KÜCHE", "AUTOS", "BOOTE", "FÄHRE", "BERGE", "WÜSTE", "KASSE", "KONTO", "EICHE", "BUCHE",
  "AHORN", "ROSEN", "LILIE", "GROSS", "HEISS",
];

// Nur als Ratewort gültig, nie als Tageslösung -- 1.694 weitere geprüft
// exakt 5-buchstabige deutsche Wörter, keine Dopplungen mit WORD_LIST. Diese
// Liste bewusst viel größer als die Lösungsliste (wie beim Original-Wordle):
// kostet nichts, da nie Tageslösung, verhindert aber, dass echte Wörter beim
// Tippen fälschlich als "ungültig" abgelehnt werden. Ab Zeile mit "AALEN"
// stammt der Block aus einer offenen deutschen Wörterbuch-Quelle (igerman98/
// Hunspell, GPL), von Hand durchgesehen und bereinigt um Eigennamen, Orte,
// Marken, Abkürzungen sowie anstößige oder sensible Begriffe -- hier zählen
// nur die reinen Wortdaten (Fakten der Sprache), nicht die Dictionary-Datei
// selbst.
const EXTRA_VALID_GUESSES: string[] = [
  "HECHT", "LARVE", "RAUPE", "KÄFER", "WESPE", "MÜCKE", "FEIGE", "ORKAN", "MUTIG", "TREUE",
  "MACHT", "KRAFT", "STARK", "SANFT", "RASCH", "LEISE", "LAUTE", "PFADE", "GASSE", "ALLEE",
  "PARKS", "JAHRE", "HEFTE", "TEXTE", "WORTE", "TEAMS", "IDEEN", "TRAUM", "ZIELE", "PLANE",
  "VERSE", "REIME", "KLANG", "WEINE", "BIERE", "MILCH", "HAARE", "OHREN", "AUGEN", "HÄNDE",
  "BEINE", "HABEN", "SAGEN", "ENDEN", "FRAGE", "GRUND", "SINNE", "ZWECK",
  "ECHSE", "ASSEL", "ZWIRN", "KNOPF", "GLATT", "TAUEN", "FERNE", "TIEFE", "BREIT", "FEGEN",
  "CELLO", "MÄUSE", "RÄDER", "OASEN", "HÖHLE", "TÄLER", "MEERE", "BÄLLE", "TOREN", "NETZE",
  "RINGE", "ERLEN", "MASSE", "ATOME", "KOMET",
  "SÄGEN", "WAGEN", "RASEN", "WEBEN", "LOBEN", "LADEN", "JAGEN", "TOBEN", "GAREN", "NAGEN",
  "OFFEN", "EIGEN", "GENAU", "VIELE", "MANCH", "JEDER", "DIESE", "KEINE", "RECHT", "GANZE",
  "LETZT", "ERSTE", "GUTEN", "WÖLFE", "BÄREN", "HASEN", "GÄNSE", "ENTEN", "LÖWEN", "AFFEN",
  "KRÖTE", "BEERE", "KOKOS", "MATTE", "VASEN", "TÜREN", "WÄNDE", "ZÄUNE", "LEUTE", "GÄSTE",
  "PAARE", "RUHIG", "WEGEN", "GEGEN", "NEBEN", "UNTER", "DURCH", "WEDER", "SOWIE", "FALLS",
  "DAMIT", "DAHER", "DAVOR", "DABEI", "DARAN", "DARIN", "DAVON", "WORAN", "WOVON", "WOMIT",
  "ZEHEN", "LOCKE", "BÄRTE", "NASEN", "TÖPFE", "SIEBE", "HOSEN", "RÖCKE", "MOTOR", "HUPEN",
  "AALEN", "ABART", "ABBAT", "ABBAU", "ABBOG", "ABGAB", "ABGAS", "ABHAT", "ABHOB", "ABHOL",
  "ABHÖR", "ABKAM", "ABLAG", "ABORT", "ABRUF", "ABSAH", "ABSUD", "ABTAT", "ABTEI", "ABTUN",
  "ABWEG", "ABWOG", "ABZOG", "ABZUG", "ACHSE", "ACRYL", "ADELN", "ADELS", "ADIEU", "ADLIG",
  "AEROB", "AFFIG", "AFTER", "AGAVE", "AGRAR", "AHMEN", "AHNEN", "AKTEN", "AKTIE", "AKTIV",
  "AKTOR", "ALARM", "ALBEN", "ALBUM", "ALERT", "ALGEN", "ALIAS", "ALIBI", "ALLWO", "ALLZU",
  "ALPEN", "ALPHA", "ALPIN", "ALTAR", "ALTEN", "ALTER", "ALTÖL", "AMMEN", "AMPEL", "AMTEN",
  "ANBAU", "ANBEI", "ANBOT", "ANDEN", "ANGAB", "ANGEL", "ANHOB", "ANION", "ANKAM", "ANMUT",
  "ANODE", "ANRUF", "ANSAH", "ANTAT", "ANTIK", "ANTUN", "ANZOG", "APART", "APRIL", "APSIS",
  "ARCHE", "AREAL", "ARENA", "ARGON", "ARMEE", "ARMEN", "ARMUT", "AROMA", "ARRAY", "ARSEN",
  "ARTEN", "ARTIG", "ASCHE", "ASKET", "ASPIK", "ASTER", "ASTRO", "ATMEN", "ATOLL", "AUDIO",
  "AUTOR", "AXIAL", "AXIOM", "BAHRE", "BANAL", "BANDE", "BANJO", "BARDE", "BARON", "BARST",
  "BASAL", "BASAR", "BASIC", "BASIS", "BATIK", "BEBEN", "BEGAB", "BEIDE", "BEKAM", "BELAG",
  "BELEG", "BELUD", "BERUF", "BESAH", "BETEL", "BETEN", "BETON", "BEUGE", "BEULE", "BEUTE",
  "BEVOR", "BEWOG", "BEZUG", "BIBEL", "BIENE", "BIEST", "BIKER", "BINDE", "BINOM", "BINSE",
  "BINÄR", "BIRGT", "BIRKE", "BITTE", "BIWAK", "BLANK", "BLASE", "BLASS", "BLECH", "BLICH",
  "BLICK", "BLIEB", "BLIES", "BLIND", "BLINK", "BLOCK", "BLOND", "BLUES", "BLUFF", "BLÄST",
  "BLÜTE", "BOGEN", "BOHLE", "BOMBE", "BONGO", "BONUS", "BONZE", "BOOTS", "BORKE", "BORTE",
  "BOSON", "BOTEN", "BOWLE", "BOXER", "BRACH", "BRAND", "BRAUT", "BRECH", "BREMS", "BRENN",
  "BREST", "BRETT", "BRIET", "BRISE", "BRITE", "BRUCH", "BRUMM", "BRUST", "BRÜHE", "BRÜSK",
  "BUBEN", "BUHEN", "BULLE", "BURKA", "BUTAN", "BUTZE", "BÄCHE", "BÄCKT", "BÄDER", "BÄLDE",
  "BÄNDE", "BÄNKE", "BÄUMT", "BÖCKE", "BÖDEN", "BÖGEN", "BÖRDE", "BÖRSE", "BÜGEL", "BÜHNE",
  "BÜKEN", "BÜNDE", "BÜRDE", "BÜSTE", "CACHE", "CELLI", "CHAOS", "CHAOT", "CHART", "CHECK",
  "CHLOR", "CHOKE", "CHOSE", "CHROM", "CHÖRE", "CIRCA", "CIVIL", "CLONE", "CLOWN", "CODEC",
  "CODEX", "COMIC", "COVER", "CRASH", "CYBER", "DAFÜR", "DAHIN", "DAMEN", "DAMPF", "DANDY",
  "DARUM", "DATEI", "DATEN", "DATIV", "DATUM", "DAUER", "DAUNE", "DEBÜT", "DEGEN", "DEICH",
  "DEKAN", "DEKOR", "DELLE", "DELTA", "DEPOT", "DERBY", "DERER", "DESTO", "DEVOT", "DICHT",
  "DINAR", "DIODE", "DIPOL", "DIRNE", "DISCO", "DIWAN", "DOCHT", "DOGGE", "DOGMA", "DOHLE",
  "DOLCH", "DOLLY", "DORIS", "DOSIS", "DRAHT", "DRALL", "DRAMA", "DRANG", "DRAUF", "DRECK",
  "DRESS", "DRIFT", "DRINK", "DRITT", "DROGE", "DRÖGE", "DRÜSE", "DUBIO", "DUDEL", "DUELL",
  "DUETT", "DUMMY", "DUMPF", "DURST", "DUSCH", "DUSEL", "DUZEN", "DÄMME", "DÄMON", "DÄRME",
  "DÖNER", "DÖSEN", "DÜBEL", "DÜFTE", "DÜNGE", "DÜNKT", "DÜRER", "DÜRRE", "DÜSEN", "EBBEN",
  "EBNEN", "ECKEN", "ECKIG", "EDUKT", "EHEST", "EHREN", "EIFEL", "EILEN", "EILIG", "EINEN",
  "EINIG", "EITEL", "EITER", "EKELN", "EKLAT", "EKLIG", "EKZEM", "ELEND", "ELFEN", "ELITE",
  "EMPOR", "EMSIG", "ENGEL", "ENGEN", "ENORM", "ENZYM", "EPROM", "EPSON", "ERBAT", "ERBEN",
  "ERBIN", "ERDEN", "ERDIG", "ERDÖL", "ERGAB", "ERIKA", "ERKER", "ERLAG", "ERLÖS", "ERNST",
  "ERZOG", "ESCHE", "ESSAY", "ESSER", "ETHIK", "ETHOS", "ETÜDE", "EULEN", "EUTER", "EXAKT",
  "EXTRA", "FABEL", "FACTO", "FADEN", "FAHNE", "FAHRT", "FALLE", "FALTE", "FAMOS", "FANGO",
  "FARCE", "FASAN", "FASER", "FATAL", "FATUM", "FAUNA", "FAUST", "FAXEN", "FAZIT", "FECHT",
  "FEDER", "FEGER", "FEHDE", "FEIER", "FEILE", "FEIND", "FELGE", "FESCH", "FIBEL", "FIGUR",
  "FILET", "FINAL", "FINIT", "FINNE", "FINTE", "FIRMA", "FIRST", "FITTE", "FIXEN", "FIXER",
  "FJORD", "FLACH", "FLAIR", "FLASH", "FLAUM", "FLECK", "FLINK", "FLIRT", "FLORA", "FLOSS",
  "FLOTT", "FLUCH", "FLUGS", "FLUID", "FLUOR", "FLYER", "FLÖGE", "FLÖHE", "FOCHT", "FOKUS",
  "FOLGE", "FOLIE", "FOREN", "FORMA", "FORST", "FORUM", "FOYER", "FRACK", "FRANC", "FRANK",
  "FREAK", "FRECH", "FREMD", "FRESS", "FREUD", "FRIST", "FROMM", "FRONT", "FRUST", "FUDER",
  "FUGEN", "FUHRE", "FUNKE", "FURIE", "FUSEL", "FUTUR", "FÄDEN", "FÄHIG", "FÄHRT", "FÄNGT",
  "FÄULE", "FÖHRE", "FÖTEN", "FÖTUS", "FÜGEN", "FÜLLE", "FÜNFT", "FÜRST", "FÜRTH", "FÜRZE",
  "GALLE", "GAMMA", "GARBE", "GARDE", "GARNI", "GASSI", "GATTE", "GEBAR", "GEBER", "GEBET",
  "GEBOT", "GEBÄR", "GECKO", "GEHÖR", "GEIST", "GELEE", "GEMÜT", "GENIE", "GENOM", "GENRE",
  "GENUG", "GENUS", "GERTE", "GERÄT", "GESTE", "GESÄT", "GETAN", "GETTO", "GETUE", "GEÄST",
  "GEÖLT", "GEÜBT", "GICHT", "GILDE", "GINGE", "GINKO", "GLANZ", "GLEIS", "GLEIT", "GLICH",
  "GLIED", "GLIMM", "GLITT", "GNADE", "GOSSE", "GOTIK", "GOUDA", "GRAMM", "GRAPH", "GRAUS",
  "GREIF", "GREIS", "GRELL", "GRENZ", "GRIFF", "GRILL", "GRIMM", "GRIPS", "GROLL", "GRUBE",
  "GRUFT", "GRÄBT", "GRÄTE", "GULLY", "GUMMI", "GUNST", "GUSTO", "GÄLTE", "GÄMSE", "GÄNZE",
  "GÄREN", "GÄULE", "GÖTZE", "GÜTER", "GÜTIG", "HABER", "HAGER", "HAKEN", "HALDE", "HALLO",
  "HALTE", "HANSE", "HAREM", "HASEL", "HATTE", "HAUBE", "HAUCH", "HAUEN", "HAUER", "HAUPT",
  "HEBEL", "HEBEN", "HEBER", "HEGEL", "HEGEN", "HEIDE", "HERAB", "HERAN", "HERTZ", "HERUM",
  "HERZU", "HEUER", "HEXEN", "HEXER", "HIELT", "HILFE", "HILFS", "HILFT", "HINAB", "HINAN",
  "HINDU", "HINZU", "HIRSE", "HIRTE", "HOBBY", "HOBEL", "HORDE", "HOTEL", "HUMAN", "HUMID",
  "HUMOR", "HUMUS", "HUNDE", "HUNNE", "HURRA", "HUSAR", "HYMNE", "HYÄNE", "HÄFEN", "HÄHNE",
  "HÄLSE", "HÄNGE", "HÄRTE", "HÄTTE", "HÄUTE", "HÖHEN", "HÖHER", "HÖHLT", "HÖLLE", "HÖRER",
  "HÖRIG", "HÜBEN", "HÜLLE", "HÜLSE", "HÜRDE", "HÜTEN", "HÜTER", "HÜTTE", "IDEAL", "IDIOT",
  "IDYLL", "IGELN", "IKONE", "ILTIS", "IMAGE", "IMMUN", "INBUS", "INDEM", "INDER", "INDES",
  "INDEX", "INDIO", "INDIZ", "INFAM", "INNEN", "INNIG", "INTEL", "INTIM", "INTUS", "IONEN",
  "IRDEN", "IRREN", "IRRIG", "ISLAM", "JACHT", "JEANS", "JEHER", "JEMEN", "JETZT", "JOKER",
  "JOLLE", "JOULE", "JUBEL", "JUIST", "JUMBO", "JUNGE", "JUROR", "JUWEL", "JÄTEN", "KABUL",
  "KADER", "KAJAK", "KAKAO", "KALBS", "KALIF", "KAMEL", "KAMIN", "KAMPF", "KANON", "KANTE",
  "KAPPA", "KAPPE", "KARAT", "KARRE", "KASKO", "KASUS", "KATER", "KAUEN", "KEGEL", "KELCH",
  "KELLE", "KEULE", "KIEPE", "KIOSK", "KIPPE", "KIRCH", "KISTE", "KLAGE", "KLAMM", "KLAPP",
  "KLEBE", "KLEIE", "KLEMM", "KLICK", "KLIPP", "KLOPS", "KLOTZ", "KLUFT", "KNABE", "KNACK",
  "KNALL", "KNAPP", "KNAST", "KNAUF", "KNAUR", "KNICK", "KNIEN", "KNIFF", "KODEX", "KOKON",
  "KOLIK", "KOMBI", "KOMIK", "KOMMA", "KOPIE", "KORPS", "KORSO", "KRACH", "KRAKE", "KRANZ",
  "KRASS", "KRAUS", "KRAUT", "KREBS", "KREPP", "KREUZ", "KRIEG", "KRIMI", "KRIPO", "KRISE",
  "KROCH", "KRONE", "KROPF", "KROSS", "KRUME", "KRUMM", "KRÄNE", "KUBEN", "KUBUS", "KUGEL",
  "KUHLE", "KUNDE", "KUNST", "KUPON", "KUPPE", "KUREN", "KURIE", "KURVE", "KUTTE", "KÄFIG",
  "KÄHNE", "KÄMEN", "KÖCHE", "KÖDER", "KÖNIG", "KÖPFE", "KÖTER", "KÜBEL", "KÜREN", "LABEN",
  "LABIL", "LABOR", "LACHE", "LACHS", "LADER", "LAGEN", "LAGER", "LAKAI", "LAKEN", "LAMEE",
  "LANDE", "LANZE", "LASCH", "LASER", "LASSO", "LATEX", "LATTE", "LAUBE", "LAUCH", "LAUDE",
  "LAUER", "LAUNE", "LEDIG", "LEGAL", "LEGAT", "LEGER", "LEHNE", "LEIBT", "LEIER", "LEINE",
  "LEMMA", "LENDE", "LEPRA", "LESER", "LETAL", "LEVEL", "LIANE", "LICHT", "LIEGE", "LIEST",
  "LIGEN", "LIKÖR", "LILLE", "LIMES", "LIMIT", "LINDE", "LINIE", "LINKE", "LINKS", "LINUX",
  "LITER", "LITZE", "LOBBY", "LOGIK", "LOGIN", "LOGIS", "LOKAL", "LOSEN", "LOTEN", "LOTOS",
  "LOTSE", "LOTTO", "LOYAL", "LUDER", "LUGEN", "LUMEN", "LUNTE", "LUXUS", "LYMPH", "LYRIK",
  "LÄDEN", "LÄGEN", "LÄNGE", "LÄNGS", "LÄSST", "LÄUFT", "LÄUSE", "LÖHNE", "LÖSCH", "LÖSEN",
  "LÖTEN", "LÜCKE", "LÜGEN", "LÜSTE", "MACHO", "MACKE", "MADIG", "MAFIA", "MAGER", "MAGIE",
  "MAGMA", "MAGST", "MAJOR", "MAKEL", "MAKRO", "MALUS", "MALVE", "MANIE", "MANKO", "MANNA",
  "MARGE", "MASKE", "MATHE", "MEDIA", "MEILE", "MEIST", "MELDE", "MENGE", "MENSA", "MESSE",
  "METER", "METRO", "MEUTE", "MIENE", "MIEZE", "MIKRO", "MILAN", "MILBE", "MILIZ", "MIMIK",
  "MINEN", "MINUS", "MISCH", "MITTE", "MIXEN", "MIXER", "MOBIL", "MODEM", "MODUL", "MODUS",
  "MOGUL", "MOKKA", "MOLAR", "MOPED", "MORAL", "MORSE", "MOTEL", "MOTIV", "MOTTO", "MUFFE",
  "MULDE", "MULTI", "MUMIE", "MUMPS", "MURKS", "MUSST", "MUTEN", "MUTTI", "MYSQL", "MÄDEL",
  "MÄHER", "MÄHNE", "MÄZEN", "MÖBEL", "MÖGEN", "MÖHRE", "MÖNCH", "MÖPSE", "MÜHEN", "MÜHLE",
  "MÜRBE", "MÜSLI", "NABEL", "NACKT", "NAGER", "NAHEN", "NAHME", "NAMEN", "NARBE", "NATIV",
  "NATUR", "NEBST", "NETTO", "NEUER", "NEUNT", "NICHT", "NIETE", "NIKON", "NIMMT", "NOBEL",
  "NOMEN", "NONNE", "NORME", "NOTAR", "NOTIZ", "NOVUM", "NUGAT", "NYLON", "NÄGEL", "NÄHER",
  "NÄHTE", "NÄPFE", "NÄSSE", "NÖLEN", "NÖTIG", "OBHUT", "OBLAG", "OCKER", "ODIUM", "OHEIM",
  "OKTAN", "OKTAV", "OMEGA", "OPERN", "OPFER", "OPIUM", "OPTIK", "ORBIT", "ORDEN", "ORDER",
  "ORGAN", "ORGIE", "ORTEN", "OZEAN", "PACHT", "PANNE", "PAPPE", "PAPST", "PARAT", "PARTY",
  "PASTA", "PASTE", "PATCH", "PATER", "PAUKE", "PEDAL", "PEGEL", "PERLE", "PFAND", "PFARR",
  "PFEIL", "PFIFF", "PFLUG", "PFOTE", "PFUHL", "PFUND", "PHASE", "PHOTO", "PIANO", "PIEZO",
  "PIKEN", "PILLE", "PINIE", "PINNE", "PIRAT", "PISTE", "PIXEL", "PLATT", "PLUMP", "PLÄNE",
  "POKAL", "POKER", "POLAR", "POLIG", "POLIS", "POLLE", "POLYP", "POREN", "PORTI", "PORTO",
  "PORÖS", "POSSE", "POWER", "PRALL", "PRESS", "PRIES", "PRIMA", "PRIME", "PRINZ", "PROBE",
  "PROFI", "PROMI", "PROSA", "PROST", "PROXY", "PRUNK", "PRÜDE", "PSALM", "PUDEL", "PUDER",
  "PULLE", "PUMPE", "PUNKT", "PUPPE", "PYLON", "PÖBEL", "PÜREE", "QUALM", "QUANT", "QUART",
  "QUARZ", "QUASI", "QUBIT", "QUEEN", "QUELL", "QUERE", "QUINT", "QUIRL", "QUITT", "QUOTA",
  "QUOTE", "RABAT", "RACHE", "RADAR", "RADAU", "RADON", "RAGEN", "RAMPE", "RAPID", "RAPPE",
  "RASSE", "RATEN", "RATIO", "RAUCH", "RAUDI", "RAUEN", "RAVER", "REELL", "REGEL", "REGIE",
  "REICH", "REIHE", "REMIS", "RESET", "REUIG", "REVUE", "RICHT", "RICKE", "RIEGE", "RIESE",
  "RIETE", "RIGID", "RILLE", "RINGS", "RINNE", "RIPPE", "RITEN", "RODEN", "ROLLE", "ROLLI",
  "RONDO", "ROSIG", "ROTOR", "ROUTE", "ROWDY", "ROYAL", "RUBEL", "RUBIN", "RUDEL", "RUDER",
  "RUFER", "RUGBY", "RUHEN", "RUMPF", "RUNDE", "RUPIE", "RUSSE", "RÄSON", "RÄTST", "RÖHRE",
  "RÖMER", "RÖTER", "RÜGEN", "SACHE", "SACHT", "SAHNE", "SAITE", "SALBE", "SALDO", "SALON",
  "SALTO", "SALUT", "SALVE", "SAMBA", "SANTA", "SARDE", "SATIN", "SATYR", "SAUCE", "SAUEN",
  "SAUER", "SAUNA", "SCHAD", "SCHAH", "SCHAR", "SCHAU", "SCHEU", "SCHMU", "SCHOB", "SCHON",
  "SCHOR", "SCHUB", "SCHUF", "SCHUL", "SCHUR", "SCHÖN", "SECHS", "SEELE", "SEGEN", "SEHER",
  "SEIFE", "SEITE", "SELBE", "SELIG", "SENAT", "SENDE", "SENIL", "SEREN", "SERUM", "SESAM",
  "SETUP", "SEXTE", "SEXUS", "SICHT", "SIECH", "SIEHT", "SIGMA", "SILBE", "SILKE", "SINUS",
  "SIPPE", "SIRUP", "SITTE", "SKALA", "SKALP", "SKIER", "SMART", "SOGAR", "SOHLE", "SOLAR",
  "SOLCH", "SOLEI", "SOLID", "SOLLE", "SOMIT", "SONDE", "SONOR", "SONST", "SOOFT", "SORTE",
  "SOUND", "SPALT", "SPANN", "SPANT", "SPEER", "SPERR", "SPEZI", "SPIEL", "SPIEN", "SPIKE",
  "SPIND", "SPION", "SPITZ", "SPORE", "SPORN", "SPORT", "SPOTT", "SPRAY", "SPREE", "SPREU",
  "SPRIT", "SPRÖD", "SPRÜH", "SPULE", "SPURT", "SPÄNE", "STABS", "STACH", "STACK", "STAHL",
  "STALL", "STAMM", "STAND", "STANK", "STARB", "STARR", "START", "STASI", "STATT", "STAUB",
  "STEAK", "STECH", "STECK", "STEIF", "STEIG", "STEIL", "STELL", "STEMM", "STETE", "STETS",
  "STICH", "STIEG", "STIEL", "STIMM", "STOCK", "STOLA", "STOPP", "STORY", "STRAF", "STREB",
  "STREU", "STROH", "STROM", "STUBE", "STUCK", "STUFE", "STUMM", "STUNK", "STUNT", "STURZ",
  "STUSS", "STÄBE", "STÜCK", "STÜTZ", "SUCHE", "SUCHT", "SUITE", "SUMMA", "SUMME", "SUPER",
  "SUSHI", "SWING", "SZENE", "SÄBEL", "SÄCKE", "SÄFTE", "SÄMIG", "SÄRGE", "SÄTZE", "SÄUFT",
  "SÄULE", "SÄURE", "SÖHNE", "SÜHNE", "SÜLZE", "SÜNDE", "TABAK", "TADEL", "TAGEN", "TAGES",
  "TAIGA", "TAKEL", "TALER", "TALON", "TANGO", "TANNE", "TAPET", "TARIF", "TASSE", "TATZE",
  "TAUCH", "TAUFE", "TAXEN", "TEDDY", "TEILE", "TEINT", "TELEX", "TEMPO", "TENNE", "TENOR",
  "TEUER", "THEKE", "THEMA", "THESE", "THETA", "THRON", "TILDE", "TINTE", "TITAN", "TITEL",
  "TOAST", "TOKEN", "TONER", "TONNE", "TOPAS", "TORSO", "TORUS", "TOSEN", "TOTAL", "TOTEN",
  "TRAFO", "TRAGE", "TRAKT", "TRANK", "TREFF", "TREIB", "TREND", "TRENN", "TRIAS", "TRICK",
  "TRIEB", "TRINK", "TRIST", "TRITT", "TROLL", "TROPF", "TROSS", "TROTT", "TROTZ", "TRUMP",
  "TRUNK", "TRUPP", "TRÄFE", "TRÄGT", "TRÖGE", "TUBUS", "TUEND", "TUMOR", "TUPEL", "TURBO",
  "TUSCH", "TUTEN", "TUTOR", "TYPEN", "TYPUS", "TÄNZE", "TÄTER", "TÄTIG", "TÖNEN", "TÖRIN",
  "TÖTEN", "TÜCKE", "TÜRKE", "TÜRME", "ULKEN", "ULKIG", "ULTRA", "UMBAU", "UMBRA", "UMGAB",
  "UMHER", "UMHIN", "UMKAM", "UMSAH", "UMTUN", "UMWEG", "UMZOG", "UMZUG", "UNART", "UNFUG",
  "UNION", "UNKEN", "UNRAT", "UNRUH", "UNSER", "UNSRE", "UNTAT", "UNTEN", "URAHN", "URALT",
  "URBAN", "VEGAN", "VENEN", "VENUS", "VERSA", "VIDEO", "VIERT", "VIKAR", "VILLA", "VIOLA",
  "VIPER", "VIREN", "VIRUS", "VISUM", "VITAL", "VLIES", "VOKAL", "VOLKS", "VORAB", "VORAN",
  "VORIG", "VOTUM", "VÄTER", "VÖGEL", "VÖGTE", "WACHE", "WACHS", "WACHT", "WAFFE", "WAGON",
  "WAISE", "WALZE", "WALÖL", "WANNE", "WANST", "WAREN", "WARTE", "WARUM", "WARZE", "WASCH",
  "WATEN", "WATTE", "WEBER", "WEDEL", "WEHEN", "WEICH", "WEIHE", "WEITE", "WELCH", "WELLE",
  "WELPE", "WENDE", "WENIG", "WERBE", "WERFT", "WERKS", "WERTE", "WESEN", "WESER", "WETTE",
  "WICKE", "WIDER", "WIESO", "WILLE", "WIRBT", "WIRFT", "WIRST", "WISCH", "WITWE", "WOBEI",
  "WODKA", "WOFÜR", "WOHER", "WOHIN", "WOLFS", "WONNE", "WORIN", "WORUM", "WOVOR", "WRACK",
  "WRANG", "WUCHS", "WUCHT", "WULST", "WUNDE", "WURDE", "WUSCH", "WÄGEN", "WÄREN", "WÜRDE",
  "WÜRFE", "WÜRGE", "WÜTEN", "YACHT", "ZECHE", "ZEHNT", "ZEIGE", "ZEILE", "ZELLE", "ZENIT",
  "ZILLE", "ZIRKA", "ZITAT", "ZITZE", "ZIVIL", "ZOBEL", "ZOTIG", "ZUBER", "ZUCHT", "ZUDEM",
  "ZUGAB", "ZUGIG", "ZUMAL", "ZUNFT", "ZURUF", "ZUSAH", "ZUTAT", "ZUTUN", "ZUVOR", "ZUZOG",
  "ZUZUG", "ZWANG", "ZWEIT", "ZWERG", "ZWIST", "ZWÖLF", "ZYSTE", "ZÄSUR", "ZÖLLE", "ZÖPFE",
  "ZÜGEL", "ZÜGIG", "ÄCKER", "ÄFFEN", "ÄFFIN", "ÄGIDE", "ÄHREN", "ÄLTER", "ÄMTER", "ÄPFEL",
  "ÄRMEL", "ÄRMER", "ÄRZTE", "ÄTHER", "ÄTHYL", "ÄTSCH", "ÄTZEN", "ÄUGEN", "ÖFTER", "ÜBRIG",
  "ÜPPIG",
];

const WORD_SET = new Set([...WORD_LIST, ...EXTRA_VALID_GUESSES]);

export function getDailyWord(date: Date = new Date()): string {
  return WORD_LIST[dayNumber(date) % WORD_LIST.length];
}

/** Bei 1 beginnende, menschenlesbare Rätselnummer ("Worträtsel Nr. 12"). */
export function getPuzzleNumber(date: Date = new Date()): number {
  return dayNumber(date) - dayNumber(LAUNCH_DATE) + 1;
}

/** Für Plus-Bonusrunden (bis zu 5 Runden/Tag statt nur der einen
 * Tageslösung): zufälliges Wort aus demselben Lösungs-Pool, ohne die in
 * `exclude` übergebenen Wörter (z. B. die heutige Tageslösung und bereits
 * in dieser Sitzung gespielte Bonusrunden) -- vermeidet nur die direkte
 * Wiederholung, keine langfristige Zyklus-Garantie wie bei getDailyWord. */
export function getBonusWord(exclude: string[] = []): string {
  const excludeSet = new Set(exclude.map((w) => normalizeGuess(w)));
  const pool = WORD_LIST.filter((w) => !excludeSet.has(w));
  const candidates = pool.length > 0 ? pool : WORD_LIST;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function normalizeGuess(input: string): string {
  return input.toUpperCase().trim();
}

export function isValidGuess(input: string): boolean {
  const guess = normalizeGuess(input);
  return guess.length === WORD_LENGTH && WORD_SET.has(guess);
}

export type LetterState = "correct" | "present" | "absent";

/**
 * Klassischer Zwei-Pass-Wordle-Algorithmus: erst alle exakten Treffer
 * markieren und aus dem verbleibenden Buchstaben-Pool der Lösung entfernen,
 * dann für den Rest prüfen, ob der Buchstabe woanders in der Lösung noch
 * übrig ist. Der zweite Pass ist nötig, damit doppelte Buchstaben korrekt
 * behandelt werden (z. B. Lösung "ERBSE" mit zwei E, Versuch "EBENE").
 */
export function evaluateGuess(guess: string, solution: string): LetterState[] {
  const guessLetters = [...normalizeGuess(guess)];
  const solutionLetters = [...normalizeGuess(solution)];
  const result: LetterState[] = new Array(guessLetters.length).fill("absent");
  const remaining = [...solutionLetters];

  guessLetters.forEach((letter, i) => {
    if (letter === solutionLetters[i]) {
      result[i] = "correct";
      remaining[i] = null as unknown as string;
    }
  });

  guessLetters.forEach((letter, i) => {
    if (result[i] === "correct") return;
    const idx = remaining.indexOf(letter);
    if (idx !== -1) {
      result[i] = "present";
      remaining[idx] = null as unknown as string;
    }
  });

  return result;
}

export function isWin(states: LetterState[]): boolean {
  return states.every((s) => s === "correct");
}
