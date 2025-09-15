"use client"
import RewardsDashboard from "@/components/rewards-dashboard"
import { Container } from "@/components/container"
import PageHeader from "@/components/page-header"
import BreadcrumbNav from "@/components/breadcrumb-nav"
import { Trophy, Sparkles } from "lucide-react"

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-8">
        <BreadcrumbNav />
        <PageHeader
          title="Rewards & Incentives"
          description="Earn coins by completing missions, participating in quizzes, and adopting sustainable farming practices. Redeem your rewards for valuable farming resources and certifications."
          icon={
            <div className="relative">
              <Trophy className="h-8 w-8 text-primary" />
              <Sparkles className="h-4 w-4 text-secondary absolute -top-1 -right-1 animate-pulse" />
            </div>
          }
          backHref="/"
        />
        <RewardsDashboard />
      </Container>
    </div>
  )
}
