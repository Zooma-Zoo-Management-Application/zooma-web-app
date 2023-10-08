"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "../../../components/ui/separator"
import { LogOut } from "lucide-react"

interface SidebarProfileProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    icon: React.ReactNode
    href: string
    title: string
  }[]
}

export function SidebarProfile({ className, items, ...props }: SidebarProfileProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 relative",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.icon} {item.title}
        </Link>
      ))}
    </nav>
  )
}