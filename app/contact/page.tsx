import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { AmbientGlow } from "@/components/ambient-glow"
import { ContactPageContent } from "@/components/contact-page-content"
import { Footer } from "@/components/footer"
import { getSiteContent, getSettings } from "@/lib/store"

// Forces this page to render fresh on every request instead of being
// frozen as static HTML at build time — required so Admin Panel edits
// appear immediately without a rebuild.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Contact — Muhammad Hameed",
  description:
    "Get in touch about AI engineering projects, collaborations, or roles — email, LinkedIn, GitHub, or the contact form below.",
}

export default function ContactPage() {
  const content = getSiteContent()
  const settings = getSettings()

  return (
    <>
      <AmbientGlow />
      <SiteHeader />
      <main>
        <ContactPageContent
          intro={content.contact.intro}
          email={settings.contactEmail}
          linkedin={settings.linkedin}
          github={settings.github}
          whatsappNote={settings.whatsappNote}
          projectTypes={content.contact.projectTypes}
          budgetRanges={content.contact.budgetRanges}
        />
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
