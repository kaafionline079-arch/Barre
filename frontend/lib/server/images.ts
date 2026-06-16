import { ensureSchema, getSql } from "@/lib/server/db"

export interface SiteImage {
  id: number
  name: string
  section: string
  url: string
  alt_text: string | null
  sort_order: number
  created_at: string
}

export async function getImages(section?: string) {
  await ensureSchema()
  const sql = getSql()
  const rows = section
    ? await sql`
        SELECT id, name, section, url, alt_text, sort_order, created_at::text
        FROM site_images WHERE section = ${section}
        ORDER BY sort_order ASC, created_at DESC
      `
    : await sql`
        SELECT id, name, section, url, alt_text, sort_order, created_at::text
        FROM site_images
        ORDER BY section ASC, sort_order ASC, created_at DESC
      `
  return rows as SiteImage[]
}

export async function getImage(id: number) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`
    SELECT id, name, section, url, alt_text, sort_order, created_at::text
    FROM site_images WHERE id = ${id}
  `
  return (rows[0] as SiteImage) || null
}

export async function createImage(data: Omit<SiteImage, "id" | "created_at">) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO site_images (name, section, url, alt_text, sort_order)
    VALUES (${data.name}, ${data.section}, ${data.url}, ${data.alt_text}, ${data.sort_order})
    RETURNING id, name, section, url, alt_text, sort_order, created_at::text
  `
  return rows[0] as SiteImage
}

export async function updateImage(id: number, data: Partial<Omit<SiteImage, "id" | "created_at">>) {
  await ensureSchema()
  const existing = await getImage(id)
  if (!existing) return null

  const sql = getSql()
  const rows = await sql`
    UPDATE site_images SET
      name = ${data.name ?? existing.name},
      section = ${data.section ?? existing.section},
      url = ${data.url ?? existing.url},
      alt_text = ${data.alt_text !== undefined ? data.alt_text : existing.alt_text},
      sort_order = ${data.sort_order ?? existing.sort_order}
    WHERE id = ${id}
    RETURNING id, name, section, url, alt_text, sort_order, created_at::text
  `
  return rows[0] as SiteImage
}

export async function deleteImage(id: number) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`DELETE FROM site_images WHERE id = ${id} RETURNING id`
  return rows.length > 0
}
