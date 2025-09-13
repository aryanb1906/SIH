import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, Trophy, MessageCircle, Heart, Share2, Camera, MapPin, TrendingUp, Crown } from "lucide-react"
import Link from "next/link"

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
];
  // <Container className="py-4">

    const communityPosts = [
    {
      id: 1,
    author: "Priya Sharma",
    location: "Karnataka",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    content:
    "Just completed my first week of mulching! The soil moisture retention is already showing improvement. Here's my progress photo.",
    image: "/mulched-farm-field.jpg",
    likes: 24,
    comments: 8,
    badge: "Soil Health Champion",
  },
    {
      id: 2,
    author: "Amit Patel",
    location: "Gujarat",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "5 hours ago",
    content:
      "Sharing my drip irrigation setup for fellow farmers. This system has reduced my water usage by 40% while increasing yield. Happy to answer questions!",
      likes: 31,
      comments: 12,
      badge: "Water Saver",
  },
      {
        id: 3,
      author: "Sunita Devi",
      location: "Punjab",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "1 day ago",
      content:
      "Bio-pesticide preparation workshop was amazing! Made my own neem oil spray today. The community knowledge sharing is incredible.",
      likes: 18,
      comments: 6,
      badge: "Eco Warrior",
  },
];

      export default function CommunityPage() {
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
                  <Users className="h-6 w-6 text-primary" />
                  <h1 className="text-xl font-bold">Community</h1>
                </div>
              </div>
              <Button>
                <Camera className="h-4 w-4 mr-2" />
                Share Progress
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Connect with Fellow Farmers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Share your progress, learn from others, and celebrate sustainable farming achievements together.
            </p>
          </div>

          <Tabs defaultValue="feed" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="groups">Local Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Create Post */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Share Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea placeholder="What sustainable practice are you working on today?" />
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Camera className="h-4 w-4 mr-2" />
                          Add Photo
                        </Button>
                        <Button>Post Update</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Community Posts */}
                  {communityPosts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={post.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{post.author}</h3>
                              <Badge variant="outline" className="text-xs">
                                {post.badge}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{post.location}</span>
                              <span>•</span>
                              <span>{post.time}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm leading-relaxed">{post.content}</p>
                        {post.image && (
                          <div className="rounded-lg overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Farm progress"
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
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
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Mohan Kumar</p>
                          <p className="text-xs text-muted-foreground">2.3 km away</p>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Connect
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
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
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
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
            </TabsContent>
          </Tabs>
        </Container>
      </div>
      )
}
