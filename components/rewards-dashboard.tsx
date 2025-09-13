"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Award, Coins, CreditCard, Calendar, Users, Gift, Flame } from "lucide-react"

const initialPoints = 1250
const rewardTiers = [500, 1000, 2000]
const availableRewards = [
    { id: 1, title: "Organic Fertilizer Voucher", description: "₹500 voucher for organic fertilizer from certified suppliers", points: 200, category: "Supplies", available: true, image: "/organic-fertilizer-bag.png" },
    { id: 2, title: "Drip Irrigation Kit", description: "Complete drip irrigation system for 0.5 hectare coverage", points: 800, category: "Equipment", available: true, image: "/drip-irrigation.png" },
    { id: 3, title: "Sustainable Farming Certificate", description: "Government-recognized certificate for sustainable practices", points: 300, category: "Certification", available: true, image: "/certificate-award.jpg" },
    { id: 4, title: "Advanced Training Workshop", description: "3-day intensive workshop on modern farming techniques", points: 600, category: "Training", available: true, image: "/farming-workshop-training.jpg" },
    { id: 5, title: "Soil Testing Kit", description: "Professional soil analysis kit with lab testing included", points: 400, category: "Testing", available: false, image: "/soil-testing-kit.jpg" },
    { id: 6, title: "Bio-Pesticide Starter Pack", description: "Organic pest control solutions for 1 hectare", points: 350, category: "Supplies", available: true, image: "/organic-pesticide-bottles.jpg" },
    { id: 7, title: "Organic Seeds Pack (Limited Offer)", description: "Seasonal pack – available this month only!", points: 250, category: "Supplies", available: true, image: "/organic-fertilizer-bag.png", limited: true },
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
}

type MyReward = Reward & {
    status: string
    redeemedDate: string
}

const initialMyRewards: MyReward[] = []
const governmentSchemes = [
    { title: "PM-KISAN Scheme", description: "Direct income support to farmers", eligibility: "All landholding farmers", benefit: "₹6,000 per year", link: "#" },
    { title: "Soil Health Card Scheme", description: "Free soil testing and nutrient management", eligibility: "All farmers", benefit: "Free soil analysis", link: "#" },
]
const leaderboard = [
    { name: "Ravi Kumar", points: 1800 },
    { name: "Sunita Devi", points: 1600 },
    { name: "Amit Singh", points: 1500 },
    { name: "You", points: initialPoints },
]
const referrals = [
    { name: "Suresh Patil", date: "2025-09-01", status: "Joined" },
    { name: "Meena Reddy", date: "2025-08-28", status: "Pending" },
]

