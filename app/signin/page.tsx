"use client"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDemoSignIn = async () => {
    setLoading(true)
    try {
      // Set demo user data in localStorage for demo purposes
      const demoUser = {
        id: "demo-user-123",
        name: "Demo User",
        email: "demo@example.com",
        image: "/diverse-user-avatars.png",
        level: 5,
        xp: 1250,
        coins: 500,
        streak: 7,
      }

      localStorage.setItem("demo-user", JSON.stringify(demoUser))
      localStorage.setItem("demo-authenticated", "true")

      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Force reload so context updates immediately
      window.location.href = "/"
    } catch (error) {
      console.error("Demo sign in error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container className="max-w-md w-full bg-card rounded-xl shadow-lg p-8 border">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Sign In</h1>
        <div className="space-y-4">
          <Button
            onClick={handleDemoSignIn}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl"
          >
            {loading ? "Signing in..." : "Try Demo (No Account Required)"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Click above to explore all features with demo data
          </div>
        </div>
      </Container>
    </div>
  )
}
