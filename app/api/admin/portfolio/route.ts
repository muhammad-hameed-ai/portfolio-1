import { NextRequest, NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"
import { getPortfolio, savePortfolio, generateId, type PortfolioProject } from "@/lib/store"

export async function GET() {
  return NextResponse.json(getPortfolio())
}

export async function POST(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const body = await request.json()
  const projects = getPortfolio()

  const newProject: PortfolioProject = {
    id: generateId("proj"),
    name: body.name ?? "",
    subtitle: body.subtitle ?? "",
    image: body.image ?? "",
    live: body.live ?? "",
    github: body.github ?? "",
  }

  projects.push(newProject)
  savePortfolio(projects)

  return NextResponse.json({ success: true, data: newProject })
}

export async function PUT(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const body = await request.json()
  const projects = getPortfolio()
  const index = projects.findIndex((p) => p.id === body.id)

  if (index === -1) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 })
  }

  projects[index] = { ...projects[index], ...body }
  savePortfolio(projects)

  return NextResponse.json({ success: true, data: projects[index] })
}

export async function DELETE(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const { id } = await request.json()
  const projects = getPortfolio()
  const filtered = projects.filter((p) => p.id !== id)

  if (filtered.length === projects.length) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 })
  }

  savePortfolio(filtered)
  return NextResponse.json({ success: true })
}
