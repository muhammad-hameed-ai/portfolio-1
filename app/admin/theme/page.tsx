"use client"

import { useEffect, useState } from "react"
import { SaveStatusLabel, useSaveStatus } from "@/components/admin/admin-ui"

const themes = [
  {
    id: "charcoal-orange",
    name: "Charcoal Orange",
    colors: ["#0e0f12", "#ff6a1a", "#2f8fff"],
  },
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    colors: ["#0a0e1a", "#4f8cff", "#7bdfff"],
  },
  {
    id: "slate-purple",
    name: "Slate Purple",
    colors: ["#121018", "#a855f7", "#ec4899"],
  },
  {
    id: "emerald-dark",
    name: "Emerald Dark",
    colors: ["#0a1210", "#10b981", "#eab308"],
  },
]

export default function ThemeAdminPage() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const { status, save } = useSaveStatus()

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((s) => setActiveTheme(s.activeTheme))
  }, [])

  const selectTheme = (id: string) => {
    setActiveTheme(id)
    save(() =>
      fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeTheme: id }),
      })
    )
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">Theme</p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Site-Wide Color Theme
          </h1>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            Selecting a theme saves immediately and applies to every page on the next load — no rebuild needed.
          </p>
        </div>
        <SaveStatusLabel status={status} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {themes.map((theme) => {
          const isActive = activeTheme === theme.id
          return (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              className={`rounded-2xl border-2 p-5 text-left transition-all ${
                isActive
                  ? "border-[color:var(--color-orange)]"
                  : "border-white/10 hover:border-white/25"
              }`}
              style={{ backgroundColor: theme.colors[0] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-display)] text-base font-semibold text-white">
                  {theme.name}
                </span>
                {isActive && (
                  <span className="rounded-full bg-[color:var(--color-orange)] px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    Active
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                {theme.colors.map((c) => (
                  <div key={c} className="h-8 w-8 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
