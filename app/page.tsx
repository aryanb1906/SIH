import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Container } from "@/components/container"
import { Leaf, Users, Trophy, BookOpen, Star, Droplets, Sprout, Bug, RotateCcw, Sun, Calendar, Clock, ArrowRight } from "lucide-react"
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
              <Link href="/faq" className="text-foreground hover:text-primary transition-colors">
                FAQ
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

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <Container>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">What Our Farmers Say</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from farmers who have transformed their practices and increased their yields through sustainable farming.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 italic">
                  "FarmGrow's mulching mission helped me reduce water usage by 40% while increasing my crop yield. The step-by-step guidance made it so easy to implement!"
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      RS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Rajesh Singh</div>
                    <div className="text-sm text-muted-foreground">Wheat Farmer, Punjab</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 italic">
                  "The bio-pesticide challenge was a game-changer for my organic farming. My vegetables are now healthier and I've saved money on chemical pesticides."
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-secondary/10 text-secondary font-semibold">
                      PM
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Priya Mehta</div>
                    <div className="text-sm text-muted-foreground">Vegetable Farmer, Maharashtra</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 italic">
                  "The community feature connected me with local farmers. We now share seeds, techniques, and support each other's sustainable farming journey."
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                      AK
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Amit Kumar</div>
                    <div className="text-sm text-muted-foreground">Rice Farmer, Odisha</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 4 */}
            <Card className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 italic">
                  "The crop rotation mission helped me improve soil health significantly. My fields are more productive and I'm earning better prices for my organic produce."
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      SK
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Sunita Kumari</div>
                    <div className="text-sm text-muted-foreground">Mixed Crop Farmer, Bihar</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 5 */}
            <Card className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 italic">
                  "FarmGrow's AI support answered all my farming questions instantly. The rewards system motivated me to complete more sustainable practices."
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-secondary/10 text-secondary font-semibold">
                      VG
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Vikram Gupta</div>
                    <div className="text-sm text-muted-foreground">Cotton Farmer, Gujarat</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 6 */}
            <Card className="relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 italic">
                  "The water conservation techniques I learned here helped me survive the drought season. My family is grateful for the knowledge and support."
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                      LP
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Lakshmi Prasad</div>
                    <div className="text-sm text-muted-foreground">Sugarcane Farmer, Karnataka</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 bg-muted/30">
        <Container>
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Latest from Our Blog</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest sustainable farming insights, success stories, and expert tips from our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Droplets className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                     Sept 15, 2025
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  Water Conservation Techniques for Indian Farmers
                </CardTitle>
                <CardDescription className="text-sm">
                  Learn about innovative water-saving methods that can reduce your water usage by up to 50% while maintaining crop yields.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    5 min read
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 2 */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Sprout className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Sept 12, 2025
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  Organic Composting: From Kitchen Waste to Farm Gold
                </CardTitle>
                <CardDescription className="text-sm">
                  Discover how to turn your kitchen scraps and farm waste into nutrient-rich compost that improves soil health naturally.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    7 min read
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 3 */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Bug className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Sept 10, 2025
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  Natural Pest Control: Chemical-Free Solutions
                </CardTitle>
                <CardDescription className="text-sm">
                  Explore effective organic pest management strategies that protect your crops without harming beneficial insects or the environment.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    6 min read
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 4 */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <RotateCcw className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Sept 8, 2025
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  Crop Rotation Strategies for Better Yields
                </CardTitle>
                <CardDescription className="text-sm">
                  Master the art of crop rotation to improve soil fertility, reduce pest problems, and increase your farm's productivity.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    8 min read
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 5 */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Sun className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Sept 5, 2025
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  Solar-Powered Farming: Harnessing Clean Energy
                </CardTitle>
                <CardDescription className="text-sm">
                  Learn how solar energy can power your irrigation systems, reduce costs, and make your farm more sustainable and profitable.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    9 min read
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Blog Post 6 */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Trophy className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Sept 3, 2025
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  Success Story: How Rajesh Increased His Wheat Yield by 40%
                </CardTitle>
                <CardDescription className="text-sm">
                  Read the inspiring journey of a Punjab farmer who transformed his traditional farming methods and achieved remarkable results.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    4 min read
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* View All Blogs Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group">
              <BookOpen className="mr-2 h-5 w-5" />
              View All Blog Posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
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
                  <Link href="/faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
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
