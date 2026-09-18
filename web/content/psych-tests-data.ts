/**
 * Inhalte für die 24 neuen Selbsttests (siehe content/psychTests.ts für das
 * Datenmodell). Jeder Test hat 3 Ergebnistypen -- der mit den meisten
 * Treffern gewinnt (gleiche Logik wie content/beziehungstyp.ts). Länge
 * variiert bewusst: kurz (6 Fragen), mittel (9), lang (16, für die "große
 * Tiefenauswertung"-Tests).
 */

import type { PsychTestDefinition } from "./psychTests";

// Rotierende Gradient-Palette, 8 Farbpaare -- pro Test werden 3 davon
// verwendet, damit die drei Ergebnistypen sich optisch unterscheiden.
const G1 = "from-[hsl(340,80%,60%)] to-[hsl(340,80%,48%)]";
const G2 = "from-[hsl(210,70%,55%)] to-[hsl(210,70%,42%)]";
const G3 = "from-[hsl(160,60%,48%)] to-[hsl(160,60%,36%)]";
const G4 = "from-[hsl(38,90%,58%)] to-[hsl(28,90%,50%)]";
const G5 = "from-[hsl(260,60%,58%)] to-[hsl(260,60%,46%)]";
const G6 = "from-[hsl(28,90%,58%)] to-[hsl(12,85%,52%)]";
const G7 = "from-[hsl(190,70%,50%)] to-[hsl(190,70%,38%)]";
const G8 = "from-[hsl(50,85%,55%)] to-[hsl(40,85%,45%)]";

