"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import { grantAdmin, revokeAdmin, createTestUser } from "@/lib/adminData";
import { grantPlusDays, revokePlus } from "@/lib/plus";

/**
 * Beide Actions prüfen den Aufrufer selbst nochmal serverseitig -- ein
 * ausgeblendeter Button im UI ist keine Zugriffskontrolle, nur die
 * Bequemlichkeit, ihn gar nicht erst anzuzeigen.
 */

export async function grantAdminAction(formData: FormData) {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }

  const targetUserId = String(formData.get("userId") ?? "");
  if (!targetUserId) return;

  await grantAdmin(targetUserId, caller.id);
  revalidatePath("/admin");
}

export async function revokeAdminAction(formData: FormData) {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }

  const targetUserId = String(formData.get("userId") ?? "");
  if (!targetUserId) return;

  // Kein Selbst-Entzug über den Button -- sonst kann sich der letzte
  // erreichbare Admin versehentlich aussperren.
  if (targetUserId === caller.id) {
    throw new Error("Du kannst dir nicht selbst die Admin-Rechte entziehen.");
  }

  await revokeAdmin(targetUserId);
  revalidatePath("/admin");
}

export async function grantPlusAction(formData: FormData) {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }

  const targetUserId = String(formData.get("userId") ?? "");
  const days = Number(formData.get("days"));
  if (!targetUserId || !Number.isFinite(days) || days <= 0) return;

  const note = String(formData.get("note") ?? "").trim() || undefined;
  await grantPlusDays(targetUserId, Math.round(days), caller.id, note);
  revalidatePath("/admin");
}

export async function revokePlusAction(formData: FormData) {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }

  const targetUserId = String(formData.get("userId") ?? "");
  if (!targetUserId) return;

  await revokePlus(targetUserId);
  revalidatePath("/admin");
}

export async function createTestUserAction(formData: FormData) {
  const caller = await getCurrentUser();
  if (!caller || !(await isAdminUser(caller.id, caller.email))) {
    throw new Error("Nicht berechtigt.");
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  if (!email || !password) {
    throw new Error("E-Mail und Passwort werden gebraucht.");
  }
  if (password.length < 6) {
    throw new Error("Passwort muss mindestens 6 Zeichen haben.");
  }

  await createTestUser(email, password);
  revalidatePath("/admin");
}
