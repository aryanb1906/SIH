"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, Users } from "lucide-react"

interface MissionCardProps {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  rewards: number
  progress: number
  participants?: number
  status: "not-started" | "in-progress" | "completed"
  onStart: (id: string) => void
  onComplete: (id: string) => void
  onUpdateProgress?: (id: string, stepPoints: number) => void
  onOpen?: (id: string) => void
  onRestart?: (id: string) => void
}

export function MissionCard({
  id,
  title,
  description,
  difficulty,
  duration,
  rewards,
  progress,
  participants = 0,
  status,
  onStart,
  onComplete,
  onUpdateProgress,
  onOpen,
  onRestart,
}: MissionCardProps) {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  }

  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
    onOpen?.(id);
  }

  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
            <Badge className={difficultyColors[difficulty]} variant="secondary">
              {difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>{rewards} pts</span>
              </div>
              {participants > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{participants}</span>
                </div>
              )}
            </div>

            {isCompleted ? (
              <div className="flex gap-2 w-full">
                <Button className="flex-1 rounded" variant="outline" disabled>
                  Completed
                </Button>
                <Button className="flex-1 rounded" variant="default" onClick={() => onRestart && onRestart(id)}>
                  Restart Mission
                </Button>
              </div>
            ) : (
              <Button
                className="w-full rounded"
                variant={isInProgress ? "secondary" : "default"}
                onClick={() => {
                  if (!isInProgress) onStart(id);
                  openModal();
                }}
              >
                {isInProgress ? "Resume" : "Start Mission"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p className="mb-4 text-muted-foreground">{description}</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 mb-2" />
              {!isCompleted && (
                <input
                  type="range"
                  min={progress}
                  max={100}
                  value={progress}
                  step={5}
                  onChange={e => {
                    const val = Number(e.target.value)
                    if (val > progress && onUpdateProgress) onUpdateProgress(id, val - progress)
                  }}
                  className="w-full"
                />
              )}
            </div>
            <div className="flex gap-2">
              {!isCompleted && (
                <Button onClick={() => onComplete(id)} className="flex-1">Mark as Complete</Button>
              )}
              <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Close</Button>
            </div>
            {isCompleted && (
              <div className="mt-4 text-green-700 font-bold">Mission Completed! You earned {rewards} pts.</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
