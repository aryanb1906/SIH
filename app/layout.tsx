import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import AIChatWidget from "@/components/ai-chat-widget"
import SessionHeader from "@/components/session-header"
import { Container } from "@/components/container"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "FarmGrow - Sustainable Farming Platform",
  description: "Empowering farmers with sustainable practices through gamified learning, community support, and AI assistance.",
  generator: "FarmGrow",
  manifest: "/manifest.json",
  themeColor: "#d97706",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
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
