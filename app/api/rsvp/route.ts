import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/db";
import { json } from "stream/consumers";

/**
 * A small helper to validate strings safely.
 */
function asNonEmptyString(value: unknown, maxLen = 120) {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (trimmed.length > maxLen) return trimmed.slice(0, maxLen);
    return trimmed;
}

/**
 * POST /api/rsvp
 * Accepts RSVP form submissions and stores them in Supabase.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        /**
        * Honeypot anti-spam field:
        * - The form includes a hidden field named "website"
        * - Humans won't fill it out
        * - Many bots will, so we silently reject
        */
        const honeypot = typeof body.website === "string" ? body.website.trim() : "";
        if (honeypot) {
            return NextResponse.json({ ok: true}, { status: 200});
        }

        //Required fields
        const firstName = asNonEmptyString(body.firstName, 80);
        const lastName = asNonEmptyString(body.lastName, 80);
        const email = asNonEmptyString(body.email, 200);

        //Attandance stored as boolean
        const attendance =
            body.attendance === "yes" ? true : body.attandance === "no" ? false : null;
        
        // guestCount: coerce to int, clamp to a reasonable range
        const guestCountRaw =
            typeof body.guestCount === "number"
                ? body.guestCount
                : parseInt(String(body.guestCount ?? "1"), 10);
        
        const guestCount = Number.isFinite(guestCountRaw)
            ? Math.min(Math.max(guestCountRaw, 1), 10)
            : 1;

        //Optional fields
        const dietaryNotes = asNonEmptyString(body.dietaryNotes, 500);
        const message = asNonEmptyString(body.message, 500);

        //Basic validation
        if (!firstName || !lastName || !email || attendance === null) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                    "Missing required fields. Please provide first name, last name, email and attendance."
                },
                { status: 400 }
            );
        }

        //Email check (prevents "obvious junk")
        if (!email.includes("@") || email.length < 5) {
            return NextResponse.json(
                { ok: false, error: "Please enter a  valid email address."},
                { status: 400 }
            );
        }

        const supaBase = getSupabaseAdmin();

        /**
        * Insert into the rsvps table.
        * Column names match the SQL schema provided earlier.
        */
       const { error } = await supaBase.from("rsvps").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        attendance,
        guest_count: guestCount,
        dietary_notes: dietaryNotes,
        message,
       });

       if (error) {
        console.error("Supbase insert error:", error);
        return NextResponse.json(
            { ok: false, error: "Failed to save RSVP. Please try again." },
            { status: 500 }
        );
       }

       return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error("RSVP route error:", err);
        return NextResponse.json(
            { ok: false, error: "Invalid request." },
            { status: 400 }
        );
    }
}