import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MissionCard } from "@/components/mission-card"
import { Leaf, Search, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"

const missions = [
  {
    title: "Mulching Challenge",
    description: "Learn and implement mulching techniques to improve soil health and water retention.",
    difficulty: "Easy" as const,
    duration: "2 weeks",
    rewards: 150,
    progress: 65,
    participants: 234,
  },
  {
    title: "Switch to Bio-Pesticides",
    description: "Transition from chemical pesticides to organic alternatives for healthier crops.",
    difficulty: "Medium" as const,
    duration: "3 weeks",
    rewards: 250,
    participants: 189,
  },
  {
    title: "Mixed Cropping Task",
    description: "Implement intercropping techniques to maximize yield and soil nutrients.",
    difficulty: "Hard" as const,
    duration: "4 weeks",
    rewards: 400,
    participants: 156,
  },
  {
    title: "Water Conservation Methods",
    description: "Learn drip irrigation and rainwater harvesting for efficient water use.",
    difficulty: "Medium" as const,
    duration: "3 weeks",
    rewards: 300,
    participants: 278,
  },
  {
    title: "Composting Workshop",
    description: "Create nutrient-rich compost from farm waste to improve soil fertility.",
    difficulty: "Easy" as const,
    duration: "1 week",
    rewards: 100,
    progress: 100,
    participants: 345,
    isCompleted: true,
  },
  {
    title: "Crop Rotation Planning",
    description: "Design a sustainable crop rotation schedule for your farm's specific needs.",
    difficulty: "Hard" as const,
    duration: "6 weeks",
    rewards: 500,
    participants: 98,
  },
]

export default function MissionsPage() {
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
                <h1 className="text-xl font-bold">Learning Missions</h1>
              </div>
            </div>
            <Button variant="outline">My Progress</Button>
          </div>
        </Container>
      </header>

      <Container className="py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Choose Your Learning Path</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Complete interactive missions to learn sustainable farming practices. Each mission is designed to be
            practical and immediately applicable to your farm.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search missions..." className="pl-10" />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Mission Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="default" className="cursor-pointer">
            All Missions
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Soil Health
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Water Management
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Pest Control
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Crop Planning
          </Badge>
        </div>

        {/* Missions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {missions.map((mission, index) => (
            <MissionCard key={index} {...mission} />
          ))}
        </div>

        {/* Personalized Recommendations */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Personalized for You
            </CardTitle>
            <CardDescription>Based on your farm type and location, we recommend these missions:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Banana Farmers Special</CardTitle>
                  <CardDescription className="text-sm">
                    Try 3 weeks of mulching specifically designed for banana cultivation
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button size="sm" className="w-full">
                    Start Now
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Monsoon Preparation</CardTitle>
                  <CardDescription className="text-sm">
                    Seasonal water management techniques for your region
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
