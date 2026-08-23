export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"
import { getSiteContent, saveSiteContent } from "@/lib/store"

export async function GET() {
  return NextResponse.json(getSiteContent())
}

export async function PUT(request: NextRequest) {
  const session = await requireSession()
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
  }

  const updates = await request.json()
  const current = getSiteContent()
  const merged = { ...current, ...updates }
  await saveSiteContent(merged)

  return NextResponse.json({ success: true, data: merged })
}
