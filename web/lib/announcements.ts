import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

export interface Announcement {
  id: string;
  message: string;
  active: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
}

function toAnnouncement(row: {
  id: string;
  message: string;
  active: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
}): Announcement {
  return {
    id: row.id,
    message: row.message,
    active: row.active,
    startDate: row.start_date,
    endDate: row.end_date,
    createdAt: row.created_at,
  };
}

/** Heutiges Kalenderdatum in Europa/Berlin als YYYY-MM-DD -- der Zeitraum
 * einer Ankündigung ist tagesgenau gemeint (00:01 bis 23:59 des jeweiligen
 * Tages), nicht UTC, da die Zielgruppe überwiegend in der DACH-Region ist. */
export function berlinToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Berlin" });
}

/** Die aktuell anzuzeigende Ankündigung für die Startseite -- aktiv UND
 * heute innerhalb ihres Zeitraums. Mehrere Treffer sollten im Admin
 * vermieden werden, aber falls doch: die zuletzt erstellte gewinnt. */
export async function getCurrentAnnouncement(): Promise<Announcement | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseAdmin();
  const today = berlinToday();
  const { data } = await supabase
    .from("announcements")
    .select("id, message, active, start_date, end_date, created_at")
    .eq("active", true)
    .lte("start_date", today)
    .gte("end_date", today)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? toAnnouncement(data) : null;
}

/** Alle Ankündigungen fürs Admin-Dashboard, neueste zuerst. */
export async function listAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("announcements")
    .select("id, message, active, start_date, end_date, created_at")
    .order("created_at", { ascending: false });
  return (data ?? []).map(toAnnouncement);
}

export async function createAnnouncement(message: string, startDate: string, endDate: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("announcements")
    .insert({ message, start_date: startDate, end_date: endDate, active: true });
  if (error) throw new Error(error.message);
}

export async function updateAnnouncement(
  id: string,
  message: string,
  startDate: string,
  endDate: string,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("announcements")
    .update({ message, start_date: startDate, end_date: endDate, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function setAnnouncementActive(id: string, active: boolean): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("announcements")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
