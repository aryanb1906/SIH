"use client"
import { useEffect, useState } from "react"
import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trophy, ArrowLeft, Crown } from "lucide-react"

interface ScoreEntry {
  name: string
  points: number
  level: string
  badges: string[]
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("quizScores") || "[]"
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        const sorted = [...parsed].sort((a: any, b: any) => b.points - a.points).slice(0, 50)
        setScores(sorted)
      }
    } catch { }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Trophy className="h-7 w-7 text-primary" /> Quiz Leaderboard</h1>
          <div />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Ranks are based on quiz points stored locally on your device.</CardDescription>
          </CardHeader>
          <CardContent>
            {scores.length === 0 && (
              <div className="text-sm text-muted-foreground">No scores yet. Play the quiz to appear here.</div>
            )}
            {scores.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2 pr-4">Rank</th>
                      <th className="py-2 pr-4">Player</th>
                      <th className="py-2 pr-4">Level</th>
                      <th className="py-2 pr-4">Points</th>
                      <th className="py-2 pr-4">Badges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((s, i) => (
                      <tr key={s.name + i} className="border-b last:border-0 hover:bg-muted/40">
                        <td className="py-2 pr-4 font-medium flex items-center gap-1">
                          {i === 0 && <Crown className="h-4 w-4 text-yellow-500" />}
                          {i + 1}
                        </td>
                        <td className="py-2 pr-4">{s.name}</td>
                        <td className="py-2 pr-4">{s.level}</td>
                        <td className="py-2 pr-4 font-semibold">{s.points}</td>
                        <td className="py-2 pr-4">
                          <div className="flex flex-wrap gap-1">
                            {s.badges?.map((b, bi) => (
                              <span key={bi} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs">{b.replace(/ .*/, "")}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
