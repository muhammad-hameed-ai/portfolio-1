import { NextRequest, NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"
import { getAchievements, saveAchievements, generateId, type Achievement } from "@/lib/store"

export async function GET() {
  return NextResponse.json(getAchievements())
}

export async function POST(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const body = await request.json()
  const achievements = getAchievements()

  const newAchievement: Achievement = {
    id: generateId("ach"),
    name: body.name ?? "",
    year: body.year ?? "",
    issuer: body.issuer ?? "",
    detail: body.detail ?? "",
    why: body.why ?? "",
  }

  achievements.push(newAchievement)
  await saveAchievements(achievements)

  return NextResponse.json({ success: true, data: newAchievement })
}

export async function PUT(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const body = await request.json()
  const achievements = getAchievements()
  const index = achievements.findIndex((a) => a.id === body.id)

  if (index === -1) {
    return NextResponse.json({ error: "Achievement not found." }, { status: 404 })
  }

  achievements[index] = { ...achievements[index], ...body }
  await saveAchievements(achievements)

  return NextResponse.json({ success: true, data: achievements[index] })
}

export async function DELETE(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const { id } = await request.json()
  const achievements = getAchievements()
  const filtered = achievements.filter((a) => a.id !== id)

  if (filtered.length === achievements.length) {
    return NextResponse.json({ error: "Achievement not found." }, { status: 404 })
  }

  await saveAchievements(filtered)
  return NextResponse.json({ success: true })
}
