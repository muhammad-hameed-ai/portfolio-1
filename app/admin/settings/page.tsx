"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AdminInput, AdminButton, useSaveStatus, SaveStatusLabel } from "@/components/admin/admin-ui"

interface Settings {
  contactEmail: string
  whatsappNote: string
  linkedin: string
  github: string
  activeTheme: string
  profilePhoto: string
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { status, save } = useSaveStatus()

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then(setSettings)
  }, [])

  if (!settings) return <p className="text-[color:var(--color-muted)]">Loading...</p>

  const update = (key: keyof Settings, value: string) =>
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev))

  const handleSave = () => {
    save(() =>
      fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
    )
  }

  const handlePhotoUpload = async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
    setUploading(false)
    if (res.ok) {
      const data = await res.json()
      update("profilePhoto", data.path)
    } else {
      alert("Upload failed. Check the file type (JPG/PNG/WEBP/GIF) and size (max 8MB).")
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
            Contact & Socials
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Site-Wide Contact Details
          </h1>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            These appear in the footer, the Contact page, and every page&apos;s closing call-to-action.
          </p>
        </div>
        <SaveStatusLabel status={status} />
      </div>

      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white">Profile Photo (Hero section)</label>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              {settings.profilePhoto ? (
                <Image src={settings.profilePhoto} alt="Profile" width={80} height={80} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-[color:var(--color-muted)]">None</span>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
            />
            <AdminButton variant="secondary" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload New Photo"}
            </AdminButton>
          </div>
        </div>

        <AdminInput
          label="Contact Email"
          value={settings.contactEmail}
          onChange={(v) => update("contactEmail", v)}
        />
        <AdminInput
          label="WhatsApp Note (shown since the number itself stays private)"
          value={settings.whatsappNote}
          onChange={(v) => update("whatsappNote", v)}
        />
        <AdminInput
          label="LinkedIn URL"
          value={settings.linkedin}
          onChange={(v) => update("linkedin", v)}
        />
        <AdminInput
          label="GitHub URL"
          value={settings.github}
          onChange={(v) => update("github", v)}
        />
      </div>

      <div className="mt-6">
        <AdminButton onClick={handleSave}>Save Changes</AdminButton>
      </div>
    </div>
  )
}
