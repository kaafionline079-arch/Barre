"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, User, KeyRound, Home } from "lucide-react"
import { apiFetch, setAuthToken } from "@/lib/api"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

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
    <div className="dark min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8 bg-card border-border shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-primary/15 rounded-2xl mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-foreground flex items-center gap-1">
              <User className="h-3 w-3" />Username
            </label>
            <Input id="username" name="username" type="text" placeholder="ENGbarre or Barre@gmail.com" required className="bg-background border-border" autoCapitalize="none" autoCorrect="off" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-1">
              <KeyRound className="h-3 w-3" />Password
            </label>
            <Input id="password" name="password" type="password" placeholder="Enter password" required className="bg-background border-border" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full shadow-lg shadow-primary/25" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
            <Home className="h-3 w-3" />Back to Home
          </a>
        </div>
      </Card>
    </div>
  )
}
