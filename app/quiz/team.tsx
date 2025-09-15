"use client"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function TeamQuizPage() {
    const [teamName, setTeamName] = useState("")
    const [joined, setJoined] = useState(false)

    function handleJoin() {
        if (teamName.trim()) {
            setJoined(true)
        }
    }

    return (
        <Container className="py-10 max-w-xl text-center">
            <h1 className="text-2xl font-bold mb-6">Team Quiz Challenge</h1>
            {!joined ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        placeholder="Enter your team name"
                        className="border rounded px-3 py-2 w-full mb-2"
                    />
                    <Button onClick={handleJoin} variant="secondary">Join Team</Button>
                </div>
            ) : (
                <div className="text-green-700 font-bold">Joined team: {teamName}</div>
            )}
        </Container>
    )
}
