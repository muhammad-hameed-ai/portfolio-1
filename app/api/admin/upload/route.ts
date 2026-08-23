import { NextRequest, NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"
import fs from "fs"
import path from "path"
import { gitSync } from "@/lib/git-sync"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const MAX_SIZE = 8 * 1024 * 1024 // 8MB

export async function POST(request: NextRequest) {
  const session = await requireSession()
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WEBP, and GIF images are allowed." },
      { status: 400 }
    )
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large (max 8MB)." }, { status: 400 })
  }

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true })
  }

  const ext = path.extname(file.name) || ".jpg"
  const safeName = `${Date.now()}-${Math.floor(Math.random() * 10000)}${ext}`
  const filePath = path.join(UPLOAD_DIR, safeName)

  const bytes = await file.arrayBuffer()
  fs.writeFileSync(filePath, Buffer.from(bytes))

  const publicPath = `/uploads/${safeName}`

  // Auto-commit the uploaded file back to Git so it survives Render restarts
  gitSync([`public/uploads/${safeName}`], `Upload ${safeName}`)

  return NextResponse.json({ success: true, path: publicPath })
}
