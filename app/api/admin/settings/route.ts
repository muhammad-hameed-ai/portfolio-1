import { NextRequest, NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"
import { getSettings, saveSettings } from "@/lib/store"

export async function GET() {
  return NextResponse.json(getSettings())
}

export async function PUT(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const updates = await request.json()
  const current = getSettings()
  const merged = { ...current, ...updates }
  await saveSettings(merged)

  return NextResponse.json({ success: true, data: merged })
}
