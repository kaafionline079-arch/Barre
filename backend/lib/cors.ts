import { NextResponse } from "next/server"

function getAllowedOrigins() {
  const fromList = (process.env.FRONTEND_URLS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  const single = process.env.FRONTEND_URL || "http://localhost:3000"
  return [...new Set([...fromList, single])]
}

function resolveOrigin(request?: Request) {
  const allowed = getAllowedOrigins()
  const requestOrigin = request?.headers.get("Origin")

  if (requestOrigin && allowed.includes(requestOrigin)) {
    return requestOrigin
  }

  if (requestOrigin?.endsWith(".vercel.app")) {
    return requestOrigin
  }

  return allowed[0]
}

export function corsHeaders(request?: Request) {
  return {
    "Access-Control-Allow-Origin": resolveOrigin(request),
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  }
}

export function jsonResponse(data: unknown, status = 200, request?: Request) {
  return NextResponse.json(data, { status, headers: corsHeaders(request) })
}

export function optionsResponse(request?: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) })
}
