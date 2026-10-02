"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import {
  createAnnouncement,
  updateAnnouncement,
  setAnnouncementActive,
  deleteAnnouncement,
} from "@/lib/announcements";

async function requireAdmin() {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }
}

function readFields(formData: FormData): { message: string; startDate: string; endDate: string } {
  const message = String(formData.get("message") ?? "").trim();
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "");
  if (!message || message.length > 200) {
    throw new Error("Bitte einen kurzen Text (max. 200 Zeichen) angeben.");
  }
  if (!startDate || !endDate || startDate > endDate) {
    throw new Error("Bitte ein gültiges Start- und Enddatum angeben (Start vor oder gleich Ende).");
  }
  return { message, startDate, endDate };
}

export async function createAnnouncementAction(formData: FormData) {
  await requireAdmin();
  const { message, startDate, endDate } = readFields(formData);
  await createAnnouncement(message, startDate, endDate);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateAnnouncementAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const { message, startDate, endDate } = readFields(formData);
  await updateAnnouncement(id, message, startDate, endDate);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function setAnnouncementActiveAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const active = formData.get("active") === "true";
  if (!id) return;
  await setAnnouncementActive(id, active);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteAnnouncementAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteAnnouncement(id);
  revalidatePath("/admin");
  revalidatePath("/");
}
