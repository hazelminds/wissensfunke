"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import {
  reportQuestion,
  getQuestionReports,
  resolveQuestionReport,
  type QuestionReportRow,
} from "@/lib/questionReports";

/** Button "Frage melden" im Quiz -- kein Login nötig (anders als Support),
 * jede:r soll eine fehlerhafte Frage melden können. Verschluckt Fehler, damit
 * ein DB-Hänger nie den Spielfluss stört. */
export async function reportQuestionAction(
  quizSlug: string,
  questionText: string,
  reason: string,
): Promise<void> {
  try {
    const user = await getCurrentUser();
    const trimmed = reason.trim().slice(0, 500);
    await reportQuestion(quizSlug, questionText, trimmed || null, user?.id ?? null);
  } catch {
    // Melde-Funktion ist nice-to-have, nie blockierend fürs Spielerlebnis.
  }
}

async function requireAdmin() {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }
}

export async function getQuestionReportsAction(): Promise<QuestionReportRow[]> {
  await requireAdmin();
  return getQuestionReports();
}

export async function resolveQuestionReportAction(id: string): Promise<void> {
  await requireAdmin();
  await resolveQuestionReport(id);
  revalidatePath("/admin");
}
