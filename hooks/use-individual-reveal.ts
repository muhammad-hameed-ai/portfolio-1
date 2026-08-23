"use client"

import { useEffect, useRef } from "react"

/**
 * Unlike useScrollReveal (which staggers children from one shared parent
 * trigger), this gives EACH item its own independent ScrollTrigger — so an
 * achievement halfway down a long list only animates in when the visitor
 * actually scrolls to it, not when the section first enters view.
 */
export function useIndividualReveal<T extends HTMLElement>(index: number) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) return

    const fromLeft = index % 2 === 0

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.set(el, { opacity: 0, x: fromLeft ? -30 : 30, y: 16 })
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        })

        requestAnimationFrame(() => {
          setTimeout(() => ScrollTrigger.refresh(), 300)
        })
      }
    )
  }, [index])

  return ref
}
