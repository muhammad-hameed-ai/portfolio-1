import { NextRequest, NextResponse } from "next/server"
import { getIronSession } from "iron-session"
import { sessionOptions, type SessionData } from "@/lib/auth"

// This runs on every request to /admin/*. If there's no valid, signed
// session cookie, the visitor is redirected to the login page before any
// admin page content is ever sent to the browser — the protection happens
// at the network level, not just by hiding a button in the UI.

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const session = await getIronSession<SessionData>(request, response, sessionOptions)

  if (!session.isLoggedIn) {
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: "/admin/:path*",
}
