import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MessageCardTopBarProps {
  children: ReactNode
  className?: string
  circleClassName?: string
}

export default function MessageCardTopBar({
  children,
  className,
  circleClassName,
}: MessageCardTopBarProps) {
  return (
    <div className={cn(
      "border-b-[3px] grid grid-cols-2 w-full py-1",
      "border-black bg-neutral-300",
      className
    )}>
      <div className="flex items-center absolute top-2 left-2 md:px-2 px-1 gap-1">
        <div className={cn(
          "circle h-4 w-4 rounded-full",
          "bg-white border-[3px] border-black",
          circleClassName
        )}></div>
        <div className={cn(
          "circle h-4 w-4 rounded-full",
          "bg-white border-[3px] border-black",
          circleClassName
        )}></div>
      </div>
      <div className="font-semibold px-2">{children}</div>
    </div>
  )
}

