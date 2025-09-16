export interface DailyChallenge {
    id: string
    date: string // YYYY-MM-DD
    title: string
    description: string
    rewardPoints: number
    rewardXP: number
    status: 'new' | 'accepted' | 'completed'
    progress?: number
}

const KEY = 'dailyChallenge'

const POOL: Array<Omit<DailyChallenge, 'id' | 'date' | 'status'>> = [
    { title: 'Water Audit', description: 'Measure water usage on one field today and note potential savings.', rewardPoints: 60, rewardXP: 120 },
    { title: 'Soil Health Check', description: 'Collect a small soil sample and record moisture and texture.', rewardPoints: 50, rewardXP: 100 },
    { title: 'Organic Input Plan', description: 'List 2 chemical inputs you can replace with organic options.', rewardPoints: 55, rewardXP: 110 },
    { title: 'Mulch Application', description: 'Apply mulch to at least 10% of an active plot.', rewardPoints: 70, rewardXP: 140 },
    { title: 'Biodiversity Boost', description: 'Identify and record 3 beneficial insects on your farm.', rewardPoints: 65, rewardXP: 130 },
]

export function getTodayChallenge(): DailyChallenge {
    if (typeof window === 'undefined') {
        return {
            id: 'placeholder', date: new Date().toISOString().slice(0, 10), title: 'Loading...', description: '...', rewardPoints: 0, rewardXP: 0, status: 'new'
        }
    }
    const today = new Date().toISOString().slice(0, 10)
    try {
        const raw = localStorage.getItem(KEY)
        if (raw) {
            const parsed: DailyChallenge = JSON.parse(raw)
            if (parsed.date === today) return parsed
        }
    } catch { /* ignore */ }
    // generate new
    const base = POOL[Math.floor(Math.random() * POOL.length)]
    const challenge: DailyChallenge = { id: crypto.randomUUID(), date: today, status: 'new', ...base }
    localStorage.setItem(KEY, JSON.stringify(challenge))
    return challenge
}

export function saveChallenge(ch: DailyChallenge) {
    if (typeof window === 'undefined') return
    localStorage.setItem(KEY, JSON.stringify(ch))
}
