"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Awards", href: "/awards" },
  { label: "Portfolio", href: "/portfolio" },
]

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <motion.a
      href={href}
      initial="rest"
      whileHover="hover"
      className="relative text-sm font-medium text-white/70 transition-colors hover:text-white"
    >
      {children}
      <motion.span
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0 }}
        className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-[color:var(--color-orange)]"
      />
    </motion.a>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[color:var(--color-background)]/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="/admin/login" className="font-[family-name:var(--font-display)] text-sm font-bold text-white">
          MH<span className="text-[color:var(--color-orange)]">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          <a
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[color:var(--color-orange)] to-[color:var(--color-orange-light)] px-4 py-2 text-xs font-semibold text-white"
          >
            Contact
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-[1.5px] w-5 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-5 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden border-t border-white/10 bg-[color:var(--color-background)] md:hidden"
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -8 }}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ delay: open ? i * 0.05 : 0 }}
              className="py-2.5 text-sm font-medium text-white"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </header>
  )
}
