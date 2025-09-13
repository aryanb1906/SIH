import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Leaf, ArrowLeft, Trophy, Target, TrendingUp, Calendar, Award, Droplets, Sprout, Users } from "lucide-react"
import Link from "next/link"

const achievements = [
  { name: "Soil Health Champion", icon: Sprout, color: "text-green-600", earned: true },
  { name: "Water Saver", icon: Droplets, color: "text-blue-600", earned: true },
  { name: "Eco Warrior", icon: Leaf, color: "text-primary", earned: true },
  { name: "Community Leader", icon: Users, color: "text-secondary", earned: false },
  { name: "Master Farmer", icon: Award, color: "text-yellow-600", earned: false },
]
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

async function getSession() {
  // NextAuth exposes session endpoint; we can forward cookie server-side
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/session`, {
    headers: { cookie: cookies().toString() },
    cache: "no-store",
  })
  if (!res.ok) return null
  return res.json()
}

export default async function DashboardPage() {
  const session = await getSession()
  if (!session || !session.user) redirect("/signin")
  const userName: string = session.user.name || "Farmer"
  // existing code below adjusted

  const sustainabilityScore = 78
  const completedMissions = 12
  const totalMissions = 25
  const currentStreak = 15

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Progress Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={session.user.image || "/farmer-avatar.png"} />
                <AvatarFallback>{(session.user.name || "U").split(" ").map((p: string) => p[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">Welcome back</p>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <Container className="py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {userName.split(" ")[0]}!</h2>
          <p className="text-xl text-muted-foreground">
            You're making great progress on your sustainable farming journey.
          </p>
        </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-primary">{sustainabilityScore}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>+12 this week</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Missions Completed</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">{completedMissions}/{totalMissions}</div>
              <Progress value={(completedMissions / totalMissions) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-secondary">{currentStreak}</div>
              <p className="text-xs text-muted-foreground">days active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-accent">3/5</div>
              <p className="text-xs text-muted-foreground">badges earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Mission */}
            <Card>
              <CardHeader>
                <CardTitle>Current Mission</CardTitle>
                <CardDescription>Your active learning challenge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">Mulching Challenge</h3>
                      <p className="text-sm text-muted-foreground">Implement mulching techniques across 2 hectares</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-3" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Continue Mission</Button>
                    <Button size="sm" variant="outline" className="bg-transparent">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your mission completion over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[{ week: "Week 1", completed: 3, total: 5 }, { week: "Week 2", completed: 4, total: 5 }, { week: "Week 3", completed: 5, total: 5 }, { week: "Week 4", completed: 2, total: 4 }].map((week, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-medium">{week.week}</div>
                      <div className="flex-1"><Progress value={(week.completed / week.total) * 100} className="h-2" /></div>
                      <div className="text-sm text-muted-foreground">{week.completed}/{week.total}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest farming achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Completed Composting Workshop</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    <Badge variant="outline" className="text-xs">+100 pts</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Started Mulching Challenge</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Earned Soil Health Champion badge</p>
                      <p className="text-xs text-muted-foreground">2 weeks ago</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Achievement</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your farming badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div key={index} className={`flex flex-col items-center p-3 rounded-lg border ${achievement.earned ? "bg-muted/50 border-primary/20" : "bg-muted/20 border-muted opacity-50"}`}>
                        <Icon className={`h-6 w-6 mb-2 ${achievement.color}`} />
                        <p className="text-xs text-center font-medium">{achievement.name}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            {/* Next Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Next</CardTitle>
                <CardDescription>Based on your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border bg-muted/30">
                  <h4 className="font-medium text-sm mb-1">Water Conservation Methods</h4>
                  <p className="text-xs text-muted-foreground mb-2">Perfect follow-up to your mulching work</p>
                  <Button size="sm" className="w-full">Start Mission</Button>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <h4 className="font-medium text-sm mb-1">Join Local Community</h4>
                  <p className="text-xs text-muted-foreground mb-2">Connect with 23 farmers in your area</p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">Explore</Button>
                </div>
              </CardContent>
            </Card>
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Summary</CardTitle>
                <CardDescription>Your contribution to sustainability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between"><span className="text-sm">Water Saved</span><span className="text-sm font-medium">2,400L</span></div>
                <div className="flex justify-between"><span className="text-sm">Soil Improved</span><span className="text-sm font-medium">1.5 hectares</span></div>
                <div className="flex justify-between"><span className="text-sm">CO₂ Reduced</span><span className="text-sm font-medium">450kg</span></div>
                <div className="flex justify-between"><span className="text-sm">Farmers Helped</span><span className="text-sm font-medium">8</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}
