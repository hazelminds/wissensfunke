/**
 * Ebene 1 — täglicher Gratis-Anker (siehe Briefing Abschnitt 2).
 * Komplett kostenlos, kein Zufallselement mit Vermögenswert: die Auswahl
 * ist rein datumsbasiert (deterministisch), nicht zufällig, und rotiert
 * einfach durch den Pool. Sobald der Pool erschöpft ist, geht es von vorn
 * los — die Pools sollten mit der Zeit wachsen (siehe Briefing Abschnitt 8:
 * "Content-Backlog").
 */

export interface DailyQuizQuestion {
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DailyQuizSet {
  questions: DailyQuizQuestion[];
}

export interface DailyRiddle {
  prompt: string;
  answer: string;
  explanation: string;
}

export const dailyCategoryIcons: Record<string, string> = {
  Geografie: "🌍",
  Biologie: "🧬",
  Geschichte: "🏛️",
  Chemie: "⚗️",
  Kunst: "🎨",
  Alltag: "🔢",
};

export const dailyQuizSets: DailyQuizSet[] = [
  {
    questions: [
      {
        category: "Geografie",
        question: "Welcher Fluss gilt gemeinhin als der längste der Welt?",
        options: ["Nil", "Amazonas", "Jangtsekiang", "Mississippi"],
        correctIndex: 0,
        explanation:
          "Der Nil wird traditionell als längster Fluss der Welt geführt, auch wenn manche Messungen den Amazonas knapp davor sehen.",
      },
      {
        category: "Biologie",
        question: "Welches ist das größte Säugetier der Welt?",
        options: ["Elefant", "Blauwal", "Giraffe", "Nashorn"],
        correctIndex: 1,
        explanation: "Der Blauwal kann über 30 Meter lang und rund 150 Tonnen schwer werden.",
      },
      {
        category: "Geschichte",
        question: "In welchem Jahr begann der Erste Weltkrieg?",
        options: ["1912", "1914", "1916", "1918"],
        correctIndex: 1,
        explanation: "Der Erste Weltkrieg begann 1914 nach dem Attentat von Sarajevo.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Chemie",
        question: "Welches Element ist das häufigste im gesamten Universum?",
        options: ["Sauerstoff", "Kohlenstoff", "Wasserstoff", "Helium"],
        correctIndex: 2,
        explanation: "Rund 75 % der sichtbaren Masse des Universums ist Wasserstoff.",
      },
      {
        category: "Kunst",
        question: "In welcher Stadt steht der Eiffelturm?",
        options: ["London", "Paris", "Rom", "Berlin"],
        correctIndex: 1,
        explanation: "Der Eiffelturm wurde 1889 für die Weltausstellung in Paris errichtet.",
      },
      {
        category: "Geografie",
        question: "Welches ist der flächenmäßig kleinste Kontinent?",
        options: ["Europa", "Australien", "Antarktis", "Südamerika"],
        correctIndex: 1,
        explanation: "Australien ist mit rund 7,7 Millionen km² der kleinste Kontinent.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Biologie",
        question: "Wie viele Herzen hat ein Oktopus?",
        options: ["1", "2", "3", "4"],
        correctIndex: 2,
        explanation: "Zwei Herzen pumpen Blut zu den Kiemen, ein drittes durch den restlichen Körper.",
      },
      {
        category: "Geschichte",
        question: "Wer betrat als erster Mensch den Mond?",
        options: ["Buzz Aldrin", "Neil Armstrong", "Juri Gagarin", "John Glenn"],
        correctIndex: 1,
        explanation: "Neil Armstrong betrat den Mond am 21. Juli 1969 als erster Mensch.",
      },
      {
        category: "Alltag",
        question: "Wie viele Minuten hat ein Tag?",
        options: ["1000", "1200", "1440", "1600"],
        correctIndex: 2,
        explanation: "24 Stunden × 60 Minuten = 1440 Minuten.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "Welches Land hat durch seine Überseegebiete die meisten Zeitzonen der Welt?",
        options: ["Russland", "USA", "Frankreich", "China"],
        correctIndex: 2,
        explanation:
          "Dank seiner Überseegebiete (u. a. Französisch-Polynesien) erstreckt sich Frankreich über 12 Zeitzonen.",
      },
      {
        category: "Kunst",
        question: "Wer komponierte die 9. Sinfonie mit der „Ode an die Freude“?",
        options: ["Mozart", "Beethoven", "Bach", "Brahms"],
        correctIndex: 1,
        explanation: "Beethoven vollendete die 9. Sinfonie 1824, bereits nahezu vollständig ertaubt.",
      },
      {
        category: "Chemie",
        question: "Welches Gas geben Pflanzen bei der Fotosynthese hauptsächlich ab?",
        options: ["Kohlenstoffdioxid", "Stickstoff", "Sauerstoff", "Wasserstoff"],
        correctIndex: 2,
        explanation: "Pflanzen wandeln CO₂ und Wasser mithilfe von Licht in Zucker um und geben Sauerstoff ab.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geschichte",
        question: "Welches antike Weltwunder steht als einziges noch weitgehend erhalten?",
        options: [
          "Koloss von Rhodos",
          "Pyramiden von Gizeh",
          "Leuchtturm von Alexandria",
          "Hängende Gärten der Semiramis",
        ],
        correctIndex: 1,
        explanation: "Die Pyramiden von Gizeh sind das einzige der sieben antiken Weltwunder, das noch weitgehend steht.",
      },
      {
        category: "Biologie",
        question: "Welches ist das schnellste Landtier der Welt?",
        options: ["Löwe", "Gepard", "Antilope", "Strauß"],
        correctIndex: 1,
        explanation: "Der Gepard erreicht auf kurzen Strecken bis zu 110 km/h.",
      },
      {
        category: "Geografie",
        question: "Auf welchem Kontinent liegt die Sahara?",
        options: ["Asien", "Afrika", "Australien", "Südamerika"],
        correctIndex: 1,
        explanation: "Die Sahara erstreckt sich über weite Teile Nordafrikas.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Kunst",
        question: "Welcher Maler schnitt sich der Überlieferung nach ein Stück seines Ohrs ab?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"],
        correctIndex: 1,
        explanation: "Van Gogh verletzte sich 1888 in einer psychischen Krise selbst am Ohr.",
      },
      {
        category: "Chemie",
        question: "Welches Element trägt die Ordnungszahl 1 im Periodensystem?",
        options: ["Helium", "Wasserstoff", "Lithium", "Kohlenstoff"],
        correctIndex: 1,
        explanation: "Wasserstoff hat ein Proton im Kern und steht damit an Position 1.",
      },
      {
        category: "Geschichte",
        question: "Welches Volk erbaute die Pyramide von Chichén Itzá?",
        options: ["Azteken", "Maya", "Inka", "Olmeken"],
        correctIndex: 1,
        explanation: "Chichén Itzá war eine bedeutende Stadt der Maya auf der Halbinsel Yucatán.",
      },
    ],
  },
  {
    questions: [
      {
        category: "Geografie",
        question: "In welchem Meer schwimmt man durch den hohen Salzgehalt besonders leicht?",
        options: ["Rotes Meer", "Totes Meer", "Mittelmeer", "Schwarzes Meer"],
        correctIndex: 1,
        explanation: "Der extreme Salzgehalt des Toten Meeres macht das Schwimmen fast mühelos.",
      },
      {
        category: "Biologie",
        question: "Wie viele Kammern hat ein menschliches Herz?",
        options: ["2", "3", "4", "5"],
        correctIndex: 2,
        explanation: "Zwei Vorhöfe und zwei Kammern — insgesamt vier Hohlräume.",
      },
      {
        category: "Alltag",
        question: "Wie viele Sekunden hat eine Stunde?",
        options: ["360", "1800", "3600", "7200"],
        correctIndex: 2,
        explanation: "60 Minuten × 60 Sekunden = 3600 Sekunden.",
      },
    ],
  },
];

