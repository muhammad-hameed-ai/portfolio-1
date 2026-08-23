"use client"

import { useState } from "react"
import { AdminInput, AdminButton } from "@/components/admin/admin-ui"

export default function PasswordAdminPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New password and confirmation do not match." })
      return
    }

    setLoading(true)
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newUsername, newPassword }),
    })
    setLoading(false)

    if (res.ok) {
      setMessage({ type: "success", text: "Credentials updated. Use your new login next time." })
      setCurrentPassword("")
      setNewUsername("")
      setNewPassword("")
      setConfirmPassword("")
    } else {
      const data = await res.json()
      setMessage({ type: "error", text: data.error || "Something went wrong." })
    }
  }

  return (
    <div className="max-w-lg">
      <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">Security</p>
      <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
        Change Username & Password
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">
        The Admin Panel currently ships with a default login (username: admin, password: Admin@123)
        so you could test it right away. Change it here before the site goes live — anyone who knows
        the default credentials could otherwise log in and edit your site.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <AdminInput label="Current Password" value={currentPassword} onChange={setCurrentPassword} />
        <AdminInput label="New Username (leave blank to keep 'admin')" value={newUsername} onChange={setNewUsername} />
        <AdminInput label="New Password (min 8 characters)" value={newPassword} onChange={setNewPassword} />
        <AdminInput label="Confirm New Password" value={confirmPassword} onChange={setConfirmPassword} />

        {message && (
          <p
            className={`rounded-lg border px-3 py-2 text-sm ${
              message.type === "success"
                ? "border-green-500/30 bg-green-500/10 text-green-300"
                : "border-red-500/30 bg-red-500/10 text-red-300"
            }`}
          >
            {message.text}
          </p>
        )}

        <AdminButton type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Credentials"}
        </AdminButton>
      </form>
    </div>
  )
}
