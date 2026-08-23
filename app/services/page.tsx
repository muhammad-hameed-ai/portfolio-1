import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { AmbientGlow } from "@/components/ambient-glow"
import { ServicesHeader } from "@/components/services-header"
import { ServicesGrid } from "@/components/services-grid"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getSiteContent, getSettings, getServices } from "@/lib/store"

// Forces this page to render fresh on every request instead of being
// frozen as static HTML at build time — required so Admin Panel edits
// appear immediately without a rebuild.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Services — Muhammad Hameed",
  description:
    "Fixed-scope AI engineering services: custom model development, RAG & LLM integration, on-device deployment, and ongoing MLOps maintenance.",
}

export default function ServicesPage() {
  const content = getSiteContent()
  const settings = getSettings()
  const services = getServices()

  return (
    <>
      <AmbientGlow />
      <SiteHeader />
      <main>
        <ServicesHeader />
        <ServicesGrid services={services} />
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
