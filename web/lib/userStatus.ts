import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

/** Supabase setzt banned_until bei einer dauerhaften Sperre auf ein Datum
 * weit in der Zukunft (z. B. Jahr 2500) statt auf null -- "in der Zukunft"
 * reicht als Kriterium, egal ob befristet oder dauerhaft gesperrt. */
export function isUserBanned(bannedUntil: string | null | undefined): boolean {
  if (!bannedUntil) return false;
  return new Date(bannedUntil).getTime() > Date.now();
}

/**
 * Für die Login-Fehlermeldung: ist genau diese E-Mail gesperrt? Supabase
 * hat keinen Admin-Lookup nach E-Mail, deshalb einmal die Liste durchsuchen
 * -- nur relevant bei einem fehlgeschlagenen Login-Versuch, nicht bei jedem
 * Request.
 */
export async function isEmailBanned(email: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const user = data?.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  return isUserBanned(user?.banned_until);
}
