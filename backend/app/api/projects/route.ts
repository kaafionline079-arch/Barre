import { type NextRequest } from "next/server"
import { jsonResponse, optionsResponse } from "@/lib/cors"
import { createProject, deleteProject, getProjects, updateProject } from "@/lib/projects"
import { requireAuth, unauthorized } from "@/lib/middleware-auth"

export async function OPTIONS() {
  return optionsResponse()
}

export async function GET() {
  try {
    const projects = await getProjects()
    return jsonResponse({ projects })
  } catch (error) {
    console.error("Get projects error:", error)
    return jsonResponse({ error: "Database error" }, 500)
  }
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized()
  try {
    const body = await request.json()
    const project = await createProject({
      title: body.title,
      description: body.description || "",
      category: body.category || "web",
      image_url: body.image_url,
      live_url: body.live_url || null,
      github_url: body.github_url || null,
      tags: body.tags || [],
      sort_order: body.sort_order || 0,
    })
    return jsonResponse({ project }, 201)
  } catch (error) {
    console.error("Create project error:", error)
    return jsonResponse({ error: "Failed to create project" }, 500)
  }
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized()
  try {
    const body = await request.json()
    if (!body.id) return jsonResponse({ error: "Project id is required" }, 400)
    const project = await updateProject(body.id, body)
    if (!project) return jsonResponse({ error: "Project not found" }, 404)
    return jsonResponse({ project })
  } catch (error) {
    console.error("Update project error:", error)
    return jsonResponse({ error: "Failed to update project" }, 500)
  }
}

export async function DELETE(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized()
  try {
    const id = Number(request.nextUrl.searchParams.get("id"))
    if (!id) return jsonResponse({ error: "Project id is required" }, 400)
    const deleted = await deleteProject(id)
    if (!deleted) return jsonResponse({ error: "Project not found" }, 404)
    return jsonResponse({ success: true })
  } catch (error) {
    console.error("Delete project error:", error)
    return jsonResponse({ error: "Failed to delete project" }, 500)
  }
}
