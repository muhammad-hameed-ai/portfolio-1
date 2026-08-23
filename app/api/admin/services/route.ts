import { NextRequest, NextResponse } from "next/server"
import { requireSession } from "@/lib/auth"
import { getServices, saveServices, generateId, type Service } from "@/lib/store"

export async function GET() {
  return NextResponse.json(getServices())
}

export async function POST(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const body = await request.json()
  const services = getServices()

  const newService: Service = {
    id: generateId("svc"),
    title: body.title ?? "",
    description: body.description ?? "",
    price: body.price ?? "0",
    unit: body.unit ?? "per project",
    icon: body.icon ?? "brain",
  }

  services.push(newService)
  await saveServices(services)

  return NextResponse.json({ success: true, data: newService })
}

export async function PUT(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const body = await request.json()
  const services = getServices()
  const index = services.findIndex((s) => s.id === body.id)

  if (index === -1) {
    return NextResponse.json({ error: "Service not found." }, { status: 404 })
  }

  services[index] = { ...services[index], ...body }
  await saveServices(services)

  return NextResponse.json({ success: true, data: services[index] })
}

export async function DELETE(request: NextRequest) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "Not authenticated." }, { status: 401 })

  const { id } = await request.json()
  const services = getServices()
  const filtered = services.filter((s) => s.id !== id)

  if (filtered.length === services.length) {
    return NextResponse.json({ error: "Service not found." }, { status: 404 })
  }

  await saveServices(filtered)
  return NextResponse.json({ success: true })
}
