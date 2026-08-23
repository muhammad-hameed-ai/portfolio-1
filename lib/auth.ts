import { getIronSession, type IronSession, type SessionOptions } from "iron-session"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

export interface SessionData {
  isLoggedIn: boolean
  username?: string
}

// The session cookie is encrypted and signed with this password. It ships
// with a real default so the Admin Panel works immediately for testing,
// but this MUST be changed to a long random string before the site goes
// live — see README.md. Anyone with this string could forge a valid admin
// session, so it is exactly as sensitive as the admin password itself.
const sessionPassword =
  process.env.SESSION_SECRET ?? "change-this-to-a-random-32-character-string-before-going-live"

export const sessionOptions: SessionOptions = {
  password: sessionPassword,
  cookieName: "admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}

export async function requireSession(): Promise<IronSession<SessionData> | null> {
  const session = await getSession()
  if (!session.isLoggedIn) return null
  return session
}

export function hashPassword(plain: string): string {
  return bcrypt.hashSync(plain, 10)
}

export function verifyPassword(plain: string, hash: string): boolean {
  return bcrypt.compareSync(plain, hash)
}