export const psychTestsData: PsychTestDefinition[] = [
  // ---------------------------------------------------------------------
  // 1. Kommunikationsstil (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "kommunikationsstil",
    title: "Dein Kommunikationsstil",
    teaser: "Wie drückst du dich in Beziehungen wirklich aus? Unterhaltsame Tendenz, keine Diagnose.",
    emoji: "💭",
    estMinutes: 4,
    resultTypes: [
      {
        id: "direkt",
        title: "Klartext-Sprecher:in",
        emoji: "🎯",
        gradientClass: G1,
        description: "Du sagst, was Sache ist -- klar, direkt, ohne lange Umwege.",
        strengths: "Deine Direktheit schafft Klarheit -- niemand muss raten, woran er bei dir ist.",
        watchOut: "Was für dich sachlich ist, kann bei anderen schon mal hart ankommen -- ein weicherer Einstieg hilft oft.",
        tip: "Versuch vor der klaren Aussage kurz zu benennen, wie du dich dabei fühlst -- das nimmt Schärfe raus.",
      },
      {
        id: "diplomatisch",
        title: "Diplomat:in",
        emoji: "🤝",
        gradientClass: G2,
        description: "Du wählst deine Worte mit Bedacht und suchst fast immer den vermittelnden Ton.",
        strengths: "Du schaffst es, schwierige Themen anzusprechen, ohne dass sich jemand angegriffen fühlt.",
        watchOut: "Manchmal wird deine Botschaft so weich verpackt, dass sie gar nicht mehr ankommt.",
        tip: "Trau dich, bei wichtigen Punkten einen Satz lang ganz direkt zu werden -- das unterstreicht, was zählt.",
      },
      {
        id: "zurueckhaltend",
        title: "Stille Beobachter:in",
        emoji: "🌊",
        gradientClass: G3,
        description: "Du beobachtest erst, denkst nach und sprichst erst, wenn du wirklich etwas zu sagen hast.",
        strengths: "Wenn du sprichst, hat es Gewicht -- andere wissen, dass es dir wirklich wichtig ist.",
        watchOut: "Dein Schweigen wird von anderen manchmal als Desinteresse oder Zustimmung missverstanden.",
        tip: "Ein kurzes 'Ich brauch noch einen Moment' reicht oft, damit dein Schweigen richtig verstanden wird.",
      },
    ],
    questions: [
      {
        question: "Ein Kollege macht wiederholt denselben Fehler. Was tust du?",
        options: [
          { text: "Ich spreche es sofort direkt an", type: "direkt" },
          { text: "Ich formuliere es vorsichtig als Vorschlag", type: "diplomatisch" },
          { text: "Ich warte ab, ob es sich wiederholt", type: "zurueckhaltend" },
          { text: "Ich packe es in einen sanften Hinweis, ohne anzugreifen", type: "diplomatisch" },
        ],
      },
      {
        question: "In einer Diskussion mit gegensätzlichen Meinungen bist du eher...",
        options: [
          { text: "...der/die, der/die klar Position bezieht", type: "direkt" },
          { text: "...der/die, der/die versucht zu vermitteln", type: "diplomatisch" },
          { text: "...der/die, der/die erstmal zuhört", type: "zurueckhaltend" },
          { text: "...der/die, der/die nach einem Mittelweg sucht", type: "diplomatisch" },
        ],
      },
      {
        question: "Du bist mit einer Entscheidung deiner Partnerin/deines Partners unzufrieden.",
        options: [
          { text: "Ich sage sofort, was mich stört", type: "direkt" },
          { text: "Ich bringe es behutsam im richtigen Moment an", type: "diplomatisch" },
          { text: "Ich brauche erst Zeit, bevor ich reden kann", type: "zurueckhaltend" },
          { text: "Ich warte den passenden Moment ab und sag es sanft", type: "diplomatisch" },
        ],
      },
      {
        question: "Wie reagierst du auf Kritik an dir?",
        options: [
          { text: "Ich widerspreche sofort, wenn ich anderer Meinung bin", type: "direkt" },
          { text: "Ich bedanke mich erstmal und denke dann nach", type: "diplomatisch" },
          { text: "Ich ziehe mich zurück und verarbeite es für mich", type: "zurueckhaltend" },
          { text: "Ich nehme es ruhig auf und frage höflich nach", type: "diplomatisch" },
        ],
      },
      {
        question: "In einer Gruppen-Chat-Diskussion...",
        options: [
          { text: "...schreibe ich klar, was ich denke", type: "direkt" },
          { text: "...formuliere ich vorsichtig, um niemanden zu verletzen", type: "diplomatisch" },
          { text: "...lese ich meist nur mit", type: "zurueckhaltend" },
          { text: "...wähle ich meine Worte besonders behutsam", type: "diplomatisch" },
        ],
      },
      {
        question: "Ein Freund bittet dich um ehrliches Feedback zu seinem Plan.",
        options: [
          { text: "Ich sage klipp und klar, was ich denke", type: "direkt" },
          { text: "Ich packe die Kritik zwischen positive Punkte", type: "diplomatisch" },
          { text: "Ich stelle lieber Fragen, statt zu bewerten", type: "zurueckhaltend" },
          { text: "Ich formuliere es als freundlichen Verbesserungsvorschlag", type: "diplomatisch" },
        ],
      },
      {
        question: "Wenn du wütend bist, merkt man das...",
        options: [
          { text: "...sofort, ich sage es klar", type: "direkt" },
          { text: "...an einem betont ruhigen, kontrollierten Ton", type: "diplomatisch" },
          { text: "...kaum, ich werde eher still", type: "zurueckhaltend" },
          { text: "...daran, dass ich besonders höflich werde", type: "diplomatisch" },
        ],
      },
      {
        question: "Bei einem wichtigen Gespräch bereitest du dich...",
        options: [
          { text: "...kaum vor, ich sage einfach, was ansteht", type: "direkt" },
          { text: "...vor, indem ich mir die richtigen Worte überlege", type: "diplomatisch" },
          { text: "...lange vor, am liebsten schriftlich", type: "zurueckhaltend" },
          { text: "...vor, indem ich mir eine sanfte Formulierung zurechtlege", type: "diplomatisch" },
        ],
      },
      {
        question: "Am Ende eines Streits ist dir am wichtigsten...",
        options: [
          { text: "...dass klar ist, woran wir sind", type: "direkt" },
          { text: "...dass sich niemand verletzt fühlt", type: "diplomatisch" },
          { text: "...dass ich Zeit hatte, es zu verarbeiten", type: "zurueckhaltend" },
          { text: "...dass der Ton freundlich bleibt", type: "diplomatisch" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 2. Eifersucht-Test (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "eifersucht-test",
    title: "Wie eifersüchtig bist du wirklich?",
    teaser: "Ein ehrlicher, unterhaltsamer Blick auf deine eifersüchtige Seite.",
    emoji: "👀",
    estMinutes: 2,
    resultTypes: [
      {
        id: "gelassen",
        title: "Der/die Gelassene",
        emoji: "😌",
        gradientClass: G4,
        description: "Eifersucht ist bei dir selten ein Thema -- du vertraust erstmal.",
        strengths: "Dein Vertrauensvorschuss macht Beziehungen für dich und andere entspannt.",
        watchOut: "Achte darauf, dass Gelassenheit nicht in Gleichgültigkeit gegenüber echten Warnsignalen kippt.",
        tip: "Sprich auch kleine, aufkommende Zweifel offen an, statt sie einfach wegzulächeln.",
      },
      {
        id: "situativ",
        title: "Situative:r Zweifler:in",
        emoji: "🌗",
        gradientClass: G5,
        description: "Meist entspannt -- aber bestimmte Situationen bringen dein Vertrauen kurz ins Wanken.",
        strengths: "Du merkst genau, wann etwas an deinem Selbstwert kratzt, statt es zu ignorieren.",
        watchOut: "Wiederkehrende Trigger-Situationen solltest du eher ansprechen als runterschlucken.",
        tip: "Frag dich bei aufkommender Eifersucht kurz: Geht es wirklich um die andere Person -- oder um mich?",
      },
      {
        id: "intensiv",
        title: "Der/die Wachsame",
        emoji: "🔥",
        gradientClass: G6,
        description: "Eifersucht ist bei dir ein ständiger Begleiter -- ein Gefühl, das schnell hochkocht.",
        strengths: "Deine Beziehungen sind dir extrem wichtig, das merken Partner:innen deutlich.",
        watchOut: "Zu viel Kontrolle kann genau das gefährden, was du eigentlich schützen willst.",
        tip: "Ein offenes Gespräch über deine Unsicherheiten wirkt oft mehr als jede Kontrollfrage.",
      },
    ],
    questions: [
      {
        question: "Dein Partner/deine Partnerin lacht viel mit jemand Neuem auf einer Party.",
        options: [
          { text: "Freut mich, schön wenn er/sie sich gut versteht", type: "gelassen" },
          { text: "Ich beobachte es kurz aus dem Augenwinkel", type: "situativ" },
          { text: "Ich gehe rüber und mische mich ein", type: "intensiv" },
          { text: "Ich frage mich kurz, ob da mehr dahintersteckt", type: "situativ" },
        ],
      },
      {
        question: "Das Handy deines Partners/deiner Partnerin vibriert ständig -- wie reagierst du?",
        options: [
          { text: "Gar nicht, ist nicht meine Sache", type: "gelassen" },
          { text: "Ich werde kurz neugierig, frage aber nicht nach", type: "situativ" },
          { text: "Ich frage direkt, wer da schreibt", type: "intensiv" },
          { text: "Ein kleiner Stich, aber ich lass es auf mich beruhen", type: "situativ" },
        ],
      },
      {
        question: "Ein:e Ex meldet sich bei deinem Partner/deiner Partnerin.",
        options: [
          { text: "Kein Problem, Vergangenheit ist Vergangenheit", type: "gelassen" },
          { text: "Ich frage höflich nach, worum es geht", type: "situativ" },
          { text: "Das beunruhigt mich richtig", type: "intensiv" },
          { text: "Ich werde etwas wachsamer, sag aber nichts", type: "situativ" },
        ],
      },
      {
        question: "Wie oft checkst du, wann dein Partner/deine Partnerin zuletzt online war?",
        options: [
          { text: "Nie, das interessiert mich nicht", type: "gelassen" },
          { text: "Ab und zu, eher zufällig", type: "situativ" },
          { text: "Regelmäßig, ich behalte es im Blick", type: "intensiv" },
          { text: "Nur wenn mir gerade danach ist", type: "situativ" },
        ],
      },
      {
        question: "Wie fühlt es sich für dich an, wenn dein Schatz allein verreist?",
        options: [
          { text: "Völlig entspannt, jede:r braucht mal Freiraum", type: "gelassen" },
          { text: "Ein kleines Kribbeln, aber im Griff", type: "situativ" },
          { text: "Ich mache mir viele Gedanken", type: "intensiv" },
          { text: "Ein kurzer Gedanke daran, mehr nicht", type: "situativ" },
        ],
      },
      {
        question: "Jemand flirtet offensichtlich mit deinem Partner/deiner Partnerin vor deinen Augen.",
        options: [
          { text: "Ich finde das eher amüsant als bedrohlich", type: "gelassen" },
          { text: "Ich beobachte, wie mein Schatz reagiert", type: "situativ" },
          { text: "Ich fühle mich sofort unwohl", type: "intensiv" },
          { text: "Ich werde etwas aufmerksamer, halte mich aber zurück", type: "situativ" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 3. Freundschaftstyp (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "freundschaftstyp",
    title: "Loyalist oder Freigeist?",
    teaser: "Dein Freundschaftstyp -- wie du Nähe und Freiheit unter Freund:innen balancierst.",
    emoji: "🫂",
    estMinutes: 4,
    resultTypes: [
      {
        id: "loyalist",
        title: "Der/die Loyalist:in",
        emoji: "🛡️",
        gradientClass: G7,
        description: "Deine engen Freundschaften halten ein Leben lang -- Verlässlichkeit ist dir heilig.",
        strengths: "Auf dich ist immer Verlass -- deine Freund:innen wissen das zu schätzen.",
        watchOut: "Achte darauf, dass Loyalität nicht dazu führt, dass du toxisches Verhalten zu lange tolerierst.",
        tip: "Investier auch mal Zeit in neue Bekanntschaften -- dein Kreis darf ruhig wachsen.",
      },
      {
        id: "freigeist",
        title: "Der/die Freigeist",
        emoji: "🦋",
        gradientClass: G8,
        description: "Du sammelst gerne viele lockere Kontakte und liebst neue Bekanntschaften.",
        strengths: "Du bringst frischen Wind und neue Perspektiven in jede Freundesgruppe.",
        watchOut: "Ein paar tiefe Freundschaften brauchen mehr regelmäßige Pflege, als du ihnen vielleicht gibst.",
        tip: "Reserviere dir bewusst feste Zeit für deine engsten Freund:innen, auch wenn Neues lockt.",
      },
      {
        id: "ausgleicher",
        title: "Der/die Ausgleicher:in",
        emoji: "⚖️",
        gradientClass: G1,
        description: "Du hältst eine gesunde Balance zwischen engem Kreis und offenem Netzwerk.",
        strengths: "Du passt deinen Freundschaftsstil flexibel an jede Situation an -- das macht dich vielseitig.",
        watchOut: "Manchmal fehlt dadurch die ganz tiefe Verbindung, die enge Freundschaften brauchen.",
        tip: "Wähle bewusst ein, zwei Freundschaften aus, die du gezielt vertiefen willst.",
      },
    ],
    questions: [
      {
        question: "Wie viele wirklich enge Freund:innen hast du?",
        options: [
          { text: "Wenige, aber die kenne ich schon ewig", type: "loyalist" },
          { text: "Viele, ich lerne ständig neue Leute kennen", type: "freigeist" },
          { text: "Einen festen Kern plus wechselnde Bekannte", type: "ausgleicher" },
          { text: "Ein paar enge, dazu viele lockere Bekanntschaften", type: "ausgleicher" },
        ],
      },
      {
        question: "Ein Umzug in eine neue Stadt steht an. Was denkst du zuerst?",
        options: [
          { text: "Wie halte ich Kontakt zu meinen alten Freund:innen?", type: "loyalist" },
          { text: "Endlich neue Leute kennenlernen!", type: "freigeist" },
          { text: "Beides -- alte Kontakte pflegen und neue finden", type: "ausgleicher" },
          { text: "Beides gleichzeitig, ich will nichts verlieren", type: "ausgleicher" },
        ],
      },
      {
        question: "Auf einer Party kennst du niemanden außer dem/der Gastgeber:in.",
        options: [
          { text: "Ich bleibe erstmal in seiner/ihrer Nähe", type: "loyalist" },
          { text: "Ich mische mich sofort unter die Gäste", type: "freigeist" },
          { text: "Ich beobachte kurz, dann suche ich Anschluss", type: "ausgleicher" },
          { text: "Ich halte mich erst zurück und taue dann auf", type: "ausgleicher" },
        ],
      },
      {
        question: "Ein alter Schulfreund meldet sich nach Jahren wieder.",
        options: [
          { text: "Als wäre keine Zeit vergangen", type: "loyalist" },
          { text: "Nett, aber wir haben uns wohl auseinandergelebt", type: "freigeist" },
          { text: "Kommt drauf an, wie gut wir uns verstanden haben", type: "ausgleicher" },
          { text: "Ich geb der Sache eine faire Chance, mal sehen", type: "ausgleicher" },
        ],
      },
      {
        question: "Wie oft triffst du dich mit deinem engsten Freundeskreis?",
        options: [
          { text: "Regelmäßig, das ist mir wichtig", type: "loyalist" },
          { text: "Unregelmäßig, dafür mit wechselnden Leuten", type: "freigeist" },
          { text: "Je nachdem, wie es gerade passt", type: "ausgleicher" },
          { text: "Unterschiedlich, ganz nach Lebensphase", type: "ausgleicher" },
        ],
      },
      {
        question: "Ein Freund enttäuscht dich schwer. Was passiert mit der Freundschaft?",
        options: [
          { text: "Ich gebe ihr eine echte zweite Chance", type: "loyalist" },
          { text: "Ich lasse sie eher einschlafen", type: "freigeist" },
          { text: "Ich spreche es an und schaue weiter", type: "ausgleicher" },
          { text: "Ich kläre es und entscheide dann von Fall zu Fall", type: "ausgleicher" },
        ],
      },
      {
        question: "Bei Freundschaften im Internet/über Social Media bist du...",
        options: [
          { text: "...eher zurückhaltend, echte Nähe braucht Zeit", type: "loyalist" },
          { text: "...total offen, viele meiner Kontakte kamen so zustande", type: "freigeist" },
          { text: "...offen, aber selektiv, wen ich vertiefe", type: "ausgleicher" },
          { text: "...offen für neue Kontakte, aber wählerisch bei echter Nähe", type: "ausgleicher" },
        ],
      },
      {
        question: "Ein Wochenende steht frei zur Verfügung. Womit verbringst du es liebsten?",
        options: [
          { text: "Mit meinem engsten Kreis, ganz vertraut", type: "loyalist" },
          { text: "Auf Events, wo ich neue Leute treffe", type: "freigeist" },
          { text: "Eine Mischung aus beidem", type: "ausgleicher" },
          { text: "Etwas von beidem, ganz nach Laune", type: "ausgleicher" },
        ],
      },
      {
        question: "Was schätzt du an Freundschaften am meisten?",
        options: [
          { text: "Verlässlichkeit über die Jahre", type: "loyalist" },
          { text: "Frische Impulse und neue Sichtweisen", type: "freigeist" },
          { text: "Eine gute Balance aus beidem", type: "ausgleicher" },
          { text: "Die richtige Mischung aus Nähe und Freiraum", type: "ausgleicher" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 4. Persönlichkeitstyp (lang, 16 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "persoenlichkeitstyp",
    title: "Welcher Persönlichkeitstyp bist du?",
    teaser: "Die große Tiefenauswertung deiner Persönlichkeit -- ausführlich und ehrlich.",
    emoji: "🧭",
    estMinutes: 7,
    resultTypes: [
      {
        id: "analytiker",
        title: "Der/die Analytiker:in",
        emoji: "🔬",
        gradientClass: G2,
        description: "Du denkst strukturiert, hinterfragst gerne und triffst Entscheidungen faktenbasiert.",
        strengths: "Deine klare, logische Denkweise macht dich zur verlässlichen Problemlöser:in im Umfeld.",
        watchOut: "Zu viel Analyse kann Entscheidungen unnötig verzögern -- manchmal reicht 'gut genug'.",
        tip: "Setz dir bei wichtigen Entscheidungen bewusst eine Deadline für die Analysephase.",
      },
      {
        id: "harmoniser",
        title: "Der/die Harmonisierer:in",
        emoji: "🕊️",
        gradientClass: G3,
        description: "Zwischenmenschliche Beziehungen und ein gutes Klima sind dir wichtiger als Recht haben.",
        strengths: "Du sorgst dafür, dass sich Menschen um dich herum verstanden und wohl fühlen.",
        watchOut: "Deine eigenen Bedürfnisse geraten dabei manchmal zu kurz -- das solltest du im Blick behalten.",
        tip: "Übe dich darin, auch unbequeme eigene Wünsche klar und ohne Schuldgefühl zu äußern.",
      },
      {
        id: "macher",
        title: "Der/die Macher:in",
        emoji: "🚀",
        gradientClass: G6,
        description: "Du packst an, entscheidest schnell und bringst Dinge lieber ins Rollen als sie zu planen.",
        strengths: "Deine Tatkraft bringt Projekte voran, wo andere noch diskutieren.",
        watchOut: "Manchmal wäre etwas mehr Geduld beim Zuhören hilfreich, bevor du loslegst.",
        tip: "Bau dir bewusst kurze Denkpausen vor großen Entscheidungen ein -- Tempo bleibt trotzdem erhalten.",
      },
    ],
    questions: [
      {
        question: "Vor einer wichtigen Entscheidung...",
        options: [
          { text: "...sammle ich alle Fakten und wäge ab", type: "analytiker" },
          { text: "...frage ich, wie sich alle Beteiligten fühlen", type: "harmoniser" },
          { text: "...entscheide ich schnell aus dem Bauch heraus", type: "macher" },
          { text: "...hole ich mir die Meinung der anderen ein", type: "harmoniser" },
        ],
      },
      {
        question: "In einer Gruppenarbeit übernimmst du am liebsten...",
        options: [
          { text: "...die Analyse und Struktur", type: "analytiker" },
          { text: "...die Vermittlung zwischen unterschiedlichen Meinungen", type: "harmoniser" },
          { text: "...die Führung und den Antrieb", type: "macher" },
          { text: "...dafür zu sorgen, dass alle gut zusammenarbeiten", type: "harmoniser" },
        ],
      },
      {
        question: "Ein Streit bahnt sich in deinem Umfeld an.",
        options: [
          { text: "Ich analysiere erst, worum es eigentlich geht", type: "analytiker" },
          { text: "Ich versuche sofort zu schlichten", type: "harmoniser" },
          { text: "Ich sage klar meine Meinung und handle danach", type: "macher" },
          { text: "Mir ist wichtig, dass sich wieder alle vertragen", type: "harmoniser" },
        ],
      },
      {
        question: "Was frustriert dich am meisten bei anderen?",
        options: [
          { text: "Unlogisches, widersprüchliches Verhalten", type: "analytiker" },
          { text: "Unnötige Konflikte und Streit", type: "harmoniser" },
          { text: "Zögern und endlose Diskussionen ohne Ergebnis", type: "macher" },
          { text: "Wenn nichts vorangeht und alles im Kreis läuft", type: "macher" },
        ],
      },
      {
        question: "Dein idealer freier Tag sieht aus wie...",
        options: [
          { text: "...ein spannendes Buch oder Rätsel lösen", type: "analytiker" },
          { text: "...Zeit mit geliebten Menschen verbringen", type: "harmoniser" },
          { text: "...ein Projekt endlich fertigstellen", type: "macher" },
          { text: "...für die Menschen da sein, die mir wichtig sind", type: "harmoniser" },
        ],
      },
      {
        question: "Wie gehst du mit Fehlern von anderen um?",
        options: [
          { text: "Ich erkläre sachlich, was schiefgelaufen ist", type: "analytiker" },
          { text: "Ich versuche, es einfühlsam anzusprechen", type: "harmoniser" },
          { text: "Ich sage es direkt und schaue nach vorn", type: "macher" },
          { text: "Ich benenne es kurz und mache gleich weiter", type: "macher" },
        ],
      },
      {
        question: "In einem neuen Projekt interessiert dich zuerst...",
        options: [
          { text: "...die Datenlage und der Plan dahinter", type: "analytiker" },
          { text: "...wer alles beteiligt ist", type: "harmoniser" },
          { text: "...wann es endlich losgeht", type: "macher" },
          { text: "...wie gut das Team zusammenpasst", type: "harmoniser" },
        ],
      },
      {
        question: "Deine Freund:innen würden dich beschreiben als...",
        options: [
          { text: "...durchdacht und besonnen", type: "analytiker" },
          { text: "...warmherzig und ausgleichend", type: "harmoniser" },
          { text: "...tatkräftig und entschlossen", type: "macher" },
          { text: "...einfühlsam und verständnisvoll", type: "harmoniser" },
        ],
      },
      {
        question: "Wie reagierst du auf spontane Planänderungen?",
        options: [
          { text: "Ich brauche kurz, um neu zu kalkulieren", type: "analytiker" },
          { text: "Ich passe mich an, Hauptsache alle sind zufrieden", type: "harmoniser" },
          { text: "Kein Problem, ich improvisiere einfach", type: "macher" },
          { text: "Ich sorge dafür, dass niemand zu kurz kommt", type: "harmoniser" },
        ],
      },
      {
        question: "Bei der Arbeit motiviert dich am meisten...",
        options: [
          { text: "...knifflige Probleme zu lösen", type: "analytiker" },
          { text: "...ein gutes Team-Gefühl", type: "harmoniser" },
          { text: "...sichtbare Ergebnisse und Fortschritt", type: "macher" },
          { text: "...spürbar voranzukommen", type: "macher" },
        ],
      },
      {
        question: "Wie planst du einen Urlaub?",
        options: [
          { text: "Detailliert, mit Vergleichen und Recherche", type: "analytiker" },
          { text: "Gemeinsam, jede Meinung zählt", type: "harmoniser" },
          { text: "Grob, den Rest klären wir vor Ort", type: "macher" },
          { text: "Im Austausch mit allen, damit sich niemand übergangen fühlt", type: "harmoniser" },
        ],
      },
      {
        question: "Ein Vorschlag von dir wird kritisiert.",
        options: [
          { text: "Ich will genau verstehen, warum", type: "analytiker" },
          { text: "Ich nehme es mir erstmal zu Herzen", type: "harmoniser" },
          { text: "Ich überlege kurz und mache dann weiter", type: "macher" },
          { text: "Es beschäftigt mich, auch wenn ich nichts sage", type: "harmoniser" },
        ],
      },
      {
        question: "Was beschreibt deinen Arbeitsstil am besten?",
        options: [
          { text: "Gründlich und methodisch", type: "analytiker" },
          { text: "Kooperativ und rücksichtsvoll", type: "harmoniser" },
          { text: "Schnell und ergebnisorientiert", type: "macher" },
          { text: "Zügig und auf das Ergebnis fokussiert", type: "macher" },
        ],
      },
      {
        question: "In einer Krise bist du eher...",
        options: [
          { text: "...der/die, der/die einen Plan macht", type: "analytiker" },
          { text: "...der/die, der/die beruhigt und zusammenhält", type: "harmoniser" },
          { text: "...der/die, der/die sofort handelt", type: "macher" },
          { text: "...der/die, der/die als Erste:r loslegt", type: "macher" },
        ],
      },
      {
        question: "Was ist dir bei einer Entscheidung am wichtigsten?",
        options: [
          { text: "Dass sie logisch nachvollziehbar ist", type: "analytiker" },
          { text: "Dass niemand dabei vor den Kopf gestoßen wird", type: "harmoniser" },
          { text: "Dass sie schnell umsetzbar ist", type: "macher" },
          { text: "Dass die Stimmung dabei nicht leidet", type: "harmoniser" },
        ],
      },
      {
        question: "Am Ende eines langen Tages fühlst du dich am meisten erfüllt, wenn...",
        options: [
          { text: "...du etwas Kompliziertes verstanden hast", type: "analytiker" },
          { text: "...alle um dich herum glücklich waren", type: "harmoniser" },
          { text: "...du sichtbar etwas geschafft hast", type: "macher" },
          { text: "...du etwas konkret abhaken konntest", type: "macher" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 5. Optimist oder Realist (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "optimist-oder-realist",
    title: "Optimist oder Realist?",
    teaser: "Siehst du das Glas halb voll oder rechnest du lieber mit dem Schlimmsten?",
    emoji: "🌤️",
    estMinutes: 2,
    resultTypes: [
      {
        id: "optimist",
        title: "Der/die Optimist:in",
        emoji: "☀️",
        gradientClass: G4,
        description: "Du siehst in fast jeder Situation zuerst die Chance, nicht das Risiko.",
        strengths: "Deine positive Grundhaltung steckt andere an und macht dich zur Motivations-Quelle.",
        watchOut: "Manche Risiken solltest du bewusster einplanen, statt sie zu übersehen.",
        tip: "Ergänze deinen Optimismus um einen kurzen 'Was wäre, wenn nicht'-Check vor großen Schritten.",
      },
      {
        id: "realist",
        title: "Der/die Realist:in",
        emoji: "⚖️",
        gradientClass: G7,
        description: "Du wägst Chancen und Risiken nüchtern ab, ohne dich von Emotionen leiten zu lassen.",
        strengths: "Deine Einschätzungen sind meist erstaunlich treffend -- andere fragen dich um Rat.",
        watchOut: "Zu viel Nüchternheit kann Begeisterung im Keim ersticken -- lass auch mal Raum für Träume.",
        tip: "Erlaube dir bewusst einen optimistischen Blick, bevor du in die nüchterne Analyse gehst.",
      },
      {
        id: "pessimist",
        title: "Der/die Vorsichtige",
        emoji: "🌧️",
        gradientClass: G2,
        description: "Du denkst zuerst an das, was schiefgehen könnte -- lieber vorbereitet als überrascht.",
        strengths: "Du bist selten von negativen Überraschungen kalt erwischt, weil du früh vorsorgst.",
        watchOut: "Achte darauf, dass die Sorge vor dem Scheitern dich nicht vom Handeln abhält.",
        tip: "Frag dich bei jedem Bedenken: Was würde ich einem Freund in dieser Situation raten?",
      },
    ],
    questions: [
      {
        question: "Ein neues Projekt startet -- dein erster Gedanke?",
        options: [
          { text: "Das wird super!", type: "optimist" },
          { text: "Mal sehen, was realistisch machbar ist", type: "realist" },
          { text: "Was könnte alles schiefgehen?", type: "pessimist" },
          { text: "Ich schau mir erstmal die Rahmenbedingungen an", type: "realist" },
        ],
      },
      {
        question: "Der Wetterbericht sagt Regen für dein geplantes Picknick voraus.",
        options: [
          { text: "Wird schon nicht so schlimm", type: "optimist" },
          { text: "Ich schau nochmal später nach, ob es sich ändert", type: "realist" },
          { text: "Ich sage lieber gleich ab", type: "pessimist" },
          { text: "Ich behalte die Vorhersage im Auge und entscheide kurzfristig", type: "realist" },
        ],
      },
      {
        question: "Ein Bewerbungsgespräch steht an.",
        options: [
          { text: "Ich freue mich schon auf den Job", type: "optimist" },
          { text: "Ich bereite mich gut vor und bin gespannt", type: "realist" },
          { text: "Ich rechne eher nicht damit, dass es klappt", type: "pessimist" },
          { text: "Ich wäge meine Chancen realistisch ab", type: "realist" },
        ],
      },
      {
        question: "Ein Freund erzählt von einem riskanten Business-Plan.",
        options: [
          { text: "Klingt spannend, mach das!", type: "optimist" },
          { text: "Ich frage nach konkreten Zahlen und Plänen", type: "realist" },
          { text: "Ich warne eher vor den Risiken", type: "pessimist" },
          { text: "Ich will erst die Kalkulation dahinter sehen", type: "realist" },
        ],
      },
      {
        question: "Dein Zug hat Verspätung, ein wichtiger Termin rückt näher.",
        options: [
          { text: "Wird schon irgendwie klappen", type: "optimist" },
          { text: "Ich rechne aus, wie knapp es wird", type: "realist" },
          { text: "Ich gehe davon aus, dass ich es nicht schaffe", type: "pessimist" },
          { text: "Ich schätze nüchtern ein, ob es noch reicht", type: "realist" },
        ],
      },
      {
        question: "Rückblick auf ein schwieriges Jahr -- was überwiegt?",
        options: [
          { text: "Die vielen guten Momente dazwischen", type: "optimist" },
          { text: "Eine nüchterne Bilanz aus gut und schlecht", type: "realist" },
          { text: "Vor allem das, was schiefgelaufen ist", type: "pessimist" },
          { text: "Ein sachlicher Blick auf das, was wirklich war", type: "realist" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 6. Stress-Typ (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "stress-typ",
    title: "Wie tickst du unter Stress?",
    teaser: "Kampf, Flucht oder cool bleiben -- dein Verhalten, wenn's eng wird.",
    emoji: "🌪️",
    estMinutes: 4,
    resultTypes: [
      {
        id: "kampf",
        title: "Der/die Kämpfer:in",
        emoji: "🥊",
        gradientClass: G6,
        description: "Stress aktiviert dich -- du gehst Probleme sofort und energisch an.",
        strengths: "Unter Druck läufst du zur Höchstform auf und packst Dinge direkt an.",
        watchOut: "Achte darauf, im Kampfmodus nicht über die Bedürfnisse anderer hinwegzugehen.",
        tip: "Ein tiefer Atemzug vor dem Losstürmen hilft, die Energie gezielter einzusetzen.",
      },
      {
        id: "flucht",
        title: "Der/die Vermeider:in",
        emoji: "🏃",
        gradientClass: G5,
        description: "Bei Stress ziehst du dich am liebsten zurück und schaffst dir erstmal Abstand.",
        strengths: "Deine Fähigkeit, dich rauszuziehen, schützt dich vor Überforderung und Kurzschlussreaktionen.",
        watchOut: "Zu langes Vermeiden lässt Probleme oft größer werden, statt sie zu lösen.",
        tip: "Setz dir eine kleine Deadline, wann du dich dem Thema nach der Pause wieder stellst.",
      },
      {
        id: "cool",
        title: "Der/die Gelassene",
        emoji: "🧊",
        gradientClass: G7,
        description: "Du bleibst auch unter Druck erstaunlich ruhig und denkst strukturiert weiter.",
        strengths: "Deine Ruhe steckt andere an und macht dich zur Stütze in hektischen Momenten.",
        watchOut: "Von außen wirkt deine Gelassenheit manchmal wie Desinteresse -- zeig ruhig auch mal Anteilnahme.",
        tip: "Sag anderen offen, dass dir die Situation nicht egal ist, auch wenn du ruhig bleibst.",
      },
    ],
    questions: [
      {
        question: "Eine wichtige Deadline rückt bedrohlich näher.",
        options: [
          { text: "Ich lege sofort los, mit voller Energie", type: "kampf" },
          { text: "Ich schiebe es noch ein bisschen vor mir her", type: "flucht" },
          { text: "Ich mache einen Plan und arbeite ihn ab", type: "cool" },
          { text: "Ich bleibe ruhig und gehe es strukturiert an", type: "cool" },
        ],
      },
      {
        question: "Ein Konflikt bahnt sich im Büro an.",
        options: [
          { text: "Ich spreche es sofort direkt an", type: "kampf" },
          { text: "Ich gehe ihm lieber aus dem Weg", type: "flucht" },
          { text: "Ich beobachte erstmal, bevor ich reagiere", type: "cool" },
          { text: "Ich lasse mir erst die Fakten geben, bevor ich handle", type: "cool" },
        ],
      },
      {
        question: "Technik streikt kurz vor einer wichtigen Präsentation.",
        options: [
          { text: "Ich versuche fieberhaft, es sofort zu reparieren", type: "kampf" },
          { text: "Ich brauche einen Moment, um mich zu sammeln", type: "flucht" },
          { text: "Ich improvisiere ruhig und mache trotzdem weiter", type: "cool" },
          { text: "Ich bleibe gelassen und such eine pragmatische Lösung", type: "cool" },
        ],
      },
      {
        question: "Zu viele Aufgaben gleichzeitig -- wie fühlt sich das an?",
        options: [
          { text: "Ich stürze mich rein und arbeite alles ab", type: "kampf" },
          { text: "Ich fühle mich überfordert und mache erstmal Pause", type: "flucht" },
          { text: "Ich priorisiere ruhig und arbeite Schritt für Schritt", type: "cool" },
          { text: "Ich sortiere in Ruhe, was zuerst dran ist", type: "cool" },
        ],
      },
      {
        question: "Eine schlechte Nachricht erreicht dich unerwartet.",
        options: [
          { text: "Ich will sofort handeln und etwas unternehmen", type: "kampf" },
          { text: "Ich muss erstmal allein sein damit", type: "flucht" },
          { text: "Ich denke erst in Ruhe darüber nach", type: "cool" },
          { text: "Ich lass es erstmal sacken, bevor ich reagiere", type: "cool" },
        ],
      },
      {
        question: "Im Stau, und ein wichtiger Termin wird knapp.",
        options: [
          { text: "Ich werde ungeduldig und suche nach Alternativen", type: "kampf" },
          { text: "Ich schalte innerlich ab und ertrage es", type: "flucht" },
          { text: "Ich rufe an und informiere entspannt über die Verspätung", type: "cool" },
          { text: "Ich bleibe gelassen und sag kurz Bescheid", type: "cool" },
        ],
      },
      {
        question: "Ein lauter Streit bricht in deiner Nähe aus.",
        options: [
          { text: "Ich mische mich ein, um zu schlichten", type: "kampf" },
          { text: "Ich verlasse lieber den Raum", type: "flucht" },
          { text: "Ich beobachte ruhig, bevor ich reagiere", type: "cool" },
          { text: "Ich behalte einen kühlen Kopf und schau erstmal zu", type: "cool" },
        ],
      },
      {
        question: "Dein Körper reagiert auf Stress am ehesten mit...",
        options: [
          { text: "...Anspannung und dem Drang, aktiv zu werden", type: "kampf" },
          { text: "...dem Bedürfnis, mich zurückzuziehen", type: "flucht" },
          { text: "...eher wenig, ich bleibe meist ruhig", type: "cool" },
          { text: "...kaum etwas, ich wirke meist gefasst", type: "cool" },
        ],
      },
      {
        question: "Nach einer stressigen Woche brauchst du am meisten...",
        options: [
          { text: "...eine körperliche Aktivität, um Druck abzubauen", type: "kampf" },
          { text: "...komplette Ruhe und Alleinsein", type: "flucht" },
          { text: "...einen strukturierten Rückblick, was gut lief", type: "cool" },
          { text: "...eine ruhige Analyse, was ich mitnehmen kann", type: "cool" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 7. Introvertiert oder Extrovertiert (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "introvertiert-oder-extrovertiert",
    title: "Introvertiert oder Extrovertiert?",
    teaser: "Dein Energie-Typ -- tankst du beim Alleinsein auf oder unter Menschen?",
    emoji: "🔋",
    estMinutes: 4,
    resultTypes: [
      {
        id: "introvertiert",
        title: "Der/die Introvertierte",
        emoji: "📚",
        gradientClass: G5,
        description: "Du tankst deine Energie vor allem in Ruhe und im kleinen, vertrauten Kreis auf.",
        strengths: "Deine tiefe Konzentrationsfähigkeit und dein reiches Innenleben sind echte Stärken.",
        watchOut: "Zu viel Rückzug kann dazu führen, dass wertvolle Kontakte einschlafen.",
        tip: "Plane bewusst kleine soziale Dosen ein -- ein kurzes Treffen reicht oft schon.",
      },
      {
        id: "extrovertiert",
        title: "Der/die Extrovertierte",
        emoji: "🎉",
        gradientClass: G4,
        description: "Unter Menschen läufst du auf, Gesellschaft gibt dir Energie statt sie zu rauben.",
        strengths: "Deine offene, gesellige Art macht es anderen leicht, mit dir warm zu werden.",
        watchOut: "Zu viel Trubel ohne Pausen kann auch dich irgendwann auslaugen.",
        tip: "Plane auch bewusst stille Momente ein, selbst wenn dir danach nicht sofort ist.",
      },
      {
        id: "ambivert",
        title: "Der/die Ambivert:in",
        emoji: "🌓",
        gradientClass: G2,
        description: "Du bewegst dich flexibel zwischen beiden Welten, je nach Situation und Stimmung.",
        strengths: "Deine Anpassungsfähigkeit macht dich in fast jeder sozialen Situation wohlig.",
        watchOut: "Achte darauf, wirklich auf dein eigenes Bedürfnis zu hören -- nicht nur auf die Situation.",
        tip: "Beobachte über eine Woche, wann du wirklich Energie gewinnst -- das zeigt deine echte Balance.",
      },
    ],
    questions: [
      {
        question: "Nach einer langen, geselligen Feier fühlst du dich...",
        options: [
          { text: "...erschöpft, ich brauche jetzt Ruhe", type: "introvertiert" },
          { text: "...voller Energie, am liebsten geht's weiter", type: "extrovertiert" },
          { text: "...unterschiedlich, kommt auf den Abend an", type: "ambivert" },
          { text: "...meistens okay, aber es hängt vom Abend ab", type: "ambivert" },
        ],
      },
      {
        question: "Dein idealer Freitagabend?",
        options: [
          { text: "Ein ruhiger Abend allein oder zu zweit", type: "introvertiert" },
          { text: "Ausgehen mit vielen Leuten", type: "extrovertiert" },
          { text: "Je nach Wochenverlauf mal so, mal so", type: "ambivert" },
          { text: "Kommt ganz auf meine Energie an diesem Tag an", type: "ambivert" },
        ],
      },
      {
        question: "In einer Gruppe von Fremden fühlst du dich...",
        options: [
          { text: "...schnell überfordert, brauche Anlaufzeit", type: "introvertiert" },
          { text: "...schnell in meinem Element", type: "extrovertiert" },
          { text: "...wohl, wenn ich mich langsam eingewöhnen kann", type: "ambivert" },
          { text: "...zunehmend besser, je länger ich dabei bin", type: "ambivert" },
        ],
      },
      {
        question: "Wenn du nachdenkst, tust du das am liebsten...",
        options: [
          { text: "...allein und in Stille", type: "introvertiert" },
          { text: "...im Gespräch mit anderen", type: "extrovertiert" },
          { text: "...mal so, mal so, je nach Thema", type: "ambivert" },
          { text: "...unterschiedlich, je nachdem worum es geht", type: "ambivert" },
        ],
      },
      {
        question: "Ein spontaner Anruf von Freund:innen zum Treffen -- deine Reaktion?",
        options: [
          { text: "Eher zögerlich, ich hatte mir was anderes vorgenommen", type: "introvertiert" },
          { text: "Sofortige Zusage, klingt super!", type: "extrovertiert" },
          { text: "Kommt drauf an, wie mein Tag lief", type: "ambivert" },
          { text: "Hängt von meiner Stimmung in dem Moment ab", type: "ambivert" },
        ],
      },
      {
        question: "In Meetings/Diskussionen meldest du dich...",
        options: [
          { text: "...eher selten, ich beobachte erstmal", type: "introvertiert" },
          { text: "...oft und gerne als Erste:r", type: "extrovertiert" },
          { text: "...wenn ich wirklich was Wichtiges beizutragen habe", type: "ambivert" },
          { text: "...manchmal öfter, manchmal seltener, je nach Thema", type: "ambivert" },
        ],
      },
      {
        question: "Urlaub -- was reizt dich mehr?",
        options: [
          { text: "Ein ruhiger Rückzugsort, wenige Menschen", type: "introvertiert" },
          { text: "Ein Ort mit viel Trubel und Kontakten", type: "extrovertiert" },
          { text: "Beides in einer guten Mischung", type: "ambivert" },
          { text: "Etwas Ruhe und etwas Trubel, im Wechsel", type: "ambivert" },
        ],
      },
      {
        question: "Nach einem langen Arbeitstag mit vielen Meetings...",
        options: [
          { text: "...bin ich komplett erschöpft", type: "introvertiert" },
          { text: "...bin ich eher noch aufgedreht", type: "extrovertiert" },
          { text: "...brauche ich kurz Ruhe, dann geht's wieder", type: "ambivert" },
          { text: "...ist es unterschiedlich, mal erschöpft, mal noch wach", type: "ambivert" },
        ],
      },
      {
        question: "Deine Freund:innen würden sagen, du bist eher...",
        options: [
          { text: "...der/die ruhige Beobachter:in", type: "introvertiert" },
          { text: "...die Seele jeder Party", type: "extrovertiert" },
          { text: "...unterschiedlich, je nach Anlass", type: "ambivert" },
          { text: "...beides, je nachdem in welcher Stimmung ich bin", type: "ambivert" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 8. Empathie-Test (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "empathie-test",
    title: "Wie empathisch bist du wirklich?",
    teaser: "Wie gut fühlst du dich in andere hinein? Ein ehrlicher Selbsttest.",
    emoji: "💗",
    estMinutes: 4,
    resultTypes: [
      {
        id: "hochempathisch",
        title: "Der/die Mitfühlende",
        emoji: "💞",
        gradientClass: G1,
        description: "Du spürst die Gefühle anderer fast wie deine eigenen -- Empathie ist deine Stärke.",
        strengths: "Menschen fühlen sich bei dir sofort verstanden und aufgehoben.",
        watchOut: "Achte darauf, dich nicht in fremden Gefühlen zu verlieren -- Abgrenzung ist auch wichtig.",
        tip: "Übe dir bewusste 'Grenz-Sätze' ein, um nicht jede fremde Last zur eigenen zu machen.",
      },
      {
        id: "ausgewogen",
        title: "Der/die Ausgewogene",
        emoji: "🌤️",
        gradientClass: G3,
        description: "Du kannst dich gut in andere einfühlen, behältst dabei aber einen klaren eigenen Kopf.",
        strengths: "Deine Mischung aus Mitgefühl und Klarheit macht dich zur guten Ratgeber:in.",
        watchOut: "In hektischen Momenten übersiehst du manchmal feine emotionale Signale.",
        tip: "Frag bei Unsicherheit einfach direkt nach, statt zu vermuten, wie sich jemand fühlt.",
      },
      {
        id: "sachlich",
        title: "Der/die Sachliche",
        emoji: "🧩",
        gradientClass: G7,
        description: "Du gehst Situationen eher rational an -- Gefühle sind für dich zweitrangig zur Faktenlage.",
        strengths: "In emotionalen Situationen bewahrst du einen kühlen Kopf, den andere brauchen.",
        watchOut: "Menschen wünschen sich manchmal mehr sichtbares Mitgefühl von dir, als du zeigst.",
        tip: "Ein einfaches 'Das klingt schwer für dich' kann viel bewirken, auch ohne große Gefühlsschau.",
      },
    ],
    questions: [
      {
        question: "Ein Freund erzählt dir von einem harten Verlust.",
        options: [
          { text: "Mir kommen fast selbst die Tränen", type: "hochempathisch" },
          { text: "Ich fühle mit, bleibe aber gefasst und höre zu", type: "ausgewogen" },
          { text: "Ich frage sachlich, was ich praktisch helfen kann", type: "sachlich" },
          { text: "Ich überlege direkt, was jetzt konkret zu tun ist", type: "sachlich" },
        ],
      },
      {
        question: "Du siehst eine traurige Szene in einem Film.",
        options: [
          { text: "Ich bin komplett mitgenommen", type: "hochempathisch" },
          { text: "Es berührt mich, aber ich bleibe im Film", type: "ausgewogen" },
          { text: "Ich beobachte es eher distanziert", type: "sachlich" },
          { text: "Ich nehme es eher als Geschichte wahr, ohne große Regung", type: "sachlich" },
        ],
      },
      {
        question: "Ein Kollege wirkt schlecht gelaunt, sagt aber nichts.",
        options: [
          { text: "Ich merke es sofort und spreche ihn an", type: "hochempathisch" },
          { text: "Ich bemerke es und frage vorsichtig nach", type: "ausgewogen" },
          { text: "Ich merke es erst, wenn er es sagt", type: "sachlich" },
          { text: "Sowas fällt mir eher selten von allein auf", type: "sachlich" },
        ],
      },
      {
        question: "In einem Streit zwischen zwei Freund:innen bist du...",
        options: [
          { text: "...emotional stark involviert und mittendrin", type: "hochempathisch" },
          { text: "...bemüht, beide Seiten zu verstehen", type: "ausgewogen" },
          { text: "...eher neutral und faktenorientiert", type: "sachlich" },
          { text: "...darauf bedacht, die Fakten zu klären", type: "sachlich" },
        ],
      },
      {
        question: "Nach einem emotionalen Gespräch fühlst du dich...",
        options: [
          { text: "...selbst emotional erschöpft", type: "hochempathisch" },
          { text: "...berührt, aber stabil", type: "ausgewogen" },
          { text: "...unverändert, es war ein normales Gespräch", type: "sachlich" },
          { text: "...eigentlich wie vorher, es hat mich kaum mitgenommen", type: "sachlich" },
        ],
      },
      {
        question: "Ein Fremder auf der Straße weint. Was tust du?",
        options: [
          { text: "Es berührt mich sofort, ich frage nach", type: "hochempathisch" },
          { text: "Ich überlege kurz, ob ich helfen kann", type: "ausgewogen" },
          { text: "Ich gehe eher unbeteiligt weiter", type: "sachlich" },
          { text: "Ich nehme es wahr, geh aber normal weiter", type: "sachlich" },
        ],
      },
      {
        question: "Beim Feedback-Geben an andere achtest du zuerst auf...",
        options: [
          { text: "...wie es bei der Person ankommen könnte", type: "hochempathisch" },
          { text: "...eine gute Balance aus Klarheit und Rücksicht", type: "ausgewogen" },
          { text: "...die sachliche Richtigkeit des Inhalts", type: "sachlich" },
          { text: "...ob das Gesagte inhaltlich stimmt", type: "sachlich" },
        ],
      },
      {
        question: "Wie oft fragst du andere aktiv, wie es ihnen geht?",
        options: [
          { text: "Sehr oft, es interessiert mich wirklich", type: "hochempathisch" },
          { text: "Regelmäßig, vor allem bei nahestehenden Menschen", type: "ausgewogen" },
          { text: "Eher selten, außer es liegt nahe", type: "sachlich" },
          { text: "Nicht besonders oft, es ergibt sich eher selten", type: "sachlich" },
        ],
      },
      {
        question: "Filme mit trauriger Musik im Hintergrund...",
        options: [
          { text: "...bringen mich sofort zum Weinen", type: "hochempathisch" },
          { text: "...berühren mich spürbar", type: "ausgewogen" },
          { text: "...beeindrucken mich eher wenig emotional", type: "sachlich" },
          { text: "...lassen mich meist eher unberührt", type: "sachlich" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 9. Chaos-Typ Haushalt (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "chaos-typ-haushalt",
    title: "Welcher Chaos-Typ bist du im Haushalt?",
    teaser: "Aufgeräumt, kreatives Chaos oder irgendwo dazwischen?",
    emoji: "🧹",
    estMinutes: 2,
    resultTypes: [
      {
        id: "ordentlich",
        title: "Der/die Ordnungsliebende",
        emoji: "✨",
        gradientClass: G3,
        description: "Alles hat seinen Platz -- Unordnung stresst dich schneller als andere.",
        strengths: "In deiner Wohnung findet jede:r sofort alles -- ein echter Vorteil im Alltag.",
        watchOut: "Achte darauf, dass Ordnung nicht zum Selbstzweck wird und Spontanität im Weg steht.",
        tip: "Gönn dir bewusst eine 'Chaos-Ecke', in der auch mal etwas liegen bleiben darf.",
      },
      {
        id: "kreativchaos",
        title: "Der/die kreative Chaot:in",
        emoji: "🎨",
        gradientClass: G8,
        description: "Dein System sieht chaotisch aus, funktioniert für dich aber erstaunlich gut.",
        strengths: "Du findest trotz scheinbarem Durcheinander erstaunlich schnell, was du suchst.",
        watchOut: "Für Besuch oder Mitbewohner:innen ist dein System manchmal schwer nachzuvollziehen.",
        tip: "Ein einziger fester Ordnungspunkt (z. B. Schlüssel, Post) erspart dir viel Sucherei.",
      },
      {
        id: "gemischt",
        title: "Der/die Situative",
        emoji: "🔀",
        gradientClass: G2,
        description: "Mal aufgeräumt, mal chaotisch -- ganz danach, wie viel gerade sonst los ist.",
        strengths: "Du passt deinen Ordnungssinn flexibel an, was gerade wirklich wichtig ist.",
        watchOut: "In stressigen Phasen kann das Chaos schneller überhandnehmen, als dir lieb ist.",
        tip: "Ein kurzes Aufräum-Ritual am Abend hält das Chaos auch in hektischen Wochen im Zaum.",
      },
    ],
    questions: [
      {
        question: "Dein Schreibtisch sieht aktuell aus wie...",
        options: [
          { text: "...aufgeräumt, alles an seinem Platz", type: "ordentlich" },
          { text: "...ein kreatives Durcheinander, aber ich finde alles", type: "kreativchaos" },
          { text: "...kommt drauf an, wie die Woche lief", type: "gemischt" },
          { text: "...unterschiedlich, je nachdem wie viel gerade los ist", type: "gemischt" },
        ],
      },
      {
        question: "Unerwarteter Besuch kündigt sich in 20 Minuten an.",
        options: [
          { text: "Kein Problem, es ist eh schon aufgeräumt", type: "ordentlich" },
          { text: "Ich schiebe alles schnell in eine Ecke", type: "kreativchaos" },
          { text: "Ich räume in Rekordzeit das Nötigste weg", type: "gemischt" },
          { text: "Ich schaff in Eile wenigstens das Gröbste weg", type: "gemischt" },
        ],
      },
      {
        question: "Wie oft räumst du deine Wohnung wirklich gründlich auf?",
        options: [
          { text: "Regelmäßig, das ist Routine für mich", type: "ordentlich" },
          { text: "Selten, nur wenn's wirklich nötig wird", type: "kreativchaos" },
          { text: "Phasenweise, mal mehr, mal weniger", type: "gemischt" },
          { text: "Es kommt in Wellen, mal öfter, mal seltener", type: "gemischt" },
        ],
      },
      {
        question: "Du suchst deine Schlüssel -- wie läuft das meistens?",
        options: [
          { text: "Sofort gefunden, fester Platz an der Tür", type: "ordentlich" },
          { text: "Dauert, aber ich weiß irgendwie, wo ungefähr", type: "kreativchaos" },
          { text: "Unterschiedlich, mal schnell, mal nervig", type: "gemischt" },
          { text: "Kommt drauf an, wie ordentlich die Woche war", type: "gemischt" },
        ],
      },
      {
        question: "Wäsche waschen und wegräumen bei dir...",
        options: [
          { text: "...passiert sofort, kein Wäscheberg in Sicht", type: "ordentlich" },
          { text: "...der 'saubere Wäscheberg' ist mein System", type: "kreativchaos" },
          { text: "...meistens zeitnah, manchmal stapelt es sich", type: "gemischt" },
          { text: "...meist okay, aber manchmal wird's doch ein Berg", type: "gemischt" },
        ],
      },
      {
        question: "Wie fühlt sich Unordnung um dich herum für dich an?",
        options: [
          { text: "Stressig, ich muss sie sofort beseitigen", type: "ordentlich" },
          { text: "Völlig normal, stört mich kaum", type: "kreativchaos" },
          { text: "Kommt auf mein Level an, manchmal nervt's", type: "gemischt" },
          { text: "Je nach Tag, an manchen stört's mich mehr", type: "gemischt" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 10. Morgenmensch oder Nachteule (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "morgenmensch-oder-nachteule",
    title: "Morgenmensch oder Nachteule?",
    teaser: "Dein natürlicher Rhythmus -- und wie sehr er gegen den Alltag ankämpft.",
    emoji: "🌙",
    estMinutes: 2,
    resultTypes: [
      {
        id: "morgenmensch",
        title: "Der/die Morgenmensch",
        emoji: "🌅",
        gradientClass: G4,
        description: "Früh aufstehen fällt dir leicht -- deine produktivsten Stunden liegen am Morgen.",
        strengths: "Du startest energiegeladen in den Tag, während andere noch aufwachen.",
        watchOut: "Abends bist du oft schon müde, wenn gesellschaftliche Termine erst losgehen.",
        tip: "Leg wichtige Aufgaben bewusst in deine frühen Stunden -- da bist du am stärksten.",
      },
      {
        id: "nachteule",
        title: "Die Nachteule",
        emoji: "🦉",
        gradientClass: G5,
        description: "Deine beste Zeit beginnt, wenn andere schon ans Schlafengehen denken.",
        strengths: "Abends bist du besonders kreativ und konzentriert -- eine echte Superkraft.",
        watchOut: "Frühe Termine sind eine echte Herausforderung für deinen Biorhythmus.",
        tip: "Leg wichtige kreative Aufgaben bewusst in deine Abendstunden, wenn möglich.",
      },
      {
        id: "flexibel",
        title: "Der/die Flexible",
        emoji: "🔄",
        gradientClass: G7,
        description: "Dein Rhythmus passt sich gut an -- weder ausgesprochene Lerche noch Eule.",
        strengths: "Du kannst dich an fast jeden Tagesablauf anpassen, ohne groß zu leiden.",
        watchOut: "Ohne klare Routine verlierst du leicht dein Gefühl für den besten Zeitpunkt für Wichtiges.",
        tip: "Beobachte eine Woche lang bewusst, wann du wirklich am produktivsten bist.",
      },
    ],
    questions: [
      {
        question: "Dein Wecker klingelt um 6 Uhr morgens.",
        options: [
          { text: "Kein Problem, ich bin schnell wach", type: "morgenmensch" },
          { text: "Das ist für mich mitten in der Nacht", type: "nachteule" },
          { text: "Geht so, kommt auf den Vortag an", type: "flexibel" },
          { text: "Unterschiedlich, je nachdem wie spät ich ins Bett kam", type: "flexibel" },
        ],
      },
      {
        question: "Um 23 Uhr fühlst du dich...",
        options: [
          { text: "...schon ziemlich müde", type: "morgenmensch" },
          { text: "...gerade erst richtig wach", type: "nachteule" },
          { text: "...unterschiedlich, mal müde, mal wach", type: "flexibel" },
          { text: "...kommt auf den Tag an, mal so, mal so", type: "flexibel" },
        ],
      },
      {
        question: "Deine wichtigsten Aufgaben erledigst du am liebsten...",
        options: [
          { text: "...morgens, direkt nach dem Aufstehen", type: "morgenmensch" },
          { text: "...abends oder nachts", type: "nachteule" },
          { text: "...wann immer sich gerade Zeit findet", type: "flexibel" },
          { text: "...dann, wann es gerade am besten passt", type: "flexibel" },
        ],
      },
      {
        question: "An einem freien Tag ohne Wecker wachst du auf...",
        options: [
          { text: "...trotzdem früh, aus Gewohnheit", type: "morgenmensch" },
          { text: "...spät, endlich mal ausschlafen", type: "nachteule" },
          { text: "...zu ganz unterschiedlichen Zeiten", type: "flexibel" },
          { text: "...unterschiedlich, je nach Vorwoche", type: "flexibel" },
        ],
      },
      {
        question: "Ein Frühstückstreffen um 7 Uhr klingt für dich...",
        options: [
          { text: "...super, perfekte Zeit für mich", type: "morgenmensch" },
          { text: "...furchtbar, viel zu früh", type: "nachteule" },
          { text: "...machbar, wenn ich mich drauf einstelle", type: "flexibel" },
          { text: "...geht schon, mit etwas Vorlauf kein Problem", type: "flexibel" },
        ],
      },
      {
        question: "Deine kreativsten Ideen kommen dir am ehesten...",
        options: [
          { text: "...beim Morgenkaffee", type: "morgenmensch" },
          { text: "...spät abends im Bett", type: "nachteule" },
          { text: "...zu ganz unterschiedlichen Tageszeiten", type: "flexibel" },
          { text: "...eigentlich zu jeder Tageszeit, ganz unterschiedlich", type: "flexibel" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 11. Reisetyp (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "reisetyp",
    title: "Reisetyp: Planer oder Spontan?",
    teaser: "Excel-Tabelle oder Koffer packen und losfahren -- wie reist du wirklich?",
    emoji: "🧳",
    estMinutes: 4,
    resultTypes: [
      {
        id: "planer",
        title: "Der/die Planer:in",
        emoji: "🗺️",
        gradientClass: G2,
        description: "Deine Reisen sind bis ins Detail organisiert -- Überraschungen magst du eher wenig.",
        strengths: "Du holst durch gute Planung das Meiste aus jeder Reise heraus, ohne Zeit zu verschwenden.",
        watchOut: "Zu strikte Pläne lassen manchmal keinen Raum für schöne spontane Entdeckungen.",
        tip: "Plane bewusst einen komplett freien Tag ohne Programm in jede Reise ein.",
      },
      {
        id: "spontan",
        title: "Der/die Spontane",
        emoji: "🎒",
        gradientClass: G6,
        description: "Koffer packen, losfahren, den Rest vor Ort entscheiden -- so reist du am liebsten.",
        strengths: "Du erlebst durch deine Offenheit oft die authentischsten, unerwartetsten Momente.",
        watchOut: "Ganz ohne Plan verpasst du manchmal ausgebuchte Highlights oder wichtige Termine.",
        tip: "Buch die wirklich wichtigen Dinge (Unterkunft, Highlights) vorab -- den Rest lässt du offen.",
      },
      {
        id: "mix",
        title: "Der/die Grundgerüst-Reisende",
        emoji: "🧭",
        gradientClass: G7,
        description: "Ein grobes Grundgerüst steht, der Rest entwickelt sich spontan vor Ort.",
        strengths: "Du kombinierst Sicherheit und Freiheit -- die beste aus beiden Welten.",
        watchOut: "Manchmal fehlt dir die letzte Konsequenz, um dich ganz für eine Richtung zu entscheiden.",
        tip: "Leg dir für jede Reise 2-3 fixe Ankerpunkte fest, alles andere bleibt offen.",
      },
    ],
    questions: [
      {
        question: "Wie sieht deine Reisevorbereitung aus?",
        options: [
          { text: "Detaillierte Liste mit Tagesplänen", type: "planer" },
          { text: "Koffer packen, Flug buchen, fertig", type: "spontan" },
          { text: "Unterkunft fix, Rest spontan vor Ort", type: "mix" },
          { text: "Die wichtigsten Eckpunkte stehen, Rest ergibt sich", type: "mix" },
        ],
      },
      {
        question: "Restaurantwahl im Urlaub -- wie entscheidest du?",
        options: [
          { text: "Vorher recherchiert, mit Bewertungen verglichen", type: "planer" },
          { text: "Das, was mir spontan über den Weg läuft", type: "spontan" },
          { text: "Ein, zwei vorab gemerkt, sonst spontan", type: "mix" },
          { text: "Ein paar Favoriten im Hinterkopf, Rest nach Lust", type: "mix" },
        ],
      },
      {
        question: "Ein Ausflug verzögert sich unerwartet um mehrere Stunden.",
        options: [
          { text: "Das bringt meinen ganzen Plan durcheinander", type: "planer" },
          { text: "Kein Problem, ich schaue einfach, was passiert", type: "spontan" },
          { text: "Ich passe den Rest des Tages flexibel an", type: "mix" },
          { text: "Ich bau den Plan spontan etwas um", type: "mix" },
        ],
      },
      {
        question: "Wie viele Reiseführer/Guides nutzt du vorab?",
        options: [
          { text: "Mehrere, ich will bestens vorbereitet sein", type: "planer" },
          { text: "Keine, ich entdecke lieber selbst", type: "spontan" },
          { text: "Einen groben Überblick reicht mir", type: "mix" },
          { text: "Nur so viel, dass ich ungefähr Bescheid weiß", type: "mix" },
        ],
      },
      {
        question: "Dein Reisebudget planst du...",
        options: [
          { text: "...bis auf den Euro genau im Voraus", type: "planer" },
          { text: "...gar nicht, ich schau, wie weit es reicht", type: "spontan" },
          { text: "...grob, mit etwas Puffer für Spontanes", type: "mix" },
          { text: "...ungefähr, mit etwas Luft nach oben", type: "mix" },
        ],
      },
      {
        question: "Ein Einheimischer empfiehlt dir spontan einen geheimen Ort.",
        options: [
          { text: "Passt das in meinen Zeitplan? Ich muss checken", type: "planer" },
          { text: "Sofort dahin, klingt aufregend!", type: "spontan" },
          { text: "Wenn Zeit ist, gerne, sonst beim nächsten Mal", type: "mix" },
          { text: "Wenn's reinpasst, klar - sonst auch okay", type: "mix" },
        ],
      },
      {
        question: "Deine Flüge/Bahnfahrten buchst du...",
        options: [
          { text: "...Monate im Voraus", type: "planer" },
          { text: "...kurzfristig, je nach Lust", type: "spontan" },
          { text: "...ein paar Wochen vorher", type: "mix" },
          { text: "...mit etwas Vorlauf, aber nicht zu früh", type: "mix" },
        ],
      },
      {
        question: "Nach einer Reise erinnerst du dich am meisten an...",
        options: [
          { text: "...die perfekt geplanten Highlights", type: "planer" },
          { text: "...die unerwarteten, spontanen Momente", type: "spontan" },
          { text: "...eine gute Mischung aus beidem", type: "mix" },
          { text: "...eine Kombination aus Plan und Zufall", type: "mix" },
        ],
      },
      {
        question: "Dein Koffer wird gepackt...",
        options: [
          { text: "...nach einer durchdachten Packliste", type: "planer" },
          { text: "...in letzter Minute, irgendwie passt's", type: "spontan" },
          { text: "...mit einer groben Liste im Kopf", type: "mix" },
          { text: "...nach Gefühl, mit einer ungefähren Vorstellung", type: "mix" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 12. Geldtyp (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "geldtyp",
    title: "Wie gehst du mit Geld um?",
    teaser: "Sparfuchs, Genießer oder Vogel-Strauß-Taktik -- dein Geld-Typ im Alltag.",
    emoji: "💶",
    estMinutes: 4,
    resultTypes: [
      {
        id: "sparfuchs",
        title: "Der/die Sparfuchs",
        emoji: "🐿️",
        gradientClass: G3,
        description: "Sparen gibt dir Sicherheit -- du behältst deine Finanzen genau im Blick.",
        strengths: "Deine Disziplin sorgt für finanzielle Sicherheit, die andere dir neiden.",
        watchOut: "Achte darauf, dir auch mal etwas zu gönnen, ohne dabei ein schlechtes Gewissen zu haben.",
        tip: "Plane bewusst ein kleines 'Freude-Budget' ein, das du ohne Reue ausgeben darfst.",
      },
      {
        id: "genuss",
        title: "Der/die Genießer:in",
        emoji: "🛍️",
        gradientClass: G6,
        description: "Geld ist zum Leben da -- du gönnst dir gerne schöne Momente und Dinge.",
        strengths: "Du weißt, wie man das Leben genießt und schaffst dir bewusst Freude im Alltag.",
        watchOut: "Ein wenig mehr Übersicht über deine Ausgaben könnte dir künftig helfen.",
        tip: "Ein einfaches Haushaltsbuch für einen Monat zeigt dir, wo dein Geld wirklich hingeht.",
      },
      {
        id: "vermeider",
        title: "Der/die Vermeider:in",
        emoji: "🙈",
        gradientClass: G5,
        description: "Über Geld nachzudenken ist eher unangenehm -- du schiebst Finanzfragen gerne auf.",
        strengths: "Du lässt dich von Geldsorgen nicht dein Leben bestimmen -- eine gewisse Gelassenheit.",
        watchOut: "Zu langes Wegschauen kann dazu führen, dass sich Probleme unbemerkt aufbauen.",
        tip: "Ein kurzer monatlicher Kontocheck, fest im Kalender, nimmt dem Thema den Schrecken.",
      },
    ],
    questions: [
      {
        question: "Am Monatsende schaust du auf dein Konto und...",
        options: [
          { text: "...bin zufrieden, ich habe wieder was gespart", type: "sparfuchs" },
          { text: "...freue mich über die schönen Dinge, die ich mir geleistet habe", type: "genuss" },
          { text: "...schaue eigentlich eher selten aktiv nach", type: "vermeider" },
          { text: "...vermeide es eigentlich, genauer hinzuschauen", type: "vermeider" },
        ],
      },
      {
        question: "Ein unerwarteter Bonus landet auf deinem Konto.",
        options: [
          { text: "Direkt aufs Sparkonto", type: "sparfuchs" },
          { text: "Wird sofort in etwas Schönes investiert", type: "genuss" },
          { text: "Bleibt erstmal einfach liegen", type: "vermeider" },
          { text: "Ich denke später mal drüber nach, was ich damit mache", type: "vermeider" },
        ],
      },
      {
        question: "Wie oft prüfst du deine Kontoauszüge?",
        options: [
          { text: "Regelmäßig, fast jede Woche", type: "sparfuchs" },
          { text: "Unregelmäßig, hauptsächlich wenn's mich interessiert", type: "genuss" },
          { text: "Selten bis nie", type: "vermeider" },
          { text: "Kaum, das Thema meide ich eher", type: "vermeider" },
        ],
      },
      {
        question: "Ein teures Teil, das du dir schon lange wünschst, ist im Angebot.",
        options: [
          { text: "Ich überlege lange, ob sich die Ausgabe lohnt", type: "sparfuchs" },
          { text: "Ich kaufe es sofort, das Leben ist kurz", type: "genuss" },
          { text: "Ich schiebe die Entscheidung erstmal vor mir her", type: "vermeider" },
          { text: "Ich verdräng die Entscheidung erstmal", type: "vermeider" },
        ],
      },
      {
        question: "Wie fühlt sich für dich das Wort 'Budget' an?",
        options: [
          { text: "Vertraut, ich arbeite gerne damit", type: "sparfuchs" },
          { text: "Etwas einengend für meinen Geschmack", type: "genuss" },
          { text: "Ehrlich gesagt etwas unangenehm", type: "vermeider" },
          { text: "Ich weich dem Thema am liebsten aus", type: "vermeider" },
        ],
      },
      {
        question: "Rechnungen bezahlst du...",
        options: [
          { text: "...sofort, am liebsten direkt am selben Tag", type: "sparfuchs" },
          { text: "...zeitnah, aber ohne große Eile", type: "genuss" },
          { text: "...manchmal ziemlich spät", type: "vermeider" },
          { text: "...oft erst, wenn's schon knapp wird", type: "vermeider" },
        ],
      },
      {
        question: "Bei größeren Anschaffungen vergleichst du vorher...",
        options: [
          { text: "...ausführlich Preise und Angebote", type: "sparfuchs" },
          { text: "...kaum, Hauptsache es gefällt mir", type: "genuss" },
          { text: "...eher wenig, ich kaufe eher spontan", type: "vermeider" },
          { text: "...gar nicht groß, ich will's einfach nicht wissen", type: "vermeider" },
        ],
      },
      {
        question: "Was macht dich beim Thema Geld am ehesten nervös?",
        options: [
          { text: "Zu viel unnötig auszugeben", type: "sparfuchs" },
          { text: "Mir nichts Schönes gönnen zu können", type: "genuss" },
          { text: "Der ganze Überblick allgemein", type: "vermeider" },
          { text: "Mich überhaupt damit zu beschäftigen", type: "vermeider" },
        ],
      },
      {
        question: "Ein Freund fragt dich um Finanzrat.",
        options: [
          { text: "Ich gebe gerne konkrete Sparttipps", type: "sparfuchs" },
          { text: "Ich rate, sich auch mal was zu gönnen", type: "genuss" },
          { text: "Ich fühle mich dafür nicht die richtige Ansprechperson", type: "vermeider" },
          { text: "Ich weiche dem Thema lieber aus", type: "vermeider" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 13. Minimalist oder Sammler (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "minimalist-oder-sammler",
    title: "Minimalist oder Sammler?",
    teaser: "Dein Ordnungs-Level -- leerer Raum oder liebevolles Chaos?",
    emoji: "📦",
    estMinutes: 2,
    resultTypes: [
      {
        id: "minimalist",
        title: "Der/die Minimalist:in",
        emoji: "⬜",
        gradientClass: G7,
        description: "Weniger ist für dich mehr -- du trennst dich leicht von Dingen, die du nicht brauchst.",
        strengths: "Dein reduzierter Lebensstil schafft dir echte mentale Klarheit und Freiraum.",
        watchOut: "Manchmal wirfst du in der Aufräum-Euphorie auch Dinge mit emotionalem Wert weg.",
        tip: "Leg dir eine kleine 'Erinnerungs-Kiste' für die wenigen Dinge an, die wirklich zählen.",
      },
      {
        id: "sammler",
        title: "Der/die Sammler:in",
        emoji: "🗃️",
        gradientClass: G4,
        description: "Jedes Ding hat für dich eine Geschichte -- du hältst gerne an Erinnerungsstücken fest.",
        strengths: "Deine Sammlungen erzählen Geschichten und machen deinen Raum einzigartig persönlich.",
        watchOut: "Achte darauf, dass Ansammlungen nicht in echte Unordnung oder Überforderung kippen.",
        tip: "Sortier einmal im Jahr bewusst aus, was wirklich noch Bedeutung für dich hat.",
      },
      {
        id: "kurator",
        title: "Der/die Kurator:in",
        emoji: "🖼️",
        gradientClass: G8,
        description: "Du besitzt gerne Dinge -- aber nur ausgewählte, die dir wirklich etwas bedeuten.",
        strengths: "Du triffst bewusste Entscheidungen darüber, was in dein Leben passt und was nicht.",
        watchOut: "Der hohe Anspruch an jedes Teil kann Kaufentscheidungen unnötig verlangsamen.",
        tip: "Vertrau bei kleineren Anschaffungen ruhig öfter deinem ersten Bauchgefühl.",
      },
    ],
    questions: [
      {
        question: "Ein altes T-Shirt, das du seit Jahren nicht getragen hast.",
        options: [
          { text: "Weg damit, ich brauch es nicht", type: "minimalist" },
          { text: "Behalten, es hängt eine Erinnerung dran", type: "sammler" },
          { text: "Nur behalten, wenn es wirklich noch passt", type: "kurator" },
          { text: "Nur, wenn es noch zu mir passt und gut sitzt", type: "kurator" },
        ],
      },
      {
        question: "Wie sieht dein Kleiderschrank aus?",
        options: [
          { text: "Übersichtlich, jedes Teil hat seinen Zweck", type: "minimalist" },
          { text: "Vollgepackt mit Erinnerungsstücken aus jeder Lebensphase", type: "sammler" },
          { text: "Sorgfältig ausgewählte Lieblingsstücke", type: "kurator" },
          { text: "Bewusst zusammengestellt, jedes Teil mit Bedacht gewählt", type: "kurator" },
        ],
      },
      {
        question: "Souvenirs von Reisen -- wie hältst du es damit?",
        options: [
          { text: "Ich kaufe fast nie welche", type: "minimalist" },
          { text: "Ich sammle sie liebend gerne", type: "sammler" },
          { text: "Nur ein besonderes Stück pro Reise", type: "kurator" },
          { text: "Ich such mir gezielt ein einziges besonderes Stück aus", type: "kurator" },
        ],
      },
      {
        question: "Ein Umzug steht an -- wie fühlt sich das Packen an?",
        options: [
          { text: "Easy, ich besitze eh nicht viel", type: "minimalist" },
          { text: "Aufwendig, so viele liebe Erinnerungsstücke", type: "sammler" },
          { text: "Gut planbar, da alles ausgewählt ist", type: "kurator" },
          { text: "Entspannt, weil ich nur Ausgewähltes besitze", type: "kurator" },
        ],
      },
      {
        question: "Beim Einkaufen entscheidest du dich für neue Dinge...",
        options: [
          { text: "...selten, nur wenn wirklich nötig", type: "minimalist" },
          { text: "...oft, viele Dinge gefallen mir einfach", type: "sammler" },
          { text: "...bewusst, nach reiflicher Überlegung", type: "kurator" },
          { text: "...mit Bedacht, nur wenn es wirklich passt", type: "kurator" },
        ],
      },
      {
        question: "Ein leerer, unmöblierter Raum wirkt auf dich...",
        options: [
          { text: "...beruhigend und einladend", type: "minimalist" },
          { text: "...irgendwie unpersönlich und leer", type: "sammler" },
          { text: "...wie eine spannende Möglichkeit, ihn gezielt zu füllen", type: "kurator" },
          { text: "...wie eine Einladung, ihn mit Bedacht einzurichten", type: "kurator" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 14. Arbeitstyp (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "arbeitstyp",
    title: "Welcher Arbeitstyp bist du?",
    teaser: "Wie du wirklich am liebsten arbeitest -- und was dich antreibt.",
    emoji: "💼",
    estMinutes: 4,
    resultTypes: [
      {
        id: "strukturiert",
        title: "Der/die Strukturierte",
        emoji: "📋",
        gradientClass: G2,
        description: "Klare Prozesse und Planung geben dir Sicherheit -- du arbeitest gerne nach System.",
        strengths: "Deine Zuverlässigkeit und Struktur machen dich zur Stütze in jedem Team.",
        watchOut: "Unerwartete Planänderungen bringen dich manchmal mehr aus der Ruhe, als nötig wäre.",
        tip: "Bau dir bewusst kleine Puffer in deine Planung ein -- für den unerwarteten Fall.",
      },
      {
        id: "kreativ",
        title: "Der/die Kreative",
        emoji: "💡",
        gradientClass: G5,
        description: "Du brauchst Freiraum für Ideen -- starre Vorgaben bremsen deine beste Arbeit aus.",
        strengths: "Deine Ideen bringen frischen Wind in jedes Projekt, das droht, festzufahren.",
        watchOut: "Ohne etwas Struktur bleiben manche deiner besten Ideen unvollendet liegen.",
        tip: "Setz dir für kreative Projekte bewusst kleine Meilensteine, um am Ball zu bleiben.",
      },
      {
        id: "pragmatisch",
        title: "Der/die Pragmatische",
        emoji: "🔧",
        gradientClass: G6,
        description: "Ergebnisse zählen für dich mehr als der perfekte Weg dorthin -- Hauptsache es funktioniert.",
        strengths: "Deine Bodenständigkeit bringt Projekte schnell und effizient ins Ziel.",
        watchOut: "Achte darauf, dass Schnelligkeit nicht zulasten von Qualität oder Details geht.",
        tip: "Plane bei wichtigen Projekten bewusst eine kurze Qualitäts-Check-Phase ein.",
      },
    ],
    questions: [
      {
        question: "Ein neues Projekt beginnt -- was brauchst du zuerst?",
        options: [
          { text: "Einen klaren Plan mit Meilensteinen", type: "strukturiert" },
          { text: "Freiraum, um erstmal Ideen zu sammeln", type: "kreativ" },
          { text: "Ein grobes Ziel, dann lege ich los", type: "pragmatisch" },
          { text: "Ich will einfach direkt loslegen können", type: "pragmatisch" },
        ],
      },
      {
        question: "Dein idealer Arbeitsplatz ist...",
        options: [
          { text: "...ordentlich organisiert mit festem System", type: "strukturiert" },
          { text: "...inspirierend, mit vielen Anregungen um mich herum", type: "kreativ" },
          { text: "...funktional, Hauptsache es klappt", type: "pragmatisch" },
          { text: "...praktisch, ohne viel Schnickschnack", type: "pragmatisch" },
        ],
      },
      {
        question: "Feedback zu deiner Arbeit bekommst du am liebsten...",
        options: [
          { text: "...strukturiert, in klaren Punkten", type: "strukturiert" },
          { text: "...offen im Gespräch, mit Raum für Ideen", type: "kreativ" },
          { text: "...knapp und konkret, worauf es ankommt", type: "pragmatisch" },
          { text: "...direkt und ohne viel Drumherum", type: "pragmatisch" },
        ],
      },
      {
        question: "Wenn ein Plan plötzlich über den Haufen geworfen wird...",
        options: [
          { text: "...brauche ich Zeit, um neu zu planen", type: "strukturiert" },
          { text: "...sehe ich sofort neue Möglichkeiten darin", type: "kreativ" },
          { text: "...suche ich schnell einen pragmatischen Weg weiter", type: "pragmatisch" },
          { text: "...finde ich zügig eine machbare Alternative", type: "pragmatisch" },
        ],
      },
      {
        question: "Deadlines wirken auf dich...",
        options: [
          { text: "...hilfreich, sie geben mir Struktur", type: "strukturiert" },
          { text: "...einengend für meinen kreativen Prozess", type: "kreativ" },
          { text: "...normal, ich arbeite einfach drauf hin", type: "pragmatisch" },
          { text: "...unaufgeregt, ich erledige es einfach", type: "pragmatisch" },
        ],
      },
      {
        question: "In Meetings bringst du dich am liebsten ein mit...",
        options: [
          { text: "...klaren To-Dos und nächsten Schritten", type: "strukturiert" },
          { text: "...neuen, ungewöhnlichen Ideen", type: "kreativ" },
          { text: "...konkreten, umsetzbaren Vorschlägen", type: "pragmatisch" },
          { text: "...Vorschlägen, die sich direkt umsetzen lassen", type: "pragmatisch" },
        ],
      },
      {
        question: "Was motiviert dich bei der Arbeit am meisten?",
        options: [
          { text: "Ein sauber abgeschlossener Prozess", type: "strukturiert" },
          { text: "Eine originelle Lösung zu finden", type: "kreativ" },
          { text: "Ein sichtbares, nützliches Ergebnis", type: "pragmatisch" },
          { text: "Etwas Brauchbares am Ende in der Hand zu haben", type: "pragmatisch" },
        ],
      },
      {
        question: "Dein Kalender sieht aus wie...",
        options: [
          { text: "...minutiös durchgeplant", type: "strukturiert" },
          { text: "...eher locker, mit viel offener Zeit", type: "kreativ" },
          { text: "...gefüllt mit dem Nötigsten, effizient", type: "pragmatisch" },
          { text: "...knapp, aber effizient getaktet", type: "pragmatisch" },
        ],
      },
      {
        question: "Am Ende eines Arbeitstages fühlst du dich am zufriedensten, wenn...",
        options: [
          { text: "...alles nach Plan gelaufen ist", type: "strukturiert" },
          { text: "...du eine wirklich gute Idee hattest", type: "kreativ" },
          { text: "...du konkret etwas abgeschlossen hast", type: "pragmatisch" },
          { text: "...etwas erledigt vom Tisch ist", type: "pragmatisch" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 15. Teamplayer oder Einzelkämpfer (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "teamplayer-oder-einzelkaempfer",
    title: "Teamplayer oder Einzelkämpfer?",
    teaser: "Läufst du im Team oder solo zur Höchstform auf?",
    emoji: "🤾",
    estMinutes: 2,
    resultTypes: [
      {
        id: "team",
        title: "Der/die Teamplayer:in",
        emoji: "🤝",
        gradientClass: G3,
        description: "Gemeinsam macht es für dich mehr Spaß -- du blühst im Austausch mit anderen auf.",
        strengths: "Du bringst Menschen zusammen und sorgst für gute Zusammenarbeit im Team.",
        watchOut: "Achte darauf, auch mal allein Entscheidungen zu treffen, ohne alle einzubeziehen.",
        tip: "Reserviere dir bewusst Zeitfenster für konzentriertes Alleinarbeiten -- das stärkt beides.",
      },
      {
        id: "solo",
        title: "Der/die Einzelkämpfer:in",
        emoji: "🎯",
        gradientClass: G7,
        description: "Allein arbeitest du am effizientesten -- ohne Abstimmungsrunden geht's schneller.",
        strengths: "Deine Eigenständigkeit macht dich extrem verlässlich bei eigenverantwortlichen Aufgaben.",
        watchOut: "Wichtige Perspektiven anderer gehen dir manchmal verloren, wenn du zu solo arbeitest.",
        tip: "Hol dir bei größeren Projekten bewusst eine zweite Meinung ein, auch wenn du sie nicht brauchst.",
      },
      {
        id: "situativ",
        title: "Der/die Situative",
        emoji: "🔀",
        gradientClass: G4,
        description: "Je nach Aufgabe wechselst du flexibel zwischen Teamarbeit und Solo-Modus.",
        strengths: "Du weißt genau, wann Zusammenarbeit hilft und wann Fokus allein besser ist.",
        watchOut: "Manchmal fällt dir die Entscheidung schwer, welcher Modus gerade wirklich passt.",
        tip: "Frag dich bei neuen Aufgaben bewusst: Brauche ich hier Austausch oder Ruhe?",
      },
    ],
    questions: [
      {
        question: "Ein neues Projekt -- was ist dein erster Impuls?",
        options: [
          { text: "Wer ist noch dabei, lass uns loslegen", type: "team" },
          { text: "Ich fange am liebsten gleich selbst an", type: "solo" },
          { text: "Kommt auf die Art des Projekts an", type: "situativ" },
          { text: "Hängt davon ab, was gerade gebraucht wird", type: "situativ" },
        ],
      },
      {
        question: "Wenn du unter Zeitdruck bist, arbeitest du...",
        options: [
          { text: "...besser mit anderen, die mich pushen", type: "team" },
          { text: "...deutlich effizienter allein und fokussiert", type: "solo" },
          { text: "...unterschiedlich, je nach Aufgabe", type: "situativ" },
          { text: "...verschieden, je nachdem was ansteht", type: "situativ" },
        ],
      },
      {
        question: "Eine schwierige Entscheidung steht an.",
        options: [
          { text: "Ich hole mir Meinungen von anderen ein", type: "team" },
          { text: "Ich entscheide lieber allein", type: "solo" },
          { text: "Kommt drauf an, wie wichtig die Entscheidung ist", type: "situativ" },
          { text: "Hängt von der Tragweite der Entscheidung ab", type: "situativ" },
        ],
      },
      {
        question: "Beim Brainstorming bist du am produktivsten...",
        options: [
          { text: "...in der Gruppe, im Austausch mit anderen", type: "team" },
          { text: "...allein, in Ruhe für mich", type: "solo" },
          { text: "...erst allein, dann im Austausch verfeinern", type: "situativ" },
          { text: "...unterschiedlich, mal allein, mal in der Gruppe", type: "situativ" },
        ],
      },
      {
        question: "Lob für ein gutes Ergebnis -- was bedeutet dir mehr?",
        options: [
          { text: "Wenn das ganze Team gelobt wird", type: "team" },
          { text: "Wenn meine eigene Leistung anerkannt wird", type: "solo" },
          { text: "Beides ist mir wichtig, je nach Kontext", type: "situativ" },
          { text: "Kommt drauf an, was gerade zählt", type: "situativ" },
        ],
      },
      {
        question: "Wie fühlst du dich, wenn du ein ganzes Projekt allein stemmen musst?",
        options: [
          { text: "Ungewohnt, mir fehlt der Austausch", type: "team" },
          { text: "Super, endlich freie Bahn", type: "solo" },
          { text: "Geht, aber ich hätte gern etwas Rückhalt", type: "situativ" },
          { text: "Machbar, auch wenn ich mir Unterstützung wünschen würde", type: "situativ" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 16. Führungsstil (lang, 16 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "fuehrungsstil",
    title: "Dein Führungsstil-Test",
    teaser: "Die große Analyse: wie du führst, entscheidest und dein Team mitnimmst.",
    emoji: "🧑‍✈️",
    estMinutes: 7,
    resultTypes: [
      {
        id: "visionaer",
        title: "Der/die Visionär:in",
        emoji: "🌟",
        gradientClass: G5,
        description: "Du führst mit einem großen Bild vor Augen und inspirierst andere, dir zu folgen.",
        strengths: "Deine Begeisterung für das große Ziel motiviert Teams über schwierige Phasen hinweg.",
        watchOut: "Konkrete, kleinteilige Schritte gehen bei deiner Vision manchmal unter.",
        tip: "Übersetze deine große Vision regelmäßig in klare, kleine nächste Schritte fürs Team.",
      },
      {
        id: "coach",
        title: "Der/die Coach:in",
        emoji: "🌱",
        gradientClass: G3,
        description: "Du führst, indem du Menschen förderst und ihnen Raum zum Wachsen gibst.",
        strengths: "Unter deiner Führung entwickeln sich Teammitglieder spürbar weiter.",
        watchOut: "Manchmal brauchst du klarere, schnellere Entscheidungen, statt lange zu fördern.",
        tip: "Setz dir bei wichtigen Entscheidungen bewusst ein Zeitlimit, statt endlos zu coachen.",
      },
      {
        id: "macher",
        title: "Der/die Macher:in",
        emoji: "⚡",
        gradientClass: G6,
        description: "Du führst durch klare Entscheidungen und schnelles, sichtbares Handeln.",
        strengths: "Unter dir weiß das Team immer, woran es ist -- Entscheidungen kommen schnell.",
        watchOut: "Achte darauf, dem Team auch bei schnellen Entscheidungen genug Mitsprache zu lassen.",
        tip: "Frag vor wichtigen Entscheidungen kurz nach Meinungen, bevor du sie triffst.",
      },
    ],
    questions: [
      {
        question: "Ein neues Teamprojekt startet -- wie führst du ein?",
        options: [
          { text: "Mit einer inspirierenden Vision, wohin die Reise geht", type: "visionaer" },
          { text: "Mit einem Gespräch über die Stärken jeder Person", type: "coach" },
          { text: "Mit einem klaren Plan und sofortigem Start", type: "macher" },
          { text: "Ich verteile sofort klare Aufgaben und lege los", type: "macher" },
        ],
      },
      {
        question: "Ein Teammitglied macht wiederholt Fehler.",
        options: [
          { text: "Ich erinnere an das größere Ziel und die Bedeutung", type: "visionaer" },
          { text: "Ich biete Unterstützung und Entwicklung an", type: "coach" },
          { text: "Ich gebe klares, direktes Feedback", type: "macher" },
          { text: "Ich spreche es direkt und ohne Umschweife an", type: "macher" },
        ],
      },
      {
        question: "Wie triffst du wichtige Entscheidungen im Team?",
        options: [
          { text: "Ausgerichtet am langfristigen Ziel", type: "visionaer" },
          { text: "Im Dialog, mit viel Beteiligung aller", type: "coach" },
          { text: "Schnell und pragmatisch", type: "macher" },
          { text: "Zügig, ohne lange abzuwägen", type: "macher" },
        ],
      },
      {
        question: "Was motiviert dich als Führungsperson am meisten?",
        options: [
          { text: "Etwas Großes zu erschaffen", type: "visionaer" },
          { text: "Menschen wachsen zu sehen", type: "coach" },
          { text: "Sichtbare Ergebnisse zu liefern", type: "macher" },
          { text: "Dinge tatsächlich ins Ziel zu bringen", type: "macher" },
        ],
      },
      {
        question: "Ein Meeting läuft aus dem Ruder.",
        options: [
          { text: "Ich erinnere an das eigentliche große Ziel", type: "visionaer" },
          { text: "Ich frage jede Person nach ihrer Sicht", type: "coach" },
          { text: "Ich bringe es sofort auf den Punkt und lenke um", type: "macher" },
          { text: "Ich greife sofort ein und bringe es zurück auf Kurs", type: "macher" },
        ],
      },
      {
        question: "Wie gibst du Feedback an dein Team?",
        options: [
          { text: "Verknüpft mit dem großen Bild und Sinn dahinter", type: "visionaer" },
          { text: "Individuell, auf die Person zugeschnitten", type: "coach" },
          { text: "Kurz, klar und konkret", type: "macher" },
          { text: "Direkt und ohne viele Worte", type: "macher" },
        ],
      },
      {
        question: "Bei Widerstand im Team gegen eine Idee...",
        options: [
          { text: "...überzeuge ich mit der großen Perspektive", type: "visionaer" },
          { text: "...höre ich mir alle Bedenken genau an", type: "coach" },
          { text: "...entscheide ich trotzdem, wenn ich überzeugt bin", type: "macher" },
          { text: "...setze ich mich durch, wenn ich vom Weg überzeugt bin", type: "macher" },
        ],
      },
      {
        question: "Dein Team würde dich beschreiben als...",
        options: [
          { text: "...inspirierend und zukunftsorientiert", type: "visionaer" },
          { text: "...unterstützend und fördernd", type: "coach" },
          { text: "...entscheidungsfreudig und tatkräftig", type: "macher" },
          { text: "...zupackend und schnell in der Umsetzung", type: "macher" },
        ],
      },
      {
        question: "Was ist dir bei der Team-Zusammenstellung am wichtigsten?",
        options: [
          { text: "Dass alle an dasselbe große Ziel glauben", type: "visionaer" },
          { text: "Dass sich jede Person entwickeln kann", type: "coach" },
          { text: "Dass alle effizient zusammenarbeiten", type: "macher" },
          { text: "Dass die Arbeit schnell vorangeht", type: "macher" },
        ],
      },
      {
        question: "Ein Rückschlag trifft das Team hart.",
        options: [
          { text: "Ich richte den Blick wieder auf das Ziel", type: "visionaer" },
          { text: "Ich sorge dafür, dass sich niemand allein fühlt", type: "coach" },
          { text: "Ich suche sofort nach dem nächsten Schritt", type: "macher" },
          { text: "Ich handle sofort und packe die Lösung an", type: "macher" },
        ],
      },
      {
        question: "Wie planst du langfristig?",
        options: [
          { text: "Mit einem klaren, großen Zukunftsbild", type: "visionaer" },
          { text: "Mit Fokus auf die Entwicklung der Menschen", type: "coach" },
          { text: "Mit konkreten, messbaren Meilensteinen", type: "macher" },
          { text: "Mit klaren Etappenzielen, die ich abhake", type: "macher" },
        ],
      },
      {
        question: "Was fällt dir als Führungsperson am schwersten?",
        options: [
          { text: "Mich um die kleinen Details zu kümmern", type: "visionaer" },
          { text: "Schnelle, harte Entscheidungen zu treffen", type: "coach" },
          { text: "Genug Geduld für langsame Prozesse zu haben", type: "macher" },
          { text: "Auf langsame Abstimmungsrunden zu warten", type: "macher" },
        ],
      },
      {
        question: "Wie sprichst du über Erfolge des Teams?",
        options: [
          { text: "Als Beweis, dass die große Idee funktioniert", type: "visionaer" },
          { text: "Als Ergebnis des Wachstums jeder einzelnen Person", type: "coach" },
          { text: "Als klares, messbares Ergebnis harter Arbeit", type: "macher" },
          { text: "Als handfesten Beweis harter Arbeit", type: "macher" },
        ],
      },
      {
        question: "Wie reagierst du, wenn jemand im Team unsicher wirkt?",
        options: [
          { text: "Ich erinnere an das gemeinsame große Ziel", type: "visionaer" },
          { text: "Ich biete ein persönliches Gespräch an", type: "coach" },
          { text: "Ich gebe klare, handfeste Anweisungen", type: "macher" },
          { text: "Ich gebe konkrete Schritte vor, an denen man sich festhalten kann", type: "macher" },
        ],
      },
      {
        question: "Ein neues Teammitglied startet -- wie führst du es ein?",
        options: [
          { text: "Ich erkläre zuerst das große Ganze", type: "visionaer" },
          { text: "Ich nehme mir viel Zeit für persönliches Onboarding", type: "coach" },
          { text: "Ich gebe klare Aufgaben zum direkten Einstieg", type: "macher" },
          { text: "Ich lasse es direkt mit konkreten Aufgaben loslegen", type: "macher" },
        ],
      },
      {
        question: "Was ist dein größter Anspruch an dich selbst als Führungsperson?",
        options: [
          { text: "Andere für eine große Idee zu begeistern", type: "visionaer" },
          { text: "Jede Person bestmöglich zu unterstützen", type: "coach" },
          { text: "Verlässlich Ergebnisse zu liefern", type: "macher" },
          { text: "Zuverlässig zu liefern, worauf man sich verlassen kann", type: "macher" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 17. Nein-sagen-Test (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "nein-sagen-test",
    title: "Wie gut kannst du \"Nein\" sagen?",
    teaser: "Zwischen Gefallen-wollen und eigenen Grenzen -- wo stehst du?",
    emoji: "🙅",
    estMinutes: 2,
    resultTypes: [
      {
        id: "grenzensetzer",
        title: "Der/die Grenzensetzer:in",
        emoji: "🛑",
        gradientClass: G7,
        description: "Du sagst klar Nein, wenn etwas nicht zu dir passt -- ohne großes Zögern.",
        strengths: "Deine klaren Grenzen schützen deine Energie und deinen Fokus zuverlässig.",
        watchOut: "Achte darauf, ein Nein nicht unnötig hart klingen zu lassen -- ein Satz Erklärung hilft oft.",
        tip: "Ein kurzes 'Danke, dass du an mich gedacht hast' vor dem Nein macht es angenehmer für beide.",
      },
      {
        id: "abwaeger",
        title: "Der/die Abwäger:in",
        emoji: "🤔",
        gradientClass: G2,
        description: "Du überlegst dir Anfragen gut, bevor du zu- oder absagst -- selten spontan.",
        strengths: "Deine durchdachten Antworten zeigen echten Respekt vor der Anfrage und dir selbst.",
        watchOut: "Zu langes Zögern kann bei anderen den Eindruck von Unentschlossenheit hinterlassen.",
        tip: "Gib dir bewusst eine kurze Bedenkzeit-Grenze, damit aus Abwägen kein Hinauszögern wird.",
      },
      {
        id: "gefallensuecht",
        title: "Der/die Gefallenmöchtige",
        emoji: "🫶",
        gradientClass: G1,
        description: "Nein sagen fällt dir schwer -- du sagst lieber zu, auch wenn es dich Kraft kostet.",
        strengths: "Deine Hilfsbereitschaft macht dich zu einer geschätzten, verlässlichen Ansprechperson.",
        watchOut: "Zu häufiges Ja-Sagen gegen eigene Bedürfnisse führt schnell zu Erschöpfung.",
        tip: "Übe dir einen einfachen Satz ein: 'Ich muss kurz überlegen, ich melde mich.'",
      },
    ],
    questions: [
      {
        question: "Ein Kollege bittet dich um Hilfe, obwohl du selbst viel zu tun hast.",
        options: [
          { text: "Ich sage klar, dass ich gerade keine Zeit habe", type: "grenzensetzer" },
          { text: "Ich überlege, ob es sich zeitlich einrichten lässt", type: "abwaeger" },
          { text: "Ich sage zu, auch wenn es eng wird", type: "gefallensuecht" },
          { text: "Ich helf trotzdem, auch wenn's mir eigentlich zu viel ist", type: "gefallensuecht" },
        ],
      },
      {
        question: "Eine Einladung zu einem Event, auf das du keine Lust hast.",
        options: [
          { text: "Ich sage direkt ab", type: "grenzensetzer" },
          { text: "Ich denke erst drüber nach, bevor ich antworte", type: "abwaeger" },
          { text: "Ich sage zu, um niemanden zu enttäuschen", type: "gefallensuecht" },
          { text: "Ich geh meistens doch hin, um niemanden zu kränken", type: "gefallensuecht" },
        ],
      },
      {
        question: "Ein Freund bittet dich immer wieder um Gefälligkeiten.",
        options: [
          { text: "Ich spreche es irgendwann klar an", type: "grenzensetzer" },
          { text: "Ich wäge jedes Mal neu ab", type: "abwaeger" },
          { text: "Ich helfe weiter, auch wenn's mich stört", type: "gefallensuecht" },
          { text: "Ich mach trotzdem mit, obwohl es mich nervt", type: "gefallensuecht" },
        ],
      },
      {
        question: "Dein Chef fragt nach Überstunden am Wochenende.",
        options: [
          { text: "Ich sage, dass mein Wochenende mir wichtig ist", type: "grenzensetzer" },
          { text: "Ich frage nach Details, bevor ich entscheide", type: "abwaeger" },
          { text: "Ich sage eher zu, auch wenn's mir schwerfällt", type: "gefallensuecht" },
          { text: "Ich willige meistens ein, auch gegen mein Gefühl", type: "gefallensuecht" },
        ],
      },
      {
        question: "Wie fühlst du dich unmittelbar nach einem ausgesprochenen Nein?",
        options: [
          { text: "Erleichtert, es war die richtige Entscheidung", type: "grenzensetzer" },
          { text: "Zufrieden, weil ich es mir gut überlegt habe", type: "abwaeger" },
          { text: "Schuldig, obwohl es gerechtfertigt war", type: "gefallensuecht" },
          { text: "Unwohl, ich denk noch lang drüber nach", type: "gefallensuecht" },
        ],
      },
      {
        question: "Jemand reagiert enttäuscht auf dein Nein.",
        options: [
          { text: "Ich bleibe bei meiner Entscheidung", type: "grenzensetzer" },
          { text: "Ich erkläre nochmal ruhig meine Gründe", type: "abwaeger" },
          { text: "Ich überlege, ob ich doch noch zusage", type: "gefallensuecht" },
          { text: "Ich fühl mich schlecht und knick oft ein", type: "gefallensuecht" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 18. Bauch oder Kopf (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "bauch-oder-kopf",
    title: "Bauchentscheider oder Kopfmensch?",
    teaser: "Triffst du Entscheidungen aus dem Bauch heraus oder mit der Tabelle?",
    emoji: "🧠",
    estMinutes: 4,
    resultTypes: [
      {
        id: "bauch",
        title: "Der/die Bauchentscheider:in",
        emoji: "❤️",
        gradientClass: G1,
        description: "Dein Gefühl führt dich meistens richtig -- du vertraust deiner ersten Intuition.",
        strengths: "Deine schnellen, intuitiven Entscheidungen sparen dir oft wertvolle Zeit.",
        watchOut: "Bei wirklich großen Entscheidungen lohnt sich manchmal ein zweiter, rationaler Blick.",
        tip: "Schlaf bei sehr wichtigen Entscheidungen eine Nacht drüber, bevor du sie umsetzt.",
      },
      {
        id: "kopf",
        title: "Der/die Kopfmensch",
        emoji: "📊",
        gradientClass: G2,
        description: "Du wägst Für und Wider systematisch ab, bevor du dich für etwas entscheidest.",
        strengths: "Deine durchdachten Entscheidungen halten meist einer genauen Prüfung stand.",
        watchOut: "Zu viel Analyse kann dazu führen, dass du gute Gelegenheiten verpasst.",
        tip: "Vertrau bei kleineren Entscheidungen ruhig öfter deinem spontanen ersten Eindruck.",
      },
      {
        id: "kombi",
        title: "Der/die Kombinierer:in",
        emoji: "🎭",
        gradientClass: G8,
        description: "Du hörst auf dein Gefühl, prüfst es aber danach nochmal mit dem Kopf.",
        strengths: "Deine Entscheidungen sind meist ausgewogen -- weder rein impulsiv noch übervorsichtig.",
        watchOut: "Manchmal dauert dir dieser Doppel-Check bei einfachen Dingen unnötig lange.",
        tip: "Reserviere den Doppel-Check bewusst für wirklich wichtige Entscheidungen.",
      },
    ],
    questions: [
      {
        question: "Ein neues Jobangebot flattert rein. Was zuerst?",
        options: [
          { text: "Wie fühlt es sich an? Das entscheidet meist", type: "bauch" },
          { text: "Eine Liste mit Vor- und Nachteilen", type: "kopf" },
          { text: "Erst das Gefühl checken, dann die Fakten", type: "kombi" },
          { text: "Ich spür erstmal rein und prüfe es danach nüchtern", type: "kombi" },
        ],
      },
      {
        question: "Beim Einkaufen entscheidest du dich meist...",
        options: [
          { text: "...spontan, wenn mir etwas gefällt", type: "bauch" },
          { text: "...nach Preisvergleich und Recherche", type: "kopf" },
          { text: "...spontan, aber mit kurzem Realitätscheck", type: "kombi" },
          { text: "...aus dem Bauch, aber mit kurzem Nachdenken", type: "kombi" },
        ],
      },
      {
        question: "Beim ersten Treffen mit einer neuen Person...",
        options: [
          { text: "...weiß ich meist sofort, ob's passt", type: "bauch" },
          { text: "...brauche ich mehrere Treffen für ein Urteil", type: "kopf" },
          { text: "...habe ich einen ersten Eindruck, prüfe ihn aber", type: "kombi" },
          { text: "...verlass ich mich auf mein Gefühl, hinterfrag es aber", type: "kombi" },
        ],
      },
      {
        question: "Eine wichtige Entscheidung steht an, Freunde geben widersprüchliche Ratschläge.",
        options: [
          { text: "Ich höre am Ende doch auf mich selbst", type: "bauch" },
          { text: "Ich wäge alle Meinungen systematisch ab", type: "kopf" },
          { text: "Ich sammle alle Meinungen und prüfe mein Gefühl dazu", type: "kombi" },
          { text: "Ich höre zu, entscheide aber letztlich mit Kopf und Bauch", type: "kombi" },
        ],
      },
      {
        question: "Wie triffst du finanzielle Entscheidungen?",
        options: [
          { text: "Nach Gefühl, was sich richtig anfühlt", type: "bauch" },
          { text: "Mit genauer Kalkulation", type: "kopf" },
          { text: "Bauchgefühl, mit einem Zahlen-Check danach", type: "kombi" },
          { text: "Erst intuitiv, dann rechne ich es nochmal durch", type: "kombi" },
        ],
      },
      {
        question: "Bei einer Wohnungsbesichtigung entscheidest du...",
        options: [
          { text: "...meist schon nach dem ersten Betreten", type: "bauch" },
          { text: "...erst nach ausführlichem Vergleich mit Alternativen", type: "kopf" },
          { text: "...Bauchgefühl zuerst, dann alle Fakten prüfen", type: "kombi" },
          { text: "...erst der Eindruck, dann die nüchterne Prüfung", type: "kombi" },
        ],
      },
      {
        question: "Wie oft bereust du eine getroffene Entscheidung?",
        options: [
          { text: "Selten, mein Gefühl liegt meist richtig", type: "bauch" },
          { text: "Auch selten, ich habe ja alles geprüft", type: "kopf" },
          { text: "Kaum, die Kombination funktioniert für mich", type: "kombi" },
          { text: "Selten, weil ich beides gegeneinander abwäge", type: "kombi" },
        ],
      },
      {
        question: "Bei Streitfragen mit dir selbst gewinnt meistens...",
        options: [
          { text: "...das Bauchgefühl", type: "bauch" },
          { text: "...die rationale Argumentation", type: "kopf" },
          { text: "...eine Abwägung aus beidem", type: "kombi" },
          { text: "...eine Mischung aus Gefühl und Verstand", type: "kombi" },
        ],
      },
      {
        question: "Wie schnell triffst du im Schnitt Entscheidungen?",
        options: [
          { text: "Sehr schnell, fast intuitiv", type: "bauch" },
          { text: "Eher langsam, mit gründlicher Prüfung", type: "kopf" },
          { text: "Mittelschnell, erst fühlen, dann prüfen", type: "kombi" },
          { text: "Weder schnell noch langsam, Gefühl und Prüfung zusammen", type: "kombi" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 19. Konfliktstil (lang, 16 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "konfliktstil",
    title: "Dein Konfliktstil-Test",
    teaser: "Die ausführliche Analyse: wie du in Streit und Meinungsverschiedenheiten agierst.",
    emoji: "⚡",
    estMinutes: 7,
    resultTypes: [
      {
        id: "konfrontativ",
        title: "Der/die Konfrontative",
        emoji: "🔥",
        gradientClass: G6,
        description: "Du gehst Konflikte direkt und offensiv an -- Klarheit ist dir wichtiger als Harmonie.",
        strengths: "Deine Offenheit sorgt dafür, dass Probleme früh auf den Tisch kommen, statt zu schwelen.",
        watchOut: "Achte darauf, dass Direktheit im Eifer nicht zu unnötiger Härte wird.",
        tip: "Formuliere Kritik bewusst in Ich-Botschaften, statt Vorwürfe zu machen.",
      },
      {
        id: "vermittelnd",
        title: "Der/die Vermittelnde",
        emoji: "🤲",
        gradientClass: G3,
        description: "Du suchst in Konflikten aktiv nach Kompromissen, mit denen alle leben können.",
        strengths: "Deine Fähigkeit, zwischen Positionen zu vermitteln, löst festgefahrene Situationen.",
        watchOut: "Manchmal opferst du eigene Interessen zu schnell für den Kompromiss.",
        tip: "Frag dich vor jedem Kompromiss: Ist das wirklich auch gut für mich?",
      },
      {
        id: "vermeidend",
        title: "Der/die Vermeidende",
        emoji: "🌫️",
        gradientClass: G5,
        description: "Konflikte gehst du am liebsten aus dem Weg -- Ruhe ist dir wichtiger als Konfrontation.",
        strengths: "Deine Fähigkeit, Situationen zu deeskalieren, verhindert manch unnötigen Streit.",
        watchOut: "Zu langes Vermeiden lässt Probleme oft größer werden, statt sie zu lösen.",
        tip: "Setz dir eine kleine, klare Deadline: Nach X Tagen sprich das Thema doch aktiv an.",
      },
    ],
    questions: [
      {
        question: "Ein Konflikt bahnt sich mit einem/einer Kolleg:in an.",
        options: [
          { text: "Ich spreche es direkt und offen an", type: "konfrontativ" },
          { text: "Ich suche früh nach einer gemeinsamen Lösung", type: "vermittelnd" },
          { text: "Ich hoffe, es löst sich von allein", type: "vermeidend" },
          { text: "Ich warte lieber ab, statt es anzusprechen", type: "vermeidend" },
        ],
      },
      {
        question: "In einem Streit mit deinem Partner/deiner Partnerin bist du...",
        options: [
          { text: "...sehr direkt in dem, was mich stört", type: "konfrontativ" },
          { text: "...bemüht, schnell einen Mittelweg zu finden", type: "vermittelnd" },
          { text: "...eher still und ziehe mich zurück", type: "vermeidend" },
          { text: "...eher zurückhaltend, ich sag lieber nichts", type: "vermeidend" },
        ],
      },
      {
        question: "Zwei Freund:innen streiten sich vor dir.",
        options: [
          { text: "Ich sage klar meine Meinung dazu", type: "konfrontativ" },
          { text: "Ich versuche zu vermitteln", type: "vermittelnd" },
          { text: "Ich halte mich komplett raus", type: "vermeidend" },
          { text: "Ich misch mich da lieber nicht ein", type: "vermeidend" },
        ],
      },
      {
        question: "Jemand widerspricht dir in einer Diskussion heftig.",
        options: [
          { text: "Ich verteidige meinen Standpunkt entschieden", type: "konfrontativ" },
          { text: "Ich suche nach einer Position, die beide teilen können", type: "vermittelnd" },
          { text: "Ich lasse das Thema lieber fallen", type: "vermeidend" },
          { text: "Ich steig lieber aus der Diskussion aus", type: "vermeidend" },
        ],
      },
      {
        question: "Wie fühlt sich für dich ein offener Konflikt an?",
        options: [
          { text: "Unangenehm, aber notwendig", type: "konfrontativ" },
          { text: "Anstrengend, aber lösbar mit gutem Willen", type: "vermittelnd" },
          { text: "Sehr unangenehm, ich vermeide es lieber ganz", type: "vermeidend" },
          { text: "Richtig unangenehm, ich geh dem lieber komplett aus dem Weg", type: "vermeidend" },
        ],
      },
      {
        question: "Ein Nachbar stört sich lautstark an etwas.",
        options: [
          { text: "Ich verteidige meinen Standpunkt sofort", type: "konfrontativ" },
          { text: "Ich schlage eine Lösung vor, die für beide passt", type: "vermittelnd" },
          { text: "Ich versuche, das Gespräch möglichst kurz zu halten", type: "vermeidend" },
          { text: "Ich nicke und will die Sache schnell hinter mich bringen", type: "vermeidend" },
        ],
      },
      {
        question: "In einer Teambesprechung gibt es unterschiedliche Meinungen.",
        options: [
          { text: "Ich vertrete meine Position mit Nachdruck", type: "konfrontativ" },
          { text: "Ich moderiere zwischen den Positionen", type: "vermittelnd" },
          { text: "Ich melde mich eher zurückhaltend zu Wort", type: "vermeidend" },
          { text: "Ich halte mich mit meiner Meinung eher zurück", type: "vermeidend" },
        ],
      },
      {
        question: "Was ist dir in einem Konflikt am wichtigsten?",
        options: [
          { text: "Dass die Wahrheit klar auf den Tisch kommt", type: "konfrontativ" },
          { text: "Dass am Ende alle zufrieden sind", type: "vermittelnd" },
          { text: "Dass die Situation schnell wieder ruhig wird", type: "vermeidend" },
          { text: "Dass es einfach schnell vorbei ist", type: "vermeidend" },
        ],
      },
      {
        question: "Nach einem ausgetragenen Konflikt fühlst du dich...",
        options: [
          { text: "...erleichtert, die Dinge sind jetzt klar", type: "konfrontativ" },
          { text: "...zufrieden, wenn eine Lösung gefunden wurde", type: "vermittelnd" },
          { text: "...erschöpft, auch wenn er gut gelöst wurde", type: "vermeidend" },
          { text: "...mitgenommen, selbst wenn am Ende alles gut wurde", type: "vermeidend" },
        ],
      },
      {
        question: "Ein Familienmitglied kritisiert dich unerwartet scharf.",
        options: [
          { text: "Ich kontere sofort mit meiner eigenen Sicht", type: "konfrontativ" },
          { text: "Ich versuche, die Situation zu beruhigen", type: "vermittelnd" },
          { text: "Ich sage möglichst wenig dazu", type: "vermeidend" },
          { text: "Ich schweige lieber und lass es über mich ergehen", type: "vermeidend" },
        ],
      },
      {
        question: "Wie gehst du mit wiederkehrenden Konflikten um?",
        options: [
          { text: "Ich spreche das Muster irgendwann klar an", type: "konfrontativ" },
          { text: "Ich suche nach einer dauerhaften gemeinsamen Regelung", type: "vermittelnd" },
          { text: "Ich hoffe, dass es sich irgendwann von selbst gibt", type: "vermeidend" },
          { text: "Ich lass es lieber schleifen, statt es anzusprechen", type: "vermeidend" },
        ],
      },
      {
        question: "Was fällt dir in Konflikten am schwersten?",
        options: [
          { text: "Geduldig zu bleiben, wenn andere langsamer sind", type: "konfrontativ" },
          { text: "Auch mal für die eigene Position hart zu bleiben", type: "vermittelnd" },
          { text: "Das Thema überhaupt anzusprechen", type: "vermeidend" },
          { text: "Den ersten Schritt zu machen und es anzusprechen", type: "vermeidend" },
        ],
      },
      {
        question: "Ein Streit eskaliert emotional. Wie reagierst du?",
        options: [
          { text: "Ich bleibe bei meiner klaren Position", type: "konfrontativ" },
          { text: "Ich versuche aktiv zu beruhigen und zu vermitteln", type: "vermittelnd" },
          { text: "Ich ziehe mich am liebsten zurück", type: "vermeidend" },
          { text: "Ich flüchte am liebsten aus der Situation", type: "vermeidend" },
        ],
      },
      {
        question: "Wie oft sprichst du Probleme von dir aus an?",
        options: [
          { text: "Fast immer, sobald sie mir auffallen", type: "konfrontativ" },
          { text: "Wenn ich eine gute Lösung im Kopf habe", type: "vermittelnd" },
          { text: "Selten, meist erst, wenn es nicht mehr anders geht", type: "vermeidend" },
          { text: "Eher nie von mir aus, erst wenn's gar nicht mehr anders geht", type: "vermeidend" },
        ],
      },
      {
        question: "Was denkst du über Menschen, die Konflikte konsequent vermeiden?",
        options: [
          { text: "Das führt selten zu echten Lösungen", type: "konfrontativ" },
          { text: "Manchmal verständlich, aber nicht immer hilfreich", type: "vermittelnd" },
          { text: "Ich verstehe das gut, ich mache es oft selbst", type: "vermeidend" },
          { text: "Kann ich total nachvollziehen, mach ich ja selbst so", type: "vermeidend" },
        ],
      },
      {
        question: "Dein Umfeld würde deinen Umgang mit Konflikten beschreiben als...",
        options: [
          { text: "...direkt und unmissverständlich", type: "konfrontativ" },
          { text: "...ausgleichend und lösungsorientiert", type: "vermittelnd" },
          { text: "...zurückhaltend und konfliktscheu", type: "vermeidend" },
          { text: "...eher vermeidend, wenn's brenzlig wird", type: "vermeidend" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 20. Veränderungstyp (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "veraenderungstyp",
    title: "Wie gehst du mit Veränderungen um?",
    teaser: "Neue Situationen: Abenteuer oder Stressfaktor? Dein Umgang mit Wandel.",
    emoji: "🔄",
    estMinutes: 4,
    resultTypes: [
      {
        id: "abenteurer",
        title: "Der/die Abenteurer:in",
        emoji: "🧗",
        gradientClass: G6,
        description: "Veränderung ist für dich aufregend -- du stürzt dich gerne ins Neue.",
        strengths: "Deine Offenheit für Neues bringt frischen Schwung in jede Situation.",
        watchOut: "Manchmal unterschätzt du die Vorteile von Bewährtem und Stabilität.",
        tip: "Nimm dir bei großen Veränderungen bewusst Zeit, das Alte zu würdigen, bevor du weiterziehst.",
      },
      {
        id: "anpasser",
        title: "Der/die Anpassungsfähige",
        emoji: "🌊",
        gradientClass: G7,
        description: "Du brauchst kurz Zeit, findest dich aber meist schnell in neue Situationen ein.",
        strengths: "Deine Flexibilität hilft dir, dich in fast jeder neuen Lage schnell zurechtzufinden.",
        watchOut: "Achte darauf, dass du dich nicht zu schnell an Dinge anpasst, die dir eigentlich nicht guttun.",
        tip: "Frag dich bei jeder Anpassung kurz, ob sie wirklich zu dir passt -- oder nur bequem ist.",
      },
      {
        id: "traditionalist",
        title: "Der/die Traditionalist:in",
        emoji: "🏠",
        gradientClass: G2,
        description: "Bewährtes gibt dir Sicherheit -- Veränderungen begegnest du am liebsten mit Vorsicht.",
        strengths: "Deine Stabilität gibt anderen in unsicheren Zeiten Halt und Orientierung.",
        watchOut: "Zu viel Festhalten am Bekannten kann dich davon abhalten, echte Chancen zu ergreifen.",
        tip: "Probier bewusst kleine, unbedeutende Veränderungen aus, um dich an neue Situationen zu gewöhnen.",
      },
    ],
    questions: [
      {
        question: "Dein Arbeitgeber kündigt größere Umstrukturierungen an.",
        options: [
          { text: "Spannend, mal sehen, was sich ergibt", type: "abenteurer" },
          { text: "Ich warte ab und passe mich an, was kommt", type: "anpasser" },
          { text: "Ich mache mir Sorgen um Bewährtes", type: "traditionalist" },
          { text: "Ich frage mich, was das für das Bestehende bedeutet", type: "traditionalist" },
        ],
      },
      {
        question: "Ein spontaner Umzug in eine neue Stadt wird vorgeschlagen.",
        options: [
          { text: "Klingt aufregend, warum nicht!", type: "abenteurer" },
          { text: "Ich müsste mich erst dran gewöhnen, aber machbar", type: "anpasser" },
          { text: "Eher nicht, ich bin hier verwurzelt", type: "traditionalist" },
          { text: "Lieber nicht, ich häng an meinem jetzigen Zuhause", type: "traditionalist" },
        ],
      },
      {
        question: "Eine neue Software wird plötzlich bei der Arbeit eingeführt.",
        options: [
          { text: "Cool, ich probiere sie sofort aus", type: "abenteurer" },
          { text: "Ich lerne sie zügig, auch wenn's Umstellung braucht", type: "anpasser" },
          { text: "Ich hätte die alte lieber behalten", type: "traditionalist" },
          { text: "Ich vermisse die vertraute alte Version", type: "traditionalist" },
        ],
      },
      {
        question: "Deine Lieblingsroutine wird durch äußere Umstände unterbrochen.",
        options: [
          { text: "Kein Problem, ich finde eine neue Routine", type: "abenteurer" },
          { text: "Ich brauche kurz, dann finde ich mich zurecht", type: "anpasser" },
          { text: "Das bringt mich ziemlich durcheinander", type: "traditionalist" },
          { text: "Das wirft mich ziemlich aus der Bahn", type: "traditionalist" },
        ],
      },
      {
        question: "Wie fühlst du dich vor einem neuen Lebensabschnitt (Job, Umzug, etc.)?",
        options: [
          { text: "Aufgeregt und voller Vorfreude", type: "abenteurer" },
          { text: "Gemischt, aber grundsätzlich zuversichtlich", type: "anpasser" },
          { text: "Eher nervös und unsicher", type: "traditionalist" },
          { text: "Eher angespannt, ich mag Gewohntes lieber", type: "traditionalist" },
        ],
      },
      {
        question: "Ein Freundeskreis verändert sich stark durch neue Mitglieder.",
        options: [
          { text: "Toll, mehr neue Leute kennenlernen", type: "abenteurer" },
          { text: "Ich öffne mich, brauche aber etwas Zeit", type: "anpasser" },
          { text: "Ich vermisse die alte, vertraute Dynamik", type: "traditionalist" },
          { text: "Mir fehlt die alte, eingespielte Gruppe", type: "traditionalist" },
        ],
      },
      {
        question: "Wie planst du Veränderungen in deinem Leben?",
        options: [
          { text: "Ich stürze mich einfach rein", type: "abenteurer" },
          { text: "Mit etwas Vorbereitung, dann geht's los", type: "anpasser" },
          { text: "Sehr behutsam, mit viel Bedenkzeit", type: "traditionalist" },
          { text: "Sehr vorsichtig, ich brauch lange zum Überlegen", type: "traditionalist" },
        ],
      },
      {
        question: "Was überwiegt bei dir vor einer großen Veränderung?",
        options: [
          { text: "Neugier und Vorfreude", type: "abenteurer" },
          { text: "Eine Mischung aus Respekt und Zuversicht", type: "anpasser" },
          { text: "Sorge um das, was verloren geht", type: "traditionalist" },
          { text: "Die Angst, etwas Wichtiges zu verlieren", type: "traditionalist" },
        ],
      },
      {
        question: "Rückblickend auf deine größten Veränderungen im Leben...",
        options: [
          { text: "...waren fast alle eine gute Entscheidung", type: "abenteurer" },
          { text: "...haben sich die meisten gut eingespielt", type: "anpasser" },
          { text: "...hätte ich mir manche auch sparen können", type: "traditionalist" },
          { text: "...hätte ich lieber manches beim Alten gelassen", type: "traditionalist" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 21. Filmcharakter-Test (mittel, 9 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "filmcharakter-test",
    title: "Welcher Filmcharakter bist du?",
    teaser: "Von Held bis Antiheld -- welcher Filmtyp steckt wirklich in dir?",
    emoji: "🎬",
    estMinutes: 4,
    resultTypes: [
      {
        id: "held",
        title: "Der/die klassische Held:in",
        emoji: "🦸",
        gradientClass: G4,
        description: "Du kämpfst für das Richtige, auch wenn es unbequem ist -- typisches Helden-Material.",
        strengths: "Deine Prinzipientreue und dein Mut inspirieren die Menschen um dich herum.",
        watchOut: "Auch Held:innen brauchen mal eine Pause -- vergiss die Selbstfürsorge nicht.",
        tip: "Gönn dir bewusst Momente, in denen du nicht für andere kämpfen musst.",
      },
      {
        id: "antiheld",
        title: "Der/die Antiheld:in",
        emoji: "🕶️",
        gradientClass: G5,
        description: "Du gehst deinen eigenen Weg, mit Ecken und Kanten -- weder ganz gut, noch ganz böse.",
        strengths: "Deine Vielschichtigkeit macht dich unberechenbar spannend und authentisch.",
        watchOut: "Manchmal wirkt deine Kompliziertheit auf andere schwer greifbar.",
        tip: "Zeig ruhig öfter auch deine weichere Seite -- das macht dich noch nahbarer.",
      },
      {
        id: "sidekick",
        title: "Der/die treue Weggefährt:in",
        emoji: "🎒",
        gradientClass: G3,
        description: "Loyal, humorvoll und unverzichtbar -- ohne dich würde manches Abenteuer scheitern.",
        strengths: "Deine Loyalität und dein Humor halten jedes Team zusammen, wenn's hart wird.",
        watchOut: "Achte darauf, auch mal selbst im Rampenlicht zu stehen, statt nur zu unterstützen.",
        tip: "Trau dich, auch eigene Ideen aktiv einzubringen, statt nur zu unterstützen.",
      },
    ],
    questions: [
      {
        question: "In einer Krise übernimmst du am ehesten...",
        options: [
          { text: "...die Verantwortung und den Kampf ums Richtige", type: "held" },
          { text: "...einen eigenwilligen, unkonventionellen Lösungsweg", type: "antiheld" },
          { text: "...die Unterstützung derer, die vorne kämpfen", type: "sidekick" },
          { text: "...denen den Rücken freihalten, die vorne kämpfen", type: "sidekick" },
        ],
      },
      {
        question: "Deine Moral in schwierigen Situationen ist...",
        options: [
          { text: "...klar, ich weiß, was richtig ist", type: "held" },
          { text: "...komplex, es gibt selten nur schwarz oder weiß", type: "antiheld" },
          { text: "...an das gebunden, was das Team braucht", type: "sidekick" },
          { text: "...danach ausgerichtet, was der Gruppe am meisten hilft", type: "sidekick" },
        ],
      },
      {
        question: "In einer Gruppen-Mission wärst du am liebsten...",
        options: [
          { text: "...die anführende Figur", type: "held" },
          { text: "...der/die geheimnisvolle Einzelgänger:in mit eigenem Plan", type: "antiheld" },
          { text: "...die verlässliche Unterstützung im Hintergrund", type: "sidekick" },
          { text: "...die treue Stütze an der Seite der Hauptfigur", type: "sidekick" },
        ],
      },
      {
        question: "Wie gehst du mit Regeln um?",
        options: [
          { text: "Ich halte mich meist genau daran", type: "held" },
          { text: "Ich breche sie, wenn's dem Ziel dient", type: "antiheld" },
          { text: "Ich orientiere mich an dem, was die Gruppe entscheidet", type: "sidekick" },
          { text: "Ich halte mich an das, worauf sich die Gruppe einigt", type: "sidekick" },
        ],
      },
      {
        question: "Was treibt dich am meisten an?",
        options: [
          { text: "Etwas Gutes für andere zu bewirken", type: "held" },
          { text: "Meinen eigenen Weg zu gehen", type: "antiheld" },
          { text: "Für die Menschen da zu sein, die mir wichtig sind", type: "sidekick" },
          { text: "Denen den Rücken zu stärken, die ich liebe", type: "sidekick" },
        ],
      },
      {
        question: "In einem Film wärst du am liebsten der Charakter, der...",
        options: [
          { text: "...am Ende das Böse besiegt", type: "held" },
          { text: "...die überraschendste Entwicklung durchmacht", type: "antiheld" },
          { text: "...mit Humor für Erleichterung sorgt", type: "sidekick" },
          { text: "...mit einem guten Spruch die Stimmung rettet", type: "sidekick" },
        ],
      },
      {
        question: "Deine größte Stärke im Team ist...",
        options: [
          { text: "...Entschlossenheit und klare Führung", type: "held" },
          { text: "...unkonventionelle, überraschende Lösungen", type: "antiheld" },
          { text: "...Loyalität und emotionale Unterstützung", type: "sidekick" },
          { text: "...Treue und ein offenes Ohr für andere", type: "sidekick" },
        ],
      },
      {
        question: "Wie reagierst du auf Ungerechtigkeit?",
        options: [
          { text: "Ich stelle mich sofort dagegen", type: "held" },
          { text: "Ich handle auf meine eigene, ungewöhnliche Weise", type: "antiheld" },
          { text: "Ich unterstütze die, die dagegen ankämpfen", type: "sidekick" },
          { text: "Ich steh denen zur Seite, die sich wehren", type: "sidekick" },
        ],
      },
      {
        question: "Am Ende der Geschichte willst du...",
        options: [
          { text: "...als klare:r Gewinner:in des Guten dastehen", type: "held" },
          { text: "...eine überraschende, eigene Wendung genommen haben", type: "antiheld" },
          { text: "...den Menschen geholfen haben, die es gebraucht haben", type: "sidekick" },
          { text: "...für die da gewesen sein, die mich gebraucht haben", type: "sidekick" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 22. Jahrzehnt-Test (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "jahrzehnt-test",
    title: "Welches Jahrzehnt passt zu dir?",
    teaser: "60er-Flair, 90er-Vibe oder doch ganz Gegenwart -- dein Lebensgefühl im Jahrzehnt-Check.",
    emoji: "📻",
    estMinutes: 2,
    resultTypes: [
      {
        id: "70er",
        title: "70er-Seele",
        emoji: "🕺",
        gradientClass: G6,
        description: "Freiheit, Musik und ein entspanntes Lebensgefühl -- du tickst wie die 70er.",
        strengths: "Deine entspannte, freiheitsliebende Art zieht Menschen magisch an.",
        watchOut: "Manchmal könnte dir etwas mehr Struktur im Alltag guttun.",
        tip: "Verbinde deine Leichtigkeit mit einem kleinen, festen Ankerpunkt im Alltag.",
      },
      {
        id: "90er",
        title: "90er-Kind im Herzen",
        emoji: "📼",
        gradientClass: G7,
        description: "Nostalgisch, unbeschwert und ein bisschen rebellisch -- typisch 90er-Lebensgefühl.",
        strengths: "Deine unbeschwerte Neugier macht das Leben um dich herum bunter.",
        watchOut: "Achte darauf, dass Nostalgie dich nicht davon abhält, Neues auszuprobieren.",
        tip: "Nimm dein 90er-Gefühl und kombiniere es bewusst mit etwas ganz Neuem.",
      },
      {
        id: "gegenwart",
        title: "Ganz im Hier und Jetzt",
        emoji: "📱",
        gradientClass: G2,
        description: "Du lebst voll in der Gegenwart -- kein Jahrzehnt zieht dich zurück.",
        strengths: "Deine Bodenständigkeit im Jetzt macht dich extrem anpassungsfähig an alles Neue.",
        watchOut: "Ein bisschen mehr Nostalgie könnte dir manchmal guttun -- Innehalten lohnt sich.",
        tip: "Gönn dir ab und zu bewusst einen nostalgischen Moment, ganz ohne Grund.",
      },
    ],
    questions: [
      {
        question: "Deine Lieblingsmusik kommt am ehesten aus...",
        options: [
          { text: "...den 70ern, Soul und Rock", type: "70er" },
          { text: "...den 90ern, Pop und Grunge", type: "90er" },
          { text: "...heute, aktuelle Charts und Playlists", type: "gegenwart" },
          { text: "...den aktuellen Streaming-Charts von jetzt", type: "gegenwart" },
        ],
      },
      {
        question: "Dein idealer Abend besteht aus...",
        options: [
          { text: "...Vinyl auflegen und entspannen", type: "70er" },
          { text: "...einer alten VHS-Kassette oder Retro-Game", type: "90er" },
          { text: "...Streaming und den neuesten Serien", type: "gegenwart" },
          { text: "...dem neuesten Serien-Release zum Bingen", type: "gegenwart" },
        ],
      },
      {
        question: "Dein Kleidungsstil würde am ehesten passen zu...",
        options: [
          { text: "...Schlaghosen und Flower-Power", type: "70er" },
          { text: "...Baggy-Jeans und Bandshirts", type: "90er" },
          { text: "...aktuellen Trends von heute", type: "gegenwart" },
          { text: "...dem, was gerade angesagt ist", type: "gegenwart" },
        ],
      },
      {
        question: "Wie kommunizierst du am liebsten mit Freund:innen?",
        options: [
          { text: "Persönlich, von Angesicht zu Angesicht", type: "70er" },
          { text: "Anrufe und handgeschriebene Nachrichten", type: "90er" },
          { text: "Chat, Social Media, ständig erreichbar", type: "gegenwart" },
          { text: "Über Apps, jederzeit und überall erreichbar", type: "gegenwart" },
        ],
      },
      {
        question: "Was beschreibt dein Lebensgefühl am besten?",
        options: [
          { text: "Frei, entspannt, im Hier leben", type: "70er" },
          { text: "Nostalgisch und ein bisschen rebellisch", type: "90er" },
          { text: "Vernetzt, schnell, immer up to date", type: "gegenwart" },
          { text: "Digital, dynamisch, immer am Puls der Zeit", type: "gegenwart" },
        ],
      },
      {
        question: "Ein Filmabend -- welches Genre wählst du?",
        options: [
          { text: "Ein entspannter Klassiker", type: "70er" },
          { text: "Ein nostalgischer 90er-Kultfilm", type: "90er" },
          { text: "Der neueste Streaming-Hit", type: "gegenwart" },
          { text: "Was gerade frisch releast wurde", type: "gegenwart" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 23. Serie oder Buch (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "serie-oder-buch",
    title: "Team Serie oder Team Buch?",
    teaser: "Bingewatchen oder Seiten umblättern -- und was das über dich verrät.",
    emoji: "📺",
    estMinutes: 2,
    resultTypes: [
      {
        id: "serie",
        title: "Team Serie",
        emoji: "📺",
        gradientClass: G6,
        description: "Bilder, Sound und ein guter Cliffhanger -- so entspannst du dich am liebsten.",
        strengths: "Du genießt gemeinsame Serienabende und geteilte Fan-Momente mit anderen.",
        watchOut: "Achte darauf, dass 'nur noch eine Folge' nicht regelmäßig deinen Schlaf raubt.",
        tip: "Leg dir bewusst eine feste Episoden-Grenze für den Abend fest.",
      },
      {
        id: "buch",
        title: "Team Buch",
        emoji: "📖",
        gradientClass: G5,
        description: "Deine eigene Fantasie malt die Bilder -- Bücher geben dir das intensivere Erlebnis.",
        strengths: "Deine Vorstellungskraft und Konzentrationsfähigkeit sind durch viel Lesen geschult.",
        watchOut: "Manchmal verpasst du gemeinsame Serien-Momente mit Freund:innen.",
        tip: "Teil deine Lieblingsbücher aktiv mit anderen -- ein Buchclub kann Spaß machen.",
      },
      {
        id: "beides",
        title: "Genussmensch beider Welten",
        emoji: "🍿",
        gradientClass: G4,
        description: "Ob Serie oder Buch -- du genießt beides, je nach Stimmung und Lust.",
        strengths: "Deine Offenheit für beide Medien gibt dir immer die passende Option zur Hand.",
        watchOut: "Manchmal fällt dir die Wahl schwer, wenn beides gleichermaßen lockt.",
        tip: "Leg dir feste 'Lese-' und 'Serien-Tage' fest, damit beides gleichermaßen Raum bekommt.",
      },
    ],
    questions: [
      {
        question: "Ein freier Abend -- deine erste Wahl?",
        options: [
          { text: "Streaming-Dienst öffnen", type: "serie" },
          { text: "Ein gutes Buch aufschlagen", type: "buch" },
          { text: "Kommt auf die Stimmung an", type: "beides" },
          { text: "Je nachdem, worauf ich gerade Lust hab", type: "beides" },
        ],
      },
      {
        question: "Wie erlebst du eine Geschichte am liebsten?",
        options: [
          { text: "Mit Bildern, Musik und Schauspiel", type: "serie" },
          { text: "Mit meiner eigenen Vorstellungskraft", type: "buch" },
          { text: "Beides hat seinen eigenen Reiz", type: "beides" },
          { text: "Beides zieht mich auf seine eigene Art rein", type: "beides" },
        ],
      },
      {
        question: "Wie oft 'binge' du etwas komplett durch?",
        options: [
          { text: "Ständig, ganze Staffeln an einem Wochenende", type: "serie" },
          { text: "Ja, aber eher mit Büchern über Nacht", type: "buch" },
          { text: "Beides schon vorgekommen", type: "beides" },
          { text: "Kommt vor, bei beidem gleichermaßen", type: "beides" },
        ],
      },
      {
        question: "Vor dem Schlafengehen greifst du am ehesten zu...",
        options: [
          { text: "...dem Tablet für eine Folge", type: "serie" },
          { text: "...einem Buch zum Runterkommen", type: "buch" },
          { text: "...beidem, je nach Müdigkeit", type: "beides" },
          { text: "...mal dem einen, mal dem anderen", type: "beides" },
        ],
      },
      {
        question: "Freunde empfehlen dir eine neue Geschichte -- wie reagierst du am liebsten?",
        options: [
          { text: "Toll, sofort die Serie starten", type: "serie" },
          { text: "Klingt gut, ich besorge mir das Buch", type: "buch" },
          { text: "Kommt drauf an, was verfügbar ist", type: "beides" },
          { text: "Ich schau einfach, was sich gerade anbietet", type: "beides" },
        ],
      },
      {
        question: "Was fasziniert dich an guten Geschichten am meisten?",
        options: [
          { text: "Die visuelle Umsetzung und Atmosphäre", type: "serie" },
          { text: "Die Sprache und die eigene Vorstellungskraft", type: "buch" },
          { text: "Beides trägt gleichermaßen zur Faszination bei", type: "beides" },
          { text: "Beides fesselt mich auf seine eigene Weise", type: "beides" },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 24. Fabelwesen-Test (kurz, 6 Fragen)
  // ---------------------------------------------------------------------
  {
    slug: "fabelwesen-test",
    title: "Welches Fabelwesen steckt in dir?",
    teaser: "Drache, Fee, Phönix oder Einhorn -- dein mythisches Alter Ego.",
    emoji: "🐉",
    estMinutes: 2,
    resultTypes: [
      {
        id: "drache",
        title: "Drache",
        emoji: "🐉",
        gradientClass: G6,
        description: "Stark, stolz und beschützend -- du wachst über das, was dir wichtig ist.",
        strengths: "Deine Stärke und Entschlossenheit machen dich zur echten Beschützer:in deines Umfelds.",
        watchOut: "Achte darauf, dass dein Beschützerinstinkt nicht in Kontrolle umschlägt.",
        tip: "Lass anderen ruhig auch mal Raum, ihre eigenen Kämpfe zu bestehen.",
      },
      {
        id: "phoenix",
        title: "Phönix",
        emoji: "🔥",
        gradientClass: G4,
        description: "Egal, was passiert -- du stehst immer wieder auf, stärker als zuvor.",
        strengths: "Deine Resilienz inspiriert andere dazu, auch nach Rückschlägen weiterzumachen.",
        watchOut: "Gönn dir nach jedem 'Wiederaufstehen' auch bewusst Zeit zum Erholen.",
        tip: "Nicht jeder Rückschlag braucht sofort ein neues großes Comeback -- manchmal reicht ruhige Erholung.",
      },
      {
        id: "einhorn",
        title: "Einhorn",
        emoji: "🦄",
        gradientClass: G1,
        description: "Sanft, besonders und ein bisschen magisch -- du bringst Freude, wo du hingehst.",
        strengths: "Deine positive, einzigartige Ausstrahlung verzaubert die Menschen um dich herum.",
        watchOut: "Achte darauf, dass deine sanfte Art nicht ausgenutzt wird.",
        tip: "Zeig ruhig öfter, dass auch du klare Grenzen setzen kannst.",
      },
    ],
    questions: [
      {
        question: "In einer Gruppe von Freund:innen übernimmst du am ehesten...",
        options: [
          { text: "...die beschützende Rolle", type: "drache" },
          { text: "...die motivierende Rolle nach Rückschlägen", type: "phoenix" },
          { text: "...die verbindende, positive Stimmung", type: "einhorn" },
          { text: "...die, die gute Laune verbreitet", type: "einhorn" },
        ],
      },
      {
        question: "Nach einem herben Rückschlag...",
        options: [
          { text: "...kämpfe ich sofort um das, was mir wichtig ist", type: "drache" },
          { text: "...stehe ich wieder auf, stärker als zuvor", type: "phoenix" },
          { text: "...suche ich Trost bei mir wichtigen Menschen", type: "einhorn" },
          { text: "...hole ich mir Kraft aus schönen Momenten", type: "einhorn" },
        ],
      },
      {
        question: "Was beschreibt deine Aura am besten?",
        options: [
          { text: "Stark und respekteinflößend", type: "drache" },
          { text: "Unzerstörbar und wandlungsfähig", type: "phoenix" },
          { text: "Sanft, magisch und einzigartig", type: "einhorn" },
          { text: "Verspielt, leuchtend und besonders", type: "einhorn" },
        ],
      },
      {
        question: "Wie gehst du mit Bedrohungen für Menschen um, die dir wichtig sind?",
        options: [
          { text: "Ich stelle mich sofort schützend davor", type: "drache" },
          { text: "Ich helfe ihnen, gestärkt daraus hervorzugehen", type: "phoenix" },
          { text: "Ich versuche, mit Sanftheit zu beruhigen", type: "einhorn" },
          { text: "Ich versuche, mit Wärme die Lage zu entschärfen", type: "einhorn" },
        ],
      },
      {
        question: "Dein Lebensmotto wäre am ehesten...",
        options: [
          { text: "'Ich beschütze, was mir wichtig ist'", type: "drache" },
          { text: "'Aus der Asche steige ich wieder auf'", type: "phoenix" },
          { text: "'Ich bringe Magie in den Alltag'", type: "einhorn" },
          { text: "'Ich verzaubere den Alltag ein kleines bisschen'", type: "einhorn" },
        ],
      },
      {
        question: "In einer Fantasy-Welt wärst du am liebsten...",
        options: [
          { text: "...ein mächtiger Wächter über ein Reich", type: "drache" },
          { text: "...ein Wesen, das nie wirklich untergeht", type: "phoenix" },
          { text: "...ein Wesen, das Hoffnung und Freude verbreitet", type: "einhorn" },
          { text: "...ein Wesen, das Licht in dunkle Momente bringt", type: "einhorn" },
        ],
      },
    ],
  },
];
