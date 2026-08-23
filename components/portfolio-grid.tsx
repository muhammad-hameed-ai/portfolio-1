"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface Project {
  id: string
  name: string
  subtitle: string
  image: string
  live: string
  github: string
}

function PortfolioCard({ project, i }: { project: Project; i: number }) {
  const accent = i % 2 === 0 ? "var(--color-orange)" : "var(--color-blue)"

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-surface)]">
        {project.image ? (
          project.image.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={project.image}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--color-surface-hi)] to-[color:var(--color-surface)]">
            <span className="font-mono text-xs text-[color:var(--color-muted)]">
              screenshot / demo GIF goes here
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
          {project.name}
        </h2>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">{project.subtitle}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Live Demo ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/30"
            >
              GitHub ↗
            </a>
          )}
          {!project.live && !project.github && (
            <span className="font-mono text-xs text-[color:var(--color-muted)]">
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const ref = useScrollReveal<HTMLDivElement>({ childSelector: ":scope > div", stagger: 0.1 })

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div ref={ref} className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <PortfolioCard key={project.id} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
