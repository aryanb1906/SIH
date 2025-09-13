"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Bot, Loader2, ArrowLeftCircle, Sparkles } from "lucide-react"
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

  const quickQuestions = ["Soil health tips?", "Organic pest control?", "Water conservation?", "Government schemes?"]

  const handleQuickQuestion = async (question: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          context: "Quick help widget - brief response needed",
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
        <div className="absolute -top-9 right-0 opacity-0 group-hover:opacity-100 transition text-xs bg-green-700 text-white px-2 py-1 rounded shadow">
          Ask AI
        </div>
        <Button
          ref={openBtnRef}
          aria-label="Open AI help chat"
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg relative overflow-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
        >
          <span className="absolute inset-0 bg-gradient-to-tr from-green-600/40 to-emerald-400/40 opacity-0 group-hover:opacity-100 transition" />
          <MessageCircle className="h-6 w-6 relative" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Card className="w-80 max-w-[90vw] shadow-xl border-green-100 animate-in fade-in slide-in-from-bottom-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Bot className="h-5 w-5 text-green-600" />
              <span className="flex items-center gap-1">AI Help <Sparkles className="h-3 w-3 text-amber-400" /></span>
            </CardTitle>
            <Button
              ref={closeBtnRef}
              variant="ghost"
              size="sm"
              aria-label="Close AI help chat"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!quickResponse ? (
            <>
              <p className="text-sm text-gray-600 font-medium">Quick farming questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto p-2 bg-white hover:bg-green-50 border-green-100 focus-visible:ring-2 focus-visible:ring-green-500"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
                  >
                    {question}
                  </Button>
                ))}
              </div>
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Getting answer...
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
                <p className="text-sm">{quickResponse}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setQuickResponse("")} className="w-full border-green-200">
                Ask Another Question
              </Button>
            </div>
          )}

          <div className="border-t pt-3">
            <Link href="/support">
              <Button className="w-full bg-green-600 hover:bg-green-700" aria-label="Open full AI chat support page">Open Full Chat</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
