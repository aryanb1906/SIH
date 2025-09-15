"use client"

import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { useEffect } from "react"
import {
  Trophy, Target, BookOpen, Users, Package, Bell, TrendingUp,
  Calendar, Star, ArrowRight, Leaf, Droplets, Calculator, Award, ArrowLeft
} from "lucide-react"
import Link from "next/link"
import WeatherWidget from "@/components/weather-widget"
import CropCalculator from "@/components/crop-calculator"
import NotificationCenter from "@/components/notification-center"

// Achievements mock (from code base one)
const achievements = [
  { name: "Soil Health Champion", icon: Leaf, color: "text-green-600", earned: true },
  { name: "Water Saver", icon: Droplets, color: "text-blue-600", earned: true },
  { name: "Eco Warrior", icon: Leaf, color: "text-primary", earned: true },
  { name: "Community Leader", icon: Users, color: "text-secondary", earned: false },
  { name: "Master Farmer", icon: Award, color: "text-yellow-600", earned: false },
]

export default function DashboardPage() {
  // Back button at the top
  const BackButton = () => (
    <div className="flex items-center mb-4">
      <Link href="/">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          Back
        </Button>
      </Link>
    </div>
  )
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

  // Mock user if not authenticated
  const currentUser = user || {
    id: "1",
    name: "Demo Farmer",
    email: "demo@farmgrow.com",
    image: null,
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

  // Example extra stats
  const sustainabilityScore = 78
  const currentStreak = currentUser.streak || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10 px-4">
        <BackButton />
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}!</h1>
            <p className="text-muted-foreground">
              Here's your farming dashboard with the latest updates and tools.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={("image" in currentUser && currentUser.image) ? currentUser.image : "/farmer-avatar.png"} />
              <AvatarFallback>
                {currentUser.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">Level {currentUser.level} • {currentUser.xp} XP</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Level / XP */}
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

          {/* Missions */}
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

          {/* Streak */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Current Streak</div>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{currentStreak} days active</p>
            </CardContent>
          </Card>

          {/* Notifications */}
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
                      <Button size="sm">Continue</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your mission completion over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                {[{ week: "Week 1", completed: 3, total: 5 }, { week: "Week 2", completed: 4, total: 5 }, { week: "Week 3", completed: 5, total: 5 }, { week: "Week 4", completed: 2, total: 4 }].map((week, i) => (
                  <div key={i} className="flex items-center gap-4 mb-2">
                    <div className="w-16 text-sm font-medium">{week.week}</div>
                    <div className="flex-1">
                      <Progress value={(week.completed / week.total) * 100} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">{week.completed}/{week.total}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest farming achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            {/* Blog Posts */}
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
                      <Button variant="outline" size="sm">Read</Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your farming badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((ach, i) => {
                    const Icon = ach.icon
                    return (
                      <div key={i} className={`flex flex-col items-center p-3 rounded-lg border ${ach.earned ? "bg-muted/50 border-primary/20" : "bg-muted/20 border-muted opacity-50"}`}>
                        <Icon className={`h-6 w-6 mb-2 ${ach.color}`} />
                        <p className="text-xs text-center font-medium">{ach.name}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
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
