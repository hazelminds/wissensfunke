import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Wissensfunke",
    template: "%s · Wissensfunke",
  },
  description:
    "Rätsel, Quiz und Selbst-Tests zur reinen Unterhaltung — täglich neu, ohne Gewinnmöglichkeit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}
