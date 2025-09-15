import * as React from "react"
import { cn } from "@/lib/utils"

// Standardized responsive container with consistent horizontal padding and max-width
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", // spacing scale
                className,
            )}
            {...props}
        />
    )
}
