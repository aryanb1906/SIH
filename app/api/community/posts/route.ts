import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

// In-memory storage for demo purposes - replace with database in production
const posts: any[] = [
  {
    id: 1,
    author: "Priya Sharma",
    location: "Karnataka",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    content:
      "Just completed my first week of mulching! The soil moisture retention is already showing improvement. Here's my progress photo.",
    image: "/mulched-farm-field.jpg",
    likes: 24,
    comments: 8,
    badge: "Soil Health Champion",
    userId: "demo-user-1",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    author: "Amit Patel",
    location: "Gujarat",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "5 hours ago",
    content:
      "Sharing my drip irrigation setup for fellow farmers. This system has reduced my water usage by 40% while increasing yield. Happy to answer questions!",
    likes: 31,
    comments: 12,
    badge: "Water Saver",
    userId: "demo-user-2",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    author: "Sunita Devi",
    location: "Punjab",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "1 day ago",
    content:
      "Bio-pesticide preparation workshop was amazing! Made my own neem oil spray today. The community knowledge sharing is incredible.",
    likes: 18,
    comments: 6,
    badge: "Eco Warrior",
    userId: "demo-user-3",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
]

let nextId = 4

export async function GET(request: NextRequest) {
  try {
    // Sort posts by creation date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      success: true,
      posts: sortedPosts,
    })
  } catch (error) {
    console.error("[v0] Error fetching posts:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { content, image, location } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Content is required" }, { status: 400 })
    }

    // Create new post
    const newPost = {
      id: nextId++,
      author: session.user.name || "Anonymous Farmer",
      location: location || "Unknown Location",
      avatar: session.user.image || "/placeholder.svg?height=40&width=40",
      time: "Just now",
      content: content.trim(),
      image: image || null,
      likes: 0,
      comments: 0,
      badge: "New Farmer", // Default badge - could be dynamic based on user achievements
      userId: session.user.id,
      createdAt: new Date().toISOString(),
    }

    posts.unshift(newPost) // Add to beginning of array

    console.log("[v0] New post created:", newPost.id)

    return NextResponse.json({
      success: true,
      post: newPost,
    })
  } catch (error) {
    console.error("[v0] Error creating post:", error)
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 })
  }
}
