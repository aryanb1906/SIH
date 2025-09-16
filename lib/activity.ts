export interface ActivityEntry {
    id: string
    type: string
    message: string
    payload?: any
    ts: number
}

const KEY = 'activityLog'
const MAX = 300

export function recordActivity(entry: Omit<ActivityEntry, 'id' | 'ts'>) {
    if (typeof window === 'undefined') return
    try {
        const raw = localStorage.getItem(KEY)
        const list: ActivityEntry[] = raw ? JSON.parse(raw) : []
        const newEntry: ActivityEntry = { id: crypto.randomUUID(), ts: Date.now(), ...entry }
        list.unshift(newEntry)
        if (list.length > MAX) list.length = MAX
        localStorage.setItem(KEY, JSON.stringify(list))
    } catch { /* ignore */ }
}

export function getActivityLog(): ActivityEntry[] {
    if (typeof window === 'undefined') return []
    try {
        const raw = localStorage.getItem(KEY)
        return raw ? JSON.parse(raw) : []
    } catch { return [] }
}
