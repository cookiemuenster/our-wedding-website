import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

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