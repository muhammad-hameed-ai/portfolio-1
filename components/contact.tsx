"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { TapLink } from "@/components/tap-link"

export function Contact({ email, linkedin }: { email: string; linkedin: string }) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-5xl">
          Have a project in mind?
          <span className="mt-2 block bg-gradient-to-r from-[color:var(--color-orange)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
            Let&apos;s build it right.
          </span>
        </h2>
        <p className="mt-5 text-[color:var(--color-muted)]">
          Open to AI Engineering, Computer Vision, and MLOps roles — remote or on-site.
        </p>

        <div ref={ref} className="mt-9 flex flex-wrap justify-center gap-4">
          <TapLink
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--color-orange)] to-[color:var(--color-orange-light)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,106,26,0.35)]"
          >
            {email}
          </TapLink>
          <TapLink
            href={linkedin}
            external
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-[color:var(--color-blue)]/50 hover:text-[color:var(--color-blue)]"
          >
            LinkedIn ↗
          </TapLink>
        </div>
      </div>
    </section>
  )
}
