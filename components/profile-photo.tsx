"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export function ProfilePhoto({ src }: { src: string }) {
  const [errored, setErrored] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReduced) {
      el.style.clipPath = "inset(0 0 0 0)"
      el.style.opacity = "1"
      return
    }

    import("gsap").then(({ gsap }) => {
      gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 0 })
      gsap.to(el, {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1.1,
        ease: "power3.inOut",
        delay: 0.3,
      })
    })
  }, [])

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[color:var(--color-orange)] via-[color:var(--color-blue)] to-[color:var(--color-orange)] opacity-60 blur-2xl"
      />
      <div
        ref={ref}
        className="relative aspect-[4/5] w-64 overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--color-surface)] shadow-2xl sm:w-72"
      >
        {!errored ? (
          <Image
            src={src}
            alt="Muhammad Hameed"
            fill
            sizes="288px"
            className="object-cover"
            onError={() => setErrored(true)}
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[color:var(--color-surface-hi)]">
            <span className="font-[family-name:var(--font-display)] text-5xl font-semibold text-[color:var(--color-orange)]">
              MH
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
