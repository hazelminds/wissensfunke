import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
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
    default: "Noggl",
    template: "%s · Noggl",
  },
  description:
    "Kurzweilige Denkspiele für zwischendurch — Rätsel, Quiz und Selbst-Tests, täglich neu, ohne Gewinnmöglichkeit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="min-h-screen font-body antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
