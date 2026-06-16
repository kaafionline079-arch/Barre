import { type NextRequest } from "next/server"
import { validateAdminCredentials } from "@/lib/server/admins"
import { createToken } from "@/lib/server/auth"
import { jsonResponse, optionsResponse } from "@/lib/server/cors"

export async function OPTIONS() {
  return optionsResponse()
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return jsonResponse({ error: "Username and password are required" }, 400)
    }

    const verifiedUser = await validateAdminCredentials(username, password)
    if (!verifiedUser) {
      return jsonResponse({ error: "Invalid credentials" }, 401)
    }

    const token = createToken(verifiedUser)
    return jsonResponse({ success: true, token })
  } catch (error) {
    console.error("Login error:", error)
    const message =
      error instanceof Error && error.message.includes("DATABASE_URL")
        ? "Database not configured. Add DATABASE_URL on Vercel."
        : "Login failed. Check database connection and try again."
    return jsonResponse({ error: message }, 500)
  }
}
