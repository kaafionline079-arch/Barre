import { type NextRequest } from "next/server"
import { validateAdminCredentials } from "@/lib/admins"
import { createToken } from "@/lib/auth"
import { jsonResponse, optionsResponse } from "@/lib/cors"

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
  } catch {
    return jsonResponse({ error: "Login failed" }, 500)
  }
}
