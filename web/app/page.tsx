import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { GameOfDay } from "@/components/home/GameOfDay";
import { StreakBanner } from "@/components/home/StreakBanner";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      <main>
        <Hero />
        <GameOfDay />
        <StreakBanner />
        <CategoryCards />
        <FeaturedGames />
        <FaqAccordion />
      </main>
    </div>
  );
}
