import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

/** Spielt noch läuft -- Fehlerbehandlung übernimmt die aufrufende Server
 * Action, damit ein DB-Hänger nie den Spielfluss unterbricht. Der
 * Fragentext wird als Schnappschuss mitgespeichert (siehe Migration). */
export async function reportQuestion(
  quizSlug: string,
  questionText: string,
  reason: string | null,
  userId: string | null,
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseAdmin();
  await supabase.from("question_reports").insert({
    quiz_slug: quizSlug,
    question_text: questionText,
    reason,
    user_id: userId,
  });
}

export interface QuestionReportRow {
  id: string;
  quizSlug: string;
  questionText: string;
  reason: string | null;
  reporterEmail: string | null;
  status: "open" | "resolved";
  createdAt: string;
}

/** Für die Admin-Queue: neueste zuerst, E-Mail statt nur user_id (wie bei
 * getAdminTicketList). */
export async function getQuestionReports(): Promise<QuestionReportRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data: reports } = await supabase
    .from("question_reports")
    .select("id, quiz_slug, question_text, reason, user_id, status, created_at")
    .order("created_at", { ascending: false });
  if (!reports || reports.length === 0) return [];

  const userIds = [...new Set(reports.map((r) => r.user_id).filter((id): id is string => Boolean(id)))];
  const emailById = new Map<string, string | null>();
  await Promise.all(
    userIds.map(async (id) => {
      const { data } = await supabase.auth.admin.getUserById(id);
      emailById.set(id, data.user?.email ?? null);
    }),
  );

  return reports.map((r) => ({
    id: r.id,
    quizSlug: r.quiz_slug,
    questionText: r.question_text,
    reason: r.reason,
    reporterEmail: r.user_id ? (emailById.get(r.user_id) ?? null) : null,
    status: r.status,
    createdAt: r.created_at,
  }));
}

export async function getUnresolvedQuestionReportCount(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from("question_reports")
    .select("id", { count: "exact", head: true })
    .eq("status", "open");
  return count ?? 0;
}

export async function resolveQuestionReport(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("question_reports")
    .update({ status: "resolved", resolved_at: new Date().toISOString() })
    .eq("id", id);
}

/** Falls sich eine als erledigt markierte Meldung doch noch als berechtigt
 * herausstellt -- Daten (Grund, Fragentext, ...) bleiben beim Erledigen
 * ohnehin erhalten, das hier macht sie nur wieder zur offenen Meldung. */
export async function reopenQuestionReport(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("question_reports").update({ status: "open", resolved_at: null }).eq("id", id);
}
