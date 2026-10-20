/**
 * Zeitstrahl: Ereignisse mit bekanntem Jahr müssen in eine wachsende,
 * chronologisch sortierte Kette eingeordnet werden (vorher/dazwischen/
 * nachher) -- endet beim ersten Fehler, wie beim Brettspiel-Vorbild
 * "Timeline". Punktestand = Anzahl korrekt eingeordneter Ereignisse.
 *
 * EVENTS ist ein einziger gemeinsamer Daten-Pool für alle drei
 * Schwierigkeitsstufen (keine eigene Kuration pro Stufe nötig) -- jedes
 * Jahr kommt nur genau einmal vor, damit "davor/danach" bei der Auswahl
 * immer eindeutig entscheidbar ist. Die Schwierigkeit kommt rein aus der
 * Pool-Größe pro Runde: je größer der gezogene Pool, desto dichter liegen
 * zwangsläufig manche Ereignisse zeitlich beieinander (die echte Dichte in
 * EVENTS ist ab ca. 1900 ohnehin viel höher als davor) -- kein separater
 * "Mindestabstand"-Parameter nötig.
 */

export type TimelineCategory = "Technik" | "Geschichte" | "Kultur" | "Wissenschaft";

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: TimelineCategory;
}

// Jahre sind untereinander alle verschieden (siehe oben) -- bei neuen
// Einträgen immer gegenprüfen.
export const EVENTS: TimelineEvent[] = [
  { year: 1450, title: "Gutenberg druckt mit beweglichen Lettern", description: "Die Bibel wird zum ersten in Europa in Serie gedruckten Buch.", category: "Technik" },
  { year: 1492, title: "Kolumbus erreicht Amerika", description: "Drei Schiffe landen in der Karibik, Europa entdeckt eine neue Welt.", category: "Geschichte" },
  { year: 1517, title: "Luthers Thesenanschlag", description: "In Wittenberg beginnt die Reformation.", category: "Geschichte" },
  { year: 1543, title: "Kopernikus veröffentlicht das heliozentrische Weltbild", description: "Fortan kreist die Erde um die Sonne, nicht umgekehrt.", category: "Wissenschaft" },
  { year: 1608, title: "Das erste Teleskop wird gebaut", description: "Hans Lippershey meldet in den Niederlanden ein Fernrohr zum Patent an.", category: "Technik" },
  { year: 1687, title: "Newton veröffentlicht die \"Principia Mathematica\"", description: "Die Gesetze der Schwerkraft werden erstmals mathematisch gefasst.", category: "Wissenschaft" },
  { year: 1712, title: "Die erste praxistaugliche Dampfmaschine läuft", description: "Thomas Newcomen pumpt damit Wasser aus englischen Kohleminen.", category: "Technik" },
  { year: 1776, title: "Die US-Unabhängigkeitserklärung wird unterzeichnet", description: "13 britische Kolonien erklären sich zu souveränen Staaten.", category: "Geschichte" },
  { year: 1789, title: "Sturm auf die Bastille", description: "Die Französische Revolution beginnt.", category: "Geschichte" },
  { year: 1804, title: "Trevithick lässt seine Dampflokomotive fahren", description: "In Wales rollte erstmals eine Lok auf Schienen.", category: "Technik" },
  { year: 1815, title: "Schlacht bei Waterloo", description: "Napoleons endgültige Niederlage beendet seine Herrschaft.", category: "Geschichte" },
  { year: 1837, title: "Der elektrische Telegraf wird vorgeführt", description: "Cooke und Wheatstone übertragen erste Nachrichten per Draht.", category: "Technik" },
  { year: 1859, title: "Darwin veröffentlicht \"Die Entstehung der Arten\"", description: "Die Evolutionstheorie verändert das Weltbild der Biologie.", category: "Wissenschaft" },
  { year: 1863, title: "Eröffnung der Londoner U-Bahn", description: "Die erste U-Bahn der Welt nimmt den Betrieb auf.", category: "Technik" },
  { year: 1869, title: "Mendelejew veröffentlicht das Periodensystem", description: "Die chemischen Elemente werden erstmals systematisch geordnet.", category: "Wissenschaft" },
  { year: 1871, title: "Gründung des Deutschen Kaiserreichs", description: "In Versailles wird der erste deutsche Nationalstaat ausgerufen.", category: "Geschichte" },
  { year: 1876, title: "Das Telefon wird patentiert", description: "Alexander Graham Bell meldet seine Erfindung in den USA an.", category: "Technik" },
  { year: 1879, title: "Edison stellt die praxistaugliche Glühbirne vor", description: "Eine Kohlefadenlampe brennt erstmals viele Stunden lang.", category: "Technik" },
  { year: 1886, title: "Der erste Patent-Motorwagen fährt", description: "Carl Benz lässt sich das erste praxistaugliche Automobil patentieren.", category: "Technik" },
  { year: 1895, title: "Röntgen entdeckt die Röntgenstrahlen", description: "Erstmals lässt sich ins Innere des menschlichen Körpers blicken.", category: "Wissenschaft" },
  { year: 1900, title: "Vorstellung der Rolltreppe", description: "Auf der Pariser Weltausstellung fährt erstmals eine laufende Treppe.", category: "Technik" },
  { year: 1903, title: "Die Gebrüder Wright heben ab", description: "Der erste motorisierte Flug der Geschichte dauert 12 Sekunden.", category: "Technik" },
  { year: 1905, title: "Einstein veröffentlicht die spezielle Relativitätstheorie", description: "Raum und Zeit werden neu gedacht.", category: "Wissenschaft" },
  { year: 1914, title: "Beginn des Ersten Weltkriegs", description: "Ein Attentat in Sarajevo löst eine Kriegslawine aus.", category: "Geschichte" },
  { year: 1917, title: "Oktoberrevolution in Russland", description: "Die Bolschewiki übernehmen die Macht.", category: "Geschichte" },
  { year: 1920, title: "Erste regelmäßige Rundfunksendungen", description: "In Pittsburgh startet mit KDKA das erste reguläre Radioprogramm.", category: "Technik" },
  { year: 1928, title: "Fleming entdeckt das Penicillin", description: "Ein Schimmelpilz auf einer vergessenen Petrischale liefert das erste Antibiotikum.", category: "Wissenschaft" },
  { year: 1929, title: "Schwarzer Donnerstag an der Wall Street", description: "Der Börsencrash stürzt die Welt in die große Depression.", category: "Geschichte" },
  { year: 1935, title: "Das Radar wird vorgeführt", description: "Robert Watson-Watt zeigt, wie sich Flugzeuge per Funkecho aufspüren lassen.", category: "Technik" },
  { year: 1939, title: "Beginn des Zweiten Weltkriegs", description: "Der deutsche Überfall auf Polen löst den Krieg aus.", category: "Geschichte" },
  { year: 1945, title: "Ende des Zweiten Weltkriegs in Europa", description: "Die bedingungslose Kapitulation beendet den Krieg.", category: "Geschichte" },
  { year: 1946, title: "Der Universalrechner ENIAC wird vorgestellt", description: "Ein Raum voller Röhren rechnet schneller als jeder Mensch zuvor.", category: "Technik" },
  { year: 1948, title: "Gründung des Staates Israel", description: "David Ben-Gurion ruft die Unabhängigkeit aus.", category: "Geschichte" },
  { year: 1949, title: "Gründung der Bundesrepublik Deutschland", description: "Das Grundgesetz tritt in Kraft.", category: "Geschichte" },
  { year: 1953, title: "Watson und Crick entschlüsseln die DNA-Doppelhelix", description: "Der Bauplan des Lebens wird sichtbar.", category: "Wissenschaft" },
  { year: 1957, title: "Start von Sputnik", description: "Der erste künstliche Satellit umkreist die Erde.", category: "Technik" },
  { year: 1961, title: "Bau der Berliner Mauer", description: "Über Nacht wird Berlin geteilt.", category: "Geschichte" },
  { year: 1964, title: "Aufnahme des Shinkansen-Betriebs", description: "Japans Hochgeschwindigkeitszug verbindet Tokio und Osaka.", category: "Technik" },
  { year: 1969, title: "Mondlandung", description: "Apollo 11 bringt die ersten Menschen auf den Mond.", category: "Technik" },
  { year: 1971, title: "Der erste Mikroprozessor kommt auf den Markt", description: "Intels 4004 passt Zehntausende Transistoren auf einen Chip.", category: "Technik" },
  { year: 1973, title: "Das erste Handygespräch wird geführt", description: "Martin Cooper telefoniert mitten auf einer New Yorker Straße.", category: "Technik" },
  { year: 1977, title: "Der erste \"Star Wars\"-Film startet", description: "Eine neue Science-Fiction-Saga erobert die Kinoleinwände.", category: "Kultur" },
  { year: 1981, title: "Der erste IBM-PC kommt auf den Markt", description: "Der Begriff \"Personal Computer\" setzt sich durch.", category: "Technik" },
  { year: 1982, title: "Die Compact Disc kommt auf den Markt", description: "Musik wird erstmals in Serie digital verkauft.", category: "Technik" },
  { year: 1989, title: "Fall der Berliner Mauer", description: "Nach 28 Jahren Teilung öffnen sich die Grenzübergänge.", category: "Geschichte" },
  { year: 1990, title: "Deutsche Wiedervereinigung", description: "Die beiden deutschen Staaten werden wieder eins.", category: "Geschichte" },
  { year: 1991, title: "Auflösung der Sowjetunion", description: "15 Staaten entstehen aus dem einstigen Riesenreich.", category: "Geschichte" },
  { year: 1993, title: "Das World Wide Web wird frei verfügbar", description: "CERN stellt die Technik hinter dem Web der ganzen Welt zur Verfügung.", category: "Technik" },
  { year: 1996, title: "Klonschaf Dolly wird geboren", description: "Erstmals gelingt das Klonen eines Säugetiers aus einer Körperzelle.", category: "Wissenschaft" },
  { year: 1998, title: "Google wird gegründet", description: "Zwei Stanford-Studenten starten eine neue Suchmaschine.", category: "Technik" },
  { year: 2001, title: "Terroranschläge vom 11. September", description: "Angriffe auf das World Trade Center erschüttern die Welt.", category: "Geschichte" },
  { year: 2004, title: "Facebook wird gegründet", description: "Ein Netzwerk für Harvard-Studierende wird zum globalen Phänomen.", category: "Technik" },
  { year: 2007, title: "Das erste iPhone wird vorgestellt", description: "Apple bringt Telefon, Internet und Musikplayer in einem Gerät zusammen.", category: "Technik" },
  { year: 2012, title: "Entdeckung des Higgs-Bosons", description: "Das CERN bestätigt das letzte fehlende Teilchen des Standardmodells.", category: "Wissenschaft" },
];

