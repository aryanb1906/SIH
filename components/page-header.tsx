import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  backHref?: string
  backLabel?: string
  actions?: ReactNode
}

export default function PageHeader({
  title,
  description,
  icon,
  backHref,
  backLabel = "Back",
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {backHref && (
        <div className="mb-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="p-2 rounded-full bg-card border border-border shadow-sm group-hover:shadow-md transition-shadow">
              <ArrowLeft className="h-4 w-4" />
            </span>
            {backLabel}
          </Link>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            {icon && <div className="p-4 bg-primary/10 rounded-full border border-primary/20 shadow-lg">{icon}</div>}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          </div>
          {description && (
            <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}
