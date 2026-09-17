import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/auth";

export interface SupportMessage {
  id: string;
  sender: "user" | "admin";
  body: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "closed";
  updatedAt: string;
  messages: SupportMessage[];
}

function toMessage(m: { id: string; sender: "user" | "admin"; body: string; created_at: string }): SupportMessage {
  return { id: m.id, sender: m.sender, body: m.body, createdAt: m.created_at };
}

/** Neues Ticket samt erster Nachricht -- für den Support-Absenden-Button. */
export async function createSupportTicket(
  userId: string,
  subject: string,
  body: string,
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const { data: ticket, error } = await supabase
    .from("support_tickets")
    .insert({ user_id: userId, subject, admin_unread: true, user_unread: false })
    .select("id")
    .single();
  if (error || !ticket) throw new Error(error?.message ?? "Ticket konnte nicht angelegt werden.");

  await supabase.from("support_messages").insert({ ticket_id: ticket.id, sender: "user", author_id: userId, body });
  return ticket.id;
}

/** Alle Tickets einer Person samt vollem Nachrichtenverlauf, neueste zuerst. */
export async function getUserTickets(userId: string): Promise<SupportTicket[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("id, subject, status, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (!tickets || tickets.length === 0) return [];

  const { data: messages } = await supabase
    .from("support_messages")
    .select("id, ticket_id, sender, body, created_at")
    .in(
      "ticket_id",
      tickets.map((t) => t.id),
    )
    .order("created_at", { ascending: true });

  return tickets.map((t) => ({
    id: t.id,
    subject: t.subject,
    status: t.status,
    updatedAt: t.updated_at,
    messages: (messages ?? []).filter((m) => m.ticket_id === t.id).map(toMessage),
  }));
}

/** Für die Konto-Benachrichtigung: hat die Person ungelesene Support-Antworten? */
export async function getUnreadSupportCountForUser(userId: string): Promise<number> {
  if (!isSupabaseConfigured()) return 0;
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from("support_tickets")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("user_unread", true);
  return count ?? 0;
}

/** Nutzer:in antwortet in einem bestehenden Ticket -- prüft Besitz, bevor
 * geschrieben wird (Aufrufer muss das trotzdem selbst nochmal tun). */
export async function addUserMessage(ticketId: string, userId: string, body: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data: ticket } = await supabase
    .from("support_tickets")
    .select("user_id")
    .eq("id", ticketId)
    .maybeSingle();
  if (!ticket || ticket.user_id !== userId) {
    throw new Error("Ticket nicht gefunden.");
  }

  await supabase.from("support_messages").insert({ ticket_id: ticketId, sender: "user", author_id: userId, body });
  await supabase
    .from("support_tickets")
    .update({ admin_unread: true, user_unread: false, status: "open", updated_at: new Date().toISOString() })
    .eq("id", ticketId);
}

/** Markiert alle Tickets der Person als gelesen -- beim Öffnen von /support aufgerufen. */
export async function markTicketsReadByUser(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("support_tickets").update({ user_unread: false }).eq("user_id", userId).eq("user_unread", true);
}

export interface AdminTicketRow {
  id: string;
  subject: string;
  status: "open" | "closed";
  userId: string;
  userEmail: string | null;
  adminUnread: boolean;
  updatedAt: string;
  lastMessagePreview: string;
}

/** Für die Admin-Übersicht: alle Tickets, neueste zuerst, mit E-Mail statt nur user_id. */
export async function getAdminTicketList(): Promise<AdminTicketRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("id, subject, status, user_id, admin_unread, updated_at")
    .order("updated_at", { ascending: false });
  if (!tickets || tickets.length === 0) return [];

  const { data: lastMessages } = await supabase
    .from("support_messages")
    .select("ticket_id, body, created_at")
    .in(
      "ticket_id",
      tickets.map((t) => t.id),
    )
    .order("created_at", { ascending: false });

  const previewByTicket = new Map<string, string>();
  (lastMessages ?? []).forEach((m) => {
    if (!previewByTicket.has(m.ticket_id)) previewByTicket.set(m.ticket_id, m.body);
  });

  const userIds = [...new Set(tickets.map((t) => t.user_id))];
  const emailById = new Map<string, string | null>();
  await Promise.all(
    userIds.map(async (id) => {
      const { data } = await supabase.auth.admin.getUserById(id);
      emailById.set(id, data.user?.email ?? null);
    }),
  );

  return tickets.map((t) => ({
    id: t.id,
    subject: t.subject,
    status: t.status,
    userId: t.user_id,
    userEmail: emailById.get(t.user_id) ?? null,
    adminUnread: t.admin_unread,
    updatedAt: t.updated_at,
    lastMessagePreview: (previewByTicket.get(t.id) ?? "").slice(0, 140),
  }));
}

export interface AdminTicketDetail {
  id: string;
  subject: string;
  status: "open" | "closed";
  userId: string;
  userEmail: string | null;
  messages: SupportMessage[];
}

export async function getAdminTicketDetail(ticketId: string): Promise<AdminTicketDetail | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseAdmin();
  const { data: ticket } = await supabase
    .from("support_tickets")
    .select("id, subject, status, user_id")
    .eq("id", ticketId)
    .maybeSingle();
  if (!ticket) return null;

  const [{ data: messages }, { data: userData }] = await Promise.all([
    supabase
      .from("support_messages")
      .select("id, sender, body, created_at")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true }),
    supabase.auth.admin.getUserById(ticket.user_id),
  ]);

  return {
    id: ticket.id,
    subject: ticket.subject,
    status: ticket.status,
    userId: ticket.user_id,
    userEmail: userData.user?.email ?? null,
    messages: (messages ?? []).map(toMessage),
  };
}

/** Admin antwortet -- setzt das Ticket automatisch wieder auf "open" und
 * markiert es für die Person als ungelesen. */
export async function addAdminMessage(ticketId: string, adminId: string, body: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("support_messages").insert({ ticket_id: ticketId, sender: "admin", author_id: adminId, body });
  await supabase
    .from("support_tickets")
    .update({ admin_unread: false, user_unread: true, status: "open", updated_at: new Date().toISOString() })
    .eq("id", ticketId);
}

export async function markTicketReadByAdmin(ticketId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("support_tickets").update({ admin_unread: false }).eq("id", ticketId);
}

export async function setTicketStatus(ticketId: string, status: "open" | "closed"): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase.from("support_tickets").update({ status }).eq("id", ticketId);
}

/** Für ein kleines Badge im Admin-Tab. */
export async function getUnreadSupportCountForAdmin(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from("support_tickets")
    .select("id", { count: "exact", head: true })
    .eq("admin_unread", true);
  return count ?? 0;
}
