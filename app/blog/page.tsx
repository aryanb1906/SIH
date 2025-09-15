"use client"
import Link from "next/link"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function BlogIndexPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [form, setForm] = useState({ title: "", excerpt: "", content: "", author: "", category: "General", tags: "" })
    const [showForm, setShowForm] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState("")
    const [editId, setEditId] = useState<string | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem("blogPosts")
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed)) setPosts(parsed)
            } catch { }
        }
    }, [])

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleSubmit = (e: any) => {
        e.preventDefault()
        // Validation: all fields required
        if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim() || !form.author.trim() || !form.category.trim() || !form.tags.trim()) {
            setError("Please fill in all fields.")
            return
        }
        setError("")
        if (editId) {
            // Edit existing post
            const updated = posts.map(post => post.id === editId ? {
                ...post,
                ...form,
                tags: form.tags.split(",").map((t: string) => t.trim()),
            } : post)
            setPosts(updated)
            localStorage.setItem("blogPosts", JSON.stringify(updated))
            setEditId(null)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 2500)
        } else {
            // Add new post
            const newPost = {
                id: Date.now().toString(),
                title: form.title,
                excerpt: form.excerpt,
                content: form.content,
                author: form.author || "Anonymous",
                publishedAt: new Date().toISOString(),
                readTime: Math.max(3, Math.round(form.content.length / 600)),
                category: form.category,
                tags: form.tags.split(",").map((t: string) => t.trim()),
                views: 0,
                likes: 0,
            }
            const updated = [newPost, ...posts]
            setPosts(updated)
            localStorage.setItem("blogPosts", JSON.stringify(updated))
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 2500)
        }
        setForm({ title: "", excerpt: "", content: "", author: "", category: "General", tags: "" })
        setShowForm(false)
    }

    const handleEdit = (post: any) => {
        setForm({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            category: post.category,
            tags: post.tags.join(", "),
        })
        setEditId(post.id)
        setShowForm(true)
    }

    const handleDelete = (id: string) => {
        const updated = posts.filter(post => post.id !== id)
        setPosts(updated)
        localStorage.setItem("blogPosts", JSON.stringify(updated))
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
            <Container className="py-10 px-4">
                <h1 className="text-3xl font-bold mb-8">FarmGrow Blog</h1>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button variant="secondary" onClick={() => setShowForm(true)}>
                        Write Blog
                    </Button>
                </div>
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Write a New Blog Post</h2>
                        <input name="title" value={form.title} onChange={handleChange} required placeholder="Title" className="w-full border rounded px-3 py-2 mb-2" />
                        <input name="excerpt" value={form.excerpt} onChange={handleChange} required placeholder="Short Excerpt" className="w-full border rounded px-3 py-2 mb-2" />
                        <textarea name="content" value={form.content} onChange={handleChange} required placeholder="Content" className="w-full border rounded px-3 py-2 min-h-[100px] mb-2" />
                        <input name="author" value={form.author} onChange={handleChange} required placeholder="Author Name" className="w-full border rounded px-3 py-2 mb-2" />
                        <input name="category" value={form.category} onChange={handleChange} required placeholder="Category" className="w-full border rounded px-3 py-2 mb-2" />
                        <input name="tags" value={form.tags} onChange={handleChange} required placeholder="Tags (comma separated)" className="w-full border rounded px-3 py-2 mb-2" />
                        {error && <div className="mb-2 text-red-600 font-semibold text-center">{error}</div>}
                        <div className="flex gap-2 justify-end">
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                            <Button type="submit" variant="default">Submit</Button>
                        </div>
                        {showSuccess && (
                            <div className="mt-4 text-green-600 font-semibold text-center">Blog post submitted successfully!</div>
                        )}
                    </form>
                )}
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
                                    <div className="flex gap-2 mt-4">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}
