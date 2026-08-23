import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { AmbientGlow } from "@/components/ambient-glow"
import { PortfolioHeader } from "@/components/portfolio-header"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getSiteContent, getSettings, getPortfolio } from "@/lib/store"

// Forces this page to render fresh on every request instead of being
// frozen as static HTML at build time — required so Admin Panel edits
// appear immediately without a rebuild.


export const metadata: Metadata = {
  title: "Portfolio — Muhammad Hameed",
  description:
    "Every shipped AI project in full detail: SkinGuard AI, SecureVision, the Saudi Vision 2030 RAG Hub, and Kaggriculture.",
}

export default function PortfolioPage() {
  const content = getSiteContent()
  const settings = getSettings()
  const portfolio = getPortfolio()

  return (
    <>
      <AmbientGlow />
      <SiteHeader />
      <main>
        <PortfolioHeader />
        <PortfolioGrid projects={portfolio} />
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
