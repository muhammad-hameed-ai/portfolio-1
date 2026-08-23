"use client"

import { useEffect, useRef } from "react"

interface CountUpOptions {
  value: number
  display: string
}

function parseFormat(display: string) {
  const prefix = display.startsWith("+") ? "+" : ""
  const suffix = display.endsWith("%") ? "%" : ""
  const numericPart = display.replace(/^\+/, "").replace(/%$/, "")
  const decimals = numericPart.includes(".") ? numericPart.split(".")[1].length : 0
  return { prefix, suffix, decimals }
}

export function useCountUp(options: CountUpOptions) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const { prefix, suffix, decimals } = parseFormat(options.display)

    if (prefersReduced) {
      el.textContent = options.display
      return
    }

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)

        const counter = { val: 0 }
        gsap.to(counter, {
          val: options.value,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`
          },
          onComplete: () => {
            el.textContent = options.display
          },
        })

        requestAnimationFrame(() => {
          setTimeout(() => ScrollTrigger.refresh(), 300)
        })
      }
    )
  }, [options.value, options.display])

  return ref
}
