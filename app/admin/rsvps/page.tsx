// This is a server component page that reads RSVPs using the service role key.
// For basic protection, it requires ?token=YOUR_ADMIN_TOKEN.

import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * This page uses a shared secret token (ADMIN_TOKEN) to gate access:
 *   /admin/rsvps?token=YOUR_ADMIN_TOKEN
 *
 * This will be replace with the proper auth (Supabase Auth).
 */

export default async function AdminRsvpPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const params = await searchParams;
    const token =
        typeof params.token === "string" ? params.token : Array.isArray(params.token) ? params.token[0] : "";

    const requiredToken = process.env.ADMIN_TOKEN;

    // If ADMIN_TOKEN hasn't been set yet, warn clearly.
    if (!requiredToken) {
        return (
            <main className="min-h-screen px-4 py-10">
                <div className="mx-auto w-full max-w-5xl">
                    <section className="rounded-3xl border border-[color:var(--antique-gold)]/40 bg-[color:var(--obsidian)]/70 p-8 shadow-2xl">
                        <h1
                            className="text-3xl"
                            style={{ fontFamily: "var(--font-display-cinzel)" }}
                        >
                            Admin RSVPs
                        </h1>
                        <p className="mt-4 text-[color:var(--bone)]/80">
                            Missing <code className="rounded bg-black/30 px-2 py-1">ADMIN_TOKEN</code> in{" "}
                            <code className="rounded bg-black/30 px-2 py-1">.env.local</code>.
                        </p>
                        <p className="mt-2 text-[color:var(--bone)]/70">
                            Add an <code className="rounded bg-black/30 px-2 py-1">ADMIN_TOKEN</code> and restart your dev server.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/"
                                className="text-sm tracking-[0.2em] text-[color:var(--bright-gold)]/90 hover:text-[color:var(--bright-gold)]"
                            >
                                ← HOME
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    // Token gate
    if (token !== requiredToken) {
    return (
      <main className="min-h-screen px-4 py-10">
        <div className="mx-auto w-full max-w-5xl">
          <section className="rounded-3xl border border-[color:var(--antique-gold)]/40 bg-[color:var(--obsidian)]/70 p-8 shadow-2xl">
            <p className="text-sm tracking-[0.35em] text-[color:var(--bright-gold)]/90">
              ADMIN
            </p>
            <h1
              className="mt-4 text-3xl"
              style={{ fontFamily: "var(--font-display-cinzel)" }}
            >
              Access required
            </h1>
            <p className="mt-4 text-[color:var(--bone)]/80">
              Open this page with the token:
            </p>
            <p className="mt-2 break-all rounded-2xl border border-[color:var(--antique-gold)]/30 bg-black/25 p-4 text-sm text-[color:var(--bone)]/85">
              /admin/rsvps?token=YOUR_ADMIN_TOKEN
            </p>

            <div className="mt-6">
              <Link
                href="/"
                className="text-sm tracking-[0.2em] text-[color:var(--bright-gold)]/90 hover:text-[color:var(--bright-gold)]"
              >
                ← HOME
              </Link>
              
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Fetching RSVPs
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("rsvps")
    .select("id, created_at, first_name, last_name, email, attendance, guest_count, dietary_notes, message")
    .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase admin select error:", error);
    }

    const rsvps = data ?? [];

    return (
        <main className="min-h-screen px-4 py-10">
            <div className="mx-auto w-full max-w-6xl">
                <section className="relative overflow-hidden rounded-3xl border border-[color:var(--antique-gold)]/40 bg-[color:var(--obsidian)]/70 shadow-2xl">
                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-sm tracking-[0.35em] text-[color:var(--bright-gold)]/90">
                                    ADMIN
                                </p>
                                <h1
                                    className="mt-3 text-3xl sm:text-5xl"
                                    style={{ fontFamily: "var(--font-display-cinzel)" }}
                                >
                                    RSVPs
                                </h1>
                                <p className="mt-2 text-[color:var(--bone)]/70">
                                    Total: {rsvps.length}
                                </p>
                            </div>

                            <Link
                                href="/"
                                className="text-sm tracking-[0.2em] text-[color:var(--bright-gold)]/90 hover:text-[color:var(--bright-gold)]"
                            >
                                ← HOME
                            </Link>
                        </div>

                        <div className="mt-8">
                            <div className="divider-ornate" />
                        </div>

                        <div className="mt-8 overflow-x-auto rounded-2xl border border-[color:var(--antique-gold)]/25 bg-black/20">
                            <table className="min-w-[900px] w-full text-left text-sm">
                                <thead className="border-b border-[color:var(--antique-gold)]/20">
                                    <tr className="text-[color:var(--bright-gold)]/90">
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Attending</th>
                                        <th className="px-4 py-3">Guests</th>
                                        <th className="px-4 py-3">Dietary</th>
                                        <th className="px-4 py-3">Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {error ? (
                                        <tr>
                                            <td className="px-4 py-4 text-[color:var(--bone)]/80" colSpan={7}>
                                                Error loading RSVPs. Check server logs.
                                            </td>
                                        </tr>
                                    ) : rsvps.length === 0 ? (
                                        <tr>
                                            <td className="px-4 py-4 text-[color:var(--bone)]/70" colSpan={7}>
                                                No RSVPs yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        rsvps.map((r) => (
                                            <tr
                                                key={r.id}
                                                className="border-t border-[color:var(--antique-gold)]/15 text-[color:var(--bone)]/85"
                                            >
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {new Date(r.created_at).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {r.first_name} {r.last_name}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">{r.email}</td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {r.attendance ? "Yes" : "No"}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">{r.guest_count}</td>
                                                <td className="px-4 py-3">
                                                    <span className="line-clamp-2">{r.dietary_notes ?? ""}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="line-clamp-2">{r.message ?? ""}</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-4 text-xs text-[color:var(--bone)]/55">
                            Tip: Bookmark this URL with your token (don’t share it).
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}