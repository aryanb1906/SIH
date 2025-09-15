import { type NextRequest, NextResponse } from "next/server"

interface QuizSubmission {
  quizId: string
  userId: string
  answers: number[]
  timeSpent: number
  completedAt: string
}

interface QuizResult {
  quizId: string
  userId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  coinsEarned: number
  timeSpent: number
  accuracy: number
  completedAt: string
  answers: {
    questionId: number
    selectedAnswer: number
    correctAnswer: number
    isCorrect: boolean
    coinsEarned: number
  }[]
}

// Mock quiz data - matches the quiz structure from the frontend
const quizData = {
  "soil-health-basics": {
    id: "soil-health-basics",
    title: "Soil Health Fundamentals",
    questions: [
      { id: 1, correctAnswer: 1, coins: 10 },
      { id: 2, correctAnswer: 1, coins: 10 },
      { id: 3, correctAnswer: 1, coins: 10 },
      { id: 4, correctAnswer: 1, coins: 10 },
      { id: 5, correctAnswer: 2, coins: 10 },
    ],
  },
  "organic-farming": {
    id: "organic-farming",
    title: "Organic Farming Practices",
    questions: [
      { id: 1, correctAnswer: 0, coins: 15 },
      { id: 2, correctAnswer: 2, coins: 15 },
      { id: 3, correctAnswer: 1, coins: 15 },
      { id: 4, correctAnswer: 1, coins: 15 },
      { id: 5, correctAnswer: 1, coins: 15 },
    ],
  },
  "water-management": {
    id: "water-management",
    title: "Water Conservation & Irrigation",
    questions: [
      { id: 1, correctAnswer: 3, coins: 20 },
      { id: 2, correctAnswer: 1, coins: 20 },
      { id: 3, correctAnswer: 0, coins: 20 },
      { id: 4, correctAnswer: 2, coins: 20 },
      { id: 5, correctAnswer: 2, coins: 20 },
    ],
  },
}

// Mock storage for quiz results
const quizResults = new Map<string, QuizResult[]>()

export async function POST(req: NextRequest) {
  try {
    const submission: QuizSubmission = await req.json()
    const { quizId, userId, answers, timeSpent, completedAt } = submission

    // Validate quiz exists
    const quiz = quizData[quizId as keyof typeof quizData]
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
    }

    // Calculate results
    let correctAnswers = 0
    let totalCoinsEarned = 0
    const answerDetails = []

    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i]
      const userAnswer = answers[i]
      const isCorrect = userAnswer === question.correctAnswer
      const coinsEarned = isCorrect ? question.coins : 0

      if (isCorrect) {
        correctAnswers++
        totalCoinsEarned += coinsEarned
      }

      answerDetails.push({
        questionId: question.id,
        selectedAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        coinsEarned,
      })
    }

    // Bonus coins for perfect score
    const isPerfectScore = correctAnswers === quiz.questions.length
    if (isPerfectScore) {
      totalCoinsEarned += Math.floor(totalCoinsEarned * 0.2) // 20% bonus
    }

    // Time bonus (if completed in less than 50% of time limit)
    const timeBonus = timeSpent < 300 ? 25 : timeSpent < 600 ? 10 : 0 // Example time limits
    totalCoinsEarned += timeBonus

    const accuracy = Math.round((correctAnswers / quiz.questions.length) * 100)

    const result: QuizResult = {
      quizId,
      userId,
      score: correctAnswers,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      coinsEarned: totalCoinsEarned,
      timeSpent,
      accuracy,
      completedAt,
      answers: answerDetails,
    }

    // Store result
    const userResults = quizResults.get(userId) || []
    userResults.push(result)
    quizResults.set(userId, userResults)

    // Update user coins (in production, this would update the database)
    // For now, we'll return the result and let the frontend handle coin updates

    return NextResponse.json({
      success: true,
      data: result,
      message: `Quiz completed! You earned ${totalCoinsEarned} coins.`,
      bonuses: {
        perfectScore: isPerfectScore,
        timeBonus: timeBonus > 0,
        timeBonusCoins: timeBonus,
      },
    })
  } catch (error) {
    console.error("Quiz submission error:", error)
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId")
    const quizId = req.nextUrl.searchParams.get("quizId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const userResults = quizResults.get(userId) || []

    if (quizId) {
      const quizResults = userResults.filter((result) => result.quizId === quizId)
      return NextResponse.json({
        success: true,
        data: quizResults,
      })
    }

    return NextResponse.json({
      success: true,
      data: userResults,
    })
  } catch (error) {
    console.error("Quiz results fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch quiz results" }, { status: 500 })
  }
}
