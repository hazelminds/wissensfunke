"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import {
  createSupportTicket,
  addUserMessage,
  addAdminMessage,
  setTicketStatus,
} from "@/lib/support";

export async function createSupportTicketAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Bitte melde dich an, um eine Nachricht zu schicken.");
  }

  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!subject || subject.length > 120) {
    throw new Error("Bitte einen kurzen Betreff (max. 120 Zeichen) angeben.");
  }
  if (!body || body.length > 4000) {
    throw new Error("Bitte eine Nachricht (max. 4000 Zeichen) eingeben.");
  }

  await createSupportTicket(user.id, subject, body);
  revalidatePath("/support");
  revalidatePath("/konto");
}

export async function replyToTicketAsUserAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Bitte melde dich an.");
  }

  const ticketId = String(formData.get("ticketId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!ticketId || !body || body.length > 4000) return;

  await addUserMessage(ticketId, user.id, body);
  revalidatePath("/support");
  revalidatePath("/konto");
}

async function requireAdmin() {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }
  return caller;
}

export async function replyToTicketAsAdminAction(formData: FormData) {
  const caller = await requireAdmin();
  const ticketId = String(formData.get("ticketId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!ticketId || !body || body.length > 4000) return;

  await addAdminMessage(ticketId, caller.id, body);
  revalidatePath(`/admin/support/${ticketId}`);
  revalidatePath("/admin");
}

export async function setTicketStatusAction(formData: FormData) {
  await requireAdmin();
  const ticketId = String(formData.get("ticketId") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!ticketId || (status !== "open" && status !== "closed")) return;

  await setTicketStatus(ticketId, status);
  revalidatePath(`/admin/support/${ticketId}`);
  revalidatePath("/admin");
}
