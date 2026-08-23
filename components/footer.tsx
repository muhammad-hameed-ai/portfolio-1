const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Awards", href: "/awards" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
]

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55v-2.15c-3.2.7-3.88-1.35-3.88-1.35-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.17v3.21c0 .31.21.67.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  )
}

interface FooterProps {
  name: string
  location: string
  email: string
  linkedin: string
  github: string
}

export function Footer({ name, location, email, linkedin, github }: FooterProps) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between lg:px-8">
        <span className="font-mono text-sm text-[color:var(--color-muted)]">
          © {new Date().getFullYear()} {name} · {location}
        </span>

        <nav className="flex gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-orange)]"
          >
            <IconMail />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-orange)]"
          >
            <IconLinkedin />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-orange)]"
          >
            <IconGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}
