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
    // Sound assets
    const correctSound = typeof window !== 'undefined' ? new Audio('/sounds/correct.mp3') : null
    const incorrectSound = typeof window !== 'undefined' ? new Audio('/sounds/incorrect.mp3') : null
    const [answerAnim, setAnswerAnim] = useState<string>("")
    const [allQuestions, setAllQuestions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState<any[]>([])
    const [current, setCurrent] = useState(() => Number(localStorage.getItem("quizCurrent") || 0))
    const [selected, setSelected] = useState<any>(() => {
        try {
            const saved = localStorage.getItem("quizSelected")
            return saved ? JSON.parse(saved) : null
        } catch { return null }
    })
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
            const cats = Array.from(new Set(data.flatMap((q: any) => q.tags).filter((tag: any) => typeof tag === "string"))) as string[];
            setCategories(cats)
            setLoading(false)
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
        localStorage.setItem("quizCurrent", String(current))
        localStorage.setItem("quizSelected", JSON.stringify(selected))
    }, [score, level, badges, current, selected])

    if (loading) {
        return (
            <Container className="py-20 max-w-xl text-center">
                <div className="flex flex-col items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mb-4"></div>
                    <div className="text-lg text-muted-foreground">Loading quiz...</div>
                </div>
            </Container>
        )
    }
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
        let isCorrect = false
        if (Array.isArray(q.answer)) {
            if (JSON.stringify(idx) === JSON.stringify(q.answer)) {
                newScore += 10
                isCorrect = true
            }
        } else if (idx === q.answer) {
            newScore += 10
            isCorrect = true
            if (q.tags.includes("water") && !badges.includes("Water Guardian 💧")) newBadges = [...badges, "Water Guardian 💧"]
            if (q.tags.includes("soil") && !badges.includes("Soil Saver 🌍")) newBadges = [...badges, "Soil Saver 🌍"]
        }
        setScore(newScore)
        setBadges(newBadges)
        // Level progression
        if (newScore >= 30) setLevel("Skilled")
        if (newScore >= 60) setLevel("Expert")
        if (newScore >= 100) setLevel("Champion Farmer")
        // Play sound and animate
        if (isCorrect && correctSound) correctSound.play()
        if (!isCorrect && incorrectSound) incorrectSound.play()
        setAnswerAnim(isCorrect ? "animate-correct" : "animate-incorrect")
        setTimeout(() => setAnswerAnim(""), 700)
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
        if (correct && !showFeedback) {
            setScore(score + 10)
        }
        setShowFeedback(true)
        setShowExplanation(true)
    }

    const isMulti = Array.isArray(q.answer)

    function toggleMulti(idx: number) {
        if (!isMulti) return
        if (showFeedback) return
        let next: number[] = Array.isArray(selected) ? [...selected] : []
        if (next.includes(idx)) {
            next = next.filter(i => i !== idx)
        } else {
            next.push(idx)
        }
        setSelected(next)
    }

    function submitMulti() {
        if (!isMulti || showFeedback) return
        handleAnswer(selected)
    }

    return (
        <Container className={`py-10 max-w-3xl ${answerAnim}`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-semibold">Question {current + 1} / {questions.length}</h2>
                    <p className="text-sm text-muted-foreground">Level: {level} • Score: {score}</p>
                </div>
                <div className={`font-mono text-sm px-3 py-1 rounded ${timer <= 5 ? 'bg-red-100 text-red-700' : 'bg-muted'}`}>⏱ {timer}s</div>
            </div>
            <div className="mb-4 font-medium text-lg">{q.question}</div>
            {q.type !== 'dragdrop' && (
                <div className="grid gap-3 mb-6">
                    {q.options.map((opt: any, idx: number) => {
                        const isSel = isMulti ? Array.isArray(selected) && selected.includes(idx) : selected === idx
                        const correct = !isMulti && showFeedback && idx === q.answer
                        const incorrect = !isMulti && showFeedback && idx === selected && idx !== q.answer
                        return (
                            <Button
                                key={idx}
                                variant={correct ? 'default' : isSel ? 'secondary' : 'outline'}
                                className={`justify-start text-left h-auto py-3 px-4 transition-colors ${correct ? 'border-green-600 bg-green-600 text-white' : ''} ${incorrect ? 'border-red-600 bg-red-600 text-white' : ''}`}
                                disabled={showFeedback && !isMulti}
                                onClick={() => isMulti ? toggleMulti(idx) : handleAnswer(idx)}
                            >
                                <span className="mr-2 text-sm font-mono">{String.fromCharCode(65 + idx)}.</span>
                                <span>{typeof opt === 'string' ? opt : opt.label || opt.use || opt}</span>
                            </Button>
                        )
                    })}
                    {isMulti && !showFeedback && (
                        <Button onClick={submitMulti} disabled={!Array.isArray(selected) || !selected.length}>Submit Selection</Button>
                    )}
                </div>
            )}
            {q.type === 'dragdrop' && (
                <div className="grid gap-3 mb-6">
                    {q.options.map((opt: any, idx: number) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <span className="font-semibold w-32">{opt.tool}</span>
                            <Button variant="outline" onClick={() => handleDragDrop(idx, idx)} disabled={showFeedback}>{opt.use}</Button>
                        </div>
                    ))}
                </div>
            )}
            {showFeedback && (
                <div className="mb-6">
                    {(isMulti
                        ? JSON.stringify((selected || []).slice().sort()) === JSON.stringify((q.answer as any).slice().sort())
                        : selected === q.answer) ? (
                        <div className="text-green-700 font-bold transition-transform scale-110">Correct!</div>
                    ) : (
                        <div className="text-red-700 font-bold transition-transform scale-110">Incorrect!</div>
                    )}
                    {showExplanation && (
                        <div className="mt-2 text-sm text-muted-foreground">{q.explanation}</div>
                    )}
                </div>
            )}
            <div className="flex gap-4">
                <Button onClick={nextQuestion}>{current === questions.length - 1 ? 'Finish' : 'Next'}</Button>
                {!showFeedback && !isMulti && (
                    <Button variant="outline" onClick={() => { setShowFeedback(true); setShowExplanation(true); }}>Reveal</Button>
                )}
            </div>
            <div className="mt-8 flex justify-between text-sm">
                <div>Progress: {current + 1} / {questions.length}</div>
                {current === questions.length - 1 && showFeedback && (
                    <div className="font-semibold text-primary">Quiz Complete! Score: {score}</div>
                )}
            </div>
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
                                    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]')
                                    const updated = [...scores.filter((s: any) => s.name !== userName.trim()), { name: userName.trim(), points: score, level, badges }]
                                    localStorage.setItem('quizScores', JSON.stringify(updated))
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
