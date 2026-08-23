"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function TapLink({
  href,
  children,
  className,
  external,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}) {
  return (
    <motion.a
      href={href}
      className={className}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </motion.a>
  )
}
