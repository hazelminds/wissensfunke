import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { GameOfDay } from "@/components/home/GameOfDay";
import { StreakBanner } from "@/components/home/StreakBanner";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { AnnouncementBanner } from "@/components/home/AnnouncementBanner";
import { getCurrentAnnouncement } from "@/lib/announcements";

export default async function HomePage() {
  const announcement = await getCurrentAnnouncement();

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader />
      {announcement && <AnnouncementBanner id={announcement.id} message={announcement.message} />}
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
