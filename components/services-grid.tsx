"use client"

import type { ReactElement } from "react"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const icons: Record<string, ReactElement> = {
  brain: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-7 w-7">
      <path
        d="M9.5 2.5a3 3 0 0 0-3 3v.5A3.5 3.5 0 0 0 4 9.5v1a3.5 3.5 0 0 0 1 2.45V15a3.5 3.5 0 0 0 3.5 3.5h1V21h5v-2.5h1A3.5 3.5 0 0 0 19 15v-2.05a3.5 3.5 0 0 0 1-2.45v-1a3.5 3.5 0 0 0-2.5-3.5V5.5a3 3 0 0 0-3-3 2.98 2.98 0 0 0-2 .78 2.98 2.98 0 0 0-2-.78Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 8.5v7M14.5 8.5v7" strokeLinecap="round" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-7 w-7">
      <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  device: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-7 w-7">
      <rect x="6" y="2" width="12" height="20" rx="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  ),
  sync: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-7 w-7">
      <path
        d="M3 12a9 9 0 0 1 15.3-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.3 6.4L3 16M3 21v-5h5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

interface ServiceItem {
  id: string
  title: string
  description: string
  price: string
  unit: string
  icon: string
}

function ServiceCard({ service, i }: { service: ServiceItem; i: number }) {
  const accent = i % 2 === 0 ? "var(--color-orange)" : "var(--color-blue)"
  const glowColor = i % 2 === 0 ? "rgba(255,106,26,0.25)" : "rgba(47,143,255,0.25)"

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7"
      style={{ "--glow-color": glowColor } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 40px ${glowColor}` }}
      />

      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ backgroundColor: i % 2 === 0 ? "var(--color-orange-soft)" : "var(--color-blue-soft)", color: accent }}
      >
        {icons[service.icon]}
      </div>

      <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
        {service.title}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[color:var(--color-muted)]">
        {service.description}
      </p>

      <div className="mt-6 border-t border-white/10 pt-5">
        <span className="font-[family-name:var(--font-display)] text-2xl font-bold" style={{ color: accent }}>
          Starting at ${service.price}
        </span>
        <span className="ml-1.5 text-sm text-[color:var(--color-muted)]">{service.unit}</span>
      </div>
    </motion.div>
  )
}

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const ref = useScrollReveal<HTMLDivElement>({ childSelector: ":scope > div", stagger: 0.12 })

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div ref={ref} className="grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
