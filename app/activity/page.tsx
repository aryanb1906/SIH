"use client"
import { useEffect, useMemo, useState } from 'react'
import { getActivityLog } from '@/lib/activity'
import { Container } from '@/components/container'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { ArrowLeft, Filter, RefreshCcw } from 'lucide-react'

interface UIEntry {
  id: string
  type: string
  message: string
  ts: number
  payload?: any
}

export default function ActivityLogPage() {
  const [raw, setRaw] = useState<UIEntry[]>([])
  const [typeFilter, setTypeFilter] = useState('')
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('') // yyyy-mm-dd
  const [showPayload, setShowPayload] = useState<string | null>(null)

  function load() {
    const list = getActivityLog()
    setRaw(list)
  }

  useEffect(() => { load() }, [])

  const types = useMemo(() => Array.from(new Set(raw.map(e => e.type))).sort(), [raw])

  const filtered = useMemo(() => {
    return raw.filter(e => {
      if (typeFilter && e.type !== typeFilter) return false
      if (search && !e.message.toLowerCase().includes(search.toLowerCase())) return false
      if (dateFilter) {
        const dateStr = new Date(e.ts).toISOString().slice(0,10)
        if (dateStr !== dateFilter) return false
      }
      return true
    })
  }, [raw, typeFilter, search, dateFilter])

  function formatTime(ts: number) {
    const d = new Date(ts)
    return d.toLocaleString()
  }

  function clearLog() {
    if (typeof window === 'undefined') return
    localStorage.removeItem('activityLog')
    load()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Activity Log</h1>
        </Container>
      </header>
      <Container className="py-8 max-w-5xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Diagnostic events captured locally (max 300). Not sent to server.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 flex gap-2">
                <Input placeholder="Search message" value={search} onChange={e => setSearch(e.target.value)} />
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded px-2 py-2 bg-background">
                  <option value="">All Types</option>
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex gap-2 items-center">
                <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border rounded px-2 py-2 bg-background" />
                <Button variant="outline" size="icon" onClick={() => { setDateFilter(''); setTypeFilter(''); setSearch(''); load(); }}><RefreshCcw className="h-4 w-4" /></Button>
                <Button variant="destructive" onClick={clearLog}>Clear</Button>
              </div>
            </div>
            <div className="overflow-x-auto border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-2 w-40">Time</th>
                    <th className="text-left p-2 w-48">Type</th>
                    <th className="text-left p-2">Message</th>
                    <th className="text-left p-2 w-16">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">No activity entries match filters.</td></tr>
                  )}
                  {filtered.map(e => {
                    const hasPayload = e.payload && Object.keys(e.payload).length > 0
                    const open = showPayload === e.id
                    return (
                      <tr key={e.id} className="border-t hover:bg-muted/30">
                        <td className="p-2 align-top text-xs whitespace-nowrap">{formatTime(e.ts)}</td>
                        <td className="p-2 align-top"><Badge variant="outline" className="font-mono text-[11px]">{e.type}</Badge></td>
                        <td className="p-2 align-top">{e.message}</td>
                        <td className="p-2 align-top">
                          {hasPayload && (
                            <Button size="sm" variant="outline" onClick={() => setShowPayload(open ? null : e.id)}>
                              {open ? 'Hide' : 'View'}
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {filtered.map(e => {
              const open = showPayload === e.id
              if (!open || !e.payload) return null
              return (
                <div key={e.id} className="mt-4 p-4 text-xs rounded-md bg-muted font-mono overflow-x-auto">
                  <div className="mb-1 font-semibold">Payload</div>
                  <pre className="whitespace-pre-wrap break-all">{JSON.stringify(e.payload, null, 2)}</pre>
                </div>
              )
            })}
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground">This log is stored locally in your browser only. Clearing site data will remove it.</p>
      </Container>
    </div>
  )
}
