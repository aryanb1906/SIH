"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FeedbackItem {
  id: string
  type: "feature" | "bug"
  message: string
  createdAt: string
}

export function FeedbackForm() {
  const [type, setType] = useState<"feature" | "bug">("feature")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [items, setItems] = useState<FeedbackItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem("feedbackItems")
      if (stored) setItems(JSON.parse(stored))
    } catch { }
  }, [])

  useEffect(() => {
    localStorage.setItem("feedbackItems", JSON.stringify(items))
  }, [items])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    const entry: FeedbackItem = {
      id: crypto.randomUUID(),
      type,
      message: message.trim(),
      createdAt: new Date().toISOString()
    }
    setItems(prev => [entry, ...prev])
    setMessage("")
    setType("feature")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
  }

  return (
    <Card className="max-w-xl w-full">
      <CardHeader>
        <CardTitle>Feedback & Bug Reporting</CardTitle>
        <CardDescription>Suggest a feature or report an issue. Stored locally for now.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Type</label>
            <select value={type} onChange={e => setType(e.target.value as any)} className="border rounded px-3 py-2 w-full">
              <option value="feature">Feature Suggestion</option>
              <option value="bug">Bug Report</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Your Feedback</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="border rounded px-3 py-2 w-full min-h-[90px] resize-vertical"
              placeholder="Describe your suggestion or the bug you found..."
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitted}>{submitted ? "Submitted" : "Submit"}</Button>
        </form>
        {items.length > 0 && (
          <div className="mt-6 space-y-3 max-h-64 overflow-auto pr-1">
            {items.map(i => (
              <div key={i.id} className="rounded border p-3 text-sm bg-muted/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium capitalize">{i.type}</span>
                  <time className="text-xs text-muted-foreground">{new Date(i.createdAt).toLocaleString()}</time>
                </div>
                <div className="whitespace-pre-wrap leading-snug">{i.message}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default FeedbackForm
