import { ensureSchema, getSql } from "@/lib/server/db"

export interface Project {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  live_url: string | null
  github_url: string | null
  tags: string[]
  sort_order: number
  created_at: string
}

export async function getProjects() {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`
    SELECT id, title, description, category, image_url, live_url, github_url,
           tags, sort_order, created_at::text
    FROM projects
    ORDER BY
      CASE category WHEN 'web' THEN 0 WHEN 'design' THEN 1 WHEN 'video' THEN 2 ELSE 3 END,
      sort_order ASC,
      created_at DESC
  `
  return rows.map((r) => ({
    ...r,
    tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags as string || "[]"),
  })) as Project[]
}

export async function getProject(id: number) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`
    SELECT id, title, description, category, image_url, live_url, github_url,
           tags, sort_order, created_at::text
    FROM projects WHERE id = ${id}
  `
  if (!rows.length) return null
  const r = rows[0]
  return { ...r, tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags as string || "[]") } as Project
}

export async function createProject(data: Omit<Project, "id" | "created_at">) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`
    INSERT INTO projects (title, description, category, image_url, live_url, github_url, tags, sort_order)
    VALUES (
      ${data.title}, ${data.description}, ${data.category}, ${data.image_url},
      ${data.live_url}, ${data.github_url}, ${JSON.stringify(data.tags)}::jsonb, ${data.sort_order}
    )
    RETURNING id, title, description, category, image_url, live_url, github_url,
              tags, sort_order, created_at::text
  `
  const r = rows[0]
  return { ...r, tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags as string || "[]") } as Project
}

export async function updateProject(id: number, data: Partial<Omit<Project, "id" | "created_at">>) {
  await ensureSchema()
  const existing = await getProject(id)
  if (!existing) return null

  const sql = getSql()
  const rows = await sql`
    UPDATE projects SET
      title = ${data.title ?? existing.title},
      description = ${data.description ?? existing.description},
      category = ${data.category ?? existing.category},
      image_url = ${data.image_url ?? existing.image_url},
      live_url = ${data.live_url !== undefined ? data.live_url : existing.live_url},
      github_url = ${data.github_url !== undefined ? data.github_url : existing.github_url},
      tags = ${JSON.stringify(data.tags ?? existing.tags)}::jsonb,
      sort_order = ${data.sort_order ?? existing.sort_order}
    WHERE id = ${id}
    RETURNING id, title, description, category, image_url, live_url, github_url,
              tags, sort_order, created_at::text
  `
  const r = rows[0]
  return { ...r, tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags as string || "[]") } as Project
}

export async function deleteProject(id: number) {
  await ensureSchema()
  const sql = getSql()
  const rows = await sql`DELETE FROM projects WHERE id = ${id} RETURNING id`
  return rows.length > 0
}
