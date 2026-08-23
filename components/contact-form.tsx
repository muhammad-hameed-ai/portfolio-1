"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const fieldBase =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200"

function useFieldGlow() {
  const [focused, setFocused] = useState(false)
  return {
    focused,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: `${fieldBase} ${
      focused
        ? "border-[color:var(--color-orange)]/60 shadow-[0_0_0_4px_rgba(255,106,26,0.12)]"
        : "border-white/10"
    }`,
  }
}

interface ContactFormProps {
  email: string
  projectTypes: string[]
  budgetRanges: string[]
}

export function ContactForm({ email, projectTypes, budgetRanges }: ContactFormProps) {
  const [name, setName] = useState("")
  const [visitorEmail, setVisitorEmail] = useState("")
  const [projectType, setProjectType] = useState(projectTypes[0])
  const [budget, setBudget] = useState(budgetRanges[0])
  const [message, setMessage] = useState("")

  const nameField = useFieldGlow()
  const emailField = useFieldGlow()
  const projectField = useFieldGlow()
  const budgetField = useFieldGlow()
  const messageField = useFieldGlow()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // No backend exists yet for this static site, so this opens the
    // visitor's own email client with everything pre-filled — a real,
    // working submission path with zero backend required. When a proper
    // form endpoint or the Admin Panel exists, this is the natural place
    // to swap in a real API call instead.
    const subject = encodeURIComponent(`New inquiry: ${projectType}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${visitorEmail}\nProject Type: ${projectType}\nBudget: ${budget}\n\nMessage:\n${message}`
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={nameField.onFocus}
            onBlur={nameField.onBlur}
            className={nameField.className}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={visitorEmail}
            onChange={(e) => setVisitorEmail(e.target.value)}
            onFocus={emailField.onFocus}
            onBlur={emailField.onBlur}
            className={emailField.className}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-white">
            Project Type
          </label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            onFocus={projectField.onFocus}
            onBlur={projectField.onBlur}
            className={`${projectField.className} appearance-none`}
          >
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-[color:var(--color-surface)]">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-white">
            Budget
          </label>
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            onFocus={budgetField.onFocus}
            onBlur={budgetField.onBlur}
            className={`${budgetField.className} appearance-none`}
          >
            {budgetRanges.map((b) => (
              <option key={b} value={b} className="bg-[color:var(--color-surface)]">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={messageField.onFocus}
          onBlur={messageField.onBlur}
          className={`${messageField.className} resize-none`}
          placeholder="Tell me about the project, role, or idea..."
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--color-orange)] to-[color:var(--color-orange-light)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,106,26,0.35)] transition-shadow hover:shadow-[0_8px_40px_rgba(255,106,26,0.5)] sm:w-auto"
      >
        Send Message
      </motion.button>
    </form>
  )
}
