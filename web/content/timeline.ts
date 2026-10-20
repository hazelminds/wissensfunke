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
  { year: 79, title: "Ausbruch des Vesuv", description: "Die Stadt Pompeji wird unter Vulkanasche begraben und so Jahrhunderte konserviert.", category: "Geschichte" },
  { year: 622, title: "Hidschra -- Mohammeds Auswanderung nach Medina", description: "Der Umzug markiert den Beginn der islamischen Zeitrechnung.", category: "Geschichte" },
  { year: 800, title: "Kaiserkrönung Karls des Großen", description: "Papst Leo III. krönt ihn in Rom zum Kaiser.", category: "Geschichte" },
  { year: 1066, title: "Schlacht bei Hastings", description: "Wilhelm der Eroberer besiegt die Angelsachsen und übernimmt die englische Krone.", category: "Geschichte" },
  { year: 1096, title: "Beginn des Ersten Kreuzzugs", description: "Ritterheere aus ganz Europa ziehen Richtung Jerusalem.", category: "Geschichte" },
  { year: 1215, title: "Besiegelung der Magna Carta", description: "Englands König muss den Baronen erstmals Rechte zugestehen.", category: "Geschichte" },
  { year: 1347, title: "Der Schwarze Tod erreicht Europa", description: "Über Handelsschiffe aus dem Schwarzen Meer breitet sich die Pest aus.", category: "Geschichte" },
  { year: 1431, title: "Jeanne d'Arc wird verbrannt", description: "Die französische Nationalheldin stirbt in Rouen auf dem Scheiterhaufen.", category: "Geschichte" },
  { year: 1453, title: "Fall von Konstantinopel", description: "Die Osmanen erobern die Stadt -- für viele Historiker das Ende des Mittelalters.", category: "Geschichte" },
  { year: 1450, title: "Gutenberg druckt mit beweglichen Lettern", description: "Die Bibel wird zum ersten in Europa in Serie gedruckten Buch.", category: "Technik" },
  { year: 1492, title: "Kolumbus erreicht Amerika", description: "Drei Schiffe landen in der Karibik, Europa entdeckt eine neue Welt.", category: "Geschichte" },
  { year: 1517, title: "Luthers Thesenanschlag", description: "In Wittenberg beginnt die Reformation.", category: "Geschichte" },
  { year: 1543, title: "Kopernikus veröffentlicht das heliozentrische Weltbild", description: "Fortan kreist die Erde um die Sonne, nicht umgekehrt.", category: "Wissenschaft" },
  { year: 1588, title: "Niederlage der Spanischen Armada", description: "Englands Flotte wehrt die geplante Invasion Philipps II. ab.", category: "Geschichte" },
  { year: 1600, title: "Shakespeares \"Hamlet\" entsteht", description: "Die Tragödie um den dänischen Prinzen wird zu einem der meistgespielten Theaterstücke der Welt.", category: "Kultur" },
  { year: 1608, title: "Das erste Teleskop wird gebaut", description: "Hans Lippershey meldet in den Niederlanden ein Fernrohr zum Patent an.", category: "Technik" },
  { year: 1618, title: "Beginn des Dreißigjährigen Krieges", description: "Der Prager Fenstersturz löst den großen europäischen Religionskrieg aus.", category: "Geschichte" },
  { year: 1633, title: "Inquisitionsprozess gegen Galileo Galilei", description: "Er muss seine Lehre von der um die Sonne kreisenden Erde widerrufen.", category: "Wissenschaft" },
  { year: 1648, title: "Westfälischer Friede", description: "Der Friedensschluss von Münster und Osnabrück beendet den Dreißigjährigen Krieg.", category: "Geschichte" },
  { year: 1666, title: "Großer Brand von London", description: "Das Feuer zerstört weite Teile der mittelalterlichen Innenstadt.", category: "Geschichte" },
  { year: 1685, title: "Johann Sebastian Bach wird geboren", description: "Er wird zu einem der bedeutendsten Komponisten des Barock.", category: "Kultur" },
  { year: 1687, title: "Newton veröffentlicht die \"Principia Mathematica\"", description: "Die Gesetze der Schwerkraft werden erstmals mathematisch gefasst.", category: "Wissenschaft" },
  { year: 1707, title: "Gründung des Königreichs Großbritannien", description: "Der Act of Union vereint England und Schottland.", category: "Geschichte" },
  { year: 1712, title: "Die erste praxistaugliche Dampfmaschine läuft", description: "Thomas Newcomen pumpt damit Wasser aus englischen Kohleminen.", category: "Technik" },
  { year: 1752, title: "Franklins Drachenexperiment", description: "Der Versuch im Gewitter zeigt die elektrische Natur des Blitzes.", category: "Wissenschaft" },
  { year: 1755, title: "Erdbeben von Lissabon", description: "Beben, Feuer und Tsunami zerstören weite Teile der portugiesischen Hauptstadt.", category: "Geschichte" },
  { year: 1764, title: "Erfindung der Spinning Jenny", description: "James Hargreaves' Spinnmaschine beschleunigt die Textilproduktion enorm.", category: "Technik" },
  { year: 1769, title: "Watt patentiert den verbesserten Dampfmaschinen-Kondensator", description: "Seine Konstruktion macht die Dampfmaschine erst wirtschaftlich einsetzbar.", category: "Technik" },
  { year: 1776, title: "Die US-Unabhängigkeitserklärung wird unterzeichnet", description: "13 britische Kolonien erklären sich zu souveränen Staaten.", category: "Geschichte" },
  { year: 1783, title: "Erster bemannter Ballonflug", description: "In Paris steigen zwei Männer mit einer Montgolfiere in die Luft.", category: "Technik" },
  { year: 1789, title: "Sturm auf die Bastille", description: "Die Französische Revolution beginnt.", category: "Geschichte" },
  { year: 1791, title: "Uraufführung von Mozarts \"Zauberflöte\"", description: "Die Oper feiert in einem Wiener Vorstadttheater Premiere.", category: "Kultur" },
  { year: 1796, title: "Erste Impfung gegen Pocken", description: "Edward Jenner verabreicht einem Jungen Kuhpocken-Erreger und macht ihn immun.", category: "Wissenschaft" },
  { year: 1799, title: "Fund des Steins von Rosette", description: "Die dreisprachige Inschrift liefert später den Schlüssel zu den Hieroglyphen.", category: "Wissenschaft" },
  { year: 1804, title: "Trevithick lässt seine Dampflokomotive fahren", description: "In Wales rollte erstmals eine Lok auf Schienen.", category: "Technik" },
  { year: 1815, title: "Schlacht bei Waterloo", description: "Napoleons endgültige Niederlage beendet seine Herrschaft.", category: "Geschichte" },
  { year: 1821, title: "Tod Napoleon Bonapartes", description: "Er stirbt im Exil auf der Atlantikinsel St. Helena.", category: "Geschichte" },
  { year: 1826, title: "Die erste erhaltene Fotografie entsteht", description: "Niépce belichtet mit einer Camera obscura eine Zinnplatte -- stundenlang.", category: "Technik" },
  { year: 1830, title: "Eröffnung der Bahnlinie Liverpool-Manchester", description: "Die erste durchgehend dampfbetriebene Intercity-Strecke der Welt nimmt den Betrieb auf.", category: "Technik" },
  { year: 1837, title: "Der elektrische Telegraf wird vorgeführt", description: "Cooke und Wheatstone übertragen erste Nachrichten per Draht.", category: "Technik" },
  { year: 1846, title: "Erste Operation unter Äther-Narkose", description: "In Boston wird ein Patient erstmals öffentlich schmerzfrei operiert.", category: "Wissenschaft" },
  { year: 1848, title: "Veröffentlichung des \"Kommunistischen Manifests\"", description: "Marx und Engels formulieren ihre Theorie des Klassenkampfs.", category: "Geschichte" },
  { year: 1851, title: "Weltausstellung im Londoner Kristallpalast", description: "Die erste Weltausstellung der Geschichte zeigt Industrieprodukte aus aller Welt.", category: "Kultur" },
  { year: 1859, title: "Darwin veröffentlicht \"Die Entstehung der Arten\"", description: "Die Evolutionstheorie verändert das Weltbild der Biologie.", category: "Wissenschaft" },
  { year: 1863, title: "Eröffnung der Londoner U-Bahn", description: "Die erste U-Bahn der Welt nimmt den Betrieb auf.", category: "Technik" },
  { year: 1865, title: "Ende des Amerikanischen Bürgerkriegs", description: "Mit der Kapitulation der Konföderierten endet der Krieg, kurz darauf wird Lincoln ermordet.", category: "Geschichte" },
  { year: 1866, title: "Alfred Nobel erfindet das Dynamit", description: "Er stabilisiert das hochexplosive Nitroglycerin mit Kieselgur.", category: "Technik" },
  { year: 1867, title: "Erscheinen von Marx' \"Das Kapital\"", description: "Der erste Band seiner Kapitalismus-Kritik erscheint in Hamburg.", category: "Kultur" },
  { year: 1869, title: "Mendelejew veröffentlicht das Periodensystem", description: "Die chemischen Elemente werden erstmals systematisch geordnet.", category: "Wissenschaft" },
  { year: 1871, title: "Gründung des Deutschen Kaiserreichs", description: "In Versailles wird der erste deutsche Nationalstaat ausgerufen.", category: "Geschichte" },
  { year: 1874, title: "Erste Ausstellung der Impressionisten", description: "In Paris zeigen Monet, Renoir und andere erstmals gemeinsam ihre Werke.", category: "Kultur" },
  { year: 1876, title: "Das Telefon wird patentiert", description: "Alexander Graham Bell meldet seine Erfindung in den USA an.", category: "Technik" },
  { year: 1877, title: "Edison erfindet den Phonographen", description: "Erstmals lässt sich aufgenommener Schall auch wieder abspielen.", category: "Technik" },
  { year: 1879, title: "Edison stellt die praxistaugliche Glühbirne vor", description: "Eine Kohlefadenlampe brennt erstmals viele Stunden lang.", category: "Technik" },
  { year: 1884, title: "Greenwich wird Nullmeridian", description: "Eine internationale Konferenz legt den Bezugspunkt für Zeitzonen und Längengrade fest.", category: "Wissenschaft" },
  { year: 1886, title: "Der erste Patent-Motorwagen fährt", description: "Carl Benz lässt sich das erste praxistaugliche Automobil patentieren.", category: "Technik" },
  { year: 1889, title: "Einweihung des Eiffelturms", description: "Zur Weltausstellung wird er kurzzeitig das höchste Bauwerk der Welt.", category: "Technik" },
  { year: 1891, title: "Erfindung des Basketballs", description: "James Naismith lässt seine Klasse mit einem Ball und zwei Pfirsichkörben spielen.", category: "Kultur" },
  { year: 1895, title: "Röntgen entdeckt die Röntgenstrahlen", description: "Erstmals lässt sich ins Innere des menschlichen Körpers blicken.", category: "Wissenschaft" },
  { year: 1896, title: "Erste Olympische Spiele der Neuzeit", description: "In Athen lebt die antike Idee der Olympiade wieder auf.", category: "Kultur" },
  { year: 1898, title: "Marie und Pierre Curie entdecken Radium", description: "Das Ehepaar isoliert aus Pechblende zwei neue radioaktive Elemente.", category: "Wissenschaft" },
  { year: 1900, title: "Vorstellung der Rolltreppe", description: "Auf der Pariser Weltausstellung fährt erstmals eine laufende Treppe.", category: "Technik" },
  { year: 1903, title: "Die Gebrüder Wright heben ab", description: "Der erste motorisierte Flug der Geschichte dauert 12 Sekunden.", category: "Technik" },
  { year: 1905, title: "Einstein veröffentlicht die spezielle Relativitätstheorie", description: "Raum und Zeit werden neu gedacht.", category: "Wissenschaft" },
  { year: 1908, title: "Markteinführung des Ford Model T", description: "Das erste in Serie erschwingliche Automobil macht Autofahren massentauglich.", category: "Technik" },
  { year: 1912, title: "Untergang der Titanic", description: "Das als unsinkbar geltende Schiff sinkt nach einer Kollision mit einem Eisberg.", category: "Geschichte" },
  { year: 1913, title: "Ford führt das Fließband ein", description: "Die Montagezeit für ein Auto sinkt dadurch drastisch.", category: "Technik" },
  { year: 1914, title: "Beginn des Ersten Weltkriegs", description: "Ein Attentat in Sarajevo löst eine Kriegslawine aus.", category: "Geschichte" },
  { year: 1917, title: "Oktoberrevolution in Russland", description: "Die Bolschewiki übernehmen die Macht.", category: "Geschichte" },
  { year: 1919, title: "Gründung des Bauhauses", description: "Walter Gropius vereint in Weimar Kunst und Handwerk zu einer neuen Schule.", category: "Kultur" },
  { year: 1920, title: "Erste regelmäßige Rundfunksendungen", description: "In Pittsburgh startet mit KDKA das erste reguläre Radioprogramm.", category: "Technik" },
  { year: 1922, title: "Entdeckung des Grabs von Tutanchamun", description: "Howard Carter findet im Tal der Könige die nahezu unberührte Grabkammer.", category: "Geschichte" },
  { year: 1923, title: "Gründung der Walt Disney Company", description: "Walt und Roy Disney starten ihr Trickfilmstudio in Kalifornien.", category: "Kultur" },
  { year: 1924, title: "Erste Olympische Winterspiele", description: "Im französischen Chamonix werden Wintersportarten erstmals olympisch.", category: "Kultur" },
  { year: 1926, title: "Erste Fernsehübertragung", description: "John Logie Baird zeigt in London das bewegte Bild eines menschlichen Gesichts.", category: "Technik" },
  { year: 1927, title: "Der Tonfilm bricht durch", description: "\"Der Jazzsänger\" wird zum ersten großen Kassenerfolg mit gesprochenen Tönen.", category: "Kultur" },
  { year: 1928, title: "Fleming entdeckt das Penicillin", description: "Ein Schimmelpilz auf einer vergessenen Petrischale liefert das erste Antibiotikum.", category: "Wissenschaft" },
  { year: 1929, title: "Schwarzer Donnerstag an der Wall Street", description: "Der Börsencrash stürzt die Welt in die große Depression.", category: "Geschichte" },
  { year: 1930, title: "Erste Fußball-Weltmeisterschaft", description: "Gastgeber Uruguay gewinnt das allererste WM-Turnier in Montevideo.", category: "Kultur" },
  { year: 1931, title: "Eröffnung des Empire State Building", description: "Es ist vier Jahrzehnte lang das höchste Gebäude der Welt.", category: "Technik" },
  { year: 1933, title: "Hitler wird Reichskanzler", description: "Reichspräsident Hindenburg ernennt ihn zum Regierungschef.", category: "Geschichte" },
  { year: 1935, title: "Das Radar wird vorgeführt", description: "Robert Watson-Watt zeigt, wie sich Flugzeuge per Funkecho aufspüren lassen.", category: "Technik" },
  { year: 1936, title: "Olympische Spiele in Berlin", description: "Das NS-Regime inszeniert die Spiele als Propagandaschau.", category: "Geschichte" },
  { year: 1937, title: "Premiere von \"Schneewittchen und die sieben Zwerge\"", description: "Es ist Disneys erster abendfüllender Zeichentrickfilm.", category: "Kultur" },
  { year: 1938, title: "Entdeckung der Kernspaltung", description: "Hahn und Straßmann weisen in Berlin erstmals gespaltene Uran-Atomkerne nach.", category: "Wissenschaft" },
  { year: 1939, title: "Beginn des Zweiten Weltkriegs", description: "Der deutsche Überfall auf Polen löst den Krieg aus.", category: "Geschichte" },
  { year: 1941, title: "Angriff auf Pearl Harbor", description: "Japan greift die US-Pazifikflotte an, die USA treten in den Krieg ein.", category: "Geschichte" },
  { year: 1944, title: "Landung der Alliierten in der Normandie", description: "Der D-Day leitet die Befreiung Westeuropas ein.", category: "Geschichte" },
  { year: 1945, title: "Ende des Zweiten Weltkriegs in Europa", description: "Die bedingungslose Kapitulation beendet den Krieg.", category: "Geschichte" },
  { year: 1946, title: "Der Universalrechner ENIAC wird vorgestellt", description: "Ein Raum voller Röhren rechnet schneller als jeder Mensch zuvor.", category: "Technik" },
  { year: 1947, title: "Unabhängigkeit Indiens", description: "Großbritannien entlässt das Land in die Unabhängigkeit, Pakistan wird abgespalten.", category: "Geschichte" },
  { year: 1948, title: "Gründung des Staates Israel", description: "David Ben-Gurion ruft die Unabhängigkeit aus.", category: "Geschichte" },
  { year: 1949, title: "Gründung der Bundesrepublik Deutschland", description: "Das Grundgesetz tritt in Kraft.", category: "Geschichte" },
  { year: 1950, title: "Beginn des Koreakriegs", description: "Nordkoreanische Truppen marschieren in Südkorea ein.", category: "Geschichte" },
  { year: 1952, title: "Elizabeth II. wird Königin", description: "Nach dem Tod ihres Vaters besteigt sie den britischen Thron.", category: "Geschichte" },
  { year: 1953, title: "Watson und Crick entschlüsseln die DNA-Doppelhelix", description: "Der Bauplan des Lebens wird sichtbar.", category: "Wissenschaft" },
  { year: 1954, title: "\"Wunder von Bern\"", description: "Die deutsche Nationalmannschaft gewinnt überraschend ihren ersten Fußball-WM-Titel.", category: "Kultur" },
  { year: 1955, title: "Eröffnung des ersten Disneylands", description: "Der Freizeitpark in Anaheim, Kalifornien, öffnet seine Tore.", category: "Kultur" },
  { year: 1956, title: "Ungarnaufstand", description: "Sowjetische Panzer schlagen den Volksaufstand gegen die Besatzung nieder.", category: "Geschichte" },
  { year: 1957, title: "Start von Sputnik", description: "Der erste künstliche Satellit umkreist die Erde.", category: "Technik" },
  { year: 1958, title: "Gründung der NASA", description: "Als Reaktion auf den Sputnik-Schock entsteht die US-Raumfahrtbehörde.", category: "Technik" },
  { year: 1959, title: "Kubanische Revolution", description: "Fidel Castro stürzt Diktator Batista und übernimmt die Macht.", category: "Geschichte" },
  { year: 1960, title: "\"Jahr Afrikas\"", description: "17 afrikanische Kolonien werden in diesem Jahr unabhängig.", category: "Geschichte" },
  { year: 1961, title: "Bau der Berliner Mauer", description: "Über Nacht wird Berlin geteilt.", category: "Geschichte" },
  { year: 1962, title: "Kubakrise", description: "Sowjetische Raketen auf Kuba bringen die Welt an den Rand eines Atomkriegs.", category: "Geschichte" },
  { year: 1963, title: "Ermordung John F. Kennedys", description: "Der US-Präsident wird bei einer Fahrt durch Dallas erschossen.", category: "Geschichte" },
  { year: 1964, title: "Aufnahme des Shinkansen-Betriebs", description: "Japans Hochgeschwindigkeitszug verbindet Tokio und Osaka.", category: "Technik" },
  { year: 1965, title: "Erster Weltraumspaziergang", description: "Der Kosmonaut Alexei Leonow verlässt kurz seine Raumkapsel.", category: "Technik" },
  { year: 1966, title: "Erstausstrahlung von \"Raumschiff Enterprise\"", description: "Die Serie \"Star Trek\" startet im US-Fernsehen.", category: "Kultur" },
  { year: 1967, title: "Erste Herztransplantation", description: "Christiaan Barnard verpflanzt in Kapstadt erstmals ein menschliches Herz.", category: "Wissenschaft" },
  { year: 1968, title: "Ermordung Martin Luther Kings", description: "Der Bürgerrechtler wird in Memphis erschossen.", category: "Geschichte" },
  { year: 1969, title: "Mondlandung", description: "Apollo 11 bringt die ersten Menschen auf den Mond.", category: "Technik" },
  { year: 1970, title: "Auflösung der Beatles", description: "Nach der Ankündigung von Paul McCartney gilt die Band als getrennt.", category: "Kultur" },
  { year: 1971, title: "Der erste Mikroprozessor kommt auf den Markt", description: "Intels 4004 passt Zehntausende Transistoren auf einen Chip.", category: "Technik" },
  { year: 1972, title: "Olympia-Attentat von München", description: "Ein Terroranschlag auf die israelische Mannschaft endet in einem Blutbad.", category: "Geschichte" },
  { year: 1973, title: "Das erste Handygespräch wird geführt", description: "Martin Cooper telefoniert mitten auf einer New Yorker Straße.", category: "Technik" },
  { year: 1974, title: "Rücktritt von US-Präsident Nixon", description: "Die Watergate-Affäre zwingt ihn als ersten US-Präsidenten zum Rücktritt.", category: "Geschichte" },
  { year: 1975, title: "Fall von Saigon", description: "Nordvietnamesische Truppen erobern die südvietnamesische Hauptstadt, der Vietnamkrieg endet.", category: "Geschichte" },
  { year: 1976, title: "Gründung von Apple", description: "Steve Jobs und Steve Wozniak starten die Firma in einer Garage in Kalifornien.", category: "Technik" },
  { year: 1977, title: "Der erste \"Star Wars\"-Film startet", description: "Eine neue Science-Fiction-Saga erobert die Kinoleinwände.", category: "Kultur" },
  { year: 1978, title: "Geburt des ersten \"Retortenbabys\"", description: "Louise Brown kommt als erster durch künstliche Befruchtung gezeugter Mensch zur Welt.", category: "Wissenschaft" },
  { year: 1979, title: "Islamische Revolution im Iran", description: "Der Schah wird gestürzt, Ayatollah Khomeini ruft die Islamische Republik aus.", category: "Geschichte" },
  { year: 1980, title: "Ermordung John Lennons", description: "Der ehemalige Beatle wird vor seiner Wohnung in New York erschossen.", category: "Kultur" },
  { year: 1981, title: "Der erste IBM-PC kommt auf den Markt", description: "Der Begriff \"Personal Computer\" setzt sich durch.", category: "Technik" },
  { year: 1982, title: "Die Compact Disc kommt auf den Markt", description: "Musik wird erstmals in Serie digital verkauft.", category: "Technik" },
  { year: 1983, title: "Umstellung des Arpanet auf TCP/IP", description: "Das Protokoll wird zur technischen Grundlage des heutigen Internets.", category: "Technik" },
  { year: 1984, title: "Vorstellung des Apple Macintosh", description: "Der Computer bringt eine grafische Benutzeroberfläche einem breiten Publikum.", category: "Technik" },
  { year: 1985, title: "Live-Aid-Konzert", description: "Zeitgleiche Benefizkonzerte in London und Philadelphia sammeln Geld gegen die Hungersnot in Äthiopien.", category: "Kultur" },
  { year: 1986, title: "Reaktorkatastrophe von Tschernobyl", description: "Die Kernschmelze im Block 4 gilt bis heute als schwerster Atomunfall der Geschichte.", category: "Geschichte" },
  { year: 1987, title: "\"Schwarzer Montag\" an der Börse", description: "Der Dow Jones verliert an einem einzigen Tag über 22 Prozent.", category: "Geschichte" },
  { year: 1989, title: "Fall der Berliner Mauer", description: "Nach 28 Jahren Teilung öffnen sich die Grenzübergänge.", category: "Geschichte" },
  { year: 1990, title: "Deutsche Wiedervereinigung", description: "Die beiden deutschen Staaten werden wieder eins.", category: "Geschichte" },
  { year: 1991, title: "Auflösung der Sowjetunion", description: "15 Staaten entstehen aus dem einstigen Riesenreich.", category: "Geschichte" },
  { year: 1992, title: "Unterzeichnung des Vertrags von Maastricht", description: "Der Gründungsvertrag der Europäischen Union wird besiegelt.", category: "Geschichte" },
  { year: 1993, title: "Das World Wide Web wird frei verfügbar", description: "CERN stellt die Technik hinter dem Web der ganzen Welt zur Verfügung.", category: "Technik" },
  { year: 1994, title: "Nelson Mandela wird Präsident Südafrikas", description: "Er ist das erste schwarze Staatsoberhaupt des Landes nach dem Ende der Apartheid.", category: "Geschichte" },
  { year: 1995, title: "Der DVD-Standard wird festgelegt", description: "Elektronik- und Filmfirmen einigen sich auf ein gemeinsames Format für die Nachfolge der VHS-Kassette.", category: "Technik" },
  { year: 1996, title: "Klonschaf Dolly wird geboren", description: "Erstmals gelingt das Klonen eines Säugetiers aus einer Körperzelle.", category: "Wissenschaft" },
  { year: 1997, title: "Erscheinen des ersten Harry-Potter-Buchs", description: "\"Harry Potter und der Stein der Weisen\" startet eine der erfolgreichsten Buchreihen der Welt.", category: "Kultur" },
  { year: 1998, title: "Google wird gegründet", description: "Zwei Stanford-Studenten starten eine neue Suchmaschine.", category: "Technik" },
  { year: 1999, title: "Einführung des Euro als Buchgeld", description: "Elf EU-Staaten führen die neue Gemeinschaftswährung zunächst nur elektronisch ein.", category: "Geschichte" },
  { year: 2000, title: "Erste Dauerbesatzung der ISS", description: "Mit Expedition 1 beginnt die bis heute ununterbrochene Bewohnung der Raumstation.", category: "Technik" },
  { year: 2001, title: "Terroranschläge vom 11. September", description: "Angriffe auf das World Trade Center erschüttern die Welt.", category: "Geschichte" },
  { year: 2002, title: "Einführung des Euro-Bargelds", description: "Scheine und Münzen ersetzen in zwölf Ländern die alten Nationalwährungen.", category: "Geschichte" },
  { year: 2003, title: "Abschluss des Humangenomprojekts", description: "Die Sequenzierung des menschlichen Erbguts gilt als weitgehend abgeschlossen.", category: "Wissenschaft" },
  { year: 2004, title: "Facebook wird gegründet", description: "Ein Netzwerk für Harvard-Studierende wird zum globalen Phänomen.", category: "Technik" },
  { year: 2005, title: "Gründung von YouTube", description: "Die Video-Plattform verändert, wie Menschen Videos teilen und schauen.", category: "Technik" },
  { year: 2006, title: "Gründung von Twitter", description: "Der Kurznachrichtendienst wird später in X umbenannt.", category: "Technik" },
  { year: 2007, title: "Das erste iPhone wird vorgestellt", description: "Apple bringt Telefon, Internet und Musikplayer in einem Gerät zusammen.", category: "Technik" },
  { year: 2008, title: "Insolvenz von Lehman Brothers", description: "Die Pleite der US-Investmentbank markiert den Höhepunkt der globalen Finanzkrise.", category: "Geschichte" },
  { year: 2009, title: "Start des Bitcoin-Netzwerks", description: "Mit dem ersten geschürften Block beginnt die erste Kryptowährung.", category: "Technik" },
  { year: 2010, title: "Vorstellung des ersten iPad", description: "Apple bringt mit dem Tablet eine neue Geräteklasse in den Massenmarkt.", category: "Technik" },
  { year: 2011, title: "Reaktorkatastrophe von Fukushima", description: "Ein Erdbeben und Tsunami lösen in Japan eine Kernschmelze aus.", category: "Geschichte" },
  { year: 2012, title: "Entdeckung des Higgs-Bosons", description: "Das CERN bestätigt das letzte fehlende Teilchen des Standardmodells.", category: "Wissenschaft" },
  { year: 2013, title: "Snowden-Enthüllungen", description: "Der Whistleblower deckt das Ausmaß der globalen NSA-Überwachung auf.", category: "Geschichte" },
  { year: 2015, title: "Pariser Klimaabkommen", description: "195 Staaten einigen sich erstmals auf verbindliche Klimaziele.", category: "Geschichte" },
  { year: 2016, title: "Brexit-Referendum", description: "Großbritannien stimmt knapp für den Austritt aus der EU.", category: "Geschichte" },
  { year: 2019, title: "Erstes Foto eines Schwarzen Lochs", description: "Ein weltweites Teleskop-Netzwerk macht das Unsichtbare erstmals sichtbar.", category: "Wissenschaft" },
  { year: 2020, title: "WHO erklärt COVID-19 zur Pandemie", description: "Das Coronavirus legt binnen Wochen das öffentliche Leben weltweit lahm.", category: "Geschichte" },
  { year: 2022, title: "Russland beginnt die Invasion der Ukraine", description: "Der großangelegte Angriffskrieg erschüttert die europäische Sicherheitsordnung.", category: "Geschichte" },
];

export type TimelineDifficulty = "easy" | "medium" | "hard";

export const LAYOUTS: Record<TimelineDifficulty, { poolSize: number }> = {
  easy: { poolSize: 20 },
  medium: { poolSize: 36 },
  hard: { poolSize: 55 },
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
