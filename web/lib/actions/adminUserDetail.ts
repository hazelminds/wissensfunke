"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import {
  addUserNote,
  banUser,
  unbanUser,
  deleteUserAccount,
  adminSetUsername,
  adminSetPassword,
} from "@/lib/adminData";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

async function requireAdmin() {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }
  return caller;
}

export async function addUserNoteAction(formData: FormData) {
  const caller = await requireAdmin();
  const targetUserId = String(formData.get("userId") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  if (!targetUserId || !note) return;

  await addUserNote(targetUserId, note, caller.id);
  revalidatePath(`/admin/nutzer/${targetUserId}`);
}

export async function banUserAction(formData: FormData) {
  const caller = await requireAdmin();
  const targetUserId = String(formData.get("userId") ?? "");
  if (!targetUserId) return;
  if (targetUserId === caller.id) {
    throw new Error("Du kannst dich nicht selbst sperren.");
  }

  await banUser(targetUserId);
  revalidatePath(`/admin/nutzer/${targetUserId}`);
  revalidatePath("/admin");
}

export async function unbanUserAction(formData: FormData) {
  await requireAdmin();
  const targetUserId = String(formData.get("userId") ?? "");
  if (!targetUserId) return;

  await unbanUser(targetUserId);
  revalidatePath(`/admin/nutzer/${targetUserId}`);
  revalidatePath("/admin");
}

/**
 * Löschen ist unwiderruflich -- die eingegebene E-Mail muss serverseitig
 * exakt zur Ziel-Person passen, ein deaktivierter Button im UI reicht nicht
 * als Schutz gegen einen Fehlklick.
 */
export async function deleteUserAction(formData: FormData) {
  const caller = await requireAdmin();
  const targetUserId = String(formData.get("userId") ?? "");
  const confirmEmail = String(formData.get("confirmEmail") ?? "")
    .trim()
    .toLowerCase();
  if (!targetUserId || !confirmEmail) return;
  if (targetUserId === caller.id) {
    throw new Error("Du kannst dein eigenes Konto hier nicht löschen.");
  }

  const supabase = getSupabaseAdmin();
  const { data } = await supabase.auth.admin.getUserById(targetUserId);
  const actualEmail = data.user?.email?.trim().toLowerCase();
  if (!actualEmail || actualEmail !== confirmEmail) {
    throw new Error("Die eingegebene E-Mail stimmt nicht mit dem Konto überein.");
  }

  await deleteUserAccount(targetUserId);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function adminSetUsernameAction(formData: FormData) {
  await requireAdmin();
  const targetUserId = String(formData.get("userId") ?? "");
  const username = String(formData.get("username") ?? "").trim();
  if (!targetUserId) return;
  if (username.length < 2 || username.length > 24) {
    throw new Error("Der Spielername muss 2 bis 24 Zeichen lang sein.");
  }
  if (!/^[a-zA-Z0-9äöüÄÖÜß _-]+$/.test(username)) {
    throw new Error("Nur Buchstaben, Zahlen, Leerzeichen, - und _ sind erlaubt.");
  }

  await adminSetUsername(targetUserId, username);
  revalidatePath(`/admin/nutzer/${targetUserId}`);
}

export async function adminSetPasswordAction(formData: FormData) {
  await requireAdmin();
  const targetUserId = String(formData.get("userId") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!targetUserId) return;
  if (password.length < 6) {
    throw new Error("Das Passwort muss mindestens 6 Zeichen haben.");
  }

  await adminSetPassword(targetUserId, password);
  revalidatePath(`/admin/nutzer/${targetUserId}`);
}
