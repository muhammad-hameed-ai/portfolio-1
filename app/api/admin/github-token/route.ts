export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"

export async function GET() {
  const session = await requireSession()
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
  }

  // Get owner and repo from Vercel's automatic variables or GITHUB_REPO_URL
  let owner = process.env.VERCEL_GIT_REPO_OWNER || ""
  let repo = process.env.VERCEL_GIT_REPO_SLUG || ""
  const url = process.env.GITHUB_REPO_URL
  
  if (!owner || !repo) {
    if (url) {
      const match = url.match(/github\.com\/([^\/]+)\/([^\.]+)(\.git)?$/)
      if (match) {
        owner = match[1]
        repo = match[2]
      }
    }
  }

  return NextResponse.json({
    token: process.env.GITHUB_TOKEN || "",
    owner,
    repo
  })
}
