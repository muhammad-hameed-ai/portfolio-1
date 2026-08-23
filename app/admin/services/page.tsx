"use client"

import { useEffect, useState } from "react"
import { AdminInput, AdminButton, useSaveStatus, SaveStatusLabel } from "@/components/admin/admin-ui"

interface Service {
  id: string
  title: string
  description: string
  price: string
  unit: string
  icon: string
}

const emptyService: Omit<Service, "id"> = {
  title: "",
  description: "",
  price: "0",
  unit: "per project",
  icon: "brain",
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [editing, setEditing] = useState<Record<string, Service>>({})
  const [newService, setNewService] = useState(emptyService)
  const [showNew, setShowNew] = useState(false)
  const { status, save } = useSaveStatus()

  const load = () => fetch("/api/admin/services").then((r) => r.json()).then(setServices)

  useEffect(() => {
    load()
  }, [])

  const startEdit = (s: Service) => setEditing((prev) => ({ ...prev, [s.id]: { ...s } }))

  const saveEdit = (id: string) => {
    save(async () => {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing[id]),
      })
      await load()
      setEditing((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      return res
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this service? This cannot be undone.")) return
    save(async () => {
      const res = await fetch("/api/admin/services", {
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
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      })
      await load()
      setNewService(emptyService)
      setShowNew(false)
      return res
    })
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
            Services
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Manage Services & Pricing
          </h1>
        </div>
        <SaveStatusLabel status={status} />
      </div>

      <div className="space-y-4">
        {services.map((s) => {
          const isEditing = !!editing[s.id]
          const val = isEditing ? editing[s.id] : s
          return (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              {isEditing ? (
                <div className="space-y-3">
                  <AdminInput
                    label="Title"
                    value={val.title}
                    onChange={(v) => setEditing((p) => ({ ...p, [s.id]: { ...val, title: v } }))}
                  />
                  <AdminInput
                    label="Description"
                    value={val.description}
                    onChange={(v) => setEditing((p) => ({ ...p, [s.id]: { ...val, description: v } }))}
                    textarea
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <AdminInput
                      label="Price (USD number only)"
                      value={val.price}
                      onChange={(v) => setEditing((p) => ({ ...p, [s.id]: { ...val, price: v } }))}
                    />
                    <AdminInput
                      label="Unit (e.g. per project, per month)"
                      value={val.unit}
                      onChange={(v) => setEditing((p) => ({ ...p, [s.id]: { ...val, unit: v } }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <AdminButton onClick={() => saveEdit(s.id)}>Save</AdminButton>
                    <AdminButton
                      variant="secondary"
                      onClick={() => setEditing((p) => { const n = { ...p }; delete n[s.id]; return n })}
                    >
                      Cancel
                    </AdminButton>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--color-muted)]">{s.description}</p>
                    <p className="mt-2 font-mono text-sm text-[color:var(--color-orange)]">
                      ${s.price} {s.unit}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <AdminButton variant="secondary" onClick={() => startEdit(s)}>Edit</AdminButton>
                    <AdminButton variant="danger" onClick={() => handleDelete(s.id)}>Delete</AdminButton>
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
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              New Service
            </h3>
            <div className="space-y-3">
              <AdminInput label="Title" value={newService.title} onChange={(v) => setNewService({ ...newService, title: v })} />
              <AdminInput label="Description" value={newService.description} onChange={(v) => setNewService({ ...newService, description: v })} textarea />
              <div className="grid grid-cols-2 gap-3">
                <AdminInput label="Price (USD number only)" value={newService.price} onChange={(v) => setNewService({ ...newService, price: v })} />
                <AdminInput label="Unit" value={newService.unit} onChange={(v) => setNewService({ ...newService, unit: v })} />
              </div>
              <div className="flex gap-2">
                <AdminButton onClick={handleAdd}>Add Service</AdminButton>
                <AdminButton variant="secondary" onClick={() => setShowNew(false)}>Cancel</AdminButton>
              </div>
            </div>
          </div>
        ) : (
          <AdminButton onClick={() => setShowNew(true)}>+ Add New Service</AdminButton>
        )}
      </div>
    </div>
  )
}
