"use client";

import { PutBucketAbac$ } from "@aws-sdk/client-s3";
import { useMemo, useState } from "react";

type PresignResp = {
    uploads: { key: string; url: string; contentType: string }[];
};

export default function UploadsPage() {
    const [code, setCode] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<string>("");
    const [progress, setProgress] = useState<Record<string, number>>({});

    const canUpload = useMemo(() => code.trim().length > 0 && files.length > 0, [code, files]);

    async function startUpload() {
        setStatus("");
        setProgress({});

        try {
            setStatus("Requesting upload links...");

            const res = await fetch("api/uploads/presign", {
                method: "POST",
                headers: { "Conent-Type": "application/json" },
                body: JSON.stringify({
                    code,
                    files: files.map((f) => ({ name: f.name, type: f.type, size: f.size})),
                }),
            });

            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j?.error || "Failed to start upload.");
            }

            const data = (await res.json()) as PresignResp;

            // Upload each file wih a PUT to the signed URL
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const u = data.uploads[i];

                setStatus(`Uploading ${i + 1} / ${files.length}: ${file.name}`);

                // fetch step-based progress status
                setProgress((p) => ({ ...p, [file.name]: 10}));

                const put = await fetch(u.url, {
                    method: "PUT",
                    headers: { "Conent-Type": u.contentType },
                    body: file,
                });

                if (!put.ok) throw new Error(`Upload failed: ${file.name}`);

                setProgress((p) => ({ ...p, [file.name]: 100 }));
            }

            setStatus("✅ Upload complete. Thank you!");
            setFiles([]);
        } catch (e: any) {
            setStatus(`❌ ${e.message ?? "Upload failed."}`);
        }
    }

    return (
        <main className="min-h-screen px-4 py-10">
            <div className="mx-auto w-full max-w-3xl space-y-6">
                <section className="rounded-3xl border border-[color:var(--antique-gold)]/40 bg-[color:var(--obsidian)]/70 p-6 shadow-2xl">
                    <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--bone)]">
                        Upload Photos & Videos
                    </h1>
                    <p className="mt-2 text-sm text-[color:var(--bone)]/70">
                        Please use the wedding upload code to share your favorite moments.
                    </p>

                    <div className="mt-6 space-y-4">
                        <label className="block">
                            <span className="text-sm text-[color:var(--bone)]/80">Upload code</span>
                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-[color:var(--bone)] outline-none focus:border-[color:var(--antique-gold)]/60"
                                placeholder="Enter code"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm text-[color:var(--bone)]/80">Choose files</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                                className="mt-2 block w-full text-sm text-[color:var(--bone)]/70 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-[color:var(--bone)] hover:file:bg-white/15"
                            />
                        </label>

                        <button
                            disabled={!canUpload}
                            onClick={startUpload}
                            className="w-full rounded-2xl bg-[color:var(--antique-gold)]/90 px-5 py-3 text-sm font-semibold text-black disabled:opacity-40"
                        >
                            Upload
                        </button>

                        {status && (
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-[color:var(--bone)]/85">
                                {status}
                            </div>
                        )}

                        {Object.keys(progress).length > 0 && (
                            <div className="space-y-2">
                                {Object.entries(progress).map(([name, pct]) => (
                                    <div key={name} className="rounded-xl border border-white/10 bg-black/20 p-3">
                                        <div className="flex items-center justify-between text-xs text-[color:var(--bone)]/75">
                                            <span className="truncate pr-3">{name}</span>
                                            <span>{pct}%</span>
                                        </div>
                                        <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                                            <div
                                                className="h-2 rounded-full bg-[color:var(--antique-gold)]/80"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}