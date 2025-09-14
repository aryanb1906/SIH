"use client"

import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppStore } from "@/lib/store"
import { useEffect } from "react"
import { 
  Trophy, 
  Target, 
  BookOpen, 
  Users, 
  Package, 
  Bell, 
  TrendingUp, 
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Leaf,
  Droplets,
  Calculator
} from "lucide-react"
import Link from "next/link"
import WeatherWidget from "@/components/weather-widget"
import CropCalculator from "@/components/crop-calculator"
import NotificationCenter from "@/components/notification-center"

export default function DashboardPage() {
  const { 
    user, 
    missions, 
    blogPosts, 
    notifications, 
    unreadCount,
    loadMissions, 
    loadBlogPosts,
    addNotification 
  } = useAppStore()

  useEffect(() => {
    loadMissions()
    loadBlogPosts()
    
    // Add a welcome notification
    if (user && notifications.length === 0) {
      addNotification({
        title: "Welcome to FarmGrow!",
        message: "Start your sustainable farming journey by exploring missions and connecting with the community.",
        type: "info",
        isRead: false,
        actionUrl: "/missions"
      })
    }
  }, [user, loadMissions, loadBlogPosts, notifications.length, addNotification])

  // Mock user data if not authenticated
  const currentUser = user || {
    id: "1",
    name: "Demo Farmer",
    email: "demo@farmgrow.com",
    level: 5,
    xp: 1250,
    points: 450,
    streak: 7,
    location: "Punjab, India",
    farmSize: 5,
    crops: ["Rice", "Wheat", "Cotton"]
  }

  const completedMissions = missions.filter(m => m.isCompleted).length
  const activeMissions = missions.filter(m => !m.isCompleted && m.progress > 0).length
  const totalXP = missions.reduce((sum, m) => sum + (m.isCompleted ? m.xpReward : 0), 0)
  const totalPoints = missions.reduce((sum, m) => sum + (m.isCompleted ? m.pointsReward : 0), 0)

  const recentBlogPosts = blogPosts.slice(0, 3)
  const upcomingMissions = missions.filter(m => !m.isCompleted).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}!</h1>
          <p className="text-muted-foreground">
            Here's your farming dashboard with the latest updates and tools.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.level}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>XP Progress</span>
                  <span>{currentUser.xp}/1500</span>
                </div>
                <Progress value={(currentUser.xp / 1500) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{completedMissions}</div>
                  <div className="text-sm text-muted-foreground">Missions Completed</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Active Missions</span>
                  <span>{activeMissions}</span>
                </div>
                <Progress value={(activeMissions / missions.length) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.points}</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Streak</span>
                  <span>{currentUser.streak} days</span>
                </div>
                <Progress value={(currentUser.streak / 30) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{unreadCount}</div>
                  <div className="text-sm text-muted-foreground">New Notifications</div>
                </div>
              </div>
              <div className="mt-3">
                <Link href="/notifications">
                  <Button variant="outline" size="sm" className="w-full">
                    View All
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Missions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Active Missions
                  </CardTitle>
                  <Link href="/missions">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMissions.map((mission) => (
                    <div key={mission.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{mission.title}</h4>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">{mission.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {mission.xpReward} XP • {mission.pointsReward} points
                          </span>
                        </div>
                        <div className="mt-2">
                          <Progress value={mission.progress} className="h-2" />
                        </div>
                      </div>
                      <Button size="sm">
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Blog Posts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Latest Blog Posts
                  </CardTitle>
                  <Link href="/blog">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBlogPosts.map((post) => (
                    <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{post.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>By {post.author}</span>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="outline" size="sm">
                          Read
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Weather Widget */}
            <WeatherWidget />

            {/* Crop Calculator */}
            <CropCalculator />

            {/* Notifications */}
            <NotificationCenter />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/missions">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-4 w-4" />
                    Start New Mission
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Browse Marketplace
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Join Community
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="outline" className="w-full justify-start">
                    <Droplets className="mr-2 h-4 w-4" />
                    Get AI Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}