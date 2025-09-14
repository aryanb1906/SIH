import { type NextRequest, NextResponse } from "next/server"

interface DashboardAnalytics {
  userId: string
  totalCoins: number
  coinsThisWeek: number
  coinsThisMonth: number
  missionsCompleted: number
  missionsInProgress: number
  quizzesCompleted: number
  averageQuizScore: number
  sustainabilityScore: number
  currentStreak: number
  longestStreak: number
  level: number
  nextLevelProgress: number
  rewardsRedeemed: number
  totalSavings: number
  weeklyActivity: {
    date: string
    coins: number
    missions: number
    quizzes: number
  }[]
  categoryProgress: {
    category: string
    completed: number
    total: number
    percentage: number
  }[]
  achievements: {
    id: string
    name: string
    description: string
    earnedDate: string
    category: string
  }[]
}

// Mock analytics data
const mockAnalytics: DashboardAnalytics = {
  userId: "user123",
  totalCoins: 1250,
  coinsThisWeek: 180,
  coinsThisMonth: 420,
  missionsCompleted: 12,
  missionsInProgress: 3,
  quizzesCompleted: 8,
  averageQuizScore: 78,
  sustainabilityScore: 85,
  currentStreak: 8,
  longestStreak: 15,
  level: 3,
  nextLevelProgress: 65, // Progress to next level (0-100%)
  rewardsRedeemed: 5,
  totalSavings: 2500, // Total value of rewards redeemed
  weeklyActivity: [
    { date: "2024-09-08", coins: 50, missions: 1, quizzes: 0 },
    { date: "2024-09-09", coins: 75, missions: 0, quizzes: 1 },
    { date: "2024-09-10", coins: 100, missions: 2, quizzes: 0 },
    { date: "2024-09-11", coins: 25, missions: 0, quizzes: 1 },
    { date: "2024-09-12", coins: 150, missions: 1, quizzes: 2 },
    { date: "2024-09-13", coins: 80, missions: 1, quizzes: 1 },
    { date: "2024-09-14", coins: 120, missions: 2, quizzes: 1 },
  ],
  categoryProgress: [
    { category: "Soil Management", completed: 4, total: 6, percentage: 67 },
    { category: "Water Conservation", completed: 3, total: 5, percentage: 60 },
    { category: "Organic Farming", completed: 5, total: 7, percentage: 71 },
    { category: "Pest Control", completed: 2, total: 4, percentage: 50 },
    { category: "Crop Rotation", completed: 1, total: 3, percentage: 33 },
  ],
  achievements: [
    {
      id: "first_quiz",
      name: "Quiz Master",
      description: "Completed your first quiz",
      earnedDate: "2024-02-01",
      category: "Learning",
    },
    {
      id: "water_saver",
      name: "Water Saver",
      description: "Reduced water usage by 30%",
      earnedDate: "2024-03-15",
      category: "Sustainability",
    },
    {
      id: "organic_pioneer",
      name: "Organic Pioneer",
      description: "Completed organic farming mission",
      earnedDate: "2024-04-10",
      category: "Organic",
    },
    {
      id: "streak_keeper",
      name: "Streak Keeper",
      description: "Maintained 7-day learning streak",
      earnedDate: "2024-05-20",
      category: "Consistency",
    },
    {
      id: "community_helper",
      name: "Community Helper",
      description: "Helped 5 fellow farmers",
      earnedDate: "2024-06-15",
      category: "Community",
    },
  ],
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId") || "user123"
    const timeframe = req.nextUrl.searchParams.get("timeframe") || "week" // week, month, year

    // In production, this would fetch real data from database
    // For now, return mock data with some variations based on timeframe

    const analytics = { ...mockAnalytics }

    if (timeframe === "month") {
      analytics.coinsThisWeek = analytics.coinsThisMonth
      analytics.weeklyActivity = analytics.weeklyActivity.map((day, index) => ({
        ...day,
        coins: day.coins + Math.floor(Math.random() * 50),
        missions: day.missions + Math.floor(Math.random() * 2),
        quizzes: day.quizzes + Math.floor(Math.random() * 2),
      }))
    }

    return NextResponse.json({
      success: true,
      data: analytics,
      timeframe,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, activity } = await req.json()

    if (!userId || !activity) {
      return NextResponse.json({ error: "User ID and activity data required" }, { status: 400 })
    }

    // In production, this would log activity to database
    // For now, just acknowledge the activity

    return NextResponse.json({
      success: true,
      message: "Activity logged successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Activity logging error:", error)
    return NextResponse.json({ error: "Failed to log activity" }, { status: 500 })
  }
}
