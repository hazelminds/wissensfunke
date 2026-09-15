import type { DailyQuizSet } from "./daily";

/**
 * Der große Fragen-Fundus fürs Tages-Mini-Quiz. Zusammen mit den 7
 * Starter-Sets in daily.ts ergibt das einen Pool von 400 Sets (1200
 * Fragen) — bei einem Set pro Tag ein Zyklus von gut 13 Monaten, bevor
 * sich eines wiederholt. Jedes Set mischt bewusst drei verschiedene
 * Kategorien für Abwechslung innerhalb eines Tages.
 */
export const moreDailyQuizSets: DailyQuizSet[] = [
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 61 minus 24?",
        options: ["35", "36", "37", "38"],
        correctIndex: 2,
        explanation: "61 − 24 = 37.",
      },
      {
        category: "Geografie",
        question: "Welches Land grenzt an die meisten verschiedenen Meere?",
        options: ["Türkei", "Griechenland", "Italien", "Spanien"],
        correctIndex: 0,
        explanation: "Die Türkei grenzt an Schwarzes Meer, Marmarameer, Ägäis und Mittelmeer.",
      },
      {
        category: "Biologie",
        question: "Welches ist das größte Landtier der Welt?",
        options: ["Nashorn", "Giraffe", "Afrikanischer Elefant", "Flusspferd"],
        correctIndex: 2,
        explanation: "Der Afrikanische Elefant ist das größte an Land lebende Tier.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Kanten hat eine quadratische Pyramide?",
        options: ["6", "8", "10", "12"],
        correctIndex: 1,
        explanation: "Eine Pyramide mit quadratischer Grundfläche hat acht Kanten: vier an der Basis und vier zur Spitze.",
      },
      {
        category: "Geografie",
        question: "Welches Meer liegt zwischen Europa und Afrika?",
        options: ["Nordsee", "Mittelmeer", "Rotes Meer", "Schwarzes Meer"],
        correctIndex: 1,
        explanation: "Das Mittelmeer trennt Südeuropa von Nordafrika.",
      },
      {
        category: "Biologie",
        question: "Welches Tier hat das beste Gehör unter den Landtieren?",
        options: ["Fledermaus", "Hund", "Elefant", "Eule"],
        correctIndex: 0,
        explanation: "Fledermäuse besitzen ein extrem feines Gehör, das sie zur Echoortung nutzen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Summe der Innenwinkel eines Sechsecks?",
        options: ["540 Grad", "630 Grad", "720 Grad", "810 Grad"],
        correctIndex: 2,
        explanation: "Die Innenwinkelsumme eines Sechsecks beträgt 720 Grad.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Finnland?",
        options: ["Tampere", "Turku", "Helsinki", "Oulu"],
        correctIndex: 2,
        explanation: "Helsinki ist die Hauptstadt und größte Stadt Finnlands.",
      },
      {
        category: "Geschichte",
        question: "Wer war Abraham Lincoln?",
        options: ["Ein US-Präsident während des Bürgerkriegs", "Ein britischer Premierminister", "Ein Gründervater der USA", "Ein General im Unabhängigkeitskrieg"],
        correctIndex: 0,
        explanation: "Lincoln führte die USA als Präsident durch den Bürgerkrieg und beendete die Sklaverei.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 34 mal 3?",
        options: ["96", "99", "102", "105"],
        correctIndex: 2,
        explanation: "34 × 3 = 102.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Österreich?",
        options: ["Salzburg", "Graz", "Wien", "Innsbruck"],
        correctIndex: 2,
        explanation: "Wien ist die Hauptstadt und größte Stadt Österreichs.",
      },
      {
        category: "Biologie",
        question: "Welches Organ produziert das Hormon Melatonin, das den Schlaf reguliert?",
        options: ["Hypophyse", "Zirbeldrüse", "Schilddrüse", "Nebenniere"],
        correctIndex: 1,
        explanation: "Die Zirbeldrüse im Gehirn produziert Melatonin, das den Schlaf-Wach-Rhythmus steuert.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 31 plus 29?",
        options: ["58", "59", "60", "61"],
        correctIndex: 2,
        explanation: "31 + 29 = 60.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt die Stadt Petra, bekannt für ihre Felsenarchitektur?",
        options: ["Ägypten", "Jordanien", "Israel", "Syrien"],
        correctIndex: 1,
        explanation: "Die antike Stadt Petra liegt im heutigen Jordanien.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die erste Atombombe getestet?",
        options: ["1943", "1945", "1947", "1949"],
        correctIndex: 1,
        explanation: "Der erste Atombombentest (Trinity) fand im Juli 1945 in den USA statt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 169?",
        options: ["11", "12", "13", "14"],
        correctIndex: 2,
        explanation: "13 × 13 = 169, also ist die Quadratwurzel aus 169 gleich 13.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Titicacasee?",
        options: ["Argentinien und Chile", "Peru und Bolivien", "Ecuador und Kolumbien", "Brasilien und Paraguay"],
        correctIndex: 1,
        explanation: "Der Titicacasee liegt an der Grenze zwischen Peru und Bolivien.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist das Wappentier Australiens neben dem Emu?",
        options: ["Koala", "Känguru", "Wombat", "Kookaburra"],
        correctIndex: 1,
        explanation: "Das Känguru ist neben dem Emu eines der bekannten Wappentiere Australiens.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 11 mal 11?",
        options: ["111", "121", "131", "141"],
        correctIndex: 1,
        explanation: "11 × 11 = 121.",
      },
      {
        category: "Geografie",
        question: "Welches Land beherbergt den Uluru (Ayers Rock)?",
        options: ["Neuseeland", "Australien", "Südafrika", "Namibia"],
        correctIndex: 1,
        explanation: "Der Uluru liegt im australischen Outback.",
      },
      {
        category: "Geschichte",
        question: "Wer war der letzte Pharao Ägyptens?",
        options: ["Nofretete", "Kleopatra VII.", "Ramses II.", "Tutanchamun"],
        correctIndex: 1,
        explanation: "Kleopatra VII. gilt als die letzte regierende Pharaonin des Alten Ägypten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 60 Prozent von 120?",
        options: ["62", "68", "72", "78"],
        correctIndex: 2,
        explanation: "60 % von 120 = 0,6 × 120 = 72.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die größte Stadt Australiens?",
        options: ["Canberra", "Melbourne", "Sydney", "Brisbane"],
        correctIndex: 2,
        explanation: "Sydney ist die bevölkerungsreichste Stadt Australiens, auch wenn Canberra die Hauptstadt ist.",
      },
      {
        category: "Biologie",
        question: "Welches Organ ist für die Produktion von Speichel zuständig?",
        options: ["Speicheldrüsen", "Zunge", "Rachen", "Mandeln"],
        correctIndex: 0,
        explanation: "Speicheldrüsen im Mundraum produzieren den für die Verdauung wichtigen Speichel.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Ecken hat ein Achteck?",
        options: ["6", "7", "8", "9"],
        correctIndex: 2,
        explanation: "Ein Achteck hat acht Ecken, ebenso viele wie Seiten.",
      },
      {
        category: "Geografie",
        question: "Welches Land ist für seine Tulpenfelder bekannt?",
        options: ["Belgien", "Niederlande", "Dänemark", "Deutschland"],
        correctIndex: 1,
        explanation: "Die Niederlande sind weltberühmt für ihre Tulpenzucht.",
      },
      {
        category: "Geschichte",
        question: "Welches Land war während des Kalten Krieges in Ost und West geteilt?",
        options: ["Frankreich", "Deutschland", "Italien", "Spanien"],
        correctIndex: 1,
        explanation: "Deutschland war von 1949 bis 1990 in BRD und DDR geteilt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Grad hat jeder Innenwinkel in einem Quadrat?",
        options: ["45 Grad", "60 Grad", "90 Grad", "120 Grad"],
        correctIndex: 2,
        explanation: "Ein Quadrat hat vier rechte Winkel von jeweils 90 Grad.",
      },
      {
        category: "Geografie",
        question: "Welches Land besitzt den Grand Canyon?",
        options: ["Kanada", "USA", "Mexiko", "Argentinien"],
        correctIndex: 1,
        explanation: "Der Grand Canyon liegt im US-Bundesstaat Arizona.",
      },
      {
        category: "Biologie",
        question: "Welches Tier hat das dickste Fell aller Landtiere?",
        options: ["Eisbär", "Seeotter (Meerestier)", "Moschusochse", "Yak"],
        correctIndex: 2,
        explanation: "Der Moschusochse hat eines der dichtesten Felle unter Landtieren, das ihn vor arktischer Kälte schützt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 72 geteilt durch 8?",
        options: ["7", "8", "9", "10"],
        correctIndex: 2,
        explanation: "72 ÷ 8 = 9.",
      },
      {
        category: "Geografie",
        question: "Welches Land hat den offiziellen Namen „Helvetia“ auf seinen Briefmarken und Münzen?",
        options: ["Österreich", "Schweiz", "Belgien", "Luxemburg"],
        correctIndex: 1,
        explanation: "Die Schweiz nutzt den lateinischen Namen „Helvetia“ wegen ihrer vier Amtssprachen.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die Magna Carta unterzeichnet?",
        options: ["1066", "1215", "1348", "1492"],
        correctIndex: 1,
        explanation: "Die Magna Carta wurde 1215 in England unterzeichnet und begrenzte die königliche Macht.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 130 geteilt durch 10?",
        options: ["11", "12", "13", "14"],
        correctIndex: 2,
        explanation: "130 ÷ 10 = 13.",
      },
      {
        category: "Geografie",
        question: "Welches Land liegt zwischen Frankreich, Deutschland, Belgien und Luxemburg?",
        options: ["Genau diese vier Nachbarn hat kein einzelnes Land — gemeint ist ein Land mit Grenze zu allen vieren: Nur teilweise korrekt, da kein Land direkt an alle vier grenzt", "Deutschland", "Belgien", "Die Schweiz"],
        correctIndex: 1,
        explanation: "Deutschland grenzt direkt an Frankreich, Belgien und Luxemburg (unter anderem).",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt für sein außergewöhnlich gutes Gedächtnis über Jahrzehnte?",
        options: ["Delfin", "Elefant", "Papagei", "Krähe"],
        correctIndex: 1,
        explanation: "Elefanten gelten als besonders gedächtnisstark und erkennen Artgenossen nach vielen Jahren wieder.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 23 mal 4?",
        options: ["88", "90", "92", "94"],
        correctIndex: 2,
        explanation: "23 × 4 = 92.",
      },
      {
        category: "Geografie",
        question: "Welches Gebirge trennt Europa und Asien in Russland?",
        options: ["Die Alpen", "Der Kaukasus", "Der Ural", "Der Himalaya"],
        correctIndex: 2,
        explanation: "Das Uralgebirge gilt traditionell als Grenze zwischen Europa und Asien.",
      },
      {
        category: "Geschichte",
        question: "Wer schrieb die Unabhängigkeitserklärung der USA hauptsächlich?",
        options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
        correctIndex: 1,
        explanation: "Thomas Jefferson verfasste den Hauptentwurf der Unabhängigkeitserklärung von 1776.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein regelmäßiges Vieleck mit dem Namen „Hexagon“?",
        options: ["5", "6", "7", "8"],
        correctIndex: 1,
        explanation: "Hexagon ist ein anderer Begriff für Sechseck.",
      },
      {
        category: "Geografie",
        question: "Welcher Staat der USA ist flächenmäßig der größte?",
        options: ["Texas", "Kalifornien", "Alaska", "Montana"],
        correctIndex: 2,
        explanation: "Alaska ist mit Abstand der flächenmäßig größte US-Bundesstaat.",
      },
      {
        category: "Biologie",
        question: "Welches Tier kann sein Herz kurzzeitig anhalten, um zu tauchen?",
        options: ["Wal", "Pinguin", "Seehund", "Alle genannten Tiere passen"],
        correctIndex: 3,
        explanation: "Viele Tauchtiere wie Wale, Pinguine und Seehunde verlangsamen ihren Herzschlag beim Tauchen erheblich (Bradykardie).",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 4 hoch 3 (4³)?",
        options: ["12", "16", "48", "64"],
        correctIndex: 3,
        explanation: "4³ = 4 × 4 × 4 = 64.",
      },
      {
        category: "Geografie",
        question: "Welcher Breitengrad markiert den Äquator?",
        options: ["0 Grad", "45 Grad", "90 Grad", "23,5 Grad"],
        correctIndex: 0,
        explanation: "Der Äquator liegt per Definition bei 0 Grad geografischer Breite.",
      },
      {
        category: "Geschichte",
        question: "Wer war Galileo Galilei?",
        options: ["Ein italienischer Maler", "Ein Astronom und Physiker der Renaissance", "Ein römischer Feldherr", "Ein englischer Naturforscher"],
        correctIndex: 1,
        explanation: "Galilei revolutionierte im 17. Jahrhundert das Verständnis von Astronomie und Physik.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 75 Prozent von 80?",
        options: ["50", "55", "60", "65"],
        correctIndex: 2,
        explanation: "75 % von 80 = 0,75 × 80 = 60.",
      },
      {
        category: "Geografie",
        question: "Welches Land hat die Form eines Stiefels auf der Landkarte?",
        options: ["Griechenland", "Italien", "Portugal", "Kroatien"],
        correctIndex: 1,
        explanation: "Italien wird wegen seiner Umrisse oft mit einem Stiefel verglichen.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Anpassung eines Organismus an seine Umwelt über Generationen?",
        options: ["Mutation", "Evolution", "Domestikation", "Symbiose"],
        correctIndex: 1,
        explanation: "Evolution beschreibt die Veränderung von Arten über viele Generationen durch natürliche Auslese.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 60 geteilt durch 5?",
        options: ["10", "12", "14", "15"],
        correctIndex: 1,
        explanation: "60 ÷ 5 = 12.",
      },
      {
        category: "Geografie",
        question: "Welcher Staat liegt komplett innerhalb Südafrikas?",
        options: ["Lesotho", "Simbabwe", "Botswana", "Eswatini"],
        correctIndex: 0,
        explanation: "Lesotho ist vollständig von südafrikanischem Staatsgebiet umgeben.",
      },
      {
        category: "Geschichte",
        question: "Wer war Karl der Große?",
        options: ["Ein fränkischer König und römischer Kaiser", "Ein englischer König", "Ein byzantinischer Kaiser", "Ein spanischer König"],
        correctIndex: 0,
        explanation: "Karl der Große vereinte große Teile Westeuropas und wurde 800 n. Chr. zum Kaiser gekrönt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 121?",
        options: ["9", "10", "11", "12"],
        correctIndex: 2,
        explanation: "11 × 11 = 121, also ist die Quadratwurzel aus 121 gleich 11.",
      },
      {
        category: "Geografie",
        question: "Welches Land besitzt die Niagarafälle gemeinsam mit den USA?",
        options: ["Mexiko", "Kanada", "Kuba", "Kein anderes Land"],
        correctIndex: 1,
        explanation: "Die Niagarafälle liegen an der Grenze zwischen den USA und Kanada.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Wissenschaft von den Säugetieren?",
        options: ["Mammalogie", "Herpetologie", "Ornithologie", "Ichthyologie"],
        correctIndex: 0,
        explanation: "Mammalogie ist die wissenschaftliche Erforschung der Säugetiere.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 144?",
        options: ["10", "11", "12", "13"],
        correctIndex: 2,
        explanation: "12 × 12 = 144, also ist die Quadratwurzel aus 144 gleich 12.",
      },
      {
        category: "Geografie",
        question: "Welches Land liegt zwischen Indien und China im Himalaya?",
        options: ["Bhutan", "Nepal", "Beide, Bhutan und Nepal", "Myanmar"],
        correctIndex: 2,
        explanation: "Sowohl Nepal als auch Bhutan liegen im Himalaya zwischen Indien und China.",
      },
      {
        category: "Geschichte",
        question: "Wer war Barack Obama?",
        options: ["Ein britischer Premierminister", "Der 44. Präsident der USA", "Ein UN-Generalsekretär", "Ein deutscher Bundeskanzler"],
        correctIndex: 1,
        explanation: "Barack Obama war von 2009 bis 2017 der 44. Präsident der Vereinigten Staaten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 67 minus 29?",
        options: ["36", "37", "38", "39"],
        correctIndex: 2,
        explanation: "67 − 29 = 38.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt die Stadt Marrakesch nicht, sondern stattdessen Casablanca?",
        options: ["Algerien", "Marokko", "Tunesien", "Libyen"],
        correctIndex: 1,
        explanation: "Casablanca ist wie Marrakesch eine Stadt in Marokko.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Lehre von den Insekten?",
        options: ["Ornithologie", "Entomologie", "Herpetologie", "Ichthyologie"],
        correctIndex: 1,
        explanation: "Entomologie ist die wissenschaftliche Erforschung der Insekten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 108 geteilt durch 9?",
        options: ["10", "11", "12", "13"],
        correctIndex: 2,
        explanation: "108 ÷ 9 = 12.",
      },
      {
        category: "Geografie",
        question: "Welches Land hat die längste Küstenlinie der Welt?",
        options: ["Russland", "Kanada", "Indonesien", "Australien"],
        correctIndex: 1,
        explanation: "Kanada besitzt durch seine vielen Inseln und Buchten die längste Küstenlinie weltweit.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahrhundert lebte William Shakespeare?",
        options: ["15. und 16. Jahrhundert", "16. und 17. Jahrhundert", "17. und 18. Jahrhundert", "18. Jahrhundert"],
        correctIndex: 1,
        explanation: "Shakespeare lebte von 1564 bis 1616.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 25 mal 4?",
        options: ["90", "95", "100", "105"],
        correctIndex: 2,
        explanation: "25 × 4 = 100.",
      },
      {
        category: "Geografie",
        question: "Welcher Ozean grenzt an die Westküste Südamerikas?",
        options: ["Atlantik", "Pazifik", "Indischer Ozean", "Arktischer Ozean"],
        correctIndex: 1,
        explanation: "Der Pazifische Ozean liegt an der Westküste Südamerikas.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Fähigkeit von Organismen, verlorene Körperteile zu ersetzen?",
        options: ["Mutation", "Regeneration", "Metamorphose", "Adaption"],
        correctIndex: 1,
        explanation: "Regeneration beschreibt das Nachwachsen verlorener Körperteile bei bestimmten Tieren.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 100 geteilt durch 4?",
        options: ["20", "25", "30", "40"],
        correctIndex: 1,
        explanation: "100 ÷ 4 = 25.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Kilimandscharo?",
        options: ["Kenia", "Tansania", "Uganda", "Äthiopien"],
        correctIndex: 1,
        explanation: "Der Kilimandscharo, Afrikas höchster Berg, liegt in Tansania.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahrhundert fand die industrielle Revolution in Großbritannien ihren Anfang?",
        options: ["17. Jahrhundert", "18. Jahrhundert", "19. Jahrhundert", "20. Jahrhundert"],
        correctIndex: 1,
        explanation: "Die industrielle Revolution begann im späten 18. Jahrhundert in Großbritannien.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Grad hat jeder Innenwinkel in einem gleichseitigen Dreieck?",
        options: ["45 Grad", "60 Grad", "90 Grad", "120 Grad"],
        correctIndex: 1,
        explanation: "Bei einem gleichseitigen Dreieck sind alle drei Winkel gleich groß: 180° ÷ 3 = 60°.",
      },
      {
        category: "Geografie",
        question: "Welches Land liegt vollständig innerhalb von Italien?",
        options: ["Andorra", "San Marino", "Liechtenstein", "Luxemburg"],
        correctIndex: 1,
        explanation: "San Marino ist eine Enklave, vollständig von italienischem Staatsgebiet umgeben (ebenso Vatikanstadt).",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt als „Schiff der Wüste“?",
        options: ["Pferd", "Kamel", "Esel", "Lama"],
        correctIndex: 1,
        explanation: "Kamele werden wegen ihrer Eignung für lange Wüstenreisen oft „Schiffe der Wüste“ genannt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 200 geteilt durch 16?",
        options: ["11,5", "12,5", "13,5", "14,5"],
        correctIndex: 1,
        explanation: "200 ÷ 16 = 12,5.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Ätna?",
        options: ["Griechenland", "Italien", "Spanien", "Türkei"],
        correctIndex: 1,
        explanation: "Der Ätna auf Sizilien ist einer der aktivsten Vulkane Europas.",
      },
      {
        category: "Geschichte",
        question: "Welches Ereignis beendete das Römische Reich im Westen offiziell?",
        options: ["Die Absetzung von Romulus Augustulus 476 n. Chr.", "Die Schlacht von Actium", "Der Fall Konstantinopels", "Die Teilung durch Diokletian"],
        correctIndex: 0,
        explanation: "476 n. Chr. wurde der letzte weströmische Kaiser Romulus Augustulus abgesetzt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 99 minus 44?",
        options: ["53", "54", "55", "56"],
        correctIndex: 2,
        explanation: "99 − 44 = 55.",
      },
      {
        category: "Geografie",
        question: "Welcher See ist der größte Süßwassersee der Welt nach Fläche?",
        options: ["Lake Superior", "Baikalsee", "Viktoriasee", "Kaspisches Meer"],
        correctIndex: 0,
        explanation: "Der Lake Superior in Nordamerika hat die größte Fläche unter den Süßwasserseen.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Stickstoff?",
        options: ["St", "N", "Ni", "S"],
        correctIndex: 1,
        explanation: "Stickstoff wird mit „N“ abgekürzt, vom lateinischen „Nitrogenium“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Grad hat ein stumpfer Winkel mindestens?",
        options: ["Über 90 Grad", "Genau 90 Grad", "Unter 90 Grad", "Genau 180 Grad"],
        correctIndex: 0,
        explanation: "Ein stumpfer Winkel ist per Definition größer als 90 Grad und kleiner als 180 Grad.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Thailand?",
        options: ["Chiang Mai", "Bangkok", "Phuket", "Pattaya"],
        correctIndex: 1,
        explanation: "Bangkok ist die Hauptstadt und größte Stadt Thailands.",
      },
      {
        category: "Biologie",
        question: "Wie viele Arten von Wirbeltieren gibt es grob unterschieden?",
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
        explanation: "Fische, Amphibien, Reptilien, Vögel und Säugetiere gelten als die fünf klassischen Wirbeltierklassen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 144 geteilt durch 12?",
        options: ["10", "11", "12", "13"],
        correctIndex: 2,
        explanation: "144 ÷ 12 = 12.",
      },
      {
        category: "Geografie",
        question: "Welches Land liegt am nördlichsten Punkt Afrikas?",
        options: ["Marokko", "Algerien", "Tunesien", "Ägypten"],
        correctIndex: 2,
        explanation: "Kap Blanc bzw. die nördlichste Landspitze Afrikas liegt in Tunesien.",
      },
      {
        category: "Geschichte",
        question: "Welches Land erklärte 1776 seine Unabhängigkeit von Großbritannien?",
        options: ["Kanada", "USA", "Australien", "Indien"],
        correctIndex: 1,
        explanation: "Die USA erklärten 1776 ihre Unabhängigkeit von Großbritannien.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Kanten hat ein Tetraeder?",
        options: ["4", "5", "6", "8"],
        correctIndex: 2,
        explanation: "Ein Tetraeder (dreiseitige Pyramide) hat sechs Kanten.",
      },
      {
        category: "Chemie",
        question: "Welches Element wird in Thermometern traditionell als flüssiges Metall verwendet?",
        options: ["Blei", "Quecksilber", "Zinn", "Zink"],
        correctIndex: 1,
        explanation: "Quecksilber ist bei Raumtemperatur flüssig und wurde traditionell in Thermometern verwendet.",
      },
      {
        category: "Geografie",
        question: "Welches Land grenzt als einziges direkt an drei Kontinente (durch Territorien)?",
        options: ["Frankreich", "Spanien", "USA", "Russland"],
        correctIndex: 0,
        explanation: "Frankreich hat durch Überseegebiete Territorium in Europa, Amerika, Afrika, Asien und Ozeanien.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 17 mal 6?",
        options: ["96", "100", "102", "104"],
        correctIndex: 2,
        explanation: "17 × 6 = 102.",
      },
      {
        category: "Biologie",
        question: "Welches ist das einzige Säugetier, das fliegen kann?",
        options: ["Flughörnchen", "Fledermaus", "Gleitbeutler", "Flugfuchs (zählt zur Fledermaus-Gruppe)"],
        correctIndex: 1,
        explanation: "Fledermäuse sind die einzigen Säugetiere, die aktiv fliegen können.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr begann der Zweite Weltkrieg mit dem Überfall auf Polen?",
        options: ["1937", "1939", "1941", "1943"],
        correctIndex: 1,
        explanation: "Der Zweite Weltkrieg begann am 1. September 1939 mit dem deutschen Überfall auf Polen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Kanten hat ein Würfel?",
        options: ["8", "10", "12", "14"],
        correctIndex: 2,
        explanation: "Ein Würfel hat zwölf Kanten.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Si“?",
        options: ["Silber", "Silizium", "Schwefel", "Zinn"],
        correctIndex: 1,
        explanation: "Silizium wird mit „Si“ abgekürzt.",
      },
      {
        category: "Geografie",
        question: "Welches Land hat die meisten aktiven Vulkane?",
        options: ["Japan", "Indonesien", "Island", "Chile"],
        correctIndex: 1,
        explanation: "Indonesien liegt im „Pazifischen Feuerring“ und hat mehr aktive Vulkane als jedes andere Land.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 7 Fakultät (7!)?",
        options: ["2520", "3600", "5040", "6720"],
        correctIndex: 2,
        explanation: "7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040.",
      },
      {
        category: "Biologie",
        question: "Welches Organ produziert die Spermien beim Mann?",
        options: ["Prostata", "Hoden", "Nebenhoden", "Samenblase"],
        correctIndex: 1,
        explanation: "Die Spermien werden in den Hoden produziert.",
      },
      {
        category: "Geschichte",
        question: "Welches Volk gründete das antike Karthago?",
        options: ["Griechen", "Phönizier", "Römer", "Ägypter"],
        correctIndex: 1,
        explanation: "Karthago wurde von phönizischen Siedlern gegründet.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 84 geteilt durch 7?",
        options: ["10", "11", "12", "13"],
        correctIndex: 2,
        explanation: "84 ÷ 7 = 12.",
      },
      {
        category: "Chemie",
        question: "Welches Element wird für die Kernspaltung in Kernkraftwerken meist verwendet?",
        options: ["Plutonium", "Uran", "Thorium", "Radium"],
        correctIndex: 1,
        explanation: "Uran ist das gebräuchlichste Element für die Kernspaltung in Reaktoren.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Meerenge zwischen Spanien und Marokko?",
        options: ["Straße von Dover", "Straße von Gibraltar", "Bosporus", "Straße von Hormus"],
        correctIndex: 1,
        explanation: "Die Straße von Gibraltar trennt Europa und Afrika an ihrer engsten Stelle.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 48 plus 27?",
        options: ["73", "74", "75", "76"],
        correctIndex: 2,
        explanation: "48 + 27 = 75.",
      },
      {
        category: "Biologie",
        question: "Wie viele Kammern hat das Gehirn (Ventrikel) beim Menschen normalerweise?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Das menschliche Gehirn besitzt vier mit Liquor gefüllte Hohlräume, die Ventrikel.",
      },
      {
        category: "Geschichte",
        question: "Welches Land führte den ersten künstlichen Satelliten, Sputnik, ins All?",
        options: ["USA", "Sowjetunion", "Deutschland", "Großbritannien"],
        correctIndex: 1,
        explanation: "Die Sowjetunion startete 1957 mit Sputnik 1 den ersten künstlichen Erdsatelliten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 35 Prozent von 300?",
        options: ["95", "100", "105", "110"],
        correctIndex: 2,
        explanation: "35 % von 300 = 0,35 × 300 = 105.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Zinn?",
        options: ["Zi", "Sn", "Ti", "Zn"],
        correctIndex: 1,
        explanation: "Zinn wird mit „Sn“ abgekürzt, vom lateinischen „Stannum“.",
      },
      {
        category: "Geografie",
        question: "Welcher Golf trennt die arabische Halbinsel vom Iran?",
        options: ["Golf von Oman", "Persischer Golf", "Roter Meer-Golf", "Golf von Aden"],
        correctIndex: 1,
        explanation: "Der Persische Golf liegt zwischen der arabischen Halbinsel und dem Iran.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist ein Viertel von 100?",
        options: ["20", "25", "30", "35"],
        correctIndex: 1,
        explanation: "100 ÷ 4 = 25.",
      },
      {
        category: "Biologie",
        question: "Wie viele Zähne hat ein erwachsener Mensch normalerweise?",
        options: ["28", "30", "32", "34"],
        correctIndex: 2,
        explanation: "Ein Erwachsener hat normalerweise 32 Zähne, inklusive Weisheitszähne.",
      },
      {
        category: "Geschichte",
        question: "Wer war Wolfgang Amadeus Mozart zeitlich zuzuordnen?",
        options: ["Barock", "Klassik", "Romantik", "Renaissance"],
        correctIndex: 1,
        explanation: "Mozart gilt als einer der bedeutendsten Komponisten der Wiener Klassik.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 3 hoch 4 (3⁴)?",
        options: ["12", "27", "64", "81"],
        correctIndex: 3,
        explanation: "3⁴ = 3 × 3 × 3 × 3 = 81.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Natrium?",
        options: ["N", "Na", "Ni", "No"],
        correctIndex: 1,
        explanation: "Natrium wird mit „Na“ abgekürzt, vom lateinischen „Natrium“.",
      },
      {
        category: "Geografie",
        question: "Auf welchem Kontinent liegt Ägypten?",
        options: ["Asien", "Afrika", "Naher Osten (eigener Kontinent)", "Europa"],
        correctIndex: 1,
        explanation: "Ägypten liegt größtenteils in Nordafrika, ein kleiner Teil auf der Sinai-Halbinsel in Asien.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 3 hoch 3 (3³)?",
        options: ["9", "18", "27", "81"],
        correctIndex: 2,
        explanation: "3³ = 3 × 3 × 3 = 27.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Lehre von den Vögeln?",
        options: ["Ornithologie", "Herpetologie", "Ichthyologie", "Mammalogie"],
        correctIndex: 0,
        explanation: "Ornithologie ist die wissenschaftliche Erforschung der Vögel.",
      },
      {
        category: "Geschichte",
        question: "Welches Land führte die Guillotine während der Revolution ein?",
        options: ["England", "Frankreich", "Deutschland", "Russland"],
        correctIndex: 1,
        explanation: "Die Guillotine wurde während der Französischen Revolution bekannt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 24 plus 38?",
        options: ["60", "61", "62", "63"],
        correctIndex: 2,
        explanation: "24 + 38 = 62.",
      },
      {
        category: "Chemie",
        question: "Welches Gas ist für den Treibhauseffekt hauptsächlich mitverantwortlich?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Stickstoff", "Argon"],
        correctIndex: 1,
        explanation: "Kohlenstoffdioxid ist eines der wichtigsten Treibhausgase der Erdatmosphäre.",
      },
      {
        category: "Geografie",
        question: "Welches Land besitzt das Great Barrier Reef?",
        options: ["Neuseeland", "Australien", "Indonesien", "Philippinen"],
        correctIndex: 1,
        explanation: "Das Great Barrier Reef liegt vor der Nordostküste Australiens.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 13 mal 4?",
        options: ["42", "48", "52", "56"],
        correctIndex: 2,
        explanation: "13 × 4 = 52.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist für sein starkes Elektroorgan bekannt und kann Beute betäuben?",
        options: ["Rochen", "Zitteraal", "Hai", "Qualle"],
        correctIndex: 1,
        explanation: "Der Zitteraal kann Stromstöße von mehreren Hundert Volt erzeugen.",
      },
      {
        category: "Geschichte",
        question: "Welches Land war das erste, das Frauen das Wahlrecht auf nationaler Ebene gewährte?",
        options: ["USA", "Großbritannien", "Neuseeland", "Frankreich"],
        correctIndex: 2,
        explanation: "Neuseeland führte 1893 als erstes Land der Welt das Frauenwahlrecht ein.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 81?",
        options: ["7", "8", "9", "10"],
        correctIndex: 2,
        explanation: "9 × 9 = 81, also ist die Quadratwurzel aus 81 gleich 9.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Titan?",
        options: ["Ti", "Ta", "Tn", "Tt"],
        correctIndex: 0,
        explanation: "Titan wird mit „Ti“ abgekürzt.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Nationalpark Banff?",
        options: ["USA", "Kanada", "Neuseeland", "Chile"],
        correctIndex: 1,
        explanation: "Der Banff-Nationalpark liegt in den kanadischen Rocky Mountains.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 14 mal 5?",
        options: ["60", "65", "70", "75"],
        correctIndex: 2,
        explanation: "14 × 5 = 70.",
      },
      {
        category: "Biologie",
        question: "Welches Tier hat den längsten Hals im Verhältnis zu seiner Körpergröße?",
        options: ["Strauß", "Giraffe", "Schwan", "Flamingo"],
        correctIndex: 1,
        explanation: "Die Giraffe hat den längsten Hals unter den Landtieren.",
      },
      {
        category: "Geschichte",
        question: "Welcher Staat war die erste Supermacht des Kalten Krieges neben den USA?",
        options: ["China", "Sowjetunion", "Großbritannien", "Deutschland"],
        correctIndex: 1,
        explanation: "Die Sowjetunion war neben den USA die zweite große Supermacht des Kalten Krieges.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 12 mal 12?",
        options: ["124", "144", "132", "154"],
        correctIndex: 1,
        explanation: "12 × 12 = 144.",
      },
      {
        category: "Chemie",
        question: "Wie viele Edelgase gibt es in der klassischen achten Hauptgruppe (Stand aktuell)?",
        options: ["5", "6", "7", "8"],
        correctIndex: 1,
        explanation: "Helium, Neon, Argon, Krypton, Xenon und Radon zählen klassisch zu den sechs Edelgasen.",
      },
      {
        category: "Geografie",
        question: "Welches Land besitzt die Galapagos-Inseln?",
        options: ["Peru", "Ecuador", "Chile", "Kolumbien"],
        correctIndex: 1,
        explanation: "Die Galapagos-Inseln gehören zu Ecuador.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Summe der Winkel in einem Viereck?",
        options: ["180 Grad", "270 Grad", "360 Grad", "450 Grad"],
        correctIndex: 2,
        explanation: "Die Innenwinkelsumme eines Vierecks beträgt immer 360 Grad.",
      },
      {
        category: "Biologie",
        question: "Wie viele Arten von Zähnen hat ein erwachsener Mensch grob unterschieden?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Schneidezähne, Eckzähne, Backenzähne (Prämolaren und Molaren) — vier Grundtypen.",
      },
      {
        category: "Geschichte",
        question: "Wer war Elizabeth I. von England?",
        options: ["Eine mittelalterliche Königin", "Eine Tudor-Königin im 16. Jahrhundert", "Eine viktorianische Königin", "Eine moderne Königin des 20. Jahrhunderts"],
        correctIndex: 1,
        explanation: "Elizabeth I. regierte England von 1558 bis 1603 während der Tudor-Ära.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 39 plus 47?",
        options: ["84", "85", "86", "87"],
        correctIndex: 2,
        explanation: "39 + 47 = 86.",
      },
      {
        category: "Chemie",
        question: "Wie viele Hauptgruppen hat das klassische Periodensystem?",
        options: ["6", "8", "18", "32"],
        correctIndex: 2,
        explanation: "Das moderne Periodensystem ist in 18 Gruppen (Spalten) gegliedert.",
      },
      {
        category: "Geografie",
        question: "Welches Land hat die meisten Zeitzonen?",
        options: ["USA", "Russland", "Frankreich", "China"],
        correctIndex: 2,
        explanation: "Durch seine Überseegebiete erstreckt sich Frankreich über zwölf Zeitzonen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 96 geteilt durch 8?",
        options: ["10", "11", "12", "13"],
        correctIndex: 2,
        explanation: "96 ÷ 8 = 12.",
      },
      {
        category: "Biologie",
        question: "Wie viele Beine hat ein Tausendfüßler tatsächlich meist?",
        options: ["Genau 1000", "Meist deutlich weniger als 1000", "Genau 100", "Genau 500"],
        correctIndex: 1,
        explanation: "Trotz des Namens haben die meisten Tausendfüßler weit weniger als 1000 Beine, oft nur einige Hundert.",
      },
      {
        category: "Geschichte",
        question: "Wer war Sigmund Freud?",
        options: ["Ein Physiker", "Der Begründer der Psychoanalyse", "Ein Chemiker", "Ein Biologe"],
        correctIndex: 1,
        explanation: "Freud gilt als Begründer der Psychoanalyse im späten 19. und frühen 20. Jahrhundert.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 2 hoch 7 (2⁷)?",
        options: ["64", "128", "256", "512"],
        correctIndex: 1,
        explanation: "2⁷ = 128.",
      },
      {
        category: "Chemie",
        question: "Wie viele Elemente umfasst das Periodensystem ungefähr (Stand aktuell)?",
        options: ["Etwa 92", "Etwa 118", "Etwa 150", "Etwa 200"],
        correctIndex: 1,
        explanation: "Das Periodensystem umfasst derzeit 118 bekannte, offiziell benannte Elemente.",
      },
      {
        category: "Geografie",
        question: "Welches Land ist für den Eiffelturm bekannt?",
        options: ["Italien", "Frankreich", "Spanien", "Deutschland"],
        correctIndex: 1,
        explanation: "Der Eiffelturm steht in Paris, Frankreich.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Ecken hat ein Sechseck?",
        options: ["5", "6", "7", "8"],
        correctIndex: 1,
        explanation: "Ein Sechseck hat sechs Ecken, ebenso viele wie Seiten.",
      },
      {
        category: "Biologie",
        question: "Welches Tier hat das größte Gehirn im Verhältnis zu Meerestieren?",
        options: ["Delfin", "Pottwal", "Hai", "Oktopus"],
        correctIndex: 1,
        explanation: "Der Pottwal besitzt das größte Gehirn aller bekannten Tiere.",
      },
      {
        category: "Geschichte",
        question: "Welches antike Volk ist für die Olympischen Spiele bekannt, die es zuerst veranstaltete?",
        options: ["Römer", "Griechen", "Ägypter", "Perser"],
        correctIndex: 1,
        explanation: "Die antiken Olympischen Spiele wurden im antiken Griechenland ins Leben gerufen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 90 minus 37?",
        options: ["51", "52", "53", "54"],
        correctIndex: 2,
        explanation: "90 − 37 = 53.",
      },
      {
        category: "Chemie",
        question: "Welches Element ist das leichteste Metall?",
        options: ["Aluminium", "Lithium", "Magnesium", "Natrium"],
        correctIndex: 1,
        explanation: "Lithium ist das leichteste feste Metall im Periodensystem.",
      },
      {
        category: "Geografie",
        question: "Welches Land beherbergt die Ruinenstadt Petra?",
        options: ["Ägypten", "Jordanien", "Israel", "Syrien"],
        correctIndex: 1,
        explanation: "Die antike Stadt Petra liegt in Jordanien.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 49?",
        options: ["6", "7", "8", "9"],
        correctIndex: 1,
        explanation: "7 × 7 = 49, also ist die Quadratwurzel aus 49 gleich 7.",
      },
      {
        category: "Biologie",
        question: "Welches ist das giftigste Tier der Welt nach Toxizität seines Giftes?",
        options: ["Kobra", "Würfelqualle", "Skorpion", "Schwarze Witwe"],
        correctIndex: 1,
        explanation: "Die Würfelqualle gilt aufgrund ihres extrem starken Nesselgifts als eines der giftigsten Tiere überhaupt.",
      },
      {
        category: "Geschichte",
        question: "Wer war der Anführer der Bolschewiki während der Russischen Revolution?",
        options: ["Josef Stalin", "Wladimir Lenin", "Leo Trotzki", "Nikolaus II."],
        correctIndex: 1,
        explanation: "Wladimir Lenin führte die Bolschewiki 1917 zur Machtübernahme in Russland.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 6 Fakultät (6!)?",
        options: ["360", "480", "600", "720"],
        correctIndex: 3,
        explanation: "6! = 6 × 5 × 4 × 3 × 2 × 1 = 720.",
      },
      {
        category: "Chemie",
        question: "Welches Element wird für die Herstellung von Feuerwerkskörpern oft für rote Farben genutzt?",
        options: ["Kupfer", "Strontium", "Natrium", "Barium"],
        correctIndex: 1,
        explanation: "Strontiumverbindungen erzeugen die typische rote Farbe in Feuerwerk.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Machu Picchu?",
        options: ["Bolivien", "Chile", "Peru", "Ecuador"],
        correctIndex: 2,
        explanation: "Die Inka-Stadt Machu Picchu liegt in den peruanischen Anden.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Kanten hat ein Ikosaeder?",
        options: ["20", "25", "30", "35"],
        correctIndex: 2,
        explanation: "Ein Ikosaeder hat 30 Kanten.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt für den Bau komplexer Dämme?",
        options: ["Bisamratte", "Biber", "Otter", "Nutria"],
        correctIndex: 1,
        explanation: "Biber bauen aus Ästen und Schlamm beeindruckende Dämme und stauen dadurch Wasser.",
      },
      {
        category: "Geschichte",
        question: "Wer war der erste Präsident der USA?",
        options: ["Thomas Jefferson", "George Washington", "John Adams", "Abraham Lincoln"],
        correctIndex: 1,
        explanation: "George Washington war von 1789 bis 1797 erster US-Präsident.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist ein Fünftel von 100?",
        options: ["10", "15", "20", "25"],
        correctIndex: 2,
        explanation: "100 ÷ 5 = 20.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Ca“?",
        options: ["Cadmium", "Calcium", "Kohlenstoff", "Chlor"],
        correctIndex: 1,
        explanation: "Calcium wird mit „Ca“ abgekürzt.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Irland?",
        options: ["Cork", "Dublin", "Belfast", "Galway"],
        correctIndex: 1,
        explanation: "Dublin ist die Hauptstadt und größte Stadt Irlands.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Summe der Innenwinkel eines Fünfecks?",
        options: ["360 Grad", "450 Grad", "540 Grad", "600 Grad"],
        correctIndex: 2,
        explanation: "Die Innenwinkelsumme eines Fünfecks beträgt 540 Grad.",
      },
      {
        category: "Biologie",
        question: "Wie viele Beine hat eine Wespe?",
        options: ["4", "6", "8", "10"],
        correctIndex: 1,
        explanation: "Wespen sind Insekten und haben sechs Beine.",
      },
      {
        category: "Geschichte",
        question: "Wer war Franklin D. Roosevelt?",
        options: ["Ein britischer Premierminister", "Ein US-Präsident während der Weltwirtschaftskrise und des Zweiten Weltkriegs", "Ein deutscher Diplomat", "Ein französischer General"],
        correctIndex: 1,
        explanation: "Franklin D. Roosevelt führte die USA durch die Weltwirtschaftskrise und einen Großteil des Zweiten Weltkriegs.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein Fünfeck?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "Ein Fünfeck (Pentagon) hat fünf Seiten.",
      },
      {
        category: "Chemie",
        question: "Bei welcher Temperatur kocht Wasser unter Normaldruck auf Meereshöhe?",
        options: ["90 °C", "100 °C", "110 °C", "120 °C"],
        correctIndex: 1,
        explanation: "Wasser kocht bei Normaldruck auf Meereshöhe bei 100 Grad Celsius.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die größte Insel der Welt?",
        options: ["Madagaskar", "Borneo", "Grönland", "Neuguinea"],
        correctIndex: 2,
        explanation: "Grönland ist mit großem Abstand die größte Insel der Erde (Australien zählt als Kontinent).",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 40 Prozent von 250?",
        options: ["90", "95", "100", "105"],
        correctIndex: 2,
        explanation: "40 % von 250 = 0,4 × 250 = 100.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man den Winterschlaf bestimmter Tiere?",
        options: ["Torpor", "Hibernation", "Ästivation", "Diapause"],
        correctIndex: 1,
        explanation: "Hibernation ist der Fachbegriff für den echten Winterschlaf vieler Säugetiere.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die Titanic gebaut und sank?",
        options: ["1905", "1912", "1920", "1898"],
        correctIndex: 1,
        explanation: "Die Titanic sank in der Nacht vom 14. auf den 15. April 1912.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Kanten hat ein Oktaeder?",
        options: ["8", "10", "12", "14"],
        correctIndex: 2,
        explanation: "Ein Oktaeder hat zwölf Kanten.",
      },
      {
        category: "Chemie",
        question: "Welches Gas entsteht beim Verbrennen von Kohle hauptsächlich?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Stickstoff", "Wasserstoff"],
        correctIndex: 1,
        explanation: "Bei der Verbrennung von Kohlenstoffverbindungen entsteht Kohlenstoffdioxid.",
      },
      {
        category: "Alltag",
        question: "Wie viele Finger hat eine menschliche Hand normalerweise?",
        options: ["4", "5", "6", "10"],
        correctIndex: 1,
        explanation: "Eine menschliche Hand hat normalerweise fünf Finger, inklusive Daumen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Grad hat die Summe der Innenwinkel eines Vierecks?",
        options: ["180 Grad", "270 Grad", "360 Grad", "450 Grad"],
        correctIndex: 2,
        explanation: "Die Innenwinkelsumme eines Vierecks beträgt immer 360 Grad.",
      },
      {
        category: "Geografie",
        question: "Welches Land hat die meisten Einwohner der Welt (Stand 2020er-Jahre)?",
        options: ["China", "USA", "Indien", "Indonesien"],
        correctIndex: 2,
        explanation: "Indien hat China in der Einwohnerzahl mittlerweile überholt.",
      },
      {
        category: "Biologie",
        question: "Welches Tier hat drei Augenlider?",
        options: ["Hund", "Katze", "Kaninchen", "Alle genannten Tiere"],
        correctIndex: 3,
        explanation: "Viele Säugetiere, darunter Hunde, Katzen und Kaninchen, besitzen eine dritte, schützende Nickhaut.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 18 mal 3?",
        options: ["48", "51", "54", "57"],
        correctIndex: 2,
        explanation: "18 × 3 = 54.",
      },
      {
        category: "Geschichte",
        question: "Welches Land führte 1990 die Wiedervereinigung durch?",
        options: ["Österreich", "Deutschland", "Korea", "Vietnam"],
        correctIndex: 1,
        explanation: "Deutschland wurde am 3. Oktober 1990 wiedervereinigt.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Ag“?",
        options: ["Aluminium", "Silber", "Gold", "Arsen"],
        correctIndex: 1,
        explanation: "Silber wird mit „Ag“ abgekürzt, vom lateinischen „Argentum“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 7 hoch 2 (7²)?",
        options: ["14", "42", "49", "56"],
        correctIndex: 2,
        explanation: "7² = 7 × 7 = 49.",
      },
      {
        category: "Alltag",
        question: "Wie viele Grad hat ein Vollkreis?",
        options: ["180", "270", "360", "400"],
        correctIndex: 2,
        explanation: "Ein vollständiger Kreis umfasst 360 Grad.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Australien?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctIndex: 2,
        explanation: "Canberra wurde als eigens geplante Hauptstadt zwischen Sydney und Melbourne gegründet.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 2 hoch 9 (2⁹)?",
        options: ["256", "512", "1024", "2048"],
        correctIndex: 1,
        explanation: "2⁹ = 512.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt als „König der Tiere“?",
        options: ["Tiger", "Löwe", "Elefant", "Bär"],
        correctIndex: 1,
        explanation: "Der Löwe trägt traditionell den Beinamen „König der Tiere“.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr begann die Reformation durch Martin Luthers Thesenanschlag?",
        options: ["1492", "1517", "1555", "1618"],
        correctIndex: 1,
        explanation: "1517 schlug Martin Luther seine 95 Thesen an, was als Beginn der Reformation gilt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Hälfte von 250?",
        options: ["100", "115", "125", "135"],
        correctIndex: 2,
        explanation: "250 ÷ 2 = 125.",
      },
      {
        category: "Chemie",
        question: "Welches Element wird für die Herstellung von Glas hauptsächlich verwendet?",
        options: ["Silizium", "Aluminium", "Kohlenstoff", "Eisen"],
        correctIndex: 0,
        explanation: "Glas besteht hauptsächlich aus Siliziumdioxid (Quarzsand).",
      },
      {
        category: "Alltag",
        question: "Wie viele Räder hat ein klassisches Auto normalerweise?",
        options: ["2", "3", "4", "6"],
        correctIndex: 2,
        explanation: "Ein Standardauto hat vier Räder.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein Sechseck?",
        options: ["5", "6", "7", "8"],
        correctIndex: 1,
        explanation: "Ein Sechseck (Hexagon) hat sechs Seiten.",
      },
      {
        category: "Geografie",
        question: "Welcher Fluss ist der wasserreichste der Welt?",
        options: ["Nil", "Mississippi", "Amazonas", "Jangtsekiang"],
        correctIndex: 2,
        explanation: "Der Amazonas führt mehr Wasser als die nächsten sieben größten Flüsse zusammen.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist das größte lebende Reptil der Welt?",
        options: ["Komodowaran", "Saltwasserkrokodil", "Anakonda", "Galapagos-Riesenschildkröte"],
        correctIndex: 1,
        explanation: "Das Saltwasserkrokodil gilt als größtes lebendes Reptil der Erde.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Ecken hat ein Zehneck?",
        options: ["8", "9", "10", "11"],
        correctIndex: 2,
        explanation: "Ein Zehneck hat zehn Ecken, ebenso viele wie Seiten.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahrhundert fand die Renaissance hauptsächlich statt?",
        options: ["12. bis 13. Jahrhundert", "14. bis 16. Jahrhundert", "17. bis 18. Jahrhundert", "19. Jahrhundert"],
        correctIndex: 1,
        explanation: "Die Renaissance erstreckte sich hauptsächlich vom 14. bis ins 16. Jahrhundert.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Kalium?",
        options: ["Ka", "K", "Kl", "Kg"],
        correctIndex: 1,
        explanation: "Kalium wird mit „K“ abgekürzt, vom lateinischen „Kalium“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 6 hoch 3 (6³)?",
        options: ["36", "108", "216", "432"],
        correctIndex: 2,
        explanation: "6³ = 6 × 6 × 6 = 216.",
      },
      {
        category: "Kunst",
        question: "Welcher niederländische Maler ist für seine Sonnenblumen-Gemälde bekannt?",
        options: ["Rembrandt", "Vincent van Gogh", "Johannes Vermeer", "Piet Mondrian"],
        correctIndex: 1,
        explanation: "Van Goghs Sonnenblumen-Serie zählt zu seinen bekanntesten Werken.",
      },
      {
        category: "Alltag",
        question: "Wie viele Farben hat eine klassische Ampel?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Eine klassische Ampel zeigt Rot, Gelb und Grün.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 58 plus 44?",
        options: ["100", "101", "102", "103"],
        correctIndex: 2,
        explanation: "58 + 44 = 102.",
      },
      {
        category: "Geografie",
        question: "Welches Land besitzt die meisten Nachbarländer?",
        options: ["Russland", "China", "Deutschland", "Brasilien"],
        correctIndex: 1,
        explanation: "China grenzt an 14 Länder, ebenso viele wie Russland, wird aber oft als Rekordhalter genannt.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die grünen Farbstoffe in Pflanzenzellen?",
        options: ["Karotin", "Chlorophyll", "Melanin", "Anthocyan"],
        correctIndex: 1,
        explanation: "Chlorophyll ist für die grüne Farbe von Pflanzen verantwortlich und essenziell für die Fotosynthese.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 2 hoch 10 (2¹⁰)?",
        options: ["512", "1024", "2048", "4096"],
        correctIndex: 1,
        explanation: "2¹⁰ = 1024.",
      },
      {
        category: "Geschichte",
        question: "Welches Land führte als erstes die Guillotine als Hinrichtungsmethode ein?",
        options: ["England", "Frankreich", "Deutschland", "Spanien"],
        correctIndex: 1,
        explanation: "Die Guillotine wurde während der Französischen Revolution bekannt.",
      },
      {
        category: "Chemie",
        question: "Wie viele Bindungselektronen hat eine einfache kovalente Bindung typischerweise?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Eine einfache kovalente Bindung besteht aus einem gemeinsamen Elektronenpaar, also zwei Elektronen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Flächen hat ein Ikosaeder?",
        options: ["12", "16", "20", "24"],
        correctIndex: 2,
        explanation: "Ein Ikosaeder besteht aus 20 dreieckigen Flächen.",
      },
      {
        category: "Kunst",
        question: "Welches Material wird traditionell für die Skulptur „David“ von Michelangelo verwendet?",
        options: ["Bronze", "Marmor", "Holz", "Ton"],
        correctIndex: 1,
        explanation: "Michelangelos „David“ wurde aus einem einzigen Marmorblock gefertigt.",
      },
      {
        category: "Alltag",
        question: "Wie viele Punkte hat ein klassischer Würfel maximal auf einer Seite?",
        options: ["4", "5", "6", "8"],
        correctIndex: 2,
        explanation: "Ein klassischer Würfel zeigt maximal sechs Punkte auf einer Seite.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein Siebeneck?",
        options: ["6", "7", "8", "9"],
        correctIndex: 1,
        explanation: "Ein Siebeneck (Heptagon) hat sieben Seiten.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Comer See?",
        options: ["Schweiz", "Italien", "Österreich", "Frankreich"],
        correctIndex: 1,
        explanation: "Der Comer See liegt in Norditalien in der Lombardei.",
      },
      {
        category: "Biologie",
        question: "Wie viele Kammern hat das Herz eines Menschen?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Das menschliche Herz besteht aus zwei Vorhöfen und zwei Kammern.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 23 plus 19?",
        options: ["40", "41", "42", "43"],
        correctIndex: 2,
        explanation: "23 + 19 = 42.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr begann die Weltwirtschaftskrise mit dem Börsencrash in New York?",
        options: ["1919", "1929", "1939", "1949"],
        correctIndex: 1,
        explanation: "Der Börsencrash 1929 an der Wall Street löste die Weltwirtschaftskrise aus.",
      },
      {
        category: "Chemie",
        question: "Welches Gas wird zum Aufblasen von Luftballons verwendet, damit sie schweben?",
        options: ["Sauerstoff", "Wasserstoff", "Helium", "Stickstoff"],
        correctIndex: 2,
        explanation: "Helium ist leichter als Luft und ungiftig, weshalb es für schwebende Luftballons genutzt wird.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 6 hoch 2 (6²)?",
        options: ["12", "24", "36", "48"],
        correctIndex: 2,
        explanation: "6² = 6 × 6 = 36.",
      },
      {
        category: "Kunst",
        question: "Wer schuf zahlreiche Werke mit schwebenden, poetischen Motiven wie Liebespaaren über Dörfern?",
        options: ["Marc Chagall", "Wassily Kandinsky", "Paul Klee", "Joan Miró"],
        correctIndex: 0,
        explanation: "Marc Chagall ist bekannt für seine traumhaften, oft schwebenden Bildmotive.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage hat eine normale Arbeitswoche in Deutschland üblicherweise?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "Die klassische Arbeitswoche in Deutschland umfasst fünf Tage, Montag bis Freitag.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 80 Prozent von 65?",
        options: ["50", "52", "54", "56"],
        correctIndex: 1,
        explanation: "80 % von 65 = 0,8 × 65 = 52.",
      },
      {
        category: "Geografie",
        question: "Welche Stadt wird oft als „Big Apple“ bezeichnet?",
        options: ["Los Angeles", "Chicago", "New York City", "Boston"],
        correctIndex: 2,
        explanation: "New York City trägt seit Jahrzehnten den Spitznamen „Big Apple“.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Wissenschaft von den Fischen?",
        options: ["Ichthyologie", "Herpetologie", "Mammalogie", "Ornithologie"],
        correctIndex: 0,
        explanation: "Ichthyologie ist die wissenschaftliche Erforschung der Fische.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein Achteck?",
        options: ["6", "7", "8", "9"],
        correctIndex: 2,
        explanation: "Ein Achteck (Oktagon) hat acht Seiten.",
      },
      {
        category: "Geschichte",
        question: "Wer war Johannes Gutenberg?",
        options: ["Ein Maler der Renaissance", "Der Erfinder des Buchdrucks mit beweglichen Lettern", "Ein deutscher Kaiser", "Ein Komponist"],
        correctIndex: 1,
        explanation: "Gutenberg revolutionierte im 15. Jahrhundert den Buchdruck.",
      },
      {
        category: "Chemie",
        question: "Wie viele Elektronen hat ein neutrales Wasserstoffatom?",
        options: ["0", "1", "2", "3"],
        correctIndex: 1,
        explanation: "Ein neutrales Wasserstoffatom hat genau ein Elektron.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 10 mal 13?",
        options: ["110", "120", "130", "140"],
        correctIndex: 2,
        explanation: "10 × 13 = 130.",
      },
      {
        category: "Kunst",
        question: "Wer entwarf die berühmte Kathedrale Sagrada Família in Barcelona?",
        options: ["Antoni Gaudí", "Le Corbusier", "Santiago Calatrava", "Rafael Moneo"],
        correctIndex: 0,
        explanation: "Antoni Gaudí entwarf die noch unvollendete Sagrada Família in Barcelona.",
      },
      {
        category: "Alltag",
        question: "Welches Gerät nutzt man üblicherweise, um Brot zu rösten?",
        options: ["Ofen", "Toaster", "Mikrowelle", "Herd"],
        correctIndex: 1,
        explanation: "Der Toaster ist das klassische Gerät zum Rösten von Brotscheiben.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 17 plus 26?",
        options: ["41", "42", "43", "44"],
        correctIndex: 2,
        explanation: "17 + 26 = 43.",
      },
      {
        category: "Sport",
        question: "In welcher Sportart tritt man bei der Tour de France an?",
        options: ["Laufen", "Radsport", "Schwimmen", "Segeln"],
        correctIndex: 1,
        explanation: "Die Tour de France ist eines der bekanntesten Radrennen der Welt.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Große Salzsee?",
        options: ["Kanada", "USA", "Mexiko", "Bolivien"],
        correctIndex: 1,
        explanation: "Der Great Salt Lake liegt im US-Bundesstaat Utah.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 5 hoch 3 (5³)?",
        options: ["15", "25", "100", "125"],
        correctIndex: 3,
        explanation: "5³ = 5 × 5 × 5 = 125.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist für seinen extrem langsamen Stoffwechsel bekannt?",
        options: ["Schildkröte", "Faultier", "Koala", "Schnecke"],
        correctIndex: 1,
        explanation: "Das Faultier hat einen der langsamsten Stoffwechsel aller Säugetiere.",
      },
      {
        category: "Geschichte",
        question: "Wer war Mahatma Gandhi bekannt für?",
        options: ["Militärische Eroberungen", "Gewaltlosen Widerstand für Indiens Unabhängigkeit", "Die Gründung Pakistans", "Wissenschaftliche Entdeckungen"],
        correctIndex: 1,
        explanation: "Gandhi führte Indien durch gewaltlosen Widerstand in die Unabhängigkeit von Großbritannien.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 8 Fakultät (8!) geteilt durch 7 Fakultät (7!)?",
        options: ["6", "7", "8", "9"],
        correctIndex: 2,
        explanation: "8! / 7! = 8, da sich alle anderen Faktoren kürzen.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Silber?",
        options: ["Si", "Sl", "Ag", "Au"],
        correctIndex: 2,
        explanation: "Silber wird mit „Ag“ abgekürzt, vom lateinischen „Argentum“.",
      },
      {
        category: "Kunst",
        question: "Wer malte zahlreiche Werke im Stil des Kubismus zusammen mit Picasso?",
        options: ["Henri Matisse", "Georges Braque", "Paul Gauguin", "Edgar Degas"],
        correctIndex: 1,
        explanation: "Georges Braque entwickelte den Kubismus gemeinsam mit Pablo Picasso.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Ecken hat ein Würfel?",
        options: ["6", "8", "10", "12"],
        correctIndex: 1,
        explanation: "Ein Würfel hat acht Ecken.",
      },
      {
        category: "Alltag",
        question: "Welches Gerät nutzt man üblicherweise, um Geschirr zu reinigen automatisch?",
        options: ["Waschmaschine", "Geschirrspüler", "Trockner", "Staubsauger"],
        correctIndex: 1,
        explanation: "Der Geschirrspüler übernimmt automatisch die Reinigung von Geschirr.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird beim Wimbledon-Turnier gespielt?",
        options: ["Golf", "Tennis", "Cricket", "Rugby"],
        correctIndex: 1,
        explanation: "Wimbledon ist eines der bekanntesten Tennisturniere der Welt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 7 plus 8 mal 2 (Punkt-vor-Strich-Rechnung)?",
        options: ["30", "23", "22", "16"],
        correctIndex: 1,
        explanation: "Punkt-vor-Strich: 8 × 2 = 16, dann 7 + 16 = 23.",
      },
      {
        category: "Musik",
        question: "Welches Instrument spielt man, indem man hineinbläst und Löcher mit den Fingern bedeckt?",
        options: ["Trompete", "Flöte", "Klarinette (auch mit Klappen)", "Oboe (auch mit Klappen)"],
        correctIndex: 1,
        explanation: "Bei der Flöte erzeugen Fingerbewegungen über Löchern verschiedene Töne.",
      },
      {
        category: "Geografie",
        question: "Welches Land trennt die Beringstraße von den USA?",
        options: ["Kanada", "Russland", "Japan", "China"],
        correctIndex: 1,
        explanation: "Die Beringstraße trennt Alaska (USA) von Russland.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 16 mal 4?",
        options: ["54", "58", "62", "64"],
        correctIndex: 3,
        explanation: "16 × 4 = 64.",
      },
      {
        category: "Biologie",
        question: "Welches Tier gilt als das langlebigste bekannte Tier der Erde?",
        options: ["Riesenschildkröte", "Grönlandhai", "Elefant", "Papagei"],
        correctIndex: 1,
        explanation: "Der Grönlandhai kann schätzungsweise über 400 Jahre alt werden.",
      },
      {
        category: "Geschichte",
        question: "Wer war der erste Mensch im Weltall?",
        options: ["Neil Armstrong", "Juri Gagarin", "Buzz Aldrin", "Alan Shepard"],
        correctIndex: 1,
        explanation: "Juri Gagarin flog 1961 als erster Mensch ins All.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Grad hat ein spitzer Winkel maximal (per Definition)?",
        options: ["Unter 90 Grad", "Genau 90 Grad", "Zwischen 90 und 180 Grad", "Über 180 Grad"],
        correctIndex: 0,
        explanation: "Ein spitzer Winkel ist per Definition kleiner als 90 Grad.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Kupfer?",
        options: ["Ku", "Cu", "Co", "Cp"],
        correctIndex: 1,
        explanation: "Kupfer wird mit „Cu“ abgekürzt, vom lateinischen „Cuprum“.",
      },
      {
        category: "Kunst",
        question: "Wer schuf die Skulptur „Der Denker“?",
        options: ["Michelangelo", "Auguste Rodin", "Donatello", "Bernini"],
        correctIndex: 1,
        explanation: "„Der Denker“ ist eines der bekanntesten Werke des Bildhauers Auguste Rodin.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 100 minus 37?",
        options: ["61", "62", "63", "64"],
        correctIndex: 2,
        explanation: "100 − 37 = 63.",
      },
      {
        category: "Alltag",
        question: "Wie viele Kerzen stehen typischerweise auf einem Adventskranz?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Ein klassischer Adventskranz hat vier Kerzen, eine für jeden Advent.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird beim Ryder Cup gespielt?",
        options: ["Tennis", "Golf", "Segeln", "Reiten"],
        correctIndex: 1,
        explanation: "Der Ryder Cup ist ein bekanntes Golfturnier zwischen Europa und den USA.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 52 plus 39?",
        options: ["89", "90", "91", "92"],
        correctIndex: 2,
        explanation: "52 + 39 = 91.",
      },
      {
        category: "Musik",
        question: "Welche Band ist bekannt für Songs wie „Bohemian Rhapsody“?",
        options: ["Led Zeppelin", "Queen", "The Who", "Deep Purple"],
        correctIndex: 1,
        explanation: "„Bohemian Rhapsody“ ist ein bekannter Song der Band Queen.",
      },
      {
        category: "Geografie",
        question: "Welches Land umschließt Lesotho vollständig?",
        options: ["Namibia", "Südafrika", "Botswana", "Mosambik"],
        correctIndex: 1,
        explanation: "Lesotho ist eine vollständige Enklave innerhalb Südafrikas.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Summe der Zahlen von 1 bis 10?",
        options: ["45", "50", "55", "60"],
        correctIndex: 2,
        explanation: "1+2+3+...+10 = 55.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt für seine außergewöhnliche Sprungkraft im Verhältnis zur Körpergröße?",
        options: ["Floh", "Grashüpfer", "Känguru", "Frosch"],
        correctIndex: 0,
        explanation: "Der Floh kann das Vielfache seiner eigenen Körperlänge springen, relativ die stärkste Sprungleistung im Tierreich.",
      },
      {
        category: "Geschichte",
        question: "Welches Volk baute Stonehenge?",
        options: ["Kelten", "Prähistorische Bewohner Großbritanniens (genaue Identität unklar)", "Römer", "Angelsachsen"],
        correctIndex: 1,
        explanation: "Stonehenge wurde von prähistorischen Bewohnern Großbritanniens errichtet, lange vor den Kelten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 45 minus 17?",
        options: ["26", "27", "28", "29"],
        correctIndex: 2,
        explanation: "45 − 17 = 28.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat die Ordnungszahl 1 im Periodensystem?",
        options: ["Helium", "Wasserstoff", "Lithium", "Kohlenstoff"],
        correctIndex: 1,
        explanation: "Wasserstoff hat ein Proton im Kern und steht damit an erster Stelle.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Mädchen mit dem Perlenohrring“?",
        options: ["Rembrandt", "Johannes Vermeer", "Frans Hals", "Jan Steen"],
        correctIndex: 1,
        explanation: "Johannes Vermeer malte dieses berühmte Porträt im 17. Jahrhundert.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 36?",
        options: ["5", "6", "7", "8"],
        correctIndex: 1,
        explanation: "6 × 6 = 36, also ist die Quadratwurzel aus 36 gleich 6.",
      },
      {
        category: "Alltag",
        question: "Wie viele Zeitzonen umspannt Deutschland?",
        options: ["1", "2", "3", "4"],
        correctIndex: 0,
        explanation: "Deutschland liegt vollständig in einer Zeitzone, der Mitteleuropäischen Zeit.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler bilden ein Rugby-Union-Team auf dem Feld gleichzeitig?",
        options: ["11", "13", "15", "17"],
        correctIndex: 2,
        explanation: "Rugby Union wird mit 15 Spielern pro Team gleichzeitig auf dem Feld gespielt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist ein Drittel von 90?",
        options: ["20", "25", "30", "35"],
        correctIndex: 2,
        explanation: "90 ÷ 3 = 30.",
      },
      {
        category: "Musik",
        question: "Welcher Komponist war fast völlig taub, als er einige seiner berühmtesten Werke schrieb?",
        options: ["Mozart", "Beethoven", "Haydn", "Schubert"],
        correctIndex: 1,
        explanation: "Beethoven komponierte trotz fortschreitender Taubheit einige seiner bedeutendsten Werke.",
      },
      {
        category: "Geografie",
        question: "Welches Land ist der weltweit größte Inselstaat?",
        options: ["Japan", "Philippinen", "Indonesien", "Madagaskar"],
        correctIndex: 2,
        explanation: "Indonesien besteht aus über 17.000 Inseln und ist der größte Inselstaat der Welt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein Neuneck?",
        options: ["8", "9", "10", "11"],
        correctIndex: 1,
        explanation: "Ein Neuneck (Nonagon) hat neun Seiten.",
      },
      {
        category: "Biologie",
        question: "Welches Organ speichert Vitamin A und andere Nährstoffe im Körper?",
        options: ["Niere", "Leber", "Milz", "Bauchspeicheldrüse"],
        correctIndex: 1,
        explanation: "Die Leber ist der wichtigste Speicherort für viele Vitamine, darunter Vitamin A.",
      },
      {
        category: "Geschichte",
        question: "Welches Land führte 1215 mit der Magna Carta frühe Rechtsprinzipien ein?",
        options: ["Frankreich", "England", "Spanien", "Deutschland"],
        correctIndex: 1,
        explanation: "Die Magna Carta wurde 1215 in England unterzeichnet.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Sauerstoff?",
        options: ["Sa", "O", "Ox", "So"],
        correctIndex: 1,
        explanation: "Sauerstoff wird mit „O“ abgekürzt, vom englischen „Oxygen“.",
      },
      {
        category: "Kunst",
        question: "Welche Kunstform beschreibt die Herstellung von Skulpturen durch Formen von Ton oder Wachs?",
        options: ["Modellieren", "Meißeln", "Gravieren", "Ätzen"],
        correctIndex: 0,
        explanation: "Modellieren bezeichnet das Formen von weichem Material wie Ton für plastische Kunstwerke.",
      },
      {
        category: "Alltag",
        question: "Wie viele Räder hat ein klassischer Einkaufswagen üblicherweise?",
        options: ["2", "3", "4", "6"],
        correctIndex: 2,
        explanation: "Ein typischer Einkaufswagen hat vier Rollen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Spieler hat eine Curling-Mannschaft auf dem Eis?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Ein klassisches Curling-Team besteht aus vier Spielern.",
      },
      {
        category: "Musik",
        question: "Welcher Opernkomponist schrieb „La Bohème“ und „Madama Butterfly“?",
        options: ["Verdi", "Puccini", "Rossini", "Bellini"],
        correctIndex: 1,
        explanation: "Giacomo Puccini komponierte beide berühmten Opern.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 10 Prozent von 950?",
        options: ["85", "90", "95", "100"],
        correctIndex: 2,
        explanation: "10 % von 950 = 0,1 × 950 = 95.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Brasilien?",
        options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correctIndex: 2,
        explanation: "Brasília wurde 1960 als geplante neue Hauptstadt gegründet.",
      },
      {
        category: "Biologie",
        question: "Welches Organ produziert Hormone zur Regulierung des Stoffwechsels im Hals?",
        options: ["Nebenniere", "Schilddrüse", "Hypophyse", "Bauchspeicheldrüse"],
        correctIndex: 1,
        explanation: "Die Schilddrüse im Hals produziert Hormone, die den Stoffwechsel steuern.",
      },
      {
        category: "Geschichte",
        question: "Welches Land wurde als erstes durch die Atombombe angegriffen?",
        options: ["Deutschland", "Japan", "China", "Sowjetunion"],
        correctIndex: 1,
        explanation: "1945 wurden Hiroshima und Nagasaki in Japan mit Atombomben angegriffen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Gas riecht typischerweise nach faulen Eiern?",
        options: ["Kohlenstoffdioxid", "Schwefelwasserstoff", "Stickstoff", "Methan"],
        correctIndex: 1,
        explanation: "Schwefelwasserstoff (H2S) hat den charakteristischen Geruch nach faulen Eiern.",
      },
      {
        category: "Kunst",
        question: "Wer malte zahlreiche Werke im Stil des Pointillismus mit kleinen Farbpunkten?",
        options: ["Claude Monet", "Georges Seurat", "Edgar Degas", "Paul Gauguin"],
        correctIndex: 1,
        explanation: "Georges Seurat entwickelte den Pointillismus mit seiner Technik aus vielen kleinen Farbpunkten.",
      },
      {
        category: "Alltag",
        question: "Welches Gerät nutzt man typischerweise, um Wäsche zu waschen?",
        options: ["Geschirrspüler", "Waschmaschine", "Trockner", "Bügeleisen"],
        correctIndex: 1,
        explanation: "Die Waschmaschine ist das klassische Gerät zum Wäschewaschen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell mit Pfeil und Bogen auf eine Zielscheibe ausgeübt?",
        options: ["Wurfspiele", "Bogenschießen", "Speerwurf", "Darts"],
        correctIndex: 1,
        explanation: "Beim Bogenschießen wird mit Pfeil und Bogen auf eine Zielscheibe geschossen.",
      },
      {
        category: "Musik",
        question: "Welches Instrument gehört zur Familie der Blechblasinstrumente?",
        options: ["Klarinette", "Trompete", "Flöte", "Fagott"],
        correctIndex: 1,
        explanation: "Die Trompete ist ein klassisches Blechblasinstrument.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Flächen hat ein Tetraeder?",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "Ein Tetraeder besteht aus vier dreieckigen Flächen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land besteht aus vier Hauptinseln und wird oft „Inselreich“ genannt?",
        options: ["Philippinen", "Japan", "Indonesien", "Neuseeland"],
        correctIndex: 1,
        explanation: "Japan besteht aus den vier Hauptinseln Honshu, Hokkaido, Kyushu und Shikoku sowie vielen kleineren.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Anpassung von Tieren an dauerhafte Dunkelheit, z. B. in Höhlen?",
        options: ["Mimikry", "Troglobiontismus (Höhlenanpassung)", "Kryptobiose", "Diapause"],
        correctIndex: 1,
        explanation: "Tiere, die dauerhaft in Höhlen leben, entwickeln oft spezielle Anpassungen an die Dunkelheit.",
      },
      {
        category: "Geschichte",
        question: "Welches Reich wurde von Dschingis Khan gegründet?",
        options: ["Osmanisches Reich", "Mongolisches Reich", "Persisches Reich", "Byzantinisches Reich"],
        correctIndex: 1,
        explanation: "Dschingis Khan gründete im 13. Jahrhundert das Mongolische Reich, das größte zusammenhängende Landreich der Geschichte.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Gas ist hochentzündlich und wurde früher in Zeppelinen verwendet?",
        options: ["Helium", "Wasserstoff", "Sauerstoff", "Stickstoff"],
        correctIndex: 1,
        explanation: "Wasserstoff ist leicht, aber hochentzündlich, weshalb Zeppeline später auf Helium umstiegen.",
      },
      {
        category: "Kunst",
        question: "Welche Kunstepoche wird oft mit üppigen, dramatischen und kontrastreichen Werken assoziiert, u. a. bei Caravaggio?",
        options: ["Renaissance", "Barock", "Klassizismus", "Rokoko"],
        correctIndex: 1,
        explanation: "Der Barock zeichnet sich durch dramatische Licht-Schatten-Effekte und Opulenz aus.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage dauert eine normale Schwangerschaft beim Menschen ungefähr?",
        options: ["Etwa 200", "Etwa 280", "Etwa 350", "Etwa 400"],
        correctIndex: 1,
        explanation: "Eine menschliche Schwangerschaft dauert im Durchschnitt etwa 40 Wochen, also rund 280 Tage.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell bei der Formel 1 ausgetragen?",
        options: ["Motorradrennen", "Autorennen", "Radrennen", "Bootsrennen"],
        correctIndex: 1,
        explanation: "Die Formel 1 ist die höchste Klasse des internationalen Formel-Automobilrennsports.",
      },
      {
        category: "Musik",
        question: "Wie viele Pedale hat ein klassisches Klavier üblicherweise?",
        options: ["1", "2", "3", "4"],
        correctIndex: 2,
        explanation: "Ein modernes Klavier hat meist drei Pedale: Forte-, Sostenuto- und Una-Corda-Pedal.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 9 mal 6?",
        options: ["45", "48", "54", "56"],
        correctIndex: 2,
        explanation: "9 × 6 = 54.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welche Stadt liegt an zwei Kontinenten?",
        options: ["Kairo", "Moskau", "Istanbul", "Baku"],
        correctIndex: 2,
        explanation: "Istanbul liegt teils in Europa, teils in Asien, getrennt durch den Bosporus.",
      },
      {
        category: "Biologie",
        question: "Welches Tier legt die größten Eier der Welt (relativ zu heutigen Vögeln)?",
        options: ["Pinguin", "Strauß", "Kiwi", "Adler"],
        correctIndex: 1,
        explanation: "Straußeneier sind die größten Eier lebender Vogelarten.",
      },
      {
        category: "Geschichte",
        question: "Wer war Kleopatra?",
        options: ["Eine römische Kaiserin", "Die letzte Pharaonin des Alten Ägypten", "Eine griechische Philosophin", "Eine persische Königin"],
        correctIndex: 1,
        explanation: "Kleopatra VII. war die letzte regierende Pharaonin Ägyptens.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Gas wird beim Atmen von Fischen unter Wasser aus dem Wasser aufgenommen?",
        options: ["Kohlenstoffdioxid", "Sauerstoff", "Stickstoff", "Wasserstoff"],
        correctIndex: 1,
        explanation: "Fische entnehmen über die Kiemen gelösten Sauerstoff aus dem Wasser.",
      },
      {
        category: "Kunst",
        question: "Welche Kunstform verwendet farbiges Glas, das zu Bildern zusammengesetzt wird?",
        options: ["Mosaik", "Glasmalerei", "Fresko", "Aquarell"],
        correctIndex: 1,
        explanation: "Glasmalerei nutzt bemaltes und zusammengesetztes farbiges Glas, oft in Kirchenfenstern.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage hat ein Schaltjahr?",
        options: ["364", "365", "366", "367"],
        correctIndex: 2,
        explanation: "Ein Schaltjahr hat aufgrund des zusätzlichen Tages im Februar 366 Tage.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell auf einer Aschebahn oder modernen Tartanbahn ausgetragen?",
        options: ["Turnen", "Leichtathletik", "Schwimmen", "Radsport"],
        correctIndex: 1,
        explanation: "Leichtathletik-Wettkämpfe finden klassisch auf einer Rundbahn statt, früher aus Asche, heute meist Tartan.",
      },
      {
        category: "Musik",
        question: "Welche Musikrichtung entstand auf Jamaika, bekannt durch Bob Marley?",
        options: ["Ska", "Reggae", "Calypso", "Soca"],
        correctIndex: 1,
        explanation: "Reggae wurde durch Bob Marley weltweit bekannt.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 27 mal 3?",
        options: ["78", "81", "84", "87"],
        correctIndex: 1,
        explanation: "27 × 3 = 81.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welcher Staat liegt zwischen Frankreich und Spanien in den Pyrenäen?",
        options: ["Monaco", "Andorra", "Liechtenstein", "San Marino"],
        correctIndex: 1,
        explanation: "Andorra liegt eingebettet in den Pyrenäen zwischen Frankreich und Spanien.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man Pflanzen, die kein Licht zum Überleben brauchen?",
        options: ["Es gibt keine solche Pflanze — alle Pflanzen brauchen Licht zur Fotosynthese", "Pilze", "Moose", "Farne"],
        correctIndex: 0,
        explanation: "Echte Pflanzen benötigen Licht für die Fotosynthese; lichtunabhängige Organismen wie Pilze zählen botanisch nicht als Pflanzen.",
      },
      {
        category: "Geschichte",
        question: "Wer regierte England während der meisten viktorianischen Ära?",
        options: ["Königin Elizabeth I.", "Königin Victoria", "König Georg III.", "Königin Anne"],
        correctIndex: 1,
        explanation: "Königin Victoria regierte von 1837 bis 1901.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Chlor?",
        options: ["Ch", "Cl", "Co", "Cr"],
        correctIndex: 1,
        explanation: "Chlor wird mit „Cl“ abgekürzt.",
      },
      {
        category: "Kunst",
        question: "Welche Technik verwendet aufgetragene Farbpigmente auf frisch verputzte Wände?",
        options: ["Ölmalerei", "Fresko", "Aquarell", "Gouache"],
        correctIndex: 1,
        explanation: "Beim Fresko wird die Farbe auf noch feuchten Putz aufgetragen, wodurch sie sich fest verbindet.",
      },
      {
        category: "Alltag",
        question: "Wie viele Farben hat die olympische Flagge inklusive Hintergrund?",
        options: ["4", "5", "6", "7"],
        correctIndex: 2,
        explanation: "Die olympische Flagge zeigt fünf farbige Ringe auf weißem Hintergrund, also insgesamt sechs Farben.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart wird auf einem Court mit Netz und einem gelben Filzball gespielt?",
        options: ["Badminton", "Tennis", "Tischtennis", "Squash"],
        correctIndex: 1,
        explanation: "Beim Tennis wird ein Filzball über ein Netz geschlagen.",
      },
      {
        category: "Musik",
        question: "Welche Band ist bekannt für den Song „Hotel California“?",
        options: ["Fleetwood Mac", "Eagles", "The Doors", "The Byrds"],
        correctIndex: 1,
        explanation: "„Hotel California“ ist einer der bekanntesten Songs der Band Eagles.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 8 mal 9?",
        options: ["63", "70", "72", "81"],
        correctIndex: 2,
        explanation: "8 × 9 = 72.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land ist bekannt für den Bau der Chinesischen Mauer?",
        options: ["Japan", "China", "Mongolei", "Korea"],
        correctIndex: 1,
        explanation: "Die Chinesische Mauer wurde über Jahrhunderte in China errichtet.",
      },
      {
        category: "Biologie",
        question: "Wie viele Beine hat ein Skorpion?",
        options: ["6", "8", "10", "12"],
        correctIndex: 1,
        explanation: "Skorpione gehören zu den Spinnentieren und haben acht Beine.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahrzehnt begann die Mondlandungs-Ära der USA?",
        options: ["1950er", "1960er", "1970er", "1980er"],
        correctIndex: 1,
        explanation: "Das Apollo-Programm der NASA lief maßgeblich in den 1960er Jahren.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches chemische Symbol steht für Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctIndex: 2,
        explanation: "Das Symbol „Au“ kommt vom lateinischen Wort „Aurum“ für Gold.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Das letzte Abendmahl“?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raffael", "Caravaggio"],
        correctIndex: 1,
        explanation: "Leonardo da Vinci malte „Das letzte Abendmahl“ als Wandgemälde in Mailand.",
      },
      {
        category: "Alltag",
        question: "Wie viele Kilometer entsprechen ungefähr einer Meile?",
        options: ["1", "1,6", "2", "3"],
        correctIndex: 1,
        explanation: "Eine Meile entspricht etwa 1,6 Kilometern.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart nutzt ein Board zum Reiten auf Wellen im Meer?",
        options: ["Windsurfen", "Surfen", "Kitesurfen", "Wakeboarden"],
        correctIndex: 1,
        explanation: "Beim klassischen Surfen wird ohne Segel oder Drachen auf Wellen geritten.",
      },
      {
        category: "Musik",
        question: "Wie viele Tasten hat ein klassisches Klavier üblicherweise?",
        options: ["76", "88", "96", "104"],
        correctIndex: 1,
        explanation: "Ein Standard-Klavier hat 88 Tasten.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Pippi Langstrumpf“?",
        options: ["Astrid Lindgren", "Tove Jansson", "Selma Lagerlöf", "Maria Gripe"],
        correctIndex: 0,
        explanation: "Die schwedische Autorin Astrid Lindgren schuf die Figur der Pippi Langstrumpf.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 2 hoch 6 (2⁶)?",
        options: ["32", "48", "64", "128"],
        correctIndex: 2,
        explanation: "2⁶ = 64.",
      },
      {
        category: "Geografie",
        question: "Welches Land grenzt sowohl an den Atlantik als auch an den Pazifik?",
        options: ["Argentinien", "Kolumbien", "Brasilien", "Peru"],
        correctIndex: 1,
        explanation: "Kolumbien hat Küsten sowohl am Pazifik als auch am Atlantik (Karibik).",
      },
      {
        category: "Biologie",
        question: "Welches Organ ist beim Menschen für das Riechen zuständig?",
        options: ["Nase (Riechschleimhaut)", "Zunge", "Rachen", "Kehlkopf"],
        correctIndex: 0,
        explanation: "Die Riechschleimhaut in der Nase nimmt Duftmoleküle wahr.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Welches Volk erbaute Machu Picchu?",
        options: ["Azteken", "Maya", "Inka", "Olmeken"],
        correctIndex: 2,
        explanation: "Machu Picchu wurde von den Inka im 15. Jahrhundert erbaut.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Platin?",
        options: ["Pl", "Pt", "Pa", "Po"],
        correctIndex: 1,
        explanation: "Platin wird mit „Pt“ abgekürzt.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Die Geburt der Venus“?",
        options: ["Michelangelo", "Sandro Botticelli", "Raffael", "Tizian"],
        correctIndex: 1,
        explanation: "„Die Geburt der Venus“ ist eines der Hauptwerke von Sandro Botticelli.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Karten hat ein klassisches Skatblatt?",
        options: ["24", "32", "36", "52"],
        correctIndex: 1,
        explanation: "Ein deutsches Skatblatt besteht aus 32 Karten.",
      },
      {
        category: "Sport",
        question: "Wie viele Athleten treten beim Biathlon Schießdisziplinen typischerweise pro Schießeinlage an Scheiben an?",
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
        explanation: "Beim Biathlon müssen Athleten pro Schießeinlage auf fünf Scheiben schießen.",
      },
      {
        category: "Musik",
        question: "Wie viele Oktaven hat ein Standard-Klavier ungefähr?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        explanation: "Ein Standard-Klavier deckt etwas mehr als sieben Oktaven ab.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Der Herr der Ringe“?",
        options: ["George R.R. Martin", "J.R.R. Tolkien", "C.S. Lewis", "Terry Pratchett"],
        correctIndex: 1,
        explanation: "J.R.R. Tolkien schrieb die Fantasy-Trilogie „Der Herr der Ringe“.",
      },
      {
        category: "Technik",
        question: "Wer erfand den World Wide Web-Standard?",
        options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Vint Cerf"],
        correctIndex: 1,
        explanation: "Tim Berners-Lee entwickelte 1989 das World Wide Web.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Grad hat ein gestreckter Winkel?",
        options: ["90 Grad", "180 Grad", "270 Grad", "360 Grad"],
        correctIndex: 1,
        explanation: "Ein gestreckter Winkel beträgt genau 180 Grad.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land ist bekannt für seine vielen Fjorde?",
        options: ["Schweden", "Norwegen", "Finnland", "Dänemark"],
        correctIndex: 1,
        explanation: "Norwegens zerklüftete Küste ist berühmt für ihre tiefen Fjorde.",
      },
      {
        category: "Biologie",
        question: "Wie viele Arten von Blutgefäßen gibt es grundlegend im Körper?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Arterien, Venen und Kapillaren bilden die drei Grundtypen von Blutgefäßen.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr endete der Zweite Weltkrieg vollständig (mit Japans Kapitulation)?",
        options: ["1944", "1945", "1946", "1947"],
        correctIndex: 1,
        explanation: "Der Zweite Weltkrieg endete 1945 mit der Kapitulation Japans im September.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Mangan?",
        options: ["Mg", "Mn", "Ma", "Mo"],
        correctIndex: 1,
        explanation: "Mangan wird mit „Mn“ abgekürzt.",
      },
      {
        category: "Kunst",
        question: "Wer entwarf die Pyramide vor dem Louvre in Paris?",
        options: ["Le Corbusier", "I. M. Pei", "Jean Nouvel", "Renzo Piano"],
        correctIndex: 1,
        explanation: "Der Architekt I. M. Pei entwarf die gläserne Pyramide vor dem Louvre.",
      },
      {
        category: "Alltag",
        question: "Wie viele Stunden hat ein Tag?",
        options: ["12", "24", "36", "48"],
        correctIndex: 1,
        explanation: "Ein Tag hat 24 Stunden.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell im „Ring“ mit Handschuhen ausgetragen?",
        options: ["Ringen", "Boxen", "Judo", "Fechten"],
        correctIndex: 1,
        explanation: "Boxen wird mit gepolsterten Handschuhen in einem quadratischen Ring ausgetragen.",
      },
      {
        category: "Musik",
        question: "Wie viele Hauptstimmen hat ein klassischer Chor typischerweise?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Ein klassischer gemischter Chor gliedert sich meist in Sopran, Alt, Tenor und Bass.",
      },
      {
        category: "Literatur",
        question: "Welcher Autor schrieb „Der Prozess“?",
        options: ["Franz Kafka", "Robert Musil", "Hermann Broch", "Alfred Döblin"],
        correctIndex: 0,
        explanation: "Franz Kafka schrieb den postum veröffentlichten Roman „Der Prozess“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „IoT“?",
        options: ["Internet of Things", "Input Output Terminal", "Integrated Operations Technology", "Internal Object Transfer"],
        correctIndex: 0,
        explanation: "IoT steht für „Internet of Things“, das Internet der Dinge.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 9 hoch 2 (9²)?",
        options: ["72", "81", "90", "99"],
        correctIndex: 1,
        explanation: "9² = 9 × 9 = 81.",
      },
      {
        category: "Geografie",
        question: "Welches Land hat mit den USA die längste Landgrenze?",
        options: ["Mexiko", "Kanada", "Kuba", "Kein direktes Nachbarland"],
        correctIndex: 1,
        explanation: "Die Grenze zwischen den USA und Kanada ist die längste gemeinsame Landgrenze zweier Staaten weltweit.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Organ produziert Insulin?",
        options: ["Leber", "Niere", "Bauchspeicheldrüse", "Milz"],
        correctIndex: 2,
        explanation: "Die Bauchspeicheldrüse produziert Insulin zur Regulierung des Blutzuckerspiegels.",
      },
      {
        category: "Geschichte",
        question: "Welches antike Reich erbaute das Kolosseum?",
        options: ["Griechisches Reich", "Römisches Reich", "Ägyptisches Reich", "Persisches Reich"],
        correctIndex: 1,
        explanation: "Das Kolosseum in Rom wurde vom Römischen Reich im 1. Jahrhundert n. Chr. errichtet.",
      },
      {
        category: "Chemie",
        question: "Welches Element ist der Hauptbestandteil von Halbleitern in Computerchips?",
        options: ["Kohlenstoff", "Silizium", "Germanium", "Gallium"],
        correctIndex: 1,
        explanation: "Silizium ist das am häufigsten verwendete Halbleitermaterial in der Elektronik.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Welche Farbe entsteht beim Mischen von Blau und Gelb in der klassischen Farbenlehre?",
        options: ["Orange", "Grün", "Violett", "Braun"],
        correctIndex: 1,
        explanation: "Blau und Gelb ergeben als subtraktive Mischung Grün.",
      },
      {
        category: "Alltag",
        question: "Wie viele Zähne hat ein Baby normalerweise am Ende des Milchgebisses?",
        options: ["16", "18", "20", "22"],
        correctIndex: 2,
        explanation: "Das vollständige Milchgebiss besteht aus 20 Zähnen.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird mit Schlittschuhen, einem Puck und Schlägern auf Eis gespielt?",
        options: ["Eiskunstlauf", "Eishockey", "Curling", "Bobfahren"],
        correctIndex: 1,
        explanation: "Beim Eishockey wird ein Puck mit Schlägern ins gegnerische Tor befördert.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welcher Komponist schrieb „Die Zauberflöte“?",
        options: ["Beethoven", "Mozart", "Haydn", "Schubert"],
        correctIndex: 1,
        explanation: "Wolfgang Amadeus Mozart komponierte die Oper „Die Zauberflöte“ 1791.",
      },
      {
        category: "Literatur",
        question: "Welche Dichterin schrieb zahlreiche Gedichte und lebte weitgehend zurückgezogen in Amherst, USA?",
        options: ["Sylvia Plath", "Emily Dickinson", "Maya Angelou", "Elizabeth Bishop"],
        correctIndex: 1,
        explanation: "Emily Dickinson schrieb fast 1800 Gedichte, von denen zu Lebzeiten nur wenige veröffentlicht wurden.",
      },
      {
        category: "Technik",
        question: "Wer entwickelte das erste praktikable Dampfmaschinen-Design entscheidend weiter im 18. Jahrhundert?",
        options: ["Thomas Newcomen", "James Watt", "George Stephenson", "Richard Trevithick"],
        correctIndex: 1,
        explanation: "James Watt verbesserte 1769 die Dampfmaschine entscheidend und machte sie effizienter.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Summe der Zahlen von 1 bis 5?",
        options: ["10", "12", "15", "20"],
        correctIndex: 2,
        explanation: "1+2+3+4+5 = 15.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Landenge, die Nord- und Südamerika verbindet?",
        options: ["Isthmus von Suez", "Isthmus von Panama", "Golf von Mexiko", "Karibisches Becken"],
        correctIndex: 1,
        explanation: "Der Isthmus von Panama verbindet die beiden amerikanischen Kontinente.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Wissenschaft von den Pilzen?",
        options: ["Botanik", "Zoologie", "Mykologie", "Mikrobiologie"],
        correctIndex: 2,
        explanation: "Mykologie ist die Lehre von den Pilzen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Wer war Winston Churchill?",
        options: ["Ein US-Präsident", "Britischer Premierminister während des Zweiten Weltkriegs", "Ein französischer General", "Ein deutscher Diplomat"],
        correctIndex: 1,
        explanation: "Churchill führte Großbritannien als Premierminister durch den Zweiten Weltkrieg.",
      },
      {
        category: "Chemie",
        question: "Wie viele Valenzelektronen hat ein Element der ersten Hauptgruppe typischerweise?",
        options: ["1", "2", "3", "4"],
        correctIndex: 0,
        explanation: "Elemente der ersten Hauptgruppe, wie Natrium oder Kalium, haben ein Valenzelektron.",
      },
      {
        category: "Kunst",
        question: "Welcher anonyme Streetart-Künstler ist für Werke wie „Girl with Balloon“ bekannt?",
        options: ["Banksy", "Shepard Fairey", "Invader", "JR"],
        correctIndex: 0,
        explanation: "Banksy bleibt anonym, seine Werke wie „Girl with Balloon“ sind weltberühmt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Tage hat der Monat Februar in einem normalen Jahr?",
        options: ["27", "28", "29", "30"],
        correctIndex: 1,
        explanation: "Der Februar hat in einem normalen Jahr 28 Tage, in Schaltjahren 29.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird auf einer Bahn mit Hürden und Sprints ausgetragen?",
        options: ["Leichtathletik", "Turnen", "Schwimmen", "Radsport"],
        correctIndex: 0,
        explanation: "Hürdenlauf und Sprints zählen zu den klassischen Disziplinen der Leichtathletik.",
      },
      {
        category: "Musik",
        question: "Wie viele Saiten hat eine klassische Gitarre üblicherweise?",
        options: ["4", "5", "6", "7"],
        correctIndex: 2,
        explanation: "Eine klassische Konzertgitarre hat sechs Saiten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Momo“, das Buch über die Zeitdiebe?",
        options: ["Erich Kästner", "Michael Ende", "Otfried Preußler", "Cornelia Funke"],
        correctIndex: 1,
        explanation: "Michael Ende schrieb den Kinderbuchklassiker „Momo“.",
      },
      {
        category: "Technik",
        question: "Wer gilt als „Vater“ des modernen Computers durch sein theoretisches Konzept der analytical engine?",
        options: ["Alan Turing", "Charles Babbage", "John von Neumann", "Konrad Zuse"],
        correctIndex: 1,
        explanation: "Charles Babbage entwarf im 19. Jahrhundert die theoretische „Analytical Engine“, einen Vorläufer moderner Computer.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 45 Prozent von 200?",
        options: ["80", "85", "90", "95"],
        correctIndex: 2,
        explanation: "45 % von 200 = 0,45 × 200 = 90.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Ägypten?",
        options: ["Alexandria", "Kairo", "Gizeh", "Luxor"],
        correctIndex: 1,
        explanation: "Kairo ist die Hauptstadt und größte Stadt Ägyptens.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt für seine Fähigkeit, sich in einen Kokon zu verpuppen?",
        options: ["Käfer", "Schmetterling (Raupe)", "Ameise", "Biene"],
        correctIndex: 1,
        explanation: "Raupen verpuppen sich in einem Kokon, bevor sie zu Schmetterlingen werden.",
      },
      {
        category: "Geschichte",
        question: "Welches Land besaß im 19. Jahrhundert das größte Kolonialreich der Welt?",
        options: ["Frankreich", "Großbritannien", "Spanien", "Niederlande"],
        correctIndex: 1,
        explanation: "Das britische Kolonialreich war im 19. Jahrhundert das größte der Welt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Gas macht den größten Anteil der Erdatmosphäre aus?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Stickstoff", "Argon"],
        correctIndex: 2,
        explanation: "Stickstoff macht etwa 78 % der Erdatmosphäre aus.",
      },
      {
        category: "Kunst",
        question: "Welcher Künstler malte „Der Kuss“ mit goldenen Ornamenten?",
        options: ["Egon Schiele", "Gustav Klimt", "Oskar Kokoschka", "Alfons Mucha"],
        correctIndex: 1,
        explanation: "„Der Kuss“ ist eines der berühmtesten Werke von Gustav Klimt.",
      },
      {
        category: "Alltag",
        question: "Wie viele Eier sind üblicherweise in einem Standard-Eierkarton in Deutschland?",
        options: ["6", "10", "12", "20"],
        correctIndex: 1,
        explanation: "In Deutschland sind Eierkartons meist für 10 Eier ausgelegt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Spieler bilden ein Beachvolleyball-Team?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Beachvolleyball wird klassisch im Zweier-Team gespielt.",
      },
      {
        category: "Musik",
        question: "Wie viele Sätze hat eine klassische Sinfonie üblicherweise?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Eine klassische Sinfonie besteht traditionell aus vier Sätzen.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Die Schatzinsel“?",
        options: ["Jules Verne", "Robert Louis Stevenson", "Mark Twain", "Herman Melville"],
        correctIndex: 1,
        explanation: "Robert Louis Stevenson schrieb den Abenteuerroman „Die Schatzinsel“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wer entwickelte den ersten funktionsfähigen elektronischen Computer maßgeblich mit, ENIAC genannt?",
        options: ["Alan Turing", "John Mauchly und J. Presper Eckert", "Charles Babbage", "Konrad Zuse"],
        correctIndex: 1,
        explanation: "ENIAC wurde von John Mauchly und J. Presper Eckert entwickelt und 1945 fertiggestellt.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Diagonalen hat ein Sechseck?",
        options: ["6", "7", "8", "9"],
        correctIndex: 3,
        explanation: "Ein Sechseck hat genau neun Diagonalen.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Südkorea?",
        options: ["Busan", "Seoul", "Incheon", "Daegu"],
        correctIndex: 1,
        explanation: "Seoul ist die Hauptstadt und größte Stadt Südkoreas.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Organ produziert Galle?",
        options: ["Gallenblase", "Leber", "Bauchspeicheldrüse", "Magen"],
        correctIndex: 1,
        explanation: "Die Leber produziert die Galle, die in der Gallenblase gespeichert wird.",
      },
      {
        category: "Geschichte",
        question: "Welches Ereignis löste den Ersten Weltkrieg aus?",
        options: ["Der Angriff auf Pearl Harbor", "Das Attentat von Sarajevo", "Die Oktoberrevolution", "Der Fall von Konstantinopel"],
        correctIndex: 1,
        explanation: "Das Attentat auf Erzherzog Franz Ferdinand 1914 in Sarajevo löste den Ersten Weltkrieg aus.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Cl“?",
        options: ["Kohlenstoff", "Chlor", "Kalzium", "Chrom"],
        correctIndex: 1,
        explanation: "Chlor wird mit „Cl“ abgekürzt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer schuf die Pietà in der Petersbasilika?",
        options: ["Donatello", "Michelangelo", "Bernini", "Raffael"],
        correctIndex: 1,
        explanation: "Michelangelos Pietà zeigt Maria mit dem toten Jesus und steht im Petersdom in Rom.",
      },
      {
        category: "Alltag",
        question: "Wie viele Zentimeter hat ein Meter?",
        options: ["10", "100", "1000", "10000"],
        correctIndex: 1,
        explanation: "Ein Meter entspricht 100 Zentimetern.",
      },
      {
        category: "Sport",
        question: "Wie viele Runden hat ein klassischer Boxkampf im Profiboxen maximal üblicherweise?",
        options: ["8", "10", "12", "15"],
        correctIndex: 2,
        explanation: "Profi-Weltmeisterschaftskämpfe im Boxen gehen üblicherweise über maximal 12 Runden.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie viele Saiten hat eine klassische Violine?",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "Eine Violine hat vier Saiten.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Romeo und Julia“?",
        options: ["Charles Dickens", "William Shakespeare", "Oscar Wilde", "Jane Austen"],
        correctIndex: 1,
        explanation: "William Shakespeare schrieb die berühmte Tragödie „Romeo und Julia“.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „LED“?",
        options: ["Light Emitting Diode", "Low Energy Device", "Linear Electric Diode", "Light Efficient Display"],
        correctIndex: 0,
        explanation: "LED steht für „Light Emitting Diode“, eine lichtemittierende Diode.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 81 minus 36?",
        options: ["43", "44", "45", "46"],
        correctIndex: 2,
        explanation: "81 − 36 = 45.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Norwegen?",
        options: ["Bergen", "Trondheim", "Oslo", "Stavanger"],
        correctIndex: 2,
        explanation: "Oslo ist die Hauptstadt und größte Stadt Norwegens.",
      },
      {
        category: "Biologie",
        question: "Wie viele Beine hat eine Ameise?",
        options: ["4", "6", "8", "10"],
        correctIndex: 1,
        explanation: "Ameisen sind Insekten und haben wie alle Insekten sechs Beine.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Welche Dynastie erbaute die Verbotene Stadt in Peking?",
        options: ["Han-Dynastie", "Ming-Dynastie", "Tang-Dynastie", "Qing-Dynastie (Erweiterung)"],
        correctIndex: 1,
        explanation: "Die Verbotene Stadt wurde während der Ming-Dynastie im frühen 15. Jahrhundert erbaut.",
      },
      {
        category: "Chemie",
        question: "Welches Gas wird beim Backen mit Backpulver freigesetzt und lockert den Teig?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Wasserstoff", "Stickstoff"],
        correctIndex: 1,
        explanation: "Backpulver setzt beim Erhitzen Kohlenstoffdioxid frei, das den Teig auflockert.",
      },
      {
        category: "Kunst",
        question: "Wer schuf die Bronzeskulptur „Der Kuss“?",
        options: ["Auguste Rodin", "Camille Claudel", "Constantin Brâncuși", "Henry Moore"],
        correctIndex: 0,
        explanation: "Auguste Rodin schuf neben „Der Denker“ auch die Skulptur „Der Kuss“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Tage hat der Monat Juni?",
        options: ["28", "29", "30", "31"],
        correctIndex: 2,
        explanation: "Der Juni hat 30 Tage.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird auf einem Court mit einem Federball gespielt?",
        options: ["Tennis", "Badminton", "Squash", "Tischtennis"],
        correctIndex: 1,
        explanation: "Badminton wird mit einem Federball (Shuttle) über ein Netz gespielt.",
      },
      {
        category: "Musik",
        question: "Wie viele Trommeln hat ein klassisches Schlagzeug-Set mindestens typischerweise?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Ein Standard-Schlagzeug-Set umfasst meist mindestens Bassdrum, Snare, und zwei Toms.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Rotkäppchen“ in der bekanntesten deutschen Fassung?",
        options: ["Hans Christian Andersen", "Die Gebrüder Grimm", "Wilhelm Hauff", "Theodor Storm"],
        correctIndex: 1,
        explanation: "Die Gebrüder Grimm veröffentlichten „Rotkäppchen“ in ihrer bekannten Märchensammlung.",
      },
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte den Suchmaschinenriesen Google?",
        options: ["Microsoft", "Larry Page und Sergey Brin (Google)", "Yahoo", "Apple"],
        correctIndex: 1,
        explanation: "Larry Page und Sergey Brin gründeten Google 1998 als Studenten.",
      },
      {
        category: "Astronomie",
        question: "Welcher Stern steht im Zentrum unseres Sonnensystems?",
        options: ["Ein Roter Riese", "Die Sonne", "Sirius", "Beteigeuze"],
        correctIndex: 1,
        explanation: "Die Sonne ist der zentrale Stern unseres Sonnensystems.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Regisseur schuf die „Star Wars“-Saga?",
        options: ["Steven Spielberg", "George Lucas", "James Cameron", "Ridley Scott"],
        correctIndex: 1,
        explanation: "George Lucas schuf die „Star Wars“-Filmreihe.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 25 Prozent von 400?",
        options: ["50", "75", "100", "125"],
        correctIndex: 2,
        explanation: "25 % von 400 = 0,25 × 400 = 100.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Argentinien?",
        options: ["Córdoba", "Buenos Aires", "Rosario", "Mendoza"],
        correctIndex: 1,
        explanation: "Buenos Aires ist die Hauptstadt und größte Stadt Argentiniens.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Tier kann mehrere Monate ohne Nahrung überleben?",
        options: ["Kamel", "Bär (im Winterschlaf)", "Schlange", "Alle genannten Tiere"],
        correctIndex: 3,
        explanation: "Kamele, Winterschlaf haltende Bären und viele Schlangen können extrem lange ohne Nahrung auskommen.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde Deutschland wiedervereinigt?",
        options: ["1989", "1990", "1991", "1992"],
        correctIndex: 1,
        explanation: "Die offizielle Wiedervereinigung Deutschlands erfolgte am 3. Oktober 1990.",
      },
      {
        category: "Chemie",
        question: "Welches Element ist Bestandteil von Diamant und Graphit gleichermaßen?",
        options: ["Silizium", "Kohlenstoff", "Bor", "Schwefel"],
        correctIndex: 1,
        explanation: "Diamant und Graphit sind beide reine Formen des Elements Kohlenstoff.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer entwarf das Guggenheim Museum in Bilbao?",
        options: ["Zaha Hadid", "Frank Gehry", "Norman Foster", "Rem Koolhaas"],
        correctIndex: 1,
        explanation: "Frank Gehry entwarf das bekannte, wellenförmige Guggenheim Museum in Bilbao.",
      },
      {
        category: "Alltag",
        question: "Wie viele Gramm hat ein Kilogramm?",
        options: ["10", "100", "1000", "10000"],
        correctIndex: 2,
        explanation: "Ein Kilogramm entspricht 1000 Gramm.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler stehen bei einem Fußballspiel pro Mannschaft auf dem Feld?",
        options: ["9", "10", "11", "12"],
        correctIndex: 2,
        explanation: "Jede Fußballmannschaft stellt regulär elf Spieler inklusive Torwart.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie viele Blasinstrumente-Familien gibt es grob unterschieden (Holz- und ...)?",
        options: ["Nur eine", "Holz- und Blechblasinstrumente", "Drei Familien", "Vier Familien"],
        correctIndex: 1,
        explanation: "Blasinstrumente werden grob in Holzblas- und Blechblasinstrumente unterteilt.",
      },
      {
        category: "Literatur",
        question: "Welcher Autor schrieb „Die Verwandlung“?",
        options: ["Thomas Mann", "Franz Kafka", "Hermann Hesse", "Bertolt Brecht"],
        correctIndex: 1,
        explanation: "Franz Kafka schrieb die berühmte Novelle „Die Verwandlung“.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „GPS“?",
        options: ["Global Positioning System", "General Public Service", "Global Phone Satellite", "General Positioning Signal"],
        correctIndex: 0,
        explanation: "GPS steht für „Global Positioning System“, ein satellitengestütztes Ortungssystem.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man einen extrem dichten, kollabierten Stern, der Licht nicht entkommen lässt?",
        options: ["Neutronenstern", "Schwarzes Loch", "Weißer Zwerg", "Roter Riese"],
        correctIndex: 1,
        explanation: "Ein Schwarzes Loch hat eine so starke Gravitation, dass nicht einmal Licht entkommen kann.",
      },
      {
        category: "Physik",
        question: "Welcher Wissenschaftler entwickelte das Atommodell mit Elektronenschalen entscheidend weiter?",
        options: ["Ernest Rutherford", "Niels Bohr", "John Dalton", "J.J. Thomson"],
        correctIndex: 1,
        explanation: "Niels Bohr entwickelte ein Atommodell mit diskreten Elektronenbahnen (Schalen).",
      },
      {
        category: "Film",
        question: "Welcher Animationsstudio schuf „Toy Story“?",
        options: ["DreamWorks", "Pixar", "Illumination", "Blue Sky Studios"],
        correctIndex: 1,
        explanation: "Pixar produzierte 1995 den ersten vollständig computeranimierten Spielfilm „Toy Story“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 65 plus 38?",
        options: ["101", "102", "103", "104"],
        correctIndex: 2,
        explanation: "65 + 38 = 103.",
      },
      {
        category: "Geografie",
        question: "Welche Stadt gilt als Hauptstadt der Mode neben Paris und Mailand?",
        options: ["Berlin", "New York", "Madrid", "Wien"],
        correctIndex: 1,
        explanation: "New York zählt neben Paris, Mailand und London zu den vier großen Modehauptstädten.",
      },
      {
        category: "Biologie",
        question: "Welches Organ produziert Adrenalin hauptsächlich?",
        options: ["Schilddrüse", "Nebenniere", "Hypophyse", "Bauchspeicheldrüse"],
        correctIndex: 1,
        explanation: "Die Nebennieren produzieren das Stresshormon Adrenalin.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die Sowjetunion aufgelöst?",
        options: ["1989", "1991", "1993", "1995"],
        correctIndex: 1,
        explanation: "Die Sowjetunion wurde offiziell Ende 1991 aufgelöst.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Mg“?",
        options: ["Mangan", "Magnesium", "Molybdän", "Merkur (Quecksilber, falsches Symbol)"],
        correctIndex: 1,
        explanation: "Magnesium wird mit „Mg“ abgekürzt.",
      },
      {
        category: "Kunst",
        question: "Welche Kunstrichtung wird mit Salvador Dalí hauptsächlich verbunden?",
        options: ["Kubismus", "Surrealismus", "Expressionismus", "Realismus"],
        correctIndex: 1,
        explanation: "Dalí gilt als einer der bekanntesten Vertreter des Surrealismus.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Kilogramm hat eine Tonne?",
        options: ["100", "1000", "10000", "100000"],
        correctIndex: 1,
        explanation: "Eine Tonne entspricht 1000 Kilogramm.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler hat eine Handballmannschaft auf dem Feld inklusive Torwart?",
        options: ["6", "7", "8", "9"],
        correctIndex: 1,
        explanation: "Beim Handball stehen sieben Spieler pro Team gleichzeitig auf dem Feld, inklusive Torwart.",
      },
      {
        category: "Musik",
        question: "Wie nennt man ein Musikstück für ein einzelnes Soloinstrument mit Orchesterbegleitung?",
        options: ["Sinfonie", "Konzert", "Sonate", "Oper"],
        correctIndex: 1,
        explanation: "Ein Konzert im musikalischen Sinne stellt ein Soloinstrument dem Orchester gegenüber.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Welcher Detektiv wurde von Arthur Conan Doyle erschaffen?",
        options: ["Hercule Poirot", "Sherlock Holmes", "Miss Marple", "Philip Marlowe"],
        correctIndex: 1,
        explanation: "Arthur Conan Doyle erschuf die Figur des Detektivs Sherlock Holmes.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „VPN“?",
        options: ["Virtual Private Network", "Verified Public Node", "Virtual Protocol Network", "Variable Private Node"],
        correctIndex: 0,
        explanation: "VPN steht für „Virtual Private Network“, ein verschlüsseltes privates Netzwerk.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man den Vorgang, bei dem sich das Universum seit dem Urknall ausdehnt?",
        options: ["Expansion des Universums", "Kontraktion", "Rotation", "Kollaps"],
        correctIndex: 0,
        explanation: "Das Universum dehnt sich seit dem Urknall kontinuierlich aus.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für Masse im Internationalen Einheitensystem?",
        options: ["Gramm", "Kilogramm", "Newton", "Pfund"],
        correctIndex: 1,
        explanation: "Kilogramm ist die SI-Basiseinheit für Masse.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte den Hauptcharakter Jack Dawson in „Titanic“?",
        options: ["Brad Pitt", "Leonardo DiCaprio", "Matt Damon", "Tom Cruise"],
        correctIndex: 1,
        explanation: "Leonardo DiCaprio spielte Jack Dawson in „Titanic“.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Ecken hat ein Siebeneck?",
        options: ["6", "7", "8", "9"],
        correctIndex: 1,
        explanation: "Ein Siebeneck hat sieben Ecken, ebenso viele wie Seiten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land hat die Form, die oft mit einem Stiefel verglichen wird — richtig war Italien, aber welches Land ähnelt einem Ausrufezeichen?",
        options: ["Chile", "Norwegen", "Vietnam", "Neuseeland"],
        correctIndex: 0,
        explanation: "Chiles extrem langgestreckte, schmale Form wird oft mit einem Ausrufezeichen verglichen.",
      },
      {
        category: "Biologie",
        question: "Welches Organ ist für das Gleichgewichtsgefühl zuständig?",
        options: ["Auge", "Innenohr", "Kleinhirn (allein)", "Rückenmark"],
        correctIndex: 1,
        explanation: "Das Innenohr mit seinen Bogengängen ist maßgeblich für den Gleichgewichtssinn verantwortlich.",
      },
      {
        category: "Geschichte",
        question: "Wer war Ludwig XIV. von Frankreich?",
        options: ["Der „Sonnenkönig“, der Frankreich lange absolutistisch regierte", "Ein revolutionärer Führer", "Ein militärischer Verlierer bei Waterloo", "Der letzte König vor der Revolution"],
        correctIndex: 0,
        explanation: "Ludwig XIV. regierte Frankreich über 72 Jahre und wird als „Sonnenkönig“ bezeichnet.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welcher pH-Wert gilt als neutral?",
        options: ["0", "7", "10", "14"],
        correctIndex: 1,
        explanation: "Ein pH-Wert von 7 gilt als chemisch neutral, wie bei reinem Wasser.",
      },
      {
        category: "Kunst",
        question: "In welcher Stadt liegt die Eremitage, eines der größten Kunstmuseen der Welt?",
        options: ["Moskau", "Sankt Petersburg", "Kiew", "Warschau"],
        correctIndex: 1,
        explanation: "Die Eremitage befindet sich in Sankt Petersburg, Russland.",
      },
      {
        category: "Alltag",
        question: "Wie viele Wochen hat ein Jahr ungefähr?",
        options: ["40", "48", "52", "60"],
        correctIndex: 2,
        explanation: "Ein Jahr hat rund 52 Wochen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie lang ist ein offizieller Marathon?",
        options: ["Etwa 35 km", "Etwa 40 km", "Etwa 42,2 km", "Etwa 45 km"],
        correctIndex: 2,
        explanation: "Die offizielle Marathondistanz beträgt 42,195 Kilometer.",
      },
      {
        category: "Musik",
        question: "Wie nennt man einen Sänger, der ohne Begleitung eine Melodie vorgibt, gefolgt von einer Gruppe?",
        options: ["Duett", "Call-and-Response", "Kanon", "Fuge"],
        correctIndex: 1,
        explanation: "Call-and-Response ist ein musikalisches Muster aus Vorsänger und antwortender Gruppe.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Die kleine Meerjungfrau“?",
        options: ["Die Gebrüder Grimm", "Hans Christian Andersen", "Charles Perrault", "Wilhelm Hauff"],
        correctIndex: 1,
        explanation: "Hans Christian Andersen schrieb das berühmte Märchen „Die kleine Meerjungfrau“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte den ersten Macintosh-Computer?",
        options: ["Microsoft", "Apple", "IBM", "Commodore"],
        correctIndex: 1,
        explanation: "Apple stellte 1984 den ersten Macintosh-Computer vor.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man die Bahn, auf der ein Planet um die Sonne kreist?",
        options: ["Rotation", "Umlaufbahn (Orbit)", "Achse", "Ekliptik (verwandter Begriff)"],
        correctIndex: 1,
        explanation: "Die Umlaufbahn (Orbit) beschreibt den Weg eines Himmelskörpers um einen anderen.",
      },
      {
        category: "Physik",
        question: "Welcher Physiker formulierte die Theorie des elektromagnetischen Feldes maßgeblich?",
        options: ["Michael Faraday", "James Clerk Maxwell", "Heinrich Hertz", "André-Marie Ampère"],
        correctIndex: 1,
        explanation: "James Clerk Maxwell vereinte Elektrizität, Magnetismus und Licht in seinen berühmten Gleichungen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Schauspieler spielte Wolverine in den X-Men-Filmen über viele Jahre?",
        options: ["Patrick Stewart", "Hugh Jackman", "Ian McKellen", "James McAvoy"],
        correctIndex: 1,
        explanation: "Hugh Jackman spielte über fast zwei Jahrzehnte die Figur Wolverine.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 256?",
        options: ["14", "15", "16", "17"],
        correctIndex: 2,
        explanation: "16 × 16 = 256, also ist die Quadratwurzel aus 256 gleich 16.",
      },
      {
        category: "Geografie",
        question: "Welcher Fluss fließt durch London?",
        options: ["Seine", "Themse", "Rhein", "Elbe"],
        correctIndex: 1,
        explanation: "Die Themse durchquert London von West nach Ost.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie viele Beine hat eine Krabbe?",
        options: ["6", "8", "10", "12"],
        correctIndex: 2,
        explanation: "Krabben haben zehn Beine, wobei zwei davon zu Scheren umgebildet sind.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr landeten die ersten Menschen auf dem Mond?",
        options: ["1965", "1969", "1972", "1975"],
        correctIndex: 1,
        explanation: "Am 20. Juli 1969 betrat Neil Armstrong als erster Mensch den Mond.",
      },
      {
        category: "Chemie",
        question: "Welches Gas verursacht den sauren Geschmack von Cola und Sprudelwasser?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Stickstoff", "Wasserstoff"],
        correctIndex: 1,
        explanation: "Gelöstes Kohlenstoffdioxid bildet Kohlensäure, die für den prickelnden, säuerlichen Geschmack sorgt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "In welcher Stadt steht die berühmte Freiheitsstatue?",
        options: ["Washington D.C.", "New York City", "Boston", "Philadelphia"],
        correctIndex: 1,
        explanation: "Die Freiheitsstatue steht im Hafen von New York City.",
      },
      {
        category: "Alltag",
        question: "Wie viele Grad hat ein rechter Winkel?",
        options: ["45", "90", "180", "360"],
        correctIndex: 1,
        explanation: "Ein rechter Winkel misst genau 90 Grad.",
      },
      {
        category: "Sport",
        question: "Wie viele Runden hat ein klassischer Profiboxkampf maximal meist?",
        options: ["8", "10", "12", "15"],
        correctIndex: 2,
        explanation: "Profi-Weltmeisterschaftskämpfe gehen meist über maximal 12 Runden.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welches Instrument wird traditionell in einer schottischen Militärkapelle gespielt?",
        options: ["Akkordeon", "Dudelsack", "Harfe", "Trompete"],
        correctIndex: 1,
        explanation: "Der Dudelsack ist ein Markenzeichen schottischer Musiktradition.",
      },
      {
        category: "Literatur",
        question: "Welcher Roman spielt auf der Insel eines Schiffbrüchigen und trägt dessen Namen?",
        options: ["Die Schatzinsel", "Robinson Crusoe", "Gullivers Reisen", "Die Insel des Dr. Moreau"],
        correctIndex: 1,
        explanation: "„Robinson Crusoe“ von Daniel Defoe erzählt vom Überleben eines Schiffbrüchigen auf einer einsamen Insel.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „CPU“?",
        options: ["Central Processing Unit", "Computer Power Unit", "Core Processing Utility", "Central Program Unit"],
        correctIndex: 0,
        explanation: "CPU steht für „Central Processing Unit“, den Hauptprozessor eines Computers.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welcher Himmelskörper ist der natürliche Satellit der Erde?",
        options: ["Die Sonne", "Der Mond", "Der Mars", "Ein Komet"],
        correctIndex: 1,
        explanation: "Der Mond ist der einzige natürliche Satellit der Erde.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für elektrische Ladung?",
        options: ["Ampere", "Coulomb", "Volt", "Ohm"],
        correctIndex: 1,
        explanation: "Coulomb ist die SI-Einheit für elektrische Ladung.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte Forrest Gump?",
        options: ["Tom Hanks", "Robin Williams", "Kevin Costner", "Denzel Washington"],
        correctIndex: 0,
        explanation: "Tom Hanks spielte die Titelrolle in „Forrest Gump“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 4 hoch 4 (4⁴)?",
        options: ["64", "128", "256", "512"],
        correctIndex: 2,
        explanation: "4⁴ = 4 × 4 × 4 × 4 = 256.",
      },
      {
        category: "Geografie",
        question: "Welcher Fluss ist der längste in Deutschland?",
        options: ["Rhein", "Elbe", "Donau", "Main"],
        correctIndex: 2,
        explanation: "Die Donau ist mit ihrer gesamten Länge der längste Fluss, der durch Deutschland fließt, gefolgt vom Rhein innerhalb der Landesgrenzen.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man den Prozess, bei dem Zellen sich teilen, um zu wachsen?",
        options: ["Meiose", "Mitose", "Osmose", "Diffusion"],
        correctIndex: 1,
        explanation: "Mitose ist die Zellteilung, bei der zwei identische Tochterzellen entstehen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahr endete der Zweite Weltkrieg in Europa?",
        options: ["1943", "1944", "1945", "1946"],
        correctIndex: 2,
        explanation: "Der Zweite Weltkrieg endete in Europa im Mai 1945 mit der deutschen Kapitulation.",
      },
      {
        category: "Chemie",
        question: "Wie viele Isotope hat Wasserstoff, die bekanntesten drei genannt?",
        options: ["1", "2", "3", "4"],
        correctIndex: 2,
        explanation: "Die drei bekanntesten Wasserstoffisotope sind Protium, Deuterium und Tritium.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Der Kuss“?",
        options: ["Egon Schiele", "Gustav Klimt", "Edvard Munch", "Oskar Kokoschka"],
        correctIndex: 1,
        explanation: "Gustav Klimt malte das berühmte Gemälde „Der Kuss“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Wochentage hat eine Woche?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        explanation: "Eine Woche besteht aus sieben Tagen.",
      },
      {
        category: "Sport",
        question: "Wie viele Ringe zeigt das olympische Symbol?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "Die fünf Ringe symbolisieren die fünf bewohnten Kontinente.",
      },
      {
        category: "Musik",
        question: "Wie viele Grammy-Kategorien gibt es ungefähr (Stand grob)?",
        options: ["Etwa 30", "Etwa 90", "Etwa 150", "Etwa 300"],
        correctIndex: 1,
        explanation: "Die Grammy Awards umfassen aktuell etwa 90 verschiedene Kategorien.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Welcher britische Autor schrieb „Alice im Wunderland“?",
        options: ["Lewis Carroll", "J.M. Barrie", "A.A. Milne", "Kenneth Grahame"],
        correctIndex: 0,
        explanation: "Lewis Carroll (Charles Dodgson) schrieb „Alice im Wunderland“ 1865.",
      },
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte die Spielekonsole PlayStation?",
        options: ["Nintendo", "Sony", "Microsoft", "Sega"],
        correctIndex: 1,
        explanation: "Sony entwickelte und vermarktet die PlayStation-Konsolenreihe.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man die Wissenschaft, die sich mit Himmelskörpern und dem Universum beschäftigt?",
        options: ["Astrologie", "Astronomie", "Kosmologie (Teilbereich)", "Meteorologie"],
        correctIndex: 1,
        explanation: "Astronomie ist die wissenschaftliche Erforschung von Himmelskörpern und dem Weltraum.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Welcher Wissenschaftler gilt als Begründer der modernen Mechanik und beobachtete den freien Fall?",
        options: ["Isaac Newton", "Galileo Galilei", "Johannes Kepler", "René Descartes"],
        correctIndex: 1,
        explanation: "Galileo Galilei leistete grundlegende Beiträge zur Mechanik und zum Verständnis des freien Falls.",
      },
      {
        category: "Film",
        question: "Wer führte Regie bei „Jurassic Park“ (1993)?",
        options: ["George Lucas", "Steven Spielberg", "James Cameron", "Ridley Scott"],
        correctIndex: 1,
        explanation: "Steven Spielberg führte bei „Jurassic Park“ Regie.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 29 plus 56?",
        options: ["83", "84", "85", "86"],
        correctIndex: 2,
        explanation: "29 + 56 = 85.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welcher Fluss bildet einen Teil der Grenze zwischen den USA und Mexiko?",
        options: ["Colorado River", "Rio Grande", "Mississippi", "Arkansas River"],
        correctIndex: 1,
        explanation: "Der Rio Grande bildet einen großen Teil der Grenze zwischen den USA und Mexiko.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist für seine hüpfende Fortbewegung mit kräftigen Hinterbeinen bekannt?",
        options: ["Hase", "Känguru", "Frosch", "Alle genannten Tiere"],
        correctIndex: 3,
        explanation: "Hasen, Kängurus und Frösche nutzen alle kräftige Hinterbeine zum Hüpfen als Hauptfortbewegungsart.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr endete der Vietnamkrieg?",
        options: ["1970", "1973", "1975", "1978"],
        correctIndex: 2,
        explanation: "Der Vietnamkrieg endete offiziell 1975 mit dem Fall von Saigon.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches ist das häufigste Element im Universum?",
        options: ["Sauerstoff", "Kohlenstoff", "Wasserstoff", "Helium"],
        correctIndex: 2,
        explanation: "Wasserstoff macht etwa 75 % der sichtbaren Masse des Universums aus.",
      },
      {
        category: "Kunst",
        question: "Welcher Kunststil zeichnet sich durch geschwungene, florale Ornamente um 1900 aus?",
        options: ["Bauhaus", "Jugendstil (Art Nouveau)", "Konstruktivismus", "Brutalismus"],
        correctIndex: 1,
        explanation: "Der Jugendstil war geprägt von organischen, geschwungenen Linien und floralen Motiven.",
      },
      {
        category: "Alltag",
        question: "Wie viele Spieler hat eine klassische Schachpartie zu Beginn pro Seite an Figuren?",
        options: ["8", "12", "16", "20"],
        correctIndex: 2,
        explanation: "Jede Seite startet beim Schach mit 16 Figuren.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Kämpfer treten beim Judo gleichzeitig auf der Matte an?",
        options: ["1 gegen 1", "2 gegen 2", "3 gegen 3", "Team-Wettkampf mit 5 pro Seite gleichzeitig"],
        correctIndex: 0,
        explanation: "Judo-Wettkämpfe finden klassisch im Einzelduell 1 gegen 1 statt.",
      },
      {
        category: "Musik",
        question: "Wie nennt man die tiefste männliche Singstimme?",
        options: ["Tenor", "Bariton", "Bass", "Alt"],
        correctIndex: 2,
        explanation: "Der Bass ist die tiefste klassische Männerstimme.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Hundert Jahre Einsamkeit“?",
        options: ["Jorge Luis Borges", "Gabriel García Márquez", "Mario Vargas Llosa", "Isabel Allende"],
        correctIndex: 1,
        explanation: "Gabriel García Márquez schrieb diesen berühmten Roman des magischen Realismus.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „AI“ im Englischen?",
        options: ["Automated Interface", "Artificial Intelligence", "Advanced Integration", "Analytical Index"],
        correctIndex: 1,
        explanation: "AI steht im Englischen für „Artificial Intelligence“, auf Deutsch Künstliche Intelligenz.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet ist der äußerste im Sonnensystem seit der Neuklassifizierung von Pluto?",
        options: ["Uranus", "Saturn", "Neptun", "Jupiter"],
        correctIndex: 2,
        explanation: "Neptun ist seit 2006 offiziell der äußerste Planet des Sonnensystems.",
      },
      {
        category: "Physik",
        question: "Wer entwickelte die allgemeine Relativitätstheorie?",
        options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Max Planck"],
        correctIndex: 1,
        explanation: "Albert Einstein veröffentlichte 1915 die allgemeine Relativitätstheorie.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Schauspieler spielte Han Solo in der originalen „Star Wars“-Trilogie?",
        options: ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Alec Guinness"],
        correctIndex: 1,
        explanation: "Harrison Ford spielte Han Solo in den klassischen „Star Wars“-Filmen.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 7 mal 8?",
        options: ["48", "54", "56", "64"],
        correctIndex: 2,
        explanation: "7 × 8 = 56.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Griechenland?",
        options: ["Thessaloniki", "Athen", "Patras", "Heraklion"],
        correctIndex: 1,
        explanation: "Athen ist die Hauptstadt und größte Stadt Griechenlands.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt für seine schwarz-weißen Streifen?",
        options: ["Tiger", "Zebra", "Panda", "Stinktier"],
        correctIndex: 1,
        explanation: "Zebras sind für ihr charakteristisches schwarz-weißes Streifenmuster bekannt.",
      },
      {
        category: "Geschichte",
        question: "Welches Land führte als erstes einen Menschen ins Weltall?",
        options: ["USA", "Sowjetunion", "China", "Deutschland"],
        correctIndex: 1,
        explanation: "1961 flog der Sowjet Juri Gagarin als erster Mensch ins All.",
      },
      {
        category: "Chemie",
        question: "Welches Element ist essenziell für die menschliche Schilddrüsenfunktion?",
        options: ["Zink", "Jod", "Eisen", "Kalzium"],
        correctIndex: 1,
        explanation: "Jod ist ein wichtiger Baustein für die Hormone der Schilddrüse.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "In welcher Stadt steht das Museum „Prado“?",
        options: ["Barcelona", "Madrid", "Sevilla", "Valencia"],
        correctIndex: 1,
        explanation: "Der Prado ist eines der bedeutendsten Kunstmuseen und befindet sich in Madrid.",
      },
      {
        category: "Alltag",
        question: "Wie viele Räder hat ein klassisches Skateboard?",
        options: ["2", "3", "4", "6"],
        correctIndex: 2,
        explanation: "Ein Skateboard hat vier Räder.",
      },
      {
        category: "Sport",
        question: "Wie viele Bahnen hat ein olympisches Schwimmbecken meist?",
        options: ["6", "8", "10", "12"],
        correctIndex: 1,
        explanation: "Olympische Schwimmbecken haben in der Regel acht Bahnen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie viele Streicher-Grundinstrumente gibt es klassisch in einem Orchester (Violine, Bratsche, Cello, ...)?",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "Violine, Bratsche, Cello und Kontrabass bilden die vier Grundinstrumente der Streicherfamilie.",
      },
      {
        category: "Literatur",
        question: "Welche Autorin schrieb „Der Report der Magd“ (The Handmaid's Tale)?",
        options: ["Toni Morrison", "Margaret Atwood", "Alice Munro", "Doris Lessing"],
        correctIndex: 1,
        explanation: "Margaret Atwood schrieb den bekannten dystopischen Roman „Der Report der Magd“.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „URL“?",
        options: ["Uniform Resource Locator", "Universal Retrieval Link", "United Resource Location", "Unique Reference Link"],
        correctIndex: 0,
        explanation: "URL steht für „Uniform Resource Locator“, die Internetadresse einer Webseite.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welcher Planet hat die bekannten, auffälligen Ringe?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptun"],
        correctIndex: 1,
        explanation: "Saturn ist berühmt für sein markantes, weithin sichtbares Ringsystem, auch wenn andere Gasplaneten schwächere Ringe haben.",
      },
      {
        category: "Physik",
        question: "Wer entwickelte die Quantentheorie mit dem Konzept der Energiequanten maßgeblich mit?",
        options: ["Albert Einstein", "Max Planck", "Niels Bohr", "Werner Heisenberg"],
        correctIndex: 1,
        explanation: "Max Planck gilt als Begründer der Quantentheorie durch seine Arbeiten zur Energiequantelung.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte den Joker im Film „The Dark Knight“ (2008)?",
        options: ["Jack Nicholson", "Heath Ledger", "Joaquin Phoenix", "Jared Leto"],
        correctIndex: 1,
        explanation: "Heath Ledger spielte den Joker in „The Dark Knight“ und erhielt dafür posthum einen Oscar.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Sprache hat die meisten Sprecher als Zweitsprache weltweit?",
        options: ["Französisch", "Englisch", "Spanisch", "Mandarin"],
        correctIndex: 1,
        explanation: "Englisch wird weltweit von den meisten Menschen als Zweitsprache gesprochen.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 225?",
        options: ["13", "14", "15", "16"],
        correctIndex: 2,
        explanation: "15 × 15 = 225, also ist die Quadratwurzel aus 225 gleich 15.",
      },
      {
        category: "Geografie",
        question: "Welcher Ort gilt als kältester bewohnter Ort der Erde?",
        options: ["Nordpol", "Oimjakon in Sibirien", "Grönland", "Antarktis-Forschungsstation"],
        correctIndex: 1,
        explanation: "Das sibirische Dorf Oimjakon gilt als einer der kältesten dauerhaft bewohnten Orte weltweit.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Tier kann seine Haut oder Farbe zur Tarnung wechseln?",
        options: ["Salamander", "Chamäleon", "Eidechse", "Frosch"],
        correctIndex: 1,
        explanation: "Chamäleons können ihre Hautfarbe durch spezielle Zellen schnell anpassen.",
      },
      {
        category: "Geschichte",
        question: "Wer war Julius Cäsar?",
        options: ["Ein griechischer Philosoph", "Ein römischer Feldherr und Staatsmann", "Ein ägyptischer Pharao", "Ein persischer König"],
        correctIndex: 1,
        explanation: "Julius Cäsar war ein bedeutender römischer Feldherr und Politiker im 1. Jahrhundert v. Chr.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Calcium?",
        options: ["Cl", "Ca", "Co", "Cm"],
        correctIndex: 1,
        explanation: "Calcium wird mit „Ca“ abgekürzt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Welche Kunstepoche zeichnet sich durch flüchtige Lichteindrücke aus, geprägt von Monet?",
        options: ["Romantik", "Impressionismus", "Barock", "Kubismus"],
        correctIndex: 1,
        explanation: "Der Impressionismus legte den Fokus auf Licht- und Farbeindrücke des Moments.",
      },
      {
        category: "Alltag",
        question: "Wie viele Grad Celsius entsprechen etwa dem Gefrierpunkt von Wasser?",
        options: ["-10", "0", "10", "32"],
        correctIndex: 1,
        explanation: "Wasser gefriert bei 0 Grad Celsius.",
      },
      {
        category: "Sport",
        question: "Wie viele Punkte zählt ein klassisches Touchdown im American Football (ohne Zusatzpunkt)?",
        options: ["3", "6", "7", "8"],
        correctIndex: 1,
        explanation: "Ein Touchdown zählt sechs Punkte, ein anschließender Extra Point kann einen weiteren Punkt bringen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wer war Johann Sebastian Bach?",
        options: ["Ein Komponist der Romantik", "Ein Komponist des Barock", "Ein Komponist der Klassik", "Ein Komponist des 20. Jahrhunderts"],
        correctIndex: 1,
        explanation: "Bach war ein herausragender Komponist des Barockzeitalters.",
      },
      {
        category: "Literatur",
        question: "Welcher englische Dramatiker schrieb „Hamlet“?",
        options: ["Christopher Marlowe", "William Shakespeare", "Ben Jonson", "John Webster"],
        correctIndex: 1,
        explanation: "William Shakespeare schrieb die Tragödie „Hamlet“.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „QR“ bei einem QR-Code?",
        options: ["Quick Response", "Quality Rating", "Quantum Recognition", "Quiet Radio"],
        correctIndex: 0,
        explanation: "QR steht für „Quick Response“, also schnelle Reaktion beim Scannen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welcher Planet hat die auffälligsten Ringe im Sonnensystem?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptun"],
        correctIndex: 1,
        explanation: "Saturn ist berühmt für sein markantes Ringsystem.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für die Lichtstärke?",
        options: ["Lux", "Candela", "Lumen", "Watt"],
        correctIndex: 1,
        explanation: "Candela ist die SI-Einheit für die Lichtstärke.",
      },
      {
        category: "Film",
        question: "Welcher Animationsfilm von Disney handelt von einem Löwenjungen namens Simba?",
        options: ["Der Dschungel-Buch", "Der König der Löwen", "Findet Nemo", "Zoomania"],
        correctIndex: 1,
        explanation: "„Der König der Löwen“ erzählt die Geschichte des Löwenjungen Simba.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Sprache wird in Österreich hauptsächlich gesprochen?",
        options: ["Ungarisch", "Deutsch", "Italienisch", "Tschechisch"],
        correctIndex: 1,
        explanation: "In Österreich ist Deutsch die Amtssprache.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 50 Prozent von 84?",
        options: ["38", "40", "42", "44"],
        correctIndex: 2,
        explanation: "50 % von 84 = 0,5 × 84 = 42.",
      },
      {
        category: "Geografie",
        question: "Welches Land teilt sich die Insel Borneo mit zwei weiteren Staaten?",
        options: ["Indonesien, Malaysia und Brunei", "Indonesien und Philippinen", "Malaysia und Singapur", "Thailand und Myanmar"],
        correctIndex: 0,
        explanation: "Borneo wird von Indonesien, Malaysia und Brunei geteilt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie nennt man die Erforschung von Ökosystemen und Lebensräumen?",
        options: ["Ökologie", "Genetik", "Physiologie", "Taxonomie"],
        correctIndex: 0,
        explanation: "Ökologie untersucht die Wechselwirkungen zwischen Organismen und ihrer Umwelt.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr endete die Apartheid offiziell in Südafrika?",
        options: ["1984", "1990", "1994", "1998"],
        correctIndex: 2,
        explanation: "1994 fanden die ersten freien Wahlen statt und die Apartheid endete offiziell.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Wismut?",
        options: ["Wi", "Bi", "Wm", "Bs"],
        correctIndex: 1,
        explanation: "Wismut wird mit „Bi“ abgekürzt, vom lateinischen „Bismuthum“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Welcher Künstler gilt als Pionier der vollständig abstrakten Malerei?",
        options: ["Pablo Picasso", "Wassily Kandinsky", "Henri Matisse", "Paul Gauguin"],
        correctIndex: 1,
        explanation: "Wassily Kandinsky gilt als einer der Begründer der gegenstandslosen, abstrakten Malerei.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage hat der Monat September?",
        options: ["28", "29", "30", "31"],
        correctIndex: 2,
        explanation: "Der September hat 30 Tage.",
      },
      {
        category: "Sport",
        question: "Welche Sportart ist für ihre „Grand-Tour“-Rennen wie Giro d'Italia und Vuelta a España bekannt?",
        options: ["Motorsport", "Radsport", "Segeln", "Reitsport"],
        correctIndex: 1,
        explanation: "Giro d'Italia, Tour de France und Vuelta a España sind die drei großen Radsport-Rundfahrten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie viele Bünde hat eine klassische Gitarre üblicherweise ungefähr?",
        options: ["Etwa 12", "Etwa 20", "Etwa 30", "Etwa 40"],
        correctIndex: 1,
        explanation: "Klassische Gitarren haben meist rund 19 bis 20 Bünde.",
      },
      {
        category: "Literatur",
        question: "Welcher Roman handelt von der Farm der Tiere, die die Menschen vertreiben und selbst regieren?",
        options: ["1984", "Farm der Tiere", "Brave New World", "Fahrenheit 451"],
        correctIndex: 1,
        explanation: "„Farm der Tiere“ von George Orwell ist eine politische Allegorie mit Tieren als Hauptfiguren.",
      },
      {
        category: "Technik",
        question: "Wer gilt als Erfinder des Telefons?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Guglielmo Marconi", "Nikola Tesla"],
        correctIndex: 1,
        explanation: "Alexander Graham Bell patentierte 1876 das Telefon.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man das Phänomen, wenn der Mond die Sonne verdeckt?",
        options: ["Mondfinsternis", "Sonnenfinsternis", "Supermond", "Neumond"],
        correctIndex: 1,
        explanation: "Bei einer Sonnenfinsternis schiebt sich der Mond zwischen Erde und Sonne.",
      },
      {
        category: "Physik",
        question: "Wie nennt man das Phänomen, bei dem Licht beim Übergang in ein anderes Medium seine Richtung ändert?",
        options: ["Reflexion", "Brechung", "Beugung", "Interferenz"],
        correctIndex: 1,
        explanation: "Bei der Brechung ändert Licht beim Übergang zwischen Medien mit unterschiedlicher Dichte seine Richtung.",
      },
      {
        category: "Film",
        question: "Wer führte Regie bei „Der Pate“?",
        options: ["Martin Scorsese", "Francis Ford Coppola", "Sidney Lumet", "Michael Cimino"],
        correctIndex: 1,
        explanation: "Francis Ford Coppola führte bei „Der Pate“ Regie.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie nennt man zwei Wörter mit entgegengesetzter Bedeutung?",
        options: ["Synonyme", "Antonyme", "Homonyme", "Metaphern"],
        correctIndex: 1,
        explanation: "Antonyme sind Wörter mit gegensätzlicher Bedeutung, wie „heiß“ und „kalt“.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 12 mal 9?",
        options: ["98", "104", "108", "112"],
        correctIndex: 2,
        explanation: "12 × 9 = 108.",
      },
      {
        category: "Geografie",
        question: "Welches Land besitzt die Osterinsel?",
        options: ["Peru", "Chile", "Ecuador", "Argentinien"],
        correctIndex: 1,
        explanation: "Die Osterinsel im Pazifik gehört politisch zu Chile.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie nennt man Organismen, die sich von totem organischem Material ernähren?",
        options: ["Produzenten", "Konsumenten", "Destruenten (Zersetzer)", "Symbionten"],
        correctIndex: 2,
        explanation: "Destruenten wie Pilze und Bakterien zersetzen totes organisches Material.",
      },
      {
        category: "Geschichte",
        question: "Wer war Martin Luther?",
        options: ["Ein römischer Kaiser", "Ein Reformator der christlichen Kirche", "Ein englischer König", "Ein französischer General"],
        correctIndex: 1,
        explanation: "Martin Luther leitete im 16. Jahrhundert die protestantische Reformation ein.",
      },
      {
        category: "Chemie",
        question: "Bei welcher Temperatur gefriert Wasser unter Normaldruck?",
        options: ["-10 °C", "0 °C", "10 °C", "100 °C"],
        correctIndex: 1,
        explanation: "Reines Wasser gefriert bei 0 Grad Celsius unter normalem atmosphärischem Druck.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer malte die Sixtinische Kapelle?",
        options: ["Leonardo da Vinci", "Michelangelo", "Raffael", "Tizian"],
        correctIndex: 1,
        explanation: "Michelangelo bemalte die Decke der Sixtinischen Kapelle.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage hat der Monat Dezember?",
        options: ["28", "29", "30", "31"],
        correctIndex: 3,
        explanation: "Der Dezember hat 31 Tage.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird mit einem ovalen Ball gespielt, bei dem Versuche über die Torlinie zählen?",
        options: ["American Football", "Rugby", "Beide, American Football und Rugby", "Australian Football"],
        correctIndex: 2,
        explanation: "Sowohl Rugby als auch American Football nutzen einen ovalen Ball und punkten unter anderem über Versuche/Touchdowns.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie nennt man die Kunstform, bei der gesungene Texte szenisch mit Orchester aufgeführt werden?",
        options: ["Ballett", "Oper", "Musical (verwandt)", "Operette (verwandt)"],
        correctIndex: 1,
        explanation: "Die Oper verbindet Gesang, Orchestermusik und Theater zu einer szenischen Aufführung.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb den Roman „Ulysses“?",
        options: ["James Joyce", "Samuel Beckett", "Oscar Wilde", "W.B. Yeats"],
        correctIndex: 0,
        explanation: "James Joyce schrieb den modernistischen Roman „Ulysses“.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „DNS“ im Internet?",
        options: ["Domain Name System", "Digital Network Service", "Data Node Server", "Direct Network Signal"],
        correctIndex: 0,
        explanation: "DNS steht für „Domain Name System“, das Webadressen in IP-Adressen übersetzt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man den natürlichen Vorgang, bei dem sich der Mond scheinbar in Phasen verändert?",
        options: ["Mondphasen", "Mondfinsternis", "Gezeiten", "Supermond"],
        correctIndex: 0,
        explanation: "Die Mondphasen entstehen durch die sich verändernde Beleuchtung des Mondes von der Sonne aus gesehen.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für Energie im Internationalen Einheitensystem?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correctIndex: 1,
        explanation: "Joule ist die SI-Einheit für Energie.",
      },
      {
        category: "Film",
        question: "Wer führte Regie bei „Django Unchained“?",
        options: ["Martin Scorsese", "Quentin Tarantino", "David Fincher", "Coen Brothers"],
        correctIndex: 1,
        explanation: "Quentin Tarantino schrieb und inszenierte „Django Unchained“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Sprache wird in Ägypten hauptsächlich gesprochen?",
        options: ["Arabisch", "Hebräisch", "Persisch", "Türkisch"],
        correctIndex: 0,
        explanation: "Arabisch ist die Amtssprache Ägyptens.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 196?",
        options: ["12", "13", "14", "15"],
        correctIndex: 2,
        explanation: "14 × 14 = 196, also ist die Quadratwurzel aus 196 gleich 14.",
      },
      {
        category: "Geografie",
        question: "Welcher Ozean ist der größte der Welt?",
        options: ["Atlantik", "Indischer Ozean", "Pazifik", "Arktischer Ozean"],
        correctIndex: 2,
        explanation: "Der Pazifik bedeckt eine größere Fläche als alle Kontinente zusammen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie viele Beine hat eine Spinne?",
        options: ["6", "8", "10", "12"],
        correctIndex: 1,
        explanation: "Spinnen gehören zu den Spinnentieren und haben acht Beine.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr fiel das Byzantinische Reich endgültig?",
        options: ["1204", "1453", "1571", "1699"],
        correctIndex: 1,
        explanation: "Mit dem Fall Konstantinopels 1453 endete das Byzantinische Reich.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Eisen?",
        options: ["Ir", "Fe", "Ei", "Fr"],
        correctIndex: 1,
        explanation: "Eisen wird mit „Fe“ abgekürzt, vom lateinischen „Ferrum“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "In welchem Museum hängt die Mona Lisa?",
        options: ["British Museum", "Louvre", "Uffizien", "Prado"],
        correctIndex: 1,
        explanation: "Die Mona Lisa ist im Louvre in Paris ausgestellt.",
      },
      {
        category: "Alltag",
        question: "Wie viele Stunden schläft ein Erwachsener durchschnittlich empfohlen pro Nacht?",
        options: ["4-5", "6-7", "7-9", "10-12"],
        correctIndex: 2,
        explanation: "Für Erwachsene werden meist 7 bis 9 Stunden Schlaf pro Nacht empfohlen.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler bilden ein Volleyball-Team auf dem Feld?",
        options: ["5", "6", "7", "8"],
        correctIndex: 1,
        explanation: "Ein Volleyball-Team hat sechs Spieler gleichzeitig auf dem Feld.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wer komponierte die „Mondscheinsonate“?",
        options: ["Mozart", "Beethoven", "Chopin", "Liszt"],
        correctIndex: 1,
        explanation: "Beethoven komponierte die „Mondscheinsonate“ (Klaviersonate Nr. 14) im Jahr 1801.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Die Verwandlung“ über einen Mann, der als Käfer aufwacht?",
        options: ["Thomas Mann", "Franz Kafka", "Robert Musil", "Stefan Zweig"],
        correctIndex: 1,
        explanation: "In Kafkas Novelle wacht der Protagonist Gregor Samsa als riesiges Insekt auf.",
      },
      {
        category: "Technik",
        question: "Wer gründete Amazon?",
        options: ["Elon Musk", "Jeff Bezos", "Larry Page", "Bill Gates"],
        correctIndex: 1,
        explanation: "Jeff Bezos gründete Amazon 1994 als Online-Buchhändler.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welcher Mond ist der größte im Sonnensystem?",
        options: ["Titan (Saturn)", "Ganymed (Jupiter)", "Europa (Jupiter)", "Io (Jupiter)"],
        correctIndex: 1,
        explanation: "Ganymed, ein Jupitermond, ist der größte Mond im gesamten Sonnensystem.",
      },
      {
        category: "Physik",
        question: "Wie nennt man das physikalische Prinzip, wonach jede Aktion eine gleich große Gegenreaktion erzeugt?",
        options: ["Newtons erstes Gesetz", "Newtons drittes Gesetz", "Das Trägheitsgesetz", "Das Gravitationsgesetz"],
        correctIndex: 1,
        explanation: "Newtons drittes Gesetz besagt: Kraft gleich Gegenkraft.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte den Hauptcharakter in „Forrest Gump“?",
        options: ["Tom Cruise", "Tom Hanks", "Kevin Costner", "Robin Williams"],
        correctIndex: 1,
        explanation: "Tom Hanks spielte die Titelrolle in „Forrest Gump“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie nennt man eine beschönigende Umschreibung eines unangenehmen Sachverhalts?",
        options: ["Hyperbel", "Euphemismus", "Metapher", "Ironie"],
        correctIndex: 1,
        explanation: "Ein Euphemismus mildert unangenehme oder tabuisierte Sachverhalte sprachlich ab.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man die Steuer, die auf das Einkommen von Privatpersonen erhoben wird?",
        options: ["Mehrwertsteuer", "Einkommensteuer", "Körperschaftsteuer", "Grundsteuer"],
        correctIndex: 1,
        explanation: "Die Einkommensteuer wird auf das Einkommen natürlicher Personen erhoben.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 21 mal 3?",
        options: ["57", "60", "63", "66"],
        correctIndex: 2,
        explanation: "21 × 3 = 63.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "In welchem Land liegt die Stadt Marrakesch?",
        options: ["Ägypten", "Marokko", "Algerien", "Tunesien"],
        correctIndex: 1,
        explanation: "Marrakesch ist eine der bekanntesten Städte Marokkos.",
      },
      {
        category: "Biologie",
        question: "Welches Organ speichert und konzentriert die Galle?",
        options: ["Leber", "Gallenblase", "Bauchspeicheldrüse", "Milz"],
        correctIndex: 1,
        explanation: "Die Gallenblase speichert die von der Leber produzierte Galle bis zur Nutzung bei der Fettverdauung.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die Berliner Mauer errichtet?",
        options: ["1955", "1961", "1968", "1972"],
        correctIndex: 1,
        explanation: "Die Berliner Mauer wurde am 13. August 1961 errichtet.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Element wird für Batterien häufig in Form von Lithium-Ionen verwendet?",
        options: ["Natrium", "Lithium", "Kalium", "Magnesium"],
        correctIndex: 1,
        explanation: "Lithium-Ionen-Batterien sind heute Standard in vielen elektronischen Geräten.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Die Nachtwache“?",
        options: ["Johannes Vermeer", "Rembrandt", "Frans Hals", "Jan Steen"],
        correctIndex: 1,
        explanation: "Rembrandt malte das berühmte Gruppenporträt „Die Nachtwache“.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage hat der Monat Juli?",
        options: ["28", "29", "30", "31"],
        correctIndex: 3,
        explanation: "Der Juli hat 31 Tage.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie oft finden die Fußball-Weltmeisterschaften der Männer regulär statt?",
        options: ["Alle 2 Jahre", "Alle 3 Jahre", "Alle 4 Jahre", "Alle 5 Jahre"],
        correctIndex: 2,
        explanation: "Die FIFA-Fußballweltmeisterschaft findet regulär alle vier Jahre statt.",
      },
      {
        category: "Musik",
        question: "Welche Musikrichtung entstand in den 1970er Jahren in New York und ist geprägt von Sprechgesang?",
        options: ["Reggae", "Hip-Hop", "Punk", "Disco"],
        correctIndex: 1,
        explanation: "Hip-Hop entstand in den 1970er Jahren in New York und ist geprägt von Rap-Sprechgesang.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb die Fabeln mit sprechenden Tieren, bekannt aus der Antike, wie „Der Fuchs und die Trauben“?",
        options: ["Homer", "Äsop", "Ovid", "Vergil"],
        correctIndex: 1,
        explanation: "Äsop gilt als Verfasser klassischer griechischer Fabeln mit moralischer Lehre.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „CSS“ in der Webentwicklung?",
        options: ["Cascading Style Sheets", "Computer Style System", "Central Server Script", "Coded Style Sequence"],
        correctIndex: 0,
        explanation: "CSS steht für „Cascading Style Sheets“ und dient der Gestaltung von Webseiten.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man den natürlichen Satelliten der Erde?",
        options: ["Die Sonne", "Der Mond", "Ein Asteroid", "Ein Komet"],
        correctIndex: 1,
        explanation: "Der Mond ist der einzige natürliche Satellit der Erde.",
      },
      {
        category: "Physik",
        question: "Wie nennt man den Zustand, in dem ein Objekt weder beschleunigt noch abgebremst wird?",
        options: ["Beschleunigung", "Trägheit / gleichförmige Bewegung", "Reibung", "Rotation"],
        correctIndex: 1,
        explanation: "Ohne wirkende Kraft bewegt sich ein Objekt gemäß dem Trägheitsprinzip gleichförmig weiter.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Wer führte Regie bei „Schindlers Liste“?",
        options: ["Martin Scorsese", "Steven Spielberg", "Oliver Stone", "Roman Polanski"],
        correctIndex: 1,
        explanation: "Steven Spielberg führte bei „Schindlers Liste“ Regie, das 1993 mehrere Oscars gewann.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache verwendet Schriftzeichen, die oft als „Kanji“ bezeichnet werden, neben zwei Silbenschriften?",
        options: ["Chinesisch", "Japanisch", "Koreanisch", "Thai"],
        correctIndex: 1,
        explanation: "Japanisch nutzt Kanji (aus dem Chinesischen übernommene Zeichen) sowie die Silbenschriften Hiragana und Katakana.",
      },
      {
        category: "Wirtschaft",
        question: "Welche Börse gilt als eine der größten und bekanntesten der Welt, in New York?",
        options: ["Londoner Börse", "New York Stock Exchange (NYSE)", "Tokioter Börse", "Frankfurter Börse"],
        correctIndex: 1,
        explanation: "Die New York Stock Exchange (NYSE) zählt zu den größten Börsen der Welt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein regelmäßiges Vieleck namens „Pentagon“?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "Pentagon ist ein anderer Begriff für Fünfeck.",
      },
      {
        category: "Geografie",
        question: "Welcher Berg ist der höchste in Europa (inklusive Kaukasus)?",
        options: ["Mont Blanc", "Elbrus", "Matterhorn", "Großglockner"],
        correctIndex: 1,
        explanation: "Der Elbrus im Kaukasus gilt geografisch als höchster Berg Europas.",
      },
      {
        category: "Biologie",
        question: "Welches Tier hält den Rekord als schnellster Vogel im Sturzflug?",
        options: ["Steinadler", "Wanderfalke", "Mauersegler", "Sperber"],
        correctIndex: 1,
        explanation: "Der Wanderfalke erreicht im Sturzflug Geschwindigkeiten von über 300 km/h.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die UNO gegründet?",
        options: ["1919", "1945", "1950", "1955"],
        correctIndex: 1,
        explanation: "Die Vereinten Nationen wurden 1945 nach dem Zweiten Weltkrieg gegründet.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „K“?",
        options: ["Krypton", "Kalium", "Kupfer", "Kohlenstoff"],
        correctIndex: 1,
        explanation: "Kalium wird mit „K“ abgekürzt, vom lateinischen Namen „Kalium“.",
      },
      {
        category: "Kunst",
        question: "In welcher Stadt steht die Freiheitsstatue?",
        options: ["Washington D.C.", "New York City", "Boston", "Philadelphia"],
        correctIndex: 1,
        explanation: "Die Freiheitsstatue steht auf Liberty Island im Hafen von New York City.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Seiten hat ein klassischer Spielwürfel?",
        options: ["4", "6", "8", "10"],
        correctIndex: 1,
        explanation: "Ein klassischer Würfel hat sechs Seiten.",
      },
      {
        category: "Sport",
        question: "Welche Sportart nutzt eine Kugel, die über Eis in Richtung eines Zielkreises geschoben wird?",
        options: ["Bowling", "Curling", "Boccia", "Kegeln"],
        correctIndex: 1,
        explanation: "Beim Curling werden schwere Steine über eine Eisbahn in Richtung eines Zielkreises gleiten lassen.",
      },
      {
        category: "Musik",
        question: "Wer komponierte die Oper „Carmen“?",
        options: ["Verdi", "Bizet", "Puccini", "Wagner"],
        correctIndex: 1,
        explanation: "Georges Bizet komponierte die berühmte Oper „Carmen“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb den Roman „Faust“?",
        options: ["Friedrich Schiller", "Johann Wolfgang von Goethe", "Thomas Mann", "Heinrich Heine"],
        correctIndex: 1,
        explanation: "Goethe schrieb sein Meisterwerk „Faust“ über viele Jahrzehnte.",
      },
      {
        category: "Technik",
        question: "Wer gründete Apple mit?",
        options: ["Bill Gates", "Steve Jobs", "Jeff Bezos", "Elon Musk"],
        correctIndex: 1,
        explanation: "Steve Jobs gründete Apple 1976 zusammen mit Steve Wozniak.",
      },
      {
        category: "Astronomie",
        question: "In welcher Galaxie befindet sich unser Sonnensystem?",
        options: ["Andromeda-Galaxie", "Milchstraße", "Dreiecksgalaxie", "Sombrero-Galaxie"],
        correctIndex: 1,
        explanation: "Unser Sonnensystem befindet sich in der Milchstraße.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Wie nennt man den Übergang von fest zu flüssig?",
        options: ["Verdampfen", "Schmelzen", "Sublimieren", "Kondensieren"],
        correctIndex: 1,
        explanation: "Beim Schmelzen geht ein fester Stoff in den flüssigen Zustand über.",
      },
      {
        category: "Film",
        question: "Welcher Animationsfilm von Pixar handelt von Emotionen im Kopf eines Mädchens?",
        options: ["Alles steht Kopf (Inside Out)", "Oben", "Cars", "Coco"],
        correctIndex: 0,
        explanation: "„Alles steht Kopf“ stellt die Emotionen der Hauptfigur als eigene Charaktere dar.",
      },
      {
        category: "Sprache",
        question: "Wie nennt man die Bedeutungslehre einer Sprache?",
        options: ["Syntax", "Semantik", "Phonetik", "Pragmatik"],
        correctIndex: 1,
        explanation: "Semantik befasst sich mit der Bedeutung von Wörtern und Sätzen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Anteil an einem Unternehmen, den man an der Börse kaufen kann?",
        options: ["Anleihe", "Aktie", "Fonds", "Derivat"],
        correctIndex: 1,
        explanation: "Eine Aktie ist ein Anteilsschein an einem Unternehmen.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Nullen hat eine Million?",
        options: ["4", "5", "6", "7"],
        correctIndex: 2,
        explanation: "Eine Million (1.000.000) hat sechs Nullen.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt die Wüste Gobi?",
        options: ["Indien", "China und Mongolei", "Kasachstan", "Iran"],
        correctIndex: 1,
        explanation: "Die Gobi erstreckt sich über Teile Nordchinas und der Südmongolei.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Organ reguliert die Körpertemperatur hauptsächlich?",
        options: ["Leber", "Haut", "Herz", "Milz"],
        correctIndex: 1,
        explanation: "Die Haut reguliert über Schwitzen und Durchblutung wesentlich die Körpertemperatur.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr fand der Angriff auf Pearl Harbor statt?",
        options: ["1939", "1941", "1943", "1945"],
        correctIndex: 1,
        explanation: "Der japanische Angriff auf Pearl Harbor erfolgte am 7. Dezember 1941.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Pb“?",
        options: ["Phosphor", "Blei", "Platin", "Palladium"],
        correctIndex: 1,
        explanation: "Blei wird mit „Pb“ abgekürzt, vom lateinischen „Plumbum“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer schuf den berühmten Farbholzschnitt „Die große Welle vor Kanagawa“?",
        options: ["Hiroshige", "Hokusai", "Utamaro", "Sharaku"],
        correctIndex: 1,
        explanation: "Katsushika Hokusai schuf dieses ikonische Werk der japanischen Holzschnittkunst.",
      },
      {
        category: "Alltag",
        question: "An welchem Wochentag beginnt die Woche traditionell im deutschsprachigen Kalender?",
        options: ["Sonntag", "Montag", "Samstag", "Dienstag"],
        correctIndex: 1,
        explanation: "Im deutschsprachigen Raum gilt der Montag üblicherweise als erster Tag der Woche.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler hat ein klassisches Wasserballteam im Wasser gleichzeitig?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        explanation: "Ein Wasserballteam stellt sieben Spieler gleichzeitig im Wasser, inklusive Torwart.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie nennt man die Geschwindigkeit eines Musikstücks im Fachbegriff?",
        options: ["Dynamik", "Tempo", "Harmonie", "Rhythmus"],
        correctIndex: 1,
        explanation: "Tempo bezeichnet die Geschwindigkeit, in der ein Musikstück gespielt wird.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Die drei Musketiere“?",
        options: ["Victor Hugo", "Alexandre Dumas", "Gustave Flaubert", "Émile Zola"],
        correctIndex: 1,
        explanation: "Alexandre Dumas schrieb den Abenteuerroman „Die drei Musketiere“.",
      },
      {
        category: "Technik",
        question: "Wer entwickelte das erste kommerziell erfolgreiche Automobil am Fließband?",
        options: ["Karl Benz", "Henry Ford", "Gottlieb Daimler", "Rudolf Diesel"],
        correctIndex: 1,
        explanation: "Henry Ford revolutionierte mit der Fließbandproduktion die Automobilherstellung.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welcher Planet wird oft als „Zwillingsplanet“ der Erde wegen ähnlicher Größe bezeichnet?",
        options: ["Mars", "Venus", "Merkur", "Jupiter"],
        correctIndex: 1,
        explanation: "Die Venus hat eine ähnliche Größe wie die Erde und wird daher oft als „Zwillingsplanet“ bezeichnet.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die kleinste Ladungseinheit, die als unteilbar gilt (Elementarladung)?",
        options: ["Elektronenladung", "Elementarladung", "Coulomb-Einheit", "Ionenladung"],
        correctIndex: 1,
        explanation: "Die Elementarladung ist die kleinste bekannte frei vorkommende elektrische Ladungseinheit.",
      },
      {
        category: "Film",
        question: "Welcher Film erzählt die Geschichte eines Fisches, der seinen Sohn im Ozean sucht?",
        options: ["Findet Nemo", "Das große Krabbeln", "Shark Tale", "Rio"],
        correctIndex: 0,
        explanation: "„Findet Nemo“ erzählt die Geschichte eines Clownfischs auf der Suche nach seinem Sohn.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie nennt man einen sprachlichen Vergleich mit „wie“ oder „als“?",
        options: ["Metapher", "Vergleich (Gleichnis)", "Metonymie", "Ironie"],
        correctIndex: 1,
        explanation: "Ein Vergleich nutzt Wörter wie „wie“ oder „als“, um zwei Dinge in Beziehung zu setzen.",
      },
      {
        category: "Wirtschaft",
        question: "Welche Kryptowährung war die erste und ist bis heute die bekannteste?",
        options: ["Ethereum", "Bitcoin", "Litecoin", "Dogecoin"],
        correctIndex: 1,
        explanation: "Bitcoin wurde 2009 eingeführt und gilt als erste und bekannteste Kryptowährung.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 46 plus 37?",
        options: ["81", "82", "83", "84"],
        correctIndex: 2,
        explanation: "46 + 37 = 83.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land ist bekannt für die Steppen der Pampa?",
        options: ["Chile", "Argentinien", "Uruguay", "Paraguay"],
        correctIndex: 1,
        explanation: "Die Pampa-Steppe erstreckt sich vor allem über Argentinien.",
      },
      {
        category: "Biologie",
        question: "Welches Organ ist für die Filterung des Blutes zuständig?",
        options: ["Herz", "Niere", "Lunge", "Magen"],
        correctIndex: 1,
        explanation: "Die Nieren filtern Abfallstoffe aus dem Blut und bilden Urin.",
      },
      {
        category: "Geschichte",
        question: "Welches Land besetzte während des Kalten Krieges gemeinsam mit den USA, Großbritannien und Frankreich Deutschland?",
        options: ["Italien", "Sowjetunion", "Polen", "Österreich"],
        correctIndex: 1,
        explanation: "Nach 1945 wurde Deutschland in vier Besatzungszonen der USA, UdSSR, Großbritanniens und Frankreichs geteilt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Gas wird beim Anzünden eines Streichholzes zur Verbrennung hauptsächlich benötigt?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Stickstoff", "Wasserstoff"],
        correctIndex: 0,
        explanation: "Jede Verbrennung benötigt Sauerstoff als Oxidationsmittel.",
      },
      {
        category: "Kunst",
        question: "Welche Farbe entsteht beim Mischen von Rot und Blau?",
        options: ["Orange", "Grün", "Violett", "Braun"],
        correctIndex: 2,
        explanation: "Rot und Blau ergeben zusammen Violett bzw. Lila.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage hat der Monat November?",
        options: ["28", "29", "30", "31"],
        correctIndex: 2,
        explanation: "Der November hat 30 Tage.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart wird mit Schlägern, einem kleinen Ball und Löchern auf einer Rasenfläche gespielt?",
        options: ["Cricket", "Golf", "Baseball", "Hockey"],
        correctIndex: 1,
        explanation: "Beim Golf versuchen Spieler, den Ball mit möglichst wenigen Schlägen ins Loch zu bringen.",
      },
      {
        category: "Musik",
        question: "Welcher Komponist schrieb die Oper „Carmen“?",
        options: ["Verdi", "Bizet", "Puccini", "Wagner"],
        correctIndex: 1,
        explanation: "Georges Bizet komponierte die Oper „Carmen“.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Dracula“?",
        options: ["Mary Shelley", "Bram Stoker", "Robert Louis Stevenson", "Oscar Wilde"],
        correctIndex: 1,
        explanation: "Bram Stoker schrieb den einflussreichen Vampirroman „Dracula“ 1897.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte das erste iPhone?",
        options: ["Samsung", "Apple", "Google", "Nokia"],
        correctIndex: 1,
        explanation: "Apple stellte das erste iPhone 2007 vor.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man eine Ansammlung von Gestein und Eis, die um die Sonne kreist und einen Schweif entwickeln kann?",
        options: ["Asteroid", "Komet", "Meteorit", "Zwergplanet"],
        correctIndex: 1,
        explanation: "Kometen bestehen aus Eis und Gestein und entwickeln nahe der Sonne einen charakteristischen Schweif.",
      },
      {
        category: "Physik",
        question: "Wer formulierte die klassischen Bewegungsgesetze und das Gravitationsgesetz?",
        options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Johannes Kepler"],
        correctIndex: 1,
        explanation: "Isaac Newton formulierte im 17. Jahrhundert seine berühmten Bewegungsgesetze.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Wer führte Regie bei „Avatar“ (2009)?",
        options: ["Steven Spielberg", "James Cameron", "Ridley Scott", "Denis Villeneuve"],
        correctIndex: 1,
        explanation: "James Cameron führte bei „Avatar“ Regie, dem lange erfolgreichsten Film weltweit.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache ist eine der ältesten noch aktiv gesprochenen Sprachen der Welt, mit einer eigenen alten Schriftkultur in Indien?",
        options: ["Sanskrit (heute liturgisch)", "Tamil", "Hindi", "Urdu"],
        correctIndex: 1,
        explanation: "Tamil gilt als eine der ältesten noch aktiv im Alltag gesprochenen klassischen Sprachen der Welt.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Unterschied zwischen Exporten und Importen eines Landes?",
        options: ["Handelsbilanz", "Zahlungsbilanz", "Leistungsbilanz (verwandt)", "Kapitalbilanz"],
        correctIndex: 0,
        explanation: "Die Handelsbilanz misst die Differenz zwischen Warenexporten und -importen eines Landes.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Summe der Innenwinkel eines Dreiecks?",
        options: ["90 Grad", "180 Grad", "270 Grad", "360 Grad"],
        correctIndex: 1,
        explanation: "Die Innenwinkelsumme eines Dreiecks beträgt immer 180 Grad.",
      },
      {
        category: "Geografie",
        question: "Welche Halbinsel liegt im äußersten Süden Europas und Asiens verbindend?",
        options: ["Iberische Halbinsel", "Balkanhalbinsel", "Anatolische Halbinsel (Kleinasien)", "Apenninhalbinsel"],
        correctIndex: 2,
        explanation: "Anatolien bzw. Kleinasien bildet den asiatischen Teil der Türkei und verbindet geografisch Europa und Asien.",
      },
      {
        category: "Biologie",
        question: "Wie viele Beine hat ein Insekt normalerweise?",
        options: ["4", "6", "8", "10"],
        correctIndex: 1,
        explanation: "Insekten haben per Definition sechs Beine.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Wer war Alexander der Große?",
        options: ["Ein römischer Kaiser", "Ein makedonischer König und Eroberer", "Ein ägyptischer Pharao", "Ein persischer König"],
        correctIndex: 1,
        explanation: "Alexander der Große eroberte im 4. Jahrhundert v. Chr. ein riesiges Reich von Griechenland bis Indien.",
      },
      {
        category: "Chemie",
        question: "Welches Gas wird von Vulkanen häufig in großen Mengen freigesetzt, neben Wasserdampf und CO2?",
        options: ["Schwefeldioxid", "Sauerstoff", "Helium", "Neon"],
        correctIndex: 0,
        explanation: "Vulkane stoßen neben Wasserdampf und CO2 oft erhebliche Mengen Schwefeldioxid aus.",
      },
      {
        category: "Kunst",
        question: "Welche Kunstrichtung wird mit geometrischen, abstrakten Formen und Piet Mondrian verbunden?",
        options: ["Kubismus", "De Stijl (Neoplastizismus)", "Fauvismus", "Dadaismus"],
        correctIndex: 1,
        explanation: "Mondrian war eine Schlüsselfigur der Bewegung De Stijl mit ihren strengen geometrischen Kompositionen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Welche Farbe hat eine Ampel, wenn man losfahren darf?",
        options: ["Rot", "Gelb", "Grün", "Blau"],
        correctIndex: 2,
        explanation: "Grün signalisiert bei Ampeln freie Fahrt.",
      },
      {
        category: "Sport",
        question: "Wie viele Gänge hat ein modernes Rennrad typischerweise mindestens?",
        options: ["Wenige, meist über 10", "Genau 3", "Genau 5", "Genau 1"],
        correctIndex: 0,
        explanation: "Moderne Rennräder haben meist deutlich über zehn Gänge durch Kombination von Kettenblättern und Ritzeln.",
      },
      {
        category: "Musik",
        question: "Wer komponierte die weltbekannte Filmmusik zu „Star Wars“?",
        options: ["Hans Zimmer", "John Williams", "Danny Elfman", "James Horner"],
        correctIndex: 1,
        explanation: "John Williams komponierte die ikonische Musik zu „Star Wars“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Welcher Autor erhielt den Literaturnobelpreis für Werke wie „Siddhartha“ und „Das Glasperlenspiel“?",
        options: ["Thomas Mann", "Hermann Hesse", "Günter Grass", "Heinrich Böll"],
        correctIndex: 1,
        explanation: "Hermann Hesse erhielt 1946 den Literaturnobelpreis.",
      },
      {
        category: "Technik",
        question: "Wer gründete Microsoft mit?",
        options: ["Steve Jobs", "Bill Gates", "Larry Page", "Mark Zuckerberg"],
        correctIndex: 1,
        explanation: "Bill Gates gründete Microsoft 1975 zusammen mit Paul Allen.",
      },
      {
        category: "Astronomie",
        question: "Wie lange dauert ein Erdentag ungefähr?",
        options: ["12 Stunden", "24 Stunden", "36 Stunden", "48 Stunden"],
        correctIndex: 1,
        explanation: "Ein Erdentag dauert etwa 24 Stunden, die Zeit für eine vollständige Erdrotation.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Welches Teilchen bildet zusammen mit Protonen den Atomkern?",
        options: ["Elektronen", "Neutronen", "Photonen", "Positronen"],
        correctIndex: 1,
        explanation: "Neutronen und Protonen bilden gemeinsam den Atomkern.",
      },
      {
        category: "Film",
        question: "Welches Studio produzierte „Findet Nemo“?",
        options: ["DreamWorks", "Pixar", "Illumination", "Blue Sky Studios"],
        correctIndex: 1,
        explanation: "Pixar produzierte den Animationsfilm „Findet Nemo“.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache verwendet das Devanagari-Schriftsystem hauptsächlich?",
        options: ["Urdu", "Hindi", "Bengali", "Tamil"],
        correctIndex: 1,
        explanation: "Hindi wird traditionell mit der Devanagari-Schrift geschrieben.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Welche Organisation vergibt Kredite an Länder und fördert weltweite wirtschaftliche Entwicklung?",
        options: ["Die Weltbank", "Die WTO", "Die OECD", "Die UNESCO"],
        correctIndex: 0,
        explanation: "Die Weltbank unterstützt Länder mit Krediten und Beratung für wirtschaftliche Entwicklung.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 64?",
        options: ["6", "7", "8", "9"],
        correctIndex: 2,
        explanation: "8 × 8 = 64, also ist die Quadratwurzel aus 64 gleich 8.",
      },
      {
        category: "Geografie",
        question: "Welcher Kontinent hat die meisten Länder?",
        options: ["Asien", "Afrika", "Europa", "Südamerika"],
        correctIndex: 1,
        explanation: "Afrika besteht aus 54 anerkannten Staaten, mehr als jeder andere Kontinent.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Organ produziert rote Blutkörperchen hauptsächlich?",
        options: ["Leber", "Knochenmark", "Milz", "Niere"],
        correctIndex: 1,
        explanation: "Das Knochenmark ist der Hauptort der Blutbildung im menschlichen Körper.",
      },
      {
        category: "Geschichte",
        question: "Wer war Katharina die Große?",
        options: ["Eine britische Königin", "Eine russische Zarin des 18. Jahrhunderts", "Eine österreichische Kaiserin", "Eine schwedische Königin"],
        correctIndex: 1,
        explanation: "Katharina die Große regierte Russland von 1762 bis 1796 und erweiterte das Zarenreich erheblich.",
      },
      {
        category: "Chemie",
        question: "Welches Element gibt Leuchtstoffröhren und bestimmten Lampen ihr charakteristisches Licht (z. B. Neonreklame)?",
        options: ["Argon", "Neon", "Xenon", "Krypton"],
        correctIndex: 1,
        explanation: "Neon erzeugt beim elektrischen Anregen das typische rot-orange leuchtende Licht in Neonreklamen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Welche Kunstrichtung wird mit Pablo Picasso hauptsächlich verbunden?",
        options: ["Impressionismus", "Kubismus", "Surrealismus", "Barock"],
        correctIndex: 1,
        explanation: "Picasso gilt als Mitbegründer des Kubismus.",
      },
      {
        category: "Alltag",
        question: "Wie viele Uhren gibt es normalerweise in einem Zwölf-Stunden-Zyklus, bis die Uhr wieder bei derselben Ziffer steht?",
        options: ["1", "2", "12", "24"],
        correctIndex: 2,
        explanation: "Eine analoge Uhr zeigt zwölf Stunden auf dem Zifferblatt, bevor sie sich wiederholt.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler hat ein Footballteam der NFL insgesamt im Kader ungefähr (aktiver Kader)?",
        options: ["Etwa 30", "Etwa 53", "Etwa 70", "Etwa 100"],
        correctIndex: 1,
        explanation: "Ein aktiver NFL-Kader umfasst in der Regel 53 Spieler.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welche Band gilt als eine der einflussreichsten Metal-Bands mit Sänger Freddie Mercury? (Trickfrage)",
        options: ["Das ist falsch — Freddie Mercury war Sänger von Queen, keiner Metal-Band", "Iron Maiden", "Black Sabbath", "Metallica"],
        correctIndex: 0,
        explanation: "Freddie Mercury war der Sänger der Rockband Queen, nicht einer Metal-Band.",
      },
      {
        category: "Literatur",
        question: "Wer verfasste die Harry-Potter-Bücher?",
        options: ["J.R.R. Tolkien", "J.K. Rowling", "C.S. Lewis", "Roald Dahl"],
        correctIndex: 1,
        explanation: "J.K. Rowling schrieb die Harry-Potter-Buchreihe.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „WLAN“?",
        options: ["Wireless Local Area Network", "World Local Access Node", "Wide Link Area Network", "Wireless Long Antenna Network"],
        correctIndex: 0,
        explanation: "WLAN steht für „Wireless Local Area Network“, ein drahtloses lokales Netzwerk.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man den Punkt, an dem ein Planet der Sonne am nächsten in seiner Umlaufbahn ist?",
        options: ["Aphel", "Perihel", "Apogäum", "Perigäum"],
        correctIndex: 1,
        explanation: "Das Perihel bezeichnet den sonnennächsten Punkt der Umlaufbahn eines Himmelskörpers.",
      },
      {
        category: "Physik",
        question: "Welches Gesetz besagt, dass Energie weder erzeugt noch vernichtet werden kann?",
        options: ["Newtons erstes Gesetz", "Der Energieerhaltungssatz", "Das Ohmsche Gesetz", "Das Coulombsche Gesetz"],
        correctIndex: 1,
        explanation: "Der Energieerhaltungssatz ist eines der fundamentalsten Prinzipien der Physik.",
      },
      {
        category: "Film",
        question: "Wer führte Regie bei „Titanic“ (1997)?",
        options: ["Steven Spielberg", "James Cameron", "Martin Scorsese", "Ridley Scott"],
        correctIndex: 1,
        explanation: "James Cameron führte bei „Titanic“ Regie, das 1997 in die Kinos kam.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Sprache wird in weiten Teilen Lateinamerikas hauptsächlich gesprochen?",
        options: ["Portugiesisch", "Spanisch", "Englisch", "Französisch"],
        correctIndex: 1,
        explanation: "Spanisch ist in den meisten lateinamerikanischen Ländern die Amtssprache.",
      },
      {
        category: "Wirtschaft",
        question: "Welche Institution ist für die Geldpolitik der Eurozone verantwortlich?",
        options: ["Die Weltbank", "Die Europäische Zentralbank (EZB)", "Der Internationale Währungsfonds", "Die Deutsche Bundesbank allein"],
        correctIndex: 1,
        explanation: "Die Europäische Zentralbank (EZB) steuert die Geldpolitik für die Eurozone.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist die Summe der Innenwinkel eines Siebenecks?",
        options: ["720 Grad", "810 Grad", "900 Grad", "990 Grad"],
        correctIndex: 2,
        explanation: "Die Innenwinkelsumme eines Siebenecks beträgt 900 Grad.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "In welchem Land liegt die Insel Bali?",
        options: ["Thailand", "Philippinen", "Indonesien", "Malaysia"],
        correctIndex: 2,
        explanation: "Bali ist eine der bekanntesten Inseln Indonesiens.",
      },
      {
        category: "Biologie",
        question: "Wie viele Kammern hat ein Fischherz?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Ein Fischherz besteht aus einer Vorkammer und einer Hauptkammer.",
      },
      {
        category: "Geschichte",
        question: "Wer war Otto von Bismarck?",
        options: ["Ein österreichischer Kaiser", "Der erste Reichskanzler des Deutschen Reiches", "Ein preußischer König", "Ein deutscher Dichter"],
        correctIndex: 1,
        explanation: "Bismarck einte 1871 die deutschen Staaten und wurde erster Reichskanzler.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Fe“?",
        options: ["Fluor", "Eisen", "Francium", "Ferrum (kein eigenes Element)"],
        correctIndex: 1,
        explanation: "Eisen wird mit „Fe“ abgekürzt, vom lateinischen „Ferrum“.",
      },
      {
        category: "Kunst",
        question: "Wer schuf die Skulpturenreihe „Die Bürger von Calais“?",
        options: ["Auguste Rodin", "Camille Claudel", "Constantin Brâncuși", "Henry Moore"],
        correctIndex: 0,
        explanation: "Auguste Rodin schuf dieses bekannte Denkmal, das heldenhafte Bürger von Calais darstellt.",
      },
      {
        category: "Alltag",
        question: "Wie viele Zähne hat eine normale Gabel meist?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Eine klassische Gabel hat üblicherweise vier Zinken.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart nutzt einen kleinen weißen Ball, der in ein Netz über einer Platte geschlagen wird?",
        options: ["Badminton", "Tischtennis", "Squash", "Volleyball"],
        correctIndex: 1,
        explanation: "Beim Tischtennis wird ein kleiner Ball über ein Netz auf einer Platte geschlagen.",
      },
      {
        category: "Musik",
        question: "Wie nennt man die höchste weibliche Singstimme?",
        options: ["Alt", "Mezzosopran", "Sopran", "Bariton"],
        correctIndex: 2,
        explanation: "Der Sopran ist die höchste klassische Frauenstimme.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Der Zauberberg“?",
        options: ["Hermann Hesse", "Thomas Mann", "Franz Kafka", "Robert Musil"],
        correctIndex: 1,
        explanation: "Thomas Mann schrieb den Roman „Der Zauberberg“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wer gilt als Erfinder der Glühbirne, obwohl er sie eher entscheidend verbesserte?",
        options: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "James Watt"],
        correctIndex: 1,
        explanation: "Thomas Edison entwickelte 1879 eine praxistaugliche Glühbirne, auch wenn frühere Versionen existierten.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet hat den Spitznamen „Roter Planet“?",
        options: ["Venus", "Mars", "Jupiter", "Merkur"],
        correctIndex: 1,
        explanation: "Mars erscheint aufgrund von Eisenoxid im Boden rötlich.",
      },
      {
        category: "Physik",
        question: "Welche Grundkraft der Physik hält Atomkerne zusammen?",
        options: ["Gravitation", "Starke Kernkraft", "Elektromagnetismus", "Schwache Kernkraft"],
        correctIndex: 1,
        explanation: "Die starke Kernkraft hält Protonen und Neutronen im Atomkern zusammen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Wer führte Regie bei der „Herr der Ringe“-Trilogie?",
        options: ["Steven Spielberg", "Peter Jackson", "James Cameron", "Christopher Nolan"],
        correctIndex: 1,
        explanation: "Peter Jackson führte bei der Verfilmung von Tolkiens „Herr der Ringe“ Regie.",
      },
      {
        category: "Sprache",
        question: "In welchem Land ist Deutsch eine von mehreren Amtssprachen, obwohl es kein deutschsprachiges Kernland ist?",
        options: ["Frankreich", "Belgien", "Spanien", "Portugal"],
        correctIndex: 1,
        explanation: "In Belgien ist Deutsch neben Niederländisch und Französisch eine der drei Amtssprachen.",
      },
      {
        category: "Wirtschaft",
        question: "Welcher Wirtschaftszweig umfasst Landwirtschaft, Fischerei und Bergbau?",
        options: ["Primärsektor", "Sekundärsektor", "Tertiärsektor", "Quartärsektor"],
        correctIndex: 0,
        explanation: "Der Primärsektor umfasst die Gewinnung von Rohstoffen wie Landwirtschaft und Bergbau.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Ecken hat ein Fünfeck?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "Ein Fünfeck hat fünf Ecken, ebenso viele wie Seiten.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Spanien?",
        options: ["Barcelona", "Madrid", "Sevilla", "Valencia"],
        correctIndex: 1,
        explanation: "Madrid ist die Hauptstadt und größte Stadt Spaniens.",
      },
      {
        category: "Biologie",
        question: "Welches Tier gilt als engster Verwandter des Menschen unter den Menschenaffen?",
        options: ["Gorilla", "Schimpanse", "Orang-Utan", "Gibbon"],
        correctIndex: 1,
        explanation: "Schimpansen gelten genetisch als die nächsten lebenden Verwandten des Menschen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Wer war Nelson Mandela?",
        options: ["Ein amerikanischer Bürgerrechtler", "Ein südafrikanischer Anti-Apartheid-Aktivist und späterer Präsident", "Ein britischer Premierminister", "Ein kenianischer Unabhängigkeitsführer"],
        correctIndex: 1,
        explanation: "Nelson Mandela kämpfte gegen die Apartheid und wurde 1994 erster demokratisch gewählter Präsident Südafrikas.",
      },
      {
        category: "Chemie",
        question: "Wie viele Atome hat ein Wassermolekül insgesamt?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Ein Wassermolekül (H2O) besteht aus insgesamt drei Atomen: zwei Wasserstoff und ein Sauerstoff.",
      },
      {
        category: "Kunst",
        question: "Welcher Künstler ist für seine Werke mit Suppendosen und Marilyn Monroe bekannt?",
        options: ["Roy Lichtenstein", "Andy Warhol", "Jasper Johns", "Jean-Michel Basquiat"],
        correctIndex: 1,
        explanation: "Andy Warhol war eine Schlüsselfigur der Pop-Art-Bewegung.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Scheiben Brot sind für ein klassisches Sandwich üblicherweise nötig?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Ein klassisches Sandwich besteht meist aus zwei Scheiben Brot.",
      },
      {
        category: "Sport",
        question: "Wie viele Meter misst eine olympische Laufbahn einmal rundum?",
        options: ["300 m", "400 m", "500 m", "600 m"],
        correctIndex: 1,
        explanation: "Eine Standard-Leichtathletikbahn ist 400 Meter lang.",
      },
      {
        category: "Musik",
        question: "Wie viele Musiker bilden klassischerweise ein Streichquartett?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Ein Streichquartett besteht aus vier Musikern, meist zwei Violinen, Bratsche und Cello.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Der große Gatsby“?",
        options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],
        correctIndex: 1,
        explanation: "F. Scott Fitzgerald schrieb „Der große Gatsby“, veröffentlicht 1925.",
      },
      {
        category: "Technik",
        question: "Wer entwickelte das erste funktionsfähige Telefon-Patent 1876 praktisch parallel zu einem anderen Erfinder?",
        options: ["Alexander Graham Bell und Elisha Gray", "Thomas Edison und Nikola Tesla", "Guglielmo Marconi und Bell", "Edison und Bell"],
        correctIndex: 0,
        explanation: "Bell und Elisha Gray reichten ihre Telefon-Patente fast zeitgleich 1876 ein.",
      },
      {
        category: "Astronomie",
        question: "Welcher Stern ist von der Erde aus am hellsten am Nachthimmel (außer der Sonne)?",
        options: ["Polarstern", "Sirius", "Beteigeuze", "Wega"],
        correctIndex: 1,
        explanation: "Sirius ist der hellste Stern am Nachthimmel, abgesehen von unserer Sonne.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Welche berühmte Formel beschreibt die Äquivalenz von Masse und Energie?",
        options: ["F = ma", "E = mc²", "P = UI", "F = G(m1m2)/r²"],
        correctIndex: 1,
        explanation: "Einsteins Formel E = mc² beschreibt die Äquivalenz von Masse und Energie.",
      },
      {
        category: "Film",
        question: "Welcher Regisseur ist bekannt für Filme wie „Psycho“ und „Vertigo“?",
        options: ["Orson Welles", "Alfred Hitchcock", "Billy Wilder", "Stanley Kubrick"],
        correctIndex: 1,
        explanation: "Alfred Hitchcock gilt als „Meister der Spannung“ mit Klassikern wie „Psycho“.",
      },
      {
        category: "Sprache",
        question: "Welche Schrift wird für die arabische Sprache verwendet?",
        options: ["Lateinische Schrift", "Arabische Schrift", "Kyrillische Schrift", "Griechische Schrift"],
        correctIndex: 1,
        explanation: "Arabisch wird mit der arabischen Schrift von rechts nach links geschrieben.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Gesamtwert aller in einem Land produzierten Güter und Dienstleistungen in einem Jahr?",
        options: ["Bruttoinlandsprodukt (BIP)", "Bruttonationaleinkommen", "Staatshaushalt", "Handelsbilanz"],
        correctIndex: 0,
        explanation: "Das Bruttoinlandsprodukt (BIP) misst den Gesamtwert aller im Inland produzierten Güter und Dienstleistungen.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Flächen hat eine Pyramide mit quadratischer Grundfläche?",
        options: ["4", "5", "6", "8"],
        correctIndex: 1,
        explanation: "Eine quadratische Pyramide hat eine Grundfläche plus vier Dreiecksflächen, also fünf Flächen insgesamt.",
      },
      {
        category: "Geografie",
        question: "Welche Wüste ist die größte heiße Wüste der Welt?",
        options: ["Gobi", "Kalahari", "Sahara", "Atacama"],
        correctIndex: 2,
        explanation: "Die Sahara ist mit rund 9 Millionen km² die größte heiße Wüste der Erde.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Tier hat die Fähigkeit, sich vollständig einzurollen zum Schutz?",
        options: ["Igel", "Fuchs", "Dachs", "Marder"],
        correctIndex: 0,
        explanation: "Igel rollen sich bei Gefahr zu einer stacheligen Kugel zusammen.",
      },
      {
        category: "Geschichte",
        question: "Welches Land wurde von Napoleon 1812 erfolglos angegriffen?",
        options: ["Spanien", "Russland", "Österreich", "Preußen"],
        correctIndex: 1,
        explanation: "Napoleons Russlandfeldzug 1812 endete in einer verheerenden Niederlage.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „N“?",
        options: ["Nickel", "Stickstoff", "Natrium", "Neon"],
        correctIndex: 1,
        explanation: "Stickstoff wird mit „N“ abgekürzt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Welcher spanische Künstler ist für surreale, traumhafte Bilder wie schmelzende Uhren bekannt?",
        options: ["Joan Miró", "Salvador Dalí", "Francisco Goya", "Diego Velázquez"],
        correctIndex: 1,
        explanation: "Salvador Dalí prägte mit Werken wie „Die Beständigkeit der Erinnerung“ den Surrealismus.",
      },
      {
        category: "Alltag",
        question: "Welches Werkzeug benutzt man typischerweise, um einen Nagel in die Wand zu schlagen?",
        options: ["Schraubenzieher", "Hammer", "Zange", "Säge"],
        correctIndex: 1,
        explanation: "Ein Hammer wird klassisch verwendet, um Nägel einzuschlagen.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell beim Super Bowl in den USA ausgetragen?",
        options: ["Baseball", "Basketball", "American Football", "Eishockey"],
        correctIndex: 2,
        explanation: "Der Super Bowl ist das Finale der American-Football-Liga NFL.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welches Land gilt als Ursprungsland des Tangos?",
        options: ["Brasilien", "Argentinien", "Spanien", "Kuba"],
        correctIndex: 1,
        explanation: "Der Tango entstand im späten 19. Jahrhundert in Argentinien, vor allem in Buenos Aires.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Anna Karenina“?",
        options: ["Fjodor Dostojewski", "Lew Tolstoi", "Boris Pasternak", "Anton Tschechow"],
        correctIndex: 1,
        explanation: "Lew Tolstoi schrieb den Roman „Anna Karenina“.",
      },
      {
        category: "Technik",
        question: "Wer gilt als Pionier der Wechselstromtechnik, oft im Gegensatz zu Edisons Gleichstrom?",
        options: ["Nikola Tesla", "James Watt", "Michael Faraday", "André-Marie Ampère"],
        correctIndex: 0,
        explanation: "Nikola Tesla trug entscheidend zur Entwicklung der Wechselstromtechnik bei.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welcher Planet ist der Erde am nächsten (im Durchschnitt)?",
        options: ["Mars", "Venus", "Merkur", "Jupiter"],
        correctIndex: 1,
        explanation: "Die Venus ist im zeitlichen Durchschnitt der Erde am nächsten unter den Planeten.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für elektrische Spannung?",
        options: ["Ampere", "Volt", "Ohm", "Watt"],
        correctIndex: 1,
        explanation: "Volt ist die Einheit der elektrischen Spannung, benannt nach Alessandro Volta.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte den Hauptcharakter in „The Revenant“ und gewann dafür einen Oscar?",
        options: ["Tom Hardy", "Leonardo DiCaprio", "Matthew McConaughey", "Christian Bale"],
        correctIndex: 1,
        explanation: "Leonardo DiCaprio gewann für „The Revenant“ seinen ersten Oscar als bester Hauptdarsteller.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie nennt man einen bildhaften sprachlichen Ausdruck ohne „wie“ oder „als“, der etwas direkt mit etwas anderem gleichsetzt?",
        options: ["Metapher", "Vergleich", "Alliteration", "Hyperbel"],
        correctIndex: 0,
        explanation: "Eine Metapher überträgt eine Bedeutung direkt, ohne Vergleichswort.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man die Steuer, die auf den Kauf von Waren und Dienstleistungen erhoben wird?",
        options: ["Einkommensteuer", "Mehrwertsteuer", "Körperschaftsteuer", "Erbschaftsteuer"],
        correctIndex: 1,
        explanation: "Die Mehrwertsteuer (Umsatzsteuer) wird auf den Verkauf von Waren und Dienstleistungen erhoben.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Diagonalen hat ein Quadrat?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Ein Quadrat hat genau zwei Diagonalen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land besitzt die Pyramiden von Gizeh?",
        options: ["Sudan", "Ägypten", "Libyen", "Jordanien"],
        correctIndex: 1,
        explanation: "Die Pyramiden von Gizeh liegen in Ägypten, nahe Kairo.",
      },
      {
        category: "Biologie",
        question: "Wie viele Herzen hat ein Regenwurm ungefähr?",
        options: ["1", "3", "5", "10"],
        correctIndex: 2,
        explanation: "Regenwürmer besitzen mehrere Herzkammern, meist wird von fünf Hauptpaaren gesprochen.",
      },
      {
        category: "Geschichte",
        question: "Wer war Genghis (Dschingis) Khan?",
        options: ["Ein chinesischer Kaiser", "Der Gründer des Mongolischen Reiches", "Ein persischer Herrscher", "Ein osmanischer Sultan"],
        correctIndex: 1,
        explanation: "Dschingis Khan gründete im frühen 13. Jahrhundert das Mongolische Reich.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Element wird für die Beschichtung von Stahl gegen Korrosion (Verzinkung) verwendet?",
        options: ["Chrom", "Zink", "Nickel", "Kupfer"],
        correctIndex: 1,
        explanation: "Beim Verzinken wird Stahl mit einer Schutzschicht aus Zink überzogen.",
      },
      {
        category: "Kunst",
        question: "Wer malte zahlreiche Seerosenbilder in seinem Garten in Giverny?",
        options: ["Claude Monet", "Edgar Degas", "Pierre-Auguste Renoir", "Camille Pissarro"],
        correctIndex: 0,
        explanation: "Claude Monet malte seine berühmten Seerosenbilder in seinem Garten in Giverny.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tassen entsprechen ungefähr einem Liter (bei 250-ml-Tassen)?",
        options: ["2", "4", "6", "8"],
        correctIndex: 1,
        explanation: "Bei 250-Milliliter-Tassen entsprechen vier Tassen etwa einem Liter.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Spieler hat eine Handballmannschaft auf dem Feld gleichzeitig?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        explanation: "Beim Handball stehen sieben Spieler pro Team gleichzeitig auf dem Feld, inklusive Torwart.",
      },
      {
        category: "Musik",
        question: "Welches Instrument wird traditionell in einer Mariachi-Band aus Mexiko verwendet?",
        options: ["Dudelsack", "Trompete und Gitarre", "Sitar", "Didgeridoo"],
        correctIndex: 1,
        explanation: "Mariachi-Bands nutzen typischerweise Trompeten, Gitarren und Geigen.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Harry Potter“?",
        options: ["J.R.R. Tolkien", "J.K. Rowling", "C.S. Lewis", "Roald Dahl"],
        correctIndex: 1,
        explanation: "J.K. Rowling schrieb die „Harry Potter“-Buchreihe.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wer entwickelte den ersten praktikablen Computer-Algorithmus und gilt als eine der ersten Programmiererinnen?",
        options: ["Grace Hopper", "Ada Lovelace", "Katherine Johnson", "Margaret Hamilton"],
        correctIndex: 1,
        explanation: "Ada Lovelace gilt als eine der ersten Programmiererinnen der Geschichte im 19. Jahrhundert.",
      },
      {
        category: "Astronomie",
        question: "Wie viele Planeten hat unser Sonnensystem offiziell?",
        options: ["7", "8", "9", "10"],
        correctIndex: 1,
        explanation: "Seit der Neuklassifizierung von Pluto 2006 zählt das Sonnensystem offiziell acht Planeten.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Erscheinung, bei der sich Wellen überlagern und verstärken oder auslöschen?",
        options: ["Beugung", "Interferenz", "Brechung", "Polarisation"],
        correctIndex: 1,
        explanation: "Interferenz beschreibt die Überlagerung von Wellen, die sich verstärken oder aufheben können.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welches Filmstudio steht hinter Mickey Mouse und vielen Klassikern wie „Schneewittchen“?",
        options: ["Warner Bros.", "Walt Disney", "Universal", "Paramount"],
        correctIndex: 1,
        explanation: "Walt Disney Studios produzierte Klassiker wie „Schneewittchen und die sieben Zwerge“.",
      },
      {
        category: "Sprache",
        question: "Wie nennt man zwei Wörter mit gleicher Bedeutung?",
        options: ["Antonyme", "Synonyme", "Homonyme", "Homophone"],
        correctIndex: 1,
        explanation: "Synonyme sind Wörter mit gleicher oder sehr ähnlicher Bedeutung.",
      },
      {
        category: "Wirtschaft",
        question: "Welches Land hat die größte Volkswirtschaft der Welt nach nominalem BIP (Stand grob aktuelle Jahre)?",
        options: ["China", "USA", "Japan", "Deutschland"],
        correctIndex: 1,
        explanation: "Die USA haben nach nominalem Bruttoinlandsprodukt die größte Volkswirtschaft der Welt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 100?",
        options: ["9", "10", "11", "12"],
        correctIndex: 1,
        explanation: "10 × 10 = 100, also ist die Quadratwurzel aus 100 gleich 10.",
      },
      {
        category: "Geografie",
        question: "Welcher Kontinent ist am dünnsten besiedelt?",
        options: ["Antarktis", "Australien", "Südamerika", "Afrika"],
        correctIndex: 0,
        explanation: "Die Antarktis hat keine dauerhafte Wohnbevölkerung, nur Forschungsstationen.",
      },
      {
        category: "Biologie",
        question: "Welches Tier legt die meisten Eier auf einmal unter Vögeln (relativ groß)?",
        options: ["Huhn", "Strauß", "Pinguin", "Ente"],
        correctIndex: 1,
        explanation: "Straußeneier gehören zu den größten Eiern lebender Vogelarten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahrhundert lebte Leonardo da Vinci hauptsächlich?",
        options: ["14. Jahrhundert", "15. und 16. Jahrhundert", "17. Jahrhundert", "18. Jahrhundert"],
        correctIndex: 1,
        explanation: "Leonardo da Vinci lebte von 1452 bis 1519.",
      },
      {
        category: "Chemie",
        question: "Welches Gas ist geruchlos, farblos und macht die Luft überwiegend aus, ist aber selbst chemisch reaktionsträge?",
        options: ["Sauerstoff", "Stickstoff", "Kohlenstoffdioxid", "Argon"],
        correctIndex: 1,
        explanation: "Stickstoff ist chemisch relativ inert und macht den Hauptteil der Luft aus.",
      },
      {
        category: "Kunst",
        question: "In welcher Stadt befindet sich die Tate Modern?",
        options: ["Manchester", "London", "Edinburgh", "Liverpool"],
        correctIndex: 1,
        explanation: "Die Tate Modern ist ein bedeutendes Museum für moderne Kunst in London.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Spieler bilden ein Schachpaar bei einer Partie?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Eine klassische Schachpartie wird zwischen zwei Spielern ausgetragen.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler hat eine Volleyballmannschaft auf dem Feld gleichzeitig?",
        options: ["4", "5", "6", "7"],
        correctIndex: 2,
        explanation: "Beim Volleyball stehen sechs Spieler pro Team gleichzeitig auf dem Feld.",
      },
      {
        category: "Musik",
        question: "Wie viele Töne hat eine chromatische Tonleiter innerhalb einer Oktave?",
        options: ["7", "8", "12", "14"],
        correctIndex: 2,
        explanation: "Die chromatische Tonleiter umfasst zwölf Halbtonschritte innerhalb einer Oktave.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Sturmhöhe“ (Wuthering Heights)?",
        options: ["Jane Austen", "Emily Brontë", "Charlotte Brontë", "George Eliot"],
        correctIndex: 1,
        explanation: "Emily Brontë schrieb den einzigen Roman ihres Werks, „Sturmhöhe“.",
      },
      {
        category: "Technik",
        question: "Wer erfand den Buchdruck mit beweglichen Lettern?",
        options: ["Leonardo da Vinci", "Johannes Gutenberg", "Isaac Newton", "Galileo Galilei"],
        correctIndex: 1,
        explanation: "Johannes Gutenberg revolutionierte im 15. Jahrhundert den Buchdruck.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man einen Himmelskörper, der die Sonne umkreist, aber zu klein für einen vollwertigen Planeten gilt, wie Pluto?",
        options: ["Asteroid", "Zwergplanet", "Komet", "Mond"],
        correctIndex: 1,
        explanation: "Pluto wurde 2006 als Zwergplanet neu klassifiziert.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Welches Element entdeckte Marie Curie zusammen mit ihrem Mann?",
        options: ["Uran", "Radium und Polonium", "Plutonium", "Thorium"],
        correctIndex: 1,
        explanation: "Marie und Pierre Curie entdeckten die Elemente Radium und Polonium.",
      },
      {
        category: "Film",
        question: "Wer führte Regie bei „Der weiße Hai“ (1975)?",
        options: ["George Lucas", "Steven Spielberg", "Francis Ford Coppola", "Martin Scorsese"],
        correctIndex: 1,
        explanation: "Steven Spielberg führte bei „Der weiße Hai“ Regie, oft als erster Blockbuster der Filmgeschichte bezeichnet.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache stammt hauptsächlich aus dem Arabischen, Persischen und Türkischen und wurde in der osmanischen Verwaltung genutzt?",
        options: ["Osmanisch", "Kurdisch", "Aramäisch", "Hebräisch"],
        correctIndex: 0,
        explanation: "Osmanisch war die Verwaltungssprache des Osmanischen Reiches mit starken arabischen und persischen Einflüssen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Vorgang, wenn ein Unternehmen Anteile erstmals öffentlich an der Börse verkauft?",
        options: ["Fusion", "Börsengang (IPO)", "Übernahme", "Insolvenz"],
        correctIndex: 1,
        explanation: "Ein Börsengang (Initial Public Offering, IPO) ist der erste öffentliche Verkauf von Unternehmensanteilen.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 88 geteilt durch 4?",
        options: ["20", "21", "22", "23"],
        correctIndex: 2,
        explanation: "88 ÷ 4 = 22.",
      },
      {
        category: "Geografie",
        question: "Welcher Fluss durchfließt Paris?",
        options: ["Rhône", "Loire", "Seine", "Garonne"],
        correctIndex: 2,
        explanation: "Die Seine fließt mitten durch Paris.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Gas atmen Pflanzen bei der Fotosynthese hauptsächlich ein?",
        options: ["Sauerstoff", "Stickstoff", "Kohlenstoffdioxid", "Wasserstoff"],
        correctIndex: 2,
        explanation: "Pflanzen nehmen CO₂ auf und wandeln es mit Wasser und Licht in Zucker um.",
      },
      {
        category: "Geschichte",
        question: "Welche Zivilisation entwickelte eine der ersten bekannten Schriftsysteme, die Keilschrift?",
        options: ["Ägypter", "Sumerer", "Griechen", "Phönizier"],
        correctIndex: 1,
        explanation: "Die Sumerer in Mesopotamien entwickelten die Keilschrift, eines der ältesten bekannten Schriftsysteme.",
      },
      {
        category: "Chemie",
        question: "Welches Gas wird zur Desinfektion von Schwimmbadwasser häufig verwendet?",
        options: ["Sauerstoff", "Chlor", "Stickstoff", "Helium"],
        correctIndex: 1,
        explanation: "Chlorverbindungen werden häufig zur Desinfektion von Schwimmbädern eingesetzt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer malte zahlreiche Werke mit Ballerinen als Hauptmotiv?",
        options: ["Claude Monet", "Edgar Degas", "Paul Cézanne", "Alfred Sisley"],
        correctIndex: 1,
        explanation: "Edgar Degas ist berühmt für seine zahlreichen Gemälde von Balletttänzerinnen.",
      },
      {
        category: "Alltag",
        question: "Wie viele Minuten hat eine Viertelstunde?",
        options: ["10", "15", "20", "25"],
        correctIndex: 1,
        explanation: "Eine Viertelstunde hat 15 Minuten.",
      },
      {
        category: "Sport",
        question: "Welche Sportart nutzt traditionell einen Rodel oder Schlitten auf einer Eisbahn?",
        options: ["Bobsport", "Rodeln", "Skeleton", "Alle drei genannten Sportarten"],
        correctIndex: 3,
        explanation: "Bob, Rodel und Skeleton nutzen alle eine Eisbahn mit Schlitten, unterscheiden sich aber in Technik und Position.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welcher Komponist schrieb die Oper „Der Ring des Nibelungen“?",
        options: ["Verdi", "Wagner", "Puccini", "Strauss"],
        correctIndex: 1,
        explanation: "Richard Wagner schuf den monumentalen Opernzyklus „Der Ring des Nibelungen“.",
      },
      {
        category: "Literatur",
        question: "Welcher Autor schrieb „Der kleine Prinz“?",
        options: ["Jules Verne", "Antoine de Saint-Exupéry", "Albert Camus", "Victor Hugo"],
        correctIndex: 1,
        explanation: "Antoine de Saint-Exupéry schrieb den poetischen Klassiker „Der kleine Prinz“.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „SSD“ als Speichermedium?",
        options: ["Solid State Drive", "Secure Storage Device", "System Speed Drive", "Static Save Disk"],
        correctIndex: 0,
        explanation: "SSD steht für „Solid State Drive“, einen Halbleiterspeicher ohne bewegliche Teile.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man die Erscheinung, wenn der Mond der Erde besonders nahe und daher größer erscheint?",
        options: ["Blutmond", "Supermond", "Halbmond", "Neumond"],
        correctIndex: 1,
        explanation: "Ein Supermond entsteht, wenn der Vollmond zeitgleich mit seiner erdnächsten Position (Perigäum) zusammenfällt.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Kraft, die Objekte zur Erde zieht?",
        options: ["Magnetismus", "Schwerkraft (Gravitation)", "Reibung", "Elektrizität"],
        correctIndex: 1,
        explanation: "Die Schwerkraft zieht Objekte zur Erdmitte.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte Neo im Film „The Matrix“?",
        options: ["Brad Pitt", "Keanu Reeves", "Tom Cruise", "Will Smith"],
        correctIndex: 1,
        explanation: "Keanu Reeves spielte die Hauptrolle Neo in „The Matrix“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Sprache ist eng mit Niederländisch verwandt und wird u. a. in Südafrika gesprochen?",
        options: ["Zulu", "Afrikaans", "Xhosa", "Swahili"],
        correctIndex: 1,
        explanation: "Afrikaans entwickelte sich aus dem Niederländischen der Siedler in Südafrika.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Prozess, bei dem ein Unternehmen zahlungsunfähig wird und Konkurs anmeldet?",
        options: ["Fusion", "Insolvenz", "Liquidation (Teilbegriff)", "Rezession"],
        correctIndex: 1,
        explanation: "Insolvenz beschreibt die Zahlungsunfähigkeit eines Unternehmens oder einer Privatperson.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 2 hoch 8 (2⁸)?",
        options: ["128", "256", "512", "64"],
        correctIndex: 1,
        explanation: "2⁸ = 256.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "In welchem Land liegt Timbuktu?",
        options: ["Niger", "Mali", "Tschad", "Senegal"],
        correctIndex: 1,
        explanation: "Timbuktu liegt in Mali und war einst ein bedeutendes Handelszentrum.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt für seine Fähigkeit, Gliedmaßen nachwachsen zu lassen?",
        options: ["Frosch", "Salamander", "Eidechse (nur Schwanz)", "Beide, Salamander und Eidechse"],
        correctIndex: 3,
        explanation: "Sowohl Salamander (ganze Gliedmaßen) als auch viele Eidechsen (vor allem den Schwanz) können Körperteile regenerieren.",
      },
      {
        category: "Geschichte",
        question: "Wer war Cleopatra?",
        options: ["Eine römische Kaiserin", "Die letzte Pharaonin Ägyptens", "Eine griechische Königin", "Eine persische Herrscherin"],
        correctIndex: 1,
        explanation: "Kleopatra VII. war die letzte regierende Pharaonin des Alten Ägypten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Wie viele Wertigkeiten (Bindungen) geht Kohlenstoff typischerweise ein?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Kohlenstoff ist vierbindig und kann vier kovalente Bindungen eingehen.",
      },
      {
        category: "Kunst",
        question: "Wer war für seine Drip-Painting-Technik bekannt, bei der Farbe auf die Leinwand geschüttet wurde?",
        options: ["Willem de Kooning", "Jackson Pollock", "Franz Kline", "Mark Rothko"],
        correctIndex: 1,
        explanation: "Jackson Pollock entwickelte die charakteristische Technik des Drip-Painting.",
      },
      {
        category: "Alltag",
        question: "Wie viele Farben hat eine klassische deutsche Flagge?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Die deutsche Flagge besteht aus den drei Farben Schwarz, Rot und Gold.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche olympische Disziplin kombiniert Schwimmen, Radfahren und Laufen?",
        options: ["Zehnkampf", "Triathlon", "Duathlon", "Pentathlon"],
        correctIndex: 1,
        explanation: "Der Triathlon besteht aus den drei Disziplinen Schwimmen, Radfahren und Laufen.",
      },
      {
        category: "Musik",
        question: "Wie viele Hörner hat ein klassisches Orchester in der Blechbläsergruppe üblicherweise?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Ein klassisches Sinfonieorchester setzt meist vier Waldhörner ein.",
      },
      {
        category: "Literatur",
        question: "Welcher Autor schrieb „Der alte Mann und das Meer“?",
        options: ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck", "William Faulkner"],
        correctIndex: 1,
        explanation: "Ernest Hemingway schrieb die Novelle „Der alte Mann und das Meer“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte das Betriebssystem iOS für iPhones?",
        options: ["Google", "Apple", "Samsung", "Microsoft"],
        correctIndex: 1,
        explanation: "Apple entwickelt und pflegt das Betriebssystem iOS für seine iPhones.",
      },
      {
        category: "Astronomie",
        question: "Wie viele Monde hat die Erde?",
        options: ["0", "1", "2", "3"],
        correctIndex: 1,
        explanation: "Die Erde hat genau einen natürlichen Mond.",
      },
      {
        category: "Physik",
        question: "Wer stellte die berühmten Bewegungsgesetze auf, die als Newtonsche Axiome bekannt sind?",
        options: ["Galileo Galilei", "Isaac Newton", "Albert Einstein", "James Clerk Maxwell"],
        correctIndex: 1,
        explanation: "Isaac Newton formulierte in seinem Werk „Principia“ die drei klassischen Bewegungsgesetze.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Film erzählt von einem Fisch namens Marlin, der seinen Sohn Nemo sucht?",
        options: ["Findet Nemo", "Das große Krabbeln", "Rio", "Shark Tale"],
        correctIndex: 0,
        explanation: "„Findet Nemo“ erzählt die Geschichte des Clownfischs Marlin auf der Suche nach seinem Sohn.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache gilt als Ursprung vieler romanischer Sprachen wie Französisch, Spanisch und Italienisch?",
        options: ["Griechisch", "Latein", "Keltisch", "Germanisch"],
        correctIndex: 1,
        explanation: "Latein ist die gemeinsame Wurzel der romanischen Sprachen.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Rückgang des allgemeinen Preisniveaus über die Zeit?",
        options: ["Inflation", "Deflation", "Stagflation", "Rezession"],
        correctIndex: 1,
        explanation: "Deflation beschreibt einen anhaltenden Rückgang des allgemeinen Preisniveaus.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein Zehneck?",
        options: ["9", "10", "11", "12"],
        correctIndex: 1,
        explanation: "Ein Zehneck (Dekagon) hat zehn Seiten.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt die Stadt Kyoto?",
        options: ["China", "Südkorea", "Japan", "Thailand"],
        correctIndex: 2,
        explanation: "Kyoto war jahrhundertelang die Kaiserstadt Japans.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist für sein extrem gutes Farbsehen bekannt, das dem des Menschen überlegen ist?",
        options: ["Hund", "Biene", "Fangschreckenkrebs", "Katze"],
        correctIndex: 2,
        explanation: "Der Fangschreckenkrebs besitzt eines der komplexesten Farbsehsysteme im Tierreich.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die erste Dampfmaschine von James Watt entscheidend verbessert?",
        options: ["1712", "1769", "1804", "1830"],
        correctIndex: 1,
        explanation: "James Watt verbesserte 1769 die Dampfmaschine entscheidend, was die industrielle Revolution vorantrieb.",
      },
      {
        category: "Chemie",
        question: "Welches Gas macht etwa 21 % der Erdatmosphäre aus?",
        options: ["Stickstoff", "Sauerstoff", "Kohlenstoffdioxid", "Argon"],
        correctIndex: 1,
        explanation: "Sauerstoff macht rund 21 % der Erdatmosphäre aus.",
      },
      {
        category: "Kunst",
        question: "Wer malte den Deckenfresko „Der Sturz der Verdammten“ und weitere Werke in der Sixtinischen Kapelle?",
        options: ["Raffael", "Michelangelo", "Botticelli", "Perugino"],
        correctIndex: 1,
        explanation: "Michelangelo schuf sowohl die Deckenfresken als auch das Jüngste Gericht in der Sixtinischen Kapelle.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Karten hat ein klassisches französisches Kartenspiel (Poker/Rommé)?",
        options: ["32", "36", "52", "54"],
        correctIndex: 2,
        explanation: "Ein Standard-Kartenspiel mit französischem Blatt hat 52 Karten.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler bilden ein Rugby-Union-Team auf dem Feld?",
        options: ["11", "13", "15", "17"],
        correctIndex: 2,
        explanation: "Rugby Union wird mit 15 Spielern pro Team gespielt.",
      },
      {
        category: "Musik",
        question: "Welche Band veröffentlichte das Konzeptalbum „The Dark Side of the Moon“?",
        options: ["Led Zeppelin", "Pink Floyd", "Genesis", "Yes"],
        correctIndex: 1,
        explanation: "„The Dark Side of the Moon“ ist ein Klassiker der Band Pink Floyd von 1973.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Die Blechtrommel“?",
        options: ["Heinrich Böll", "Günter Grass", "Christa Wolf", "Siegfried Lenz"],
        correctIndex: 1,
        explanation: "Günter Grass schrieb den Roman „Die Blechtrommel“, für den er später den Literaturnobelpreis erhielt.",
      },
      {
        category: "Technik",
        question: "Wer gründete Tesla, Inc. maßgeblich mit und leitet es als CEO?",
        options: ["Jeff Bezos", "Elon Musk", "Mark Zuckerberg", "Larry Page"],
        correctIndex: 1,
        explanation: "Elon Musk ist seit langem CEO und eine treibende Kraft hinter Tesla.",
      },
      {
        category: "Astronomie",
        question: "Welches Land startete 1957 den ersten künstlichen Satelliten Sputnik ins All?",
        options: ["USA", "Sowjetunion", "China", "Deutschland"],
        correctIndex: 1,
        explanation: "Die Sowjetunion startete 1957 mit Sputnik 1 den ersten künstlichen Erdsatelliten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Welche Krafteinheit ist nach Isaac Newton benannt?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctIndex: 1,
        explanation: "Die Krafteinheit Newton (N) ist nach Isaac Newton benannt.",
      },
      {
        category: "Film",
        question: "Welcher Film handelt von einem Jungen, der zum Zauberer ausgebildet wird, in einer Schule namens Hogwarts?",
        options: ["Der Herr der Ringe", "Harry Potter", "Narnia", "Percy Jackson"],
        correctIndex: 1,
        explanation: "„Harry Potter“ spielt größtenteils an der Zaubererschule Hogwarts.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in großen Teilen Ostafrikas als weit verbreitete Verkehrssprache genutzt?",
        options: ["Amharisch", "Swahili", "Somali", "Hausa"],
        correctIndex: 1,
        explanation: "Swahili dient in Ostafrika als weit verbreitete Verkehrssprache über mehrere Länder hinweg.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Zeitraum wirtschaftlichen Rückgangs mit sinkendem BIP?",
        options: ["Boom", "Rezession", "Aufschwung", "Hausse"],
        correctIndex: 1,
        explanation: "Eine Rezession beschreibt eine Phase wirtschaftlichen Rückgangs.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 44 mal 2?",
        options: ["84", "86", "88", "90"],
        correctIndex: 2,
        explanation: "44 × 2 = 88.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt die Serengeti?",
        options: ["Kenia", "Tansania", "Uganda", "Sambia"],
        correctIndex: 1,
        explanation: "Die Serengeti-Ebene liegt hauptsächlich in Tansania.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie nennt man Zellen ohne echten Zellkern?",
        options: ["Eukaryoten", "Prokaryoten", "Protisten", "Archaeen (Unterform)"],
        correctIndex: 1,
        explanation: "Prokaryoten wie Bakterien besitzen keinen membranumschlossenen Zellkern.",
      },
      {
        category: "Geschichte",
        question: "Welches Ereignis markierte den Beginn des Kalten Krieges symbolisch?",
        options: ["Der Koreakrieg", "Die Kubakrise", "Die Teilung Deutschlands nach 1945", "Der Vietnamkrieg"],
        correctIndex: 2,
        explanation: "Die Teilung Deutschlands und Europas nach 1945 gilt als früher Ausdruck des beginnenden Kalten Krieges.",
      },
      {
        category: "Chemie",
        question: "Welches Gas entsteht bei der Gärung von Zucker durch Hefe?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Stickstoff", "Methan"],
        correctIndex: 1,
        explanation: "Bei der alkoholischen Gärung entstehen Alkohol und Kohlenstoffdioxid.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer gründete die Kunstschule Bauhaus?",
        options: ["Ludwig Mies van der Rohe", "Walter Gropius", "Le Corbusier", "Wassily Kandinsky"],
        correctIndex: 1,
        explanation: "Walter Gropius gründete 1919 das Bauhaus in Weimar.",
      },
      {
        category: "Alltag",
        question: "Wie viele Millimeter hat ein Zentimeter?",
        options: ["5", "10", "100", "1000"],
        correctIndex: 1,
        explanation: "Ein Zentimeter entspricht 10 Millimetern.",
      },
      {
        category: "Sport",
        question: "Wie viele Mannschaftsspieler hat American Football pro Team auf dem Feld gleichzeitig?",
        options: ["9", "10", "11", "12"],
        correctIndex: 2,
        explanation: "Wie beim Fußball stehen auch beim American Football elf Spieler pro Team gleichzeitig auf dem Feld.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welche Band aus Liverpool prägte die Musik der 1960er Jahre maßgeblich?",
        options: ["The Rolling Stones", "The Beatles", "The Who", "Pink Floyd"],
        correctIndex: 1,
        explanation: "The Beatles aus Liverpool prägten die Popmusik der 1960er Jahre entscheidend.",
      },
      {
        category: "Literatur",
        question: "In welcher Stadt spielt der Großteil von Charles Dickens' „Oliver Twist“?",
        options: ["Paris", "London", "New York", "Dublin"],
        correctIndex: 1,
        explanation: "„Oliver Twist“ spielt hauptsächlich im viktorianischen London.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „Wi-Fi“ umgangssprachlich?",
        options: ["Es ist kein echtes Akronym, sondern ein Markenname für WLAN-Technologie", "Wireless Field", "World Internet", "Wide Fidelity"],
        correctIndex: 0,
        explanation: "„Wi-Fi“ ist ein Markenname der Wi-Fi Alliance und kein offizielles Akronym, auch wenn oft „Wireless Fidelity“ vermutet wird.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man eine Sternschnuppe astronomisch korrekt?",
        options: ["Komet", "Meteor", "Asteroid", "Meteorit (am Boden)"],
        correctIndex: 1,
        explanation: "Ein Meteor ist der Lichtstreif, den ein verglühendes Partikel beim Eintritt in die Erdatmosphäre erzeugt.",
      },
      {
        category: "Physik",
        question: "Welcher Wissenschaftler entdeckte das Neutron?",
        options: ["Ernest Rutherford", "James Chadwick", "Niels Bohr", "Enrico Fermi"],
        correctIndex: 1,
        explanation: "James Chadwick entdeckte 1932 das Neutron.",
      },
      {
        category: "Film",
        question: "Welcher Film gewann 2020 den Oscar für den besten Film als erster nicht-englischsprachiger Gewinner?",
        options: ["1917", "Parasite", "Joker", "Once Upon a Time in Hollywood"],
        correctIndex: 1,
        explanation: "„Parasite“ aus Südkorea gewann 2020 als erster nicht-englischsprachiger Film den Oscar für den besten Film.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Sprache wird in Kanada neben Englisch als zweite offizielle Amtssprache anerkannt?",
        options: ["Spanisch", "Französisch", "Portugiesisch", "Deutsch"],
        correctIndex: 1,
        explanation: "Französisch ist neben Englisch offizielle Amtssprache in Kanada, besonders in Québec.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Preis, den man für geliehenes Geld zahlt?",
        options: ["Dividende", "Zins", "Steuer", "Gebühr"],
        correctIndex: 1,
        explanation: "Zinsen sind die Kosten, die für geliehenes Kapital anfallen.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 33 minus 15?",
        options: ["16", "17", "18", "19"],
        correctIndex: 2,
        explanation: "33 − 15 = 18.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Neuseeland?",
        options: ["Auckland", "Wellington", "Christchurch", "Hamilton"],
        correctIndex: 1,
        explanation: "Wellington ist die Hauptstadt Neuseelands, Auckland die größte Stadt.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Fähigkeit von Pflanzen, sich zum Licht zu wenden?",
        options: ["Geotropismus", "Phototropismus", "Hydrotropismus", "Thigmotropismus"],
        correctIndex: 1,
        explanation: "Phototropismus beschreibt das Wachstum von Pflanzen in Richtung einer Lichtquelle.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde Konstantinopel von den Osmanen erobert?",
        options: ["1353", "1453", "1553", "1653"],
        correctIndex: 1,
        explanation: "Konstantinopel fiel 1453 an die Osmanen und markierte das Ende des Byzantinischen Reiches.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Element wird umgangssprachlich als „Quecksilber“ bezeichnet und ist bei Raumtemperatur flüssig?",
        options: ["Blei", "Quecksilber (Hg)", "Zinn", "Wismut"],
        correctIndex: 1,
        explanation: "Quecksilber ist das einzige Metall, das bei Raumtemperatur flüssig ist.",
      },
      {
        category: "Kunst",
        question: "Welche Künstlerbewegung entstand als Protest während des Ersten Weltkriegs und lehnte traditionelle Ästhetik ab?",
        options: ["Surrealismus", "Dadaismus", "Kubismus", "Futurismus"],
        correctIndex: 1,
        explanation: "Der Dadaismus entstand als anti-bürgerliche Kunstbewegung während des Ersten Weltkriegs.",
      },
      {
        category: "Alltag",
        question: "Wie viele Minuten hat eine Stunde?",
        options: ["50", "60", "70", "100"],
        correctIndex: 1,
        explanation: "Eine Stunde hat 60 Minuten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart nutzt einen Schläger, um einen kleinen Ball gegen eine Wand zu spielen?",
        options: ["Tennis", "Squash", "Badminton", "Tischtennis"],
        correctIndex: 1,
        explanation: "Beim Squash wird der Ball gegen eine Wand in einem geschlossenen Raum gespielt.",
      },
      {
        category: "Musik",
        question: "Welches Instrument hat schwarze und weiße Tasten?",
        options: ["Gitarre", "Klavier", "Violine", "Flöte"],
        correctIndex: 1,
        explanation: "Ein Klavier hat klassischerweise abwechselnd weiße und schwarze Tasten.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Die Verwandlung“ über einen Mann, der zum Käfer wird?",
        options: ["Thomas Mann", "Franz Kafka", "Hermann Hesse", "Stefan Zweig"],
        correctIndex: 1,
        explanation: "Franz Kafka schrieb die berühmte Novelle „Die Verwandlung“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte das Betriebssystem Android?",
        options: ["Apple", "Google", "Microsoft", "Samsung"],
        correctIndex: 1,
        explanation: "Android wurde von Google entwickelt und wird heute auf vielen Smartphones genutzt.",
      },
      {
        category: "Astronomie",
        question: "Welches ist der erdnächste Stern außer der Sonne?",
        options: ["Sirius", "Proxima Centauri", "Beteigeuze", "Wega"],
        correctIndex: 1,
        explanation: "Proxima Centauri ist der der Erde nächstgelegene Stern nach der Sonne.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für die Stoffmenge im Internationalen Einheitensystem?",
        options: ["Kilogramm", "Mol", "Liter", "Gramm"],
        correctIndex: 1,
        explanation: "Mol ist die SI-Einheit für die Stoffmenge.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Wer führte Regie bei „Interstellar“?",
        options: ["Denis Villeneuve", "Christopher Nolan", "Ridley Scott", "James Gray"],
        correctIndex: 1,
        explanation: "Christopher Nolan führte bei „Interstellar“ Regie.",
      },
      {
        category: "Sprache",
        question: "Wie nennt man ein neu gebildetes Wort, das noch nicht lange gebräuchlich ist?",
        options: ["Archaismus", "Neologismus", "Anglizismus", "Dialektwort"],
        correctIndex: 1,
        explanation: "Ein Neologismus ist eine Wortneuschöpfung.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den freiwilligen Austausch von Waren ohne Geld?",
        options: ["Handel", "Tauschhandel (Barter)", "Kredit", "Subvention"],
        correctIndex: 1,
        explanation: "Beim Tauschhandel werden Güter direkt gegen andere Güter getauscht, ohne Geld als Zwischenmedium.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 8 mal 12?",
        options: ["88", "92", "96", "104"],
        correctIndex: 2,
        explanation: "8 × 12 = 96.",
      },
      {
        category: "Geografie",
        question: "Welcher Kanal verbindet Mittelmeer und Rotes Meer?",
        options: ["Panamakanal", "Suezkanal", "Kielkanal", "Nord-Ostsee-Kanal"],
        correctIndex: 1,
        explanation: "Der Suezkanal in Ägypten verbindet das Mittelmeer mit dem Roten Meer.",
      },
      {
        category: "Biologie",
        question: "Welches Tier hat das schärfste Sehvermögen unter den Vögeln?",
        options: ["Eule", "Adler", "Falke", "Papagei"],
        correctIndex: 1,
        explanation: "Adler besitzen ein extrem scharfes Sehvermögen, mit dem sie Beute aus großer Entfernung erkennen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die erste Verfassung der USA (Constitution) verabschiedet?",
        options: ["1776", "1787", "1791", "1800"],
        correctIndex: 1,
        explanation: "Die US-Verfassung wurde 1787 in Philadelphia verabschiedet.",
      },
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Blei?",
        options: ["Bl", "Pb", "Pl", "Be"],
        correctIndex: 1,
        explanation: "Blei wird mit „Pb“ abgekürzt, vom lateinischen „Plumbum“.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Frühstück im Grünen“ und löste damit einen Skandal aus?",
        options: ["Claude Monet", "Édouard Manet", "Edgar Degas", "Pierre-Auguste Renoir"],
        correctIndex: 1,
        explanation: "Édouard Manets „Frühstück im Grünen“ sorgte 1863 für einen Skandal im Pariser Salon.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Räder hat ein klassisches Motorrad?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Ein Standard-Motorrad hat zwei Räder.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler hat eine Baseballmannschaft auf dem Feld gleichzeitig?",
        options: ["7", "8", "9", "10"],
        correctIndex: 2,
        explanation: "Eine Baseballmannschaft stellt neun Spieler gleichzeitig auf dem Feld.",
      },
      {
        category: "Musik",
        question: "Welcher Komponist schrieb die 9. Sinfonie mit der „Ode an die Freude“?",
        options: ["Mozart", "Beethoven", "Bach", "Brahms"],
        correctIndex: 1,
        explanation: "Beethoven vollendete seine 9. Sinfonie 1824, bereits fast völlig ertaubt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Welcher Roman von Victor Hugo spielt im Frankreich des 19. Jahrhunderts und handelt von Jean Valjean?",
        options: ["Der Glöckner von Notre-Dame", "Die Elenden (Les Misérables)", "Der Graf von Monte Christo", "Die drei Musketiere"],
        correctIndex: 1,
        explanation: "„Die Elenden“ von Victor Hugo erzählt die Geschichte von Jean Valjean.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „HTTP“?",
        options: ["HyperText Transfer Protocol", "High Traffic Text Protocol", "Home Terminal Transfer Point", "Hyperlink Text Transport"],
        correctIndex: 0,
        explanation: "HTTP steht für „HyperText Transfer Protocol“, das Grundprotokoll des Webs.",
      },
      {
        category: "Astronomie",
        question: "Welcher ist der größte Planet unseres Sonnensystems?",
        options: ["Saturn", "Jupiter", "Uranus", "Neptun"],
        correctIndex: 1,
        explanation: "Jupiter ist mit großem Abstand der größte Planet im Sonnensystem.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Wer formulierte die drei Gesetze der Planetenbewegung?",
        options: ["Galileo Galilei", "Johannes Kepler", "Isaac Newton", "Nikolaus Kopernikus"],
        correctIndex: 1,
        explanation: "Johannes Kepler formulierte im frühen 17. Jahrhundert seine drei Gesetze der Planetenbewegung.",
      },
      {
        category: "Film",
        question: "Welcher Film aus dem Jahr 1975 gilt als erster echter „Blockbuster“ der Filmgeschichte?",
        options: ["Star Wars", "Der weiße Hai", "Rocky", "Der Pate"],
        correctIndex: 1,
        explanation: "„Der weiße Hai“ von Spielberg wird oft als der erste moderne Blockbuster bezeichnet.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in den Niederlanden hauptsächlich gesprochen?",
        options: ["Deutsch", "Niederländisch", "Flämisch", "Friesisch"],
        correctIndex: 1,
        explanation: "Niederländisch ist die Amtssprache der Niederlande.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Markt, an dem Aktien gehandelt werden?",
        options: ["Warenbörse", "Börse (Aktienmarkt)", "Rohstoffmarkt", "Devisenmarkt"],
        correctIndex: 1,
        explanation: "An der Börse werden Unternehmensanteile in Form von Aktien gehandelt.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 20 Prozent von 150?",
        options: ["20", "25", "30", "35"],
        correctIndex: 2,
        explanation: "20 % von 150 = 0,2 × 150 = 30.",
      },
      {
        category: "Geografie",
        question: "Welches Gewässer liegt zwischen Skandinavien und Kontinentaleuropa?",
        options: ["Nordsee", "Ostsee", "Ärmelkanal", "Beide, Nord- und Ostsee"],
        correctIndex: 3,
        explanation: "Skandinavien grenzt sowohl an die Nordsee im Westen als auch an die Ostsee im Osten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie viele Beine hat ein Hummer?",
        options: ["6", "8", "10", "12"],
        correctIndex: 2,
        explanation: "Hummer gehören zu den Zehnfußkrebsen und haben zehn Beine.",
      },
      {
        category: "Geschichte",
        question: "Wer war Henry Ford bekannt für?",
        options: ["Die Erfindung des Automobils", "Die Einführung der Fließbandproduktion für Autos", "Die Gründung von Microsoft", "Die Erfindung des Fahrrads"],
        correctIndex: 1,
        explanation: "Ford revolutionierte mit der Fließbandproduktion die Massenfertigung von Automobilen.",
      },
      {
        category: "Chemie",
        question: "Wie viele Protonen hat ein Kohlenstoffatom?",
        options: ["4", "6", "8", "12"],
        correctIndex: 1,
        explanation: "Kohlenstoff hat die Ordnungszahl 6 und damit sechs Protonen im Kern.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer schuf zahlreiche Werke mit Comic-artigen Punktrastern (Ben-Day-Punkte)?",
        options: ["Andy Warhol", "Roy Lichtenstein", "Claes Oldenburg", "Jasper Johns"],
        correctIndex: 1,
        explanation: "Roy Lichtenstein nutzte den charakteristischen Punktraster-Stil aus Comics in seinen Gemälden.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage hat der Monat April?",
        options: ["28", "29", "30", "31"],
        correctIndex: 2,
        explanation: "Der April hat 30 Tage.",
      },
      {
        category: "Sport",
        question: "Wie oft finden die Olympischen Winterspiele statt?",
        options: ["Jährlich", "Alle 2 Jahre", "Alle 4 Jahre", "Alle 6 Jahre"],
        correctIndex: 2,
        explanation: "Die Olympischen Winterspiele finden regulär alle vier Jahre statt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie viele Saiten hat eine klassische Bratsche (Viola)?",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "Eine Bratsche hat wie die Violine vier Saiten, jedoch tiefer gestimmt.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Peter Pan“?",
        options: ["Lewis Carroll", "J.M. Barrie", "Kenneth Grahame", "Roald Dahl"],
        correctIndex: 1,
        explanation: "J.M. Barrie schuf die Figur des Peter Pan.",
      },
      {
        category: "Technik",
        question: "Welcher deutsche Ingenieur baute einen der ersten funktionsfähigen, frei programmierbaren Computer der Welt (Z3)?",
        options: ["Konrad Zuse", "Werner von Siemens", "Robert Bosch", "Carl Benz"],
        correctIndex: 0,
        explanation: "Konrad Zuse baute 1941 mit dem Z3 einen der weltweit ersten funktionsfähigen programmierbaren Computer.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man die Sonnenfinsternis, bei der die Sonne komplett verdeckt wird?",
        options: ["Partielle Sonnenfinsternis", "Totale Sonnenfinsternis", "Ringförmige Sonnenfinsternis", "Hybride Sonnenfinsternis"],
        correctIndex: 1,
        explanation: "Bei einer totalen Sonnenfinsternis verdeckt der Mond die Sonne vollständig.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit, mit der Temperatur oft in Europa gemessen wird?",
        options: ["Fahrenheit", "Celsius", "Kelvin (wissenschaftlich)", "Reaumur (veraltet)"],
        correctIndex: 1,
        explanation: "In Europa wird Temperatur alltäglich meist in Grad Celsius angegeben.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte Hauptrolle in „Gladiator“ (2000)?",
        options: ["Brad Pitt", "Russell Crowe", "Joaquin Phoenix", "Colin Farrell"],
        correctIndex: 1,
        explanation: "Russell Crowe spielte Maximus in Ridley Scotts „Gladiator“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie viele Buchstaben hat das englische Alphabet?",
        options: ["24", "26", "28", "30"],
        correctIndex: 1,
        explanation: "Das englische Alphabet besteht aus 26 Buchstaben.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Zustand, in dem mehr Menschen arbeiten wollen, als Stellen verfügbar sind?",
        options: ["Vollbeschäftigung", "Arbeitslosigkeit", "Fachkräftemangel", "Überbeschäftigung"],
        correctIndex: 1,
        explanation: "Arbeitslosigkeit beschreibt den Zustand, wenn Arbeitssuchende keine passende Beschäftigung finden.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Diagonalen hat ein Fünfeck?",
        options: ["3", "4", "5", "6"],
        correctIndex: 2,
        explanation: "Ein Fünfeck hat genau fünf Diagonalen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Kanada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correctIndex: 2,
        explanation: "Ottawa ist die Hauptstadt Kanadas, auch wenn Toronto die größte Stadt ist.",
      },
      {
        category: "Biologie",
        question: "Wie viele Arten von Muskelgewebe gibt es im menschlichen Körper?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Es gibt glatte Muskulatur, Skelettmuskulatur und Herzmuskulatur — drei Typen.",
      },
      {
        category: "Geschichte",
        question: "Welches Land war das erste, das den Kommunismus als Staatsform einführte?",
        options: ["China", "Sowjetunion", "Kuba", "Nordkorea"],
        correctIndex: 1,
        explanation: "Die Sowjetunion wurde 1922 als erster kommunistischer Staat der Welt gegründet.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Al“?",
        options: ["Argon", "Aluminium", "Americium", "Antimon"],
        correctIndex: 1,
        explanation: "Aluminium wird mit „Al“ abgekürzt.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Las Meninas“?",
        options: ["Francisco Goya", "Diego Velázquez", "El Greco", "Bartolomé Murillo"],
        correctIndex: 1,
        explanation: "„Las Meninas“ ist ein Hauptwerk des spanischen Malers Diego Velázquez.",
      },
      {
        category: "Alltag",
        question: "Wie viele Farben hat eine klassische französische Flagge?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Die französische Flagge besteht aus den drei Farben Blau, Weiß und Rot.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Spieler stehen bei einem Basketballspiel pro Team auf dem Feld?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "Beim Basketball stehen fünf Spieler pro Team gleichzeitig auf dem Feld.",
      },
      {
        category: "Musik",
        question: "Wie nennt man ein Musikstück ohne Begleitung, nur mit menschlicher Stimme?",
        options: ["A cappella", "Acapella-Jazz", "Sologesang (allgemein)", "Rezitativ"],
        correctIndex: 0,
        explanation: "„A cappella“ bezeichnet Gesang ganz ohne Instrumentalbegleitung.",
      },
      {
        category: "Literatur",
        question: "Welcher deutsche Dichter schrieb „Die Räuber“?",
        options: ["Goethe", "Schiller", "Lessing", "Kleist"],
        correctIndex: 1,
        explanation: "Friedrich Schiller schrieb sein erstes großes Drama „Die Räuber“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „SIM“ bei einer SIM-Karte?",
        options: ["Subscriber Identity Module", "System Information Memory", "Signal Interface Module", "Secure Identity Match"],
        correctIndex: 0,
        explanation: "SIM steht für „Subscriber Identity Module“.",
      },
      {
        category: "Astronomie",
        question: "Wie lange dauert ein Erdjahr ungefähr?",
        options: ["300 Tage", "365 Tage", "400 Tage", "450 Tage"],
        correctIndex: 1,
        explanation: "Ein Erdjahr dauert etwa 365,25 Tage, für einen Umlauf um die Sonne.",
      },
      {
        category: "Physik",
        question: "Welche Kraft hält uns auf dem Boden?",
        options: ["Magnetismus", "Schwerkraft", "Reibung", "Zentrifugalkraft"],
        correctIndex: 1,
        explanation: "Die Schwerkraft (Gravitation) hält Menschen und Gegenstände auf der Erdoberfläche.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Film erzählt von einem Piratenkapitän namens Jack Sparrow?",
        options: ["Master and Commander", "Fluch der Karibik", "Der Schatz im Silbersee", "Waterworld"],
        correctIndex: 1,
        explanation: "„Fluch der Karibik“ handelt vom Piraten Jack Sparrow, gespielt von Johnny Depp.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in weiten Teilen West- und Zentralafrikas als Amtssprache aus der Kolonialzeit genutzt, neben lokalen Sprachen?",
        options: ["Englisch", "Französisch", "Portugiesisch", "Spanisch"],
        correctIndex: 1,
        explanation: "Französisch ist in vielen west- und zentralafrikanischen Ländern Amtssprache.",
      },
      {
        category: "Wirtschaft",
        question: "Welches Wirtschaftssystem basiert auf privatem Eigentum und freiem Markt ohne staatliche Steuerung der Produktion?",
        options: ["Planwirtschaft", "Marktwirtschaft", "Kommunismus", "Feudalismus"],
        correctIndex: 1,
        explanation: "Die Marktwirtschaft basiert auf privatem Eigentum und freien Marktmechanismen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 5 Fakultät (5!)?",
        options: ["25", "60", "120", "720"],
        correctIndex: 2,
        explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Polen?",
        options: ["Krakau", "Warschau", "Danzig", "Breslau"],
        correctIndex: 1,
        explanation: "Warschau ist die Hauptstadt und größte Stadt Polens.",
      },
      {
        category: "Biologie",
        question: "Wie viele Kammern hat das Herz eines Frosches?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Ein Froschherz hat drei Kammern: zwei Vorhöfe und eine gemeinsame Hauptkammer.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die erste Weltausstellung (Great Exhibition) in London veranstaltet?",
        options: ["1841", "1851", "1861", "1871"],
        correctIndex: 1,
        explanation: "1851 fand die erste große Weltausstellung im Kristallpalast in London statt.",
      },
      {
        category: "Chemie",
        question: "Wie lautet die chemische Formel für Wasser?",
        options: ["CO2", "H2O", "O2", "NaCl"],
        correctIndex: 1,
        explanation: "Wasser besteht aus zwei Wasserstoff- und einem Sauerstoffatom.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Die Sternennacht“?",
        options: ["Claude Monet", "Vincent van Gogh", "Paul Cézanne", "Edgar Degas"],
        correctIndex: 1,
        explanation: "„Die Sternennacht“ ist eines der berühmtesten Werke von Vincent van Gogh.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Minuten hat eine Dreiviertelstunde?",
        options: ["30", "40", "45", "50"],
        correctIndex: 2,
        explanation: "Eine Dreiviertelstunde hat 45 Minuten.",
      },
      {
        category: "Sport",
        question: "Wie lang ist ein Marathon offiziell?",
        options: ["Etwa 30 km", "Etwa 35 km", "Etwa 42,2 km", "Etwa 50 km"],
        correctIndex: 2,
        explanation: "Die offizielle Marathondistanz beträgt 42,195 Kilometer.",
      },
      {
        category: "Musik",
        question: "Welches Instrument spielte Wolfgang Amadeus Mozart schon als Kind virtuos?",
        options: ["Gitarre", "Klavier", "Trompete", "Flöte"],
        correctIndex: 1,
        explanation: "Mozart war bereits als Kind ein virtuoser Pianist und Komponist.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Der Prozess“?",
        options: ["Thomas Mann", "Franz Kafka", "Hermann Hesse", "Robert Musil"],
        correctIndex: 1,
        explanation: "Franz Kafka schrieb den postum veröffentlichten Roman „Der Prozess“.",
      },
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte die Suchmaschine Bing?",
        options: ["Google", "Microsoft", "Yahoo", "Apple"],
        correctIndex: 1,
        explanation: "Microsoft entwickelte und betreibt die Suchmaschine Bing.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet wird oft „Abendstern“ oder „Morgenstern“ genannt, obwohl er kein Stern ist?",
        options: ["Mars", "Venus", "Jupiter", "Merkur"],
        correctIndex: 1,
        explanation: "Die Venus ist wegen ihrer Helligkeit oft am Morgen- oder Abendhimmel gut sichtbar.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Wie nennt man den Übergang von flüssig zu gasförmig?",
        options: ["Schmelzen", "Verdampfen", "Kondensieren", "Erstarren"],
        correctIndex: 1,
        explanation: "Beim Verdampfen geht ein flüssiger Stoff in den gasförmigen Zustand über.",
      },
      {
        category: "Film",
        question: "Welches Studio produzierte die „Harry Potter“-Filmreihe hauptsächlich?",
        options: ["Universal Pictures", "Warner Bros.", "Paramount Pictures", "20th Century Fox"],
        correctIndex: 1,
        explanation: "Warner Bros. produzierte die „Harry Potter“-Filmreihe.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird auf den Philippinen neben Englisch als Amtssprache anerkannt?",
        options: ["Malaiisch", "Filipino (Tagalog)", "Indonesisch", "Thai"],
        correctIndex: 1,
        explanation: "Filipino (basierend auf Tagalog) ist neben Englisch Amtssprache der Philippinen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man ein Unternehmen, das als einziger Anbieter einen Markt vollständig kontrolliert?",
        options: ["Oligopol", "Monopol", "Kartell", "Duopol"],
        correctIndex: 1,
        explanation: "Ein Monopol liegt vor, wenn nur ein einziger Anbieter einen Markt beherrscht.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 92 minus 47?",
        options: ["43", "44", "45", "46"],
        correctIndex: 2,
        explanation: "92 − 47 = 45.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Portugal?",
        options: ["Porto", "Lissabon", "Faro", "Coimbra"],
        correctIndex: 1,
        explanation: "Lissabon ist die Hauptstadt und größte Stadt Portugals.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie viele Beine hat ein Oktopus?",
        options: ["6", "8", "10", "12"],
        correctIndex: 1,
        explanation: "Ein Oktopus hat acht Arme, umgangssprachlich oft als Beine bezeichnet.",
      },
      {
        category: "Geschichte",
        question: "Wer war der französische Kaiser, der bei Waterloo besiegt wurde?",
        options: ["Ludwig XVI.", "Napoleon Bonaparte", "Karl der Große", "Ludwig XIV."],
        correctIndex: 1,
        explanation: "Napoleon Bonaparte wurde 1815 in der Schlacht bei Waterloo endgültig besiegt.",
      },
      {
        category: "Chemie",
        question: "Welches Element wird oft als „Lebenselement“ bezeichnet, da es zentral für organisches Leben ist?",
        options: ["Sauerstoff", "Kohlenstoff", "Stickstoff", "Phosphor"],
        correctIndex: 1,
        explanation: "Kohlenstoff bildet das Grundgerüst aller bekannten organischen Lebensformen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Welche Künstlerin ist für ihre Selbstporträts und ihre Verbindung zu Diego Rivera bekannt?",
        options: ["Frida Kahlo", "Georgia O'Keeffe", "Tamara de Lempicka", "Leonora Carrington"],
        correctIndex: 0,
        explanation: "Frida Kahlo ist bekannt für ihre intensiven, oft schmerzhaften Selbstporträts.",
      },
      {
        category: "Alltag",
        question: "Welches Werkzeug benutzt man typischerweise zum Schrauben?",
        options: ["Hammer", "Schraubenzieher", "Zange", "Säge"],
        correctIndex: 1,
        explanation: "Ein Schraubenzieher (Schraubendreher) wird zum Ein- und Ausdrehen von Schrauben verwendet.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell auf einer Piste mit Skiern und Toren ausgetragen?",
        options: ["Skispringen", "Ski Alpin (Slalom)", "Langlauf", "Biathlon"],
        correctIndex: 1,
        explanation: "Beim alpinen Skisport wie dem Slalom fahren Athleten zwischen Toren hindurch.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie viele Grundtöne hat eine klassische Dur-Tonleiter?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        explanation: "Eine Dur-Tonleiter besteht aus sieben verschiedenen Tönen, bevor sie sich in der Oktave wiederholt.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Don Quijote“?",
        options: ["Federico García Lorca", "Miguel de Cervantes", "Pablo Neruda", "Gabriel García Márquez"],
        correctIndex: 1,
        explanation: "Miguel de Cervantes schrieb den spanischen Klassiker „Don Quijote“.",
      },
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte die Suchmaschine Google?",
        options: ["Microsoft", "Google Inc. (Larry Page und Sergey Brin)", "Yahoo", "Apple"],
        correctIndex: 1,
        explanation: "Larry Page und Sergey Brin gründeten Google 1998.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welche Farbe hat der Planet Neptun hauptsächlich?",
        options: ["Rot", "Blau", "Grün", "Gelb"],
        correctIndex: 1,
        explanation: "Neptun erscheint aufgrund von Methan in der Atmosphäre auffallend blau.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Lehre von Wärme und deren Umwandlung in andere Energieformen?",
        options: ["Mechanik", "Thermodynamik", "Elektrodynamik", "Optik"],
        correctIndex: 1,
        explanation: "Thermodynamik beschäftigt sich mit Wärme, Energie und deren Umwandlungen.",
      },
      {
        category: "Film",
        question: "Wer führte Regie bei „Es ist ein wunderbares Leben“ (1946)?",
        options: ["Frank Capra", "Billy Wilder", "John Ford", "Orson Welles"],
        correctIndex: 0,
        explanation: "Frank Capra führte bei dem Weihnachtsklassiker „Es ist ein wunderbares Leben“ Regie.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Sprache wird in Israel hauptsächlich als Amtssprache gesprochen?",
        options: ["Arabisch", "Hebräisch", "Jiddisch", "Aramäisch"],
        correctIndex: 1,
        explanation: "Hebräisch ist die Hauptamtssprache Israels.",
      },
      {
        category: "Wirtschaft",
        question: "Welches Land führte die erste Zentralbank der Welt ein (Schwedische Reichsbank)?",
        options: ["England", "Schweden", "Niederlande", "Frankreich"],
        correctIndex: 1,
        explanation: "Die Schwedische Reichsbank, gegründet 1668, gilt als älteste noch bestehende Zentralbank der Welt.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 78 minus 39?",
        options: ["37", "38", "39", "40"],
        correctIndex: 2,
        explanation: "78 − 39 = 39.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land wird oft als „Land der aufgehenden Sonne“ bezeichnet?",
        options: ["China", "Südkorea", "Japan", "Vietnam"],
        correctIndex: 2,
        explanation: "Der japanische Name „Nippon“ bedeutet sinngemäß „Ursprung der Sonne“.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Umwandlung einer Raupe in einen Schmetterling?",
        options: ["Mutation", "Metamorphose", "Evolution", "Regeneration"],
        correctIndex: 1,
        explanation: "Die vollständige Verwandlung vom Ei über Raupe und Puppe zum Schmetterling heißt Metamorphose.",
      },
      {
        category: "Geschichte",
        question: "Wer entdeckte 1492 den amerikanischen Kontinent aus europäischer Sicht?",
        options: ["Vasco da Gama", "Christoph Kolumbus", "Ferdinand Magellan", "Amerigo Vespucci"],
        correctIndex: 1,
        explanation: "Christoph Kolumbus erreichte 1492 erstmals die amerikanischen Inseln.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Gas geben Pflanzen bei der Fotosynthese ab?",
        options: ["Kohlenstoffdioxid", "Stickstoff", "Sauerstoff", "Wasserstoff"],
        correctIndex: 2,
        explanation: "Bei der Fotosynthese setzen Pflanzen Sauerstoff als Nebenprodukt frei.",
      },
      {
        category: "Kunst",
        question: "Welcher Bildhauer schuf die Statue „David“?",
        options: ["Donatello", "Michelangelo", "Bernini", "Rodin"],
        correctIndex: 1,
        explanation: "Michelangelos „David“ gilt als eines der bedeutendsten Werke der Renaissance-Bildhauerei.",
      },
      {
        category: "Alltag",
        question: "Wie viele Liter passen in einen Kubikmeter?",
        options: ["100", "1000", "10000", "100000"],
        correctIndex: 1,
        explanation: "Ein Kubikmeter entspricht 1000 Litern.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Spieler hat eine Basketballmannschaft auf dem Feld gleichzeitig?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "Beim Basketball stehen fünf Spieler pro Mannschaft gleichzeitig auf dem Feld.",
      },
      {
        category: "Musik",
        question: "Welche Band veröffentlichte das Album „Abbey Road“?",
        options: ["The Rolling Stones", "The Beatles", "Pink Floyd", "Queen"],
        correctIndex: 1,
        explanation: "„Abbey Road“ ist ein Studioalbum der Beatles aus dem Jahr 1969.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Stolz und Vorurteil“?",
        options: ["Emily Brontë", "Jane Austen", "Charlotte Brontë", "George Eliot"],
        correctIndex: 1,
        explanation: "Jane Austen veröffentlichte „Stolz und Vorurteil“ 1813.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „GIF“ bei einem Bildformat?",
        options: ["Graphics Interchange Format", "General Image File", "Graphic Interface Format", "Generic Image Frame"],
        correctIndex: 0,
        explanation: "GIF steht für „Graphics Interchange Format“.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet ist als „Roter Planet“ bekannt?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctIndex: 1,
        explanation: "Mars erscheint aufgrund seines eisenoxidhaltigen Bodens rötlich.",
      },
      {
        category: "Physik",
        question: "Wie schnell ist die Lichtgeschwindigkeit im Vakuum ungefähr?",
        options: ["300.000 km/s", "150.000 km/s", "500.000 km/s", "1.000.000 km/s"],
        correctIndex: 0,
        explanation: "Licht bewegt sich im Vakuum mit rund 300.000 Kilometern pro Sekunde.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Film erzählt die Geschichte eines Königs mit Löwenmähne namens Mufasa und seinem Sohn?",
        options: ["Madagascar", "Der König der Löwen", "Ice Age", "Kung Fu Panda"],
        correctIndex: 1,
        explanation: "„Der König der Löwen“ erzählt die Geschichte von Mufasa und seinem Sohn Simba.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache hat die meisten Muttersprachler weltweit?",
        options: ["Englisch", "Spanisch", "Mandarin-Chinesisch", "Hindi"],
        correctIndex: 2,
        explanation: "Mandarin-Chinesisch hat weltweit die meisten Muttersprachler.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Anstieg des allgemeinen Preisniveaus über die Zeit?",
        options: ["Deflation", "Inflation", "Rezession", "Stagnation"],
        correctIndex: 1,
        explanation: "Inflation beschreibt einen anhaltenden Anstieg des allgemeinen Preisniveaus.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 15 Prozent von 200?",
        options: ["20", "25", "30", "35"],
        correctIndex: 2,
        explanation: "15 % von 200 = 0,15 × 200 = 30.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Uluru (Ayers Rock)?",
        options: ["Neuseeland", "Australien", "Südafrika", "USA"],
        correctIndex: 1,
        explanation: "Der Uluru ist ein markanter Sandsteinfelsen im australischen Outback.",
      },
      {
        category: "Biologie",
        question: "Welches Organ speichert die meiste Energie in Form von Fett normalerweise nicht direkt, sondern reguliert Fettstoffwechsel?",
        options: ["Milz", "Leber", "Bauchspeicheldrüse", "Schilddrüse"],
        correctIndex: 1,
        explanation: "Die Leber spielt eine zentrale Rolle im Fett- und Zuckerstoffwechsel des Körpers.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahr begann die Französische Revolution?",
        options: ["1776", "1789", "1799", "1804"],
        correctIndex: 1,
        explanation: "Die Französische Revolution begann 1789 mit dem Sturm auf die Bastille.",
      },
      {
        category: "Chemie",
        question: "Wie viele Hauptaggregatzustände von Materie kennt man klassisch?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Fest, flüssig und gasförmig gelten als die drei klassischen Aggregatzustände.",
      },
      {
        category: "Kunst",
        question: "Wer schuf das Gemälde „Guernica“?",
        options: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Francisco Goya"],
        correctIndex: 1,
        explanation: "Picasso schuf „Guernica“ 1937 als Reaktion auf die Bombardierung der spanischen Stadt Guernica.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Meter hat ein Kilometer?",
        options: ["10", "100", "1000", "10000"],
        correctIndex: 2,
        explanation: "Ein Kilometer entspricht 1000 Metern.",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler stehen bei einem Cricket-Team auf dem Feld gleichzeitig?",
        options: ["9", "10", "11", "12"],
        correctIndex: 2,
        explanation: "Ein Cricket-Team besteht traditionell aus elf Spielern.",
      },
      {
        category: "Musik",
        question: "Welche Musikrichtung entstand auf Jamaika und ist bekannt durch Bob Marley?",
        options: ["Ska", "Reggae", "Calypso", "Soca"],
        correctIndex: 1,
        explanation: "Reggae entstand in Jamaika und wurde vor allem durch Bob Marley weltbekannt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Welcher Autor schrieb „Emil und die Detektive“?",
        options: ["Michael Ende", "Erich Kästner", "Otfried Preußler", "Astrid Lindgren"],
        correctIndex: 1,
        explanation: "Erich Kästner schrieb den beliebten Kinderbuchklassiker „Emil und die Detektive“.",
      },
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte den Facebook-Konzern (heute Meta)?",
        options: ["Twitter", "Mark Zuckerberg und Kommilitonen", "Google", "Apple"],
        correctIndex: 1,
        explanation: "Mark Zuckerberg gründete Facebook (heute Meta) 2004 mit Kommilitonen.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man die Erscheinung farbiger Lichtbänder am Nachthimmel in Polarregionen?",
        options: ["Meteorschauer", "Polarlicht (Aurora)", "Mondhalo", "Zodiakallicht"],
        correctIndex: 1,
        explanation: "Das Polarlicht entsteht, wenn geladene Sonnenwindteilchen auf die Erdatmosphäre treffen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Wer entwickelte die spezielle und allgemeine Relativitätstheorie?",
        options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Max Planck"],
        correctIndex: 1,
        explanation: "Albert Einstein entwickelte beide Relativitätstheorien im frühen 20. Jahrhundert.",
      },
      {
        category: "Film",
        question: "Wer führte Regie bei „Inception“?",
        options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Denis Villeneuve"],
        correctIndex: 1,
        explanation: "Christopher Nolan schrieb und inszenierte den Film „Inception“.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in Griechenland hauptsächlich gesprochen?",
        options: ["Türkisch", "Griechisch", "Albanisch", "Bulgarisch"],
        correctIndex: 1,
        explanation: "Griechisch ist die Amtssprache Griechenlands.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Zinssatz, zu dem sich Banken untereinander kurzfristig Geld leihen?",
        options: ["Leitzins", "Interbankenzinssatz", "Hypothekenzins", "Sparzins"],
        correctIndex: 1,
        explanation: "Der Interbankenzinssatz beschreibt die Konditionen, zu denen Banken sich gegenseitig Geld leihen.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 76 minus 19?",
        options: ["55", "56", "57", "58"],
        correctIndex: 2,
        explanation: "76 − 19 = 57.",
      },
      {
        category: "Geografie",
        question: "Welches Land grenzt im Norden an Deutschland?",
        options: ["Polen", "Dänemark", "Niederlande", "Belgien"],
        correctIndex: 1,
        explanation: "Dänemark grenzt als einziges Land nördlich an Deutschland.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie nennt man Tiere, die sowohl Fleisch als auch Pflanzen fressen?",
        options: ["Karnivoren", "Herbivoren", "Omnivoren", "Insektivoren"],
        correctIndex: 2,
        explanation: "Omnivoren, zu Deutsch Allesfresser, ernähren sich von tierischer und pflanzlicher Kost.",
      },
      {
        category: "Geschichte",
        question: "Wer war der erste Kaiser des Römischen Reiches?",
        options: ["Julius Cäsar", "Augustus", "Nero", "Trajan"],
        correctIndex: 1,
        explanation: "Augustus (Octavian) gilt als erster römischer Kaiser ab 27 v. Chr.",
      },
      {
        category: "Chemie",
        question: "Welches Gas wird für das Löschen von Feuer in vielen Feuerlöschern verwendet?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Stickstoff", "Wasserstoff"],
        correctIndex: 1,
        explanation: "CO2-Feuerlöscher ersticken das Feuer, indem sie den Sauerstoff verdrängen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "In welchem Land liegt das Rijksmuseum?",
        options: ["Belgien", "Niederlande", "Deutschland", "Frankreich"],
        correctIndex: 1,
        explanation: "Das Rijksmuseum befindet sich in Amsterdam, Niederlande.",
      },
      {
        category: "Alltag",
        question: "Welches Möbelstück nutzt man typischerweise zum Schlafen?",
        options: ["Sofa", "Bett", "Sessel", "Hocker"],
        correctIndex: 1,
        explanation: "Das Bett ist das klassische Möbelstück zum Schlafen.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell mit einem Diskus, Speer und Kugelstoßen kombiniert im Zehnkampf ausgeübt?",
        options: ["Turnen", "Leichtathletik", "Schwimmen", "Gewichtheben"],
        correctIndex: 1,
        explanation: "Diskus, Speerwurf und Kugelstoßen sind klassische Wurfdisziplinen der Leichtathletik.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welcher Musikstil ist geprägt von schnellem Tempo, E-Gitarren und rebellischer Attitüde, entstanden in den 1970ern?",
        options: ["Jazz", "Punk", "Reggae", "Blues"],
        correctIndex: 1,
        explanation: "Punk entstand Mitte der 1970er Jahre als schneller, rebellischer Rockstil.",
      },
      {
        category: "Literatur",
        question: "Welche Autorin schrieb „Die Tribute von Panem“?",
        options: ["Veronica Roth", "Suzanne Collins", "Stephenie Meyer", "Cassandra Clare"],
        correctIndex: 1,
        explanation: "Suzanne Collins schrieb die Dystopie-Trilogie „Die Tribute von Panem“.",
      },
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte das Betriebssystem Windows?",
        options: ["Apple", "Microsoft", "IBM", "Google"],
        correctIndex: 1,
        explanation: "Microsoft entwickelte und vermarktet das Betriebssystem Windows.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man einen Zusammenschluss vieler Sterne, Gas und Staub im Weltraum?",
        options: ["Planet", "Galaxie", "Asteroid", "Komet"],
        correctIndex: 1,
        explanation: "Eine Galaxie ist eine riesige Ansammlung von Sternen, Gas, Staub und dunkler Materie.",
      },
      {
        category: "Physik",
        question: "Wer entdeckte die Röntgenstrahlen?",
        options: ["Marie Curie", "Wilhelm Conrad Röntgen", "Ernest Rutherford", "Niels Bohr"],
        correctIndex: 1,
        explanation: "Wilhelm Conrad Röntgen entdeckte 1895 die nach ihm benannten Röntgenstrahlen.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte den Hauptcharakter in „Der Pate“?",
        options: ["Robert De Niro", "Marlon Brando", "Al Pacino", "James Caan"],
        correctIndex: 1,
        explanation: "Marlon Brando spielte Don Vito Corleone in „Der Pate“ (1972).",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Amtssprache hat Indien neben zahlreichen Regionalsprachen offiziell auf Bundesebene primär?",
        options: ["Englisch allein", "Hindi und Englisch", "Urdu", "Bengali"],
        correctIndex: 1,
        explanation: "Hindi und Englisch sind die beiden offiziellen Sprachen auf Unionsebene in Indien, neben vielen weiteren Amtssprachen der Bundesstaaten.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Teil der Wirtschaft, der Dienstleistungen statt physischer Güter produziert?",
        options: ["Primärsektor", "Sekundärsektor", "Tertiärsektor", "Quartärsektor"],
        correctIndex: 2,
        explanation: "Der Tertiärsektor (Dienstleistungssektor) umfasst Dienstleistungen im Gegensatz zu Landwirtschaft und Industrie.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 150 geteilt durch 6?",
        options: ["23", "24", "25", "26"],
        correctIndex: 2,
        explanation: "150 ÷ 6 = 25.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land ist für den Karneval in Rio bekannt?",
        options: ["Argentinien", "Brasilien", "Peru", "Kolumbien"],
        correctIndex: 1,
        explanation: "Der Karneval von Rio de Janeiro in Brasilien ist eines der bekanntesten Feste der Welt.",
      },
      {
        category: "Biologie",
        question: "Wie viele Beine hat eine Biene?",
        options: ["4", "6", "8", "10"],
        correctIndex: 1,
        explanation: "Bienen sind Insekten und besitzen sechs Beine.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahrhundert lebte Wolfgang Amadeus Mozart?",
        options: ["17. Jahrhundert", "18. Jahrhundert", "19. Jahrhundert", "20. Jahrhundert"],
        correctIndex: 1,
        explanation: "Mozart lebte von 1756 bis 1791, also im 18. Jahrhundert.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Wie viele Elektronenschalen hat ein Atom mindestens, wenn es Elektronen besitzt?",
        options: ["0", "1", "2", "3"],
        correctIndex: 1,
        explanation: "Sobald ein Atom Elektronen besitzt, befindet sich mindestens eine Elektronenschale um den Kern.",
      },
      {
        category: "Kunst",
        question: "Wer entwarf die Sagrada Família in Barcelona?",
        options: ["Le Corbusier", "Antoni Gaudí", "Santiago Calatrava", "Rafael Moneo"],
        correctIndex: 1,
        explanation: "Antoni Gaudí entwarf die berühmte, noch unvollendete Kirche Sagrada Família.",
      },
      {
        category: "Alltag",
        question: "Wie viele Buchstaben hat das deutsche Alphabet inklusive Umlaute und ß?",
        options: ["26", "29", "30", "33"],
        correctIndex: 1,
        explanation: "Das deutsche Alphabet zählt 26 Grundbuchstaben plus Ä, Ö, Ü und ß, also insgesamt 30 — häufig genannt werden auch 29, je nach Zählweise des ß.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Löcher hat eine klassische Golfrunde?",
        options: ["9", "12", "18", "24"],
        correctIndex: 2,
        explanation: "Eine vollständige Golfrunde besteht traditionell aus 18 Löchern.",
      },
      {
        category: "Musik",
        question: "Welcher Komponist war bekannt für seine Vier Jahreszeiten?",
        options: ["Bach", "Vivaldi", "Händel", "Telemann"],
        correctIndex: 1,
        explanation: "Antonio Vivaldi komponierte den berühmten Violinkonzert-Zyklus „Die vier Jahreszeiten“.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Der Steppenwolf“?",
        options: ["Thomas Mann", "Hermann Hesse", "Franz Kafka", "Robert Musil"],
        correctIndex: 1,
        explanation: "Hermann Hesse schrieb den Roman „Der Steppenwolf“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wie nennt man die kleinste Speichereinheit in der Informatik, die 0 oder 1 sein kann?",
        options: ["Byte", "Bit", "Pixel", "Kilobyte"],
        correctIndex: 1,
        explanation: "Ein Bit ist die kleinste digitale Informationseinheit.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man den Stern, der scheinbar fast unbeweglich am Nordhimmel steht und zur Navigation dient?",
        options: ["Sirius", "Polarstern", "Wega", "Beteigeuze"],
        correctIndex: 1,
        explanation: "Der Polarstern steht nahe dem Himmelsnordpol und dient traditionell zur Orientierung.",
      },
      {
        category: "Physik",
        question: "Welches Teilchen wurde 2012 am CERN experimentell bestätigt und ist zentral für die Masse von Teilchen?",
        options: ["Neutrino", "Higgs-Boson", "Quark", "Gluon"],
        correctIndex: 1,
        explanation: "Das Higgs-Boson wurde 2012 am CERN nachgewiesen und erklärt, wie Teilchen Masse erhalten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Wer führte Regie bei „Fluch der Karibik“ (2003)?",
        options: ["Gore Verbinski", "Rob Marshall", "Joachim Rønning", "Espen Sandberg"],
        correctIndex: 0,
        explanation: "Gore Verbinski führte beim ersten „Fluch der Karibik“-Film Regie.",
      },
      {
        category: "Sprache",
        question: "Wie nennt man ein Wort, das gleich geschrieben wird, aber unterschiedliche Bedeutungen hat?",
        options: ["Synonym", "Antonym", "Homonym", "Anagramm"],
        correctIndex: 2,
        explanation: "Ein Homonym hat gleiche Schreibweise (oder Aussprache), aber unterschiedliche Bedeutung, z. B. „Bank“.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Vorgang, wenn ein Land mehr importiert als exportiert?",
        options: ["Handelsüberschuss", "Handelsdefizit", "Nullsummenspiel", "Deflation"],
        correctIndex: 1,
        explanation: "Ein Handelsdefizit liegt vor, wenn die Importe eines Landes seine Exporte übersteigen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 15 mal 6?",
        options: ["80", "85", "90", "95"],
        correctIndex: 2,
        explanation: "15 × 6 = 90.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt der Türkei?",
        options: ["Istanbul", "Izmir", "Ankara", "Antalya"],
        correctIndex: 2,
        explanation: "Ankara ist die Hauptstadt der Türkei, auch wenn Istanbul die größte Stadt ist.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Lehre von den Reptilien und Amphibien?",
        options: ["Herpetologie", "Ichthyologie", "Entomologie", "Ornithologie"],
        correctIndex: 0,
        explanation: "Herpetologie umfasst die Erforschung von Reptilien und Amphibien.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Welche Kultur entwickelte das Konzept der Demokratie in seiner frühen Form?",
        options: ["Römer", "Athener (antikes Griechenland)", "Ägypter", "Perser"],
        correctIndex: 1,
        explanation: "Das antike Athen gilt als Wiege der frühen Demokratie.",
      },
      {
        category: "Chemie",
        question: "Wie heißt die chemische Formel für Kochsalz?",
        options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
        correctIndex: 0,
        explanation: "Kochsalz besteht aus Natrium und Chlor: NaCl.",
      },
      {
        category: "Kunst",
        question: "Wer schnitt sich der Überlieferung nach selbst ein Stück des Ohrs ab?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"],
        correctIndex: 1,
        explanation: "Van Gogh verletzte sich 1888 in einer psychischen Krise selbst am Ohr.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Felder hat ein Schachbrett insgesamt?",
        options: ["32", "48", "64", "100"],
        correctIndex: 2,
        explanation: "Ein Schachbrett besteht aus 64 Feldern (8x8).",
      },
      {
        category: "Sport",
        question: "Wie viele Spieler hat ein Eishockeyteam auf dem Eis gleichzeitig (ohne Torwart mitgezählt separat)?",
        options: ["5 Feldspieler plus Torwart", "6 Feldspieler plus Torwart", "7 Feldspieler plus Torwart", "4 Feldspieler plus Torwart"],
        correctIndex: 0,
        explanation: "Ein Eishockeyteam hat üblicherweise fünf Feldspieler plus einen Torwart gleichzeitig auf dem Eis.",
      },
      {
        category: "Musik",
        question: "Welche Band veröffentlichte „Bohemian Rhapsody“?",
        options: ["Led Zeppelin", "Queen", "The Who", "Pink Floyd"],
        correctIndex: 1,
        explanation: "„Bohemian Rhapsody“ ist ein berühmter Song der Band Queen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Die Fabeln“ mit Tieren wie dem Fuchs und dem Raben in Frankreich neu und bekannt?",
        options: ["Voltaire", "Jean de La Fontaine", "Molière", "Victor Hugo"],
        correctIndex: 1,
        explanation: "Jean de La Fontaine schrieb im 17. Jahrhundert berühmte Fabeln mit sprechenden Tieren.",
      },
      {
        category: "Technik",
        question: "Wer entwickelte maßgeblich den ersten funktionierenden Elektromotor im 19. Jahrhundert weiter?",
        options: ["Michael Faraday", "James Watt", "Alessandro Volta", "André-Marie Ampère"],
        correctIndex: 0,
        explanation: "Michael Faraday leistete Pionierarbeit bei der Entwicklung des Elektromotors.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man das Gebiet zwischen Mars und Jupiter, in dem viele Asteroiden kreisen?",
        options: ["Kuipergürtel", "Asteroidengürtel", "Oortsche Wolke", "Van-Allen-Gürtel"],
        correctIndex: 1,
        explanation: "Der Asteroidengürtel liegt zwischen den Umlaufbahnen von Mars und Jupiter.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Welches Teilchen hat eine negative elektrische Ladung?",
        options: ["Proton", "Neutron", "Elektron", "Photon"],
        correctIndex: 2,
        explanation: "Elektronen tragen eine negative elektrische Ladung.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte Iron Man / Tony Stark im Marvel Cinematic Universe?",
        options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
        correctIndex: 1,
        explanation: "Robert Downey Jr. spielte Tony Stark bzw. Iron Man über viele Marvel-Filme hinweg.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in Brasilien hauptsächlich gesprochen?",
        options: ["Spanisch", "Portugiesisch", "Französisch", "Italienisch"],
        correctIndex: 1,
        explanation: "In Brasilien ist Portugiesisch die Amtssprache, im Gegensatz zum spanischsprachigen restlichen Südamerika.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Welche Steuer wird auf den Gewinn von Unternehmen erhoben?",
        options: ["Mehrwertsteuer", "Körperschaftsteuer", "Einkommensteuer", "Grundsteuer"],
        correctIndex: 1,
        explanation: "Die Körperschaftsteuer wird auf die Gewinne von Kapitalgesellschaften erhoben.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 55 minus 28?",
        options: ["25", "26", "27", "28"],
        correctIndex: 2,
        explanation: "55 − 28 = 27.",
      },
      {
        category: "Geografie",
        question: "Wie heißt die Hauptstadt von Schweden?",
        options: ["Göteborg", "Malmö", "Stockholm", "Uppsala"],
        correctIndex: 2,
        explanation: "Stockholm ist die Hauptstadt und größte Stadt Schwedens.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Tier ist bekannt für sein außergewöhnliches Erinnerungsvermögen über Jahrzehnte?",
        options: ["Delfin", "Elefant", "Papagei", "Krähe"],
        correctIndex: 1,
        explanation: "Elefanten gelten als besonders gedächtnisstark.",
      },
      {
        category: "Geschichte",
        question: "Wer war Queen Victoria?",
        options: ["Eine schottische Königin", "Eine britische Monarchin des 19. Jahrhunderts", "Eine französische Kaiserin", "Eine spanische Königin"],
        correctIndex: 1,
        explanation: "Königin Victoria regierte Großbritannien von 1837 bis 1901.",
      },
      {
        category: "Chemie",
        question: "Welches Element wird für die Herstellung von Feuerwerkskörpern oft für grüne Farben genutzt?",
        options: ["Barium", "Kupfer", "Natrium", "Kalzium"],
        correctIndex: 0,
        explanation: "Bariumverbindungen erzeugen die typische grüne Farbe in Feuerwerk.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Welcher Künstler ist bekannt für abstrakte Kunst mit reinen Farbfeldern (Color Field Painting)?",
        options: ["Mark Rothko", "Roy Lichtenstein", "Jackson Pollock", "Willem de Kooning"],
        correctIndex: 0,
        explanation: "Mark Rothko ist berühmt für seine großformatigen, meditativen Farbfeldbilder.",
      },
      {
        category: "Alltag",
        question: "Welches Gerät nutzt man üblicherweise, um Kaffee zu kochen?",
        options: ["Wasserkocher", "Kaffeemaschine", "Toaster", "Mixer"],
        correctIndex: 1,
        explanation: "Eine Kaffeemaschine ist das klassische Gerät zur Kaffeezubereitung.",
      },
      {
        category: "Sport",
        question: "Wie viele Ringe muss ein Turner beim Ringturnen greifen?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Beim Ringturnen hängen zwei Ringe, an denen der Turner seine Übung ausführt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welcher Komponist gilt als „Vater der Sinfonie“ wegen seiner vielen Beiträge zu dieser Form?",
        options: ["Mozart", "Joseph Haydn", "Beethoven", "Bach"],
        correctIndex: 1,
        explanation: "Joseph Haydn wird oft als „Vater der Sinfonie“ bezeichnet, da er die Form maßgeblich prägte.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Die unendliche Geschichte“?",
        options: ["Otfried Preußler", "Michael Ende", "Erich Kästner", "Cornelia Funke"],
        correctIndex: 1,
        explanation: "Michael Ende schrieb den bekannten Fantasy-Kinderbuchklassiker „Die unendliche Geschichte“.",
      },
      {
        category: "Technik",
        question: "Wer knackte während des Zweiten Weltkriegs maßgeblich den deutschen Enigma-Code?",
        options: ["John von Neumann", "Alan Turing", "Claude Shannon", "Norbert Wiener"],
        correctIndex: 1,
        explanation: "Alan Turing spielte eine Schlüsselrolle bei der Entschlüsselung der Enigma-Codes.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welches Raumfahrtprogramm brachte die ersten Menschen zum Mond?",
        options: ["Gemini-Programm", "Apollo-Programm", "Mercury-Programm", "Artemis-Programm"],
        correctIndex: 1,
        explanation: "Das Apollo-Programm der NASA brachte 1969 die ersten Menschen auf den Mond.",
      },
      {
        category: "Physik",
        question: "Welcher Physiker entdeckte den Atomkern durch sein berühmtes Streuexperiment?",
        options: ["J.J. Thomson", "Ernest Rutherford", "Niels Bohr", "James Chadwick"],
        correctIndex: 1,
        explanation: "Ernest Rutherford entdeckte durch sein Goldfolienexperiment den Atomkern.",
      },
      {
        category: "Film",
        question: "Welcher Film handelt von Dinosauriern, die aus alter DNA wiederbelebt werden?",
        options: ["King Kong", "Jurassic Park", "Godzilla", "The Land Before Time"],
        correctIndex: 1,
        explanation: "„Jurassic Park“ erzählt von einem Freizeitpark mit geklonten Dinosauriern.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie nennt man die Lehre vom Satzbau einer Sprache?",
        options: ["Phonetik", "Semantik", "Syntax", "Morphologie"],
        correctIndex: 2,
        explanation: "Syntax beschäftigt sich mit dem Aufbau und der Struktur von Sätzen.",
      },
      {
        category: "Wirtschaft",
        question: "Welches Land ist bekannt als einer der größten Ölexporteure der Welt?",
        options: ["Saudi-Arabien", "Deutschland", "Japan", "Brasilien"],
        correctIndex: 0,
        explanation: "Saudi-Arabien zählt zu den weltweit größten Erdölexporteuren.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 10 hoch 3 (10³)?",
        options: ["100", "1000", "10000", "100000"],
        correctIndex: 1,
        explanation: "10³ = 10 × 10 × 10 = 1000.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "In welchem Land liegt die Chinesische Mauer?",
        options: ["Japan", "Mongolei", "China", "Nordkorea"],
        correctIndex: 2,
        explanation: "Die Chinesische Mauer verläuft über tausende Kilometer im Norden Chinas.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Wissenschaft von der Vererbung?",
        options: ["Genetik", "Ökologie", "Physiologie", "Taxonomie"],
        correctIndex: 0,
        explanation: "Genetik befasst sich mit den Gesetzen der Vererbung und den Genen.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahrhundert lebte Napoleon Bonaparte hauptsächlich?",
        options: ["17. Jahrhundert", "18. und 19. Jahrhundert", "19. und 20. Jahrhundert", "20. Jahrhundert"],
        correctIndex: 1,
        explanation: "Napoleon lebte von 1769 bis 1821, also im 18. und frühen 19. Jahrhundert.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Helium?",
        options: ["He", "H", "Hl", "Hm"],
        correctIndex: 0,
        explanation: "Helium wird mit „He“ abgekürzt.",
      },
      {
        category: "Kunst",
        question: "In welcher Stadt liegt das Museum of Modern Art (MoMA)?",
        options: ["Los Angeles", "Chicago", "New York City", "Washington D.C."],
        correctIndex: 2,
        explanation: "Das MoMA befindet sich in New York City.",
      },
      {
        category: "Alltag",
        question: "Wie viele Farben hat eine klassische italienische Flagge?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Die italienische Flagge besteht aus den drei Farben Grün, Weiß und Rot.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Punkte zählt ein Korb von außerhalb der Dreipunktlinie im Basketball?",
        options: ["1", "2", "3", "4"],
        correctIndex: 2,
        explanation: "Ein erfolgreicher Wurf von jenseits der Dreipunktlinie zählt drei Punkte.",
      },
      {
        category: "Musik",
        question: "Wie viele Linien hat ein klassisches Notensystem?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "Ein Notensystem besteht traditionell aus fünf horizontalen Linien.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Krieg und Frieden“?",
        options: ["Fjodor Dostojewski", "Lew Tolstoi", "Anton Tschechow", "Iwan Turgenew"],
        correctIndex: 1,
        explanation: "Lew Tolstoi schrieb den umfangreichen Roman „Krieg und Frieden“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „PDF“?",
        options: ["Portable Document Format", "Personal Data File", "Printed Document Form", "Public Data Format"],
        correctIndex: 0,
        explanation: "PDF steht für „Portable Document Format“.",
      },
      {
        category: "Astronomie",
        question: "Welcher Himmelskörper verursacht Ebbe und Flut auf der Erde hauptsächlich?",
        options: ["Die Sonne", "Der Mond", "Der Mars", "Die Venus"],
        correctIndex: 1,
        explanation: "Die Gravitation des Mondes ist der Hauptauslöser für die Gezeiten auf der Erde.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Kraft, die zwei Magnete gegenseitig anzieht oder abstößt?",
        options: ["Gravitation", "Magnetismus", "Reibung", "Elektrostatik"],
        correctIndex: 1,
        explanation: "Magnetismus beschreibt die anziehenden oder abstoßenden Kräfte zwischen Magneten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Animationsfilm handelt von einem Schneemädchen namens Elsa mit Eiskräften?",
        options: ["Die Eiskönigin (Frozen)", "Prinzessin und der Frosch", "Vaiana", "Tangled"],
        correctIndex: 0,
        explanation: "„Die Eiskönigin“ (Frozen) erzählt die Geschichte von Elsa und ihrer Schwester Anna.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in Finnland neben Finnisch als zweite Amtssprache anerkannt?",
        options: ["Estnisch", "Schwedisch", "Norwegisch", "Russisch"],
        correctIndex: 1,
        explanation: "Schwedisch ist neben Finnisch die zweite offizielle Amtssprache Finnlands.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man ein Wirtschaftssystem, bei dem der Staat Produktion und Preise zentral steuert?",
        options: ["Marktwirtschaft", "Planwirtschaft", "Soziale Marktwirtschaft", "Kapitalismus"],
        correctIndex: 1,
        explanation: "In einer Planwirtschaft entscheidet der Staat zentral über Produktion und Verteilung.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 400?",
        options: ["18", "19", "20", "21"],
        correctIndex: 2,
        explanation: "20 × 20 = 400, also ist die Quadratwurzel aus 400 gleich 20.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt die Stadt Venedig?",
        options: ["Griechenland", "Kroatien", "Italien", "Slowenien"],
        correctIndex: 2,
        explanation: "Venedig liegt in Norditalien und ist berühmt für seine Kanäle.",
      },
      {
        category: "Biologie",
        question: "Welches Organ reguliert den Kalziumhaushalt im Körper wesentlich mit?",
        options: ["Nebenschilddrüse", "Schilddrüse", "Nebenniere", "Hypophyse"],
        correctIndex: 0,
        explanation: "Die Nebenschilddrüsen steuern maßgeblich den Kalziumspiegel im Blut.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Welches Land wurde 1949 als Volksrepublik ausgerufen?",
        options: ["Nordkorea", "China", "Vietnam", "Kuba"],
        correctIndex: 1,
        explanation: "1949 rief Mao Zedong die Volksrepublik China aus.",
      },
      {
        category: "Chemie",
        question: "Wie viele Aggregatzustände durchläuft Wasser typischerweise zwischen Eis und Dampf?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Wasser durchläuft fest (Eis), flüssig und gasförmig (Dampf) als die drei klassischen Zustände.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Guernica“?",
        options: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Francisco Goya"],
        correctIndex: 1,
        explanation: "Pablo Picasso schuf das Antikriegsgemälde „Guernica“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Sekunden hat eine Minute?",
        options: ["30", "60", "90", "100"],
        correctIndex: 1,
        explanation: "Eine Minute besteht aus 60 Sekunden.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell in Wimbledon ausgetragen?",
        options: ["Golf", "Tennis", "Cricket", "Rugby"],
        correctIndex: 1,
        explanation: "Wimbledon ist eines der bekanntesten Tennisturniere der Welt.",
      },
      {
        category: "Musik",
        question: "Wie viele Saiten hat ein klassischer Kontrabass üblicherweise?",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "Ein klassischer Kontrabass hat meist vier Saiten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Wer schrieb „Die Buddenbrooks“?",
        options: ["Heinrich Mann", "Thomas Mann", "Hermann Hesse", "Günter Grass"],
        correctIndex: 1,
        explanation: "Thomas Mann schrieb den Roman „Buddenbrooks“, für den er später den Nobelpreis erhielt.",
      },
      {
        category: "Technik",
        question: "Wer gründete das Unternehmen SpaceX?",
        options: ["Jeff Bezos", "Elon Musk", "Richard Branson", "Larry Page"],
        correctIndex: 1,
        explanation: "Elon Musk gründete SpaceX im Jahr 2002.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet dreht sich als einziger „liegend“ um seine eigene Achse mit extremer Neigung?",
        options: ["Saturn", "Uranus", "Neptun", "Jupiter"],
        correctIndex: 1,
        explanation: "Uranus hat eine extreme Achsneigung von etwa 98 Grad und rotiert quasi seitlich.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für die magnetische Flussdichte?",
        options: ["Tesla", "Henry", "Weber", "Gauss (veraltet)"],
        correctIndex: 0,
        explanation: "Tesla ist die SI-Einheit für die magnetische Flussdichte, benannt nach Nikola Tesla.",
      },
      {
        category: "Film",
        question: "Welcher Film aus dem Jahr 1939 gilt als einer der ersten erfolgreichen Farbfilme mit Judy Garland?",
        options: ["Der Zauberer von Oz", "Vom Winde verweht", "Casablanca", "Schneewittchen"],
        correctIndex: 0,
        explanation: "„Der Zauberer von Oz“ mit Judy Garland war einer der frühen erfolgreichen Farbfilme.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird traditionell in weiten Teilen des Nahen Ostens als Amts- oder Verkehrssprache genutzt?",
        options: ["Hebräisch", "Arabisch", "Persisch", "Türkisch"],
        correctIndex: 1,
        explanation: "Arabisch ist die vorherrschende Amtssprache in weiten Teilen des Nahen Ostens und Nordafrikas.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Welche Organisation koordiniert die Wirtschaftspolitik der wichtigsten Industrieländer, bekannt als G7?",
        options: ["Gruppe der Sieben (G7)", "G20", "OECD", "OPEC"],
        correctIndex: 0,
        explanation: "Die G7 ist ein informeller Zusammenschluss führender Industrienationen zur wirtschaftspolitischen Koordination.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 3 hoch 5 (3⁵)?",
        options: ["81", "162", "243", "324"],
        correctIndex: 2,
        explanation: "3⁵ = 3 × 3 × 3 × 3 × 3 = 243.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt die Wüste Atacama?",
        options: ["Peru", "Bolivien", "Chile", "Argentinien"],
        correctIndex: 2,
        explanation: "Die Atacama-Wüste in Chile gilt als eine der trockensten Regionen der Welt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Welches Organ ist für die Produktion von Magensäure zuständig?",
        options: ["Leber", "Magen", "Bauchspeicheldrüse", "Zwölffingerdarm"],
        correctIndex: 1,
        explanation: "Die Magenschleimhaut produziert die für die Verdauung nötige Salzsäure.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahrhundert fand die Pest (Schwarzer Tod) ihren verheerendsten Ausbruch in Europa?",
        options: ["12. Jahrhundert", "14. Jahrhundert", "16. Jahrhundert", "18. Jahrhundert"],
        correctIndex: 1,
        explanation: "Der Schwarze Tod traf Europa besonders verheerend im 14. Jahrhundert.",
      },
      {
        category: "Chemie",
        question: "Wie viele Neutronen hat ein typisches Kohlenstoffatom (Kohlenstoff-12)?",
        options: ["4", "6", "8", "12"],
        correctIndex: 1,
        explanation: "Kohlenstoff-12 hat sechs Protonen und sechs Neutronen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "In welcher Epoche wirkte hauptsächlich der Maler Rembrandt?",
        options: ["Renaissance", "Barock", "Impressionismus", "Rokoko"],
        correctIndex: 1,
        explanation: "Rembrandt war ein bedeutender Maler des niederländischen Barock im 17. Jahrhundert.",
      },
      {
        category: "Alltag",
        question: "Wie viele Beine hat ein Stuhl typischerweise?",
        options: ["2", "3", "4", "6"],
        correctIndex: 2,
        explanation: "Die meisten klassischen Stühle haben vier Beine.",
      },
      {
        category: "Sport",
        question: "Wie oft finden die Olympischen Sommerspiele statt?",
        options: ["Jährlich", "Alle 2 Jahre", "Alle 4 Jahre", "Alle 5 Jahre"],
        correctIndex: 2,
        explanation: "Die Olympischen Sommerspiele finden regulär alle vier Jahre statt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie nennt man die Tonart, die keine Kreuz- oder B-Vorzeichen hat?",
        options: ["G-Dur", "C-Dur", "D-Dur", "F-Dur"],
        correctIndex: 1,
        explanation: "C-Dur ist die einzige Dur-Tonart ohne Kreuz- oder B-Vorzeichen.",
      },
      {
        category: "Literatur",
        question: "Welcher irische Autor schrieb „Das Bildnis des Dorian Gray“?",
        options: ["James Joyce", "Oscar Wilde", "Samuel Beckett", "Bram Stoker"],
        correctIndex: 1,
        explanation: "Oscar Wilde schrieb den einzigen Roman seines Werks, „Das Bildnis des Dorian Gray“.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „VR“?",
        options: ["Virtual Reality", "Video Recording", "Visual Rendering", "Virtual Robotics"],
        correctIndex: 0,
        explanation: "VR steht für „Virtual Reality“, also virtuelle Realität.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welches Weltraumteleskop wurde 1990 gestartet und lieferte jahrzehntelang bedeutende Bilder?",
        options: ["James Webb Space Telescope", "Hubble-Weltraumteleskop", "Kepler-Weltraumteleskop", "Spitzer-Weltraumteleskop"],
        correctIndex: 1,
        explanation: "Das Hubble-Weltraumteleskop wurde 1990 gestartet und lieferte über Jahrzehnte wertvolle Aufnahmen.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Temperatur, bei der theoretisch keine Bewegung von Teilchen mehr stattfindet?",
        options: ["0 Grad Celsius", "Der absolute Nullpunkt", "100 Grad Celsius", "Zimmertemperatur"],
        correctIndex: 1,
        explanation: "Der absolute Nullpunkt liegt bei -273,15 Grad Celsius (0 Kelvin).",
      },
      {
        category: "Film",
        question: "Wer führte Regie bei „Jurassic Park“?",
        options: ["George Lucas", "Steven Spielberg", "James Cameron", "Ridley Scott"],
        correctIndex: 1,
        explanation: "Steven Spielberg führte bei „Jurassic Park“ Regie.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie nennt man ein Wort, das vorwärts und rückwärts gelesen gleich klingt?",
        options: ["Anagramm", "Palindrom", "Homonym", "Synonym"],
        correctIndex: 1,
        explanation: "Ein Palindrom liest sich vorwärts wie rückwärts gleich, etwa „Anna“.",
      },
      {
        category: "Wirtschaft",
        question: "Welche Währung wird in den meisten Ländern der Europäischen Union verwendet?",
        options: ["Der Dollar", "Der Euro", "Das Pfund", "Der Franken"],
        correctIndex: 1,
        explanation: "Der Euro ist die gemeinsame Währung der meisten EU-Mitgliedstaaten.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 120 geteilt durch 8?",
        options: ["13", "14", "15", "16"],
        correctIndex: 2,
        explanation: "120 ÷ 8 = 15.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welcher Kontinent wird vom Nullmeridian und Äquator beide durchquert?",
        options: ["Asien", "Afrika", "Südamerika", "Australien"],
        correctIndex: 1,
        explanation: "Afrika wird sowohl vom Äquator als auch vom Nullmeridian (Greenwich) durchquert.",
      },
      {
        category: "Biologie",
        question: "Welches Tier ist der nächste lebende Verwandte des Menschen?",
        options: ["Gorilla", "Schimpanse", "Orang-Utan", "Bonobo"],
        correctIndex: 1,
        explanation: "Schimpansen gelten genetisch als die nächsten lebenden Verwandten des Menschen, dicht gefolgt von Bonobos.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die erste Fußball-Weltmeisterschaft ausgetragen?",
        options: ["1920", "1930", "1940", "1950"],
        correctIndex: 1,
        explanation: "Die erste Fußball-WM fand 1930 in Uruguay statt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Schwefel?",
        options: ["Sw", "S", "Su", "Sf"],
        correctIndex: 1,
        explanation: "Schwefel wird mit „S“ abgekürzt.",
      },
      {
        category: "Kunst",
        question: "In welcher Stadt befindet sich das Museum „MoMA“?",
        options: ["Los Angeles", "New York City", "Chicago", "Boston"],
        correctIndex: 1,
        explanation: "Das Museum of Modern Art (MoMA) befindet sich in New York City.",
      },
      {
        category: "Alltag",
        question: "Wie viele Räder hat ein LKW-Anhänger typischerweise mindestens?",
        options: ["2", "4", "6", "8"],
        correctIndex: 1,
        explanation: "Die meisten Anhänger haben mindestens vier Räder, oft mehr je nach Größe.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Sportart nutzt ein Trampolin als olympische Disziplin?",
        options: ["Turnen (eigene Disziplin Trampolinspringen)", "Leichtathletik", "Rhythmische Sportgymnastik", "Wasserspringen"],
        correctIndex: 0,
        explanation: "Trampolinspringen ist eine eigenständige olympische Disziplin innerhalb des Turnens.",
      },
      {
        category: "Musik",
        question: "Welches Instrument wird mit einem Bogen gestrichen und unter dem Kinn gehalten?",
        options: ["Cello", "Violine", "Kontrabass", "Bratsche"],
        correctIndex: 1,
        explanation: "Die Violine (Geige) wird typischerweise unter dem Kinn gespielt.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Fahrenheit 451“?",
        options: ["Isaac Asimov", "Ray Bradbury", "Philip K. Dick", "Arthur C. Clarke"],
        correctIndex: 1,
        explanation: "Ray Bradbury schrieb den dystopischen Roman „Fahrenheit 451“ über eine bücherverbrennende Gesellschaft.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „RAM“ in Computern?",
        options: ["Random Access Memory", "Rapid Access Module", "Read Access Memory", "Remote Access Memory"],
        correctIndex: 0,
        explanation: "RAM steht für „Random Access Memory“, den Arbeitsspeicher eines Computers.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet ist der zweitkleinste im Sonnensystem?",
        options: ["Mars", "Merkur", "Venus", "Erde"],
        correctIndex: 0,
        explanation: "Nach Merkur ist Mars der zweitkleinste Planet im Sonnensystem.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für Druck?",
        options: ["Pascal", "Newton", "Joule", "Watt"],
        correctIndex: 0,
        explanation: "Pascal ist die SI-Einheit für Druck, benannt nach Blaise Pascal.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Film handelt von einem Schiff, das gegen einen Eisberg fährt und untergeht (1997)?",
        options: ["Poseidon", "Titanic", "Das Boot", "The Perfect Storm"],
        correctIndex: 1,
        explanation: "„Titanic“ von James Cameron behandelt den Untergang des berühmten Schiffs.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in der Schweiz neben Deutsch, Französisch und Italienisch als vierte Amtssprache anerkannt?",
        options: ["Rätoromanisch", "Ladinisch", "Okzitanisch", "Bretonisch"],
        correctIndex: 0,
        explanation: "Rätoromanisch ist die vierte offizielle Landessprache der Schweiz.",
      },
      {
        category: "Wirtschaft",
        question: "Welche Organisation reguliert internationalen Handel zwischen Mitgliedsstaaten?",
        options: ["Die Weltbank", "Die Welthandelsorganisation (WTO)", "Der IWF", "Die UNO"],
        correctIndex: 1,
        explanation: "Die Welthandelsorganisation (WTO) setzt Regeln für den internationalen Handel.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 9 zum Quadrat?",
        options: ["18", "27", "81", "99"],
        correctIndex: 2,
        explanation: "9² = 9 × 9 = 81.",
      },
      {
        category: "Geografie",
        question: "Welches ist das kleinste Land der Welt?",
        options: ["Monaco", "San Marino", "Vatikanstadt", "Liechtenstein"],
        correctIndex: 2,
        explanation: "Die Vatikanstadt hat eine Fläche von nur etwa 0,44 km².",
      },
      {
        category: "Biologie",
        question: "Wie viele Chromosomenpaare hat ein gesunder Mensch normalerweise?",
        options: ["22", "23", "24", "46"],
        correctIndex: 1,
        explanation: "Der Mensch hat normalerweise 23 Chromosomenpaare, also 46 Chromosomen insgesamt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Land begann die Französische Revolution 1789?",
        options: ["England", "Frankreich", "Spanien", "Italien"],
        correctIndex: 1,
        explanation: "Die Französische Revolution begann 1789 in Frankreich.",
      },
      {
        category: "Chemie",
        question: "Welches Gas wird beim Atmen von Menschen hauptsächlich ausgeatmet neben Stickstoff?",
        options: ["Sauerstoff", "Kohlenstoffdioxid", "Wasserstoff", "Methan"],
        correctIndex: 1,
        explanation: "Beim Ausatmen geben Menschen vor allem Kohlenstoffdioxid als Stoffwechselprodukt ab.",
      },
      {
        category: "Kunst",
        question: "In welcher Stadt befindet sich die Galerie Uffizien?",
        options: ["Rom", "Venedig", "Florenz", "Mailand"],
        correctIndex: 2,
        explanation: "Die Uffizien in Florenz beherbergen eine der bedeutendsten Kunstsammlungen der Welt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Räder hat ein klassisches Fahrrad?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Ein klassisches Fahrrad hat zwei Räder.",
      },
      {
        category: "Sport",
        question: "In welcher Sportart tritt man beim „Grand Slam“ an, u. a. bei den French Open?",
        options: ["Golf", "Tennis", "Motorsport", "Schwimmen"],
        correctIndex: 1,
        explanation: "Die vier Grand-Slam-Turniere im Tennis sind Australian Open, French Open, Wimbledon und US Open.",
      },
      {
        category: "Musik",
        question: "Wer war Ludwig van Beethoven?",
        options: ["Ein italienischer Opernkomponist", "Ein deutscher Komponist der Klassik und Romantik", "Ein französischer Pianist", "Ein österreichischer Dirigent"],
        correctIndex: 1,
        explanation: "Beethoven gilt als einer der bedeutendsten Komponisten zwischen Klassik und Romantik.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Welcher Roman beginnt mit dem Satz „Call me Ishmael“?",
        options: ["Der alte Mann und das Meer", "Moby-Dick", "Die Schatzinsel", "Robinson Crusoe"],
        correctIndex: 1,
        explanation: "„Moby-Dick“ von Herman Melville beginnt mit diesem berühmten ersten Satz.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „HTML“?",
        options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "HyperLink and Text Markup Language"],
        correctIndex: 0,
        explanation: "HTML steht für „HyperText Markup Language“, die Standardsprache für Webseiten.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet ist der Sonne am nächsten?",
        options: ["Venus", "Merkur", "Mars", "Erde"],
        correctIndex: 1,
        explanation: "Merkur ist der sonnennächste Planet im Sonnensystem.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für Frequenz?",
        options: ["Hertz", "Joule", "Watt", "Tesla"],
        correctIndex: 0,
        explanation: "Hertz ist die Einheit für Frequenz, benannt nach Heinrich Hertz.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte Batman im Film „Batman Begins“ (2005)?",
        options: ["Val Kilmer", "Christian Bale", "George Clooney", "Michael Keaton"],
        correctIndex: 1,
        explanation: "Christian Bale spielte Batman in Christopher Nolans „Batman Begins“ und den folgenden Filmen.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in Portugal hauptsächlich gesprochen?",
        options: ["Spanisch", "Portugiesisch", "Katalanisch", "Galicisch"],
        correctIndex: 1,
        explanation: "Portugiesisch ist die Amtssprache Portugals.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Welche Zentralbank ist für die Geldpolitik der USA verantwortlich?",
        options: ["Die Federal Reserve (Fed)", "Die Weltbank", "Der IWF", "Die EZB"],
        correctIndex: 0,
        explanation: "Die Federal Reserve (Fed) ist die Zentralbank der USA.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 19 mal 5?",
        options: ["85", "90", "95", "100"],
        correctIndex: 2,
        explanation: "19 × 5 = 95.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Tafelberg?",
        options: ["Namibia", "Südafrika", "Kenia", "Simbabwe"],
        correctIndex: 1,
        explanation: "Der Tafelberg überragt die südafrikanische Stadt Kapstadt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie viele Kammern hat ein Vogelherz?",
        options: ["2", "3", "4", "6"],
        correctIndex: 2,
        explanation: "Wie beim Menschen hat ein Vogelherz zwei Vorhöfe und zwei Kammern.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr fiel die Berliner Mauer?",
        options: ["1987", "1989", "1991", "1993"],
        correctIndex: 1,
        explanation: "Die Berliner Mauer fiel am 9. November 1989.",
      },
      {
        category: "Chemie",
        question: "Welches Element hat das chemische Symbol „Ne“?",
        options: ["Nickel", "Neon", "Neptunium", "Natrium"],
        correctIndex: 1,
        explanation: "Neon wird mit „Ne“ abgekürzt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer war ein bedeutender mexikanischer Wandmaler des 20. Jahrhunderts?",
        options: ["Diego Rivera", "Fernando Botero", "Rufino Tamayo (ebenfalls bekannt)", "Frida Kahlo (primär Malerin, nicht Wandmalerei)"],
        correctIndex: 0,
        explanation: "Diego Rivera ist berühmt für seine großformatigen politischen Wandgemälde in Mexiko.",
      },
      {
        category: "Alltag",
        question: "Wie viele Farben hat ein klassischer Regenbogen üblicherweise nach der traditionellen Einteilung?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2,
        explanation: "Traditionell werden sieben Regenbogenfarben unterschieden: Rot, Orange, Gelb, Grün, Blau, Indigo und Violett.",
      },
      {
        category: "Sport",
        question: "Welche Sportart kombiniert Skispringen und Langlauf?",
        options: ["Biathlon", "Nordische Kombination", "Skicross", "Freestyle-Ski"],
        correctIndex: 1,
        explanation: "Die Nordische Kombination vereint Skispringen und Skilanglauf in einem Wettbewerb.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welcher Musikstil ist geprägt von Synkopen und entstand unter afroamerikanischen Musikern in den USA?",
        options: ["Klassik", "Jazz", "Barock", "Volksmusik"],
        correctIndex: 1,
        explanation: "Jazz entstand Anfang des 20. Jahrhunderts vor allem unter afroamerikanischen Musikern in den USA.",
      },
      {
        category: "Literatur",
        question: "Welche Autorin schuf die Detektivin Miss Marple?",
        options: ["Dorothy L. Sayers", "Agatha Christie", "P.D. James", "Ruth Rendell"],
        correctIndex: 1,
        explanation: "Agatha Christie erschuf sowohl Hercule Poirot als auch Miss Marple.",
      },
      {
        category: "Technik",
        question: "Welches Unternehmen entwickelte den ersten kommerziellen Webbrowser Netscape?",
        options: ["Microsoft", "Netscape Communications", "Google", "Apple"],
        correctIndex: 1,
        explanation: "Netscape Communications veröffentlichte in den 1990ern einen der ersten weit verbreiteten Webbrowser.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man den Bereich weit außerhalb der Neptunbahn, in dem sich viele Eiskörper wie Pluto befinden?",
        options: ["Asteroidengürtel", "Kuipergürtel", "Oortsche Wolke", "Van-Allen-Gürtel"],
        correctIndex: 1,
        explanation: "Der Kuipergürtel liegt jenseits der Neptunbahn und enthält zahlreiche Eiskörper, darunter Pluto.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für Leistung?",
        options: ["Joule", "Newton", "Watt", "Volt"],
        correctIndex: 2,
        explanation: "Watt ist die Einheit der Leistung, benannt nach James Watt.",
      },
      {
        category: "Film",
        question: "Welcher Film handelt von einem Roboter, der sich in eine Menschenfrau namens Eve verliebt?",
        options: ["I, Robot", "WALL-E", "Ex Machina", "Her"],
        correctIndex: 1,
        explanation: "„WALL-E“ von Pixar erzählt die Geschichte eines Roboters, der sich in EVE verliebt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie nennt man die Lehre von der korrekten Aussprache einer Sprache?",
        options: ["Grammatik", "Phonetik", "Semantik", "Syntax"],
        correctIndex: 1,
        explanation: "Phonetik befasst sich mit den Lauten und der Aussprache einer Sprache.",
      },
      {
        category: "Wirtschaft",
        question: "Welches Prinzip beschreibt, dass Angebot und Nachfrage den Preis eines Gutes bestimmen?",
        options: ["Skaleneffekt", "Angebot und Nachfrage", "Grenznutzen", "Monopolprinzip"],
        correctIndex: 1,
        explanation: "Das Prinzip von Angebot und Nachfrage ist eine Grundlage der Marktwirtschaft.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Flächen hat ein Würfel?",
        options: ["4", "6", "8", "10"],
        correctIndex: 1,
        explanation: "Ein Würfel hat sechs quadratische Flächen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land hat als einziges eine Grenze zu genau einem anderen Land?",
        options: ["Portugal", "Kanada", "Südkorea", "San Marino"],
        correctIndex: 0,
        explanation: "Portugal grenzt ausschließlich an Spanien als einziges Nachbarland.",
      },
      {
        category: "Biologie",
        question: "Welches Blutgefäß transportiert sauerstoffreiches Blut vom Herzen weg?",
        options: ["Vene", "Arterie", "Kapillare", "Lymphgefäß"],
        correctIndex: 1,
        explanation: "Arterien transportieren in der Regel sauerstoffreiches Blut vom Herzen zu den Organen.",
      },
      {
        category: "Geschichte",
        question: "Welches Land wurde durch die Teilung 1947 aus Britisch-Indien gebildet?",
        options: ["Bangladesch", "Pakistan", "Sri Lanka", "Myanmar"],
        correctIndex: 1,
        explanation: "1947 wurde Pakistan bei der Unabhängigkeit Indiens als eigener Staat gegründet.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Element ist für den Rost auf Eisen verantwortlich?",
        options: ["Kohlenstoff", "Sauerstoff", "Stickstoff", "Wasserstoff"],
        correctIndex: 1,
        explanation: "Rost entsteht durch die Reaktion von Eisen mit Sauerstoff und Feuchtigkeit.",
      },
      {
        category: "Kunst",
        question: "Welches Land ist bekannt für die traditionelle Kunstform der Ukiyo-e-Holzschnitte?",
        options: ["China", "Japan", "Korea", "Vietnam"],
        correctIndex: 1,
        explanation: "Ukiyo-e ist eine japanische Holzschnitt- und Malereitradition, bekannt durch Künstler wie Hokusai.",
      },
      {
        category: "Alltag",
        question: "Wie viele Herzkammern hat ein gesundes menschliches Herz?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Das menschliche Herz hat vier Kammern: zwei Vorhöfe und zwei Hauptkammern.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Welche Schwimmdisziplin gilt allgemein als die schnellste?",
        options: ["Brustschwimmen", "Rückenschwimmen", "Freistil (meist Kraulen)", "Schmetterling"],
        correctIndex: 2,
        explanation: "Beim Freistilschwimmen wählen die meisten Schwimmer die schnelle Kraultechnik.",
      },
      {
        category: "Musik",
        question: "Welcher Komponist schrieb die Oper „Don Giovanni“?",
        options: ["Beethoven", "Mozart", "Haydn", "Salieri"],
        correctIndex: 1,
        explanation: "Wolfgang Amadeus Mozart komponierte die Oper „Don Giovanni“ 1787.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Moby-Dick“?",
        options: ["Mark Twain", "Herman Melville", "Nathaniel Hawthorne", "Edgar Allan Poe"],
        correctIndex: 1,
        explanation: "Herman Melville schrieb den Roman „Moby-Dick“ über die Jagd auf einen weißen Wal.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wer erfand das World Wide Web am CERN in der Schweiz?",
        options: ["Vint Cerf", "Tim Berners-Lee", "Marc Andreessen", "Jeff Bezos"],
        correctIndex: 1,
        explanation: "Tim Berners-Lee entwickelte das World Wide Web 1989 am Forschungszentrum CERN.",
      },
      {
        category: "Astronomie",
        question: "Welches Sternbild wird oft mit einem großen Bären assoziiert?",
        options: ["Orion", "Großer Bär (Ursa Major)", "Kassiopeia", "Schwan"],
        correctIndex: 1,
        explanation: "Der Große Bär (Ursa Major) ist eines der bekanntesten Sternbilder am Nordhimmel.",
      },
      {
        category: "Physik",
        question: "Welches Phänomen beschreibt, warum der Himmel tagsüber blau erscheint?",
        options: ["Brechung", "Rayleigh-Streuung", "Reflexion", "Polarisation"],
        correctIndex: 1,
        explanation: "Die Rayleigh-Streuung sorgt dafür, dass kurzwelliges blaues Licht stärker gestreut wird als andere Farben.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Regisseur schuf die „Star Wars“-Filmreihe?",
        options: ["Steven Spielberg", "George Lucas", "James Cameron", "Ridley Scott"],
        correctIndex: 1,
        explanation: "George Lucas schuf die „Star Wars“-Saga.",
      },
      {
        category: "Sprache",
        question: "Wie nennt man die Wiederholung des gleichen Anfangslauts in aufeinanderfolgenden Wörtern?",
        options: ["Reim", "Alliteration", "Assonanz", "Anapher"],
        correctIndex: 1,
        explanation: "Alliteration bezeichnet die Wiederholung gleicher Anfangslaute, wie in „Milch macht müde Männer munter“.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den regelmäßigen Lohn, den ein Arbeitnehmer für seine Arbeit erhält?",
        options: ["Dividende", "Gehalt", "Zins", "Rente"],
        correctIndex: 1,
        explanation: "Gehalt ist die regelmäßige Bezahlung für geleistete Arbeit.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viele Seiten hat ein Zwölfeck?",
        options: ["10", "11", "12", "13"],
        correctIndex: 2,
        explanation: "Ein Zwölfeck (Dodekagon) hat zwölf Seiten.",
      },
      {
        category: "Geografie",
        question: "Welches Meer hat den höchsten Salzgehalt der Erde?",
        options: ["Rotes Meer", "Totes Meer", "Mittelmeer", "Kaspisches Meer"],
        correctIndex: 1,
        explanation: "Das Tote Meer gilt mit seinem extremen Salzgehalt als eines der salzreichsten Gewässer der Welt.",
      },
      {
        category: "Biologie",
        question: "Welches Tier kann sein eigenes Gewicht mehrfach in der Luft heben, obwohl es nicht fliegt — nein, welches Insekt kann das 50-fache seines Körpergewichts tragen?",
        options: ["Biene", "Ameise", "Käfer", "Grille"],
        correctIndex: 1,
        explanation: "Ameisen können dank ihrer Körperstruktur ein Vielfaches ihres eigenen Gewichts tragen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Wer war Charles Darwin?",
        options: ["Ein Physiker", "Ein Naturforscher, bekannt für die Evolutionstheorie", "Ein Chemiker", "Ein Astronom"],
        correctIndex: 1,
        explanation: "Darwin entwickelte im 19. Jahrhundert die Theorie der natürlichen Selektion.",
      },
      {
        category: "Chemie",
        question: "Welches Element wird für die Herstellung von Aluminiumfolie und Dosen verwendet?",
        options: ["Zink", "Aluminium", "Titan", "Nickel"],
        correctIndex: 1,
        explanation: "Aluminium ist leicht, korrosionsbeständig und wird häufig für Folien und Verpackungen genutzt.",
      },
      {
        category: "Kunst",
        question: "Welcher Künstler malte die Decke der Sixtinischen Kapelle?",
        options: ["Leonardo da Vinci", "Michelangelo", "Raffael", "Tizian"],
        correctIndex: 1,
        explanation: "Michelangelo bemalte die Decke der Sixtinischen Kapelle zwischen 1508 und 1512.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Räder hat ein Dreirad?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        explanation: "Ein Dreirad hat, wie der Name sagt, drei Räder.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell bei der Tour de France ausgetragen?",
        options: ["Laufen", "Radsport", "Triathlon", "Motorsport"],
        correctIndex: 1,
        explanation: "Die Tour de France ist eines der bekanntesten Radrennen der Welt.",
      },
      {
        category: "Musik",
        question: "Welche Band ist bekannt für den Song „Stairway to Heaven“?",
        options: ["Deep Purple", "Led Zeppelin", "The Who", "Black Sabbath"],
        correctIndex: 1,
        explanation: "„Stairway to Heaven“ ist einer der bekanntesten Songs von Led Zeppelin.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Welcher russische Autor schrieb „Schuld und Sühne“ (auch „Verbrechen und Strafe“)?",
        options: ["Lew Tolstoi", "Fjodor Dostojewski", "Anton Tschechow", "Nikolai Gogol"],
        correctIndex: 1,
        explanation: "Fjodor Dostojewski schrieb den psychologischen Roman „Schuld und Sühne“.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „USB“?",
        options: ["Universal Serial Bus", "United System Board", "Universal System Backup", "Unified Serial Board"],
        correctIndex: 0,
        explanation: "USB steht für „Universal Serial Bus“, eine Standardschnittstelle für Geräte.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet hat die kürzeste Umlaufzeit um die Sonne?",
        options: ["Venus", "Merkur", "Erde", "Mars"],
        correctIndex: 1,
        explanation: "Merkur umkreist die Sonne am schnellsten, in etwa 88 Erdtagen.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Welches Teilchen hat keine elektrische Ladung?",
        options: ["Proton", "Elektron", "Neutron", "Ion"],
        correctIndex: 2,
        explanation: "Neutronen sind elektrisch neutral, im Gegensatz zu Protonen und Elektronen.",
      },
      {
        category: "Film",
        question: "Welcher Film gewann 1994 den Oscar für den besten Film und handelt von einem Mann mit besonderem Blick auf die Geschichte der USA?",
        options: ["Pulp Fiction", "Forrest Gump", "Der Schawshank Redemption", "The Lion King"],
        correctIndex: 1,
        explanation: "„Forrest Gump“ gewann 1994/1995 mehrere Oscars, darunter den für den besten Film.",
      },
      {
        category: "Sprache",
        question: "Wie nennt man ein aus einem englischen Wort ins Deutsche übernommenes Wort, z. B. „Computer“?",
        options: ["Germanismus", "Anglizismus", "Gallizismus", "Latinismus"],
        correctIndex: 1,
        explanation: "Ein Anglizismus ist ein aus dem Englischen übernommenes Wort oder Ausdruck.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Prozess, bei dem zwei Unternehmen zu einem verschmelzen?",
        options: ["Übernahme", "Fusion", "Spin-off", "Insolvenz"],
        correctIndex: 1,
        explanation: "Eine Fusion beschreibt den Zusammenschluss zweier Unternehmen zu einer neuen Einheit.",
      },
      {
        category: "Mathematik",
        question: "Wie viele Diagonalen hat ein Achteck?",
        options: ["18", "19", "20", "21"],
        correctIndex: 2,
        explanation: "Ein Achteck hat genau 20 Diagonalen.",
      },
      {
        category: "Geografie",
        question: "In welchem Land liegt der Yellowstone-Nationalpark?",
        options: ["Kanada", "USA", "Mexiko", "Argentinien"],
        correctIndex: 1,
        explanation: "Der Yellowstone-Nationalpark liegt in den US-Bundesstaaten Wyoming, Montana und Idaho.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie nennt man Pflanzen, die einmal im Jahr blühen und dann absterben?",
        options: ["Perennierende Pflanzen", "Einjährige Pflanzen", "Sukkulenten", "Zwiebelpflanzen"],
        correctIndex: 1,
        explanation: "Einjährige Pflanzen durchlaufen ihren gesamten Lebenszyklus innerhalb eines Jahres.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr endete der Dreißigjährige Krieg?",
        options: ["1618", "1648", "1683", "1701"],
        correctIndex: 1,
        explanation: "Der Dreißigjährige Krieg endete 1648 mit dem Westfälischen Frieden.",
      },
      {
        category: "Chemie",
        question: "Welches Element ist Bestandteil aller organischen Verbindungen?",
        options: ["Sauerstoff", "Kohlenstoff", "Stickstoff", "Wasserstoff"],
        correctIndex: 1,
        explanation: "Kohlenstoff ist das zentrale Element aller organischen Chemie.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "In welcher Epoche wirkte hauptsächlich der Maler Caravaggio?",
        options: ["Renaissance", "Barock", "Rokoko", "Klassizismus"],
        correctIndex: 1,
        explanation: "Caravaggio war ein wegweisender Maler des frühen Barock, bekannt für starke Hell-Dunkel-Kontraste.",
      },
      {
        category: "Alltag",
        question: "Wie viele Tage hat der Monat Oktober?",
        options: ["28", "29", "30", "31"],
        correctIndex: 3,
        explanation: "Der Oktober hat 31 Tage.",
      },
      {
        category: "Sport",
        question: "Welche Sportart nutzt Gewichte, die über den Kopf gestemmt werden?",
        options: ["Kraftdreikampf", "Gewichtheben", "Crossfit", "Ringen"],
        correctIndex: 1,
        explanation: "Beim Gewichtheben werden Hantelscheiben in festgelegten Übungen über den Kopf gestemmt.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Welcher King of Pop veröffentlichte das Album „Thriller“?",
        options: ["Prince", "Michael Jackson", "Stevie Wonder", "James Brown"],
        correctIndex: 1,
        explanation: "„Thriller“ ist das erfolgreichste Album von Michael Jackson, erschienen 1982.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb die Reihe „Percy Jackson“?",
        options: ["Rick Riordan", "John Green", "Suzanne Collins", "Veronica Roth"],
        correctIndex: 0,
        explanation: "Rick Riordan schrieb die beliebte Jugendbuchreihe „Percy Jackson“.",
      },
      {
        category: "Technik",
        question: "Wer gilt als Erfinder des ersten praktikablen Automobils mit Verbrennungsmotor?",
        options: ["Henry Ford", "Karl Benz", "Rudolf Diesel", "Ferdinand Porsche"],
        correctIndex: 1,
        explanation: "Karl Benz gilt als Erfinder des ersten praxistauglichen Automobils mit Verbrennungsmotor 1886.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Welche Raumsonde erreichte als erste den interstellaren Raum außerhalb des Sonnensystems?",
        options: ["Voyager 1", "New Horizons", "Cassini", "Pioneer 10"],
        correctIndex: 0,
        explanation: "Voyager 1 verließ 2012 als erstes von Menschen gebautes Objekt den interstellaren Raum.",
      },
      {
        category: "Physik",
        question: "Wer stellte das Unschärfeprinzip der Quantenmechanik auf?",
        options: ["Albert Einstein", "Werner Heisenberg", "Erwin Schrödinger", "Niels Bohr"],
        correctIndex: 1,
        explanation: "Werner Heisenberg formulierte 1927 die berühmte Unschärferelation.",
      },
      {
        category: "Film",
        question: "Welches Studio produzierte die „Shrek“-Filmreihe?",
        options: ["Pixar", "DreamWorks Animation", "Illumination", "Blue Sky Studios"],
        correctIndex: 1,
        explanation: "DreamWorks Animation produzierte die „Shrek“-Filme.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Welche Schrift wird für die russische Sprache verwendet?",
        options: ["Lateinische Schrift", "Kyrillische Schrift", "Arabische Schrift", "Griechische Schrift"],
        correctIndex: 1,
        explanation: "Russisch wird mit dem kyrillischen Alphabet geschrieben.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man das Geld, das ein Staat einnimmt und ausgibt in einem Jahr?",
        options: ["Bruttosozialprodukt", "Staatshaushalt", "Handelsbilanz", "Leitzins"],
        correctIndex: 1,
        explanation: "Der Staatshaushalt umfasst die geplanten Einnahmen und Ausgaben eines Staates.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist die Quadratwurzel aus 25?",
        options: ["4", "5", "6", "7"],
        correctIndex: 1,
        explanation: "5 × 5 = 25, also ist die Quadratwurzel aus 25 gleich 5.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land liegt südlich von Spanien über die Straße von Gibraltar?",
        options: ["Algerien", "Marokko", "Tunesien", "Libyen"],
        correctIndex: 1,
        explanation: "Marokko liegt direkt gegenüber Spaniens auf der anderen Seite der Straße von Gibraltar.",
      },
      {
        category: "Biologie",
        question: "Welches Organ ist für die Produktion weißer Blutkörperchen mitverantwortlich, neben dem Knochenmark?",
        options: ["Leber", "Milz", "Niere", "Magen"],
        correctIndex: 1,
        explanation: "Die Milz spielt eine wichtige Rolle bei der Immunabwehr und Blutfilterung.",
      },
      {
        category: "Geschichte",
        question: "Welche Zivilisation erbaute die Pyramiden von Gizeh?",
        options: ["Maya", "Alte Ägypter", "Römer", "Griechen"],
        correctIndex: 1,
        explanation: "Die Pyramiden von Gizeh wurden vom Alten Ägypten errichtet.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Wie heißt das chemische Symbol für Zink?",
        options: ["Zk", "Zn", "Zi", "Zc"],
        correctIndex: 1,
        explanation: "Zink wird mit „Zn“ abgekürzt.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Der Wanderer über dem Nebelmeer“?",
        options: ["Caspar David Friedrich", "Carl Spitzweg", "Adolph Menzel", "Franz Marc"],
        correctIndex: 0,
        explanation: "Caspar David Friedrich malte das ikonische Bild der deutschen Romantik.",
      },
      {
        category: "Alltag",
        question: "Welches Werkzeug nutzt man typischerweise zum Sägen von Holz?",
        options: ["Hammer", "Säge", "Feile", "Zange"],
        correctIndex: 1,
        explanation: "Eine Säge ist das klassische Werkzeug zum Zerteilen von Holz.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sport",
        question: "Wie viele Spieler bilden ein Team beim klassischen Doppel im Tennis?",
        options: ["1", "2", "3", "4"],
        correctIndex: 1,
        explanation: "Beim Tennisdoppel treten zwei Spieler pro Team gemeinsam an.",
      },
      {
        category: "Musik",
        question: "Welcher Komponist schrieb „Für Elise“?",
        options: ["Mozart", "Beethoven", "Chopin", "Schubert"],
        correctIndex: 1,
        explanation: "Ludwig van Beethoven komponierte das bekannte Klavierstück „Für Elise“.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „Der Glöckner von Notre-Dame“?",
        options: ["Victor Hugo", "Gustave Flaubert", "Émile Zola", "Honoré de Balzac"],
        correctIndex: 0,
        explanation: "Victor Hugo schrieb den Roman über Quasimodo, den Glöckner von Notre-Dame.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Technik",
        question: "Wie viele Bits ergeben ein Byte?",
        options: ["4", "8", "16", "32"],
        correctIndex: 1,
        explanation: "Ein Byte besteht aus acht Bits.",
      },
      {
        category: "Astronomie",
        question: "Welcher Planet hat die meisten bekannten Monde im Sonnensystem (Stand grob aktuelle Forschung)?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptun"],
        correctIndex: 1,
        explanation: "Nach neueren Entdeckungen führt Saturn mit den meisten bekannten Monden, dicht gefolgt von Jupiter.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für elektrische Stromstärke?",
        options: ["Volt", "Ampere", "Ohm", "Coulomb"],
        correctIndex: 1,
        explanation: "Ampere ist die Einheit der elektrischen Stromstärke, benannt nach André-Marie Ampère.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Film",
        question: "Welcher Schauspieler spielte den Hauptcharakter in „Cast Away“?",
        options: ["Tom Hanks", "Tom Cruise", "Kevin Costner", "Harrison Ford"],
        correctIndex: 0,
        explanation: "Tom Hanks spielte einen Schiffbrüchigen in „Cast Away“.",
      },
      {
        category: "Sprache",
        question: "Wie nennt man eine übertriebene sprachliche Darstellung zur Verstärkung einer Aussage?",
        options: ["Ironie", "Hyperbel (Übertreibung)", "Euphemismus", "Litotes"],
        correctIndex: 1,
        explanation: "Eine Hyperbel ist eine bewusste sprachliche Übertreibung.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Zusammenschluss mehrerer Unternehmen zur Kontrolle von Preisen oder Märkten?",
        options: ["Fusion", "Kartell", "Start-up", "Franchise"],
        correctIndex: 1,
        explanation: "Ein Kartell ist eine Absprache zwischen Unternehmen, oft zur Beeinflussung von Preisen — in den meisten Ländern illegal.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Mathematik",
        question: "Wie viel ist 63 geteilt durch 9?",
        options: ["6", "7", "8", "9"],
        correctIndex: 1,
        explanation: "63 ÷ 9 = 7.",
      },
      {
        category: "Geografie",
        question: "Welches Land besitzt die meisten aktiven Zeitzonen weltweit durch ein einziges Territorium?",
        options: ["Russland (11 Zeitzonen)", "USA", "China (offiziell nur 1)", "Kanada"],
        correctIndex: 0,
        explanation: "Russland erstreckt sich über 11 Zeitzonen, mehr als jedes andere einzelne Staatsgebiet.",
      },
      {
        category: "Biologie",
        question: "Wie nennt man die Symbiose, bei der beide Partner profitieren?",
        options: ["Parasitismus", "Kommensalismus", "Mutualismus", "Konkurrenz"],
        correctIndex: 2,
        explanation: "Beim Mutualismus profitieren beide beteiligten Organismen von der Beziehung.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "In welchem Jahr wurde die Europäische Union (als EU) formell gegründet?",
        options: ["1957", "1973", "1993", "2002"],
        correctIndex: 2,
        explanation: "Die EU wurde 1993 durch den Vertrag von Maastricht formell gegründet, nach der EWG seit 1957.",
      },
      {
        category: "Chemie",
        question: "Welches Element ist essenziell für starke Knochen?",
        options: ["Kalium", "Kalzium", "Natrium", "Magnesium"],
        correctIndex: 1,
        explanation: "Kalzium ist ein Hauptbaustein von Knochen und Zähnen.",
      },
      {
        category: "Kunst",
        question: "Wer malte „Der Schrei“?",
        options: ["Gustav Klimt", "Edvard Munch", "Egon Schiele", "Wassily Kandinsky"],
        correctIndex: 1,
        explanation: "„Der Schrei“ ist das bekannteste Werk des norwegischen Malers Edvard Munch.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Alltag",
        question: "Wie viele Monate hat ein Jahr?",
        options: ["10", "11", "12", "13"],
        correctIndex: 2,
        explanation: "Ein Jahr hat zwölf Monate.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell bei der Champions League ausgetragen?",
        options: ["Basketball", "Fußball", "Eishockey", "Handball"],
        correctIndex: 1,
        explanation: "Die UEFA Champions League ist der bekannteste europäische Fußballwettbewerb für Vereinsmannschaften.",
      },
      {
        category: "Musik",
        question: "Welcher Musiker ist bekannt als „King of Rock and Roll“?",
        options: ["Chuck Berry", "Elvis Presley", "Little Richard", "Jerry Lee Lewis"],
        correctIndex: 1,
        explanation: "Elvis Presley trägt den Beinamen „King of Rock and Roll“.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Literatur",
        question: "Welcher Roman von Mary Shelley erzählt von einem Wissenschaftler, der ein Monster erschafft?",
        options: ["Dracula", "Frankenstein", "Der Zauberer von Oz", "Der Glöckner von Notre-Dame"],
        correctIndex: 1,
        explanation: "Mary Shelley schrieb „Frankenstein“ 1818, oft als früher Science-Fiction-Roman betrachtet.",
      },
      {
        category: "Technik",
        question: "Wer entwickelte das erste weltweit verbreitete soziale Netzwerk Facebook mit?",
        options: ["Jack Dorsey", "Mark Zuckerberg", "Evan Spiegel", "Kevin Systrom"],
        correctIndex: 1,
        explanation: "Mark Zuckerberg gründete Facebook 2004 mit Kommilitonen in Harvard.",
      },
      {
        category: "Astronomie",
        question: "Wie nennt man das Phänomen, wenn die Erde zwischen Sonne und Mond steht?",
        options: ["Sonnenfinsternis", "Mondfinsternis", "Konjunktion", "Opposition"],
        correctIndex: 1,
        explanation: "Bei einer Mondfinsternis wirft die Erde ihren Schatten auf den Mond.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für elektrischen Widerstand?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctIndex: 2,
        explanation: "Ohm ist die Einheit des elektrischen Widerstands, benannt nach Georg Simon Ohm.",
      },
      {
        category: "Film",
        question: "Welcher Schauspieler spielte Jack Sparrow in „Fluch der Karibik“?",
        options: ["Orlando Bloom", "Johnny Depp", "Geoffrey Rush", "Javier Bardem"],
        correctIndex: 1,
        explanation: "Johnny Depp spielte die ikonische Rolle des Captain Jack Sparrow.",
      },
      {
        category: "Sprache",
        question: "Welche Sprache wird in Marokko neben Arabisch offiziell auch als Amtssprache anerkannt (Berbersprache)?",
        options: ["Tamazight", "Wolof", "Hausa", "Fulfulde"],
        correctIndex: 0,
        explanation: "Tamazight (Berbersprache) ist neben Arabisch Amtssprache in Marokko.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Wirtschaft",
        question: "Wie nennt man den Betrag, den ein Unternehmen seinen Aktionären als Gewinnanteil auszahlt?",
        options: ["Zins", "Dividende", "Rendite", "Kupon"],
        correctIndex: 1,
        explanation: "Eine Dividende ist die Ausschüttung eines Teils des Unternehmensgewinns an die Aktionäre.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 30 Prozent von 90?",
        options: ["24", "25", "26", "27"],
        correctIndex: 3,
        explanation: "30 % von 90 = 0,3 × 90 = 27.",
      },
      {
        category: "Geografie",
        question: "Welcher Fluss fließt durch Ägypten?",
        options: ["Amazonas", "Nil", "Kongo", "Niger"],
        correctIndex: 1,
        explanation: "Der Nil durchfließt Ägypten von Süden nach Norden.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie viele Arten von Blutgruppen gibt es im AB0-System?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Das AB0-System kennt die Blutgruppen A, B, AB und 0.",
      },
      {
        category: "Geschichte",
        question: "Wer war Marco Polo?",
        options: ["Ein spanischer Eroberer", "Ein venezianischer Kaufmann und Entdecker Asiens", "Ein portugiesischer Seefahrer", "Ein englischer Pirat"],
        correctIndex: 1,
        explanation: "Marco Polo bereiste im 13. Jahrhundert Asien und berichtete darüber in Europa.",
      },
      {
        category: "Chemie",
        question: "Wie viele Hauptbestandteile hat trockene Luft grob (Stickstoff, Sauerstoff und ...)?",
        options: ["Argon und Kohlenstoffdioxid als weitere wichtige Bestandteile", "Nur Wasserstoff", "Nur Helium", "Nur Ozon"],
        correctIndex: 0,
        explanation: "Neben Stickstoff und Sauerstoff enthält trockene Luft geringe Mengen Argon und Kohlenstoffdioxid.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Wer malte die Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raffael", "Botticelli"],
        correctIndex: 1,
        explanation: "Leonardo da Vinci malte die Mona Lisa Anfang des 16. Jahrhunderts.",
      },
      {
        category: "Alltag",
        question: "Wie viele Jahreszeiten gibt es klassisch in Mitteleuropa?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Frühling, Sommer, Herbst und Winter bilden die vier klassischen Jahreszeiten.",
      },
      {
        category: "Sport",
        question: "Welche Sportart wird traditionell bei den Ryder-Cup-Turnieren ausgetragen?",
        options: ["Tennis", "Golf", "Segeln", "Reiten"],
        correctIndex: 1,
        explanation: "Der Ryder Cup ist ein bekanntes Golfturnier zwischen Europa und den USA.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Musik",
        question: "Wie viele Mitglieder hatten die Beatles in ihrer klassischen Besetzung?",
        options: ["3", "4", "5", "6"],
        correctIndex: 1,
        explanation: "Die Beatles bestanden klassisch aus vier Mitgliedern: John, Paul, George und Ringo.",
      },
      {
        category: "Literatur",
        question: "Wer schrieb „1984“?",
        options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
        correctIndex: 1,
        explanation: "George Orwell veröffentlichte den dystopischen Roman „1984“ im Jahr 1949.",
      },
      {
        category: "Technik",
        question: "Wofür steht die Abkürzung „AI“ bzw. „KI“ im Deutschen?",
        options: ["Automatisierte Information", "Künstliche Intelligenz", "Analytische Instanz", "Angewandte Informatik"],
        correctIndex: 1,
        explanation: "KI steht für „Künstliche Intelligenz“, im Englischen „Artificial Intelligence“ (AI).",
      },
    ],
  },
  {
    questions: [
      {
        category: "Astronomie",
        question: "Wie nennt man den Vorgang, bei dem ein Stern am Ende seines Lebens explodiert?",
        options: ["Supernova", "Nova", "Kollaps", "Fusion"],
        correctIndex: 0,
        explanation: "Eine Supernova ist die gewaltige Explosion eines Sterns am Ende seines Lebenszyklus.",
      },
      {
        category: "Physik",
        question: "Wie nennt man die Einheit für Kraft?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctIndex: 1,
        explanation: "Newton ist die SI-Einheit für Kraft.",
      },
      {
        category: "Film",
        question: "Wer führte bei „Pulp Fiction“ Regie?",
        options: ["Martin Scorsese", "Quentin Tarantino", "Coen Brothers", "David Fincher"],
        correctIndex: 1,
        explanation: "Quentin Tarantino führte bei „Pulp Fiction“ Regie.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Sprache",
        question: "Wie nennt man einen Ausdruck, der wörtlich genommen etwas anderes bedeutet als im übertragenen Sinn, z. B. „ins Gras beißen“?",
        options: ["Metapher", "Redewendung (Idiom)", "Sprichwort", "Neologismus"],
        correctIndex: 1,
        explanation: "Redewendungen bzw. Idiome haben eine feststehende, oft nicht wörtlich zu verstehende Bedeutung.",
      },
      {
        category: "Wirtschaft",
        question: "Wie nennt man das Geld, das man auf ein Sparkonto einzahlt und dafür Zinsen bekommt?",
        options: ["Kredit", "Ersparnisse", "Schulden", "Gehalt"],
        correctIndex: 1,
        explanation: "Ersparnisse sind Geldbeträge, die gespart und meist verzinst werden.",
      },
      {
        category: "Mathematik",
        question: "Wie viel ist 6 mal 7?",
        options: ["36", "40", "42", "48"],
        correctIndex: 2,
        explanation: "6 × 7 = 42.",
      },
    ],
  },
];
