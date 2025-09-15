"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

const pathLabels: Record<string, string> = {
  "": "Home",
  missions: "Missions",
  quiz: "Quiz",
  community: "Community",
  rewards: "Rewards",
  support: "AI Support",
  faq: "FAQ",
  dashboard: "Dashboard",
}

export default function BreadcrumbNav() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  if (pathSegments.length === 0) {
    return null // Don't show breadcrumbs on home page
  }

  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

  let currentPath = ""
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1

    breadcrumbs.push({
      label: pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: currentPath,
      current: isLast,
    })
  })

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {item.current ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-foreground transition-colors flex items-center gap-1">
              {index === 0 && <Home className="h-3 w-3" />}
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
