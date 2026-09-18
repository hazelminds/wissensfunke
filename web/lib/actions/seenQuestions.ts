"use server";

import { getCurrentUser } from "@/lib/auth";
import { saveSeenQuestions } from "@/lib/seenQuestionsServer";

/** Wird direkt aus QuizPlayer aufgerufen (nicht über ein Formular), nach
 * jeder gezogenen Runde -- no-op für Gäste (die laufen über localStorage),
 * verschluckt jeden Fehler, damit ein DB-Hänger nie den Spielfluss stört. */
export async function saveSeenQuestionsAction(slug: string, keys: string[]): Promise<void> {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    await saveSeenQuestions(user.id, slug, keys);
  } catch {
    // Tracking ist nice-to-have, nie blockierend fürs Spielerlebnis.
  }
}
