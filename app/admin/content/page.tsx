"use client"

import { useEffect, useState } from "react"
import { AdminInput, AdminButton, useSaveStatus, SaveStatusLabel } from "@/components/admin/admin-ui"

export default function ContentEditorPage() {
  const [content, setContent] = useState<any>(null)
  const { status, save } = useSaveStatus()

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setContent)
  }, [])

  if (!content) return <p className="text-[color:var(--color-muted)]">Loading...</p>

  const handleSave = () => {
    save(() =>
      fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
    )
  }

  const update = (path: string, value: any) => {
    setContent((prev: any) => {
      const next = { ...prev }
      const keys = path.split(".")
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-orange)]">
            Page Text
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Home, About & Contact Copy
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <SaveStatusLabel status={status} />
          <AdminButton onClick={handleSave}>Save All Changes</AdminButton>
        </div>
      </div>

      <div className="space-y-8">
        {/* Candidate Info */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Identity (Hero Section)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Name" value={content.candidate.name} onChange={(v) => update("candidate.name", v)} />
            <AdminInput label="Title" value={content.candidate.title} onChange={(v) => update("candidate.title", v)} />
            <AdminInput label="Location" value={content.candidate.location} onChange={(v) => update("candidate.location", v)} />
          </div>
          <div className="mt-4">
            <AdminInput
              label="Tagline"
              value={content.candidate.tagline}
              onChange={(v) => update("candidate.tagline", v)}
              textarea
              rows={2}
            />
          </div>
        </section>

        {/* Hero Stats */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Hero Stats (Home Page)
          </h2>
          <div className="space-y-4">
            {content.heroStats.map((stat: any, i: number) => (
              <div key={i} className="grid gap-3 rounded-xl border border-white/10 p-4 sm:grid-cols-3">
                <AdminInput
                  label="Display Value"
                  value={stat.display}
                  onChange={(v) => {
                    const arr = [...content.heroStats]
                    arr[i] = { ...arr[i], display: v }
                    update("heroStats", arr)
                  }}
                />
                <AdminInput
                  label="Label"
                  value={stat.label}
                  onChange={(v) => {
                    const arr = [...content.heroStats]
                    arr[i] = { ...arr[i], label: v }
                    update("heroStats", arr)
                  }}
                />
                <AdminInput
                  label="Sublabel"
                  value={stat.sublabel}
                  onChange={(v) => {
                    const arr = [...content.heroStats]
                    arr[i] = { ...arr[i], sublabel: v }
                    update("heroStats", arr)
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Story (About page) */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Story (About Page)
          </h2>
          <div className="space-y-4">
            <AdminInput
              label="Headline"
              value={content.story.headline}
              onChange={(v) => update("story.headline", v)}
              textarea
              rows={2}
            />
            {content.story.paragraphs.map((p: string, i: number) => (
              <AdminInput
                key={i}
                label={`Paragraph ${i + 1}`}
                value={p}
                onChange={(v) => {
                  const arr = [...content.story.paragraphs]
                  arr[i] = v
                  update("story.paragraphs", arr)
                }}
                textarea
                rows={4}
              />
            ))}
            <AdminInput
              label="Differentiator quote (highlighted box)"
              value={content.story.differentiator}
              onChange={(v) => update("story.differentiator", v)}
              textarea
              rows={2}
            />
          </div>
        </section>

        {/* Timeline (About page) */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Milestone Timeline (About Page)
          </h2>
          <div className="space-y-4">
            {content.timeline.map((item: any, i: number) => (
              <div key={i} className="grid gap-3 rounded-xl border border-white/10 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <AdminInput
                    label="Year"
                    value={item.year}
                    onChange={(v) => {
                      const arr = [...content.timeline]
                      arr[i] = { ...arr[i], year: v }
                      update("timeline", arr)
                    }}
                  />
                  <AdminInput
                    label="Title"
                    value={item.title}
                    onChange={(v) => {
                      const arr = [...content.timeline]
                      arr[i] = { ...arr[i], title: v }
                      update("timeline", arr)
                    }}
                  />
                </div>
                <AdminInput
                  label="Description"
                  value={item.description}
                  onChange={(v) => {
                    const arr = [...content.timeline]
                    arr[i] = { ...arr[i], description: v }
                    update("timeline", arr)
                  }}
                  textarea
                  rows={2}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Skills (About page) */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Skill Meters (About Page)
          </h2>
          <div className="space-y-3">
            {content.skills.map((skill: any, i: number) => (
              <div key={i} className="grid grid-cols-[1fr_100px] gap-3">
                <AdminInput
                  label="Skill Name"
                  value={skill.name}
                  onChange={(v) => {
                    const arr = [...content.skills]
                    arr[i] = { ...arr[i], name: v }
                    update("skills", arr)
                  }}
                />
                <AdminInput
                  label="Level %"
                  value={String(skill.level)}
                  onChange={(v) => {
                    const arr = [...content.skills]
                    arr[i] = { ...arr[i], level: Number(v) || 0 }
                    update("skills", arr)
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Contact Intro */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Contact Page Intro
          </h2>
          <AdminInput
            label="Intro text"
            value={content.contact.intro}
            onChange={(v) => update("contact.intro", v)}
            textarea
            rows={3}
          />
        </section>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <SaveStatusLabel status={status} />
        <AdminButton onClick={handleSave}>Save All Changes</AdminButton>
      </div>
    </div>
  )
}
