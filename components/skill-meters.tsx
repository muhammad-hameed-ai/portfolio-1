"use client"

import { useSkillFill } from "@/hooks/use-skill-fill"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface Skill {
  name: string
  level: number
}

function SkillBar({ skill, i }: { skill: Skill; i: number }) {
  const { barRef, numberRef } = useSkillFill(skill.level)
  const accent = i % 2 === 0 ? "var(--color-orange)" : "var(--color-blue)"

  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-white sm:text-base">{skill.name}</span>
        <span
          ref={numberRef}
          className="font-mono text-sm font-semibold"
          style={{ color: accent }}
        >
          0%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ width: "0%", backgroundColor: accent }}
        />
      </div>
    </div>
  )
}

export function SkillMeters({ skills }: { skills: Skill[] }) {
  const ref = useScrollReveal<HTMLDivElement>({ childSelector: ":scope > div" })

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
          Core Skills
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          Where the depth actually is.
        </h2>

        <div ref={ref} className="mt-10 space-y-7">
          {skills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
