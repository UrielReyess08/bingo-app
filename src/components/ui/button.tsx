import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "outline" | "default", size?: "lg" | "md" | "sm" }>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "bg-transparent border border-border text-foreground hover:bg-muted": variant === "outline",
          "px-8 py-4 text-lg": size === "lg",
          "px-4 py-2 text-base": size === "md",
          "px-2 py-1 text-sm": size === "sm",
        },
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";