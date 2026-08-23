"use client"

import { useEffect, useRef, type ReactNode } from "react"

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReduced) {
      // Respect the user's OS setting completely — native scroll, no Lenis, no GSAP ticker hijack.
      return
    }

    let lenis: import("lenis").default | null = null
    let rafId: number

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })

        // Keep ScrollTrigger's measurements in sync with Lenis's virtual scroll position.
        lenis.on("scroll", ScrollTrigger.update)

        // Drive Lenis from GSAP's ticker instead of its own rAF loop, so both
        // systems share one clock and never fight each other for a frame.
        gsap.ticker.add((time) => {
          lenis?.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        // Smooth-scroll anchor links, whether written as "#section" (same
        // page) or "/#section" (from another page, but resolves to the
        // current document once you're already on "/").
        const handleAnchorClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement
          const anchor = target.closest("a") as HTMLAnchorElement | null
          if (!anchor) return

          const href = anchor.getAttribute("href") ?? ""
          const hashIndex = href.indexOf("#")
          if (hashIndex === -1) return

          const path = href.slice(0, hashIndex)
          const id = href.slice(hashIndex + 1)
          if (!id) return

          // Only intercept if this resolves to the CURRENT document —
          // otherwise let the browser navigate to the other page normally.
          const isSamePage = path === "" || path === window.location.pathname
          if (!isSamePage) return

          const el = document.getElementById(id)
          if (!el) return

          e.preventDefault()
          lenis?.scrollTo(el, { offset: -72 })
        }
        document.addEventListener("click", handleAnchorClick)

        rafId = requestAnimationFrame(function loop(time) {
          rafId = requestAnimationFrame(loop)
        })

        ;(window as any).__lenisCleanup = () => {
          document.removeEventListener("click", handleAnchorClick)
          lenis?.destroy()
          cancelAnimationFrame(rafId)
        }
      }
    )

    return () => {
      ;(window as any).__lenisCleanup?.()
    }
  }, [])

  return <>{children}</>
}
