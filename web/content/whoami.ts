/**
 * "Wer bin ich?" -- Hinweis-Rätsel-Pool (Base44-Vorbild). Jeder Satz ist ein
 * Hinweis, vom vagsten zum eindeutigsten sortiert. Faktenbasiert zu real
 * existierenden, historisch dokumentierten Persönlichkeiten (öffentliches
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
    slug: "einstein",
    hints: [
      "Ich wurde 1879 in Deutschland geboren.",
      "Als Kind soll ich erst relativ spät sprechen gelernt haben.",
      "Ich habe unser Verständnis von Raum und Zeit revolutioniert.",
      "Meine berühmteste Formel lautet E = mc².",
      "1921 bekam ich den Nobelpreis für Physik.",
      "Bekannt bin ich auch für meine wilde, weiße Haarpracht.",
    ],
    solution: "Albert Einstein",
    aliases: ["Einstein"],
  },
];

export function getWhoAmIRound(slug: string): WhoAmIRound | undefined {
  return whoAmIRounds.find((r) => r.slug === slug);
}
