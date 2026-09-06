import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

/** Base44-Vorbild nutzt exakt diese beiden Google Fonts -- 1:1 übernommen. */
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Noggl",
    template: "%s · Noggl",
  },
  description:
    "Kurzweilige Denkspiele für zwischendurch — Rätsel, Quiz und Selbst-Tests, täglich neu, ohne Gewinnmöglichkeit.",
  // Noch in Entwicklung (kein Zahlungsanbieter aktiv, Rechtstexte nur Entwurf) — erst aus dem
  // Index nehmen lassen, wenn die Seite wirklich startklar ist.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="min-h-screen font-body antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
