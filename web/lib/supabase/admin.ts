import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

/**
 * Service-Role-Client — umgeht RLS. NUR in vertrauenswürdigem Server-Code
 * verwenden (Webhook-Handler, Server Actions), nie an den Browser
 * durchreichen. Lazy, aus demselben Grund wie lib/stripe.ts.
 */
let cached: ReturnType<typeof createSupabaseClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (!cached) {
    cached = createSupabaseClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
  }
  return cached;
}
