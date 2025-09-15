import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"

interface Step {
  id: string
  title: string
  completed: boolean
  current?: boolean
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep?: number
  showLabels?: boolean
  variant?: "horizontal" | "vertical"
}

export default function ProgressIndicator({
  steps,
  currentStep = 0,
  showLabels = true,
  variant = "horizontal",
}: ProgressIndicatorProps) {
  const completedSteps = steps.filter((step) => step.completed).length
  const progress = (completedSteps / steps.length) * 100

  if (variant === "vertical") {
    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {step.completed ? (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              ) : step.current || index === currentStep ? (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary-foreground" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
            {showLabels && (
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    step.completed
                      ? "text-green-600"
                      : step.current || index === currentStep
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            )}
            <Badge
              variant={step.completed ? "default" : step.current || index === currentStep ? "secondary" : "outline"}
              className="text-xs"
            >
              {step.completed ? "Done" : step.current || index === currentStep ? "Current" : "Pending"}
            </Badge>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm text-muted-foreground">
          {completedSteps} of {steps.length} completed
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      {showLabels && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Start</span>
          <span>{Math.round(progress)}% Complete</span>
          <span>Finish</span>
        </div>
      )}
    </div>
  )
}
