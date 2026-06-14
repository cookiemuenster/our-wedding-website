import Link from "next/link";
import Image from "next/image";

export default function DonationPage() {
    return (
        <main className="min-h-screen px-4 py-10"> {/*min-h-screen. "px" controls padding on the x-axis. "py" controls padding on the y-axis.*/}
            <div className="mx-auto w-full max-w-5xl space-y-8"> {/*mx-auto. w-full. max-w-5xl. "space-y-8" controls spacing on the y-axis between components. */}
                <header className="text-center"> {/*"text-center centers text"*/}
                    <p className="text-sm tracking-[0.35em] text-[color:var(--bright-gold)]/80"> {/*"text-sm tracking-[0.35em]" controls spacing between letters. "text-[color:var(--bright-gold)]/80" controls the color of the text ("/80" controls the opacity of the text).*/}
                        DONATIONS
                    </p>

                    <h1
                        className="mt-4 text-3xl sm:text-5xl"
                        style={{ fontFamily: "var(--font-display-cinzel)" }}
                    > {/*mt-4 text-3xl sm:text-5xl*/} {/*{ fontFamily: "var(--font-display-cinzel)" }*/}
                        Gifts &amp; Well-Wishes
                    </h1>

                    <div className="mx-auto mt-8 max-x-xl"> {/*mx-auto mt-8 max-w-xl*/}
                        <div className="divider-ornate"/> {/*divider-ornate*/}
                    </div>
                </header>

                <section className="rounded-3xl border border-white/10 bg-black/10 p-6 sm:p-8 text-center"> {/*rounded-3xl border border-white/10 bg-black/10 p-6 sm:p-8 text-center*/}
                  <div className="flex flex-col items-center" >
                    <div className="mt-6 flex justify-center rounded-2xl border border-[color:var(--antique-gold)]/25 bg-black/20 p-6">
                      <Image
                        src="/images/zelle_email_qrcode.png"
                        alt="Zelle QR Code"
                        width={220}
                        height={220}
                        className="rounded-lg border border-[color:var(--antique-gold)]/30"
                      />
                    </div>
                    
                    <p className="mt-2 text-center">
                      Zelle: seafoodgarden@gmail.com
                    </p>
                    <p className="mt-4 text-center text-[color:var(--bone)]/75">
                      Scan with your banking app to send a gift through Zelle.
                    </p>
                  </div>

                  <div className="mt-8"> {/*mt-8*/}
                    <p className="text-sm text-[color:var(--bone)]/70 p-9"> {/*text-sm text-[color:var(--bone)]/70*/}
                    More details will be available as we get closer to the date.
                    </p>
                    <Link
                        href="/"
                        className="text-sm tracking-[0.2em] text-[color:var(--bright-gold)]/90 hover:text-[color:var(--bright-gold)]"
                      > {/*text-sm tracking-[0.2em] text-[color:var(--bright-gold)]/90 hover:text-[color:var(--bright-gold)]*/}
                        ← HOME
                    </Link>
                  </div>
                </section>
            </div>
        </main>
    );
}