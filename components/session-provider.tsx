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

  // Removed localStorage usage for SSR compatibility

  const signOut = () => {
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
