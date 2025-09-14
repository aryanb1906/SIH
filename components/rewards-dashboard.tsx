"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Trophy,
  Award,
  CreditCard,
  Users,
  Gift,
  Flame,
  Coins,
  Target,
  TrendingUp,
  Calendar,
  Share2,
  Copy,
  CheckCircle,
  Clock,
  Zap,
  Medal,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const initialPoints = 1250
const rewardTiers = [500, 1000, 2000, 5000, 10000]
const availableRewards = [
  {
    id: 1,
    title: "Organic Fertilizer Voucher",
    description: "₹500 voucher for organic fertilizer from certified suppliers",
    points: 200,
    category: "Supplies",
    available: true,
    image: "/organic-fertilizer-bag.png",
    popularity: 95,
    savings: "₹500",
  },
  {
    id: 2,
    title: "Drip Irrigation Kit",
    description: "Complete drip irrigation system for 0.5 hectare coverage",
    points: 800,
    category: "Equipment",
    available: true,
    image: "/drip-irrigation.png",
    popularity: 87,
    savings: "₹2,500",
  },
  {
    id: 3,
    title: "Sustainable Farming Certificate",
    description: "Government-recognized certificate for sustainable practices",
    points: 300,
    category: "Certification",
    available: true,
    image: "/certificate-award.jpg",
    popularity: 92,
    savings: "₹1,000",
  },
  {
    id: 4,
    title: "Advanced Training Workshop",
    description: "3-day intensive workshop on modern farming techniques",
    points: 600,
    category: "Training",
    available: true,
    image: "/farming-workshop-training.jpg",
    popularity: 78,
    savings: "₹3,000",
  },
  {
    id: 5,
    title: "Soil Testing Kit",
    description: "Professional soil analysis kit with lab testing included",
    points: 400,
    category: "Testing",
    available: false,
    image: "/soil-testing-kit.jpg",
    popularity: 89,
    savings: "₹1,500",
  },
  {
    id: 6,
    title: "Bio-Pesticide Starter Pack",
    description: "Organic pest control solutions for 1 hectare",
    points: 350,
    category: "Supplies",
    available: true,
    image: "/organic-pesticide-bottles.jpg",
    popularity: 84,
    savings: "₹800",
  },
  {
    id: 7,
    title: "Premium Seeds Collection",
    description: "High-yield organic seeds for seasonal crops - Limited time offer!",
    points: 250,
    category: "Supplies",
    available: true,
    image: "/organic-fertilizer-bag.png",
    limited: true,
    popularity: 96,
    savings: "₹600",
    timeLeft: "2 days",
  },
]

type Reward = {
  id: number
  title: string
  description: string
  points: number
  category: string
  available: boolean
  image: string
  limited?: boolean
  popularity: number
  savings: string
  timeLeft?: string
}

type MyReward = Reward & {
  status: string
  redeemedDate: string
  trackingId?: string
}

const initialMyRewards: MyReward[] = []
const governmentSchemes = [
  {
    title: "PM-KISAN Scheme",
    description: "Direct income support to farmers",
    eligibility: "All landholding farmers",
    benefit: "₹6,000 per year",
    link: "https://pmkisan.gov.in/",
    status: "Active",
  },
  {
    title: "Soil Health Card Scheme",
    description: "Free soil testing and nutrient management",
    eligibility: "All farmers",
    benefit: "Free soil analysis",
    link: "https://soilhealth.dac.gov.in/",
    status: "Available",
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme for farmers",
    eligibility: "All farmers",
    benefit: "Crop loss coverage",
    link: "https://pmfby.gov.in/",
    status: "Available",
  },
  {
    title: "Kisan Credit Card",
    description: "Credit facility for agricultural needs",
    eligibility: "Farmers with land records",
    benefit: "Low-interest credit",
    link: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc",
    status: "Available",
  },
]

const leaderboard = [
  { name: "Ravi Kumar", points: 1800, location: "Punjab", streak: 15 },
  { name: "Sunita Devi", points: 1600, location: "Haryana", streak: 12 },
  { name: "Amit Singh", points: 1500, location: "UP", streak: 10 },
  { name: "You", points: initialPoints, location: "Your State", streak: 8 },
  { name: "Priya Sharma", points: 1200, location: "MP", streak: 7 },
]

const referrals = [
  { name: "Suresh Patil", date: "2025-09-01", status: "Joined", points: 100 },
  { name: "Meena Reddy", date: "2025-08-28", status: "Pending", points: 0 },
  { name: "Kiran Patel", date: "2025-08-25", status: "Joined", points: 100 },
]

