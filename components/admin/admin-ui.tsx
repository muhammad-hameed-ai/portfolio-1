"use client"

import { useState } from "react"

export function AdminInput({
  label,
  value,
  onChange,
  textarea,
  rows,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
  rows?: number
}) {
  const cls =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-[color:var(--color-orange)]/60 focus:shadow-[0_0_0_4px_rgba(255,106,26,0.12)]"

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows ?? 3}
          className={`${cls} resize-none`}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  )
}

export function AdminButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger"
  type?: "button" | "submit"
  disabled?: boolean
}) {
  const styles = {
    primary:
      "bg-gradient-to-r from-[color:var(--color-orange)] to-[#ff8c4a] text-white shadow-[0_4px_16px_rgba(255,106,26,0.3)]",
    secondary: "border border-white/15 text-white hover:border-white/30",
    danger: "border border-red-500/30 text-red-300 hover:bg-red-500/10",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

export function useSaveStatus() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const save = async (fn: () => Promise<Response>) => {
    setStatus("saving")
    try {
      const res = await fn()
      if (res.ok) {
        setStatus("saved")
        setTimeout(() => setStatus("idle"), 2000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return { status, save }
}

export function SaveStatusLabel({ status }: { status: "idle" | "saving" | "saved" | "error" }) {
  if (status === "saving") return <span className="text-sm text-[color:var(--color-muted)]">Saving...</span>
  if (status === "saved") return <span className="text-sm text-[color:var(--color-orange)]">✓ Saved</span>
  if (status === "error") return <span className="text-sm text-red-300">Something went wrong.</span>
  return null
}
