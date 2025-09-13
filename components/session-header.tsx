"use client"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface SessionUser {
    name?: string | null
    email?: string | null
    image?: string | null
}

export default function SessionHeader() {
    const [user, setUser] = useState<SessionUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("/api/auth/session")
                if (res.ok) {
                    const data = await res.json()
                    setUser(data?.user || null)
                }
            } catch (e) {
                console.error("Failed to load session", e)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return null

    if (!user) return null

    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || "/placeholder-user.jpg"} />
                <AvatarFallback>{user.name?.split(" ").map(p => p[0]).join("") || "U"}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col">
                <span className="text-xs font-medium text-white leading-tight">{user.name || user.email}</span>
                <span className="text-[10px] text-neutral-400">Signed in</span>
            </div>
            <form action="/api/auth/signout" method="post">
                <Button type="submit" size="sm" variant="outline" className="bg-transparent border-gold-400 text-gold-400 hover:bg-gold-500/10">Sign out</Button>
            </form>
        </div>
    )
}
