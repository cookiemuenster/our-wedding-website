"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function RsvpPage() {
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");

    //Form fields
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[attendance, setAttendance] = useState<"yes" | "no" | "">("");
    const[guestCount, setGuestCount] = useState<number>(0);
    const[dietaryNotes, setDietaryNotes] = useState("");
    const[message, setMessage] = useState("");

    /**
    * Honeypot field:
    * - hidden from humans
    * - bots may fill it
    */
   const [website, setWebsite] = useState("");

   const isDisabled = useMemo(() => {
    if (submitState === "submitting") return true;
    if (!firstName.trim()) return true;
    if (!lastName.trim()) return true;
    if (!email.trim()) return true;
    if (!attendance) return true;
    return false;
   }, [submitState, firstName, lastName, email, attendance]);

   async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSubmitState("submitting");
    
    try {
        const res = await fetch("/api/rsvp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                attendance,
                guestCount,
                dietaryNotes,
                message,
                website, // the honeypot field
            }),
        });

        const data = await res.json().catch(() => null);

        if (!data?.ok) {
          console.error("RSVP submit failed", {
            status: res.status,
            requestId: data?.requestId, 
            error: data?.error,
          });
          setSubmitState("error");
          setErrorMessage(data?.error ?? "Something went wrong. Please try again.");
          return;
        }

        if (data?.requestId) {
          console.log("RSVP submitted", { requestId: data.requestId });
        }

        setSubmitState("success");
    } catch (err) {
        console.error(err);
        setSubmitState("error");
        setErrorMessage("Network error. Please try again.");
    }
   }

   return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <section className="relative overflow-hidden rounded-3xl border border-[color:var(--antique-gold)]/40 bg-[color:var(--obsidian)]/70 shadow-2xl">
          {/* subtle “velvet” grain to match your homepage */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06), transparent 35%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05), transparent 40%), radial-gradient(circle at 30% 90%, rgba(255,255,255,0.04), transparent 45%)",
            }}
          />

          {/* corner filigree hints */}
          <div className="pointer-events-none absolute left-6 top-6 h-14 w-14 rounded-tr-3xl border-t border-r border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute right-6 top-6 h-14 w-14 rounded-tl-3xl border-t border-l border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute left-6 bottom-6 h-14 w-14 rounded-br-3xl border-b border-r border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute right-6 bottom-6 h-14 w-14 rounded-bl-3xl border-b border-l border-[color:var(--bright-gold)]/50" />

          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="text-sm tracking-[0.2em] text-[color:var(--bright-gold)]/90 hover:text-[color:var(--bright-gold)]"
              >
                ← HOME
              </Link>
              <p className="text-sm tracking-[0.35em] text-[color:var(--bright-gold)]/90">
                RSVP
              </p>
            </div>

            <h1
              className="mt-6 text-center text-3xl sm:text-5xl"
              style={{ fontFamily: "var(--font-display-cinzel)" }}
            >
              Let us know you’re coming
            </h1>

            <p className="mt-4 text-center text-[color:var(--bone)]/85">
              Please RSVP so we can plan food, seating, and all the good stuff.
            </p>

            <div className="mx-auto mt-8 w-full max-w-xl">
              <div className="divider-ornate" />
            </div>

            {submitState === "success" ? (
              <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/25 p-6 text-center">
                <p className="text-lg text-[color:var(--bone)]/90">
                  RSVP received. Thank you!
                </p>
                <p className="mt-2 text-sm text-[color:var(--bone)]/70">
                  If you need to change anything later, you can submit again or
                  contact us directly.
                </p>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full border border-[color:var(--antique-gold)]/60 bg-[color:var(--plum)]/40 px-6 py-3 text-sm tracking-[0.2em] text-[color:var(--bone)] hover:bg-[color:var(--plum)]/55"
                  >
                    BACK TO HOME
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-xl">
                {/* Honeypot: visually hidden, but still in the DOM for bots */}
                <div className="hidden">
                  <label>
                    Website
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </label>
                </div>

                <div className="grid gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="First name">
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/25 px-4 py-3 text-[color:var(--bone)] placeholder:text-[color:var(--bone)]/45 focus:outline-none focus:ring-2 focus:ring-[color:var(--bright-gold)]/40"
                        placeholder="Leo"
                        autoComplete="given-name"
                      />
                    </Field>

                    <Field label="Last name">
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/25 px-4 py-3 text-[color:var(--bone)] placeholder:text-[color:var(--bone)]/45 focus:outline-none focus:ring-2 focus:ring-[color:var(--bright-gold)]/40"
                        placeholder="Ware"
                        autoComplete="family-name"
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/25 px-4 py-3 text-[color:var(--bone)] placeholder:text-[color:var(--bone)]/45 focus:outline-none focus:ring-2 focus:ring-[color:var(--bright-gold)]/40"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Will you attend?">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/20 px-4 py-3">
                        <input
                          type="radio"
                          name="attendance"
                          value="yes"
                          checked={attendance === "yes"}
                          onChange={(e) => setAttendance(e.target.value as "yes" | "no")}
                        />
                        <span className="text-[color:var(--bone)]/90">Yes</span>
                      </label>

                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/20 px-4 py-3">
                        <input
                          type="radio"
                          name="attendance"
                          value="no"
                          checked={attendance === "no"}
                          onChange={(e) => setAttendance(e.target.value as "yes" | "no")}
                        />
                        <span className="text-[color:var(--bone)]/90">No</span>
                      </label>
                    </div>
                  </Field>

                  <Field label="Guest count">
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value || "0", 10))}
                      className="w-full rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/25 px-4 py-3 text-[color:var(--bone)] focus:outline-none focus:ring-2 focus:ring-[color:var(--bright-gold)]/40"
                    />
                    <p className="mt-2 text-xs text-[color:var(--bone)]/60">
                      (If you need more than 1 rsvp, please contact us.)
                    </p>
                  </Field>

                  <Field label="Dietary notes (optional)">
                    <textarea
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      className="min-h-[90px] w-full rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/25 px-4 py-3 text-[color:var(--bone)] placeholder:text-[color:var(--bone)]/45 focus:outline-none focus:ring-2 focus:ring-[color:var(--bright-gold)]/40"
                      placeholder="Vegetarian, allergies, etc."
                    />
                  </Field>

                  <Field label="Message (optional)">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[90px] w-full rounded-2xl border border-[color:var(--antique-gold)]/35 bg-black/25 px-4 py-3 text-[color:var(--bone)] placeholder:text-[color:var(--bone)]/45 focus:outline-none focus:ring-2 focus:ring-[color:var(--bright-gold)]/40"
                      placeholder="Anything you want us to know?"
                    />
                  </Field>

                  {submitState === "error" && (
                    <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-[color:var(--bone)]/90">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="mt-2 inline-flex items-center justify-center rounded-full border border-[color:var(--antique-gold)]/60 bg-[color:var(--plum)]/40 px-7 py-3 text-sm tracking-[0.25em] text-[color:var(--bone)] transition hover:bg-[color:var(--plum)]/55 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitState === "submitting" ? "SUBMITTING..." : "SUBMIT RSVP"}
                  </button>

                  <p className="text-center text-xs text-[color:var(--bone)]/55">
                    Your info is only used for wedding planning.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
   );
}

/**
 * A tiny helper component so each label + input pair stays consistent.
 */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm tracking-[0.2em] text-[color:var(--bright-gold)]/90">
        {label.toUpperCase()}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}