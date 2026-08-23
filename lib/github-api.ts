/**
 * GitHub API sync module.
 *
 * This commits saved data permanently to the repo via the GitHub REST API.
 * This approach works universally, including on hosts like Render that
 * do not include the `.git` folder in their production containers.
 */

// We extract owner and repo from the GITHUB_REPO_URL
function getRepoInfo() {
  const url = process.env.GITHUB_REPO_URL
  if (!url) return null

  // e.g. https://github.com/muhammad-hameed-ai/portfolio-1.git
  const match = url.match(/github\.com\/([^\/]+)\/([^\.]+)(\.git)?$/)
  if (!match) return null

  return { owner: match[1], repo: match[2] }
}

/**
 * Pushes a file directly to the GitHub repository using the REST API.
 *
 * @param filePath The file path relative to the repo root (e.g., "data/settings.json")
 * @param contentBuffer The raw content as a Buffer
 * @param commitMessage The commit message
 */
export async function pushToGitHub(
  filePath: string,
  contentBuffer: Buffer,
  commitMessage: string
): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  const repoInfo = getRepoInfo()

  if (!token || !repoInfo) {
    console.log(`[github-api] Skipping sync for ${filePath}: GITHUB_TOKEN or GITHUB_REPO_URL not set (local dev).`)
    return
  }

  const { owner, repo } = repoInfo
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  }

  try {
    // 1. Check if the file already exists to get its 'sha'
    let sha: string | undefined

    const getRes = await fetch(url, { headers })
    if (getRes.ok) {
      const data = await getRes.json()
      sha = data.sha
    } else if (getRes.status !== 404) {
      console.warn(`[github-api] Failed to get file info for ${filePath}: ${getRes.status} ${getRes.statusText}`)
      // Proceeding anyway, it might just be a new file
    }

    // 2. Put the new content (base64 encoded)
    const base64Content = contentBuffer.toString("base64")

    const body = JSON.stringify({
      message: commitMessage,
      content: base64Content,
      sha, // Must be provided if updating an existing file
      branch: "main",
      committer: {
        name: "Admin Panel",
        email: "admin-panel@portfolio.local",
      },
    })

    const putRes = await fetch(url, {
      method: "PUT",
      headers,
      body,
    })

    if (!putRes.ok) {
      const errorData = await putRes.json().catch(() => ({}))
      throw new Error(`GitHub API returned ${putRes.status}: ${JSON.stringify(errorData)}`)
    }

    console.log(`[github-api] Successfully pushed ${filePath} to GitHub.`)
  } catch (error: any) {
    console.error(`[github-api] Error pushing to GitHub:`, error.message)
    // We log the error but don't crash the server. 
    // It's better for the local save to succeed even if the remote sync fails.
  }
}
