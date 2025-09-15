"use client"
import { useEffect, useState } from "react"
import { Container } from "@/components/container"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Load quiz data
async function fetchQuizData() {
    const res = await fetch("/quiz-data.json")
    return res.json()
}

export default function QuizPage() {
    const [allQuestions, setAllQuestions] = useState<any[]>([])
    const [questions, setQuestions] = useState<any[]>([])
    const [current, setCurrent] = useState(0)
    const [selected, setSelected] = useState<any>(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [score, setScore] = useState(() => Number(localStorage.getItem("quizScore") || 0))
    const [level, setLevel] = useState(localStorage.getItem("quizLevel") || "Beginner")
    const [badges, setBadges] = useState<string[]>(() => JSON.parse(localStorage.getItem("quizBadges") || "[]"))
    const [timer, setTimer] = useState(30)
    const [language, setLanguage] = useState("en")
    const [showExplanation, setShowExplanation] = useState(false)
    const [showNamePrompt, setShowNamePrompt] = useState(false)
    const [userName, setUserName] = useState("")
    const [showLanding, setShowLanding] = useState(true)
    const [selectedLevel, setSelectedLevel] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        fetchQuizData().then(data => {
            setAllQuestions(data)
            // Extract unique categories from tags
            const cats = Array.from(new Set(data.flatMap((q: any) => q.tags).filter((tag: any) => typeof tag === "string")));
            setCategories(cats)
        })
    }, [])

    useEffect(() => {
        if (timer > 0 && !showFeedback && !showLanding) {
            const t = setTimeout(() => setTimer(timer - 1), 1000)
            return () => clearTimeout(t)
        }
    }, [timer, showFeedback, showLanding])

    // Persist progress
    useEffect(() => {
        localStorage.setItem("quizScore", String(score))
        localStorage.setItem("quizLevel", level)
        localStorage.setItem("quizBadges", JSON.stringify(badges))
    }, [score, level, badges])

    if (showLanding) {
        return (
            <Container className="py-20 max-w-xl text-center">
                <h1 className="text-3xl font-bold mb-6">Welcome to Eco Champs Quiz!</h1>
                <p className="mb-6 text-muted-foreground">Test your farming knowledge and earn badges. Select your preferences below to begin.</p>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Select Level:</label>
                    <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)} className="border rounded px-3 py-2 w-48">
                        <option value="">-- Choose Level --</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Skilled">Skilled</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Select Category:</label>
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="border rounded px-3 py-2 w-48">
                        <option value="">-- Choose Category --</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <Button
                    className="mt-6"
                    disabled={!selectedLevel || !selectedCategory}
                    onClick={() => {
                        // Filter questions by level and category
                        const filtered = allQuestions.filter(q => q.level === selectedLevel && q.tags.includes(selectedCategory));
                        setQuestions(filtered.length ? filtered : allQuestions.filter(q => q.level === selectedLevel));
                        setLevel(selectedLevel);
                        setCurrent(0);
                        setScore(0);
                        setBadges([]);
                        setShowLanding(false);
                    }}
                >
                    Start Quiz
                </Button>
            </Container>
        )
    }

    if (questions.length === 0) {
        return <Container className="py-20 text-center">No quiz questions found for your selection.</Container>;
    }

    const q = questions[current]

    function handleAnswer(idx: any) {
        setSelected(idx)
        setShowFeedback(true)
        setShowExplanation(true)
        let newScore = score
        let newBadges = badges
        if (Array.isArray(q.answer)) {
            if (JSON.stringify(idx) === JSON.stringify(q.answer)) {
                newScore += 10
            }
        } else if (idx === q.answer) {
            newScore += 10
            if (q.tags.includes("water") && !badges.includes("Water Guardian 💧")) newBadges = [...badges, "Water Guardian 💧"]
            if (q.tags.includes("soil") && !badges.includes("Soil Saver 🌍")) newBadges = [...badges, "Soil Saver 🌍"]
        }
        setScore(newScore)
        setBadges(newBadges)
        // Level progression
        if (newScore >= 30) setLevel("Skilled")
        if (newScore >= 60) setLevel("Expert")
        if (newScore >= 100) setLevel("Champion Farmer")
    }

    function nextQuestion() {
        if (current === questions.length - 1) {
            setShowNamePrompt(true)
            return
        }
        setCurrent(current + 1)
        setSelected(null)
        setShowFeedback(false)
        setShowExplanation(false)
        setTimer(30)
    }

    // Drag-drop mini-game (simple version)
    function handleDragDrop(toolIdx: number, useIdx: number) {
        const answerArr = questions[current].answer
        const correct = answerArr[toolIdx] === q.options[useIdx].use
        if (correct) {
            setScore(score + 10)
            if (score + 10 >= 30) setLevel("Skilled")
            if (score + 10 >= 60) setLevel("Expert")
            if (score + 10 >= 100) setLevel("Champion Farmer")
        }
        setShowFeedback(true)
        setShowExplanation(true)
    }

    return (
        <Container className="py-10 max-w-2xl">
            <div className="mb-6 flex justify-between items-center">
                <div className="font-bold text-lg">Level: {level}</div>
                <div className="font-bold text-lg">Score: {score}</div>
                <div className="font-bold text-lg">Time: {timer}s</div>
            </div>
            <div className="mb-4">
                {badges.map(b => (
                    <span key={b} className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full mr-2">{b}</span>
                ))}
            </div>
            <div className="mb-8">
                <div className="font-semibold text-xl mb-2">{q.question}</div>
                {q.image && <Image src={q.image} alt="question" width={120} height={80} className="mb-2" />}
                {q.audio && <audio src={q.audio} controls className="mb-2" />}
                {/* MCQ, True/False, Scenario */}
                {(q.type === "mcq" || q.type === "truefalse" || q.type === "scenario") && (
                    <div className="grid gap-3">
                        {q.options.map((opt: any, idx: number) => (
                            <Button key={idx} variant={selected === idx ? "secondary" : "outline"} onClick={() => handleAnswer(idx)} disabled={showFeedback}>
                                {opt}
                            </Button>
                        ))}
                    </div>
                )}
                {/* Drag-drop mini-game (simple) */}
                {q.type === "dragdrop" && (
                    <div className="grid gap-3">
                        {q.options.map((opt: any, idx: number) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <span className="font-bold">{opt.tool}</span>
                                <Button variant="outline" onClick={() => handleDragDrop(idx, idx)} disabled={showFeedback}>{opt.use}</Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showFeedback && (
                <div className="mb-6">
                    {selected === q.answer || (Array.isArray(q.answer) && JSON.stringify(selected) === JSON.stringify(q.answer)) ? (
                        <div className="text-green-700 font-bold">Correct!</div>
                    ) : (
                        <div className="text-red-700 font-bold">Incorrect!</div>
                    )}
                    {showExplanation && (
                        <div className="mt-2 text-sm text-muted-foreground">{q.explanation}</div>
                    )}
                    <Button className="mt-4" onClick={nextQuestion}>
                        {current === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                    </Button>
                </div>
            )}
            <div className="mt-8 flex justify-between">
                <div>Progress: {current + 1} / {questions.length}</div>
                {current === questions.length - 1 && (
                    <div className="font-bold text-lg text-primary">Quiz Complete! Final Score: {score}</div>
                )}
            </div>
            {/* Name prompt for leaderboard */}
            {showNamePrompt && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4">Enter your name for the leaderboard</h2>
                        <input
                            type="text"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full border rounded px-3 py-2 mb-4"
                        />
                        <Button
                            variant="secondary"
                            onClick={() => {
                                if (userName.trim()) {
                                    // Save score to leaderboard
                                    const scores = JSON.parse(localStorage.getItem("quizScores") || "[]")
                                    const updated = [...scores.filter((s: any) => s.name !== userName.trim()), { name: userName.trim(), points: score, level, badges }]
                                    localStorage.setItem("quizScores", JSON.stringify(updated))
                                    setShowNamePrompt(false)
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    )
}
