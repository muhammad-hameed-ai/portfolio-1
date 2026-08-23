export function PortfolioHeader() {
  return (
    <section className="pt-32 pb-4 sm:pt-40">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
          Portfolio
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Every project,
          <span className="mt-2 block bg-gradient-to-r from-[color:var(--color-orange)] to-[color:var(--color-blue)] bg-clip-text text-transparent">
            in full detail.
          </span>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
          Four shipped systems — each one live, verifiable, and documented honestly, including
          what didn&apos;t work the first time.
        </p>
      </div>
    </section>
  )
}
