export function CertifiedByMarquee({ certifiedBy }: { certifiedBy: string[] }) {
  // Duplicate the list so the loop is seamless
  const loop = [...certifiedBy, ...certifiedBy]

  return (
    <section className="border-y border-white/10 py-10">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
        Certified &amp; Recognized By
      </p>
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max gap-14 whitespace-nowrap">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-[family-name:var(--font-display)] text-xl font-semibold text-white/30 transition-colors hover:text-white/60"
            >
              {name}
            </span>
          ))}
        </div>
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-background)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-background)] to-transparent" />
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
