"use client"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"

export default function QuizDownloadPage() {
    function handleDownload() {
        const data = localStorage.getItem("quizScores") || "[]"
        const blob = new Blob([data], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "quiz-results.json"
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <Container className="py-10 max-w-xl text-center">
            <h1 className="text-2xl font-bold mb-6">Download Your Quiz Results</h1>
            <Button onClick={handleDownload} variant="outline">Download Results</Button>
        </Container>
    )
}
