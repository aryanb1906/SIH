import { type NextRequest, NextResponse } from "next/server"

interface RewardRedemption {
  userId: string
  rewardId: number
  rewardTitle: string
  pointsCost: number
  category: string
}

interface RedeemedReward {
  id: string
  userId: string
  rewardId: number
  rewardTitle: string
  pointsCost: number
  category: string
  status: "Processing" | "Shipped" | "Delivered"
  trackingId: string
  redeemedAt: string
  estimatedDelivery?: string
  deliveredAt?: string
}

// Mock storage for redeemed rewards
const redeemedRewards = new Map<string, RedeemedReward[]>()
const userPoints = new Map<string, number>([["user123", 1250]]) // Mock user points

export async function POST(req: NextRequest) {
  try {
    const redemption: RewardRedemption = await req.json()
    const { userId, rewardId, rewardTitle, pointsCost, category } = redemption

    // Check if user has enough points
    const currentPoints = userPoints.get(userId) || 0
    if (currentPoints < pointsCost) {
      return NextResponse.json(
        {
          error: "Insufficient points",
          currentPoints,
          required: pointsCost,
        },
        { status: 400 },
      )
    }

    // Generate tracking ID
    const trackingId = `TRK${Date.now().toString().slice(-6)}`

    // Create redeemed reward record
    const redeemedReward: RedeemedReward = {
      id: `reward_${Date.now()}`,
      userId,
      rewardId,
      rewardTitle,
      pointsCost,
      category,
      status: "Processing",
      trackingId,
      redeemedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    }

    // Store the redemption
    const userRedemptions = redeemedRewards.get(userId) || []
    userRedemptions.unshift(redeemedReward) // Add to beginning
    redeemedRewards.set(userId, userRedemptions)

    // Deduct points
    userPoints.set(userId, currentPoints - pointsCost)

    return NextResponse.json({
      success: true,
      data: redeemedReward,
      message: `Successfully redeemed ${rewardTitle}!`,
      remainingPoints: currentPoints - pointsCost,
    })
  } catch (error) {
    console.error("Reward redemption error:", error)
    return NextResponse.json({ error: "Failed to redeem reward" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const userRedemptions = redeemedRewards.get(userId) || []

    return NextResponse.json({
      success: true,
      data: userRedemptions,
      totalRedemptions: userRedemptions.length,
    })
  } catch (error) {
    console.error("Rewards fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch rewards" }, { status: 500 })
  }
}
