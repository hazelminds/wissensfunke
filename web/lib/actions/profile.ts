"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { getPlusStatus } from "@/lib/plus";

/**
 * Spielername ändern ist ein Plus-Feature (Anreiz, Plus zu holen) -- die
 * Prüfung passiert hier nochmal serverseitig, ein deaktiviertes Eingabefeld
 * im UI ist keine Zugriffskontrolle.
 */
export async function updateUsernameAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Bitte melde dich an.");
  }

  const { active } = await getPlusStatus(user.id);
  if (!active) {
    throw new Error("Der Spielername lässt sich nur mit Plus ändern.");
  }

  const username = String(formData.get("username") ?? "").trim();
  if (username.length < 2 || username.length > 24) {
    throw new Error("Der Spielername muss 2 bis 24 Zeichen lang sein.");
  }
  if (!/^[a-zA-Z0-9äöüÄÖÜß _-]+$/.test(username)) {
    throw new Error("Nur Buchstaben, Zahlen, Leerzeichen, - und _ sind erlaubt.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ data: { username } });
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/konto");
}
