"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push("/admin")
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error || "Login failed.")
    }
  }

  return (
    <div
      data-theme="charcoal-orange"
      className="flex min-h-screen items-center justify-center bg-[color:var(--color-background)] px-6"
    >
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            MH<span className="text-[color:var(--color-orange)]">.</span>
          </span>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
        >
          <h1 className="mb-6 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            Sign in
          </h1>

          <div className="mb-4">
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-white">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[color:var(--color-orange)]/60 focus:shadow-[0_0_0_4px_rgba(255,106,26,0.12)]"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[color:var(--color-orange)]/60 focus:shadow-[0_0_0_4px_rgba(255,106,26,0.12)]"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-[color:var(--color-orange)] to-[#ff8c4a] px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-[color:var(--color-muted)]">
          <a href="/" className="hover:text-white">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  )
}
