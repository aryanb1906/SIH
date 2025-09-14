import { type NextRequest, NextResponse } from "next/server"

interface LeaderboardEntry {
  userId: string
  name: string
  location: string
  points: number
  level: number
  streak: number
  missionsCompleted: number
  quizzesCompleted: number
  sustainabilityScore: number
  rank: number
  avatar?: string
}

// Mock leaderboard data
const leaderboardData: Omit<LeaderboardEntry, "rank">[] = [
  {
    userId: "user001",
    name: "Ravi Kumar",
    location: "Punjab",
    points: 1800,
    level: 4,
    streak: 15,
    missionsCompleted: 18,
    quizzesCompleted: 12,
    sustainabilityScore: 92,
  },
  {
    userId: "user002",
    name: "Sunita Devi",
    location: "Haryana",
    points: 1600,
    level: 4,
    streak: 12,
    missionsCompleted: 16,
    quizzesCompleted: 10,
    sustainabilityScore: 88,
  },
  {
    userId: "user003",
    name: "Amit Singh",
    location: "UP",
    points: 1500,
    level: 3,
    streak: 10,
    missionsCompleted: 15,
    quizzesCompleted: 9,
    sustainabilityScore: 85,
  },
  {
    userId: "user123",
    name: "Rajesh Kumar",
    location: "Punjab",
    points: 1250,
    level: 3,
    streak: 8,
    missionsCompleted: 12,
    quizzesCompleted: 8,
    sustainabilityScore: 82,
  },
  {
    userId: "user004",
    name: "Priya Sharma",
    location: "MP",
    points: 1200,
    level: 3,
    streak: 7,
    missionsCompleted: 11,
    quizzesCompleted: 7,
    sustainabilityScore: 80,
  },
  {
    userId: "user005",
    name: "Kiran Patel",
    location: "Gujarat",
    points: 1100,
    level: 2,
    streak: 6,
    missionsCompleted: 10,
    quizzesCompleted: 6,
    sustainabilityScore: 78,
  },
  {
    userId: "user006",
    name: "Meera Reddy",
    location: "Telangana",
    points: 1050,
    level: 2,
    streak: 5,
    missionsCompleted: 9,
    quizzesCompleted: 6,
    sustainabilityScore: 75,
  },
  {
    userId: "user007",
    name: "Suresh Patil",
    location: "Maharashtra",
    points: 980,
    level: 2,
    streak: 4,
    missionsCompleted: 8,
    quizzesCompleted: 5,
    sustainabilityScore: 72,
  },
]

export async function GET(req: NextRequest) {
  try {
    const limit = Number.parseInt(req.nextUrl.searchParams.get("limit") || "10")
    const userId = req.nextUrl.searchParams.get("userId")
    const type = req.nextUrl.searchParams.get("type") || "points" // points, missions, quizzes, sustainability

    // Sort based on type
    const sortedData = [...leaderboardData]
    switch (type) {
      case "missions":
        sortedData.sort((a, b) => b.missionsCompleted - a.missionsCompleted)
        break
      case "quizzes":
        sortedData.sort((a, b) => b.quizzesCompleted - a.quizzesCompleted)
        break
      case "sustainability":
        sortedData.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
        break
      case "streak":
        sortedData.sort((a, b) => b.streak - a.streak)
        break
      default:
        sortedData.sort((a, b) => b.points - a.points)
    }

    // Add ranks
    const rankedData: LeaderboardEntry[] = sortedData.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))

    // Get top entries
    const topEntries = rankedData.slice(0, limit)

    // If userId is provided, also include user's position if not in top
    let userEntry = null
    if (userId) {
      const userIndex = rankedData.findIndex((entry) => entry.userId === userId)
      if (userIndex >= limit) {
        userEntry = rankedData[userIndex]
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        leaderboard: topEntries,
        userEntry,
        totalParticipants: rankedData.length,
        leaderboardType: type,
      },
    })
  } catch (error) {
    console.error("Leaderboard fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, points, type } = await req.json()

    if (!userId || typeof points !== "number") {
      return NextResponse.json({ error: "User ID and points required" }, { status: 400 })
    }

    // Find user and update points
    const userIndex = leaderboardData.findIndex((entry) => entry.userId === userId)
    if (userIndex !== -1) {
      leaderboardData[userIndex].points += points

      // Update other stats based on type
      if (type === "mission") {
        leaderboardData[userIndex].missionsCompleted += 1
      } else if (type === "quiz") {
        leaderboardData[userIndex].quizzesCompleted += 1
      }

      // Recalculate level (simple formula: level = floor(points / 500) + 1)
      leaderboardData[userIndex].level = Math.floor(leaderboardData[userIndex].points / 500) + 1

      return NextResponse.json({
        success: true,
        data: leaderboardData[userIndex],
        message: `Points updated! You earned ${points} points.`,
      })
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 })
  } catch (error) {
    console.error("Leaderboard update error:", error)
    return NextResponse.json({ error: "Failed to update leaderboard" }, { status: 500 })
  }
}
