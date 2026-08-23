import { ImageResponse } from "next/og"
import { getSiteContent } from "@/lib/store"

export const alt = "Portfolio Preview"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
// Ensure this image is re-generated when visited if the data changes,
// though Vercel caches OG images effectively.
export const dynamic = "force-dynamic"

export default async function Image() {
  const content = getSiteContent()
  const candidate = content.candidate || { name: "Muhammad Hameed", title: "AI Engineer" }
  const initials = candidate.name.split(' ').map((n: string) => n[0]).join('')

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0C10", // sleek dark background
          backgroundImage: "linear-gradient(to bottom right, #0B0C10, #1A1A24)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "40px",
            padding: "80px",
            width: "100%",
            height: "100%",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo / Initials */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#FF6400", // Vibrant Orange accent
              marginBottom: "40px",
              letterSpacing: "-2px",
            }}
          >
            {initials}.
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 800,
              letterSpacing: "-3px",
              textAlign: "center",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            {candidate.name}
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: 500,
              color: "#A0AEC0",
              textAlign: "center",
            }}
          >
            {candidate.title}
          </div>
          
          <div
            style={{
               marginTop: "60px",
               display: "flex",
               gap: "20px"
            }}
          >
             <div style={{ padding: "10px 24px", background: "rgba(255, 100, 0, 0.2)", color: "#FF6400", borderRadius: "100px", fontSize: "24px", fontWeight: "bold" }}>Portfolio</div>
             <div style={{ padding: "10px 24px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "100px", fontSize: "24px" }}>Available for work</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
