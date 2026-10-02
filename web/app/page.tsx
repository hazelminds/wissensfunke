import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { GameOfDay } from "@/components/home/GameOfDay";
import { StreakBanner } from "@/components/home/StreakBanner";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { AnnouncementBanner } from "@/components/home/AnnouncementBanner";
import { getCurrentAnnouncements } from "@/lib/announcements";

export default async function HomePage() {
  const announcements = await getCurrentAnnouncements();

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      {announcements.length > 0 && <AnnouncementBanner announcements={announcements} />}
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
