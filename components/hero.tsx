import { ProfilePhoto } from "@/components/profile-photo"
import { HeroEntrance } from "@/components/hero-entrance"
import { TapLink } from "@/components/tap-link"

interface HeroProps {
  name: string
  title: string
  tagline: string
  location: string
  profilePhoto: string
}

export function Hero({ name, title, tagline, location, profilePhoto }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <HeroEntrance />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-20">
          <div className="flex justify-center lg:justify-start">
            <ProfilePhoto src={profilePhoto} />
          </div>

          <div>
            <div
              data-hero-eyebrow
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-orange)]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
                {location}
              </span>
            </div>

            <h1
              data-hero-headline
              className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {name}
              <span className="mt-2 block bg-gradient-to-r from-[color:var(--color-orange)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            <p
              data-hero-tagline
              className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--color-muted)] sm:text-xl"
            >
              {tagline}
            </p>

            <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-4">
              <TapLink
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--color-orange)] to-[color:var(--color-orange-light)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,106,26,0.35)] transition-shadow hover:shadow-[0_8px_40px_rgba(255,106,26,0.5)]"
              >
                View My Work
              </TapLink>
              <TapLink
                href="/Muhammad_Hameed_Resume.pdf"
                external={true}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Resume
              </TapLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
