"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Bot, Loader2, Sparkles, Coins } from "lucide-react"
import Link from "next/link"

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [quickResponse, setQuickResponse] = useState("")
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const openBtnRef = useRef<HTMLButtonElement | null>(null)

  // Return focus to launcher when closing for accessibility
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeBtnRef.current?.focus(), 10)
    } else if (!isOpen) {
      openBtnRef.current?.focus()
    }
  }, [isOpen])

  const quickQuestions = [
    "Organic pest control methods?",
    "Water conservation techniques?",
    "Soil health improvement tips?",
    "Government farming schemes?",
    "Crop rotation benefits?",
    "Post-harvest storage tips?",
  ]

  const handleQuickQuestion = async (question: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          context: "Quick help widget - brief response needed",
          userId: "widget-user", // Added user tracking
        }),
      })
      const data = await response.json()
      setQuickResponse(data.message?.substring(0, 200) + "..." || "Sorry, please try again.")
    } catch (error) {
      setQuickResponse("Unable to get response. Please try the full chat.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group">
        <div className="absolute -top-12 right-0 opacity-0 group-hover:opacity-100 transition text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-1">
            <Bot className="h-3 w-3" />
            Ask FarmGrow AI
        </div>
      </div>
      <Button
        ref={openBtnRef}
        aria-label="Open FarmGrow AI chat"
        onClick={() => setIsOpen(true)}
        className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-xl relative overflow-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary animate-pulse"
      >
          <span className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition" />
          <div className="relative flex flex-col items-center">
            <Bot className="h-6 w-6" />
            <Sparkles className="h-3 w-3 text-secondary absolute -top-1 -right-1" />
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Card className="w-96 max-w-[95vw] shadow-2xl border-primary/20 animate-in fade-in slide-in-from-bottom-2">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Bot className="h-5 w-5 text-primary" />
              <span className="flex items-center gap-1">
                FarmGrow AI 
                <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
              </span>
            </CardTitle>
            <Button
              ref={closeBtnRef}
              variant="ghost"
              size="sm"
              aria-label="Close FarmGrow AI chat"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Coins className="h-3 w-3 text-secondary" />
            Expert farming advice • Earn coins with missions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!quickResponse ? (
            <>
              <p className="text-sm text-muted-foreground font-medium">Quick farming questions:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto p-3 bg-background hover:bg-primary/5 border-primary/20 focus-visible:ring-2 focus-visible:ring-primary/50 text-left justify-start"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </Button>
                ))}
              </div>
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Getting expert advice...
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-lg border border-primary/20">
                <p className="text-sm leading-relaxed">{quickResponse}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuickResponse("")} 
                className="w-full border-primary/20 hover:bg-primary/5"
              >
                Ask Another Question
              </Button>
            </div>
          )}

          <div className="border-t pt-3">
            <Link href="/support">
              <Button className="w-full bg-primary hover:bg-primary/90" aria-label="Open full FarmGrow AI chat ">
                <MessageCircle className="mr-2 h-4 w-4" />
                Open Full Chat
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
