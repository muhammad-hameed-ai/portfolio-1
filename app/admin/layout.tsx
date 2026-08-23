"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Page Text", href: "/admin/content" },
  { label: "Services", href: "/admin/services" },
  { label: "Awards", href: "/admin/achievements" },
  { label: "Portfolio", href: "/admin/portfolio" },
  { label: "Contact & Socials", href: "/admin/settings" },
  { label: "Theme", href: "/admin/theme" },
  { label: "Password", href: "/admin/password" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div data-theme="charcoal-orange" className="min-h-screen bg-[color:var(--color-background)]">
      {/* Mobile top bar — visible only below md, since the sidebar takes over above that */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-4 md:hidden">
        <a href="/admin" className="font-[family-name:var(--font-display)] text-base font-bold text-white">
          MH<span className="text-[color:var(--color-orange)]">.</span> Admin
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle admin menu"
          className="flex flex-col gap-1.5 p-2"
        >
          <span className={`h-[1.5px] w-5 bg-white transition-transform ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-white transition-transform ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="border-b border-white/10 bg-[color:var(--color-background)] px-5 py-4 md:hidden">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[color:var(--color-orange-soft)] text-[color:var(--color-orange)]"
                      : "text-[color:var(--color-muted)] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-4 w-full rounded-lg border border-white/10 px-3 py-2.5 text-left text-sm font-medium text-[color:var(--color-muted)] transition-colors hover:border-red-400/30 hover:text-red-300"
          >
            Log out
          </button>
          <a href="/" className="mt-3 block text-center text-xs text-[color:var(--color-muted)] hover:text-white">
            ← View live site
          </a>
        </div>
      )}

      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-white/[0.02] p-6 md:block">
          <a href="/admin" className="mb-8 block font-[family-name:var(--font-display)] text-lg font-bold text-white">
            MH<span className="text-[color:var(--color-orange)]">.</span> Admin
          </a>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[color:var(--color-orange-soft)] text-[color:var(--color-orange)]"
                      : "text-[color:var(--color-muted)] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-lg border border-white/10 px-3 py-2.5 text-left text-sm font-medium text-[color:var(--color-muted)] transition-colors hover:border-red-400/30 hover:text-red-300"
          >
            Log out
          </button>
          <a
            href="/"
            className="mt-3 block text-center text-xs text-[color:var(--color-muted)] hover:text-white"
          >
            ← View live site
          </a>
        </aside>

        <main className="flex-1 overflow-x-hidden p-6 sm:p-10">{children}</main>
      </div>
    </div>
  )
}
