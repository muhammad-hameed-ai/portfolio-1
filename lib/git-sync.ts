import { execFile } from "child_process"
import path from "path"

// -----------------------------------------------------------------------
// Git-Sync: auto-commit & push changed data/uploads back to GitHub
// -----------------------------------------------------------------------
// On Render's free tier the filesystem is ephemeral — it resets to the Git
// contents on every restart / redeploy.  To make Admin Panel edits durable
// we commit the changed files back to the repo and push, so the next
// deploy picks them up.
//
// This is a best-effort background operation: if it fails (e.g. no
// GITHUB_TOKEN, or running locally) it logs a warning and moves on.
// The admin save response is never delayed by the push.
// -----------------------------------------------------------------------

const ROOT = process.cwd()

/** Run a git command inside the project root. Returns stdout on success. */
function git(...args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile("git", args, { cwd: ROOT, timeout: 30_000 }, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(`git ${args.join(" ")} failed: ${stderr || err.message}`))
      } else {
        resolve(stdout.trim())
      }
    })
  })
}

/**
 * Stage, commit, and push the given file paths (relative to project root).
 *
 * Call this after writing to any data/*.json or public/uploads/* file.
 * The function is fire-and-forget — it runs in the background and never
 * throws to the caller.  If GITHUB_TOKEN is not set (local dev) it
 * silently skips.
 *
 * @param filePaths Array of paths relative to the project root,
 *                  e.g. ["data/settings.json", "public/uploads/12345.png"]
 * @param message   Commit message (optional, defaults to "Admin Panel update")
 */
export function gitSync(filePaths: string[], message = "Admin Panel update"): void {
  // Guard: skip entirely when there's no token (local dev / testing)
  if (!process.env.GITHUB_TOKEN) {
    console.log("[git-sync] GITHUB_TOKEN not set — skipping push (local dev mode)")
    return
  }

  // Fire-and-forget: do the whole sequence in the background
  ;(async () => {
    try {
      // Configure git identity (needed on Render's fresh containers)
      await git("config", "user.email", "admin-panel@portfolio.local")
      await git("config", "user.name", "Admin Panel")

      // Set the remote URL with the token for authentication
      const token = process.env.GITHUB_TOKEN
      const repoUrl = process.env.GITHUB_REPO_URL
      if (repoUrl) {
        // Insert token into HTTPS URL:  https://<token>@github.com/user/repo.git
        const authedUrl = repoUrl.replace("https://", `https://${token}@`)
        await git("remote", "set-url", "origin", authedUrl)
      }

      // Stage the specific files that changed
      for (const f of filePaths) {
        await git("add", f)
      }

      // Check if there's actually anything to commit
      const status = await git("status", "--porcelain")
      if (!status) {
        console.log("[git-sync] No changes to commit")
        return
      }

      await git("commit", "-m", message)
      await git("push", "origin", "main")

      console.log(`[git-sync] Pushed: ${message} (${filePaths.join(", ")})`)
    } catch (err) {
      // Never crash the server — just log the failure
      console.warn("[git-sync] Push failed (non-fatal):", (err as Error).message)
    }
  })()
}
