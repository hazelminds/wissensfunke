import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Supabase-Client für Server Components, Route Handlers und Server Actions.
 * `setAll` schlägt in reinen Server Components fehl (Cookies sind dort
 * read-only) — das ist erwartet, solange Middleware die Session refresht.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Aufruf aus einer Server Component ohne Middleware-Refresh — ignorierbar.
          }
        },
      },
    },
  );
}
