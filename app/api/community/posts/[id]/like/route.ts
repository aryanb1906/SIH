import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../auth/[...nextauth]/route"

// In-memory storage for likes - replace with database in production
const userLikes: { [userId: string]: number[] } = {}

// Import posts from the main posts route (in production, use database)
const posts: any[] = []

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const postId = Number.parseInt(params.id)
    const userId = session.user.id

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID not found" }, { status: 400 })
    }

    // Initialize user likes if not exists
    if (!userLikes[userId]) {
      userLikes[userId] = []
    }

    // Find the post (in production, query database)
    const postIndex = posts.findIndex((p) => p.id === postId)
    if (postIndex === -1) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }

    const hasLiked = userLikes[userId].includes(postId)

    if (hasLiked) {
      // Unlike the post
      userLikes[userId] = userLikes[userId].filter((id) => id !== postId)
      posts[postIndex].likes = Math.max(0, posts[postIndex].likes - 1)
    } else {
      // Like the post
      userLikes[userId].push(postId)
      posts[postIndex].likes += 1
    }

    console.log("[v0] Post like toggled:", postId, hasLiked ? "unliked" : "liked")

    return NextResponse.json({
      success: true,
      liked: !hasLiked,
      likes: posts[postIndex].likes,
    })
  } catch (error) {
    console.error("[v0] Error toggling like:", error)
    return NextResponse.json({ success: false, error: "Failed to toggle like" }, { status: 500 })
  }
}
