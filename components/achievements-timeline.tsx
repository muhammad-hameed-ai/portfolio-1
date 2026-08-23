"use client"

import { useIndividualReveal } from "@/hooks/use-individual-reveal"

interface Achievement {
  id: string
  name: string
  year: string
  issuer: string
  detail: string
  why: string
}

function TrophyIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke={color} className="h-6 w-6">
      <path
        d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4ZM7 5H4a2 2 0 0 0 0 4h1M17 5h3a2 2 0 0 1 0 4h-1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AchievementCard({
  achievement,
  index,
}: {
  achievement: Achievement
  index: number
}) {
  const ref = useIndividualReveal<HTMLDivElement>(index)
  const accent = index % 2 === 0 ? "var(--color-orange)" : "var(--color-blue)"
  const accentSoft = index % 2 === 0 ? "var(--color-orange-soft)" : "var(--color-blue-soft)"
  const isLeft = index % 2 === 0

  return (
    <div className="relative sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-6">
      {/* Center line dot — desktop only */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-6 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[color:var(--color-background)] sm:block"
        style={{ backgroundColor: accent, boxShadow: `0 0 14px ${accent}` }}
      />

      {/* Mobile marker */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-6 h-3 w-3 rounded-full sm:hidden"
        style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
      />

      <div className={isLeft ? "sm:col-start-1" : "sm:col-start-3"}>
        <div
          ref={ref}
          className="ml-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:ml-0"
        >
          <div className="flex items-start gap-3.5">
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: accentSoft }}
            >
              <TrophyIcon color={accent} />
            </div>
            <div className="min-w-0">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-white">
                {achievement.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-[color:var(--color-muted)]">
                {achievement.year} · {achievement.issuer}
              </p>
              {achievement.detail && (
                <p className="mt-0.5 text-xs italic text-[color:var(--color-muted)]">
                  {achievement.detail}
                </p>
              )}
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
            {achievement.why}
          </p>
        </div>
      </div>

      {/* empty opposite column to preserve the alternating grid on desktop */}
      <div className={isLeft ? "hidden sm:col-start-3 sm:block" : "hidden sm:col-start-1 sm:block"} />
    </div>
  )
}

export function AchievementsTimeline({ achievements }: { achievements: Achievement[] }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="relative space-y-10">
          {/* Center vertical line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 hidden h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-white/10 sm:block"
          />
          {/* Mobile left line */}
          <div
            aria-hidden="true"
            className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-white/10 sm:hidden"
          />

          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
