// This is the Home page

export default function HomePage() {
  const tiles = [
    { title: "Itinerary", href: "/itinerary", desc: "Schedule and activities.", tone: "rgba(53, 74, 40, 0.5)" },
    { title: "FAQ", href: "/faq", desc: "Dress code, menu, and venue details.", tone: "rgba(84, 45, 85, 0.5)" },
    { title: "Donations", href: "/donations", desc: "Gifts and well-wishes.", tone: "rgba(217, 169, 97, 0.4)" },
  ];

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* HERO: Framed card (title / mood only) */}
        <section className="relative overflow-hidden rounded-3xl border border-[color:var(--antique-gold)]/40 bg-[color:var(--obsidian)]/70 shadow-2xl">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06), transparent 35%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05), transparent 40%), radial-gradient(circle at 30% 90%, rgba(255,255,255,0.04), transparent 45%)",
            }}
          />

          <div className="pointer-events-none absolute left-6 top-6 h-14 w-14 rounded-tr-3xl border-t border-r border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute right-6 top-6 h-14 w-14 rounded-tl-3xl border-t border-l border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute left-6 bottom-6 h-14 w-14 rounded-br-3xl border-b border-r border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute right-6 bottom-6 h-14 w-14 rounded-bl-3xl border-b border-l border-[color:var(--bright-gold)]/50" />

          <div className="relative px-6 py-10 sm:px-10 sm:py-10">
            <h1
              className="text-center text-4xl sm:text-6xl"
              style={{ fontFamily: "var(--font-display-cinzel)" }}
            >
              Leo <span className="text-[color:var(--bright-gold)]">&amp;</span> Blaine
            </h1>

            <p className="mt-4 text-center text-lg text-[color:var(--bone)]/85">
              'Til death do us part
            </p>

            <div className="mx-auto mt-8 h-px w-40 bg-[color:var(--antique-gold)]/50" />

            <p className="mt-10 text-center text-xs tracking-[0.35em] text-[color:var(--bone)]/45">
              A GRAVE DECISION…
            </p>
          </div>
        </section>

        {/* OPEN: Date/Location + RSVP CTA */}
        <section className="panel-soft p-6 sm:p-15">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm tracking-[0.35em] text-[color:var(--bright-gold)]/80">
              SAVE THE DATE
            </p>

            <h2
              className="mt-4 text-2xl sm:text-3xl"
              style={{ fontFamily: "var(--font-display-cinzel)" }}
            >
              Thursday, October 29th, 2026
            </h2>

            <p className="mt-2 text-sm tracking-[0.25em] text-[color:var(--bone)]/70">
              AUSTELL, GEORGIA
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <div className="divider-ornate" />
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/rsvp"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-xl border border-[color:var(--bright-gold)]/60 bg-[color:var(--antique-gold)]/20 px-6 py-3 text-sm tracking-wide text-[color:var(--bone)] shadow-lg transition hover:bg-[color:var(--antique-gold)]/30"
              >
                RSVP
              </a>
            </div>

            {/* <p className="mt-6 text-xs text-[color:var(--bone)]/55">
              More details will be added as we get closer to the date.
            </p> */}
          </div>
        </section>

        {/* OPEN: Feature tiles */}
        <section className=" mt-6 panel-soft p-6 sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm tracking-[0.35em] text-[color:var(--bright-gold)]/80">
              QUICK LINKS
            </p>
            <h2
              className="mt-4 text-2xl sm:text-3xl"
              style={{ fontFamily: "var(--font-display-cinzel)" }}
            >
              Plan your day
            </h2>
            <p className="mt-3 text-sm text-[color:var(--bone)]/70">
              Schedule, details, and anything guests might need.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-3">
            {tiles.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="block rounded-2xl border border-white/10 p-5 transition hover:border-[color:var(--bright-gold)]/30 hover:bg-white/5"
                style={{
                  background: `linear-gradient(180deg, ${card.tone}, rgba(14,13,14,0.55))`,
                }}
              >
                <p
                  className="text-lg text-[color:var(--bright-gold)]"
                  style={{ fontFamily: "var(--font-display-cinzel)" }}
                >
                  {card.title}
                </p>
                <p className="mt-2 text-sm text-[color:var(--bone)]/75">{card.desc}</p>
                <p className="mt-4 text-xs tracking-[0.25em] text-[color:var(--bone)]/65">
                  OPEN →
                </p>
              </a>
            ))}
          </div>
        </section>

        <footer className="text-center text-xs tracking-[0.35em] text-[color:var(--bone)]/40">
          © {new Date().getFullYear()} • BratLabs {/*Leo &amp; Blaine*/}
        </footer>
      </div>
    </main>
  );
}