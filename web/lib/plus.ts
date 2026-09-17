import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

export interface PlusStatus {
  active: boolean;
  /** null = noch nie Plus geschenkt bekommen. In der Vergangenheit = entzogen/abgelaufen. */
  until: string | null;
}

/** Liest den aktuellen Plus-Status eines einzelnen Nutzers. */
export async function getPlusStatus(userId: string): Promise<PlusStatus> {
  if (!isSupabaseConfigured()) return { active: false, until: null };
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("plus_grants")
    .select("plus_until")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) return { active: false, until: null };
  return { active: new Date(data.plus_until).getTime() > Date.now(), until: data.plus_until };
}

/** Für die Admin-Nutzerliste: Plus-Status aller Nutzer auf einmal. */
export async function getAllPlusStatuses(): Promise<Map<string, PlusStatus>> {
  const map = new Map<string, PlusStatus>();
  if (!isSupabaseConfigured()) return map;
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("plus_grants").select("user_id, plus_until");
  (data ?? []).forEach((row) => {
    map.set(row.user_id, {
      active: new Date(row.plus_until).getTime() > Date.now(),
      until: row.plus_until,
    });
  });
  return map;
}

/**
 * Schenkt `days` Tage Plus. Verlängert ein noch aktives Geschenk ab dessen
 * bisherigem Ablaufdatum, statt es zu überschreiben -- ein bereits laufendes
 * Plus wird also verlängert, kein bereits verschenkter Zeitraum geht verloren.
 * Ein abgelaufenes/nie vorhandenes Geschenk startet ab jetzt.
 */
export async function grantPlusDays(
  userId: string,
  days: number,
  grantedBy: string,
  note?: string,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const current = await getPlusStatus(userId);
  const base = current.active && current.until ? new Date(current.until) : new Date();
  const until = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);

  await supabase.from("plus_grants").upsert({
    user_id: userId,
    plus_until: until.toISOString(),
    granted_by: grantedBy,
    note: note ?? null,
    updated_at: new Date().toISOString(),
  });
}

/** Entzieht Plus sofort (Ablaufdatum auf jetzt) -- die Zeile bleibt als Historie erhalten. */
export async function revokePlus(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("plus_grants")
    .update({ plus_until: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("user_id", userId);
}
