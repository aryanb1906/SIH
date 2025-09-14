"use client"

import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ThumbsUp,
  Reply
} from "lucide-react"
import Link from "next/link"

const mockCommunityPosts = [
  {
    id: "1",
    title: "Best practices for organic tomato farming in Punjab",
    content: "I've been growing organic tomatoes for 3 years now and wanted to share some tips that have worked well for me...",
    author: {
      id: "1",
      name: "Rajesh Singh",
      avatar: "RS",
      location: "Punjab",
      level: 8,
      verified: true
    },
    category: "Crop Management",
    tags: ["tomatoes", "organic", "punjab"],
    likes: 24,
    comments: 8,
    createdAt: "2025-09-15T10:30:00Z",
    isLiked: false,
    views: 156
  },
  {
    id: "2",
    title: "Water conservation techniques that saved me 40% on irrigation costs",
    content: "After implementing drip irrigation and mulching, I've seen significant savings in water usage and costs...",
    author: {
      id: "2",
      name: "Priya Mehta",
      avatar: "PM",
      location: "Maharashtra",
      level: 6,
      verified: true
    },
    category: "Water Management",
    tags: ["water conservation", "drip irrigation", "mulching"],
    likes: 31,
    comments: 12,
    createdAt: "2025-09-14T15:45:00Z",
    isLiked: true,
    views: 203
  },
  {
    id: "3",
    title: "Government scheme for solar-powered irrigation - anyone applied?",
    content: "I'm looking into the PM-KUSUM scheme for solar irrigation. Has anyone here applied and can share their experience?",
    author: {
      id: "3",
      name: "Amit Kumar",
      avatar: "AK",
      location: "Odisha",
      level: 4,
      verified: false
    },
    category: "Government Schemes",
    tags: ["solar", "irrigation", "government scheme", "PM-KUSUM"],
    likes: 18,
    comments: 15,
    createdAt: "2025-09-13T09:20:00Z",
    isLiked: false,
    views: 89
  }
]

export default function CommunityPage() {
  const { communityPosts, loadCommunityPosts, likePost, addCommunityPost } = useAppStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  })
  const [filteredPosts, setFilteredPosts] = useState(mockCommunityPosts)

  useEffect(() => {
    loadCommunityPosts()
  }, [loadCommunityPosts])

  useEffect(() => {
    let filtered = mockCommunityPosts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Sort posts
    switch (sortBy) {
      case "popular":
        filtered = filtered.sort((a, b) => b.likes - a.likes)
        break
      case "recent":
      default:
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, sortBy])

  const categories = ["all", ...Array.from(new Set(mockCommunityPosts.map(post => post.category)))]

  const handleCreatePost = () => {
    if (newPost.title && newPost.content && newPost.category) {
      const post = {
        title: newPost.title,
        content: newPost.content,
        author: {
          id: "current-user",
          name: "Current User",
          avatar: "CU",
          location: "India",
          level: 5,
          verified: false
        },
        category: newPost.category,
        tags: newPost.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        likes: 0,
        comments: 0,
        views: 0
      }
      
      addCommunityPost(post)
      setNewPost({ title: "", content: "", category: "", tags: "" })
      setIsCreatePostOpen(false)
    }
  }

  const handleLikePost = (postId: string) => {
    likePost(postId)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-primary/10 rounded-full border border-primary/20">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              FarmGrow Community
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with fellow farmers, share experiences, ask questions, and learn from the community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">2,847</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Posts This Month</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Community Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, topics, or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Enter post title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Crop Management">Crop Management</SelectItem>
                      <SelectItem value="Water Management">Water Management</SelectItem>
                      <SelectItem value="Soil Health">Soil Health</SelectItem>
                      <SelectItem value="Pest Control">Pest Control</SelectItem>
                      <SelectItem value="Government Schemes">Government Schemes</SelectItem>
                      <SelectItem value="Market Prices">Market Prices</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Share your experience, ask questions, or provide tips..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    placeholder="e.g., organic, tomatoes, irrigation"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost}>
                    Create Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Community Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {post.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      {post.author.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{post.author.name}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {post.author.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Level {post.author.level}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(post.createdAt)}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">{post.category}</Badge>
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            post.isLiked ? 'text-red-600' : 'text-muted-foreground hover:text-red-600'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </button>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TrendingUp className="h-4 w-4" />
                          {post.views} views
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Reply className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or create a new post to start the conversation.
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}