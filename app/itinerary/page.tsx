// Itinerary page

import Link from "next/link";

export default function ItineraryPage() {
    return (
        <main className="min-h-screen px-4 py-10">
            <div className="mx-auto w-full max-w-5xl space-y-8">
                <header className="text-center">
                    <p className="text-sm tracking-[0.35em] text-[clor:var(--bright-gold)]/80">
                        ITINERARY
                    </p>

                    <h1
                        className="mt-4 text-3xl sm:text-5xl"
                        style={{ fontFamily: "var(--font-display-cinzel)" }}
                    >
                        Schedule &amp; Activities
                    </h1>

                    <div className="mx-auto mt-8 max-w-xl">
                        <div className="divider-ornate"/>
                    </div>
                </header>

                <section className="rounded-3xl border border-white/10 bg-black/10 p-6 sm:p-8 text-center">
                    <div className="mt-8"></div>
                    <p className="text-2xl text-[color:var(--bone)]/70">
                      Palmer's Eatery
                    </p>
                    <p className="mt-2 text-xl text-[color:var(--bone)]/70">
                      2710 Jefferson St, Austell, GA 30168
                    </p>
                    <div className="mt-16"></div>
                    <p className="text-2xl text-[color:var(--bone)]/70">
                      Ceremony starts @ 2pm
                    </p>
                    <div className="mt-16"></div>
                    <p className="text-sm text-[color:var(--bone)]/70">
                        More details will be added as we get closer to the date.
                    </p>

                    <div className="mt-8">
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