const sections = [
  { title: "Page Text", href: "/admin/content", description: "Edit hero, story, and page copy across Home, About, and Contact." },
  { title: "Services", href: "/admin/services", description: "Add, edit, remove services and their prices." },
  { title: "Awards & Achievements", href: "/admin/achievements", description: "Add, edit, remove certifications and awards." },
  { title: "Portfolio Projects", href: "/admin/portfolio", description: "Add, edit, remove projects and their thumbnail images." },
  { title: "Contact & Socials", href: "/admin/settings", description: "Update email, WhatsApp note, LinkedIn, and GitHub links." },
  { title: "Theme", href: "/admin/theme", description: "Switch the entire site's color theme instantly." },
  { title: "Change Password", href: "/admin/password", description: "Update your admin username and password." },
]

export default function AdminDashboard() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
        Admin Panel
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-white">
        Dashboard
      </h1>
      <p className="mt-2 text-[color:var(--color-muted)]">
        Every change here saves to disk immediately and reflects on the live site on the next
        page load — no rebuild, no redeploy.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[color:var(--color-orange)]/40"
          >
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              {s.title}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">{s.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
