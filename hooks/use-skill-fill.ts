"use client"

import { useEffect, useRef } from "react"

export function useSkillFill(level: number) {
  const barRef = useRef<HTMLDivElement | null>(null)
  const numberRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const bar = barRef.current
    const num = numberRef.current
    if (!bar) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReduced) {
      bar.style.width = `${level}%`
      if (num) num.textContent = `${level}%`
      return
    }

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        const counter = { val: 0 }
        gsap.set(bar, { width: "0%" })

        gsap.to(bar, {
          width: `${level}%`,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: { trigger: bar, start: "top 88%", once: true },
        })

        gsap.to(counter, {
          val: level,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: { trigger: bar, start: "top 88%", once: true },
          onUpdate: () => {
            if (num) num.textContent = `${Math.round(counter.val)}%`
          },
        })

        requestAnimationFrame(() => {
          setTimeout(() => ScrollTrigger.refresh(), 300)
        })
      }
    )
  }, [level])

  return { barRef, numberRef }
}
