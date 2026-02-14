import { getSupabaseAdmin } from "@/lib/db";
import { success, failure } from "@/lib/api-response";
import { log } from "@/lib/logger";

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
    const requestId = crypto.randomUUID();

    try {
        const body = await req.json().catch(() => null);

        if (!body || typeof body !== "object") {
            log.warn("rsvp.invalid_json", { requestId });
            return failure(requestId, "Invalid request.", 400);
        }

        /**
        * Honeypot anti-spam field:
        * - The form includes a hidden field named "website"
        * - Humans won't fill it out
        * - Many bots will, so we silently reject
        */
        const honeypot = typeof (body as any).website === "string" ? (body as any).website.trim() : "";
        if (honeypot) {
            log.info("rsvp.honeypot_triggered", { requestId });
            return success(requestId);
        }

        //Required fields
        const firstName = asNonEmptyString(body.firstName, 80);
        const lastName = asNonEmptyString(body.lastName, 80);
        const email = asNonEmptyString(body.email, 200);

        //Attandance stored as boolean
        const attendance =
            body.attendance === "yes" ? true : body.attendance === "no" ? false : null;
        
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
            log.warn("rsvp.validation_failed", {
                requestId,
                hasFirstName: !!firstName,
                hasLastName: !!lastName,
                hasEmail: !!email,
                attendance,
                guestCount,
            });
            return failure(
                requestId, 
                "Missing required fields. Please provide first name, last name, email and attendance.", 
                400);
        }

        //Email check (prevents "obvious junk")
        if (!email.includes("@") || email.length < 5) {
            log.warn("rsvp.invalid_email", {
                requestId,
                guestCount,
                attendance
            });
            return failure(
                requestId,
                "Please enter a  valid email address.",
                400
            );
        }

        log.info("rsvp.insert_attempt", {
            requestId,
            guestCount,
            attendance
        });

        const supabase = getSupabaseAdmin();

        /**
        * Insert into the rsvps table.
        * Column names match the SQL schema provided earlier.
        */
       const { error } = await supabase.from("rsvps").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        attendance,
        guest_count: guestCount,
        dietary_notes: dietaryNotes,
        message,
       });

       if (error) {
        log.error("rsvp.supabase_insert_error", {
            requestId,
            code: (error as any).code,
            message: error.message
        });
        return failure(
            requestId, 
            "Failed to save RSVP. Please try again.",
            500
        );
       }

       log.info("rsvp.success", {
        requestId,
        guestCount,
        attendance
       });
       
       // Optional: return requestId so you can correlate client errors with server logs
       return success(requestId);
    } catch (err) {
        log.error("rsvp.unhandled_error", {
            requestId,
            err: err instanceof Error ? err.message : String(err)
        });
        return failure(requestId, "Invalid request.", 400);
    }
}