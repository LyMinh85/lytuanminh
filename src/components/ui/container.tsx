import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva(
  "w-full mx-auto px-4 md:px-6",
  {
    variants: {
      size: {
        default: "max-w-7xl",
        sm: "max-w-3xl",
        md: "max-w-5xl",
        lg: "max-w-7xl",
        xl: "max-w-[90rem]",
        full: "max-w-full",
      },
      padding: {
        default: "py-8 md:py-12",
        sm: "py-4 md:py-6",
        md: "py-8 md:py-12",
        lg: "py-12 md:py-16",
        xl: "py-16 md:py-24",
        none: "py-0",
      },
    },
    defaultVariants: {
      size: "default",
      padding: "default",
    },
  }
)

interface ContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

function Container({
  className,
  size,
  padding,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ size, padding, className }))}
      {...props}
    />
  )
}

export { Container, containerVariants, type ContainerProps }