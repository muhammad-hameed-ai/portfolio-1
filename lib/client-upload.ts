export async function uploadFileClientSide(file: File): Promise<string> {
  // First, attempt standard Vercel upload for small files if we want,
  // but it's simpler to just use GitHub direct upload for EVERYTHING to bypass limits.
  
  // 1. Fetch GitHub credentials securely
  const credsRes = await fetch("/api/admin/github-token")
  if (!credsRes.ok) throw new Error("Failed to authenticate for upload")
  
  const { token, owner, repo } = await credsRes.json()
  
  if (!token || !owner || !repo) {
    // Fallback to standard Vercel upload if GitHub integration is not configured
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Upload failed: ${res.status} ${errorText}`)
    }
    const data = await res.json()
    return data.path
  }

  // 2. Prepare file
  const ext = file.name.substring(file.name.lastIndexOf('.')) || ".jpg"
  const safeName = `${Date.now()}-${Math.floor(Math.random() * 10000)}${ext}`
  const filePath = `public/uploads/${safeName}`
  const publicPath = `/api/uploads/${safeName}`

  // Convert File to Base64
  const base64Content = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // result is "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      const base64 = result.split(",")[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })

  // 3. Upload directly to GitHub API
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`
  
  const putRes = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: `Upload ${safeName}`,
      content: base64Content,
      branch: "main",
      committer: {
        name: "Admin Panel",
        email: "admin-panel@portfolio.local",
      },
    }),
  })

  if (!putRes.ok) {
    const errorData = await putRes.json().catch(() => ({}))
    throw new Error(`GitHub API returned ${putRes.status}: ${JSON.stringify(errorData)}`)
  }

  // Next.js will fetch the image through the proxy on the client side
  return publicPath
}
