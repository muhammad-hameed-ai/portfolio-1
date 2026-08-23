"use client"

import { useEffect, useRef } from "react"

export function useScrollReveal<T extends HTMLElement>(options?: {
  childSelector?: string
  stagger?: number
  y?: number
}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) return

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        const targets = options?.childSelector
          ? el.querySelectorAll(options.childSelector)
          : el.children

        if (!targets.length) return

        ctx = gsap.context(() => {
          gsap.set(targets, { opacity: 0, y: options?.y ?? 24 })
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: options?.stagger ?? 0.08,
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          })
        }, el)

        requestAnimationFrame(() => {
          setTimeout(() => ScrollTrigger.refresh(), 300)
        })
      }
    )

    return () => ctx?.revert?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
