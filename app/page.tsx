import { SiteHeader } from "@/components/site-header"
import { AmbientGlow } from "@/components/ambient-glow"
import { Hero } from "@/components/hero"
import { StatStrip } from "@/components/stat-strip"
import { ServicesTeaser } from "@/components/services-teaser"
import { FeaturedWork } from "@/components/featured-work"
import { Recognition } from "@/components/recognition"
import { CertifiedByMarquee } from "@/components/certified-by-marquee"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getSiteContent, getSettings, getPortfolio } from "@/lib/store"

// Forces this page to render fresh on every request instead of being
// frozen as static HTML at build time — required so Admin Panel edits
// appear immediately without a rebuild.


export default function Home() {
  // Server Component: reads current data straight from disk on every
  // request. An Admin Panel edit is reflected the very next page load.
  const content = getSiteContent()
  const settings = getSettings()
  const portfolio = getPortfolio()

  return (
    <>
      <AmbientGlow />
      <SiteHeader />
      <main>
        <Hero
          name={content.candidate.name}
          title={content.candidate.title}
          tagline={content.candidate.tagline}
          location={content.candidate.location}
          profilePhoto={settings.profilePhoto}
        />
        <StatStrip stats={content.heroStats} />
        <ServicesTeaser services={content.services_teaser} />
        <FeaturedWork projects={portfolio} />
        <Recognition recognition={content.recognition} />
        <CertifiedByMarquee certifiedBy={content.certifiedBy} />
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
