import { neon } from "@neondatabase/serverless"
import { hashPassword } from "./password"

export function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error("DATABASE_URL is not set. Add your Neon PostgreSQL connection string to .env.local")
  }
  return neon(url)
}

let schemaReady: Promise<void> | null = null

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = initSchema()
  }
  await schemaReady
}

async function initSchema() {
  const sql = getSql()

  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(500) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(50) NOT NULL DEFAULT 'web',
      image_url TEXT NOT NULL,
      live_url TEXT,
      github_url TEXT,
      tags JSONB DEFAULT '[]'::jsonb,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS site_images (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      section VARCHAR(100) NOT NULL,
      url TEXT NOT NULL,
      alt_text VARCHAR(500),
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await seedAdminUser(sql)

  const projectCount = await sql`SELECT COUNT(*)::int AS count FROM projects`
  if (projectCount[0].count === 0) {
    await seedProjects(sql)
  }

  const imageCount = await sql`SELECT COUNT(*)::int AS count FROM site_images`
  if (imageCount[0].count === 0) {
    await seedImages(sql)
  }
}

async function seedAdminUser(sql: ReturnType<typeof neon>) {
  const existing = await sql`
    SELECT id FROM admin_users WHERE username = 'ENGbarre' LIMIT 1
  `
  if (existing.length > 0) return

  const passwordHash = await hashPassword("Barre@55")
  await sql`
    INSERT INTO admin_users (username, email, password_hash)
    VALUES ('ENGbarre', 'Barre@gmail.com', ${passwordHash})
  `
}

async function seedProjects(sql: ReturnType<typeof neon>) {
  const projects = [
    ["Bidhaan Electronics", "Modern e-commerce platform for electronics with product catalog, shopping cart, and payment integration", "web", "/bidhaan-electronics.png", "https://bidhaan.dhulgaar.com/", "https://github.com/mohamedarap2024", '["E-Commerce","Next.js","Tailwind CSS"]', 1],
    ["Synapse Agency", "Professional digital agency website with dark theme and modern UI showcasing services and portfolio", "web", "/synapse-agency.png", "https://synapsecraft-digital-edge.vercel.app", "https://github.com/mohamedarap2024", '["Agency","React","Dark Theme"]', 2],
    ["Bidhaan Task Manager", "Full-featured task management application with dark mode, project organization, and deadline tracking", "web", "/bidhaan-task-manager.png", "https://bidhaan55.vercel.app", "https://github.com/mohamedarap2024", '["Task Manager","Next.js","TypeScript"]', 3],
    ["Brand Identity Design", "Complete brand identity package including logo, colors, and guidelines", "design", "/brand-identity-design-mockup.jpg", "#", null, '["Branding","Logo","Identity"]', 4],
    ["Social Media Graphics", "Eye-catching social media graphics for various platforms", "design", "/social-media-graphics-design.jpg", "#", null, '["Photoshop","Illustrator"]', 5],
    ["Product Showcase Video", "Professional product video with motion graphics and sound design", "video", "/video-editing-timeline.jpg", "#", null, '["Premiere Pro","After Effects"]', 6],
  ]

  for (const [title, description, category, image_url, live_url, github_url, tags, sort_order] of projects) {
    await sql`
      INSERT INTO projects (title, description, category, image_url, live_url, github_url, tags, sort_order)
      VALUES (${title}, ${description}, ${category}, ${image_url}, ${live_url}, ${github_url}, ${tags}::jsonb, ${sort_order})
    `
  }
}

async function seedImages(sql: ReturnType<typeof neon>) {
  const images = [
    ["Hero Image", "hero", "/hero-image.png", "Mohamed Barre working on laptop", 1],
    ["Logo", "logo", "/logo.png", "MOHA Creative", 2],
    ["Bidhaan Electronics", "portfolio", "/bidhaan-electronics.png", "Bidhaan Electronics project", 3],
    ["Synapse Agency", "portfolio", "/synapse-agency.png", "Synapse Agency project", 4],
    ["Bidhaan Task Manager", "portfolio", "/bidhaan-task-manager.png", "Bidhaan Task Manager project", 5],
    ["Brand Identity", "portfolio", "/brand-identity-design-mockup.jpg", "Brand identity design", 6],
    ["Social Media Graphics", "portfolio", "/social-media-graphics-design.jpg", "Social media graphics", 7],
    ["Video Editing", "portfolio", "/video-editing-timeline.jpg", "Video editing project", 8],
  ]

  for (const [name, section, url, alt_text, sort_order] of images) {
    await sql`
      INSERT INTO site_images (name, section, url, alt_text, sort_order)
      VALUES (${name}, ${section}, ${url}, ${alt_text}, ${sort_order})
    `
  }
}
