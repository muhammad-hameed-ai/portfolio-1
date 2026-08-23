"use client"

import { motion } from "framer-motion"

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-6 w-6">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55v-2.15c-3.2.7-3.88-1.35-3.88-1.35-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.17v3.21c0 .31.21.67.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  )
}

function IconWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.5-.17 0-.37-.02-.56-.02-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.2 3.01.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.13-.27-.2-.56-.35ZM12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.09-1.33A9.96 9.96 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2Z" />
    </svg>
  )
}

interface SocialIconsRowProps {
  email: string
  linkedin: string
  github: string
  whatsappNote: string
}

export function SocialIconsRow({ email, linkedin, github, whatsappNote }: SocialIconsRowProps) {
  const socials = [
    { label: "Email", icon: <IconMail />, href: `mailto:${email}`, external: false },
    { label: "LinkedIn", icon: <IconLinkedin />, href: linkedin, external: true },
    { label: "GitHub", icon: <IconGithub />, href: github, external: true },
  ]

  return (
    <div className="mt-8 flex flex-col items-center gap-5">
      <div className="flex gap-4">
        {socials.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target={s.external ? "_blank" : undefined}
            rel={s.external ? "noopener noreferrer" : undefined}
            aria-label={s.label}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-[color:var(--color-muted)] transition-colors hover:border-[color:var(--color-orange)]/50 hover:text-[color:var(--color-orange)]"
          >
            {s.icon}
          </motion.a>
        ))}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-[color:var(--color-muted)]/50"
          title={whatsappNote}
        >
          <IconWhatsapp />
        </div>
      </div>
      <p className="font-mono text-xs text-[color:var(--color-muted)]">{whatsappNote}</p>
    </div>
  )
}
