import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export interface Submission {
  id?: string;
  name: string;
  email: string;
  digital_only: boolean;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  created_at?: string;
}

/**
 * Creates a Supabase client for use in API routes.
 * Uses the anon key — the submissions table has an RLS policy
 * that permits anonymous inserts (public form).
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createSupabaseClient(url, key);
}
