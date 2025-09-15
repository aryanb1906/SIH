"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { SessionProvider } from "next-auth/react"

interface DemoUser {
  id: string
  name: string
  email: string
  image: string
  level: number
  xp: number
  coins: number
  streak: number
}

interface DemoSessionContextType {
  user: DemoUser | null
  isAuthenticated: boolean
  signOut: () => void
}

const DemoSessionContext = createContext<DemoSessionContextType>({
  user: null,
  isAuthenticated: false,
  signOut: () => { },
})

export function useDemoSession() {
  return useContext(DemoSessionContext)
}

interface SessionProviderWrapperProps {
  children: React.ReactNode
}

export default function SessionProviderWrapper({ children }: SessionProviderWrapperProps) {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for demo authentication on mount
    const demoAuth = localStorage.getItem("demo-authenticated")
    if (demoAuth === "true") {
      // Always use fixed demo user info
      setUser({
        id: "demo-user-123",
        name: "demouser",
        email: "demo@example.com",
        image: "/diverse-user-avatars.png",
        level: 5,
        xp: 1200,
        coins: 500,
        streak: 7,
      })
      setIsAuthenticated(true)
    }
  }, [])

  const signOut = () => {
    localStorage.removeItem("demo-authenticated")
    localStorage.removeItem("demo-user")
    setUser(null)
    setIsAuthenticated(false)
    window.location.href = "/"
  }

  // Wrap the app with NextAuth's SessionProvider so components using `useSession()` work.
  // We keep the existing demo session context nested so legacy/demo logic still functions.
  return (
    <SessionProvider>
      <DemoSessionContext.Provider value={{ user, isAuthenticated, signOut }}>
        {children}
      </DemoSessionContext.Provider>
    </SessionProvider>
  )
}
