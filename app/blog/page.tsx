"use client"
import Link from "next/link"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo } from "react"
import { Heart, Search, Tag as TagIcon, Filter } from "lucide-react"

export default function BlogIndexPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [form, setForm] = useState({ title: "", excerpt: "", content: "", author: "", category: "General", tags: "" })
    const [showForm, setShowForm] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState("")
    const [editId, setEditId] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [activeTag, setActiveTag] = useState<string | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem("blogPosts")
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setPosts(parsed)
                    return
                }
            } catch { }
        }
        // Seed with 3 demo posts (parity with homepage)
        const demoPosts = [
            {
                id: "demo-1",
                title: "How Mulching Boosts Yields",
                excerpt: "Discover how simple mulching techniques can increase your farm's productivity.",
                content: "Mulching helps retain soil moisture, suppress weeds, and improve soil health. Try using organic materials like straw or leaves.",
                author: "Rajesh Singh",
                publishedAt: new Date().toISOString(),
                readTime: 3,
                category: "Sustainability",
                tags: ["mulching", "soil", "yield"],
                views: 0,
                likes: 0,
            },
            {
                id: "demo-2",
                title: "Bio-Pesticides: Safer Pest Control",
                excerpt: "Learn about natural alternatives to chemical pesticides for healthier crops.",
                content: "Bio-pesticides are derived from natural materials and are safer for the environment. Neem oil and Bacillus thuringiensis are popular choices.",
                author: "Priya Mehta",
                publishedAt: new Date().toISOString(),
                readTime: 4,
                category: "Organic Farming",
                tags: ["bio-pesticide", "organic", "pest control"],
                views: 0,
                likes: 0,
            },
            {
                id: "demo-3",
                title: "Water Conservation Tips",
                excerpt: "Simple ways to save water and improve farm sustainability.",
                content: "Drip irrigation, rainwater harvesting, and mulching are effective water-saving techniques every farmer should try.",
                author: "Amit Kumar",
                publishedAt: new Date().toISOString(),
                readTime: 2,
                category: "Water Management",
                tags: ["water", "conservation", "irrigation"],
                views: 0,
                likes: 0,
            },
        ]
        setPosts(demoPosts)
        localStorage.setItem("blogPosts", JSON.stringify(demoPosts))
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
    const handleLike = (id: string) => {
        const updated = posts.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p)
        setPosts(updated)
        localStorage.setItem("blogPosts", JSON.stringify(updated))
    }
    const uniqueCategories = useMemo(() => Array.from(new Set(posts.map(p => p.category))).sort(), [posts])
    const uniqueTags = useMemo(() => Array.from(new Set(posts.flatMap(p => p.tags || []))).sort(), [posts])
    const filteredPosts = useMemo(() => {
        return posts.filter(p => {
            const q = search.toLowerCase()
            const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t: string) => t.toLowerCase().includes(q))
            const matchCategory = !activeCategory || p.category === activeCategory
            const matchTag = !activeTag || p.tags.includes(activeTag)
            return matchSearch && matchCategory && matchTag
        })
    }, [posts, search, activeCategory, activeTag])

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
            <Container className="py-10 px-4">
                <h1 className="text-3xl font-bold mb-8">FarmGrow Blog</h1>
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setShowForm(true)}>Write Blog</Button>
                        <Button variant="outline" onClick={() => { setSearch(""); setActiveCategory(null); setActiveTag(null); }}>Reset Filters</Button>
                    </div>
                    <div className="flex-1 w-full flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="w-full border rounded px-10 py-2 text-sm" />
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                            <Filter className="h-4 w-4" /> Filters
                        </div>
                    </div>
                </div>
                {uniqueCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge onClick={() => setActiveCategory(null)} variant={!activeCategory ? "default" : "outline"} className="cursor-pointer">All Categories</Badge>
                        {uniqueCategories.map(cat => (
                            <Badge key={cat} onClick={() => setActiveCategory(cat)} variant={activeCategory === cat ? "default" : "outline"} className="cursor-pointer">{cat}</Badge>
                        ))}
                    </div>
                )}
                {uniqueTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        <Badge onClick={() => setActiveTag(null)} variant={!activeTag ? "default" : "outline"} className="cursor-pointer"><TagIcon className="h-3 w-3 mr-1" />All Tags</Badge>
                        {uniqueTags.map(tag => (
                            <Badge key={tag} onClick={() => setActiveTag(tag)} variant={activeTag === tag ? "default" : "outline"} className="cursor-pointer">{tag}</Badge>
                        ))}
                    </div>
                )}
                {/* Add Write Blog button inside the page, below filters */}
                <div className="flex justify-end mb-6">
                    <Button variant="default" onClick={() => setShowForm(true)}>
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
                {filteredPosts.length === 0 ? (
                    <p className="text-muted-foreground">No blog posts found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* ...existing code... */}
                        {filteredPosts.map(post => (
                            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                                        {post.tags.slice(0, 3).map((t: string) => (
                                            <Badge key={t} variant="outline" className="text-xxs cursor-pointer" onClick={() => setActiveTag(t)}>{t}</Badge>
                                        ))}
                                    </div>
                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                                    <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                                        <span>{post.readTime} min</span>
                                        <span>{post.views || 0} views · {post.likes || 0} likes</span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <Link href={`/blog/${post.id}`} className="text-primary hover:underline text-sm font-medium">Read More</Link>
                                        <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)} className="flex items-center gap-1 px-2">
                                            <Heart className="h-4 w-4" /> {post.likes || 0}
                                        </Button>
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
