import * as React from "react";
import { cn } from "@/lib/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const ButtonInfo = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(className, "border-2 border-foreground rounded-full aspect-square w-6 text-center text-sm font-medium text-foreground")}
        ref={ref}
        {...props}
      >
        i
      </button>
    )
  }
)
ButtonInfo.displayName = "ButtonInfo"

export { ButtonInfo }