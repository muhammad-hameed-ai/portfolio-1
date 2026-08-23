import { NextRequest, NextResponse } from "next/server"
import { requireSession, hashPassword, verifyPassword } from "@/lib/auth"
import { getAdmin, saveAdmin } from "@/lib/store"

export async function POST(request: NextRequest) {
  const session = await requireSession()
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
  }

  const { currentPassword, newUsername, newPassword } = await request.json()

  const admin = getAdmin()

  if (!verifyPassword(currentPassword, admin.passwordHash)) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 })
  }

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters." },
      { status: 400 }
    )
  }

  await saveAdmin({
    username: newUsername && newUsername.trim() ? newUsername.trim() : admin.username,
    passwordHash: hashPassword(newPassword),
  })

  return NextResponse.json({ success: true })
}
