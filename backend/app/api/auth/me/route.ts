import { getTokenFromRequest, verifyToken } from "@/lib/auth"
import { jsonResponse, optionsResponse } from "@/lib/cors"

export async function OPTIONS() {
  return optionsResponse()
}

export async function GET(request: Request) {
  const token = getTokenFromRequest(request)
  if (!token) return jsonResponse({ authenticated: false }, 401)

  const user = verifyToken(token)
  if (!user) return jsonResponse({ authenticated: false }, 401)

  return jsonResponse({ authenticated: true, user })
}
