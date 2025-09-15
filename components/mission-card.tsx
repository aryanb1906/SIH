import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, Users } from "lucide-react"

interface MissionCardProps {
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  rewards: number
  progress?: number
  participants?: number
  isCompleted?: boolean
}

export function MissionCard({
  title,
  description,
  difficulty,
  duration,
  rewards,
  progress = 0,
  participants = 0,
  isCompleted = false,
}: MissionCardProps) {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  }

  return (
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

          <Button className="w-full" variant={isCompleted ? "outline" : "default"} disabled={isCompleted}>
            {isCompleted ? "Completed" : "Start Mission"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
