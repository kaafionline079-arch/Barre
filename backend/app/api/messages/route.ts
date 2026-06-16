import { type NextRequest } from "next/server"
import { jsonResponse, optionsResponse } from "@/lib/cors"
import { deleteMessage, getMessages } from "@/lib/messages"
import { requireAuth, unauthorized } from "@/lib/middleware-auth"

export async function OPTIONS() {
  return optionsResponse()
}

export async function GET(request: Request) {
  if (!requireAuth(request)) return unauthorized()
  try {
    const messages = await getMessages()
    return jsonResponse({ messages })
  } catch (error) {
    console.error("Get messages error:", error)
    return jsonResponse({ error: "Database error" }, 500)
  }
}

export async function DELETE(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized()
  try {
    const id = Number(request.nextUrl.searchParams.get("id"))
    if (!id) return jsonResponse({ error: "Message id is required" }, 400)
    const deleted = await deleteMessage(id)
    if (!deleted) return jsonResponse({ error: "Message not found" }, 404)
    return jsonResponse({ success: true })
  } catch (error) {
    console.error("Delete message error:", error)
    return jsonResponse({ error: "Failed to delete message" }, 500)
  }
}
