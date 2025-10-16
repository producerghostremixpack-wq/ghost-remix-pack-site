import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-neon-violet to-neon-cyan text-white rounded-full glow-violet hover:scale-105 hover:brightness-125 font-semibold",
        neon: "bg-gradient-to-r from-neon-violet to-neon-cyan text-white rounded-full glow-violet hover:scale-105 hover:brightness-125 font-semibold",
        neonReverse: "bg-gradient-to-r from-neon-cyan to-neon-violet text-white rounded-full glow-cyan hover:scale-105 hover:brightness-125 font-semibold",
        outline:
          "border-2 border-neon-violet bg-transparent text-neon-violet hover:bg-neon-violet/10 hover:glow-violet rounded-full",
        ghost: "text-text-secondary hover:text-neon-violet hover:bg-bg-card transition-colors",
        link: "text-neon-violet underline-offset-4 hover:underline hover:text-neon-cyan",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-lg",
        xl: "h-14 px-10 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

