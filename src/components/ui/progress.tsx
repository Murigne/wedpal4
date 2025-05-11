
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  indicatorColor?: string;
  indicatorClassName?: string;
  showValueOnBar?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorColor, indicatorClassName, showValueOnBar = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full flex items-center justify-end pr-2 transition-all", indicatorClassName)}
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`, 
        backgroundColor: indicatorColor || "#00b3a7",
        width: "100%"
      }}
    >
      {showValueOnBar && value !== undefined && value > 10 && (
        <span className="text-xs font-medium text-white">
          {Math.round(value)}%
        </span>
      )}
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