export type TimelineDifficulty = "easy" | "medium" | "hard";

export const LAYOUTS: Record<TimelineDifficulty, { poolSize: number }> = {
  easy: { poolSize: 12 },
  medium: { poolSize: 20 },
  hard: { poolSize: 32 },
};

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Farthest-Point-Sampling über die Jahreszahlen: startet bei einem
 * zufälligen Ereignis, nimmt danach immer das Ereignis, dessen Abstand zum
 * NÄCHSTEN bereits gewählten Jahr am größten ist. Bei kleinem `size` bleibt
 * der Pool dadurch so breit gestreut wie möglich (leicht); je größer
 * `size` wird, desto mehr muss der Algorithmus zwangsläufig in dichter
 * gelegene Ereignisse "hineingreifen" -- die Schwierigkeit ergibt sich so
 * rein aus der Poolgröße, ganz ohne eigenen Mindestabstands-Parameter. */
function pickSpreadPool(size: number): TimelineEvent[] {
  const remaining = shuffle(EVENTS);
  const pool: TimelineEvent[] = [remaining.pop()!];
  while (pool.length < size && remaining.length > 0) {
    let bestIdx = 0;
    let bestDist = -1;
    for (let i = 0; i < remaining.length; i++) {
      const d = Math.min(...pool.map((p) => Math.abs(p.year - remaining[i].year)));
      if (d > bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    pool.push(remaining.splice(bestIdx, 1)[0]);
  }
  return pool;
}

export interface TimelineRound {
  /** Bereits bekannt, chronologisch sortiert -- Startaufstellung mit 2 Karten. */
  placed: TimelineEvent[];
  /** Noch zu ziehende Ereignisse, in Ziehreihenfolge. */
  deck: TimelineEvent[];
}

export function generateRound(difficulty: TimelineDifficulty): TimelineRound {
  const pool = shuffle(pickSpreadPool(LAYOUTS[difficulty].poolSize));
  const placed = pool.slice(0, 2).sort((a, b) => a.year - b.year);
  const deck = pool.slice(2);
  return { placed, deck };
}
