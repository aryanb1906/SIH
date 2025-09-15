import { type NextRequest, NextResponse } from "next/server"

interface MissionProgress {
  missionId: string
  userId: string
  status: "not_started" | "in_progress" | "completed"
  progress: number // 0-100
  startedAt?: string
  completedAt?: string
  coinsEarned?: number
  steps: {
    stepId: string
    completed: boolean
    completedAt?: string
  }[]
}

// Mock mission data
const missions = {
  "mulching-challenge": {
    id: "mulching-challenge",
    title: "Mulching Challenge",
    totalSteps: 5,
    coinsReward: 100,
    steps: [
      { id: "learn_mulching", title: "Learn about mulching benefits" },
      { id: "choose_material", title: "Choose mulching material" },
      { id: "prepare_area", title: "Prepare the mulching area" },
      { id: "apply_mulch", title: "Apply mulch properly" },
      { id: "monitor_results", title: "Monitor and document results" },
    ],
  },
  "bio-pesticide-switch": {
    id: "bio-pesticide-switch",
    title: "Bio-Pesticide Switch",
    totalSteps: 4,
    coinsReward: 80,
    steps: [
      { id: "identify_pests", title: "Identify common pests" },
      { id: "learn_bio_options", title: "Learn about bio-pesticide options" },
      { id: "prepare_solution", title: "Prepare bio-pesticide solution" },
      { id: "apply_treatment", title: "Apply treatment and monitor" },
    ],
  },
}

// Mock storage for mission progress
const missionProgress = new Map<string, MissionProgress[]>()

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId")
    const missionId = req.nextUrl.searchParams.get("missionId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const userProgress = missionProgress.get(userId) || []

    if (missionId) {
      const specificProgress = userProgress.find((p) => p.missionId === missionId)
      return NextResponse.json({
        success: true,
        data: specificProgress || null,
      })
    }

    return NextResponse.json({
      success: true,
      data: userProgress,
    })
  } catch (error) {
    console.error("Mission progress fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch mission progress" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, missionId, stepId, action } = await req.json()

    if (!userId || !missionId) {
      return NextResponse.json({ error: "User ID and Mission ID required" }, { status: 400 })
    }

    const mission = missions[missionId as keyof typeof missions]
    if (!mission) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 })
    }

    const userProgress = missionProgress.get(userId) || []
    let currentProgress = userProgress.find((p) => p.missionId === missionId)

    // Initialize progress if not exists
    if (!currentProgress) {
      currentProgress = {
        missionId,
        userId,
        status: "not_started",
        progress: 0,
        steps: mission.steps.map((step) => ({
          stepId: step.id,
          completed: false,
        })),
      }
      userProgress.push(currentProgress)
    }

    // Handle different actions
    switch (action) {
      case "start":
        currentProgress.status = "in_progress"
        currentProgress.startedAt = new Date().toISOString()
        break

      case "complete_step":
        if (stepId) {
          const step = currentProgress.steps.find((s) => s.stepId === stepId)
          if (step && !step.completed) {
            step.completed = true
            step.completedAt = new Date().toISOString()

            // Update progress percentage
            const completedSteps = currentProgress.steps.filter((s) => s.completed).length
            currentProgress.progress = Math.round((completedSteps / mission.totalSteps) * 100)

            // Check if mission is completed
            if (completedSteps === mission.totalSteps) {
              currentProgress.status = "completed"
              currentProgress.completedAt = new Date().toISOString()
              currentProgress.coinsEarned = mission.coinsReward
            }
          }
        }
        break

      case "reset":
        currentProgress.status = "not_started"
        currentProgress.progress = 0
        currentProgress.steps.forEach((step) => {
          step.completed = false
          delete step.completedAt
        })
        delete currentProgress.startedAt
        delete currentProgress.completedAt
        delete currentProgress.coinsEarned
        break
    }

    // Update storage
    missionProgress.set(userId, userProgress)

    return NextResponse.json({
      success: true,
      data: currentProgress,
      message:
        action === "complete_step" && currentProgress.status === "completed"
          ? `Mission completed! You earned ${mission.coinsReward} coins.`
          : "Progress updated successfully",
    })
  } catch (error) {
    console.error("Mission progress update error:", error)
    return NextResponse.json({ error: "Failed to update mission progress" }, { status: 500 })
  }
}
