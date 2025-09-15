"use client"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MissionCard } from "@/components/mission-card"
import { Leaf, Search, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Mission {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  rewards: number
  participants: number
  category: string
  progress: number
  status: "not-started" | "in-progress" | "completed"
}

const initialMissions: Mission[] = [
  {
    id: "mulching",
    title: "Mulching Challenge",
    description: "Learn and implement mulching techniques to improve soil health and water retention.",
    difficulty: "Easy",
    duration: "2 weeks",
    rewards: 150,
    progress: 65,
    participants: 234,
    category: "Soil Health",
    status: "in-progress",
  },
  {
    id: "bio-pesticides",
    title: "Switch to Bio-Pesticides",
    description: "Transition from chemical pesticides to organic alternatives for healthier crops.",
    difficulty: "Medium",
    duration: "3 weeks",
    rewards: 250,
    progress: 0,
    participants: 189,
    category: "Pest Control",
    status: "not-started",
  },
  {
    id: "mixed-cropping",
    title: "Mixed Cropping Task",
    description: "Implement intercropping techniques to maximize yield and soil nutrients.",
    difficulty: "Hard",
    duration: "4 weeks",
    rewards: 400,
    progress: 0,
    participants: 156,
    category: "Crop Planning",
    status: "not-started",
  },
  {
    id: "water-conservation",
    title: "Water Conservation Methods",
    description: "Learn drip irrigation and rainwater harvesting for efficient water use.",
    difficulty: "Medium",
    duration: "3 weeks",
    rewards: 300,
    progress: 0,
    participants: 278,
    category: "Water Management",
    status: "not-started",
  },
  {
    id: "composting",
    title: "Composting Workshop",
    description: "Create nutrient-rich compost from farm waste to improve soil fertility.",
    difficulty: "Easy",
    duration: "1 week",
    rewards: 100,
    progress: 100,
    participants: 345,
    category: "Soil Health",
    status: "completed",
  },
  {
    id: "crop-rotation",
    title: "Crop Rotation Planning",
    description: "Design a sustainable crop rotation schedule for your farm's specific needs.",
    difficulty: "Hard",
    duration: "6 weeks",
    rewards: 500,
    progress: 0,
    participants: 98,
    category: "Crop Planning",
    status: "not-started",
  },
]

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [userPoints, setUserPoints] = useState<number>(() => Number(localStorage.getItem("missionPoints") || 0))

  // Load missions from storage or init
  useEffect(() => {
    const stored = localStorage.getItem("missionsState")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setMissions(parsed)
          return
        }
      } catch { }
    }
    setMissions(initialMissions)
  }, [])

  // Persist
  useEffect(() => {
    if (missions.length) {
      localStorage.setItem("missionsState", JSON.stringify(missions))
    }
  }, [missions])
  useEffect(() => {
    localStorage.setItem("missionPoints", String(userPoints))
  }, [userPoints])

  function startMission(id: string) {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: "in-progress", progress: m.progress || 0 } : m))
  }
  function completeMission(id: string) {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: "completed", progress: 100 } : m))
    const mission = missions.find(m => m.id === id)
    if (mission) setUserPoints(p => p + mission.rewards)
  }
  function updateProgress(id: string, stepPoints: number) {
    setMissions(prev => prev.map(m => {
      if (m.id === id) {
        const newProgress = Math.min(m.progress + stepPoints, 100)
        return {
          ...m,
          progress: newProgress,
          status: newProgress === 100 ? "completed" : m.status === "not-started" ? "in-progress" : m.status
        }
      }
      return m
    }))
    // Award points if completed
    const mission = missions.find(m => m.id === id)
    if (mission && mission.progress < 100 && mission.progress + stepPoints >= 100) {
      setUserPoints(p => p + mission.rewards)
    }
  }
  // Simple recommendation: not completed & not started first
  const recommendations = useMemo(() => missions.filter(m => m.status !== "completed").slice(0, 2), [missions])

  const filtered = useMemo(() => {
    let list = missions
    if (activeCategory) list = list.filter(m => m.category === activeCategory)
    if (query.trim()) list = list.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    return list
  }, [missions, activeCategory, query])

  const categories = ["Soil Health", "Water Management", "Pest Control", "Crop Planning"]

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
            <Button variant="outline">My Points: {userPoints}</Button>
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
            <Input placeholder="Search missions..." className="pl-10" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Mission Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge
            variant={activeCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory(null)}
          >All Missions</Badge>
          {categories.map(cat => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory(cat)}
            >{cat}</Badge>
          ))}
        </div>

        {/* Missions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map(m => (
            <MissionCard
              key={m.id}
              id={m.id}
              title={m.title}
              description={m.description}
              difficulty={m.difficulty}
              duration={m.duration}
              rewards={m.rewards}
              progress={m.progress}
              participants={m.participants}
              status={m.status}
              onStart={startMission}
              onComplete={completeMission}
              onUpdateProgress={updateProgress}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-muted-foreground text-sm">No missions match your filters.</div>
          )}
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
              {recommendations.map(r => (
                <Card key={r.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{r.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-3">{r.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button size="sm" className="w-full" onClick={() => startMission(r.id)}>
                      {r.status === "not-started" ? "Start Now" : r.status === "in-progress" ? "Resume" : "Completed"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {recommendations.length === 0 && (
                <div className="text-sm text-muted-foreground">All missions completed. Great job!</div>
              )}
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
