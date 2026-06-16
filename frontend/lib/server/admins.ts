import { ensureSchema, getSql } from "./db"
import { verifyPassword } from "./password"

export async function validateAdminCredentials(
  username: string,
  password: string,
): Promise<string | null> {
  await ensureSchema()
  const sql = getSql()
  const identifier = username.trim()

  const rows = await sql`
    SELECT username, password_hash FROM admin_users
    WHERE LOWER(username) = LOWER(${identifier}) OR LOWER(email) = LOWER(${identifier})
    LIMIT 1
  `
  if (rows.length === 0) return null

  const valid = await verifyPassword(password, rows[0].password_hash as string)
  return valid ? (rows[0].username as string) : null
}

export async function getAdminByUsername(username: string) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`
    SELECT id, username, email, created_at FROM admin_users
    WHERE LOWER(username) = LOWER(${username.trim()})
    LIMIT 1
  `
  return rows[0] ?? null
}
