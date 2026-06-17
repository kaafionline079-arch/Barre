"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, KeyRound, Home } from "lucide-react"
import { SmartImage } from "@/components/smart-image"
import { apiFetch, getApiUrl, setAuthToken } from "@/lib/api"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [logoUrl, setLogoUrl] = useState("/logo.png")
  const router = useRouter()

  useEffect(() => {
    fetch(getApiUrl("/api/images?section=logo"))
      .then((r) => r.json())
      .then((data) => { if (data.images?.[0]?.url) setLogoUrl(data.images[0].url) })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    try {
      const response = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok && data.token) {
        setAuthToken(data.token)
        router.push("/admin")
      } else {
        setError(data.error || "Login failed")
      }
    } catch {
      setError("Could not connect to server. Make sure the backend is running.")
    }

    setIsLoading(false)
  }

  return (
    <div className="dark min-h-screen flex items-center justify-center bg-background px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md p-8 sm:p-10 bg-card/95 border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <a href="/" className="inline-block mb-5 hover:scale-105 transition-transform duration-300">
            <SmartImage
              src={logoUrl}
              alt="MOHA Creative"
              width={200}
              height={80}
              className="h-16 sm:h-20 w-auto object-contain mx-auto"
              priority
            />
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              autoCapitalize="none"
              autoCorrect="off"
              className="h-11 bg-background/80 border-primary/25 focus-visible:border-primary focus-visible:ring-primary/30"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-primary" />
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="h-11 bg-background/80 border-primary/25 focus-visible:border-primary focus-visible:ring-primary/30"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full h-11 text-base shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        </div>
      </Card>
    </div>
  )
}
