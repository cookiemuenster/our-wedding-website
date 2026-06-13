import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { nanoid } from "nanoid";
import crypto from "crypto";

export const runtime = "nodejs";

const BodySchema = z.object({
  code: z.string().min(1),
  files: z.array(
    z.object({
      name: z.string().min(1),
      type: z.string().min(1),
      size: z.number().int().positive(),
    })
  ).min(1).max(25),
});

const MAX_PHOTO_BYTES = 15 * 1024 * 1024; // 15MB
const MAX_VIDEO_BYTES = 300 * 1024 * 1024; // 300MB
const ALLOWED_IMAGE = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
const ALLOWED_VIDEO = new Set(["video/mp4", "video/quicktime", "video/webm"]);

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function sanitizeFilename(name: string) {
  // keep it simple + safe for object keys
  return name
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .slice(-120);
}

function isAllowed(type: string) {
  return ALLOWED_IMAGE.has(type) || ALLOWED_VIDEO.has(type);
}

function maxBytesFor(type: string) {
  if (ALLOWED_VIDEO.has(type)) return MAX_VIDEO_BYTES;
  return MAX_PHOTO_BYTES;
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { code, files } = BodySchema.parse(json);

    const expected = process.env.WEDDING_UPLOAD_CODE ?? "";
    if (!expected || !safeEqual(code, expected)) {
      return NextResponse.json({ error: "Invalid upload code." }, { status: 401 });
    }

    // validate files
    for (const f of files) {
      if (!isAllowed(f.type)) {
        return NextResponse.json({ error: `File type not allowed: ${f.type}` }, { status: 400 });
      }
      const max = maxBytesFor(f.type);
      if (f.size > max) {
        return NextResponse.json(
          { error: `File too large: ${f.name} (max ${(max / 1024 / 1024).toFixed(0)}MB)` },
          { status: 400 }
        );
      }
    }

    const bucket = process.env.R2_BUCKET_NAME!;
    const now = new Date();
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(now.getUTCDate()).padStart(2, "0");

    const presigned = await Promise.all(
      files.map(async (f) => {
        const id = nanoid(12);
        const safe = sanitizeFilename(f.name);
        const key = `guest-uploads/${yyyy}/${mm}/${dd}/${id}-${safe}`;

        const cmd = new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          ContentType: f.type,
          // Keep objects private by default (recommended)
        });

        const url = await getSignedUrl(s3, cmd, { expiresIn: 60 * 5 }); // 5 minutes

        return { key, url, contentType: f.type };
      })
    );

    return NextResponse.json({ uploads: presigned });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Failed to create upload URLs." },
      { status: 400 }
    );
  }
}