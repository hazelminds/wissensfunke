import "server-only";
import { isSupabaseConfigured } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export interface AdminUserRow {
  id: string;
  email: string | null;
  createdAt: string;
  purchaseCount: number;
  purchaseTotalCents: number;
  isAdmin: boolean;
  /** true = Admin nur über die ADMIN_EMAILS-Bootstrap-Variable, nicht über
   * die admin_users-Tabelle -- lässt sich hier nicht entziehen. */
  isBootstrapAdmin: boolean;
}

/** Echte Nutzerliste aus Supabase Auth, angereichert mit Käufen + Admin-Status. */
export async function listAdminUsers(): Promise<AdminUserRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();

  const [{ data: usersPage }, { data: purchases }, { data: admins }] = await Promise.all([
    supabase.auth.admin.listUsers({ perPage: 1000 }),
    supabase.from("purchases").select("user_id, amount_cents").eq("status", "paid"),
    supabase.from("admin_users").select("user_id"),
  ]);

  const purchaseMap = new Map<string, { count: number; total: number }>();
  (purchases ?? []).forEach((p) => {
    if (!p.user_id) return;
    const entry = purchaseMap.get(p.user_id) ?? { count: 0, total: 0 };
    entry.count += 1;
    entry.total += p.amount_cents;
    purchaseMap.set(p.user_id, entry);
  });

  const adminIds = new Set((admins ?? []).map((a) => a.user_id));

  return (usersPage?.users ?? [])
    .map((u) => {
      const bootstrap = isAdminEmail(u.email);
      return {
        id: u.id,
        email: u.email ?? null,
        createdAt: u.created_at,
        purchaseCount: purchaseMap.get(u.id)?.count ?? 0,
        purchaseTotalCents: purchaseMap.get(u.id)?.total ?? 0,
        isAdmin: bootstrap || adminIds.has(u.id),
        isBootstrapAdmin: bootstrap,
      };
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/** Ernennt userId zum Admin. Prüft NICHT selbst, ob der Aufrufer berechtigt
 * ist -- das muss der Aufrufer (die Server Action) vorher sicherstellen. */
export async function grantAdmin(userId: string, grantedBy: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("admin_users").upsert({ user_id: userId, granted_by: grantedBy });
}

/** Entzieht userId die Admin-Rechte (nur den DB-Eintrag -- eine
 * Bootstrap-E-Mail in ADMIN_EMAILS bleibt davon unberührt). */
export async function revokeAdmin(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("admin_users").delete().eq("user_id", userId);
}

export interface AdminStats {
  totalUsers: number;
  totalPurchases: number;
  totalRevenueCents: number;
  topQuizSlug: string | null;
}

/** Echte Kennzahlen aus Nutzern + Käufen. Punkte-/Trefferquote-Charts
 * brauchen die noch fehlende scores-Tabelle. */
export async function getAdminStats(): Promise<AdminStats> {
  if (!isSupabaseConfigured()) {
    return { totalUsers: 0, totalPurchases: 0, totalRevenueCents: 0, topQuizSlug: null };
  }
  const supabase = getSupabaseAdmin();

  const [{ data: usersPage }, { data: purchases }] = await Promise.all([
    supabase.auth.admin.listUsers({ perPage: 1000 }),
    supabase.from("purchases").select("quiz_slug, amount_cents").eq("status", "paid"),
  ]);

  const paid = purchases ?? [];
  const bySlug = new Map<string, number>();
  paid.forEach((p) => bySlug.set(p.quiz_slug, (bySlug.get(p.quiz_slug) ?? 0) + 1));

  let topQuizSlug: string | null = null;
  let topCount = 0;
  bySlug.forEach((count, slug) => {
    if (count > topCount) {
      topCount = count;
      topQuizSlug = slug;
    }
  });

  return {
    totalUsers: usersPage?.users.length ?? 0,
    totalPurchases: paid.length,
    totalRevenueCents: paid.reduce((sum, p) => sum + p.amount_cents, 0),
    topQuizSlug,
  };
}
