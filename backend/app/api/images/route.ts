import { type NextRequest } from "next/server"
import { jsonResponse, optionsResponse } from "@/lib/cors"
import { createImage, deleteImage, getImages, updateImage } from "@/lib/images"
import { requireAuth, unauthorized } from "@/lib/middleware-auth"

export async function OPTIONS() {
  return optionsResponse()
}

export async function GET(request: NextRequest) {
  try {
    const section = request.nextUrl.searchParams.get("section") || undefined
    const images = await getImages(section)
    return jsonResponse({ images })
  } catch (error) {
    console.error("Get images error:", error)
    return jsonResponse({ error: "Database error" }, 500)
  }
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized()
  try {
    const body = await request.json()
    const image = await createImage({
      name: body.name,
      section: body.section,
      url: body.url,
      alt_text: body.alt_text || null,
      sort_order: body.sort_order || 0,
    })
    return jsonResponse({ image }, 201)
  } catch (error) {
    console.error("Create image error:", error)
    return jsonResponse({ error: "Failed to create image" }, 500)
  }
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized()
  try {
    const body = await request.json()
    if (!body.id) return jsonResponse({ error: "Image id is required" }, 400)
    const image = await updateImage(body.id, body)
    if (!image) return jsonResponse({ error: "Image not found" }, 404)
    return jsonResponse({ image })
  } catch (error) {
    console.error("Update image error:", error)
    return jsonResponse({ error: "Failed to update image" }, 500)
  }
}

export async function DELETE(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized()
  try {
    const id = Number(request.nextUrl.searchParams.get("id"))
    if (!id) return jsonResponse({ error: "Image id is required" }, 400)
    const deleted = await deleteImage(id)
    if (!deleted) return jsonResponse({ error: "Image not found" }, 404)
    return jsonResponse({ success: true })
  } catch (error) {
    console.error("Delete image error:", error)
    return jsonResponse({ error: "Failed to delete image" }, 500)
  }
}
