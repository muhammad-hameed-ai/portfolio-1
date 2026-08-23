import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { AmbientGlow } from "@/components/ambient-glow"
import { StoryNarrative } from "@/components/story-narrative"
import { Timeline } from "@/components/timeline"
import { SkillMeters } from "@/components/skill-meters"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getSiteContent, getSettings } from "@/lib/store"

// Forces this page to render fresh on every request instead of being
// frozen as static HTML at build time — required so Admin Panel edits
// appear immediately without a rebuild.


export const metadata: Metadata = {
  title: "About — Muhammad Hameed",
  description:
    "The story behind SkinGuard AI, SecureVision, and a production RAG pipeline — and why I build AI that has to work under real constraints, not just in a demo.",
}

export default function AboutPage() {
  const content = getSiteContent()
  const settings = getSettings()

  return (
    <>
      <AmbientGlow />
      <SiteHeader />
      <main>
        <StoryNarrative story={content.story} />
        <Timeline timeline={content.timeline} />
        <SkillMeters skills={content.skills} />
        <Contact email={settings.contactEmail} linkedin={settings.linkedin} />
      </main>
      <Footer
        name={content.candidate.name}
        location={content.candidate.location}
        email={settings.contactEmail}
        linkedin={settings.linkedin}
        github={settings.github}
      />
    </>
  )
}
