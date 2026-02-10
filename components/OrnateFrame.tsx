import React from "react";

export default function OrnateFrame({
    children, title, subtitle,
}: {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}) {
    return (
        <section className="relative overFlow-hidden rounded-3xl border border-[color:var(--border)] background-[color:var(--panel)] shadow-2x1">
            {/* soft velvet grain */}
            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 18% 10%, rgba(255, 255, 255, 0.00), transparent 35%), radial-gradient(circle at 84% 28%, rgba(255, 255, 255, 0.06), transparent 42%), radial-gradient(circle at 30% 92%, rgba(255, 255, 255, 0.05), transparent 45%)"
                }}
            />

            {/* corner hints */}
            {["tl", "tr", "bl", "br"].map((c) => (
                <div
                    key={c}
                    className={[
                        "pointer-events-none absolute h-14 w-14",
                        c === "tl" ? "left- top- rounded-tr-3xl border-r border-t" : "",
                        c === "tr" ? "right- top- rounded-tl-3xl border-l border-t" : "",
                        c === "bl" ? "left- bottom- rounded-br-3xl border-b border-r" : "",
                        c === "br" ? "right- bottom- rounded-bl-3xl border-b border-l" : "",
                        "border-[color:var(--gold-2)]/45",
                    ].join(" ")}
                />
            ))}

            <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                {(title || subtitle) && (
                    <header className="text-center">
                        {subtitle && (
                            <p className="text-xs tracking-[0.35em] text-[color:var(--gold-2)]/90">
                                {subtitle}
                            </p>
                        )}
                        {title && (
                            <h1 
                                className="mt-4 text-3xl sm:text-5xl"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {title}
                            </h1>
                        )}
                        <div className="mx-auto mt-7 h-px w-44 bg-[color:var(--gold)]/50" />
                    </header>
                )}

                <div className="mt-10">{children}</div>
            </div>
        </section>
    )
}