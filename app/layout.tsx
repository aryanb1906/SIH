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
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-primary text-primary-foreground px-3 py-2 rounded">Skip to main</a>
        <header className="w-full bg-black">
          <Container className="flex justify-end items-center gap-4 py-4">
            <SessionHeader />
          </Container>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <main id="main-content">{children}</main>
            <AIChatWidget />
          </ThemeProvider>
        </Suspense>
        <Analytics />
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}


// bottom should be merged with upper export
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
//       <body>
//         <SessionProviderWrapper>
//           <header className="w-full bg-background border-b sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/95">
//             <Container className="flex justify-between items-center gap-4 py-4">
//               <div className="flex items-center gap-2">
//                 <Leaf className="h-8 w-8 text-primary" />
//                 <Link href="/" className="text-2xl font-bold text-primary">
//                   FarmGrow
//                 </Link>
//               </div>

//               <nav className="hidden md:flex items-center gap-6">
//                 <Link href="/missions" className="text-foreground hover:text-primary transition-colors">
//                   Missions
//                 </Link>
//                 <Link href="/community" className="text-foreground hover:text-primary transition-colors">
//                   Community
//                 </Link>
//                 <Link href="/rewards" className="text-foreground hover:text-primary transition-colors">
//                   Rewards
//                 </Link>
//                 <Link href="/quiz" className="text-foreground hover:text-primary transition-colors">
//                   Quiz
//                 </Link>
//                 <Link href="/support" className="text-foreground hover:text-primary transition-colors">
//                   Support
//                 </Link>
//                 <Link href="/faq" className="text-foreground hover:text-primary transition-colors">
//                   FAQ
//                 </Link>
//               </nav>

//               <div className="flex items-center gap-4">
//                 <MobileNav />
//                 <SessionHeader />
//                 <Link href="/signin">
//                   <Button variant="outline">Try Demo</Button>
//                 </Link>
//               </div>
//             </Container>
//           </header>

//           <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
//             <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//               <main id="main-content" className="min-h-screen">
//                 {children}
//               </main>
//               <AIChatWidget />
//               <Toaster />
//             </ThemeProvider>
//           </Suspense>
//         </SessionProviderWrapper>
//         {/* <Analytics /> */}
//       </body>
//     </html>
//   )
// }