export const dailyRiddles: DailyRiddle[] = [
  {
    prompt:
      "Was hat morgens vier Beine, mittags zwei und abends drei — und ist doch immer dasselbe?",
    answer: "Der Mensch",
    explanation:
      "Das klassische Rätsel der Sphinx: als Baby krabbelt der Mensch auf vier Beinen, als Erwachsener geht er auf zwei, im Alter nutzt er einen Stock als drittes Bein.",
  },
  {
    prompt: "Je mehr davon wegkommt, desto größer wird es. Was ist gemeint?",
    answer: "Ein Loch",
    explanation: "Je mehr man aus einem Loch herausgräbt, desto größer wird es.",
  },
  {
    prompt: "Ich werde nasser, je mehr ich trockne. Was bin ich?",
    answer: "Ein Handtuch",
    explanation: "Ein Handtuch nimmt beim Trocknen selbst immer mehr Feuchtigkeit auf.",
  },
  {
    prompt:
      "Es ist leicht wie eine Feder, doch selbst der stärkste Mensch kann es nicht länger als ein paar Minuten festhalten. Was ist es?",
    answer: "Der Atem",
    explanation: "Man kann die Luft anhalten, aber irgendwann muss man wieder atmen.",
  },
  {
    prompt:
      "Zwei Väter und zwei Söhne gehen angeln und fangen zusammen genau drei Fische. Jeder bekommt einen ganzen Fisch ab. Wie ist das möglich?",
    answer: "Es sind nur drei Personen: Großvater, Vater und Sohn",
    explanation:
      "Der Großvater ist Vater, der Vater ist gleichzeitig Sohn — macht „zwei Väter und zwei Söhne“, aber nur drei Personen.",
  },
  {
    prompt: "Welches Wort steht in jedem Wörterbuch immer an der falschen Stelle?",
    answer: "Das Wort „falsch“",
    explanation:
      "Ein Sprachspiel: Egal wo „falsch“ im Wörterbuch steht — durch seine Bedeutung wirkt jede Position wie ein kleiner Widerspruch.",
  },
  {
    prompt:
      "Ich habe Städte, aber keine Häuser. Ich habe Wälder, aber keine Bäume. Ich habe Flüsse, aber kein Wasser. Was bin ich?",
    answer: "Eine Landkarte",
    explanation: "Eine Karte zeigt all das nur als Symbole und Linien, nicht als echte Dinge.",
  },
];

function dayNumber(date: Date): number {
  return Math.floor(date.getTime() / 86_400_000);
}

export function getDailyQuizSet(date: Date = new Date()): DailyQuizSet {
  return dailyQuizSets[dayNumber(date) % dailyQuizSets.length];
}

export function getDailyRiddle(date: Date = new Date()): DailyRiddle {
  return dailyRiddles[dayNumber(date) % dailyRiddles.length];
}