export default function RewardsDashboard() {
    const [points, setPoints] = useState(initialPoints)
    const [myRewards, setMyRewards] = useState<MyReward[]>(initialMyRewards)
    const [activeTab, setActiveTab] = useState("catalog")
    const nextTier = rewardTiers.find(tier => tier > points) || rewardTiers[rewardTiers.length - 1]
    const progress = Math.min((points / nextTier) * 100, 100)

    function redeemReward(reward: Reward) {
        if (!reward.available || points < reward.points) return
        setPoints(p => p - reward.points)
        setMyRewards(r => [{ ...reward, status: "Pending Delivery", redeemedDate: new Date().toISOString() }, ...r])
    }

    return (
        <div className="min-h-screen bg-black py-6">
            <div className="max-w-5xl mx-auto px-2 sm:px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <Trophy className="h-8 w-8 text-gold-400 animate-bounce" />
                        <h1 className="text-2xl font-bold text-white">Rewards & Incentives</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-gold-400 text-black text-lg px-4 py-2 shadow animate-pulse">{points} pts</Badge>
                        <Progress value={progress} className="w-32 h-3 bg-[#333]" />
                        <span className="text-xs text-white/80">Next Tier: {nextTier} pts</span>
                    </div>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                    <TabsList className="bg-[#111] rounded-xl shadow">
                        <TabsTrigger value="catalog" className="text-white">Rewards Catalog</TabsTrigger>
                        <TabsTrigger value="my" className="text-white">My Rewards</TabsTrigger>
                        <TabsTrigger value="schemes" className="text-white">Government Schemes</TabsTrigger>
                        <TabsTrigger value="wallet" className="text-white">Digital Wallet</TabsTrigger>
                        <TabsTrigger value="leaderboard" className="text-white">Leaderboard</TabsTrigger>
                        <TabsTrigger value="referral" className="text-white">Referral Rewards</TabsTrigger>
                    </TabsList>
                    <TabsContent value="catalog">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {availableRewards.map(reward => (
                                <Card key={reward.id} className={`relative border-2 rounded-xl shadow-lg transition-all duration-300 ${reward.available ? "border-gold-400 bg-black" : "border-red-400 bg-[#111] opacity-60"}`}>
                                    {reward.limited && (
                                        <Badge className="absolute top-2 right-2 bg-gold-400 text-black flex items-center gap-1 animate-pulse"><Flame className="h-4 w-4" /> Limited Time</Badge>
                                    )}
                                    <CardHeader className="bg-black rounded-t-xl">
                                        <img src={reward.image} alt={reward.title} className="h-28 w-full object-cover rounded mb-2 border border-[#333]" />
                                        <CardTitle className="text-lg text-white font-bold">{reward.title}</CardTitle>
                                        <CardDescription className="text-sm text-white/80">{reward.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="rounded-b-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className="bg-gold-400 text-black">{reward.category}</Badge>
                                            <span className="text-gold-400 font-bold">{reward.points} pts</span>
                                        </div>
                                        <Button
                                            disabled={!reward.available || points < reward.points}
                                            className={`w-full transition-transform active:scale-95 bg-gold-400 hover:bg-gold-500 text-white font-bold rounded-xl px-5 py-3 ${!reward.available ? "bg-[#333] text-white/40" : ""}`}
                                            onClick={() => redeemReward(reward)}
                                        >
                                            {reward.available ? (points >= reward.points ? "Redeem Now" : "Not Enough Points") : "Out of Stock"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="my">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myRewards.length === 0 ? (
                                <div className="col-span-3 text-center text-brown-600 py-8">No rewards redeemed yet.</div>
                            ) : myRewards.map((reward, idx) => (
                                <Card key={idx} className="border-green-200 bg-white shadow-md">
                                    <CardHeader>
                                        <img src={reward.image} alt={reward.title} className="h-28 w-full object-cover rounded mb-2 border" />
                                        <CardTitle className="text-lg text-brown-800">{reward.title}</CardTitle>
                                        <CardDescription className="text-sm text-brown-600">{reward.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className="bg-green-100 text-green-800">{reward.category}</Badge>
                                            <span className="text-gold-600 font-bold">{reward.points} pts</span>
                                        </div>
                                        <Badge className="bg-gold-400 text-brown-900">{reward.status}</Badge>
                                        <div className="text-xs text-brown-500 mt-2">Redeemed: {new Date(reward.redeemedDate).toLocaleDateString()}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="schemes">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {governmentSchemes.map((scheme, idx) => (
                                <Card key={idx} className="border-blue-200 bg-white shadow-md">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-blue-800">{scheme.title}</CardTitle>
                                        <CardDescription className="text-sm text-blue-600">{scheme.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-xs text-blue-700 mb-2">Eligibility: {scheme.eligibility}</div>
                                        <div className="text-xs text-blue-700 mb-2">Benefit: {scheme.benefit}</div>
                                        <Button variant="outline" className="border-blue-200" asChild>
                                            <a href={scheme.link} target="_blank" rel="noopener noreferrer">Learn More</a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="wallet">
                        <Card className="border-gold-200 bg-white shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg text-gold-700 flex items-center gap-2"><CreditCard className="h-5 w-5" /> Digital Wallet</CardTitle>
                                <CardDescription className="text-sm text-gold-600">Track all earned, spent, and pending points</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-brown-700"><span>Current Points</span><span>{points}</span></div>
                                    <div className="flex justify-between text-brown-700"><span>Spent Points</span><span>{initialPoints - points}</span></div>
                                    <div className="flex justify-between text-brown-700"><span>Pending Rewards</span><span>{myRewards.filter(r => r.status === "Pending Delivery").length}</span></div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="leaderboard">
                        <Card className="border-green-200 bg-white shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg text-green-700 flex items-center gap-2"><Star className="h-5 w-5" /> Leaderboard</CardTitle>
                                <CardDescription className="text-sm text-green-600">Top farmers earn bonus points and early access to rewards</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {leaderboard.map((farmer, idx) => (
                                        <div key={idx} className={`flex items-center gap-3 ${farmer.name === "You" ? "font-bold text-brown-800" : "text-brown-700"}`}>
                                            <Badge className={farmer.name === "You" ? "bg-gold-400 text-brown-900" : "bg-green-100 text-green-800"}>{idx + 1}</Badge>
                                            <span>{farmer.name}</span>
                                            <span className="ml-auto">{farmer.points} pts</span>
                                            {idx === 0 && <Award className="h-4 w-4 text-gold-500" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="referral">
                        <Card className="border-green-200 bg-white shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg text-green-700 flex items-center gap-2"><Users className="h-5 w-5" /> Referral Rewards</CardTitle>
                                <CardDescription className="text-sm text-green-600">Invite other farmers and earn extra points</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {referrals.map((ref, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-brown-700">
                                            <Gift className="h-4 w-4 text-gold-500" />
                                            <span>{ref.name}</span>
                                            <span className="ml-auto text-xs text-brown-500">{ref.date}</span>
                                            <Badge className={ref.status === "Joined" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{ref.status}</Badge>
                                        </div>
                                    ))}
                                </div>
                                <Button className="mt-4 bg-gold-400 hover:bg-gold-500 w-full">Invite Farmer</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
