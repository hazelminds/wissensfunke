import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
    <html lang="de" className={`${bricolage.variable} ${nunito.variable}`}>
      <body className="min-h-screen font-body antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
