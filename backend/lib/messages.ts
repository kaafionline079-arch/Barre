import { ensureSchema, getSql } from "@/lib/db"

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export async function getMessages() {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`
    SELECT id, name, email, subject, message, created_at::text
    FROM messages
    ORDER BY created_at DESC
  `
  return rows as ContactMessage[]
}

export async function addMessage(data: { name: string; email: string; subject: string; message: string }) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO messages (name, email, subject, message)
    VALUES (${data.name}, ${data.email}, ${data.subject}, ${data.message})
    RETURNING id, name, email, subject, message, created_at::text
  `
  return rows[0] as ContactMessage
}

export async function deleteMessage(id: number) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`DELETE FROM messages WHERE id = ${id} RETURNING id`
  return rows.length > 0
}
