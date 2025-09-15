"use client"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"

export default function QuizSharePage() {
    function handleShare() {
        const score = localStorage.getItem("lastQuizScore") || "0"
        const text = `I scored ${score} points in FarmGrow Quiz! 🌱 Join me: https://farmgrow.com/quiz`
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
    }

    return (
        <Container className="py-10 max-w-xl text-center">
            <h1 className="text-2xl font-bold mb-6">Share Your Quiz Score</h1>
            <Button onClick={handleShare} variant="secondary">Share on WhatsApp</Button>
        </Container>
    )
}
