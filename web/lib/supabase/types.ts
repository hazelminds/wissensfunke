/**
 * Handgeschriebene Teilmenge des Supabase-Schemas, synchron zu
 * supabase/migrations/0001_purchases.sql zu halten. Sobald die Supabase-CLI
 * angebunden ist, ersetzt `supabase gen types typescript` diese Datei durch
 * eine vollständige, generierte Version.
 */
export interface Database {
  public: {
    Tables: {
      purchases: {
        Row: {
          id: string;
          quiz_slug: string;
          stripe_session_id: string;
          stripe_payment_intent_id: string | null;
          customer_email: string | null;
          amount_cents: number;
          currency: string;
          status: "pending" | "paid" | "failed";
          created_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          quiz_slug: string;
          stripe_session_id: string;
          stripe_payment_intent_id?: string | null;
          customer_email?: string | null;
          amount_cents: number;
          currency?: string;
          status?: "pending" | "paid" | "failed";
          created_at?: string;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          quiz_slug?: string;
          stripe_session_id?: string;
          stripe_payment_intent_id?: string | null;
          customer_email?: string | null;
          amount_cents?: number;
          currency?: string;
          status?: "pending" | "paid" | "failed";
          created_at?: string;
          paid_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
