import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/container"
import { Leaf, Users, Trophy, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">FarmGrow</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/missions" className="text-foreground hover:text-primary transition-colors">
                Missions
              </Link>
              <Link href="/community" className="text-foreground hover:text-primary transition-colors">
                Community
              </Link>
              <Link href="/rewards" className="text-foreground hover:text-primary transition-colors">
                Rewards
              </Link>
              <Link href="/support" className="text-foreground hover:text-primary transition-colors">
                Support
              </Link>
              <a href="/api/auth/signin">
                <Button variant="outline">Sign In</Button>
              </a>
            </nav>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <Container className="text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Farming Made Fun, <span className="text-primary">Sustainable</span>, and Rewarding
            </h2>
            <p className="text-xl text-muted-foreground text-balance mb-8">
              Join thousands of farmers learning sustainable practices through interactive missions, community
              challenges, and real rewards that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/missions">
                <Button size="lg" className="text-lg px-8">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
              <Link href="/community">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  <Users className="mr-2 h-5 w-5" />
                  Join Community
                </Button>
              </Link>
              <Link href="/rewards">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Trophy className="mr-2 h-5 w-5" />
                  View Rewards
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <Container>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Transform Your Farming Journey</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover sustainable practices through gamified learning experiences designed specifically for farmers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Interactive Learning</CardTitle>
                <CardDescription>
                  Complete missions like "Mulching Challenge" and "Bio-Pesticide Switch" with step-by-step guidance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Connect with farmers in your area, share progress, and learn from each other's experiences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Real Rewards</CardTitle>
                <CardDescription>
                  Earn certificates, training credits, and recognition for adopting sustainable farming practices.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-muted-foreground">Learning Missions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">25,000</div>
              <div className="text-muted-foreground">Hectares Improved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <Container className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Sustainable Journey?</h3>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of forward-thinking farmers and start making a positive impact today.
            </p>
            <Link href="/missions">
              <Button size="lg" className="text-lg px-8">
                Get Started Now
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <Container>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">FarmGrow</span>
              </div>
              <p className="text-muted-foreground">
                Empowering farmers with sustainable practices through gamified learning.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/missions" className="hover:text-foreground">
                    Learning Missions
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Progress Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/support" className="hover:text-foreground">
                    AI Doubt Support
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    WhatsApp Groups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Local Meetings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FarmGrow. Empowering sustainable agriculture through technology.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
