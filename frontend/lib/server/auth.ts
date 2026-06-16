import { createHmac, timingSafeEqual } from "crypto"

const JWT_SECRET = process.env.JWT_SECRET || "portfolio-secret-key-change-in-production"

function base64UrlEncode(data: string) {
  return Buffer.from(data).toString("base64url")
}

function base64UrlDecode(data: string) {
  return Buffer.from(data, "base64url").toString("utf8")
}

export function createToken(username: string) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  )
  const signature = createHmac("sha256", JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url")
  return `${header}.${payload}.${signature}`
}

export function verifyToken(token: string) {
  try {
    const [header, payload, signature] = token.split(".")
    if (!header || !payload || !signature) return null

    const expected = createHmac("sha256", JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest("base64url")

    const sigBuf = Buffer.from(signature)
    const expBuf = Buffer.from(expected)
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null

    const data = JSON.parse(base64UrlDecode(payload))
    if (data.exp < Math.floor(Date.now() / 1000)) return null
    return data.sub as string
  } catch {
    return null
  }
}

export function getTokenFromRequest(request: Request) {
  const auth = request.headers.get("Authorization")
  if (!auth?.startsWith("Bearer ")) return null
  return auth.slice(7)
}
