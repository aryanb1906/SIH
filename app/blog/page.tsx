"use client"
import Link from "next/link"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export default function BlogIndexPage() {
    const [posts, setPosts] = useState<any[]>([])

    useEffect(() => {
        const stored = localStorage.getItem("blogPosts")
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed)) setPosts(parsed)
            } catch { }
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
            <Container className="py-10 px-4">
                <h1 className="text-3xl font-bold mb-8">FarmGrow Blog</h1>
                {posts.length === 0 ? (
                    <p className="text-muted-foreground">No blog posts found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                                    </div>
                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                                    <Link href={`/blog/${post.id}`}>
                                        <span className="text-primary hover:underline text-sm font-medium">Read More</span>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}
