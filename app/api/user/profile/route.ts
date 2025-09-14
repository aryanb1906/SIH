import { type NextRequest, NextResponse } from "next/server"

// Mock user data - in production, this would connect to a database
const mockUsers = new Map([
  [
    "user123",
    {
      id: "user123",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      location: "Punjab, India",
      farmSize: "2.5 hectares",
      cropTypes: ["Wheat", "Rice", "Sugarcane"],
      coins: 1250,
      level: 3,
      totalMissionsCompleted: 12,
      totalQuizzesCompleted: 8,
      sustainabilityScore: 85,
      joinedDate: "2024-01-15",
      achievements: [
        { id: "first_quiz", name: "Quiz Master", description: "Completed first quiz", earnedDate: "2024-02-01" },
        { id: "water_saver", name: "Water Saver", description: "Reduced water usage by 30%", earnedDate: "2024-03-15" },
        {
          id: "organic_farmer",
          name: "Organic Pioneer",
          description: "Completed organic farming mission",
          earnedDate: "2024-04-10",
        },
      ],
      recentActivity: [
        { type: "quiz", description: "Completed Soil Health Quiz", coins: 50, date: "2024-09-14" },
        { type: "mission", description: "Finished Water Conservation Mission", coins: 100, date: "2024-09-12" },
        { type: "reward", description: "Redeemed Organic Fertilizer Voucher", coins: -200, date: "2024-09-10" },
      ],
    },
  ],
])

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId") || "user123"

    const user = mockUsers.get(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId, updates } = await req.json()
    const user = mockUsers.get(userId || "user123")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user data
    const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() }
    mockUsers.set(userId || "user123", updatedUser)

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
