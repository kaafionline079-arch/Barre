export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 600, margin: "80px auto", padding: "0 24px" }}>
      <h1>Mohamed Arap Portfolio API</h1>
      <p style={{ color: "#666" }}>Backend server is running. Use the frontend at <a href="http://localhost:3000">localhost:3000</a></p>
      <ul style={{ lineHeight: 2 }}>
        <li><code>GET /api/contact</code> — Health check</li>
        <li><code>POST /api/contact</code> — Send message</li>
        <li><code>GET /api/projects</code> — List projects</li>
        <li><code>GET /api/images</code> — List images</li>
        <li><code>POST /api/auth/login</code> — Admin login</li>
      </ul>
    </main>
  )
}

export async function generateMetadata() {
  return { title: "Portfolio API" }
}
