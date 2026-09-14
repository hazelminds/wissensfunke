"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/auth";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export interface MagicLinkState {
  status: "idle" | "sent" | "error";
  message?: string;
}

export async function signInWithMagicLink(
  _prevState: MagicLinkState,
  formData: FormData,
): Promise<MagicLinkState> {
  if (!isSupabaseConfigured()) {
    return { status: "error", message: "Anmeldung ist noch nicht eingerichtet." };
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@")) {
    return { status: "error", message: "Bitte eine gültige E-Mail-Adresse eingeben." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl()}/auth/callback` },
  });

  if (error) {
    return { status: "error", message: error.message };
  }
  return { status: "sent", message: email };
}

export interface PasswordFormState {
  status: "idle" | "error";
  message?: string;
}

/** Passwort-Login -- Fallback für den Fall, dass Magic-Link-Mails gerade
 * nicht ankommen (kein E-Mail-Roundtrip beim Anmelden nötig). */
export async function signInWithPassword(
  _prevState: PasswordFormState,
  formData: FormData,
): Promise<PasswordFormState> {
  if (!isSupabaseConfigured()) {
    return { status: "error", message: "Anmeldung ist noch nicht eingerichtet." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { status: "error", message: "Bitte E-Mail und Passwort eingeben." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { status: "error", message: "E-Mail oder Passwort ist falsch." };
  }
  redirect("/");
}

export interface RegisterState {
  status: "idle" | "sent" | "error";
  message?: string;
}

/** Konto mit Passwort anlegen. Falls "Confirm email" in Supabase aktiv ist,
 * kommt trotzdem eine Bestätigungsmail -- der Passwort-Login als solcher
 * braucht danach aber keine Mail mehr. */
export async function signUpWithPassword(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  if (!isSupabaseConfigured()) {
    return { status: "error", message: "Anmeldung ist noch nicht eingerichtet." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  if (!email || !email.includes("@")) {
    return { status: "error", message: "Bitte eine gültige E-Mail-Adresse eingeben." };
  }
  if (password.length < 8) {
    return { status: "error", message: "Das Passwort muss mindestens 8 Zeichen haben." };
  }
  if (password !== passwordConfirm) {
    return { status: "error", message: "Die Passwörter stimmen nicht überein." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${siteUrl()}/auth/callback` },
  });

  if (error) {
    return { status: "error", message: error.message };
  }
  // Kein `identities`-Eintrag = die E-Mail existiert schon (Supabase gibt
  // aus Datenschutzgründen keinen expliziten Fehler dafür zurück).
  if (data.user && data.user.identities?.length === 0) {
    return { status: "error", message: "Für diese E-Mail existiert schon ein Konto." };
  }
  if (data.session) {
    redirect("/");
  }
  return { status: "sent", message: email };
}

export interface ForgotPasswordState {
  status: "idle" | "sent" | "error";
  message?: string;
}

export async function requestPasswordReset(
  _prevState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  if (!isSupabaseConfigured()) {
    return { status: "error", message: "Anmeldung ist noch nicht eingerichtet." };
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@")) {
    return { status: "error", message: "Bitte eine gültige E-Mail-Adresse eingeben." };
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/auth/callback?next=/passwort-zuruecksetzen`,
  });
  // Immer "sent" zurückgeben, unabhängig davon ob die E-Mail existiert --
  // sonst ließe sich über diese Route abfragen, welche Adressen registriert sind.
  return { status: "sent", message: email };
}

export interface UpdatePasswordState {
  status: "idle" | "done" | "error";
  message?: string;
}

export async function updatePassword(
  _prevState: UpdatePasswordState,
  formData: FormData,
): Promise<UpdatePasswordState> {
  if (!isSupabaseConfigured()) {
    return { status: "error", message: "Anmeldung ist noch nicht eingerichtet." };
  }

  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
  if (password.length < 8) {
    return { status: "error", message: "Das Passwort muss mindestens 8 Zeichen haben." };
  }
  if (password !== passwordConfirm) {
    return { status: "error", message: "Die Passwörter stimmen nicht überein." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { status: "error", message: error.message };
  }
  return { status: "done" };
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
