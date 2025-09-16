"use client"
import { Container } from '@/components/container'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Bell, ArrowLeft } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useAppStore()
  const has = notifications.length > 0
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Container className="py-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Bell className="h-6 w-6 text-primary" /> Notifications</h1>
          <div />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Platform updates, mission progress, and reminders.</CardDescription>
          </CardHeader>
          <CardContent>
            {!has && <div className="text-sm text-muted-foreground">No notifications yet.</div>}
            {has && (
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n.id} className={`p-3 rounded border ${n.isRead ? 'bg-background' : 'bg-primary/5 border-primary/20'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium text-sm">{n.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{n.message}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                      </div>
                      {!n.isRead && (
                        <Button size="xs" variant="outline" onClick={() => markNotificationAsRead(n.id)}>Mark read</Button>
                      )}
                    </div>
                    {n.actionUrl && (
                      <Link href={n.actionUrl} className="text-xs text-primary underline mt-1 inline-block">Go to related</Link>
                    )}
                  </div>
                ))}
                <div className="pt-2 flex justify-end">
                  <Button size="sm" variant="destructive" onClick={clearAllNotifications}>Clear All</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
