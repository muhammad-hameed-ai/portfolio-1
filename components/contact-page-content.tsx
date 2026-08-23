"use client"

import { SocialIconsRow } from "@/components/social-icons-row"
import { ContactForm } from "@/components/contact-form"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface ContactPageContentProps {
  intro: string
  email: string
  linkedin: string
  github: string
  whatsappNote: string
  projectTypes: string[]
  budgetRanges: string[]
}

export function ContactPageContent({
  intro,
  email,
  linkedin,
  github,
  whatsappNote,
  projectTypes,
  budgetRanges,
}: ContactPageContentProps) {
  const ref = useScrollReveal<HTMLDivElement>({ y: 20 })

  return (
    <>
      <section className="pt-32 pb-4 sm:pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
            Contact
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Let&apos;s talk about
            <span className="mt-2 block bg-gradient-to-r from-[color:var(--color-orange)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
              what you&apos;re building.
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
            {intro}
          </p>

          <SocialIconsRow email={email} linkedin={linkedin} github={github} whatsappNote={whatsappNote} />
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <ContactForm email={email} projectTypes={projectTypes} budgetRanges={budgetRanges} />
          </div>
        </div>
      </section>
    </>
  )
}
