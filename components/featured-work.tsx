"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { TapLink } from "@/components/tap-link"

interface Project {
  id: string
  name: string
  subtitle: string
  image: string
  live: string
  github: string
}

function ProjectTile({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.live || "#"}
      target={project.live ? "_blank" : undefined}
      rel={project.live ? "noopener noreferrer" : undefined}
      whileHover="hover"
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--color-surface)]"
    >
      {project.image ? (
        <motion.div
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </motion.div>
      ) : (
        <motion.div
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[color:var(--color-surface-hi)] to-[color:var(--color-surface)]"
        >
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white/20">
            {project.name}
          </span>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <motion.div
        variants={{ hover: { y: -4 } }}
        className="absolute inset-x-0 bottom-0 p-5"
      >
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
          {project.name}
        </h3>
        <p className="text-sm text-white/60">{project.subtitle}</p>
      </motion.div>
    </motion.a>
  )
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const ref = useScrollReveal<HTMLDivElement>({ childSelector: ":scope > a" })

  return (
    <section id="work" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
          Featured Work
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          Projects that are live right now.
        </h2>

        <div ref={ref} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <TapLink
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-medium text-white transition-colors hover:border-[color:var(--color-blue)]/50 hover:text-[color:var(--color-blue)]"
          >
            View Full Portfolio
          </TapLink>
        </div>
      </div>
    </section>
  )
}
