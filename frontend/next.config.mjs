/** @type {import('next').NextConfig} */
function getBackendRewriteTarget() {
  if (process.env.BACKEND_URL) {
    return `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/:path*`
  }
  if (process.env.VERCEL) {
    return "/_/backend/api/:path*"
  }
  return "http://localhost:3001/api/:path*"
}

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: getBackendRewriteTarget(),
      },
    ]
  },
}

export default nextConfig
