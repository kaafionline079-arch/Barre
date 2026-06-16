export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 600, margin: "80px auto", padding: "0 24px" }}>
      <h1>API</h1>
      <p style={{ color: "#666" }}>Local development only. Use the frontend at <a href="http://localhost:3000">localhost:3000</a></p>
    </main>
  )
}

export async function generateMetadata() {
  return { title: "API" }
}
