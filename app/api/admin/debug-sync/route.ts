export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server"

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const repoUrl = process.env.GITHUB_REPO_URL

  if (!token) return NextResponse.json({ error: "No GITHUB_TOKEN" })
  if (!repoUrl) return NextResponse.json({ error: "No GITHUB_REPO_URL" })

  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\.]+)(\.git)?$/)
  if (!match) return NextResponse.json({ error: "Invalid repo URL", repoUrl })

  const owner = match[1]
  const repo = match[2]
  const filePath = `data/test-debug-${Date.now()}.json`
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  }

  try {
    const putRes = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "Test commit from debug route",
        content: Buffer.from("{}").toString("base64"),
        branch: "main",
        committer: {
          name: "Admin Panel",
          email: "admin-panel@portfolio.local",
        },
      }),
    })

    const responseText = await putRes.text()
    
    // Also delete the file immediately after
    if (putRes.ok) {
        const parsed = JSON.parse(responseText)
        await fetch(url, {
            method: "DELETE",
            headers,
            body: JSON.stringify({
                message: "Cleanup test file",
                sha: parsed.content.sha,
                branch: "main",
                committer: {
                  name: "Admin Panel",
                  email: "admin-panel@portfolio.local",
                },
            })
        })
    }

    return NextResponse.json({
      status: putRes.status,
      statusText: putRes.statusText,
      response: responseText
    })

  } catch (error: any) {
    return NextResponse.json({ exception: error.message, stack: error.stack })
  }
}
