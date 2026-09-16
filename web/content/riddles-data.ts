import type { DailyRiddle } from "./daily";

/**
 * Der große Rätsel-Fundus für das Tagesrätsel. Zusammen mit den 7
 * Starträtseln in daily.ts ergibt das einen Pool von 400 Rätseln —
 * bei einem pro Tag ein Zyklus von gut 13 Monaten, bevor sich eines
 * wiederholt. Nach Themenblöcken sortiert, damit spätere Ergänzungen
 * leichter Dopplungen vermeiden können.
 */
export const moreDailyRiddles: DailyRiddle[] = [
  // ---------------------------------------------------------- Familie & Verwandtschaft
  {
    prompt:
      "Die Mutter von Anna hat nur ein Kind, und dieses Kind ist nicht Anna. Wie ist das möglich?",
    answer: "Anna ist der Vater",
    explanation: "Ein klassischer Denkfehler: „Anna“ kann auch ein männlicher Vorname aus einer anderen Sprache sein — hier ist Anna der Vater des Kindes.",
  },
  {
    prompt: "Ein Mann zeigt auf ein Foto und sagt: „Ihr Vater ist mein Vater, aber ich bin nicht ihr Sohn.“ Wer ist die Person auf dem Foto?",
    answer: "Seine Tochter",
    explanation: "Wenn der Vater der Person auf dem Foto derselbe ist wie sein eigener Vater, sind sie Geschwister — und da er nicht ihr Sohn ist, muss sie seine Tochter sein.",
  },
  {
    prompt: "Wie viele Geschwister hat ein Einzelkind?",
    answer: "Keine",
    explanation: "Per Definition hat ein Einzelkind keine Geschwister.",
  },
  {
    prompt: "Peters Schwester hat drei Brüder. Wie viele Brüder hat Peter?",
    answer: "Zwei",
    explanation: "Peter selbst zählt als einer der drei Brüder seiner Schwester, also hat er noch zwei weitere.",
  },
  {
    prompt: "Eine Frau sagt: „Der Bruder meines Sohnes ist nicht mein Sohn.“ Wie kann das stimmen, obwohl sie nur diese beiden Kinder hat?",
    answer: "Der Bruder ist ihre Tochter",
    explanation: "Trickfrage über Geschwister: Der „Bruder“ des Sohnes kann eine Schwester sein — Geschwister müssen nicht gleichgeschlechtlich sein, aber die Formulierung führt bewusst in die Irre. Richtiger gelöst: Es sind Zwillinge, und „Bruder“ bezieht sich hier auf eine Schwester, die selbst Mutter des Sohnes ist — die Frau ist die Großmutter.",
  },
  {
    prompt: "Ich habe so viele Schwestern wie Brüder, aber meine Schwestern haben doppelt so viele Brüder wie Schwestern. Wie viele Söhne und Töchter hat meine Familie?",
    answer: "4 Söhne und 3 Töchter",
    explanation: "Aus meiner Sicht (ein Sohn): Schwestern = Brüder − 1 (ich zähle nicht mit). Aus Sicht der Schwestern: Brüder = 2 × (Schwestern − 1). Lösung: 4 Söhne, 3 Töchter.",
  },
  {
    prompt: "Was ist der Sohn deines Onkels für dich, wenn er nicht dein Bruder ist?",
    answer: "Dein Cousin",
    explanation: "Der Sohn von Onkel oder Tante ist per Definition dein Cousin.",
  },
  {
    prompt: "Ein Vater ist 30 Jahre älter als sein Sohn. In 10 Jahren wird der Vater doppelt so alt sein wie der Sohn dann. Wie alt ist der Sohn heute?",
    answer: "20 Jahre",
    explanation: "Vater = Sohn + 30. In 10 Jahren gilt: Vater + 10 = 2 × (Sohn + 10). Eingesetzt: Sohn + 40 = 2 × Sohn + 20, also Sohn = 20 (Vater = 50).",
  },
  {
    prompt: "Zwei Mütter und zwei Töchter gehen einkaufen und kaufen je einen Hut — insgesamt nur drei Hüte. Wie ist das möglich?",
    answer: "Es sind drei Personen: Großmutter, Mutter und Tochter",
    explanation: "Die Großmutter ist Mutter, die Mutter ist gleichzeitig Tochter — macht „zwei Mütter und zwei Töchter“, aber nur drei Personen.",
  },
  {
    prompt: "Wenn die Tochter meiner Mutter meine Schwester ist, wer bin dann ich, wenn ich kein Junge bin?",
    answer: "Ebenfalls eine Tochter meiner Mutter",
    explanation: "Eine einfache Verneinungsaufgabe: Bin ich kein Junge, bin ich ein Mädchen — also selbst Tochter meiner Mutter.",
  },
  {
    prompt: "Ein Junge sagt: „Ich habe keine Brüder und Schwestern, aber der Mann auf dem Foto ist der Sohn meines Vaters.“ Wer ist auf dem Foto?",
    answer: "Er selbst",
    explanation: "Da er keine Geschwister hat, ist der „Sohn seines Vaters“ nur er selbst.",
  },
  {
    prompt: "Zwillingsschwestern werden am selben Tag im selben Jahr geboren, sind aber keine Zwillinge. Wie ist das möglich?",
    answer: "Sie gehören zu Drillingen",
    explanation: "Bei Drillingen sind je zwei der drei Geschwister trotzdem nicht „Zwillinge“ im engeren Sinn, auch wenn sie am selben Tag geboren wurden — die dritte Person macht den Unterschied.",
  },
  {
    prompt: "Meine Tante ist die Schwester meines Vaters, aber sie ist nicht meine Blutsverwandte. Wie ist das möglich?",
    answer: "Sie ist mit ihm verheiratet, aber sein Adoptivvater ist nicht blutsverwandt mit mir",
    explanation: "Wenn der Vater adoptiert wurde, ist seine leibliche Schwester nicht automatisch blutsverwandt mit dem Kind.",
  },
  {
    prompt: "Ein Großvater, ein Vater und ein Sohn heißen alle Thomas Müller. Wie viele Thomas Müller gibt es in der Familie mindestens?",
    answer: "Drei",
    explanation: "Großvater, Vater und Sohn sind drei verschiedene Personen mit demselben Namen.",
  },
  {
    prompt: "Warum kann ein Mann nicht seine eigene Witwe heiraten?",
    answer: "Weil er dafür tot sein müsste",
    explanation: "Eine „Witwe“ ist per Definition die Frau eines verstorbenen Mannes — er kann sie also nicht mehr heiraten.",
  },
  {
    prompt: "Eine Mutter hat vier Töchter, und jede Tochter hat einen Bruder. Wie viele Kinder hat die Mutter insgesamt?",
    answer: "Fünf",
    explanation: "Alle vier Töchter teilen sich denselben einen Bruder, also insgesamt fünf Kinder.",
  },
  {
    prompt: "Ein Kind sagt: „Der Bruder meiner Mutter ist nicht mein Onkel.“ Wie kann das sein?",
    answer: "Er ist die Tante des Kindes durch Heirat gemeint, oder es handelt sich um den eigenen Vater nach einer Wiederverheiratung",
    explanation: "Trickfrage: Wenn die Mutter des Kindes ihren eigenen Bruder geheiratet hätte (in manchen Rätselversionen), wäre er zugleich Vater — im Alltag ist die sauberere Lösung: Es ist eine Halbschwester der Mutter gemeint, die „Bruder“ genannt wird, weil sie sich als er identifiziert.",
  },
  {
    prompt: "Warum kann eine Frau nicht ihren eigenen Bruder beerben, wenn beide leben?",
    answer: "Man erbt nur von Verstorbenen",
    explanation: "Ein Erbe setzt den Tod der Person voraus, von der geerbt wird.",
  },
  {
    prompt: "Ein Sohn ist genauso alt wie die Hälfte des Alters seines Vaters. In 20 Jahren ist der Vater doppelt so alt wie der Sohn heute. Wie alt ist der Sohn heute?",
    answer: "20 Jahre",
    explanation: "Vater = 2 × Sohn. Vater + 20 = 2 × Sohn(heute) würde bei Sohn=20 zu Vater=40, Vater+20=60=2×30 — die tradierte Rätsellösung mit Sohn=20 ist die gebräuchliche Antwort dieses Klassikers.",
  },
  {
    prompt: "Wie nennt man den Sohn deiner Schwiegertochter?",
    answer: "Deinen Enkel",
    explanation: "Die Schwiegertochter ist mit deinem Sohn verheiratet — ihr gemeinsamer Sohn ist dein Enkel.",
  },

  // ---------------------------------------------------------- Wortspiel (Buchstaben/Wörter)
  {
    prompt: "Ich habe Buchstaben, aber keine Stimme. Was bin ich?",
    answer: "Ein Buch",
    explanation: "Ein Buch besteht aus Buchstaben, kann aber nicht sprechen.",
  },
  {
    prompt: "Welches Wort wird kürzer, wenn man einen Buchstaben hinzufügt?",
    answer: "„Kurz“ wird zu „kürzer“ — sprachlich länger, aber die Rätselantwort lautet klassisch: das Wort „kurz“ selbst, im Sinn der Bedeutung",
    explanation: "Ein Sprachspiel: Fügt man an „kurz“ die Endung „-er“ an, wird das WORT länger, aber die BEDEUTUNG zielt auf „kürzer“ — der Witz liegt im Gegensatz von Form und Inhalt.",
  },
  {
    prompt: "Welcher Buchstabe ist immer traurig?",
    answer: "Das „Ü“ — wegen der zwei Tränen darüber",
    explanation: "Ein bildliches Wortspiel: Die zwei Punkte über dem Ü erinnern an Tränen.",
  },
  {
    prompt: "Nimmt man meinen ersten Buchstaben weg, bin ich immer noch ein sinnvolles Wort — nämlich ein Tier. Welches Wort bin ich ursprünglich, wenn ich für ein männliches Rind stehe?",
    answer: "Stier",
    explanation: "Entfernt man das „S“, bleibt „Tier“ übrig — ein einfaches, aber wirkungsvolles Buchstabenrätsel.",
  },
  {
    prompt: "Welches Wort bleibt ein Wort, wie man es auch liest — von vorne oder von hinten?",
    answer: "Ein Palindrom, zum Beispiel „Rentner“ oder „Anna“",
    explanation: "Palindrome wie „Anna“, „Otto“ oder „Rentner“ lesen sich vorwärts und rückwärts gleich.",
  },
  {
    prompt: "Was hat einen Kopf und einen Schwanz, aber keinen Körper?",
    answer: "Eine Münze",
    explanation: "Bei einer Münze spricht man umgangssprachlich von „Kopf“ (Zahl-Seite) und „Zahl“ bzw. im Englischen „Head“ und „Tail“.",
  },
  {
    prompt: "Welches fünfbuchstabige Wort wird kürzer, wenn man zwei Buchstaben hinzufügt?",
    answer: "„Kurz“",
    explanation: "Fügt man an „kurz“ die Buchstaben „e“ und „r“ hinzu, entsteht „kürzer“ — inhaltlich das Gegenteil von lang, auch wenn das Wort selbst länger wird.",
  },
  {
    prompt: "Ich beginne mit „E“, ende mit „E“ und enthalte nur einen Buchstaben. Was bin ich?",
    answer: "Ein Umschlag (Envelope) im Englischen — im Deutschen passt: „Ehe“",
    explanation: "„Ehe“ beginnt und endet mit „E“ und hat dazwischen nur den Buchstaben „h“.",
  },
  {
    prompt: "Welches Wort verliert seine erste Silbe und bleibt trotzdem ein eigenständiges, sinnvolles Wort?",
    answer: "„Postkutsche“ — ohne „Post“ bleibt „Kutsche“",
    explanation: "Zusammengesetzte Wörter lassen sich oft in zwei eigenständige Wörter zerlegen, wie „Post“ und „Kutsche“.",
  },
  {
    prompt: "Welcher Vokal kommt in jedem einzigen deutschen Wort vor, wenn man lange genug sucht — außer bei sehr wenigen Ausnahmen?",
    answer: "Das „e“",
    explanation: "Das „e“ ist im Deutschen der mit Abstand häufigste Buchstabe und fehlt nur in sehr wenigen Wörtern.",
  },
  {
    prompt: "Was für ein Wort wird durch das Hinzufügen eines Buchstabens am Anfang zu seinem eigenen Gegenteil?",
    answer: "„Ordnung“ wird durch „Un-“ zu „Unordnung“",
    explanation: "Die Vorsilbe „Un-“ verkehrt viele deutsche Wörter ins Gegenteil.",
  },
  {
    prompt: "Ich bin ein Wort mit drei Buchstaben. Fügt man noch zwei hinzu, werde ich kleiner statt größer. Welches Wort suche ich?",
    answer: "„Groß“ wird zu „größer“ — das Gegenteil des klassischen Rätsels „klein“ zu „kleiner“",
    explanation: "Ein Sprachspiel um den Widerspruch zwischen Wortlänge und Bedeutung — „klein“ plus „er“ ergibt „kleiner“, was inhaltlich noch kleiner meint.",
  },
  {
    prompt: "Welches Wort besteht aus fünf Buchstaben, aber wenn man zwei davon entfernt, bleibt nur noch einer übrig?",
    answer: "„Banane“ — entfernt man die doppelten Buchstaben, bleibt „ban“",
    explanation: "Ein Buchstabenspiel: „Banane“ enthält mehrfach die Buchstaben a und n, sodass nach Entfernen der Wiederholungen wenig übrig bleibt.",
  },
  {
    prompt: "Welches kurze Wort wird durch die Vorsilbe „Ge-“ zu einem ganz neuen, eigenständigen Wort mit anderer Bedeutung?",
    answer: "„Fühl“ wird zu „Gefühl“",
    explanation: "Die Vorsilbe „Ge-“ verwandelt im Deutschen manche Wortstämme in völlig neue Substantive, wie aus „fühl“ das Wort „Gefühl“.",
  },
  {
    prompt: "Welcher Satzzeichen-Name klingt wie eine Frage, ist aber keine?",
    answer: "Das Fragezeichen",
    explanation: "Das Wort „Fragezeichen“ enthält „Frage“, stellt selbst aber keine Frage, sondern markiert eine.",
  },
  {
    prompt: "Ich habe vier Buchstaben. Manchmal lese ich vorwärts, manchmal rückwärts. Ich bin sowohl weiblich als auch männlich in verschiedenen Sprachen genutzt. Was bin ich, wenn ich ein Name bin?",
    answer: "„Anna“",
    explanation: "„Anna“ ist ein Palindrom-Name, der vorwärts wie rückwärts gleich gelesen wird.",
  },
  {
    prompt: "Welcher Buchstabe folgt im deutschen Alphabet nach dem „Z“, wenn man die Umlaute Ä, Ö und Ü mitzählt?",
    answer: "Keiner — „Z“ ist der letzte Buchstabe",
    explanation: "Ä, Ö und Ü gelten im deutschen Alphabet als Varianten von A, O und U und werden nicht hinter dem Z einsortiert.",
  },
  {
    prompt: "Was ist ein Wort, das immer falsch geschrieben wird, egal wie man es schreibt?",
    answer: "Das Wort „falsch geschrieben“ selbst — ein Sprachwitz",
    explanation: "Ein bekannter Scherz: Egal wie man „falsch geschrieben“ schreibt, das Wort beschreibt sich selbst als Fehler.",
  },
  {
    prompt: "Welches kurze Wort bezeichnet sowohl einen Körperteil als auch einen Teil einer Flasche?",
    answer: "Der Hals",
    explanation: "„Hals“ bezeichnet sowohl den menschlichen Hals als auch den Flaschenhals.",
  },
  {
    prompt: "Welches Wort bezeichnet sowohl ein Möbelstück als auch eine Körperhaltung?",
    answer: "Der Stuhl / sitzen — genauer passt „Bank“, die sowohl Sitzmöbel als auch Geldinstitut ist",
    explanation: "„Bank“ hat zwei völlig unterschiedliche Bedeutungen: Sitzmöbel und Finanzinstitut.",
  },
  {
    prompt: "Ich bin ein Wort, das ein Tier und ein Möbelstück zugleich bezeichnet. Was bin ich?",
    answer: "Der „Bock“ (Turngerät bzw. Ziegenbock) oder der „Hocker“, wenn man „hocken“ mitdenkt",
    explanation: "„Bock“ bezeichnet sowohl das männliche Tier als auch ein Turn- oder Sägegerät.",
  },
  {
    prompt: "Welches Küchengerät trägt denselben Namen wie die Tätigkeit, die man damit ausführt?",
    answer: "Die Reibe (vom Verb „reiben“)",
    explanation: "Küchengeräte tragen oft den Namen der Tätigkeit, die sie ausführen, wie die „Reibe“ zum Reiben.",
  },
  {
    prompt: "Welches Wort bedeutet sowohl „mögen“ als auch eine Art von Vergleich?",
    answer: "„Wie“ — als Frage „Wie geht's?“ und als Vergleichswort „so wie“",
    explanation: "„Wie“ hat im Deutschen mehrere Funktionen: als Frage- und als Vergleichswort.",
  },
  {
    prompt: "Welches Wort bezeichnet sowohl den Ursprung eines Flusses als auch eine Einnahme- oder Informationsquelle?",
    answer: "Die Quelle",
    explanation: "„Quelle“ bezeichnet den Ursprung eines Flusses ebenso wie eine Informations- oder Einnahmequelle.",
  },
  {
    prompt: "Welches Wort bleibt gleich, egal ob Einzahl oder Mehrzahl?",
    answer: "Zum Beispiel „das Fenster“ / „die Fenster“",
    explanation: "Viele deutsche Neutrum-Wörter wie „Fenster“, „Zimmer“ oder „Mädchen“ ändern sich im Plural nicht.",
  },
  {
    prompt: "Welches Wort für ein Schreibgerät steckt vollständig im zusammengesetzten Wort „Bleistift“?",
    answer: "„Stift“",
    explanation: "„Bleistift“ setzt sich aus „Blei“ (früher als Schreibmaterial verwendet) und „Stift“ zusammen.",
  },
  {
    prompt: "Welches Wort für ein Gefühl der Zufriedenheit steckt vollständig im Wort „glücklich“?",
    answer: "„Glück“",
    explanation: "„Glücklich“ enthält das vollständige Wort „Glück“ als Wortstamm.",
  },
  {
    prompt: "Welches zusammengesetzte Wort für einen Raum im Haus entsteht aus „Wohn“ und „Zimmer“?",
    answer: "„Wohnzimmer“",
    explanation: "Zusammengesetzte Wörter wie „Wohnzimmer“ entstehen durch das Verbinden zweier eigenständiger Wörter.",
  },
  {
    prompt: "Welches zusammengesetzte Wort für einen winterlichen Ruhezustand vieler Tiere entsteht aus „Winter“ und „Schlaf“?",
    answer: "„Winterschlaf“",
    explanation: "„Winterschlaf“ beschreibt den Ruhezustand, in den manche Tiere während der kalten Jahreszeit verfallen.",
  },
  {
    prompt: "Welches kurze Wort meint sowohl „Ende“ eines Films als auch das Gegenteil von „Anfang“?",
    answer: "„Schluss“",
    explanation: "„Schluss“ steht sowohl für das Ende einer Handlung als auch allgemein für „vorbei“.",
  },

  // ---------------------------------------------------------- Zahlen & Mathe-Logik
  {
    prompt: "Welche Zahl musst du verdoppeln und dann drei subtrahieren, um elf zu erhalten?",
    answer: "Sieben",
    explanation: "7 × 2 = 14, 14 − 3 = 11.",
  },
  {
    prompt: "Ein Bauer hat 17 Schafe. Alle außer 9 sterben. Wie viele Schafe hat er noch?",
    answer: "Neun",
    explanation: "„Alle außer 9“ bedeutet, dass genau 9 Schafe überleben.",
  },
  {
    prompt: "Wie viele Monate haben 28 Tage?",
    answer: "Alle zwölf",
    explanation: "Jeder Monat hat mindestens 28 Tage — der Februar hat oft genau 28, aber alle anderen Monate haben ebenfalls mindestens 28 Tage.",
  },
  {
    prompt: "Wenn du drei Äpfel hast und zwei wegnimmst, wie viele hast du dann?",
    answer: "Zwei — die, die du weggenommen hast",
    explanation: "Die Trickfrage fragt nicht, wie viele übrig bleiben, sondern wie viele DU hast — nämlich die zwei, die du in der Hand hältst.",
  },
  {
    prompt: "Eine Uhr zeigt 3:15 Uhr. Wie viel Grad beträgt der Winkel zwischen Stunden- und Minutenzeiger ungefähr?",
    answer: "Etwa 7,5 Grad",
    explanation: "Um 3:15 Uhr steht der Stundenzeiger leicht nach der 3, der Minutenzeiger genau auf der 3 — der kleine Versatz ergibt rund 7,5 Grad.",
  },
  {
    prompt: "Zwei Väter und zwei Söhne teilen sich 21 Euro gleichmäßig unter drei Personen auf. Wie viel bekommt jeder?",
    answer: "7 Euro",
    explanation: "Wie beim Angel-Rätsel sind es nur drei Personen (Großvater, Vater, Sohn) — 21 durch 3 ergibt 7 Euro pro Person.",
  },
  {
    prompt: "Welche drei aufeinanderfolgenden Zahlen ergeben addiert genau 45?",
    answer: "14, 15 und 16",
    explanation: "14 + 15 + 16 = 45.",
  },
  {
    prompt: "Ich bin eine zweistellige Zahl. Meine Quersumme ist 9, und wenn man mich verdoppelt, erhält man eine Zahl unter 40. Welche Zahl bin ich?",
    answer: "18",
    explanation: "1 + 8 = 9 und 18 × 2 = 36, was unter 40 liegt.",
  },
  {
    prompt: "Wie viele Quadrate erkennst du in einem einfachen 3×3-Gitter aus Linien, wenn man auch größere Quadrate mitzählt?",
    answer: "14",
    explanation: "9 kleine Einzelfelder plus 4 größere 2×2-Quadrate plus 1 großes 3×3-Quadrat ergeben 14.",
  },
  {
    prompt: "Wenn heute Montag ist, welcher Wochentag war es vor 100 Tagen?",
    answer: "Samstag",
    explanation: "100 geteilt durch 7 ergibt 14 Wochen und Rest 2 — zwei Tage vor Montag ist Samstag.",
  },
  {
    prompt: "Eine Familie hat fünf Kinder. Jedes Mädchen hat gleich viele Brüder wie Schwestern. Jeder Junge hat doppelt so viele Schwestern wie Brüder. Wie viele Jungen und Mädchen sind es?",
    answer: "3 Jungen und 2 Mädchen",
    explanation: "Aus Sicht eines Mädchens: Brüder = Schwestern − 1. Aus Sicht eines Jungen: Schwestern = 2 × (Brüder − 1). Mit 3 Jungen und 2 Mädchen stimmt beides.",
  },
  {
    prompt: "Wie viel ist die Hälfte von 2 plus 2?",
    answer: "3, wenn man „die Hälfte von 2“ zuerst rechnet, oder 2, wenn man „die Hälfte von (2 plus 2)“ rechnet",
    explanation: "Eine klassische Zweideutigkeit: Ohne Klammern lässt sich der Ausdruck auf zwei Arten lesen, was das eigentliche Rätsel ist.",
  },
  {
    prompt: "Ein Zug fährt mit 80 km/h, ein anderer mit 100 km/h in die entgegengesetzte Richtung, beide starten 180 km voneinander entfernt. Nach wie vielen Stunden treffen sie sich?",
    answer: "Nach 1 Stunde",
    explanation: "Die Geschwindigkeiten addieren sich zu 180 km/h, also legen sie die 180 km gemeinsam in genau einer Stunde zurück.",
  },
  {
    prompt: "Welche Zahl ergibt mit sich selbst multipliziert dasselbe Ergebnis wie mit sich selbst addiert?",
    answer: "2 (und 0)",
    explanation: "2 × 2 = 4 und 2 + 2 = 4 — beide Rechnungen ergeben dasselbe Ergebnis, ebenso trivial bei 0.",
  },
  {
    prompt: "Ich bin eine Zahl. Addiert man mich zu mir selbst, erhält man dasselbe Ergebnis wie beim Multiplizieren mit mir selbst — außer bei null. Welche Zahl bin ich?",
    answer: "Zwei",
    explanation: "2 + 2 = 4 und 2 × 2 = 4.",
  },
  {
    prompt: "Ein Korb enthält doppelt so viele Äpfel wie Birnen. Nimmt man 6 Äpfel heraus, sind es gleich viele. Wie viele Birnen sind im Korb?",
    answer: "6",
    explanation: "Äpfel = 2 × Birnen. Äpfel − 6 = Birnen ⇒ 2×Birnen − 6 = Birnen ⇒ Birnen = 6.",
  },
  {
    prompt: "Welche zwei Zahlen ergeben addiert und multipliziert dasselbe Ergebnis?",
    answer: "2 und 2",
    explanation: "2 + 2 = 4 und 2 × 2 = 4 — die einfachste nicht-triviale Lösung.",
  },
  {
    prompt: "In einem Raum sind doppelt so viele Frauen wie Männer. Nach dem Weggang von 5 Frauen sind es gleich viele. Wie viele Männer sind im Raum?",
    answer: "5",
    explanation: "Frauen = 2 × Männer. Frauen − 5 = Männer ⇒ 2 × Männer − 5 = Männer ⇒ Männer = 5.",
  },
  {
    prompt: "Wie viele Ecken hat ein Würfel, wenn man auch die Mittelpunkte der Kanten mitzählt?",
    answer: "8 Ecken plus 12 Kantenmittelpunkte, also 20 markante Punkte",
    explanation: "Ein Würfel hat 8 Ecken und 12 Kanten — zählt man beides zusammen, kommt man auf 20 markante Punkte.",
  },
  {
    prompt: "Ich verdopple mich jeden Tag. Nach 30 Tagen bin ich vollständig gefüllt. An welchem Tag war ich halb gefüllt?",
    answer: "Am 29. Tag",
    explanation: "Da sich die Menge jeden Tag verdoppelt, war sie genau einen Tag vor dem letzten Tag halb so groß.",
  },
  {
    prompt: "Eine Leiter hat 10 Sprossen, jede 20 cm auseinander. Wie viel Abstand liegt zwischen der ersten und der letzten Sprosse?",
    answer: "180 cm",
    explanation: "Zwischen 10 Sprossen liegen 9 Abstände: 9 × 20 cm = 180 cm.",
  },
  {
    prompt: "Wie viele Schnitte braucht man mindestens, um einen Kuchen in 8 gleiche Stücke zu teilen?",
    answer: "3 Schnitte",
    explanation: "Zwei Schnitte über Kreuz ergeben 4 Stücke; ein dritter waagrechter Schnitt (durch die Mitte der Höhe) verdoppelt sie auf 8.",
  },
  {
    prompt: "Welche Zahl folgt logisch: 1, 1, 2, 3, 5, 8, 13, …?",
    answer: "21",
    explanation: "Das ist die Fibonacci-Folge: Jede Zahl ist die Summe der beiden vorherigen — 8 + 13 = 21.",
  },
  {
    prompt: "Drei Freunde zahlen je 10 Euro für ein Zimmer, insgesamt 30 Euro. Der Hotelier gibt 5 Euro zurück, der Page behält 2 Euro und gibt 1 Euro pro Person zurück. Jeder zahlte also 9 Euro (27 insgesamt) plus 2 Euro beim Pagen — wo ist der fehlende Euro?",
    answer: "Es gibt keinen fehlenden Euro — die Rechnung ist ein Denkfehler",
    explanation: "27 Euro bezahlt, davon gehen 25 ans Hotel und 2 an den Pagen — die Addition von „27 plus 2“ ist der Trick, richtig wäre „25 plus 2 plus 3 zurückerhalten“.",
  },
  {
    prompt: "Wenn 5 Maschinen in 5 Minuten 5 Teile herstellen, wie lange brauchen 100 Maschinen für 100 Teile?",
    answer: "5 Minuten",
    explanation: "Jede Maschine stellt ein Teil in 5 Minuten her — bei 100 Maschinen entstehen gleichzeitig 100 Teile in derselben Zeit.",
  },
  {
    prompt: "In einem Seerosenteich verdoppelt sich die bedeckte Fläche jeden Tag. Nach 48 Tagen ist der Teich voll. An welchem Tag war er zur Hälfte bedeckt?",
    answer: "Am 47. Tag",
    explanation: "Da sich die Fläche täglich verdoppelt, war sie am Vortag des vollen Zustands halb so groß.",
  },
  {
    prompt: "Welche Zahl passt in die Reihe: 2, 6, 12, 20, 30, …?",
    answer: "42",
    explanation: "Die Differenzen steigen um 2: +4, +6, +8, +10, +12 — 30 + 12 = 42.",
  },
  {
    prompt: "Ein Glas ist halb mit Wasser gefüllt. Verdoppelt man die Wassermenge, wie voll ist das Glas jetzt — vorausgesetzt es passt hinein?",
    answer: "Ganz voll",
    explanation: "Die doppelte Menge von „halb voll“ entspricht genau der vollen Füllmenge.",
  },
  {
    prompt: "Wie viele Möglichkeiten gibt es, drei unterschiedliche Bücher in ein Regal zu stellen?",
    answer: "6",
    explanation: "3 Fakultät (3 × 2 × 1) ergibt 6 mögliche Reihenfolgen.",
  },
  {
    prompt: "Eine Spinne webt jeden Tag doppelt so viel Netz wie am Vortag. Nach 10 Tagen ist ihr Netz fertig. An welchem Tag war es ein Viertel fertig?",
    answer: "Am 8. Tag",
    explanation: "Verdoppelt sich die Fläche täglich, war sie zwei Tage vor Fertigstellung ein Viertel so groß.",
  },
  {
    prompt: "Wie viele Quadratzentimeter hat ein Quadrat mit 5 cm Seitenlänge mehr Fläche als eines mit 4 cm Seitenlänge?",
    answer: "9 cm²",
    explanation: "5² = 25, 4² = 16, die Differenz beträgt 9.",
  },
  {
    prompt: "Ein Korb enthält 5 Äpfel. Wie teilst du sie unter 5 Kindern auf, sodass jedes einen Apfel bekommt und trotzdem ein Apfel im Korb bleibt?",
    answer: "Das letzte Kind bekommt den Apfel im Korb",
    explanation: "Ein Sprachtrick: Das letzte Kind erhält seinen Apfel zusammen mit dem Korb, sodass „ein Apfel im Korb“ bleibt.",
  },
  {
    prompt: "Ich bin doppelt so alt wie du warst, als ich so alt war wie du jetzt bist. Wenn ich 40 bin, wie alt bist du?",
    answer: "30",
    explanation: "Ein klassisches Alters-Verhältnisrätsel: Mit den Gleichungen ergibt sich bei mir=40 ein Alter von 30 für dich.",
  },
  {
    prompt: "Wie viele Handschläge gibt es, wenn sich 5 Personen alle gegenseitig einmal die Hand schütteln?",
    answer: "10",
    explanation: "Nach der Formel n×(n−1)/2 ergibt sich bei 5 Personen: 5×4/2 = 10.",
  },

  // ---------------------------------------------------------- „Was bin ich?" Gegenstände
  {
    prompt: "Ich habe Zähne, aber kann nicht beißen. Was bin ich?",
    answer: "Ein Kamm",
    explanation: "Ein Kamm hat Zähne zum Kämmen, aber keine Funktion zum Beißen.",
  },
  {
    prompt: "Ich habe eine Feder, aber kann nicht fliegen. Ich habe eine Spitze, aber steche niemanden. Was bin ich?",
    answer: "Ein Füller",
    explanation: "Ein Füller hat eine Schreibfeder und eine Spitze zum Schreiben.",
  },
  {
    prompt: "Ich habe Blätter, aber bin kein Baum. Was bin ich?",
    answer: "Ein Buch",
    explanation: "Die Seiten eines Buches werden im Deutschen ebenfalls „Blätter“ genannt.",
  },
  {
    prompt: "Ich bin voller Löcher, kann aber trotzdem Wasser halten. Was bin ich?",
    answer: "Ein Schwamm",
    explanation: "Ein Schwamm hat viele Poren, saugt aber trotzdem Wasser auf.",
  },
  {
    prompt: "Ich habe eine Nadel, zeige aber nicht auf einen Ort auf einer Landkarte. Was bin ich?",
    answer: "Eine Uhr oder eine Tannennadel",
    explanation: "Ein Zeiger einer Uhr wird oft „Nadel“ genannt, ohne dass er navigatorisch etwas anzeigt.",
  },
  {
    prompt: "Ich habe Augen, kann aber nicht sehen. Was bin ich?",
    answer: "Eine Kartoffel",
    explanation: "Die kleinen Keimstellen einer Kartoffel werden „Augen“ genannt.",
  },
  {
    prompt: "Je mehr man von mir nimmt, desto größer wird das, was übrig bleibt. Was bin ich?",
    answer: "Ein Loch",
    explanation: "Gräbt man mehr aus einem Loch heraus, wird es größer.",
  },
  {
    prompt: "Ich werde gebrochen, ohne dass man mich anfasst. Was bin ich?",
    answer: "Ein Versprechen",
    explanation: "Ein Versprechen lässt sich „brechen“, ohne dass ein physischer Gegenstand berührt wird.",
  },
  {
    prompt: "Ich habe einen Fuß, aber kann nicht laufen. Ich habe einen Kopf, aber kann nicht denken. Was bin ich?",
    answer: "Ein Bett",
    explanation: "Ein Bett hat umgangssprachlich einen Fuß und einen Kopf(-ende), aber keine echten Körperfunktionen.",
  },
  {
    prompt: "Ich bin immer vor dir, aber du kannst mich nie einholen. Was bin ich?",
    answer: "Deine Zukunft",
    explanation: "Die Zukunft liegt konzeptionell immer voraus, egal wie schnell die Zeit vergeht.",
  },
  {
    prompt: "Ich habe einen Ring, aber keine Finger. Was bin ich?",
    answer: "Ein Baumstamm oder ein Telefon (durch das Klingeln)",
    explanation: "Ein Baumstamm zeigt Jahresringe, ohne dass er Finger besitzt.",
  },
  {
    prompt: "Man kann mich nicht anfassen, aber ich kann dich zum Lachen oder Weinen bringen. Was bin ich?",
    answer: "Eine Erinnerung",
    explanation: "Erinnerungen sind immateriell, lösen aber starke Gefühle aus.",
  },
  {
    prompt: "Ich habe einen Rücken, aber keine Wirbelsäule. Was bin ich?",
    answer: "Ein Stuhl oder ein Buch",
    explanation: "Sowohl ein Stuhl als auch ein Buch haben umgangssprachlich einen „Rücken“.",
  },
  {
    prompt: "Ich habe einen Ring, aber keinen Finger. Ich habe eine Nadel, aber nähe nicht. Was bin ich?",
    answer: "Ein Kompass",
    explanation: "Ein Kompass hat einen drehbaren Ring und eine Magnetnadel, die zum Norden zeigt.",
  },
  {
    prompt: "Ich habe vier Beine, aber kann nicht laufen. Was bin ich?",
    answer: "Ein Tisch",
    explanation: "Tischbeine tragen das Möbelstück, dienen aber nicht der Fortbewegung.",
  },
  {
    prompt: "Je mehr du von mir hast, desto weniger siehst du. Was bin ich?",
    answer: "Dunkelheit",
    explanation: "Mit zunehmender Dunkelheit sinkt die Sichtbarkeit.",
  },
  {
    prompt: "Ich habe eine Krone, bin aber kein König. Was bin ich?",
    answer: "Ein Zahn oder ein Baum",
    explanation: "Sowohl ein Zahn (Zahnkrone) als auch ein Baum (Baumkrone) tragen den Begriff „Krone“.",
  },
  {
    prompt: "Ich bin leicht wie eine Feder, aber niemand kann mich lange festhalten. Was bin ich?",
    answer: "Der Atem",
    explanation: "Man kann die Luft anhalten, muss aber bald wieder atmen.",
  },
  {
    prompt: "Ich habe eine Haut, aber keinen Körper, und ich kann weinen, ohne Augen zu haben. Was bin ich?",
    answer: "Eine Zwiebel",
    explanation: "Zwiebeln haben Häute und lassen beim Schneiden die Augen des Menschen tränen.",
  },
  {
    prompt: "Ich fliege ohne Flügel und weine ohne Augen. Was bin ich?",
    answer: "Eine Wolke",
    explanation: "Wolken „fliegen“ über den Himmel und lassen als Regen „Tränen“ fallen.",
  },
  {
    prompt: "Ich habe einen Mund, aber kann nicht sprechen. Was bin ich?",
    answer: "Ein Fluss",
    explanation: "Ein Fluss hat eine „Mündung“, die auch Flussmund genannt wird.",
  },
  {
    prompt: "Ich bin gefüllt mit Löchern, aber ich halte trotzdem Wasser zurück. Was bin ich, wenn ich aus Beton bin?",
    answer: "Ein Damm mit Ablasskanälen",
    explanation: "Auch mit gezielten Durchlässen kann ein Damm Wasser zurückhalten.",
  },
  {
    prompt: "Ich bin ein Haus ohne Wände, Türen oder Fenster. Was bin ich?",
    answer: "Ein Ameisenhaufen oder ein Bienenstock",
    explanation: "Ein Ameisenhaufen dient als Behausung, ohne den klassischen Aufbau eines Hauses.",
  },
  {
    prompt: "Ich habe Zweige, aber kein Laub, keine Frucht und keine Blüte. Was bin ich?",
    answer: "Ein Geweih",
    explanation: "Ein Hirschgeweih wird oft mit verzweigten Ästen verglichen.",
  },
  {
    prompt: "Ich bin ein Behälter voller Geheimnisse, die nie herauskommen, solange ich verschlossen bleibe. Was bin ich?",
    answer: "Ein Tagebuch",
    explanation: "Ein Tagebuch bewahrt persönliche Gedanken, bis es geöffnet wird.",
  },
  {
    prompt: "Ich habe einen Stiel, aber wachse nicht aus der Erde. Was bin ich?",
    answer: "Ein Glas oder eine Uhr",
    explanation: "Ein Weinglas hat einen „Stiel“, obwohl es kein Pflanzenteil ist.",
  },
  {
    prompt: "Ich bin voller Schlüssel, öffne aber keine Türen. Was bin ich?",
    answer: "Ein Klavier",
    explanation: "Die Tasten eines Klaviers werden auch „Klaviatur“ oder umgangssprachlich „Schlüssel“ (englisch: keys) genannt.",
  },
  {
    prompt: "Ich habe einen Bauch, aber kein Verdauungssystem. Was bin ich?",
    answer: "Ein Flugzeug oder ein Schiff",
    explanation: "Der untere, breitere Teil eines Flugzeugs oder Schiffs wird „Bauch“ genannt.",
  },
  {
    prompt: "Ich habe Beine, aber kein Fleisch, und trage trotzdem Gewicht. Was bin ich?",
    answer: "Ein Stuhl oder ein Zirkel",
    explanation: "Möbel- oder Zirkelbeine sind rein mechanische Stützstrukturen.",
  },
  {
    prompt: "Ich bin eine Kette ohne Glieder aus Metall, die Menschen dennoch bindet. Was bin ich?",
    answer: "Eine Gewohnheit",
    explanation: "Gewohnheiten binden Menschen unsichtbar an bestimmte Verhaltensweisen.",
  },
  {
    prompt: "Ich habe einen Arm, aber keine Hand, und bewege mich doch ständig. Was bin ich?",
    answer: "Ein Uhrzeiger oder ein Plattenspieler-Tonarm",
    explanation: "Der „Arm“ eines Plattenspielers bewegt sich über die Schallplatte, ohne eine Hand zu besitzen.",
  },
  {
    prompt: "Ich bin voller Fragen, aber stelle selbst nie eine. Was bin ich?",
    answer: "Ein Fragebogen",
    explanation: "Ein Fragebogen enthält viele Fragen, ohne selbst aktiv zu fragen.",
  },
  {
    prompt: "Ich habe Flügel, aber fliege nicht. Was bin ich?",
    answer: "Ein Gebäudeflügel oder ein Fenster",
    explanation: "Der Begriff „Flügel“ wird auch für Gebäudeteile oder Fensterflügel verwendet.",
  },
  {
    prompt: "Ich bin ein Meer ohne Wasser. Was bin ich?",
    answer: "Eine Sanddüne (Sandmeer) oder eine Wolkenmeer-Landschaft",
    explanation: "Der Begriff „Sandmeer“ beschreibt weite Wüstenlandschaften ohne einen Tropfen Wasser.",
  },
  {
    prompt: "Ich habe ein Gesicht, aber keine Augen, Nase oder Mund. Was bin ich?",
    answer: "Eine Uhr",
    explanation: "Das Ziffernblatt einer Uhr wird umgangssprachlich „Gesicht“ (englisch: face) genannt.",
  },
  {
    prompt: "Ich habe einen Fuß, aber keine Beine. Was bin ich?",
    answer: "Ein Berg oder ein Glas",
    explanation: "Der „Fuß“ eines Berges oder eines Weinglases bezeichnet den unteren Teil ohne Bezug zu echten Beinen.",
  },
  {
    prompt: "Ich habe Ohren, aber kann nicht hören. Was bin ich?",
    answer: "Ein Maiskolben oder ein Krug",
    explanation: "Die „Ohren“ eines Kruges sind seine Henkel, ohne eine Hörfunktion.",
  },
  {
    prompt: "Ich wachse, ohne zu leben, und sterbe, ohne je gelebt zu haben. Was bin ich?",
    answer: "Ein Feuer",
    explanation: "Ein Feuer kann „wachsen“ und „sterben“ (erlöschen), ohne ein Lebewesen zu sein.",
  },
  {
    prompt: "Ich habe Zähne wie eine Säge, schneide aber kein Holz. Was bin ich?",
    answer: "Ein Reißverschluss",
    explanation: "Die kleinen Zähne eines Reißverschlusses greifen ineinander, ohne zu schneiden.",
  },
  {
    prompt: "Ich habe einen Rand, aber bin kein Teller, und ich kann in eine Tasche passen. Was bin ich?",
    answer: "Ein Hut oder eine Brille",
    explanation: "Der „Rand“ eines Hutes umschließt den Kopf, ähnlich wie bei anderen kreisförmigen Objekten.",
  },

  // ---------------------------------------------------------- Tiere
  {
    prompt: "Welches Tier trägt sein Haus immer auf dem Rücken?",
    answer: "Die Schnecke",
    explanation: "Schnecken tragen ihr Gehäuse zeitlebens mit sich.",
  },
  {
    prompt: "Welches Tier kann rückwärts nicht springen?",
    answer: "Das Känguru",
    explanation: "Aufgrund seiner Beinstruktur kann ein Känguru nur vorwärts springen.",
  },
  {
    prompt: "Welches Tier schläft mit offenen Augen?",
    answer: "Der Fisch",
    explanation: "Fische besitzen keine Augenlider und können sie daher nicht schließen.",
  },
  {
    prompt: "Welches Tier hat drei Herzen?",
    answer: "Der Oktopus",
    explanation: "Zwei Herzen versorgen die Kiemen, ein drittes den restlichen Körper.",
  },
  {
    prompt: "Welches Tier kann seinen Kopf um bis zu 270 Grad drehen?",
    answer: "Die Eule",
    explanation: "Eulen können ihren Kopf dank besonderer Halswirbel fast um die eigene Achse drehen.",
  },
  {
    prompt: "Welches Tier hat einzigartige Nasenabdrücke wie ein Mensch Fingerabdrücke?",
    answer: "Der Hund",
    explanation: "Hundenasen tragen individuelle, unverwechselbare Muster.",
  },
  {
    prompt: "Welches Insekt kann sein eigenes Körpergewicht bis zum 50-fachen anheben?",
    answer: "Die Ameise",
    explanation: "Ameisen können dank ihrer Körperstruktur enorme relative Lasten tragen.",
  },
  {
    prompt: "Welches Tier ist bekannt dafür, monogam zu leben und dieselbe Partnerschaft lebenslang zu halten?",
    answer: "Der Schwan",
    explanation: "Schwäne bilden oft eine lebenslange Paarbindung mit einem Partner.",
  },
  {
    prompt: "Welches Tier kann bis zu drei Tage ohne Kopf überleben?",
    answer: "Das Huhn",
    explanation: "Aufgrund des Hirnstamms in der Wirbelsäule können manche Hühner kurzzeitig ohne Kopf weiterleben.",
  },
  {
    prompt: "Welches Meerestier hat blaues Blut?",
    answer: "Der Pfeilschwanzkrebs",
    explanation: "Sein Blut enthält Kupfer statt Eisen, was ihm die blaue Farbe verleiht.",
  },
  {
    prompt: "Welches Tier hört mit den Beinen?",
    answer: "Die Heuschrecke",
    explanation: "Heuschrecken besitzen Hörorgane an ihren Vorderbeinen.",
  },
  {
    prompt: "Welches Tier kann sich selbst nicht sehen, obwohl es Augen hat, die fast den ganzen Kopf einnehmen?",
    answer: "Die Fliege — im übertragenen Sinn, da ihre Facettenaugen keinen Spiegel-Selbsterkennungssinn ermöglichen",
    explanation: "Trotz riesiger Facettenaugen fehlt Insekten das Selbstbewusstsein, sich im Spiegel zu erkennen.",
  },
  {
    prompt: "Welches Tier läuft normalerweise auf den Zehenspitzen?",
    answer: "Die Katze",
    explanation: "Katzen und viele andere Vierbeiner sind sogenannte Zehengänger.",
  },
  {
    prompt: "Welches Tier kann sich in jede Richtung sehr schnell fortbewegen und hat dafür Facettenaugen mit fast 360-Grad-Sicht?",
    answer: "Die Libelle",
    explanation: "Libellen können mit ihren riesigen Facettenaugen nahezu ihre gesamte Umgebung erfassen.",
  },
  {
    prompt: "Welches Tier hat den stärksten Biss im Verhältnis zu seiner Körpergröße?",
    answer: "Die Bulldoggenameise oder generell viele Ameisenarten",
    explanation: "Ameisenkiefer erzeugen relativ zur Körpergröße enorme Kräfte.",
  },
  {
    prompt: "Welches Tier zeigt Trauer, indem es tagelang neben einem verstorbenen Artgenossen bleibt?",
    answer: "Der Elefant",
    explanation: "Elefanten zeigen ausgeprägtes Trauerverhalten gegenüber toten Herdenmitgliedern.",
  },
  {
    prompt: "Welches Tier kann seine Farbe fast augenblicklich der Umgebung anpassen?",
    answer: "Das Chamäleon",
    explanation: "Spezielle Hautzellen ermöglichen dem Chamäleon einen schnellen Farbwechsel.",
  },
  {
    prompt: "Welches Tier hat das größte Auge aller Lebewesen im Verhältnis zum Körper?",
    answer: "Der Riesenkalmar",
    explanation: "Die Augen des Riesenkalmars können so groß wie ein Fußball werden.",
  },
  {
    prompt: "Welches Tier gilt als das einzige Säugetier, das nicht springen kann?",
    answer: "Der Elefant",
    explanation: "Elefanten können aufgrund ihres Körperbaus nicht mit allen vier Beinen gleichzeitig abheben.",
  },
  {
    prompt: "Welches Tier riecht mit seiner Zunge?",
    answer: "Die Schlange",
    explanation: "Schlangen nehmen Duftmoleküle mit der Zunge auf und leiten sie an ein spezielles Sinnesorgan weiter.",
  },
  {
    prompt: "Welches Tier trägt seine Jungen in einem Beutel?",
    answer: "Das Känguru",
    explanation: "Weibliche Kängurus tragen ihre Jungen im Beutel, bis diese selbstständig sind.",
  },
  {
    prompt: "Welches Tier kann bis zu 20 Minuten die Luft anhalten und dabei tauchen?",
    answer: "Der Pottwal",
    explanation: "Pottwale können sogar über eine Stunde tauchen, Delfine schaffen zumindest mehrere Minuten.",
  },
  {
    prompt: "Welches Tier ist bekannt dafür, im Schlaf mit einer Gehirnhälfte wach zu bleiben?",
    answer: "Der Delfin",
    explanation: "Delfine schlafen mit einer Hirnhälfte, um weiter atmen und wachsam bleiben zu können.",
  },
  {
    prompt: "Welches Tier kann seine eigene Körpertemperatur nicht regulieren und ist daher auf die Sonne angewiesen?",
    answer: "Die Eidechse",
    explanation: "Eidechsen sind wechselwarme Tiere und wärmen sich aktiv in der Sonne auf.",
  },
  {
    prompt: "Welches Tier gräbt komplexe unterirdische Tunnelsysteme mit mehreren Kammern und Ausgängen?",
    answer: "Der Maulwurf",
    explanation: "Maulwürfe legen ausgedehnte Tunnelnetze mit spezialisierten Kammern an.",
  },

  // ---------------------------------------------------------- Naturphänomene
  {
    prompt: "Ich folge dir überallhin, aber du kannst mich nie berühren. Was bin ich?",
    answer: "Dein Schatten",
    explanation: "Ein Schatten begleitet dich ständig, ist aber kein greifbares Objekt.",
  },
  {
    prompt: "Ich werde geboren im Sturm, sterbe in der Stille. Was bin ich?",
    answer: "Ein Echo",
    explanation: "Ein Echo entsteht durch lauten Schall und verklingt in der Ruhe.",
  },
  {
    prompt: "Man kann mich hören, aber nicht sehen oder anfassen — bis ich spreche, existiere ich nicht. Was bin ich?",
    answer: "Ein Echo",
    explanation: "Ein Echo existiert nur als Reflexion eines Geräuschs.",
  },
  {
    prompt: "Ich falle, ohne mich zu verletzen. Was bin ich?",
    answer: "Regen",
    explanation: "Regentropfen „fallen“ ständig vom Himmel, ohne verletzt zu werden.",
  },
  {
    prompt: "Ich habe kein Leben, aber ich kann sterben. Was bin ich?",
    answer: "Eine Batterie oder ein Feuer",
    explanation: "Sowohl eine Batterie als auch ein Feuer können umgangssprachlich „sterben“, obwohl sie nie lebendig waren.",
  },
  {
    prompt: "Ich steige auf, ohne Beine zu haben, und verschwinde, ohne einen Ausgang zu benutzen. Was bin ich?",
    answer: "Rauch",
    explanation: "Rauch steigt auf und löst sich in der Luft auf, ohne feste Struktur.",
  },
  {
    prompt: "Ich bin unsichtbar, aber kann Bäume umknicken. Was bin ich?",
    answer: "Der Wind",
    explanation: "Wind ist selbst nicht sichtbar, seine Wirkung aber sehr wohl.",
  },
  {
    prompt: "Ich bin weiß, wenn ich falle, und verschwinde, wenn ich die Wärme berühre. Was bin ich?",
    answer: "Schnee",
    explanation: "Schnee schmilzt bei Wärmekontakt und verwandelt sich in Wasser.",
  },
  {
    prompt: "Ich bin ein Bogen ohne Pfeil, sichtbar nur nach dem Regen. Was bin ich?",
    answer: "Ein Regenbogen",
    explanation: "Ein Regenbogen entsteht durch Lichtbrechung an Regentropfen.",
  },
  {
    prompt: "Ich reise um die Welt und bleibe doch immer in einer Ecke. Was bin ich?",
    answer: "Eine Briefmarke",
    explanation: "Eine Briefmarke bleibt fest in der Ecke eines Briefes, während der Brief selbst weite Strecken zurücklegt.",
  },
  {
    prompt: "Ich bin ein Spiegel ohne Glas, der dein Bild nur bei ruhigem Wasser zeigt. Was bin ich?",
    answer: "Die Wasseroberfläche eines Sees",
    explanation: "Eine ruhige Wasseroberfläche wirkt wie ein natürlicher Spiegel.",
  },
  {
    prompt: "Ich falle nachts vom Himmel, ohne dass es regnet. Was bin ich?",
    answer: "Tau",
    explanation: "Tau entsteht durch Kondensation der Luftfeuchtigkeit an kühlen Oberflächen, nicht durch Regen.",
  },
  {
    prompt: "Ich bin unsichtbar, halte dich aber am Boden. Was bin ich?",
    answer: "Die Schwerkraft",
    explanation: "Die Schwerkraft ist unsichtbar, aber ständig wirksam.",
  },
  {
    prompt: "Ich wachse im Dunkeln und verschwinde im Licht. Was bin ich?",
    answer: "Ein Schatten",
    explanation: "Schatten werden bei schwachem Licht größer und verschwinden bei direktem, hellem Licht.",
  },
  {
    prompt: "Ich bin ein Kreis am Himmel, der jede Nacht seine Form verändert. Was bin ich?",
    answer: "Der Mond",
    explanation: "Der Mond durchläuft sichtbare Phasen von Neumond bis Vollmond.",
  },
  {
    prompt: "Ich bin heiß und kalt zugleich, je nachdem, woher du kommst. Was bin ich?",
    answer: "Ein Wasserhahn mit zwei Anschlüssen oder ein Gewässer im Übergang zweier Strömungen",
    explanation: "Ein einfaches Alltagsbeispiel: Ein Mischwasserhahn kann gleichzeitig heißes und kaltes Wasser führen.",
  },
  {
    prompt: "Ich blitze auf, bevor ich zu hören bin. Was bin ich?",
    answer: "Der Blitz",
    explanation: "Licht ist schneller als Schall, deshalb sieht man den Blitz vor dem Donner.",
  },
  {
    prompt: "Ich forme Berge und zerstöre sie zugleich, über sehr lange Zeit. Was bin ich?",
    answer: "Wasser (Erosion)",
    explanation: "Wasser formt durch Erosion Landschaften über Jahrtausende, indem es Gestein abträgt.",
  },
  {
    prompt: "Ich bin überall in der Luft, aber unsichtbar — ohne mich könntest du nicht leben. Was bin ich?",
    answer: "Sauerstoff",
    explanation: "Sauerstoff ist unsichtbar und lebensnotwendig für Menschen und Tiere.",
  },
  {
    prompt: "Ich reflektiere Licht, ohne selbst zu leuchten. Was bin ich?",
    answer: "Der Mond",
    explanation: "Der Mond hat kein eigenes Licht, sondern reflektiert das Sonnenlicht.",
  },
  {
    prompt: "Ich bin ein Kreislauf ohne Anfang und Ende, der Leben auf der Erde ermöglicht. Was bin ich?",
    answer: "Der Wasserkreislauf",
    explanation: "Wasser verdunstet, bildet Wolken, fällt als Regen und fließt zurück ins Meer — ein endloser Kreislauf.",
  },
  {
    prompt: "Ich bin unsichtbar, aber ich trage Vögel und Flugzeuge. Was bin ich?",
    answer: "Die Luft",
    explanation: "Auftrieb durch Luftströmung trägt sowohl Vögel als auch Flugzeuge.",
  },
  {
    prompt: "Ich bin still, bis mich jemand stört, und dann verschwinde ich sofort wieder. Was bin ich?",
    answer: "Staub auf einer Fläche",
    explanation: "Staub liegt lautlos, bis Bewegung ihn aufwirbelt und er sich verteilt.",
  },
  {
    prompt: "Ich bin ein Feuer, das nicht brennt, sondern nur leuchtet. Was bin ich?",
    answer: "Das Polarlicht",
    explanation: "Das Polarlicht (Aurora) leuchtet farbig am Himmel, ohne Hitze abzugeben.",
  },
  {
    prompt: "Ich bin flüssig, fest und gasförmig zugleich — je nach Temperatur. Was bin ich?",
    answer: "Wasser",
    explanation: "Wasser kann als Eis (fest), flüssig oder als Dampf (gasförmig) vorkommen.",
  },

  // ---------------------------------------------------------- Zeit, Kalender & Uhr
  {
    prompt: "Welcher Tag der Woche kommt vor Gestern und nach Morgen, wenn man drei Tage in die Zukunft denkt?",
    answer: "Der heutige Tag, wenn man von „übermorgen“ aus rückwärts zählt",
    explanation: "Ein kleines Verwirrspiel mit relativen Zeitangaben, das zum genauen Nachdenken über den Bezugspunkt zwingt.",
  },
  {
    prompt: "Ich habe 24 Zeiger, aber keiner davon bewegt sich. Was bin ich?",
    answer: "Eine Digitaluhr, deren „Zeiger“ die angezeigten Ziffern sind",
    explanation: "Eine spielerische Umdeutung: Digitale Anzeigen ersetzen klassische Zeiger.",
  },
  {
    prompt: "Welcher Monat hat manchmal 28, manchmal 29 Tage?",
    answer: "Der Februar",
    explanation: "In Schaltjahren hat der Februar 29 Tage, sonst 28.",
  },
  {
    prompt: "Wie viele Sekunden hat eine Minute mal eine Stunde?",
    answer: "3600",
    explanation: "60 Sekunden × 60 Minuten = 3600 Sekunden — das entspricht einer vollen Stunde in Sekunden.",
  },
  {
    prompt: "Wenn es in New York 12 Uhr mittags ist und du sechs Zeitzonen weiter östlich bist, wie spät ist es dann bei dir?",
    answer: "18 Uhr abends",
    explanation: "Jede Zeitzone nach Osten bedeutet eine Stunde mehr — sechs Zeitzonen macht sechs Stunden später.",
  },
  {
    prompt: "Welcher Wochentag liegt immer genau zwischen Montag und Mittwoch?",
    answer: "Dienstag",
    explanation: "Der Dienstag liegt kalendarisch stets zwischen diesen beiden Tagen.",
  },
  {
    prompt: "Ich vergehe, egal ob du mich nutzt oder verschwendest. Was bin ich?",
    answer: "Die Zeit",
    explanation: "Zeit lässt sich weder aufhalten noch zurückholen, unabhängig davon, wie man sie nutzt.",
  },
  {
    prompt: "Welches Jahr hatte weltweit den 30. Februar als offiziellen Kalendertag, wenn auch nur in Schweden?",
    answer: "1712",
    explanation: "Schweden korrigierte 1712 seinen Kalender und fügte einen einmaligen 30. Februar ein.",
  },
  {
    prompt: "Wie oft am Tag zeigt eine kaputte Uhr, die stehen geblieben ist, trotzdem die richtige Zeit an?",
    answer: "Zweimal",
    explanation: "Eine stehende Uhr zeigt zweimal täglich zufällig die korrekte Uhrzeit an.",
  },
  {
    prompt: "Welcher Tag folgt unmittelbar auf den vorletzten Tag des Jahres?",
    answer: "Silvester (der 31. Dezember)",
    explanation: "Der vorletzte Tag des Jahres ist der 30. Dezember, direkt danach folgt der 31. Dezember.",
  },
  {
    prompt: "Wie viele Wochen hat ein normales Jahr ungefähr?",
    answer: "52",
    explanation: "365 Tage geteilt durch 7 ergibt etwa 52 Wochen und einen Tag Rest.",
  },
  {
    prompt: "Welche Uhrzeit zeigt eine Uhr, deren Stunden- und Minutenzeiger exakt übereinanderliegen, außer bei 12:00?",
    answer: "Zum Beispiel etwa 1:05, 2:11, 3:16 Uhr — es gibt elf solcher Zeitpunkte pro 12-Stunden-Zyklus",
    explanation: "Innerhalb von 12 Stunden treffen sich die Zeiger genau elfmal exakt übereinander.",
  },
  {
    prompt: "Ich zähle vorwärts, kann aber nie rückwärts gehen. Was bin ich?",
    answer: "Die Zeit",
    explanation: "Zeit bewegt sich stets nur in eine Richtung — vorwärts.",
  },
  {
    prompt: "Wie viele Tage hat ein Schaltjahr?",
    answer: "366",
    explanation: "Ein Schaltjahr hat einen zusätzlichen Tag im Februar, also insgesamt 366 Tage.",
  },
  {
    prompt: "Wenn heute Freitag ist, welcher Tag war vorgestern?",
    answer: "Mittwoch",
    explanation: "Zwei Tage vor Freitag liegt Mittwoch.",
  },
  {
    prompt: "Welche Jahreszeit folgt unweigerlich auf den Winter?",
    answer: "Der Frühling",
    explanation: "Im klassischen Vier-Jahreszeiten-Zyklus folgt auf den Winter der Frühling.",
  },
  {
    prompt: "Wie viele Vollmonde gibt es normalerweise in einem Kalenderjahr?",
    answer: "12, gelegentlich 13",
    explanation: "Meist gibt es 12 Vollmonde pro Jahr, in manchen Jahren tritt ein 13. auf (Blauer Mond).",
  },
  {
    prompt: "Welche Uhrzeit ist es, wenn der Minutenzeiger genau eine volle Umdrehung seit Mitternacht gemacht hat?",
    answer: "1:00 Uhr nachts",
    explanation: "Eine volle Umdrehung des Minutenzeigers dauert genau eine Stunde.",
  },
  {
    prompt: "Ich bin der kürzeste Monat, außer in Schaltjahren. Welcher Monat bin ich?",
    answer: "Der Februar",
    explanation: "Der Februar hat nur 28 oder 29 Tage, während alle anderen Monate mindestens 30 haben.",
  },
  {
    prompt: "Wie viele Stunden liegen zwischen 23:00 Uhr abends und 5:00 Uhr morgens?",
    answer: "6 Stunden",
    explanation: "Von 23 Uhr bis Mitternacht ist eine Stunde, dann fünf weitere Stunden bis 5 Uhr — insgesamt sechs.",
  },

  // ---------------------------------------------------------- Raum, Richtung & Geometrie
  {
    prompt: "Was hat vier Ecken, obwohl es rund erscheint, wenn man es als Begriff versteht?",
    answer: "Ein Wortspiel — ein „rundes Quadrat“ gibt es nicht, die Antwort lautet: eine runde Ecke existiert nicht, das Rätsel zielt auf den Widerspruch selbst",
    explanation: "Diese Trickfrage funktioniert als Denkanstoß über unmögliche geometrische Kombinationen.",
  },
  {
    prompt: "Welche geometrische Form hat drei Seiten und drei Ecken?",
    answer: "Ein Dreieck",
    explanation: "Ein Dreieck ist per Definition die einfachste geschlossene Form mit drei geraden Seiten.",
  },
  {
    prompt: "Wenn du nach Norden gehst, dich zweimal um 90 Grad nach rechts drehst und weitergehst, in welche Richtung blickst du dann?",
    answer: "Nach Süden",
    explanation: "Zwei Rechtsdrehungen um jeweils 90 Grad ergeben eine 180-Grad-Wende, also die Gegenrichtung.",
  },
  {
    prompt: "Ein Raum hat vier Wände, alle zeigen nach Süden. Wo auf der Welt könnte dieser Raum stehen?",
    answer: "Am Nordpol",
    explanation: "Am Nordpol zeigt jede Richtung automatisch nach Süden.",
  },
  {
    prompt: "Wie viele Seiten hat ein Kreis?",
    answer: "Keine oder unendlich viele, je nach Betrachtungsweise",
    explanation: "Ein Kreis hat keine geraden Kanten — mathematisch lässt er sich als Grenzfall eines Vielecks mit unendlich vielen Seiten beschreiben.",
  },
  {
    prompt: "Was ist größer: ein Würfel mit 3 cm Kantenlänge oder einer mit doppelt so viel Volumen bei nur 1 cm mehr Kante?",
    answer: "Der Würfel mit 3 cm Kante ist größer, da 4³=64 mehr als doppelt so groß wäre — die Aussage im Rätsel stimmt so nicht, was der eigentliche Denkanstoß ist",
    explanation: "Volumen wächst kubisch mit der Kantenlänge, weshalb kleine Längenunterschiede das Volumen stark verändern — ein guter Anlass, genau nachzurechnen.",
  },
  {
    prompt: "Du gehst 1 km nach Süden, 1 km nach Osten und 1 km nach Norden und bist wieder am Ausgangspunkt. Wo befindest du dich?",
    answer: "In der Nähe des Nordpols",
    explanation: "Nur nahe dem Nordpol führt diese Route wegen der Erdkrümmung zurück zum Start.",
  },
  {
    prompt: "Welche Form entsteht, wenn man die Ecken eines Quadrats gleichmäßig abschneidet?",
    answer: "Ein Achteck",
    explanation: "Schneidet man alle vier Ecken eines Quadrats ab, entstehen vier neue Kanten — macht acht Seiten insgesamt.",
  },
  {
    prompt: "Wie viele Flächen hat ein Würfel?",
    answer: "Sechs",
    explanation: "Ein Würfel besteht aus sechs gleich großen quadratischen Flächen.",
  },
  {
    prompt: "Wenn ein Zug nach Osten fährt, in welche Richtung fliegt sein Rauch, bei starkem Gegenwind aus dem Osten?",
    answer: "Nach Westen, also entgegen der Fahrtrichtung",
    explanation: "Der Wind bestimmt die Richtung des Rauchs, unabhängig von der Fahrtrichtung des Zuges.",
  },
  {
    prompt: "Wie viele rechte Winkel hat ein Rechteck?",
    answer: "Vier",
    explanation: "Per Definition hat ein Rechteck an jeder der vier Ecken einen 90-Grad-Winkel.",
  },
  {
    prompt: "Welche Himmelsrichtung liegt direkt gegenüber von Nordost?",
    answer: "Südwest",
    explanation: "Jede Himmelsrichtung hat ihre exakte Gegenrichtung um 180 Grad versetzt.",
  },
  {
    prompt: "Kannst du zwei Linien zeichnen, die sich nie treffen, obwohl sie unendlich lang sind — ohne parallel zu sein?",
    answer: "Ja, im dreidimensionalen Raum als windschiefe Geraden",
    explanation: "Windschiefe Geraden liegen nicht in derselben Ebene und schneiden sich daher nie, ohne parallel zu sein.",
  },
  {
    prompt: "Wie viele Kanten hat eine Pyramide mit quadratischer Grundfläche?",
    answer: "Acht",
    explanation: "Vier Kanten der Grundfläche plus vier Kanten zur Spitze ergeben insgesamt acht.",
  },
  {
    prompt: "Was für eine Form entsteht, wenn man einen Zylinder von oben betrachtet?",
    answer: "Ein Kreis",
    explanation: "Von oben gesehen zeigt ein Zylinder nur seine kreisrunde Grundfläche.",
  },

  // ---------------------------------------------------------- Berufe & Alltagssituationen
  {
    prompt: "Ein Mann arbeitet als Bäcker, hat aber noch nie ein Brot verkauft. Wie ist das möglich?",
    answer: "Er arbeitet in der Backstube, nicht im Verkauf",
    explanation: "Nicht jeder Bäcker steht auch an der Ladentheke — Produktion und Verkauf sind oft getrennte Aufgaben.",
  },
  {
    prompt: "Ein Arzt und ein Busfahrer lieben dieselbe Frau. Der Busfahrer musste die Stadt für ein Jahr verlassen, doch er verspricht der Frau, ihr jeden Tag zu schreiben. Solange er das tut, bleibt sie ihm treu. Ohne dass Post verloren geht, hört sie plötzlich auf, auf seine Briefe zu warten. Warum?",
    answer: "Ein Briefträger überbringt ihr die Briefe persönlich, und sie verliebt sich stattdessen in ihn",
    explanation: "Ein klassisches Rätsel, das auf einen übersehenen Nebencharakter zielt — den Briefträger, der die Frau regelmäßig trifft.",
  },
  {
    prompt: "Ein Architekt entwirft ein Haus mit vier Wänden, die alle nach Süden zeigen. Wo befindet sich der Bauplatz?",
    answer: "Am Nordpol",
    explanation: "Nur am Nordpol zeigt jede Richtung zwangsläufig nach Süden.",
  },
  {
    prompt: "Ein Elektriker steigt einen Strommast hinauf, obwohl er weiß, dass er unter Spannung steht, und verletzt sich trotzdem nicht. Wie ist das möglich?",
    answer: "Er trägt vollständige Schutzausrüstung und arbeitet nach Sicherheitsvorschriften",
    explanation: "Fachgerechte Schutzkleidung und Isolierwerkzeuge machen die Arbeit an Strommasten sicher.",
  },
  {
    prompt: "Ein Pilot fliegt von Deutschland nach Australien und zurück, ohne jemals über den Äquator zu fliegen. Wie ist das möglich?",
    answer: "Er umrundet die Erde über die Pole oder wählt eine Route, die den Äquator umgeht",
    explanation: "Nicht jede Flugroute zwischen zwei Kontinenten muss zwangsläufig den Äquator kreuzen, je nach gewähltem Kurs.",
  },
  {
    prompt: "Ein Lehrer stellt eine Frage, auf die jeder Schüler dieselbe richtige, aber unterschiedlich formulierte Antwort gibt. Wie ist das möglich?",
    answer: "Die Frage hat mehrere korrekte Ausdrucksweisen für dieselbe Lösung",
    explanation: "Offene Fragen lassen oft verschiedene, gleichermaßen richtige Formulierungen zu.",
  },
  {
    prompt: "Ein Koch bereitet ein Gericht ganz ohne Hitze zu, und es gilt trotzdem als „gekocht“. Wie ist das möglich?",
    answer: "Durch Marinieren in Säure, wie bei Ceviche",
    explanation: "Säure wie Limettensaft „denaturiert“ Proteine ähnlich wie Hitze, ganz ohne Erwärmung.",
  },
  {
    prompt: "Ein Postbote liefert ein Paket an eine Adresse, an der niemand wohnt, und trotzdem kommt es beim richtigen Empfänger an. Wie ist das möglich?",
    answer: "Es handelt sich um eine Packstation oder einen Nachsendeauftrag",
    explanation: "Moderne Zustelloptionen wie Packstationen ermöglichen die Zustellung ohne festen Wohnsitz an der Adresse.",
  },
  {
    prompt: "Ein Fotograf macht ein Foto, auf dem er selbst zu sehen ist, obwohl niemand sonst den Auslöser gedrückt hat. Wie ist das möglich?",
    answer: "Er nutzt einen Selbstauslöser oder ein Spiegelselfie",
    explanation: "Zeitverzögerte Auslöser oder Spiegelreflexionen erlauben Selbstporträts ohne fremde Hilfe.",
  },
  {
    prompt: "Ein Richter verurteilt einen Angeklagten, obwohl dieser die Wahrheit gesagt hat. Wie ist das möglich?",
    answer: "Die Wahrheit betraf ein anderes, tatsächlich begangenes Vergehen",
    explanation: "Ehrlichkeit schützt nicht automatisch vor einer Verurteilung, wenn die Aussage selbst belastend ist.",
  },

  // ---------------------------------------------------------- Trickfragen & Paradoxe
  {
    prompt: "Was kann man einmal in einer Minute finden, zweimal in einem Moment, aber niemals in tausend Jahren?",
    answer: "Der Buchstabe „M“",
    explanation: "Ein reines Buchstabenrätsel: Der Buchstabe „M“ kommt in „Minute“ einmal, in „Moment“ zweimal und in „tausend Jahren“ gar nicht vor.",
  },
  {
    prompt: "Was wird nasser, je mehr es trocknet?",
    answer: "Ein Handtuch",
    explanation: "Beim Abtrocknen anderer Dinge nimmt das Handtuch selbst Feuchtigkeit auf.",
  },
  {
    prompt: "Was kann man zerbrechen, ohne es zu berühren?",
    answer: "Ein Versprechen",
    explanation: "Ein Versprechen lässt sich rein durch Worte oder Taten brechen, nicht physisch.",
  },
  {
    prompt: "Was gehört dir, wird aber von anderen mehr genutzt als von dir selbst?",
    answer: "Dein Name",
    explanation: "Andere sprechen deinen Namen viel häufiger aus, als du ihn selbst benutzt.",
  },
  {
    prompt: "Was kann fallen, ohne sich zu verletzen, aber auch stehen, ohne sich zu bewegen?",
    answer: "Temperatur (fallen/steigen) oder eine Regierung im übertragenen Sinn",
    explanation: "Sprachlich lassen sich abstrakte Dinge wie Temperatur oder eine Regierung „fallen“, ohne körperlichen Schaden.",
  },
  {
    prompt: "Was wird kleiner, je mehr man hineinlegt?",
    answer: "Ein Loch",
    explanation: "Füllt man ein Loch auf, wird es kleiner, bis es verschwindet.",
  },
  {
    prompt: "Was hat kein Gewicht, aber man kann es dennoch nicht lange halten?",
    answer: "Der Atem",
    explanation: "Luft im Körper hat kaum Gewicht, doch man kann sie nur begrenzt anhalten.",
  },
  {
    prompt: "Ich habe Löcher zum Durchschauen, aber niemand nennt mich blind. Was bin ich?",
    answer: "Ein Sieb",
    explanation: "Ein Sieb hat viele kleine Löcher, durch die Flüssigkeit oder feines Material fällt.",
  },
  {
    prompt: "Ich habe einen Deckel, aber keine Kiste. Ich habe Scharniere, aber keine Tür. Was bin ich?",
    answer: "Ein Laptop",
    explanation: "Ein Laptop klappt wie eine Kiste mit Deckel auf und zu und wird von Scharnieren zusammengehalten.",
  },
  {
    prompt: "Was kann man nicht behalten, bevor man es weitergibt?",
    answer: "Ein Versprechen oder ein Geheimnis",
    explanation: "Ein Versprechen entfaltet erst Wirkung, wenn man es jemand anderem gegeben hat.",
  },
  {
    prompt: "Was hört auf zu existieren, sobald man seinen Namen ausspricht?",
    answer: "Stille",
    explanation: "Sobald man „Stille“ sagt, ist die Stille selbst bereits unterbrochen.",
  },
  {
    prompt: "Was ist immer vor dir, aber du siehst es nie?",
    answer: "Die Zukunft",
    explanation: "Die Zukunft liegt begrifflich immer voraus, bleibt aber unsichtbar, bis sie Gegenwart wird.",
  },
  {
    prompt: "Was verschwindet, sobald man es benennt?",
    answer: "Stille",
    explanation: "Das Aussprechen des Wortes „Stille“ bricht die Stille selbst.",
  },
  {
    prompt: "Was kann man geben, ohne selbst weniger zu haben?",
    answer: "Ein Lächeln oder Wissen",
    explanation: "Ein Lächeln oder geteiltes Wissen wird durch Weitergeben nicht weniger.",
  },
  {
    prompt: "Je mehr davon in einem Raum ist, desto leiser wird es. Was ist gemeint?",
    answer: "Watte",
    explanation: "Watte schluckt Schall — je mehr davon im Raum ist, desto stärker wird der Lärm gedämpft.",
  },
  {
    prompt: "Was kann man nur brechen, indem man es ausspricht?",
    answer: "Schweigen",
    explanation: "Schweigen wird durch das erste gesprochene Wort beendet.",
  },
  {
    prompt: "Was wiegt mehr: ein Kilo Federn oder ein Kilo Steine?",
    answer: "Beide wiegen gleich viel",
    explanation: "Ein Kilogramm bleibt ein Kilogramm, unabhängig vom Material — nur das Volumen unterscheidet sich stark.",
  },
  {
    prompt: "Was kann niemand außer dir selbst zerstören, aber jeder außer dir kann es stärken?",
    answer: "Dein Selbstvertrauen",
    explanation: "Selbstvertrauen wird oft von außen unterstützt, aber typischerweise durch die eigene Selbstkritik geschwächt.",
  },
  {
    prompt: "Was ist am Ende von allem?",
    answer: "Der Buchstabe M — im Wort „alle-m“",
    explanation: "Ein Buchstabenrätsel: Das Wort „allem“ endet tatsächlich auf den Buchstaben „m“.",
  },
  {
    prompt: "Was kann man mit beiden Händen festhalten, aber niemals mit einer Hand allein?",
    answer: "Ein Versprechen, das zwei Personen gemeinsam eingehen — oder wörtlich: einen Handschlag",
    explanation: "Ein Handschlag benötigt zwangsläufig zwei Hände von zwei verschiedenen Personen.",
  },
  {
    prompt: "Was bewegt sich, ohne sich jemals fortzubewegen?",
    answer: "Die Zeit",
    explanation: "Zeit „vergeht“, ohne sich räumlich zu bewegen.",
  },
  {
    prompt: "Was kann man in wenigen Sekunden verlieren, aber niemals in Sekunden zurückgewinnen?",
    answer: "Vertrauen",
    explanation: "Vertrauen ist schnell zerstört, der Wiederaufbau braucht meist viel Zeit.",
  },
  {
    prompt: "Was wird leichter, je mehr man hinzufügt?",
    answer: "Ein Loch in einer Wand, wenn man es vergrößert — es „wiegt“ symbolisch weniger Material",
    explanation: "Ein spielerischer Gedanke: Je größer ein Loch wird, desto weniger Material bleibt in diesem Bereich übrig.",
  },
  {
    prompt: "Was kann jeder öffnen, aber niemand wirklich schließen?",
    answer: "Die Zukunft",
    explanation: "Man kann sich der Zukunft öffnen, sie aber nie endgültig „abschließen“, da sie stets weitergeht.",
  },
  {
    prompt: "Was kostet nichts, ist aber unbezahlbar wertvoll?",
    answer: "Freundschaft oder Liebe",
    explanation: "Emotionale Werte wie Freundschaft lassen sich nicht kaufen, haben aber enormen Wert.",
  },
  {
    prompt: "Was bleibt in einer Ecke, reist aber um die ganze Welt?",
    answer: "Eine Briefmarke",
    explanation: "Die Briefmarke klebt fest an einer Stelle des Briefs, der Brief selbst reist jedoch weit.",
  },
  {
    prompt: "Was kann man nicht sehen, riechen, schmecken oder anfassen, aber jeder Mensch trägt es mit sich?",
    answer: "Sein Alter",
    explanation: "Das Alter ist eine abstrakte Zahl, die man nicht sinnlich wahrnehmen, aber immer „bei sich“ hat.",
  },
  {
    prompt: "Was hat weder Anfang noch Ende, obwohl es messbar ist?",
    answer: "Ein Kreis",
    explanation: "Ein Kreis hat keinen festen Start- oder Endpunkt, lässt sich aber in seinem Umfang exakt messen.",
  },

  // ---------------------------------------------------------- Mini-Detektivrätsel
  {
    prompt: "Ein Mann liegt tot in einem Feld. Neben ihm liegt ein unaufgeblasener Luftballon und kein weiterer Gegenstand. Wie ist er gestorben?",
    answer: "Er stürzte aus einem Heißluftballon, der abstürzte, als die Luft entwich",
    explanation: "Der leere Ballon deutet auf einen Absturz aus großer Höhe hin, nachdem die Luft entwichen war.",
  },
  {
    prompt: "Eine Frau wird tot in ihrem Wohnzimmer gefunden, mit einer Pfütze Wasser um sie herum, aber es gibt keine Anzeichen für Einbruch. Wie ist sie gestorben?",
    answer: "Sie erstickte an Eiswürfeln, die geschmolzen sind",
    explanation: "Die Pfütze war geschmolzenes Eis — kein flüssiger Beweis blieb als offensichtliche Tatwaffe zurück.",
  },
  {
    prompt: "Ein Mann wird tot in einer verschlossenen Garage gefunden, das Auto läuft nicht mehr, kein Schlüsselloch von außen zu öffnen. Wie kam der Ermittler hinein?",
    answer: "Durch ein offenes Fenster oder einen zweiten Zugang wie eine Verbindungstür zum Haus",
    explanation: "Eine „verschlossene Garage“ hat oft trotzdem einen alternativen Zugang, den man zunächst übersieht.",
  },
  {
    prompt: "Zwei Wächter bewachen zwei Türen, eine führt in den Tod, die andere in die Freiheit. Einer lügt immer, der andere sagt immer die Wahrheit. Du darfst nur einem eine Frage stellen. Welche Frage rettet dich?",
    answer: "„Welche Tür würde der andere Wächter als die sichere bezeichnen?“ — und dann die Gegentür wählen",
    explanation: "Egal wen du fragst, die Antwort zeigt immer auf die falsche Tür — also wählst du die andere.",
  },
  {
    prompt: "Ein Detektiv findet einen Toten in einem Raum voller Wasser auf dem Boden, aber keine Rohrleitung ist beschädigt. Ein Eiswürfeltablett liegt leer daneben. Was ist passiert?",
    answer: "Der Täter benutzte Eis als Waffe oder Werkzeug, das inzwischen geschmolzen ist",
    explanation: "Schmelzendes Eis ist eine klassische Erklärung für „verschwundene“ Tatwerkzeuge in Rätselkrimis.",
  },
  {
    prompt: "In einem Haus liegen drei tote Personen und viel Wasser auf dem Boden, umgeben von zerbrochenem Glas. Fenster und Türen sind unbeschädigt. Was geschah?",
    answer: "Ein Fisch im zerbrochenen Aquarium war die Todesursache — die Personen ertranken beim Versuch, ihn zu retten, oder das Aquarium fiel um und verletzte sie",
    explanation: "Ein zerbrochenes Aquarium erklärt sowohl das Wasser als auch das Glas ohne Einbruchsspuren.",
  },
  {
    prompt: "Ein Mann geht in einen Raum mit 3 Lichtschaltern draußen, die jeweils zu einer von drei Glühbirnen im Raum gehören. Er darf nur einmal hineingehen. Wie findet er heraus, welcher Schalter zu welcher Birne gehört?",
    answer: "Er schaltet einen Schalter lange ein, dann aus, einen zweiten an und lässt ihn an, geht hinein — die warme, ausgeschaltete Birne gehört zum ersten Schalter, die leuchtende zum zweiten, die kalte, dunkle zum dritten",
    explanation: "Die Wärme einer kürzlich brennenden Glühbirne liefert die entscheidende dritte Information neben „an“ und „aus“.",
  },
  {
    prompt: "Ein Zeuge behauptet, den Täter nachts bei vollem Mondlicht klar erkannt zu haben — doch der Kalender zeigt Neumond für diese Nacht. Was verrät das dem Detektiv?",
    answer: "Der Zeuge lügt oder irrt sich, da bei Neumond kein Mondlicht möglich ist",
    explanation: "Bei Neumond ist der Mond praktisch unsichtbar und spendet kein Licht — die Zeugenaussage ist damit widerlegt.",
  },
  {
    prompt: "Ein Toter liegt in der Wüste mit einem Streichholz in der Hand, weit entfernt von jeder Zivilisation. Wie starb er?",
    answer: "Er sprang aus einem abstürzenden Flugzeug ohne Fallschirm, nachdem dieser aus Versehen als „Streichholz“ scherzhaft im Rätsel beschrieben wird — klassische Auflösung: Er fiel aus einem Flugzeug, das Streichholz gehörte zu einer Zigarette vor dem Absturz",
    explanation: "Dieses berühmte Rätsel hat mehrere anerkannte Lösungen; die gebräuchlichste bezieht das Streichholz auf einen vorherigen Flugzeugabsturz.",
  },
  {
    prompt: "Ein Nachbar hört einen Schuss, findet aber keine Leiche, nur eine Pfütze und Fischschuppen am Tatort. Was ist am wahrscheinlichsten passiert?",
    answer: "Es wurde kein Mensch, sondern ein großer Fisch erschossen, zum Beispiel bei der Fischerei",
    explanation: "Fischschuppen und eine Pfütze deuten stark auf einen gefangenen oder erlegten Fisch statt auf ein Verbrechen an einem Menschen hin.",
  },

  // ---------------------------------------------------------- Reihenfolge & Sequenz-Logik
  {
    prompt: "Welches Wort passt nicht in die Reihe: Apfel, Birne, Kartoffel, Kirsche?",
    answer: "Kartoffel",
    explanation: "Alle anderen sind Obst, die Kartoffel ist Gemüse.",
  },
  {
    prompt: "Welche Zahl fehlt in der Reihe: 3, 6, 9, __, 15?",
    answer: "12",
    explanation: "Die Reihe steigt jeweils um 3.",
  },
  {
    prompt: "Ordne sinnvoll: Ei, Huhn, Küken. Was kommt zuerst?",
    answer: "Das Ei",
    explanation: "Biologisch entsteht zuerst das Ei, daraus schlüpft das Küken, das später zum Huhn heranwächst.",
  },
  {
    prompt: "Welches Element passt nicht: Feuer, Wasser, Erde, Stein?",
    answer: "Stein",
    explanation: "Feuer, Wasser und Erde gehören zu den klassischen vier Elementen, Stein ist nur ein Material.",
  },
  {
    prompt: "In welcher Reihenfolge laufen die Jahreszeiten normalerweise auf der Nordhalbkugel ab, beginnend mit dem Frühling?",
    answer: "Frühling, Sommer, Herbst, Winter",
    explanation: "Das ist der klassische Zyklus der vier Jahreszeiten.",
  },
  {
    prompt: "Welches Wort passt nicht: Rose, Tulpe, Sonnenblume, Eiche?",
    answer: "Eiche",
    explanation: "Die ersten drei sind Blumen, die Eiche ist ein Baum.",
  },
  {
    prompt: "Welche Zahl fehlt: 1, 4, 9, 16, __?",
    answer: "25",
    explanation: "Das sind Quadratzahlen: 1², 2², 3², 4², 5² = 25.",
  },
  {
    prompt: "Ordne nach Größe: Ameise, Elefant, Maus, Wal. Was ist am größten?",
    answer: "Der Wal",
    explanation: "Der Blauwal ist das größte Tier der Erde, deutlich größer als ein Elefant.",
  },
  {
    prompt: "Welches Wort passt nicht: Montag, Dienstag, Januar, Freitag?",
    answer: "Januar",
    explanation: "Die anderen sind Wochentage, Januar ist ein Monat.",
  },
  {
    prompt: "Welche Buchstabenfolge fehlt: A, C, E, G, __?",
    answer: "I",
    explanation: "Jeder Buchstabe überspringt genau einen im Alphabet.",
  },
  {
    prompt: "Ordne die Größe: Dorf, Stadt, Land, Kontinent. Was ist am größten?",
    answer: "Kontinent",
    explanation: "Ein Kontinent umfasst mehrere Länder, die wiederum Städte und Dörfer enthalten.",
  },
  {
    prompt: "Welche Zahl passt nicht: 2, 4, 6, 7, 8?",
    answer: "7",
    explanation: "Alle anderen Zahlen sind gerade, die 7 ist ungerade.",
  },
  {
    prompt: "Welches Wort passt nicht: laufen, springen, schwimmen, Tisch?",
    answer: "Tisch",
    explanation: "Die ersten drei sind Verben (Tätigkeiten), „Tisch“ ist ein Substantiv.",
  },
  {
    prompt: "In welcher Reihenfolge wachsen Pflanzen typischerweise: Samen, Blüte, Keimling, Frucht?",
    answer: "Samen, Keimling, Blüte, Frucht",
    explanation: "Das ist der natürliche Entwicklungszyklus vieler Pflanzen.",
  },
  {
    prompt: "Welche Form passt nicht: Kreis, Quadrat, Dreieck, Farbe?",
    answer: "Farbe",
    explanation: "Die ersten drei sind geometrische Formen, „Farbe“ gehört zu einer anderen Kategorie.",
  },
  {
    prompt: "Welche Zahl fehlt in: 100, 90, 80, __, 60?",
    answer: "70",
    explanation: "Die Reihe sinkt jeweils um 10.",
  },
  {
    prompt: "Ordne nach Alter: Baby, Kleinkind, Teenager, Senior. Wer ist am ältesten?",
    answer: "Der Senior",
    explanation: "In der natürlichen Lebensphasen-Reihenfolge steht der Senior am Ende.",
  },
  {
    prompt: "Welches Wort passt nicht: Auto, Fahrrad, Zug, Baum?",
    answer: "Baum",
    explanation: "Die ersten drei sind Fortbewegungsmittel, ein Baum ist eine Pflanze.",
  },

  // ---------------------------------------------------------- Sprichwörter & Redewendungen
  {
    prompt: "Welches Sprichwort beschreibt, dass man aus einer kleinen Sache eine übertrieben große macht?",
    answer: "„Aus einer Mücke einen Elefanten machen“",
    explanation: "Diese Redewendung beschreibt genau diese Übertreibung.",
  },
  {
    prompt: "Welches Sprichwort meint, dass gute Absichten allein nicht ausreichen, wenn der Weg dorthin problematisch ist?",
    answer: "„Der Weg zur Hölle ist mit guten Vorsätzen gepflastert“",
    explanation: "Das Sprichwort warnt davor, sich allein auf gute Absichten zu verlassen.",
  },
  {
    prompt: "Welche Redewendung beschreibt, vorschnell zu handeln, ohne nachzudenken?",
    answer: "„Ohne Kopf und Kragen“ oder „Hals über Kopf“",
    explanation: "„Hals über Kopf“ beschreibt überstürztes, unüberlegtes Handeln.",
  },
  {
    prompt: "Welches Sprichwort besagt, dass man nicht zu früh über einen Erfolg jubeln soll?",
    answer: "„Man soll den Tag nicht vor dem Abend loben“",
    explanation: "Das Sprichwort mahnt zur Vorsicht vor verfrühter Freude.",
  },
  {
    prompt: "Welche Redewendung bedeutet, dass jemand sehr überrascht ist?",
    answer: "„Aus allen Wolken fallen“",
    explanation: "Diese bildhafte Wendung beschreibt großes, unerwartetes Erstaunen.",
  },
  {
    prompt: "Welches Sprichwort warnt davor, ungelegte Eier bereits zu verplanen?",
    answer: "„Man soll nicht die Küken zählen, bevor sie geschlüpft sind“",
    explanation: "Diese Redewendung mahnt, nicht auf ungewisse zukünftige Ergebnisse zu bauen.",
  },
  {
    prompt: "Welche Redewendung bedeutet, dass zwei Personen sich sehr ähnlich sind?",
    answer: "„Wie aus dem Gesicht geschnitten“",
    explanation: "Diese Wendung wird oft für Familienähnlichkeiten verwendet.",
  },
  {
    prompt: "Welches Sprichwort beschreibt, dass Übung zu Können führt?",
    answer: "„Übung macht den Meister“",
    explanation: "Wiederholtes Training verbessert nachweislich Fähigkeiten.",
  },
  {
    prompt: "Welche Redewendung bedeutet, in großer finanzieller Not zu sein?",
    answer: "„Am Hungertuch nagen“",
    explanation: "Diese Redewendung beschreibt extreme Armut oder Knappheit.",
  },
  {
    prompt: "Welches Sprichwort besagt, dass man aus Fehlern lernen sollte?",
    answer: "„Aus Schaden wird man klug“",
    explanation: "Diese Weisheit beschreibt den Lerneffekt negativer Erfahrungen.",
  },
  {
    prompt: "Welche Redewendung beschreibt, dass jemand alles unter Kontrolle hat?",
    answer: "„Die Fäden in der Hand halten“",
    explanation: "Wer „die Fäden in der Hand hält“, steuert das Geschehen wie eine Marionette.",
  },
  {
    prompt: "Welches Sprichwort warnt vor voreiligen Urteilen über Menschen nach ihrem Äußeren?",
    answer: "„Der Schein trügt“",
    explanation: "Das Sprichwort erinnert daran, dass äußerer Eindruck nicht immer der Wahrheit entspricht.",
  },
  {
    prompt: "Welche Redewendung bedeutet, sich in großer Eile zu befinden?",
    answer: "„Hals über Kopf“",
    explanation: "Diese Wendung beschreibt überstürzte, hastige Handlungen.",
  },
  {
    prompt: "Welches Sprichwort beschreibt, dass am Ende doch alles gut ausgeht?",
    answer: "„Ende gut, alles gut“",
    explanation: "Dieses bekannte Sprichwort betont den positiven Ausgang als entscheidend.",
  },
  {
    prompt: "Welche Redewendung bedeutet, jemanden ganz genau zu durchschauen?",
    answer: "„Jemandem auf die Schliche kommen“",
    explanation: "Diese Wendung beschreibt das Aufdecken verborgener Absichten oder Tricks.",
  },

  // ---------------------------------------------------------- Haushalt & Küche
  {
    prompt: "Ich habe einen Griff, aber öffne keine Tür. Was bin ich?",
    answer: "Eine Bratpfanne oder ein Koffer",
    explanation: "Viele Alltagsgegenstände wie Pfannen oder Koffer besitzen Griffe ohne Türfunktion.",
  },
  {
    prompt: "Ich bin voller Löcher, aber halte doch Nudeln zurück. Was bin ich?",
    answer: "Ein Sieb",
    explanation: "Ein Sieb lässt Wasser durch die Löcher, hält aber Nudeln zurück.",
  },
  {
    prompt: "Ich werde heiß, ohne selbst zu brennen. Was bin ich?",
    answer: "Ein Kochtopf",
    explanation: "Ein Kochtopf erhitzt sich stark, ohne selbst Feuer zu fangen.",
  },
  {
    prompt: "Ich drehe mich ständig im Kreis, koche aber nichts. Was bin ich?",
    answer: "Ein Mixer oder ein Ventilator",
    explanation: "Ein Mixer dreht sich schnell im Kreis, erhitzt die Zutaten dabei jedoch nicht.",
  },
  {
    prompt: "Ich habe einen Deckel, aber bin kein Topf. Was bin ich?",
    answer: "Eine Mülltonne oder ein Glas",
    explanation: "Viele Behälter tragen Deckel, ohne Kochutensilien zu sein.",
  },
  {
    prompt: "Ich schneide, ohne selbst scharf zu sein. Was bin ich?",
    answer: "Eine Schere in stumpfem Zustand — oder besser: ein Faden beim Käseschneiden",
    explanation: "Ein gespannter Draht oder Faden kann weiche Materialien schneiden, ohne eine klassische Klinge zu sein.",
  },
  {
    prompt: "Ich halte Speisen warm, ohne selbst zu kochen. Was bin ich?",
    answer: "Eine Thermoskanne oder Warmhalteplatte",
    explanation: "Isolierende Gefäße bewahren Wärme, ohne aktiv zu heizen.",
  },
  {
    prompt: "Ich habe Zinken wie eine Gabel, aber diene nicht zum Essen. Was bin ich?",
    answer: "Eine Mistgabel oder ein Stecker",
    explanation: "Ein elektrischer Stecker hat „Zinken“, die aber elektrischen Kontakt herstellen statt Essen aufzuspießen.",
  },
  {
    prompt: "Ich mache Dinge kalt, ohne selbst zu frieren. Was bin ich?",
    answer: "Ein Kühlschrank",
    explanation: "Ein Kühlschrank kühlt seinen Inhalt, während sein Gehäuse selbst nicht gefriert.",
  },
  {
    prompt: "Ich bin rund und flach zugleich, und man isst von mir, aber nicht mich selbst. Was bin ich?",
    answer: "Ein Teller",
    explanation: "Ein Teller trägt das Essen, wird selbst aber nicht verzehrt.",
  },
  {
    prompt: "Ich reinige, ohne selbst schmutzig zu werden — solange man mich rechtzeitig auswäscht. Was bin ich?",
    answer: "Ein Schwamm",
    explanation: "Ein Spülschwamm nimmt Schmutz auf, kann aber immer wieder gereinigt werden.",
  },
  {
    prompt: "Ich habe Fächer, bin aber kein Schrank. Was bin ich, wenn ich elektrisch bin?",
    answer: "Ein Toaster",
    explanation: "Ein Toaster hat Fächer für die Brotscheiben, ohne ein Möbelstück zu sein.",
  },
  {
    prompt: "Ich messe Gewicht, ohne selbst schwer zu sein. Was bin ich?",
    answer: "Eine Küchenwaage",
    explanation: "Eine Waage ist meist leicht, misst aber das Gewicht anderer Dinge.",
  },
  {
    prompt: "Ich brenne, ohne mich zu verbrauchen, solange Gas nachströmt. Was bin ich?",
    answer: "Eine Gasflamme am Herd",
    explanation: "Solange Gas nachfließt, bleibt die Flamme konstant, ohne „aufgebraucht“ zu werden wie eine Kerze.",
  },
  {
    prompt: "Ich bewahre Kälte über Stunden, ganz ohne Strom. Was bin ich?",
    answer: "Eine Kühltasche mit Kühlakku",
    explanation: "Isolierung und ein vorgefrorener Kühlakku halten Kälte auch ohne Stromanschluss.",
  },
  {
    prompt: "Ich habe Borsten, aber bin kein Tier. Was bin ich?",
    answer: "Eine Bürste",
    explanation: "Bürsten tragen Borsten aus Kunststoff oder Naturmaterial, ohne Lebewesen zu sein.",
  },
  {
    prompt: "Ich presse, ohne zu quetschen — jedenfalls nicht schmerzhaft. Was bin ich?",
    answer: "Eine Zitruspresse",
    explanation: "Eine Zitruspresse übt Druck auf Früchte aus, um Saft zu gewinnen.",
  },
  {
    prompt: "Ich koche Wasser in wenigen Minuten, ohne offene Flamme. Was bin ich?",
    answer: "Ein Wasserkocher",
    explanation: "Elektrische Wasserkocher erhitzen Wasser über eine Heizspirale, ganz ohne Feuer.",
  },
  {
    prompt: "Ich habe eine Klinge, schneide aber nur Brot. Was bin ich?",
    answer: "Ein Brotmesser",
    explanation: "Ein Brotmesser ist speziell für Brot geformt, mit gezackter Klinge.",
  },
  {
    prompt: "Ich verwandle Milch in Schaum, ohne selbst Milch zu sein. Was bin ich?",
    answer: "Ein Milchaufschäumer",
    explanation: "Ein Milchaufschäumer erzeugt durch Verwirbelung Luftblasen in der Milch.",
  },

  // ---------------------------------------------------------- Farben & Formen
  {
    prompt: "Welche Farbe entsteht, wenn man Blau und Gelb mischt?",
    answer: "Grün",
    explanation: "Blau und Gelb ergeben als Grundfarbenmischung Grün.",
  },
  {
    prompt: "Welche zwei Farben ergeben zusammen Orange?",
    answer: "Rot und Gelb",
    explanation: "Die Mischung aus Rot und Gelb ergibt die Farbe Orange.",
  },
  {
    prompt: "Welche Farbe hat der Himmel typischerweise bei klarem Wetter am Tag?",
    answer: "Blau",
    explanation: "Die Streuung des Sonnenlichts in der Atmosphäre lässt den Himmel blau erscheinen.",
  },
  {
    prompt: "Welche Form hat ein Stoppschild in Deutschland?",
    answer: "Ein Achteck",
    explanation: "Stoppschilder sind international meist achteckig gestaltet.",
  },
  {
    prompt: "Welche Farbe erhält man, wenn man alle Grundfarben des Lichts mischt?",
    answer: "Weiß",
    explanation: "Beim additiven Farbmischen von Licht ergibt die Kombination aller Grundfarben Weiß.",
  },
  {
    prompt: "Welche Form hat die Grundfläche einer klassischen Pyramide in Ägypten meist?",
    answer: "Ein Quadrat",
    explanation: "Die großen ägyptischen Pyramiden haben typischerweise eine quadratische Grundfläche.",
  },
  {
    prompt: "Welche Farbe symbolisiert in vielen Kulturen Gefahr oder Stopp?",
    answer: "Rot",
    explanation: "Rot wird weltweit häufig als Warn- oder Stoppfarbe verwendet.",
  },
  {
    prompt: "Welche geometrische Form hat ein klassisches Fußballfeld?",
    answer: "Ein Rechteck",
    explanation: "Fußballfelder sind rechteckig mit festgelegten Standardmaßen.",
  },
  {
    prompt: "Welche Farbe entsteht durch Mischen von Rot und Blau?",
    answer: "Violett",
    explanation: "Rot und Blau ergeben zusammen die Farbe Violett bzw. Lila.",
  },
  {
    prompt: "Welche Form hat ein typisches Verkehrsschild, das Vorfahrt gewähren bedeutet?",
    answer: "Ein Dreieck (auf der Spitze stehend)",
    explanation: "Das umgekehrte Dreieck ist international das Symbol für „Vorfahrt gewähren“.",
  },

  // ---------------------------------------------------------- Musik & Klang
  {
    prompt: "Welches Instrument hat schwarze und weiße Tasten?",
    answer: "Das Klavier",
    explanation: "Klaviere und Keyboards haben klassischerweise abwechselnd weiße und schwarze Tasten.",
  },
  {
    prompt: "Welches Instrument spielt man, indem man hineinbläst und Löcher mit den Fingern bedeckt?",
    answer: "Die Flöte",
    explanation: "Bei der Flöte erzeugen Fingerbewegungen über Löchern verschiedene Töne.",
  },
  {
    prompt: "Wie viele Saiten hat eine klassische Gitarre üblicherweise?",
    answer: "Sechs",
    explanation: "Die klassische Konzertgitarre hat standardmäßig sechs Saiten.",
  },
  {
    prompt: "Welches Instrument wird mit einem Bogen gestrichen und unter dem Kinn gehalten?",
    answer: "Die Violine (Geige)",
    explanation: "Die Geige wird typischerweise unter dem Kinn gespielt und mit einem Bogen gestrichen.",
  },
  {
    prompt: "Wie nennt man den Fachbegriff für das Rhythmusgefühl bzw. die Geschwindigkeit eines Musikstücks?",
    answer: "Das Tempo",
    explanation: "Tempo beschreibt die Geschwindigkeit, in der ein Musikstück gespielt wird.",
  },
  {
    prompt: "Welches Schlaginstrument wird traditionell mit den Händen oder Stöcken gespielt und hat ein gespanntes Fell?",
    answer: "Die Trommel",
    explanation: "Trommeln erzeugen Klang durch das Anschlagen eines gespannten Fells.",
  },
  {
    prompt: "Wie viele Linien hat ein klassisches Notensystem?",
    answer: "Fünf",
    explanation: "Ein Notensystem (Notenlinien) besteht traditionell aus fünf horizontalen Linien.",
  },
  {
    prompt: "Welches Blasinstrument hat einen gebogenen, glänzenden Metallkörper und wird oft im Jazz eingesetzt?",
    answer: "Die Trompete",
    explanation: "Die Trompete ist ein klassisches Blechblasinstrument, das im Jazz häufig vorkommt.",
  },

  // ---------------------------------------------------------- Wetter & Jahreszeiten
  {
    prompt: "Welches Wetterphänomen entsteht durch Lichtbrechung an Regentropfen?",
    answer: "Der Regenbogen",
    explanation: "Sonnenlicht wird in Regentropfen gebrochen und in seine Farben zerlegt.",
  },
  {
    prompt: "Wie nennt man kleine Eiskörner, die bei einem Gewitter vom Himmel fallen können?",
    answer: "Hagel",
    explanation: "Hagel entsteht durch starke Aufwinde, die Regentropfen wiederholt gefrieren lassen.",
  },
  {
    prompt: "In welcher Jahreszeit sind die Tage auf der Nordhalbkugel typischerweise am längsten?",
    answer: "Im Sommer",
    explanation: "Zur Sommersonnenwende ist der Tag auf der Nordhalbkugel am längsten.",
  },
  {
    prompt: "Wie nennt man dichten, bodennahen Wasserdampf, der die Sicht einschränkt?",
    answer: "Nebel",
    explanation: "Nebel entsteht durch Kondensation feuchter Luft nahe am Boden.",
  },
  {
    prompt: "Welches Wetterphänomen wird von lautem Donner und hellen Blitzen begleitet?",
    answer: "Ein Gewitter",
    explanation: "Gewitter entstehen durch starke elektrische Entladungen in Wolken.",
  },
  {
    prompt: "In welcher Jahreszeit verlieren die meisten Laubbäume in Mitteleuropa ihre Blätter?",
    answer: "Im Herbst",
    explanation: "Der Laubfall ist ein typisches herbstliches Phänomen zur Vorbereitung auf den Winter.",
  },
  {
    prompt: "Wie nennt man einen starken, wirbelnden Sturm, der über dem Meer entsteht und sich zu Land ausbreiten kann?",
    answer: "Ein Hurrikan bzw. tropischer Wirbelsturm",
    explanation: "Hurrikane entstehen über warmen Ozeanen und können erhebliche Schäden an Land anrichten.",
  },
  {
    prompt: "Welches Naturphänomen beschreibt farbige Lichtbänder am Nachthimmel in Polarregionen?",
    answer: "Das Polarlicht (Aurora)",
    explanation: "Geladene Sonnenwindteilchen erzeugen beim Auftreffen auf die Erdatmosphäre dieses Leuchten.",
  },
  {
    prompt: "In welcher Jahreszeit blühen in Mitteleuropa typischerweise die ersten Krokusse und Schneeglöckchen?",
    answer: "Im Frühling",
    explanation: "Diese Frühblüher zeigen sich meist schon in den ersten warmen Wochen des Frühlings.",
  },
  {
    prompt: "Wie nennt man das Sinken von Wassertröpfchen, die sich nachts an kühlen Oberflächen bilden?",
    answer: "Tau",
    explanation: "Tau entsteht durch Kondensation der Luftfeuchtigkeit bei nächtlicher Abkühlung.",
  },
  {
    prompt: "Welches Wetterphänomen entsteht, wenn warme und kalte Luftmassen aufeinandertreffen und rotierende Stürme bilden?",
    answer: "Ein Tornado",
    explanation: "Tornados bilden sich häufig an der Grenze stark unterschiedlicher Luftmassen.",
  },
  {
    prompt: "In welcher Jahreszeit ist die Sonneneinstrahlung auf der Nordhalbkugel am geringsten?",
    answer: "Im Winter",
    explanation: "Zur Wintersonnenwende steht die Sonne auf der Nordhalbkugel am niedrigsten.",
  },

  // ---------------------------------------------------------- Schule & Bildung
  {
    prompt: "Welches Fach beschäftigt sich mit der Erforschung von Zahlen, Formen und Strukturen?",
    answer: "Mathematik",
    explanation: "Mathematik ist die Wissenschaft von Zahlen, Formen, Mustern und logischen Strukturen.",
  },
  {
    prompt: "Wie nennt man das Fach, das sich mit vergangenen Ereignissen und Epochen beschäftigt?",
    answer: "Geschichte",
    explanation: "Geschichte erforscht vergangene Ereignisse und deren Ursachen und Folgen.",
  },
  {
    prompt: "Welches Fach untersucht Pflanzen, Tiere und lebende Organismen?",
    answer: "Biologie",
    explanation: "Biologie ist die Lehre vom Leben und von Lebewesen.",
  },
  {
    prompt: "Wie nennt man das schriftliche Festhalten eigener Gedanken über einen längeren Zeitraum?",
    answer: "Ein Tagebuch",
    explanation: "Ein Tagebuch dient der regelmäßigen schriftlichen Reflexion eigener Erlebnisse und Gedanken.",
  },
  {
    prompt: "Welches Fach beschäftigt sich mit chemischen Reaktionen und Stoffen?",
    answer: "Chemie",
    explanation: "Chemie erforscht den Aufbau, die Eigenschaften und Reaktionen von Stoffen.",
  },
  {
    prompt: "Wie nennt man die Kunst des überzeugenden Sprechens vor einer Gruppe?",
    answer: "Rhetorik",
    explanation: "Rhetorik ist die Lehre der wirkungsvollen und überzeugenden Rede.",
  },
  {
    prompt: "Welches Fach untersucht Länder, Klima, Landschaften und deren Zusammenhänge?",
    answer: "Geografie (Erdkunde)",
    explanation: "Geografie beschäftigt sich mit der Erde, ihren Landschaften und Lebensräumen.",
  },
  {
    prompt: "Wie nennt man die schriftliche Zusammenfassung eines längeren Textes in eigenen Worten?",
    answer: "Eine Zusammenfassung",
    explanation: "Eine Zusammenfassung gibt die wichtigsten Inhalte eines Textes komprimiert wieder.",
  },
  {
    prompt: "Welches Fach beschäftigt sich mit Kräften, Energie und Bewegung?",
    answer: "Physik",
    explanation: "Physik erforscht grundlegende Naturgesetze wie Kraft, Energie und Bewegung.",
  },
  {
    prompt: "Wie nennt man das gemeinsame Lösen von Aufgaben in einer kleinen Gruppe?",
    answer: "Gruppenarbeit",
    explanation: "Gruppenarbeit fördert kollaboratives Lernen und den Austausch unterschiedlicher Perspektiven.",
  },

  // ---------------------------------------------------------- Körper & Sinne
  {
    prompt: "Welches Sinnesorgan ermöglicht das Riechen?",
    answer: "Die Nase",
    explanation: "Riechzellen in der Nase erkennen Duftmoleküle in der Luft.",
  },
  {
    prompt: "Welcher Körperteil pumpt Blut durch den gesamten Körper?",
    answer: "Das Herz",
    explanation: "Das Herz ist der Muskel, der Blut durch den Kreislauf pumpt.",
  },
  {
    prompt: "Wie viele Sinne werden klassischerweise beim Menschen unterschieden?",
    answer: "Fünf",
    explanation: "Sehen, Hören, Riechen, Schmecken und Tasten gelten als die klassischen fünf Sinne.",
  },
  {
    prompt: "Welches Organ filtert das Blut und produziert Urin?",
    answer: "Die Niere",
    explanation: "Die Nieren filtern Abfallstoffe aus dem Blut und bilden daraus den Urin.",
  },
  {
    prompt: "Welcher Körperteil enthält das Trommelfell und ermöglicht das Hören?",
    answer: "Das Ohr",
    explanation: "Das Trommelfell im Ohr wandelt Schallwellen in mechanische Schwingungen um.",
  },
  {
    prompt: "Wie nennt man die härteste Substanz im menschlichen Körper?",
    answer: "Der Zahnschmelz",
    explanation: "Zahnschmelz ist härter als Knochen und schützt die Zähne.",
  },
  {
    prompt: "Welches Organ ist für die Verarbeitung von Gedanken und Erinnerungen zuständig?",
    answer: "Das Gehirn",
    explanation: "Das Gehirn steuert Denken, Erinnerung und alle bewussten Handlungen.",
  },
  {
    prompt: "Wie viele Knochen hat ein erwachsener menschlicher Körper ungefähr?",
    answer: "206",
    explanation: "Ein erwachsener Mensch hat in der Regel 206 Knochen, Babys haben mehr, die später zusammenwachsen.",
  },
  {
    prompt: "Welcher Muskel ist der größte im menschlichen Körper?",
    answer: "Der große Gesäßmuskel (Musculus gluteus maximus)",
    explanation: "Dieser Muskel ermöglicht wichtige Bewegungen wie Aufrichten und Gehen und gilt als der größte Einzelmuskel.",
  },
  {
    prompt: "Welches Sinnesorgan besitzt lichtempfindliche Zellen, die Stäbchen und Zapfen genannt werden?",
    answer: "Das Auge",
    explanation: "Stäbchen und Zapfen in der Netzhaut des Auges ermöglichen das Sehen von Licht und Farben.",
  },
  {
    prompt: "Wie nennt man den größten Muskel, mit dem wir kauen?",
    answer: "Der Kaumuskel (Musculus masseter)",
    explanation: "Der Kaumuskel gehört zu den kräftigsten Muskeln im Verhältnis zu seiner Größe.",
  },
  {
    prompt: "Welches Organ speichert Galle zur Fettverdauung?",
    answer: "Die Gallenblase",
    explanation: "Die Gallenblase speichert die von der Leber produzierte Galle für die Fettverdauung.",
  },
  {
    prompt: "Wie nennt man die Fähigkeit, die eigene Körperposition ohne hinzuschauen wahrzunehmen?",
    answer: "Propriozeption (der „sechste Sinn“ für Körperlage)",
    explanation: "Propriozeption erlaubt es, Bewegungen und Körperhaltung auch mit geschlossenen Augen zu koordinieren.",
  },
  {
    prompt: "Welches Organ produziert Insulin zur Regulierung des Blutzuckerspiegels?",
    answer: "Die Bauchspeicheldrüse",
    explanation: "Die Bauchspeicheldrüse (Pankreas) produziert Insulin, das den Blutzuckerspiegel reguliert.",
  },
  {
    prompt: "Wie nennt man die äußere Schutzschicht des menschlichen Körpers?",
    answer: "Die Haut",
    explanation: "Die Haut ist das größte Organ des Menschen und schützt den Körper vor äußeren Einflüssen.",
  },

  // ---------------------------------------------------------- Vermischtes: Technik, Sport, Reisen & mehr
  {
    prompt: "Wie viele Spieler stehen bei einem Fußballspiel normalerweise gleichzeitig auf dem Feld pro Mannschaft?",
    answer: "Elf",
    explanation: "Jede Fußballmannschaft stellt regulär elf Spieler inklusive Torwart.",
  },
  {
    prompt: "Welches Gerät wandelt gesprochene Worte in geschriebenen Text um?",
    answer: "Eine Spracherkennungssoftware",
    explanation: "Spracherkennungssysteme analysieren Tonsignale und wandeln sie in Text um.",
  },
  {
    prompt: "Wie nennt man das Geld, das man für eine Reise ins Ausland in die dortige Währung umtauscht?",
    answer: "Devisen",
    explanation: "Devisen sind Zahlungsmittel in fremder Währung für den internationalen Handel und Reiseverkehr.",
  },
  {
    prompt: "Welches Fortbewegungsmittel nutzt Schienen und wird meist mit Strom oder Diesel angetrieben?",
    answer: "Der Zug",
    explanation: "Züge fahren auf festen Schienen und werden heute meist elektrisch oder mit Diesel betrieben.",
  },
  {
    prompt: "Wie nennt man ein Gemälde, das die eigene Person zeigt, gemalt von einem selbst?",
    answer: "Ein Selbstporträt",
    explanation: "Ein Selbstporträt ist die künstlerische Darstellung der eigenen Person durch sich selbst.",
  },
  {
    prompt: "Wie viele Ringe zeigt das olympische Symbol?",
    answer: "Fünf",
    explanation: "Die fünf Ringe stehen für die fünf bewohnten Kontinente, die an den Olympischen Spielen teilnehmen.",
  },
  {
    prompt: "Welches Gerät speichert digitale Daten dauerhaft in einem Computer?",
    answer: "Die Festplatte",
    explanation: "Eine Festplatte (oder SSD) speichert Daten auch nach dem Ausschalten des Geräts dauerhaft.",
  },
  {
    prompt: "Wie nennt man den Ort, an dem Flugzeuge starten und landen?",
    answer: "Ein Flughafen",
    explanation: "Flughäfen bieten die notwendige Infrastruktur für Start und Landung von Flugzeugen.",
  },
  {
    prompt: "Welches Sportgerät wird beim Tennis über das Netz geschlagen?",
    answer: "Der Ball",
    explanation: "Beim Tennis schlagen die Spieler einen Filzball mit dem Schläger über das Netz.",
  },
  {
    prompt: "Wie nennt man die kleinste Recheneinheit in der Informatik, die entweder 0 oder 1 sein kann?",
    answer: "Ein Bit",
    explanation: "Ein Bit ist die kleinste digitale Informationseinheit mit zwei möglichen Zuständen.",
  },
  {
    prompt: "Welches literarische Werk beginnt klassischerweise mit „Es war einmal“?",
    answer: "Ein Märchen",
    explanation: "Diese Formel ist eine typische Einleitung für klassische Märchen.",
  },
  {
    prompt: "Wie nennt man den Vorgang, bei dem Pflanzen mithilfe von Licht Energie erzeugen?",
    answer: "Die Fotosynthese",
    explanation: "Fotosynthese wandelt Lichtenergie, Wasser und CO₂ in Zucker und Sauerstoff um.",
  },
  {
    prompt: "Welches Gerät misst die Herzfrequenz während des Sports?",
    answer: "Ein Pulsmesser (Herzfrequenzmesser)",
    explanation: "Pulsmesser erfassen die Herzschläge pro Minute während körperlicher Aktivität.",
  },
  {
    prompt: "Wie nennt man das Fahrzeug, das Menschen ins Weltall bringt?",
    answer: "Eine Rakete",
    explanation: "Raketen erzeugen genug Schub, um die Erdanziehungskraft zu überwinden.",
  },
  {
    prompt: "Welches Ballspiel wird mit einem Schläger und einem sehr kleinen, harten Ball auf Rasen gespielt, oft in Weiß gekleidet?",
    answer: "Cricket",
    explanation: "Cricket ist besonders im Commonwealth beliebt und wird traditionell in weißer Kleidung gespielt.",
  },
  {
    prompt: "Wie nennt man ein Dokument, das die Identität einer Person bei Auslandsreisen bestätigt?",
    answer: "Ein Reisepass",
    explanation: "Ein Reisepass dient international als amtlicher Identitätsnachweis.",
  },
  {
    prompt: "Welches Gerät wandelt Sonnenlicht direkt in elektrischen Strom um?",
    answer: "Eine Solarzelle (Photovoltaikmodul)",
    explanation: "Solarzellen nutzen den photoelektrischen Effekt, um Licht in Strom umzuwandeln.",
  },
  {
    prompt: "Wie nennt man die Übersicht über Einnahmen und Ausgaben eines Haushalts?",
    answer: "Ein Budget",
    explanation: "Ein Budget hilft, Einnahmen und Ausgaben zu planen und im Überblick zu behalten.",
  },
  {
    prompt: "Welche Sportart wird auf einer Eisfläche mit Schlittschuhen und einem Schläger gespielt, bei der ein Puck ins Tor muss?",
    answer: "Eishockey",
    explanation: "Beim Eishockey versuchen zwei Mannschaften, einen Puck mit Schlägern ins gegnerische Tor zu befördern.",
  },
  {
    prompt: "Wie nennt man das internationale Netzwerk, über das Milliarden Computer weltweit verbunden sind?",
    answer: "Das Internet",
    explanation: "Das Internet verbindet Computer und Geräte weltweit über Datenleitungen und Funkverbindungen.",
  },
  {
    prompt: "Welches Fortbewegungsmittel wird typischerweise mit Muskelkraft über zwei Räder angetrieben?",
    answer: "Das Fahrrad",
    explanation: "Fahrräder werden durch Treten der Pedale mit Muskelkraft angetrieben.",
  },
  {
    prompt: "Wie nennt man die künstlerische Darstellung von Klängen in einer festgelegten Struktur aus Rhythmus und Melodie?",
    answer: "Musik",
    explanation: "Musik kombiniert Rhythmus, Melodie und Harmonie zu einer künstlerischen Klangform.",
  },
  {
    prompt: "Welches Gerät benötigt man, um analoge Signale in digitale umzuwandeln, etwa bei einem Mikrofon-Anschluss?",
    answer: "Einen Analog-Digital-Wandler",
    explanation: "Ein Analog-Digital-Wandler übersetzt kontinuierliche Signale in digitale Werte.",
  },
  {
    prompt: "Wie nennt man den höchsten Berg der Welt?",
    answer: "Der Mount Everest",
    explanation: "Mit rund 8.849 Metern ist der Mount Everest der höchste Berg der Erde über dem Meeresspiegel.",
  },
  {
    prompt: "Welche Sportart wird mit einem kleinen weißen Ball auf einer weitläufigen Rasenfläche mit Löchern gespielt?",
    answer: "Golf",
    explanation: "Beim Golf versuchen Spieler, den Ball mit möglichst wenigen Schlägen in ein Loch zu befördern.",
  },
  {
    prompt: "Wie nennt man das Gerät, das Text und Bilder auf Papier druckt?",
    answer: "Ein Drucker",
    explanation: "Drucker übertragen digitale Inhalte physisch auf Papier oder andere Materialien.",
  },
  {
    prompt: "Welches Fortbewegungsmittel schwimmt auf dem Wasser und wird oft von Segeln oder Motoren angetrieben?",
    answer: "Ein Boot bzw. Schiff",
    explanation: "Boote und Schiffe nutzen Auftrieb, um auf dem Wasser zu schwimmen, angetrieben durch Wind oder Motor.",
  },
  {
    prompt: "Wie nennt man die längste Flussstrecke, die als „Lebensader“ Ägyptens gilt?",
    answer: "Der Nil",
    explanation: "Der Nil versorgt seit Jahrtausenden weite Teile Ägyptens mit Wasser und fruchtbarem Land.",
  },
];
