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
    <div className="min-h-screen bg-background">
      <Container className="py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-500 transition-colors group">
            <span className="p-2 rounded-full bg-black border border-gold-400 group-hover:bg-gold-900">
              <ArrowLeft className="h-4 w-4 text-gold-400" />
            </span>
            <span className="font-medium text-white">Back to Home</span>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-black rounded-full border border-gold-400">
                <MessageCircle className="h-8 w-8 text-gold-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">AI Doubt Support</h1>
            </div>
            <p className="text-white/80 max-w-2xl mx-auto text-base">
              Get instant answers to your farming questions from our AI assistant trained on sustainable agriculture practices.
            </p>
          </div>
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col bg-black border border-[#333] rounded-xl shadow-lg">
              <CardHeader className="border-b bg-black rounded-t-xl shadow-md">
                <CardTitle className="flex items-center gap-2 text-white text-xl font-bold">
                  <Bot className="h-5 w-5 text-gold-400 animate-bounce" />
                  AI Farming Assistant
                  <Badge variant="secondary" className="ml-auto bg-gold-400 text-black animate-pulse">Online</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-5 space-y-4 bg-black rounded-b-xl" style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "ai" && (
                      <div className="p-2 bg-green-100 rounded-full border border-green-200 shadow animate-fade-in">
                        <Bot className="h-4 w-4 text-green-700" />
                      </div>
                    )}
                    <div
                      className={`max-w-full sm:max-w-[80%] p-3 rounded-lg shadow transition-all duration-300 ${message.sender === "user" ? "bg-green-700 text-white" : "bg-beige-50 text-brown-900 border border-brown-100"}`}
                      style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                    >
                      {/* Systematic, clear answer formatting: split into paragraphs */}
                      {message.content.split(/\n+/).map((para, idx) => (
                        <p key={idx} className="text-sm mb-2 whitespace-pre-line">{para.trim()}</p>
                      ))}
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-green-100" : "text-brown-500"}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="p-2 bg-green-700 rounded-full shadow animate-fade-in">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 bg-green-100 rounded-full border border-green-200">
                      <Bot className="h-4 w-4 text-green-700 animate-spin" />
                    </div>
                    <div className="bg-beige-50 p-3 rounded-lg border border-brown-100">
                      <Loader2 className="h-4 w-4 animate-spin text-brown-600" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <div className="border-t p-4 bg-black rounded-b-xl" style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    disabled={isLoading}
                    className="flex-1 bg-[#111] text-white border border-[#333] rounded-xl px-4 py-3 placeholder:text-white/60 focus:ring-2 focus:ring-gold-400 transition-all duration-200"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()} className="bg-gold-400 hover:bg-gold-500 text-white font-bold rounded-xl px-5 py-3 transition-transform active:scale-95">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 animate-fade-in" />}
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}
