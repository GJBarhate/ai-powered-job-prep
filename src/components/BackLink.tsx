import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

export function BackLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn("-ml-3", className)}
    >
      <Link
        href={href}
        className="flex gap-2 items-center text-sm text-muted-foreground"
      >
        <ArrowLeftIcon />
        {children}
      </Link>
    </Button>
  )
}
