"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Loader2, MessageCircle, Lightbulb, Users, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const quickQuestions = [
  "How to improve soil health naturally?",
  "Best organic pesticides for vegetables?",
  "Water-saving irrigation techniques?",
  "Crop rotation benefits and methods?",
  "Government schemes for farmers?",
  "Post-harvest storage tips?",
]

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI farming assistant. I can help you with sustainable farming practices, crop management, pest control, and government schemes. What would you like to know?",
      sender: "ai",
      timestamp: new Date("2025-09-13T00:00:00Z"), // static timestamp for SSR
    },
  ])

  // On mount, update the timestamp to current time (client only)
  useEffect(() => {
    setMessages((msgs) =>
      msgs.map((msg, i) =>
        i === 0
          ? { ...msg, timestamp: new Date() }
          : msg
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          context: "Banana farmer from Tamil Nadu, interested in sustainable practices",
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later or contact our support team.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

return (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    <Container className="py-10 px-4 md:px-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="p-2 rounded-full bg-white border border-gray-300 shadow-sm">
            <ArrowLeft className="h-4 w-4 text-gray-700" />
          </span>
          Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="p-4 bg-white rounded-full border border-gray-300 shadow">
            <MessageCircle className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            AI Doubt Support
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Get instant answers to your farming questions from our AI assistant
          trained on sustainable agriculture practices.
        </p>
      </div>

      {/* Chat Section */}
      <div className="max-w-5xl mx-auto">
        <Card className="h-[80vh] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-xl">
          {/* Header */}
          <CardHeader className="border-b border-gray-200 px-5 py-4">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold text-gray-900">
              <Bot className="h-5 w-5 text-blue-500" />
              AI Farming Assistant
              <Badge
                variant="secondary"
                className="ml-auto bg-blue-100 text-blue-700 font-medium"
              >
                Online
              </Badge>
            </CardTitle>
          </CardHeader>

          {/* Messages (No Scroll) */}
          <CardContent className="flex-1 px-5 py-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="p-2 bg-blue-100 rounded-full border border-blue-200 shadow-sm">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-full sm:max-w-[75%] md:max-w-[65%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900 border border-gray-200"
                  }`}
                >
                  {message.content.split(/\n+/).map((para, idx) => (
                    <p
                      key={idx}
                      className="mb-2 whitespace-pre-line last:mb-0"
                    >
                      {para.trim()}
                    </p>
                  ))}
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user"
                        ? "text-blue-200"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="p-2 bg-blue-600 rounded-full shadow-sm">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="p-2 bg-blue-100 rounded-full border border-blue-200">
                  <Bot className="h-4 w-4 text-blue-600 animate-spin" />
                </div>
                <div className="bg-blue-50 px-4 py-3 rounded-xl border border-blue-200 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your farming question..."
                disabled={isLoading}
                className="flex-1 bg-white text-gray-900 border border-gray-300 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-3 transition-transform active:scale-95"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Container>
  </div>
);


}
