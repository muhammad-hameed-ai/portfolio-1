import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
}

/**
 * Serve uploaded images dynamically from the filesystem.
 *
 * Next.js in production only serves files that existed in `public/` at
 * build time. Images uploaded via the Admin Panel at runtime live in
 * `public/uploads/` but aren't in the build snapshot, so we serve them
 * through this API route instead.
 *
 * URL pattern: /api/uploads/filename.ext
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const segments = (await params).path
  if (!segments || segments.length === 0) {
    return NextResponse.json({ error: "No file specified." }, { status: 400 })
  }

  // Only allow a single filename (no directory traversal)
  const filename = segments[segments.length - 1]
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400 })
  }

  const filePath = path.join(UPLOAD_DIR, filename)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found." }, { status: 404 })
  }

  const ext = path.extname(filename).toLowerCase()
  const contentType = MIME_TYPES[ext] || "application/octet-stream"

  const fileBuffer = fs.readFileSync(filePath)

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
