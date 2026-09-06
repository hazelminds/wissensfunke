import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

/**
 * Bootstrap-Allowlist über ADMIN_EMAILS (kommagetrennt) -- die einzige
 * Möglichkeit, den allerersten Admin zu ernennen, bevor die admin_users-
 * Tabelle irgendwen enthält. Danach läuft die echte Rechteverwaltung über
 * die Datenbank (siehe isAdminUser/grantAdmin/revokeAdmin).
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}

/**
 * Echte Rechteprüfung: Bootstrap-E-Mail ODER Eintrag in admin_users.
 * Serverseitig, per Service-Role-Client -- kein Nutzer kann diese Tabelle
 * selbst lesen (keine RLS-Policies für anon/authenticated).
 */
export async function isAdminUser(
  userId: string | null | undefined,
  email: string | null | undefined,
): Promise<boolean> {
  if (isAdminEmail(email)) return true;
  if (!userId || !isSupabaseConfigured()) return false;

  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return Boolean(data);
}
