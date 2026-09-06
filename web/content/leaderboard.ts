/**
 * Bestenlisten-Beispieldaten -- Platzhalter bis echte Scores aus Supabase
 * kommen (Task: Datenbank-Migration). Struktur bewusst 1:1 wie im
 * Base44-Vorbild: getrennte Ranglisten für Quiz und Puzzle, Zeit + Punkte.
 */

export interface LeaderboardEntry {
  username: string;
  subtitle: string;
  timeLabel: string;
  points: number;
}

export const leaderboards: Record<"quiz" | "puzzle", LeaderboardEntry[]> = {
  quiz: [
    { username: "NoraKnobelt", subtitle: "Weltereignisse XXL", timeLabel: "2:00", points: 520 },
    { username: "RätselFuchs", subtitle: "Filmzitate", timeLabel: "1:35", points: 480 },
    { username: "QuizKönig", subtitle: "Filmzitate", timeLabel: "1:10", points: 460 },
    { username: "PixelPia", subtitle: "Filmzitate", timeLabel: "1:28", points: 430 },
    { username: "SchnellStef", subtitle: "Filmzitate", timeLabel: "1:40", points: 400 },
  ],
  puzzle: [
    { username: "SchiebeProfi", subtitle: "Bilder-Puzzle", timeLabel: "0:48", points: 2180 },
    { username: "TüftlerTom", subtitle: "Bilder-Puzzle", timeLabel: "1:02", points: 1960 },
    { username: "KachelKate", subtitle: "Wer bin ich?", timeLabel: "0:35", points: 820 },
    { username: "LogikLuis", subtitle: "Bilder-Puzzle", timeLabel: "1:20", points: 1740 },
    { username: "RaetselRia", subtitle: "Wer bin ich?", timeLabel: "0:52", points: 640 },
  ],
};
