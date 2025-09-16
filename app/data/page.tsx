"use client"
import { useEffect, useState } from 'react'
import { Container } from '@/components/container'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface EntryMeta { key: string; bytes: number; purpose: string; sample?: string }

const PURPOSES: Record<string, string> = {
    quizScore: 'User quiz cumulative score',
    quizLevel: 'Current adaptive quiz level',
    quizBadges: 'Unlocked quiz badges',
    quizCurrent: 'Current question index',
    quizSelected: 'Selected answer(s) for current question',
    quizScores: 'Leaderboard entries (name, points, level)',
    missionsState: 'Persisted mission progress/status',
    missionPoints: 'Total points earned from missions',
    feedbackItems: 'Locally stored feedback submissions',
    activityLog: 'Local diagnostic/activity events',
    dailyChallenge: 'Today\'s generated daily challenge',
}

function estimateBytes(str: string) { return new Blob([str]).size }

export default function DataTransparencyPage() {
    const [entries, setEntries] = useState<EntryMeta[]>([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const list: EntryMeta[] = []
        let totalBytes = 0
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i) as string
            if (!key) continue
            const value = localStorage.getItem(key) || ''
            const bytes = estimateBytes(value)
            totalBytes += bytes
            list.push({ key, bytes, purpose: PURPOSES[key] || 'Uncatalogued key', sample: value.slice(0, 120) })
        }
        list.sort((a, b) => b.bytes - a.bytes)
        setEntries(list)
        setTotal(totalBytes)
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Container className="py-4 flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">Data Transparency</h1>
                </Container>
            </header>
            <Container className="py-8 max-w-5xl">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Local Storage Overview</CardTitle>
                        <CardDescription>Your data is stored locally only. Nothing is sent to a server.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm mb-4">Total Estimated Usage: <span className="font-semibold">{(total / 1024).toFixed(2)} KB</span></div>
                        <div className="overflow-x-auto border rounded-md">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="text-left p-2 w-56">Key</th>
                                        <th className="text-left p-2 w-28">Size (bytes)</th>
                                        <th className="text-left p-2">Purpose</th>
                                        <th className="text-left p-2">Sample / Preview</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.length === 0 && (
                                        <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">No local storage entries found.</td></tr>
                                    )}
                                    {entries.map(e => (
                                        <tr key={e.key} className="border-t hover:bg-muted/30 align-top">
                                            <td className="p-2 font-mono text-xs">{e.key}</td>
                                            <td className="p-2 text-xs">{e.bytes}</td>
                                            <td className="p-2 text-xs">{e.purpose}</td>
                                            <td className="p-2 text-[10px] max-w-xs break-all whitespace-pre-wrap">{e.sample}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 text-xs text-muted-foreground space-y-2">
                            <p>This page helps you understand what is stored in your browser for transparency.</p>
                            <p>Clearing browser data or using a different device/browser will reset this data.</p>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}
