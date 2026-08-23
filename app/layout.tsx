import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { getSettings } from "@/lib/store"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

import { getSiteContent } from "@/lib/store"

export async function generateMetadata(): Promise<Metadata> {
  const content = getSiteContent()
  const candidate = content.candidate || { name: "Muhammad Hameed", title: "AI Engineer", tagline: "AI Engineer Portfolio" }
  const title = `${candidate.name} — ${candidate.title}`
  
  // Use tagline for clean description
  const cleanDesc = candidate.tagline.replace(/[*_~`]/g, '')
  
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://muhammad-hameed.vercel.app"
    ),
    title: title,
    description: cleanDesc,
    openGraph: {
      title: title,
      description: cleanDesc,
      type: "website",
      siteName: title,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: cleanDesc,
    }
  }
}

export const viewport: Viewport = { width: "device-width", initialScale: 1 }

// Forces the layout (and therefore the theme it reads) to be evaluated
// fresh on every request rather than cached from build time — required
// for the Admin Panel's theme switcher to take effect immediately.
export const dynamic = "force-dynamic"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Reads the currently saved theme on every request, server-side. Changing
  // it in the Admin Panel takes effect on the very next page load — no
  // rebuild needed, since this is a runtime read, not a compile-time value.
  const settings = getSettings()

  return (
    <html
      lang="en"
      data-theme={settings.activeTheme}
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
