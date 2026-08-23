import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { AmbientGlow } from "@/components/ambient-glow"
import { AwardsHeader } from "@/components/awards-header"
import { AchievementsTimeline } from "@/components/achievements-timeline"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getSiteContent, getSettings, getAchievements } from "@/lib/store"

// Forces this page to render fresh on every request instead of being
// frozen as static HTML at build time — required so Admin Panel edits
// appear immediately without a rebuild.


export const metadata: Metadata = {
  title: "Awards & Achievements — Muhammad Hameed",
  description:
    "Verified credentials and recognition from Google, NASA, the Dubai Future Foundation, the Asian Development Bank Institute, Cisco, and CECOS University.",
}

export default function AwardsPage() {
  const content = getSiteContent()
  const settings = getSettings()
  const achievements = getAchievements()

  return (
    <>
      <AmbientGlow />
      <SiteHeader />
      <main>
        <AwardsHeader />
        <AchievementsTimeline achievements={achievements} />
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
