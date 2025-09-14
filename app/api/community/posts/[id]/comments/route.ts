import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../auth/[...nextauth]/route"

// In-memory storage for comments - replace with database in production
const comments: { [postId: number]: any[] } = {}
let nextCommentId = 1

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const postId = Number.parseInt(params.id)
    const postComments = comments[postId] || []

    return NextResponse.json({
      success: true,
      comments: postComments,
    })
  } catch (error) {
    console.error("[v0] Error fetching comments:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const postId = Number.parseInt(params.id)
    const body = await request.json()
    const { content } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Comment content is required" }, { status: 400 })
    }

    // Initialize comments array for post if not exists
    if (!comments[postId]) {
      comments[postId] = []
    }

    const newComment = {
      id: nextCommentId++,
      author: session.user.name || "Anonymous Farmer",
      avatar: session.user.image || "/placeholder.svg?height=40&width=40",
      content: content.trim(),
      createdAt: new Date().toISOString(),
      userId: session.user.id,
    }

    comments[postId].push(newComment)

    console.log("[v0] New comment added to post:", postId)

    return NextResponse.json({
      success: true,
      comment: newComment,
    })
  } catch (error) {
    console.error("[v0] Error creating comment:", error)
    return NextResponse.json({ success: false, error: "Failed to create comment" }, { status: 500 })
  }
}
