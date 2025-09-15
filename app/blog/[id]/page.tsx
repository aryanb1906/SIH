"use client"

import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, BookOpen, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { blogPosts, loadBlogPosts, incrementBlogViews } = useAppStore()
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [postsLoaded, setPostsLoaded] = useState(false)

  // Persist blogPosts in localStorage
  useEffect(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem("blogPosts")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPostsLoaded(true)
        }
      } catch { }
    }
    // If no posts, add demo post to localStorage
    if (blogPosts.length === 0 && !stored) {
      const demoPost = {
        id: "demo-1",
        title: "How to Start Sustainable Farming",
        excerpt: "A beginner's guide to sustainable farming practices for Indian farmers.",
        content: "This is a comprehensive guide about sustainable farming. In this article, we'll explore the key concepts, practical applications, and real-world examples that will help you implement these techniques in your own farming practices.",
        author: "Demo Author",
        publishedAt: new Date().toISOString(),
        readTime: 5,
        category: "Farming",
        tags: ["sustainability", "beginner"],
        views: 100,
        likes: 10,
      }
      localStorage.setItem("blogPosts", JSON.stringify([demoPost]))
      setPostsLoaded(true)
    }
  }, [blogPosts])

  // Update localStorage on blogPosts change
  useEffect(() => {
    if (blogPosts.length > 0) {
      localStorage.setItem("blogPosts", JSON.stringify(blogPosts))
      setPostsLoaded(true)
    }
  }, [blogPosts])

  useEffect(() => {
    if (!postsLoaded) return
    const foundPost = blogPosts.find(p => p.id === params.id)
    if (foundPost) {
      setPost(foundPost)
      incrementBlogViews(foundPost.id)
      // Find related posts
      const related = blogPosts
        .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
        .slice(0, 3)
      setRelatedPosts(related)
    }
  }, [blogPosts, params.id, incrementBlogViews, postsLoaded])

  if (!post) {
    return notFound()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10 px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="p-2 rounded-full bg-background border border-border shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to Blog
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <article className="mb-12">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.views} views
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {post.likes} likes
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-card border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {post.content || `This is a comprehensive guide about ${post.title.toLowerCase()}. 
                  In this article, we'll explore the key concepts, practical applications, and 
                  real-world examples that will help you implement these techniques in your own farming practices.`}
                </p>

                <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Improved crop yields and quality</li>
                  <li>Reduced environmental impact</li>
                  <li>Cost-effective implementation</li>
                  <li>Sustainable long-term practices</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">Implementation Steps</h2>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-6">
                  <li>Assess your current farming practices</li>
                  <li>Plan the implementation timeline</li>
                  <li>Gather necessary resources and materials</li>
                  <li>Start with a small pilot project</li>
                  <li>Monitor and adjust based on results</li>
                </ol>

                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementing sustainable farming practices is not just beneficial for the environment
                  but also for your farm's long-term productivity and profitability. Start small, be
                  consistent, and don't hesitate to seek help from the FarmGrow community when needed.
                </p>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <Badge variant="secondary" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{relatedPost.readTime} min read</span>
                        <Link href={`/blog/${relatedPost.id}`}>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </div>
  )
}
