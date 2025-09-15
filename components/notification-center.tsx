"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppStore } from "@/lib/store"
import { Bell, Check, X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-600" />
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    default:
      return <Info className="h-4 w-4 text-blue-600" />
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'border-l-green-500 bg-green-50'
    case 'error':
      return 'border-l-red-500 bg-red-50'
    case 'warning':
      return 'border-l-yellow-500 bg-yellow-50'
    default:
      return 'border-l-blue-500 bg-blue-50'
  }
}

export default function NotificationCenter() {
  const { 
    notifications, 
    unreadCount, 
    markNotificationAsRead, 
    clearAllNotifications 
  } = useAppStore()

  const unreadNotifications = notifications.filter(n => !n.isRead)
  const readNotifications = notifications.filter(n => n.isRead)

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId)
  }

  const handleClearAll = () => {
    clearAllNotifications()
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="p-4 space-y-3">
              {/* Unread Notifications */}
              {unreadNotifications.length > 0 && (
                <>
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Unread ({unreadNotifications.length})
                  </div>
                  {unreadNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)} hover:shadow-sm transition-shadow`}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="h-6 px-2 text-xs"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark as read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Read Notifications */}
              {readNotifications.length > 0 && (
                <>
                  {unreadNotifications.length > 0 && (
                    <div className="border-t pt-3 mt-3">
                      <div className="text-sm font-medium text-muted-foreground mb-2">
                        Read ({readNotifications.length})
                      </div>
                    </div>
                  )}
                  {readNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-700">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </span>
                            <span className="text-xs text-gray-400">Read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

