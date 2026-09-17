/**
 * Handgeschriebene Teilmenge des Supabase-Schemas, synchron zu
 * supabase/migrations/*.sql zu halten. Sobald die Supabase-CLI angebunden
 * ist, ersetzt `supabase gen types typescript` diese Datei durch eine
 * vollständige, generierte Version.
 */
export interface Database {
  public: {
    Tables: {
      purchases: {
        Row: {
          id: string;
          quiz_slug: string;
          provider: string;
          provider_reference: string;
          provider_secondary_reference: string | null;
          customer_email: string | null;
          user_id: string | null;
          amount_cents: number;
          currency: string;
          status: "pending" | "paid" | "failed";
          created_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          quiz_slug: string;
          provider: string;
          provider_reference: string;
          provider_secondary_reference?: string | null;
          customer_email?: string | null;
          user_id?: string | null;
          amount_cents: number;
          currency?: string;
          status?: "pending" | "paid" | "failed";
          created_at?: string;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          quiz_slug?: string;
          provider?: string;
          provider_reference?: string;
          provider_secondary_reference?: string | null;
          customer_email?: string | null;
          user_id?: string | null;
          amount_cents?: number;
          currency?: string;
          status?: "pending" | "paid" | "failed";
          created_at?: string;
          paid_at?: string | null;
        };
        Relationships: [];
      };
      streaks: {
        Row: {
          user_id: string;
          count: number;
          best_count: number;
          last_completed_date: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          count?: number;
          best_count?: number;
          last_completed_date?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          count?: number;
          best_count?: number;
          last_completed_date?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_users: {
        Row: {
          user_id: string;
          granted_by: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          granted_by?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          granted_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      plus_grants: {
        Row: {
          user_id: string;
          plus_until: string;
          granted_by: string | null;
          note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          plus_until: string;
          granted_by?: string | null;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          plus_until?: string;
          granted_by?: string | null;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_admin_notes: {
        Row: {
          id: string;
          user_id: string;
          note: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          note: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          note?: string;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      support_tickets: {
        Row: {
          id: string;
          user_id: string;
          subject: string;
          status: "open" | "closed";
          admin_unread: boolean;
          user_unread: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subject: string;
          status?: "open" | "closed";
          admin_unread?: boolean;
          user_unread?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subject?: string;
          status?: "open" | "closed";
          admin_unread?: boolean;
          user_unread?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      support_messages: {
        Row: {
          id: string;
          ticket_id: string;
          sender: "user" | "admin";
          author_id: string | null;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          ticket_id: string;
          sender: "user" | "admin";
          author_id?: string | null;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          ticket_id?: string;
          sender?: "user" | "admin";
          author_id?: string | null;
          body?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
