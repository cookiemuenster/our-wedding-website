import { createClient } from "@supabase/supabase-js";

/**
 * These environment variables come from your .env.local file.
 * - NEXT_PUBLIC_SUPABASE_URL is safe to expose (it’s just the project URL)
 * - SUPABASE_SERVICE_ROLE_KEY is SECRET and must only be used on the server
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * getSupabaseAdmin()
 * - Returns a Supabase client authenticated with the Service Role key
 * - This bypasses RLS (Row Level Security)
 * - Use ONLY in server code (Route Handlers, Server Components)
 */
export function getSupabaseAdmin() {
    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error(
            "Missing Supabase env vars. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
        );
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            persistSession: false, // server-side: do not store sessions
            autoRefreshToken: false,
        },
    });
}