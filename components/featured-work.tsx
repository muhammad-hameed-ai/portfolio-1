"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
    >
      {project.image ? (
        <motion.div
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full"
        >
          {project.image.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={project.image}
              autoPlay
              loop
              muted
              playsInline
              className="block w-full h-auto"
            />
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="block w-full h-auto"
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="aspect-[16/10] sm:aspect-[4/3] w-full flex items-center justify-center bg-gradient-to-br from-[color:var(--color-surface-hi)] to-[color:var(--color-surface)]"
        >
          <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white/20">
            {project.name}
          </span>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <motion.div
        variants={{ hover: { y: -6 } }}
        className="absolute inset-x-0 bottom-0 p-6 lg:p-8"
      >
        <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-white drop-shadow-md">
          {project.name}
        </h3>
        <p className="mt-1 text-sm sm:text-base text-white/70 drop-shadow-md">{project.subtitle}</p>
      </motion.div>
    </motion.a>
  )
}

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!projects || projects.length === 0) return null

  const next = () => setCurrentIndex((i) => (i + 1) % projects.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + projects.length) % projects.length)

  // Drag/Swipe handler
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x
    if (swipe < -50) {
      next()
    } else if (swipe > 50) {
      prev()
    }
  }

  return (
    <section id="work" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
              Featured Work
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Projects that are live right now.
            </h2>
          </div>
        </div>

        {/* 3D Animated Coverflow Carousel */}
        <div className="relative mt-16 h-[320px] sm:h-[450px] lg:h-[550px] w-full flex items-center justify-center [perspective:1200px]">
          
          {/* Floating Premium Left Arrow */}
          <button 
            onClick={prev} 
            className="group absolute left-0 sm:left-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-black/40 bg-gradient-to-tr from-white/5 to-white/0 border border-white/10 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[color:var(--color-orange)] hover:bg-[color:var(--color-orange-soft)] hover:shadow-[0_0_30px_rgba(255,100,0,0.3)] hover:-translate-x-1"
            aria-label="Previous project"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              <ChevronLeft />
            </span>
          </button>

          {projects.map((project, index) => {
            // Calculate distance for infinite looping array
            let diff = index - currentIndex
            if (diff > projects.length / 2) diff -= projects.length
            if (diff < -projects.length / 2) diff += projects.length

            const isActive = diff === 0
            const isPrev = diff === -1
            const isNext = diff === 1

            let x = 0
            let scale = 1
            let opacity = 1
            let zIndex = 20
            let rotateY = 0

            if (isActive) {
              x = 0
              scale = 1
              opacity = 1
              zIndex = 20
              rotateY = 0
            } else if (isPrev) {
              x = -65 
              scale = 0.8
              opacity = 0.4
              zIndex = 10
              rotateY = 15
            } else if (isNext) {
              x = 65 
              scale = 0.8
              opacity = 0.4
              zIndex = 10
              rotateY = -15
            } else {
              x = diff > 0 ? 120 : -120
              scale = 0.6
              opacity = 0
              zIndex = 0
              rotateY = diff > 0 ? -25 : 25
            }

            return (
              <motion.div
                key={project.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isActive) setCurrentIndex(index)
                }}
                className={`absolute w-[85%] sm:w-[65%] lg:w-[50%] max-w-3xl origin-center ${isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                animate={{ x: `${x}%`, scale, opacity, zIndex, rotateY }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  pointerEvents: Math.abs(diff) <= 1 ? "auto" : "none" 
                }}
              >
                <div className={!isActive ? "pointer-events-none" : ""}>
                  <ProjectTile project={project} />
                </div>
              </motion.div>
            )
          })}

          {/* Floating Premium Right Arrow */}
          <button 
            onClick={next} 
            className="group absolute right-0 sm:right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-black/40 bg-gradient-to-tl from-white/5 to-white/0 border border-white/10 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[color:var(--color-orange)] hover:bg-[color:var(--color-orange-soft)] hover:shadow-[0_0_30px_rgba(255,100,0,0.3)] hover:translate-x-1"
            aria-label="Next project"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ChevronRight />
            </span>
          </button>
        </div>

        {/* View Full Portfolio Button */}
        <div className="mt-12 flex justify-center relative z-50">
          <TapLink
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[color:var(--color-blue)]/50 hover:text-[color:var(--color-blue)] shadow-lg"
          >
            View Full Portfolio
          </TapLink>
        </div>

      </div>
    </section>
  )
}
