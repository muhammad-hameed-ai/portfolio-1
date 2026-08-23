import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getAdmin } from "@/lib/store"
import { verifyPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 })
  }

  const admin = getAdmin()

  if (username !== admin.username || !verifyPassword(password, admin.passwordHash)) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 })
  }

  const session = await getSession()
  session.isLoggedIn = true
  session.username = username
  await session.save()

  return NextResponse.json({ success: true })
}
