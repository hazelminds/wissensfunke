"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { isAdminUser } from "@/lib/admin";
import { grantAdmin, revokeAdmin } from "@/lib/adminData";

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
