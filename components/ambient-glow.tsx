export function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="glow-blob-orange absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full bg-[color:var(--color-orange)] opacity-40 blur-[140px]"
      />
      <div
        className="glow-blob-blue absolute right-[-15%] top-[20%] h-[600px] w-[600px] rounded-full bg-[color:var(--color-blue)] opacity-35 blur-[160px]"
      />
      <div
        className="glow-blob-orange absolute bottom-[-15%] left-[20%] h-[480px] w-[480px] rounded-full bg-[color:var(--color-orange)] opacity-25 blur-[150px]"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  )
}
