"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface Story {
  eyebrow: string
  headline: string
  paragraphs: string[]
  differentiator: string
}

export function StoryNarrative({ story }: { story: Story }) {
  const ref = useScrollReveal<HTMLDivElement>({ childSelector: ":scope > p" })

  return (
    <section className="pt-32 pb-16 sm:pt-40 lg:pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
          {story.eyebrow}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {story.headline}
        </h1>

        <div ref={ref} className="mt-8 space-y-5">
          {story.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[color:var(--color-orange)]/25 bg-[color:var(--color-orange-soft)] p-6">
          <p className="text-base font-medium leading-relaxed text-white sm:text-lg">
            &ldquo;{story.differentiator}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
