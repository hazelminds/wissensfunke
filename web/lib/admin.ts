/**
 * Admin-Zugriff über eine E-Mail-Allowlist (ADMIN_EMAILS, kommagetrennt),
 * solange es noch keine role-Spalte in einer echten profiles-Tabelle gibt.
 * Ohne gesetzte Variable ist der Admin-Bereich für niemanden erreichbar --
 * bewusst "deny by default", nicht "jeder eingeloggte Nutzer".
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}
