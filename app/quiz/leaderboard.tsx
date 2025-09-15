"use client"
import { useEffect, useState } from "react"
import { Container } from "@/components/container"

export default function LeaderboardPage() {
    const [scores, setScores] = useState<any[]>([])

    useEffect(() => {
        // For MVP, use localStorage
        const stored = localStorage.getItem("quizScores")
        if (stored) {
            setScores(JSON.parse(stored))
        }
    }, [])

    return (
        <Container className="py-10 max-w-xl">
            <h1 className="text-2xl font-bold mb-6">Eco Champs Leaderboard</h1>
            <ul className="space-y-3">
                {scores.length === 0 ? (
                    <li className="text-muted-foreground">No scores yet.</li>
                ) : (
                    scores.slice(0, 10).map((score, idx) => (
                        <li key={idx} className="flex justify-between items-center bg-green-50 px-4 py-2 rounded">
                            <span className="font-semibold">{score.name}</span>
                            <span className="text-green-800 font-bold">{score.points} pts</span>
                        </li>
                    ))
                )}
            </ul>
        </Container>
    )
}
