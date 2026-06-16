import { ensureSchema, getSql } from "@/lib/server/db"
import { jsonResponse } from "@/lib/server/cors"

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return jsonResponse(
        { ok: false, database: "missing", message: "DATABASE_URL is not set on Vercel" },
        500,
      )
    }

    await ensureSchema()
    const sql = getSql()
    await sql`SELECT 1 AS ok`

    return jsonResponse({
      ok: true,
      database: "connected",
      message: "Neon PostgreSQL is working",
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return jsonResponse(
      {
        ok: false,
        database: "error",
        message: "Could not connect to database. Check DATABASE_URL on Vercel.",
      },
      500,
    )
  }
}
