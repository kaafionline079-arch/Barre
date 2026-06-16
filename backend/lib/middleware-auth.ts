import { getTokenFromRequest, verifyToken } from "@/lib/auth"
import { jsonResponse } from "@/lib/cors"

export function requireAuth(request: Request) {
  const token = getTokenFromRequest(request)
  if (!token || !verifyToken(token)) return null
  return verifyToken(token)
}

export function unauthorized() {
  return jsonResponse({ error: "Unauthorized" }, 401)
}
