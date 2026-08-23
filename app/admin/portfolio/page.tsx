"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AdminInput, AdminButton, useSaveStatus, SaveStatusLabel } from "@/components/admin/admin-ui"

interface Project {
  id: string
  name: string
  subtitle: string
  image: string
  live: string
  github: string
}

const empty: Omit<Project, "id"> = { name: "", subtitle: "", image: "", live: "", github: "" }

function ImageUploader({ value, onChange }: { value: string; onChange: (path: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      setUploading(false)
      if (res.ok) {
        const data = await res.json()
        onChange(data.path)
      } else {
        const errorText = await res.text()
        alert(`Upload failed: ${res.status} ${errorText}`)
      }
    } catch (e: any) {
      setUploading(false)
      alert(`Upload failed (Network/Crash): ${e.message}`)
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white">Thumbnail Image</label>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-28 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
          {value ? (
            <Image src={value} alt="Thumbnail" width={112} height={80} className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-[color:var(--color-muted)]">No image</span>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <AdminButton variant="secondary" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload New Image"}
        </AdminButton>
      </div>
    </div>
  )
}

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<Project[]>([])
  const [editing, setEditing] = useState<Record<string, Project>>({})
  const [newItem, setNewItem] = useState(empty)
  const [showNew, setShowNew] = useState(false)
  const { status, save } = useSaveStatus()

  const load = () => fetch("/api/admin/portfolio").then((r) => r.json()).then(setItems)
  useEffect(() => { load() }, [])

  const startEdit = (p: Project) => setEditing((prev) => ({ ...prev, [p.id]: { ...p } }))

  const saveEdit = (id: string) => {
    save(async () => {
      const res = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing[id]),
      })
      await load()
      setEditing((p) => { const n = { ...p }; delete n[id]; return n })
      return res
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return
    save(async () => {
      const res = await fetch("/api/admin/portfolio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      await load()
      return res
    })
  }

  const handleAdd = () => {
    save(async () => {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      })
      await load()
      setNewItem(empty)
      setShowNew(false)
      return res
    })
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">Portfolio</p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Manage Portfolio Projects
          </h1>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            These projects appear in the Home page&apos;s Featured Work section and the full Portfolio page.
          </p>
        </div>
        <SaveStatusLabel status={status} />
      </div>

      <div className="space-y-4">
        {items.map((p) => {
          const isEditing = !!editing[p.id]
          const val = isEditing ? editing[p.id] : p
          return (
            <div key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <AdminInput label="Name" value={val.name} onChange={(v) => setEditing((pr) => ({ ...pr, [p.id]: { ...val, name: v } }))} />
                    <AdminInput label="Subtitle" value={val.subtitle} onChange={(v) => setEditing((pr) => ({ ...pr, [p.id]: { ...val, subtitle: v } }))} />
                  </div>
                  <ImageUploader value={val.image} onChange={(path) => setEditing((pr) => ({ ...pr, [p.id]: { ...val, image: path } }))} />
                  <div className="grid grid-cols-2 gap-3">
                    <AdminInput label="Live URL" value={val.live} onChange={(v) => setEditing((pr) => ({ ...pr, [p.id]: { ...val, live: v } }))} />
                    <AdminInput label="GitHub URL" value={val.github} onChange={(v) => setEditing((pr) => ({ ...pr, [p.id]: { ...val, github: v } }))} />
                  </div>
                  <div className="flex gap-2">
                    <AdminButton onClick={() => saveEdit(p.id)}>Save</AdminButton>
                    <AdminButton variant="secondary" onClick={() => setEditing((pr) => { const n = { ...pr }; delete n[p.id]; return n })}>Cancel</AdminButton>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                      {p.image ? (
                        <Image src={p.image} alt={p.name} width={96} height={64} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-[10px] text-[color:var(--color-muted)]">No image</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">{p.name}</h3>
                      <p className="text-sm text-[color:var(--color-muted)]">{p.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <AdminButton variant="secondary" onClick={() => startEdit(p)}>Edit</AdminButton>
                    <AdminButton variant="danger" onClick={() => handleDelete(p.id)}>Delete</AdminButton>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        {showNew ? (
          <div className="rounded-2xl border border-[color:var(--color-orange)]/30 bg-white/[0.02] p-6">
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">New Project</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Name" value={newItem.name} onChange={(v) => setNewItem({ ...newItem, name: v })} />
                <AdminInput label="Subtitle" value={newItem.subtitle} onChange={(v) => setNewItem({ ...newItem, subtitle: v })} />
              </div>
              <ImageUploader value={newItem.image} onChange={(path) => setNewItem({ ...newItem, image: path })} />
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Live URL" value={newItem.live} onChange={(v) => setNewItem({ ...newItem, live: v })} />
                <AdminInput label="GitHub URL" value={newItem.github} onChange={(v) => setNewItem({ ...newItem, github: v })} />
              </div>
              <div className="flex gap-2">
                <AdminButton onClick={handleAdd}>Add Project</AdminButton>
                <AdminButton variant="secondary" onClick={() => setShowNew(false)}>Cancel</AdminButton>
              </div>
            </div>
          </div>
        ) : (
          <AdminButton onClick={() => setShowNew(true)}>+ Add New Project</AdminButton>
        )}
      </div>
    </div>
  )
}
