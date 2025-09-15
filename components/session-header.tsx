"use client"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useDemoSession } from "@/components/session-provider"


interface SessionUser {
    name?: string | null
    email?: string | null
    image?: string | null
}

export default function SessionHeader() {
    const { user, isAuthenticated, signOut } = useDemoSession()
    if (!isAuthenticated || !user) return null

    // Auth is commented
    // const [user, setUser] = useState<SessionUser | null>(null)
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     async function load() {
    //         try {
    //             const res = await fetch("/api/auth/session")
    //             if (res.ok) {
    //                 const data = await res.json()
    //                 setUser(data?.user || null)
    //             }
    //         } catch (e) {
    //             console.error("Failed to load session", e)
    //         } finally {
    //             setLoading(false)
    //         }
    // If demo user, show fixed string
    // Demo user display
    if (user.name === "Demo User") {
        return (
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || "/placeholder-user.jpg"} />
                    <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col">
                    <span className="text-xs font-medium text-foreground leading-tight">Demo User</span>
                    <span className="text-[10px] text-muted-foreground">Level 5 · 1250 XP</span>
                </div>
                <Button
                    onClick={signOut}
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-primary text-primary hover:bg-primary/10"
                >
                    Sign out
                </Button>
            </div>
        )
    }
    // Normal user display
    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || "/placeholder.svg?height=32&width=32"} />
                <AvatarFallback>
                    {(user.name?.split(" ").map((p) => p[0]).join("") || "U")}
                </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col">
                <span className="text-xs font-medium text-foreground leading-tight">{user.name}</span>
                <span className="text-[10px] text-muted-foreground">Level {user.level} · {user.xp} XP</span>
            </div>
            <Button
                onClick={signOut}
                size="sm"
                variant="outline"
                className="bg-transparent border-primary text-primary hover:bg-primary/10"
            >
                Sign out
            </Button>
        </div>
    )
}
