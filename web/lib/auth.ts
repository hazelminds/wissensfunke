import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Solange kein echtes Supabase-Projekt hinterlegt ist, muss die App exakt
 * wie vorher funktionieren (kein Login, keine Abstürze) — dieser Guard hält
 * Auth komplett raus, statt mit einer leeren URL gegen Supabase zu laufen.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
