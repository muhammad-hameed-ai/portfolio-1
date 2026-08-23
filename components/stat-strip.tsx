"use client"

import { useCountUp } from "@/hooks/use-count-up"

interface Stat {
  value: number
  display: string
  label: string
  sublabel: string
}

function StatItem({ stat, i }: { stat: Stat; i: number }) {
  const ref = useCountUp({ value: stat.value, display: stat.display })
  const accent = i % 2 === 0 ? "var(--color-orange)" : "var(--color-blue)"

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm sm:text-left">
      <span
        ref={ref}
        className="block font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl"
        style={{ color: accent }}
      >
        0
      </span>
      <span className="mt-2 block text-sm font-medium text-white">{stat.label}</span>
      <span className="text-xs text-[color:var(--color-muted)]">{stat.sublabel}</span>
    </div>
  )
}

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative py-6">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
