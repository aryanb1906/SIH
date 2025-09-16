import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import AIChatWidget from "@/components/ai-chat-widget"
import SessionHeader from "@/components/session-header"
import MobileNav from "@/components/mobile-nav"
import { Container } from "@/components/container"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import SessionProviderWrapper from "@/components/session-provider"
import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FarmGrow - Sustainable Farming Platform",
  description: "Join thousands of farmers learning sustainable practices through interactive missions, quizzes, and community support. Earn rewards while making a positive impact.",
  generator: "FarmGrow",
  keywords: "farming, agriculture, sustainable farming, organic farming, quiz, rewards, community",
  manifest: "/manifest.json",
  themeColor: "#d97706",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  authors: [{ name: "FarmGrow Team" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FarmGrow"
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: "FarmGrow",
    title: "FarmGrow - Sustainable Farming Platform",
    description: "Empowering farmers with sustainable practices through gamified learning, community support, and AI assistance."
  },
  twitter: {
    card: "summary_large_image",
    title: "FarmGrow - Sustainable Farming Platform",
    description: "Empowering farmers with sustainable practices through gamified learning, community support, and AI assistance."
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-primary text-primary-foreground px-3 py-2 rounded">Skip to main</a>
        <SessionProviderWrapper>
          <header className="w-full bg-background border-b sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/95">
            <Container className="flex items-center justify-between py-4">
              {/* Left: Logo */}
              <div className="flex items-center gap-2 min-w-[160px]">
                <Leaf className="h-8 w-8 text-primary" />
                <Link href="/" className="text-2xl font-bold text-primary">FarmGrow</Link>
              </div>
              {/* Center: Nav Links */}
              <nav className="hidden md:flex flex-1 justify-center items-center gap-6">
                <Link href="/missions" className="text-foreground hover:text-primary transition-colors">Missions</Link>
                <Link href="/community" className="text-foreground hover:text-primary transition-colors">Community</Link>
                <Link href="/rewards" className="text-foreground hover:text-primary transition-colors">Rewards</Link>
                <Link href="/quiz" className="text-foreground hover:text-primary transition-colors">Quiz</Link>
                <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors">Marketplace</Link>
                <Link href="/blog" className="text-foreground hover:text-primary transition-colors">Blog</Link>
                <Link href="/support" className="text-foreground hover:text-primary transition-colors">Support</Link>
                <Link href="/faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
                <Link href="/leaderboard" className="text-foreground hover:text-primary transition-colors">Leaderboard</Link>
                <Link href="/activity" className="text-foreground hover:text-primary transition-colors">Activity</Link>
                <Link href="/data" className="text-foreground hover:text-primary transition-colors">Data</Link>
              </nav>
              {/* Right: User Section & Demo Button */}
              <div className="flex items-center gap-4 min-w-[220px] justify-end">
                {/* Responsive mobile menu */}
                <MobileNav />
                {/* User Section */}
                <SessionHeader />
                {/* Always show Try Demo */}
                <Link href="/signin">
                  <Button variant="outline">Try Demo</Button>
                </Link>
              </div>
            </Container>
            {/* Removed secondary mobile nav (duplication) - MobileNav component handles mobile links */}
          </header>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <main id="main-content" className="min-h-screen">
                {children}
              </main>
              <AIChatWidget />
              <Toaster />
            </ThemeProvider>
          </Suspense>
        </SessionProviderWrapper>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) { console.log('SW registered: ', registration); })
                    .catch(function(err) { console.log('SW registration failed: ', err); });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}


// Removed duplicated old layout comment after merging functionality above.

