import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

/** Kontogebundener Stand für eingeloggte Nutzer:innen -- siehe lib/seenQuestions.ts
 * für die Sampling-Logik und die Gast-Fallbacks über localStorage. */
export async function getSeenQuestions(userId: string, slug: string): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("seen_questions")
    .select("keys")
    .eq("user_id", userId)
    .eq("quiz_slug", slug)
    .maybeSingle();
  return data?.keys ?? [];
}

export async function saveSeenQuestions(userId: string, slug: string, keys: string[]): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabaseAdmin();
  await supabase
    .from("seen_questions")
    .upsert({ user_id: userId, quiz_slug: slug, keys, updated_at: new Date().toISOString() });
}
