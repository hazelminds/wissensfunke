import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";
import { berlinToday } from "@/lib/berlinDate";

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

/** Alle aktuell gültigen Ankündigungen für die Startseite -- aktiv UND
 * heute innerhalb ihres Zeitraums, älteste zuerst. Mehrere gleichzeitig
 * gültige lässt der Banner im Karussell durchrotieren. */
export async function getCurrentAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const today = berlinToday();
  const { data } = await supabase
    .from("announcements")
    .select("id, message, active, start_date, end_date, created_at")
    .eq("active", true)
    .lte("start_date", today)
    .gte("end_date", today)
    .order("created_at", { ascending: true });
  return (data ?? []).map(toAnnouncement);
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
