"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface TimelineItem {
  year: string
  title: string
  description: string
}

export function Timeline({ timeline }: { timeline: TimelineItem[] }) {
  const ref = useScrollReveal<HTMLOListElement>({ y: 20, stagger: 0.12 })

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-blue)]">
          Milestones
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          How I got here.
        </h2>

        <ol ref={ref} className="relative mt-12 space-y-10 border-l border-white/10 pl-8 sm:pl-10">
          {timeline.map((item, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full border-2 border-[color:var(--color-background)] sm:-left-[calc(2.5rem+5px)]"
                style={{
                  backgroundColor: i % 2 === 0 ? "var(--color-orange)" : "var(--color-blue)",
                  boxShadow: `0 0 12px ${i % 2 === 0 ? "rgba(255,106,26,0.6)" : "rgba(47,143,255,0.6)"}`,
                }}
              />
              <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
                {item.year}
              </span>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-white sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--color-muted)] sm:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
