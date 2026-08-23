"use client"

import { useEffect, useState } from "react"
import { AdminInput, AdminButton, useSaveStatus, SaveStatusLabel } from "@/components/admin/admin-ui"

interface Achievement {
  id: string
  name: string
  year: string
  issuer: string
  detail: string
  why: string
}

const empty: Omit<Achievement, "id"> = { name: "", year: "", issuer: "", detail: "", why: "" }

export default function AchievementsAdminPage() {
  const [items, setItems] = useState<Achievement[]>([])
  const [editing, setEditing] = useState<Record<string, Achievement>>({})
  const [newItem, setNewItem] = useState(empty)
  const [showNew, setShowNew] = useState(false)
  const { status, save } = useSaveStatus()

  const load = () => fetch("/api/admin/achievements").then((r) => r.json()).then(setItems)
  useEffect(() => { load() }, [])

  const startEdit = (a: Achievement) => setEditing((p) => ({ ...p, [a.id]: { ...a } }))

  const saveEdit = (id: string) => {
    save(async () => {
      const res = await fetch("/api/admin/achievements", {
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
    if (!confirm("Delete this achievement? This cannot be undone.")) return
    save(async () => {
      const res = await fetch("/api/admin/achievements", {
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
      const res = await fetch("/api/admin/achievements", {
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
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">Awards</p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Manage Awards & Achievements
          </h1>
        </div>
        <SaveStatusLabel status={status} />
      </div>

      <div className="space-y-4">
        {items.map((a) => {
          const isEditing = !!editing[a.id]
          const val = isEditing ? editing[a.id] : a
          return (
            <div key={a.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              {isEditing ? (
                <div className="space-y-3">
                  <AdminInput label="Name" value={val.name} onChange={(v) => setEditing((p) => ({ ...p, [a.id]: { ...val, name: v } }))} />
                  <div className="grid grid-cols-2 gap-3">
                    <AdminInput label="Year" value={val.year} onChange={(v) => setEditing((p) => ({ ...p, [a.id]: { ...val, year: v } }))} />
                    <AdminInput label="Issuer" value={val.issuer} onChange={(v) => setEditing((p) => ({ ...p, [a.id]: { ...val, issuer: v } }))} />
                  </div>
                  <AdminInput label="Detail (optional)" value={val.detail} onChange={(v) => setEditing((p) => ({ ...p, [a.id]: { ...val, detail: v } }))} />
                  <AdminInput label="Why it matters" value={val.why} onChange={(v) => setEditing((p) => ({ ...p, [a.id]: { ...val, why: v } }))} textarea />
                  <div className="flex gap-2">
                    <AdminButton onClick={() => saveEdit(a.id)}>Save</AdminButton>
                    <AdminButton variant="secondary" onClick={() => setEditing((p) => { const n = { ...p }; delete n[a.id]; return n })}>Cancel</AdminButton>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">{a.name}</h3>
                    <p className="mt-1 font-mono text-xs text-[color:var(--color-muted)]">{a.year} · {a.issuer}</p>
                    <p className="mt-2 text-sm text-[color:var(--color-muted)]">{a.why}</p>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <AdminButton variant="secondary" onClick={() => startEdit(a)}>Edit</AdminButton>
                    <AdminButton variant="danger" onClick={() => handleDelete(a.id)}>Delete</AdminButton>
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
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">New Achievement</h3>
            <div className="space-y-3">
              <AdminInput label="Name" value={newItem.name} onChange={(v) => setNewItem({ ...newItem, name: v })} />
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Year" value={newItem.year} onChange={(v) => setNewItem({ ...newItem, year: v })} />
                <AdminInput label="Issuer" value={newItem.issuer} onChange={(v) => setNewItem({ ...newItem, issuer: v })} />
              </div>
              <AdminInput label="Detail (optional)" value={newItem.detail} onChange={(v) => setNewItem({ ...newItem, detail: v })} />
              <AdminInput label="Why it matters" value={newItem.why} onChange={(v) => setNewItem({ ...newItem, why: v })} textarea />
              <div className="flex gap-2">
                <AdminButton onClick={handleAdd}>Add Achievement</AdminButton>
                <AdminButton variant="secondary" onClick={() => setShowNew(false)}>Cancel</AdminButton>
              </div>
            </div>
          </div>
        ) : (
          <AdminButton onClick={() => setShowNew(true)}>+ Add New Achievement</AdminButton>
        )}
      </div>
    </div>
  )
}