export default function RewardsDashboard() {
  const [points, setPoints] = useState(initialPoints)
  const [myRewards, setMyRewards] = useState<MyReward[]>(initialMyRewards)
  const [activeTab, setActiveTab] = useState("catalog")
  const [filterCategory, setFilterCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [referralCode] = useState("FARM2025XYZ")
  const [copied, setCopied] = useState(false)

  const nextTier = rewardTiers.find((tier) => tier > points) || rewardTiers[rewardTiers.length - 1]
  const progress = Math.min((points / nextTier) * 100, 100)
  const currentTierIndex = rewardTiers.findIndex((tier) => tier > points)
  const currentTier = currentTierIndex > 0 ? rewardTiers[currentTierIndex - 1] : 0

  const filteredRewards = availableRewards.filter((reward) => {
    const matchesCategory = filterCategory === "All" || reward.category === filterCategory
    const matchesSearch =
      reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = ["All", ...Array.from(new Set(availableRewards.map((r) => r.category)))]

  function redeemReward(reward: Reward) {
    if (!reward.available || points < reward.points) return

    const trackingId = `TRK${Date.now().toString().slice(-6)}`
    setPoints((p) => p - reward.points)
    setMyRewards((r) => [
      {
        ...reward,
        status: "Processing",
        redeemedDate: new Date().toISOString(),
        trackingId,
      },
      ...r,
    ])

    toast({
      title: "Reward Redeemed Successfully!",
      description: `${reward.title} has been added to your rewards. Tracking ID: ${trackingId}`,
    })
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    toast({
      title: "Referral Code Copied!",
      description: "Share this code with other farmers to earn bonus points.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Coins className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {points.toLocaleString()} Coins
                  <Zap className="h-5 w-5 text-secondary animate-pulse" />
                </h2>
                <p className="text-muted-foreground">
                  Tier {currentTierIndex + 1} • {nextTier - points} coins to next tier
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Progress value={progress} className="w-48 h-3" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                Next Tier: {nextTier.toLocaleString()} coins
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted rounded-xl shadow-lg p-1 grid grid-cols-3 md:grid-cols-6 gap-1">
          <TabsTrigger value="catalog" className="text-xs md:text-sm">
            <Gift className="h-4 w-4 mr-1" />
            Catalog
          </TabsTrigger>
          <TabsTrigger value="my" className="text-xs md:text-sm">
            <Award className="h-4 w-4 mr-1" />
            My Rewards
          </TabsTrigger>
          <TabsTrigger value="schemes" className="text-xs md:text-sm">
            <Medal className="h-4 w-4 mr-1" />
            Schemes
          </TabsTrigger>
          <TabsTrigger value="wallet" className="text-xs md:text-sm">
            <CreditCard className="h-4 w-4 mr-1" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-xs md:text-sm">
            <Trophy className="h-4 w-4 mr-1" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="referral" className="text-xs md:text-sm">
            <Users className="h-4 w-4 mr-1" />
            Referrals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                Rewards Catalog
              </CardTitle>
              <CardDescription>Redeem your coins for valuable farming resources and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  placeholder="Search rewards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md:max-w-sm"
                />
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={filterCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <Card
                key={reward.id}
                className={`relative border-2 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  reward.available
                    ? "border-primary/20 bg-card hover:border-primary/40"
                    : "border-destructive/20 bg-muted opacity-60"
                }`}
              >
                {reward.limited && (
                  <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground flex items-center gap-1 animate-pulse z-10">
                    <Flame className="h-3 w-3" />
                    {reward.timeLeft ? `${reward.timeLeft} left` : "Limited"}
                  </Badge>
                )}

                <CardHeader className="pb-3">
                  <div className="relative">
                    <img
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.title}
                      className="h-32 w-full object-cover rounded-lg mb-3 border border-border"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-background/80 text-foreground border">{reward.popularity}% popular</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold">{reward.title}</CardTitle>
                  <CardDescription className="text-sm">{reward.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{reward.category}</Badge>
                    <div className="text-right">
                      <div className="text-primary font-bold text-lg">{reward.points} coins</div>
                      <div className="text-xs text-muted-foreground">Save {reward.savings}</div>
                    </div>
                  </div>

                  <Button
                    disabled={!reward.available || points < reward.points}
                    className={`w-full transition-all duration-200 ${
                      reward.available && points >= reward.points
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                    onClick={() => redeemReward(reward)}
                  >
                    {reward.available
                      ? points >= reward.points
                        ? "Redeem Now"
                        : `Need ${reward.points - points} more coins`
                      : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                My Rewards
              </CardTitle>
              <CardDescription>Track your redeemed rewards and delivery status</CardDescription>
            </CardHeader>
            <CardContent>
              {myRewards.length === 0 ? (
                <div className="text-center py-12">
                  <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No rewards redeemed yet</h3>
                  <p className="text-muted-foreground mb-4">Start earning coins and redeem your first reward!</p>
                  <Button onClick={() => setActiveTab("catalog")}>Browse Rewards Catalog</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myRewards.map((reward, idx) => (
                    <Card key={idx} className="border-border bg-card shadow-md">
                      <CardHeader className="pb-3">
                        <img
                          src={reward.image || "/placeholder.svg"}
                          alt={reward.title}
                          className="h-28 w-full object-cover rounded-lg mb-2 border"
                        />
                        <CardTitle className="text-lg">{reward.title}</CardTitle>
                        <CardDescription className="text-sm">{reward.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{reward.category}</Badge>
                          <span className="text-primary font-bold">{reward.points} coins</span>
                        </div>

                        <div className="space-y-2">
                          <Badge
                            className={
                              reward.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : reward.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {reward.status}
                          </Badge>

                          {reward.trackingId && (
                            <div className="text-xs text-muted-foreground">Tracking ID: {reward.trackingId}</div>
                          )}

                          <div className="text-xs text-muted-foreground">
                            Redeemed: {new Date(reward.redeemedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schemes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-primary" />
                Government Schemes
              </CardTitle>
              <CardDescription>Explore government schemes and subsidies available for farmers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {governmentSchemes.map((scheme, idx) => (
                  <Card key={idx} className="border-border bg-card shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{scheme.title}</CardTitle>
                        <Badge
                          className={
                            scheme.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }
                        >
                          {scheme.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{scheme.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Eligibility: {scheme.eligibility}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Benefit: {scheme.benefit}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                          Apply Now
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Digital Wallet
                </CardTitle>
                <CardDescription>Track all earned, spent, and pending coins</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-primary" />
                      Current Coins
                    </span>
                    <span className="font-bold text-lg">{points.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Spent Coins</span>
                    <span className="font-semibold">{(initialPoints - points).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Pending Rewards</span>
                    <span className="font-semibold">{myRewards.filter((r) => r.status === "Processing").length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Current Tier</span>
                    <span className="font-semibold">Tier {currentTierIndex + 1}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest coin transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Quiz Completion</span>
                    </div>
                    <span className="text-green-600 font-semibold">+50 coins</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Mission Complete</span>
                    </div>
                    <span className="text-blue-600 font-semibold">+100 coins</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Reward Redeemed</span>
                    </div>
                    <span className="text-red-600 font-semibold">-200 coins</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card className="border-border bg-card shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Leaderboard
              </CardTitle>
              <CardDescription>Top farmers earn bonus coins and early access to rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((farmer, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                      farmer.name === "You"
                        ? "bg-primary/10 border border-primary/20 font-bold"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <Badge
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        idx === 0
                          ? "bg-yellow-500 text-white"
                          : idx === 1
                            ? "bg-gray-400 text-white"
                            : idx === 2
                              ? "bg-amber-600 text-white"
                              : farmer.name === "You"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {idx + 1}
                    </Badge>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{farmer.name}</span>
                        {idx === 0 && <Award className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {farmer.location} • {farmer.streak} day streak
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold">{farmer.points.toLocaleString()} coins</div>
                      <div className="text-xs text-muted-foreground">{farmer.streak} days active</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referral">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Referral Program
                </CardTitle>
                <CardDescription>Invite other farmers and earn 100 coins for each successful referral</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Your Referral Code</span>
                    <Button size="sm" variant="outline" onClick={copyReferralCode} className="h-8 bg-transparent">
                      {copied ? <CheckCircle className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <div className="font-mono text-lg font-bold text-primary">{referralCode}</div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={copyReferralCode}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Code
                  </Button>
                </div>

                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {referrals.filter((r) => r.status === "Joined").length * 100}
                  </div>
                  <div className="text-sm text-muted-foreground">Coins earned from referrals</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Your Referrals
                </CardTitle>
                <CardDescription>Track farmers you've invited to FarmGrow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {referrals.map((ref, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{ref.name}</div>
                        <div className="text-xs text-muted-foreground">{ref.date}</div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            ref.status === "Joined" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {ref.status}
                        </Badge>
                        {ref.points > 0 && (
                          <div className="text-xs text-green-600 font-semibold">+{ref.points} coins</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
