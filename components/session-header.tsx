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
    const {user, isAuthenticated, signOut } = useDemoSession()
    if(!isAuthenticated || !user) return null

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
    //     }
    //     load()
    // }, [])

    // if (loading) return null

    // if (!user) return null

    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
                {/* <AvatarImage src={user.image || "/placeholder-user.jpg"} /> */}
                <AvatarImage src={user.image || "/placeholder.svg?height=32&width=32"} />

                {/* <AvatarFallback>{user.name?.split(" ").map(p => p[0]).join("") || "U"}</AvatarFallback> */}
                <AvatarFallback>
                    {user.name
                    ?.split(" ")
                    .map((p) => p[0])
                    .join("") || "U"}
                </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col">
                <span className="text-xs font-medium text-foreground leading-tight">{user.name}</span>
                <span className="text-[10px] text-muted-foreground">
                    Level {user.level} • {user.xp} XP
                </span>
            </div>
            {/* <form action="/api/auth/signout" method="post">
                <Button type="submit" size="sm" variant="outline" className="bg-transparent border-gold-400 text-gold-400 hover:bg-gold-500/10">Sign out</Button>
            </form> */}
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
