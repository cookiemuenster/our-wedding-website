import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const BodySchema = z.object({
    code: z.string().min(1),
    uploads: z.array(
        z.object({
            key: z.string().min(1),
            originalName: z.string().min(1),
            mimeType: z.string().min(1),
            sizeBytes: z.number().int().positive(),
            caption: z.string().optional(),
            uploaderLabel: z.string().optional(),
        })
    ).min(1).max(25),
});

export async function POST(request : NextRequest) {
  try {
    const json = await request.json();
    BodySchema.parse(json);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid upload finalize request." },
      { status: 400 }
    );
  }
}