export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Frame */}
        <section 
          className="relative overflow-hidden rounded-3xl border border-[color:var(--antique-gold)]/40 bg-[color:var(--obsidian)]/70 shadow-2xl">
          {/* subtle “velvet” grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06), transparent 35%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05), transparent 40%), radial-gradient(circle at 30% 90%, rgba(255,255,255,0.04), transparent 45%)",
            }}
          />

          {/* corner filigree hints (simple CSS version) */}
          <div className="pointer-events-none absolute left-6 top-6 h-14 w-14 rounded-tr-3xl border-t border-r border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute right-6 top-6 h-14 w-14 rounded-tl-3xl border-t border-l border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute left-6 bottom-6 h-14 w-14 rounded-br-3xl border-b border-r border-[color:var(--bright-gold)]/50" />
          <div className="pointer-events-none absolute right-6 bottom-6 h-14 w-14 rounded-bl-3xl border-b border-l border-[color:var(--bright-gold)]/50" />

          <div className="relative px-6 py-10 sm:px-10 sm:py-14">
            {/* Top line */}
            <p className="text-center text-sm tracking-[0.35em] text-[color:var(--bright-gold)]/90">
              SAVE THE DATE
            </p>

            {/* Names */}
            <h1
              className="mt-5 text-center text-4xl sm:text-6xl"
              style={{ fontFamily: "var(--font-display-cinzel)" }}
            >
              Leo <span className="text-[color:var(--bright-gold)]">&amp;</span> Blaine
            </h1>

            {/* Tagline */}
            <p className="mt-4 text-center text-lg text-[color:var(--bone)]/85">
              'Til death do us part
            </p>

            {/* Divider */}
            <div className="mx-auto mt-8 h-px w-40 bg-[color:var(--antique-gold)]/50" />

            {/* Date + location */}
            <div className="mt-8 text-center">
              <p className="text-xl text-[color:var(--bright-gold)]">
                Thursday, October 29th, 2026
              </p>
              <p className="mt-2 text-sm tracking-[0.25em] text-[color:var(--bone)]/70">
                AUSTELL, GEORGIA
              </p>
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/rsvp"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-xl border border-[color:var(--bright-gold)]/60 bg-[color:var(--antique-gold)]/20 px-6 py-3 text-sm tracking-wide text-[color:var(--bone)] shadow-lg transition hover:bg-[color:var(--antique-gold)]/30"
              >
                RSVP
              </a>
              {/* <a
                href="/schedule"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-xl border border-[color:var(--bright-gold)]/30 bg-transparent px-6 py-3 text-sm tracking-wide text-[color:var(--bone)]/90 transition hover:border-[color:var(--bright-gold)]/60 hover:bg-white/5"
              >
                View Schedule
              </a> */}
            </div>

            {/* Feature tiles (theme hints) */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Itinerary", desc: "Schedule and  activities.", tone: "rgba(53, 74, 40, 0.5)" },
                { title: "FAQ", desc: "Dress code, menu, and venue details.", tone: "rgba(84, 45, 85, 0.5)" },
                { title: "Donations", desc: "Gifts and well-wishes.", tone: "rgba(217, 169, 97, 0.4)" },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 p-5"
                  style={{ background: `linear-gradient(180deg, ${card.tone}, rgba(14,13,14,0.55))` }}
                >
                  <p
                    className="text-lg text-[color:var(--bright-gold)]"
                    style={{ fontFamily: "var(--font-display-cinzel)" }}
                  >
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--bone)]/75">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Footer whisper */}
            <p className="mt-12 text-center text-xs tracking-[0.35em] text-[color:var(--bone)]/45">
              A GRAVE DECISION…
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}