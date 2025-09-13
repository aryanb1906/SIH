import RewardsDashboard from "@/components/rewards-dashboard"
import { Container } from "@/components/container"

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8">
        <RewardsDashboard />
      </Container>
    </div>
  )
}
