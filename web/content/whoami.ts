/**
 * "Wer bin ich?" -- Hinweis-Rätsel-Pool (Base44-Vorbild). Jeder Satz ist ein
 * Hinweis, vom vagsten zum eindeutigsten sortiert. Faktenbasiert zu real
 * existierenden bzw. bekannten fiktiven Figuren (öffentliches
 * Allgemeinwissen, keine privaten/heiklen Details).
 */

export interface WhoAmIRound {
  slug: string;
  hints: string[];
  solution: string;
  aliases: string[];
}

export const whoAmIRounds: WhoAmIRound[] = [
  {
    slug: "genie",
    hints: [
      "Ich wurde 1879 in Deutschland geboren.",
      "Als Kind soll ich erst relativ spät sprechen gelernt haben.",
      "Ich habe unser Verständnis von Raum und Zeit revolutioniert.",
      "Meine berühmteste Formel lautet E = mc².",
      "1921 bekam ich den Nobelpreis für Physik.",
      "Ich floh vor den Nationalsozialisten in die USA.",
      "Bekannt bin ich auch für meine wilde, weiße Haarpracht.",
    ],
    solution: "Albert Einstein",
    aliases: ["Einstein"],
  },
  {
    slug: "king-of-pop",
    hints: [
      "Ich wurde 1958 in Gary, Indiana, geboren.",
      "Meine Karriere begann schon als Kind in einer Familienband.",
      "Mein Album aus dem Jahr 1982 ist bis heute eines der meistverkauften Alben aller Zeiten.",
      "Mit meinem Moonwalk tanzte ich mich in die Geschichtsbücher.",
      "Man nannte mich „King of Pop“.",
      "Songs wie „Thriller“ und „Billie Jean“ stammen von mir.",
      "Ich trug oft einen einzelnen weißen Handschuh auf der Bühne.",
    ],
    solution: "Michael Jackson",
    aliases: ["Jackson", "MJ"],
  },
  {
    slug: "wahrzeichen",
    hints: [
      "Ich wurde für eine Weltausstellung errichtet.",
      "Meine Baumaterialien bestehen fast komplett aus Eisen.",
      "Ursprünglich sollte ich nach 20 Jahren wieder abgebaut werden.",
      "Bei meiner Fertigstellung 1889 war ich das höchste Bauwerk der Welt.",
      "Ich stehe an einem Fluss, der durch eine europäische Hauptstadt fließt.",
      "Nachts werde ich jede volle Stunde für ein paar Minuten zum Funkeln gebracht.",
      "Mit rund 330 Metern bin ich das Wahrzeichen von Paris.",
    ],
    solution: "Eiffelturm",
    aliases: ["Der Eiffelturm", "Eiffel Tower", "Tour Eiffel"],
  },
  {
    slug: "meisterdetektiv",
    hints: [
      "Ich wohne in einer berühmten Wohnung in London.",
      "Mein treuer Begleiter ist ein Arzt, der auch meine Fälle aufschreibt.",
      "Ich wurde von einem schottischen Schriftsteller erschaffen.",
      "Meine Beobachtungsgabe und Logik sind legendär.",
      "Ich spiele gerne Geige, wenn ich nachdenke.",
      "Mein größter Gegenspieler ist ein Professor für Mathematik.",
      "Meine Adresse lautet Baker Street 221B.",
    ],
    solution: "Sherlock Holmes",
    aliases: ["Holmes"],
  },
  {
    slug: "meisterwerk",
    hints: [
      "Ich entstand im 16. Jahrhundert in Italien.",
      "Mein Schöpfer war auch als Erfinder und Wissenschaftler tätig.",
      "Man rätselt bis heute über mein geheimnisvolles Lächeln.",
      "Ich hänge heute hinter Panzerglas in einem berühmten Museum in Paris.",
      "Ich bin ein Ölgemälde auf einer Pappelholztafel.",
      "1911 wurde ich gestohlen, was mich weltberühmt machte.",
      "Mein Titel bezieht sich vermutlich auf die Ehefrau eines Florentiner Kaufmanns.",
    ],
    solution: "Mona Lisa",
    aliases: ["Die Mona Lisa"],
  },
];

export function getWhoAmIRound(slug: string): WhoAmIRound | undefined {
  return whoAmIRounds.find((r) => r.slug === slug);
}
