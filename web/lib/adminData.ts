import "server-only";
import { isSupabaseConfigured } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getAllPlusStatuses, getPlusStatus } from "@/lib/plus";
import { isUserBanned } from "@/lib/userStatus";

export interface AdminUserRow {
  id: string;
  email: string | null;
  createdAt: string;
  /** ISO-Datum des letzten Logins -- null, wenn noch nie eingeloggt (z. B. reiner Gast-Kauf). */
  lastSignInAt: string | null;
  purchaseCount: number;
  purchaseTotalCents: number;
  isAdmin: boolean;
  /** true = Admin nur über die ADMIN_EMAILS-Bootstrap-Variable, nicht über
   * die admin_users-Tabelle -- lässt sich hier nicht entziehen. */
  isBootstrapAdmin: boolean;
  plusActive: boolean;
  /** ISO-Datum, bis wann Plus läuft -- auch gesetzt, wenn bereits abgelaufen. */
  plusUntil: string | null;
  /** true, wenn banned_until in der Zukunft liegt (Supabase-Auth-Sperre). */
  isBanned: boolean;
}

/** Echte Nutzerliste aus Supabase Auth, angereichert mit Käufen, Admin- und Plus-Status. */
export async function listAdminUsers(): Promise<AdminUserRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();

  const [{ data: usersPage }, { data: purchases }, { data: admins }, plusMap] = await Promise.all([
    supabase.auth.admin.listUsers({ perPage: 1000 }),
    supabase.from("purchases").select("user_id, amount_cents").eq("status", "paid"),
    supabase.from("admin_users").select("user_id"),
    getAllPlusStatuses(),
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
      const plus = plusMap.get(u.id);
      return {
        id: u.id,
        email: u.email ?? null,
        createdAt: u.created_at,
        lastSignInAt: u.last_sign_in_at ?? null,
        purchaseCount: purchaseMap.get(u.id)?.count ?? 0,
        purchaseTotalCents: purchaseMap.get(u.id)?.total ?? 0,
        isAdmin: bootstrap || adminIds.has(u.id),
        isBootstrapAdmin: bootstrap,
        plusActive: plus?.active ?? false,
        plusUntil: plus?.until ?? null,
        isBanned: isUserBanned(u.banned_until),
      };
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/** Legt ein Test-/Aktionskonto mit fest vergebenem, bereits bestätigtem
 * Passwort an -- kein Bestätigungslink nötig, direkt einsatzbereit. */
export async function createTestUser(email: string, password: string): Promise<{ id: string }> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) {
    throw new Error(error?.message ?? "Nutzer konnte nicht angelegt werden.");
  }
  return { id: data.user.id };
}

export interface UserAdminNote {
  id: string;
  note: string;
  createdByEmail: string | null;
  createdAt: string;
}

export interface AdminUserDetail extends AdminUserRow {
  username: string;
  notes: UserAdminNote[];
}

/** Vollständige Detailansicht für die /admin/nutzer/[id]-Seite -- dieselben
 * Felder wie AdminUserRow, plus die internen Support-Notizen. */
export async function getAdminUserDetail(userId: string): Promise<AdminUserDetail | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseAdmin();

  const [{ data: userData, error }, { data: purchases }, { data: adminRow }, plus, { data: notes }] =
    await Promise.all([
      supabase.auth.admin.getUserById(userId),
      supabase.from("purchases").select("amount_cents").eq("user_id", userId).eq("status", "paid"),
      supabase.from("admin_users").select("user_id").eq("user_id", userId).maybeSingle(),
      getPlusStatus(userId),
      supabase
        .from("user_admin_notes")
        .select("id, note, created_at, created_by")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
    ]);

  if (error || !userData.user) return null;
  const u = userData.user;
  const bootstrap = isAdminEmail(u.email);

  // Notiz-Autor:innen-E-Mails nachladen -- created_by ist nur eine user_id.
  const authorIds = [...new Set((notes ?? []).map((n) => n.created_by).filter((id): id is string => !!id))];
  const authorEmails = new Map<string, string | null>();
  await Promise.all(
    authorIds.map(async (id) => {
      const { data } = await supabase.auth.admin.getUserById(id);
      authorEmails.set(id, data.user?.email ?? null);
    }),
  );

  return {
    id: u.id,
    email: u.email ?? null,
    createdAt: u.created_at,
    lastSignInAt: u.last_sign_in_at ?? null,
    purchaseCount: purchases?.length ?? 0,
    purchaseTotalCents: (purchases ?? []).reduce((sum, p) => sum + p.amount_cents, 0),
    isAdmin: bootstrap || !!adminRow,
    isBootstrapAdmin: bootstrap,
    plusActive: plus.active,
    plusUntil: plus.until,
    isBanned: isUserBanned(u.banned_until),
    username: (u.user_metadata?.username as string | undefined) ?? "",
    notes: (notes ?? []).map((n) => ({
      id: n.id,
      note: n.note,
      createdByEmail: n.created_by ? (authorEmails.get(n.created_by) ?? null) : null,
      createdAt: n.created_at,
    })),
  };
}

/** Fügt eine interne Support-Notiz hinzu -- nur für Admins sichtbar. */
export async function addUserNote(userId: string, note: string, createdBy: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("user_admin_notes").insert({ user_id: userId, note, created_by: createdBy });
}

/** Sperrt userId dauerhaft (Supabase-Auth-Ban -- Login schlägt danach fehl). */
export async function banUser(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.auth.admin.updateUserById(userId, { ban_duration: "876000h" });
}

/** Hebt eine Sperre auf. */
export async function unbanUser(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.auth.admin.updateUserById(userId, { ban_duration: "none" });
}

/** Löscht das Konto unwiderruflich -- Käufe/Streaks/Plus-Zeilen hängen per
 * ON DELETE CASCADE dran und verschwinden mit. */
export async function deleteUserAccount(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);
}

/** Setzt den Spielernamen einer beliebigen Person -- z. B. um einen
 * unangebrachten Namen zu entfernen, unabhängig vom Plus-Status. Merged mit
 * den bestehenden user_metadata statt sie zu überschreiben. */
export async function adminSetUsername(userId: string, username: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data: existing } = await supabase.auth.admin.getUserById(userId);
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { ...existing.user?.user_metadata, username },
  });
  if (error) throw new Error(error.message);
}

/** Setzt ein neues Passwort für eine beliebige Person -- z. B. für Support-
 * Fälle, in denen jemand ausgesperrt ist. Das alte Passwort ist danach
 * ungültig; bestehende Sessions bleiben unberührt. */
export async function adminSetPassword(userId: string, password: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.auth.admin.updateUserById(userId, { password });
  if (error) throw new Error(error.message);
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

/** Echte Kennzahlen aus Nutzern + Käufen. Beliebtheits-/Lösequote-Charts pro
 * Spiel und Zeitraum kommen aus lib/analytics.ts (game_events-Tabelle). */
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
