"use client"
import { Container } from "@/components/container"

const badges = [
    { name: "Soil Saver 🌍", description: "Awarded for soil conservation mastery." },
    { name: "Water Guardian 💧", description: "Awarded for water management excellence." },
    { name: "Champion Farmer 🏆", description: "Top scorer in weekly quiz battles." },
]

export default function BadgesPage() {
    return (
        <Container className="py-10 max-w-xl">
            <h1 className="text-2xl font-bold mb-6">Your Badges</h1>
            <ul className="space-y-4">
                {badges.map(badge => (
                    <li key={badge.name} className="bg-yellow-50 px-4 py-3 rounded flex flex-col">
                        <span className="font-bold text-lg">{badge.name}</span>
                        <span className="text-muted-foreground text-sm">{badge.description}</span>
                    </li>
                ))}
            </ul>
        </Container>
    )
}
