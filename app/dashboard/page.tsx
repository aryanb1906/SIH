"use client"

import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import {
  Trophy, Target, BookOpen, Users, Package, Bell, TrendingUp,
  Calendar, Star, ArrowRight, Leaf, Droplets, Calculator, Award, ArrowLeft
} from "lucide-react"
import Link from "next/link"
import WeatherWidget from "@/components/weather-widget"
import CropCalculator from "@/components/crop-calculator"
import NotificationCenter from "@/components/notification-center"
import FeedbackForm from "@/components/feedback-form"
import { getTodayChallenge, saveChallenge } from "@/lib/dailyChallenge"
import { recordActivity } from "@/lib/activity"

// Achievements mock (from code base one)
// Removed duplicate header/navbar block that was disturbing dashboard layout.

export default function DashboardPage() {
  const [openMission, setOpenMission] = useState<any | null>(null);
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
  // Daily Challenge state
  const [dailyChallenge, setDailyChallenge] = useState(() => getTodayChallenge())
  // Achievements list (static placeholder)
  const achievements: Array<{ name: string; icon: any; earned: boolean; color: string }> = [
    { name: 'Water Guardian', icon: Droplets, earned: true, color: 'text-blue-500' },
    { name: 'Soil Saver', icon: Leaf, earned: true, color: 'text-green-600' },
    { name: 'Harvest Hero', icon: Award, earned: false, color: 'text-amber-500' },
    { name: 'Mission Streak', icon: Calendar, earned: false, color: 'text-purple-500' }
  ]

  function acceptChallenge() {
    if (dailyChallenge.status !== 'new') return
    const upd = { ...dailyChallenge, status: 'accepted' as const }
    setDailyChallenge(upd)
    saveChallenge(upd)
    recordActivity({ type: 'daily:accept', message: `Accepted daily challenge: ${upd.title}` })
  }
  function completeChallenge() {
    if (dailyChallenge.status === 'completed') return
    const upd = { ...dailyChallenge, status: 'completed' as const }
    setDailyChallenge(upd)
    saveChallenge(upd)
    recordActivity({ type: 'daily:complete', message: `Completed daily challenge: ${upd.title}`, payload: { rewardPoints: upd.rewardPoints, rewardXP: upd.rewardXP } })
  }

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
                      <Button size="sm" onClick={() => setOpenMission(mission)}>Continue</Button>
                    </div>
                  ))}
                  {/* Mission Modal */}
                  {openMission && (
                    <Dialog open={!!openMission} onOpenChange={() => setOpenMission(null)}>
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                        <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md">
                          <h3 className="text-xl font-bold mb-2">{openMission.title}</h3>
                          <p className="mb-4 text-muted-foreground">{openMission.description}</p>
                          <div className="mb-4 flex items-center gap-2">
                            <Badge variant="secondary">{openMission.difficulty}</Badge>
                            <span className="text-sm">{openMission.xpReward} XP • {openMission.pointsReward} points</span>
                          </div>
                          <Progress value={openMission.progress} className="h-2 mb-4" />
                          <Button onClick={() => { setOpenMission(null); /* Optionally mark as complete here */ }} className="w-full">Mark as Complete</Button>
                          <Button variant="outline" onClick={() => setOpenMission(null)} className="w-full mt-2">Close</Button>
                        </div>
                      </div>
                    </Dialog>
                  )}
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

            {/* Daily Challenge */}
            <Card className={dailyChallenge.status === 'completed' ? 'border-green-500' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Daily Challenge
                </CardTitle>
                <CardDescription>{dailyChallenge.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-1">{dailyChallenge.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{dailyChallenge.description}</p>
                <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                  <Badge variant="secondary">{dailyChallenge.rewardPoints} pts</Badge>
                  <Badge variant="outline">{dailyChallenge.rewardXP} XP</Badge>
                  <Badge variant={dailyChallenge.status === 'completed' ? 'default' : 'outline'}>{dailyChallenge.status}</Badge>
                </div>
                {dailyChallenge.status === 'new' && (
                  <Button size="sm" onClick={acceptChallenge} className="w-full">Accept Challenge</Button>
                )}
                {dailyChallenge.status === 'accepted' && (
                  <Button size="sm" variant="secondary" onClick={completeChallenge} className="w-full">Mark Completed</Button>
                )}
                {dailyChallenge.status === 'completed' && (
                  <div className="text-green-600 text-sm font-medium">Completed! Rewards applied locally.</div>
                )}
                <div className="mt-4 text-[10px] text-muted-foreground">Daily challenge rotates every 24h (local time). Stored only in your browser.</div>
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

        {/* Feedback Section */}
        <div className="mt-20" id="feedback">
          <h2 className="text-2xl font-bold mb-4">Feedback & Improvements</h2>
          <p className="text-sm text-muted-foreground mb-6">Share a feature idea or report an issue below. (Stored locally for now.)</p>
          <FeedbackForm />
        </div>
      </Container>
    </div>
  )
}
