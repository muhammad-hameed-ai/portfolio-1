"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RecognitionItem {
  quote: string
  source: string
}

export function Recognition({ recognition }: { recognition: RecognitionItem[] }) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % recognition.length)
  const prev = () => setIndex((i) => (i - 1 + recognition.length) % recognition.length)

  return (
    <section id="recognition" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
          Recognition
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
          Real results, independently verifiable.
        </h2>

        <div className="relative mt-10 h-56 sm:h-44">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-8"
            >
              <p className="text-lg leading-relaxed text-white sm:text-xl">
                &ldquo;{recognition[index].quote}&rdquo;
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider text-[color:var(--color-blue)]">
                {recognition[index].source}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[color:var(--color-orange)] hover:text-[color:var(--color-orange)]"
          >
            ←
          </button>
          <div className="flex gap-2">
            {recognition.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to item ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-[color:var(--color-orange)]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[color:var(--color-orange)] hover:text-[color:var(--color-orange)]"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
