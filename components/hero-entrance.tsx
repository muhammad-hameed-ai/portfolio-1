"use client"

import { useEffect } from "react"

export function HeroEntrance() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) return

    import("gsap").then(({ gsap }) => {
      const eyebrow = document.querySelector("[data-hero-eyebrow]")
      const headline = document.querySelector("[data-hero-headline]")
      const tagline = document.querySelector("[data-hero-tagline]")
      const cta = document.querySelector("[data-hero-cta]")

      if (!headline) return

      gsap.set([eyebrow, headline, tagline, cta].filter(Boolean), {
        opacity: 0,
        y: 20,
      })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 })
        .to(headline, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .to(tagline, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .to(cta, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
    })
  }, [])

  return null
}
