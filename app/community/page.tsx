"use client"
//have to fix this page
import { Container } from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppStore } from "@/lib/store"
import { useEffect } from "react"
import {
  ArrowLeft, MessageCircle, Heart, Share2, Camera, MapPin, Crown,
  Trophy,
  Target,
  BookOpen,
  Users,
  Package,
  Bell,
  TrendingUp,
  Calendar,
  Star,
  ArrowRight,
  Leaf,
  Droplets,
  Award,
  Sprout
} from "lucide-react"
import Link from "next/link"
import WeatherWidget from "@/components/weather-widget"
import CropCalculator from "@/components/crop-calculator"
import NotificationCenter from "@/components/notification-center"

// Achievements data (from code base one)
const achievements = [
  { name: "Soil Health Champion", icon: Sprout, color: "text-green-600", earned: true },
  { name: "Water Saver", icon: Droplets, color: "text-blue-600", earned: true },
  { name: "Eco Warrior", icon: Leaf, color: "text-primary", earned: true },
  { name: "Community Leader", icon: Users, color: "text-secondary", earned: false },
  { name: "Master Farmer", icon: Award, color: "text-yellow-600", earned: false },
]

const leaderboardData = [
  { rank: 1, name: "Priya Sharma", location: "Karnataka", score: 2450, avatar: "/placeholder.svg?height=40&width=40" },
  {
    rank: 2,
    name: "Raj Kumar",
    location: "Tamil Nadu",
    score: 2380,
    avatar: "/placeholder.svg?height=40&width=40",
    isCurrentUser: true,
  },
  { rank: 3, name: "Amit Patel", location: "Gujarat", score: 2290, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 4, name: "Sunita Devi", location: "Punjab", score: 2150, avatar: "/placeholder.svg?height=40&width=40" },
  {
    rank: 5,
    name: "Ravi Reddy",
    location: "Andhra Pradesh",
    score: 2080,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

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
  const recentBlogPosts = blogPosts.slice(0, 3)
  const upcomingMissions = missions.filter(m => !m.isCompleted).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10 px-4">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Back
            </Button>
          </Link>
        </div>
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
                <Progress value={(activeMissions / (missions.length || 1)) * 100} className="h-2" />
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

        {/* Main Grid */}
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

            {/* Weekly Progress (from base one) */}
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

            {/* Recent Activities (from base one) */}
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

            {/* top eco warriors, leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Top Eco Warriors
                </CardTitle>
                <CardDescription>Farmers leading the sustainable agriculture movement in your region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((farmer) => (
                    <div
                      key={farmer.rank}
                      className={`flex items-center gap-4 p-3 rounded-lg ${farmer.isCurrentUser ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                        }`}
                    >
                      <div className="flex items-center justify-center w-8 h-8">
                        {farmer.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                        {farmer.rank !== 1 && (
                          <span className="text-sm font-bold text-muted-foreground">#{farmer.rank}</span>
                        )}
                      </div>
                      <Avatar>
                        <AvatarImage src={farmer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {farmer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{farmer.name}</h3>
                          {farmer.isCurrentUser && <Badge variant="secondary">You</Badge>}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{farmer.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{farmer.score}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* local groups */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tamil Nadu Banana Farmers</CardTitle>
                  <CardDescription>234 members • Very Active</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share experiences and best practices for banana cultivation in Tamil Nadu climate.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">RK</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">PS</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">MK</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs text-muted-foreground">+231 others</span>
                  </div>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organic Farming Enthusiasts</CardTitle>
                  <CardDescription>567 members • Active</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn and share organic farming techniques, from composting to natural pest control.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">AP</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">SD</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">LR</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs text-muted-foreground">+564 others</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Join Group
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Water Conservation Network</CardTitle>
                  <CardDescription>189 members • Growing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Focus on water-saving techniques, drip irrigation, and rainwater harvesting methods.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">RR</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">VK</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs text-muted-foreground">+187 others</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Join Group
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Young Farmers Initiative</CardTitle>
                  <CardDescription>423 members • Very Active</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Next-generation farmers embracing technology and sustainable practices.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">NK</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">AS</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback className="text-xs">PM</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs text-muted-foreground">+420 others</span>
                  </div>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
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

            <WeatherWidget />
            <CropCalculator />
            <NotificationCenter />


            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Farmers</span>
                  <span className="text-sm font-medium">10,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Posts This Week</span>
                  <span className="text-sm font-medium">1,834</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Hectares Improved</span>
                  <span className="text-sm font-medium">25,680</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Stories</span>
                  <span className="text-sm font-medium">3,421</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements (from base one) */}
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

            {/* Impact Summary (from base one) */}
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

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm">#MulchingChallenge</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm">#WaterConservation</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm">#BioPesticides</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm">#CropRotation</span>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Farmers */}
            <Card>
              <CardHeader>
                <CardTitle>Farmers Near You</CardTitle>
                <CardDescription>Connect with local farmers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar> */}
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mohan Kumar</p>
                    <p className="text-xs text-muted-foreground">2.3 km away</p>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  {/* <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar> */}
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lakshmi Rao</p>
                    <p className="text-xs text-muted-foreground">4.1 km away</p>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}
