import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Badge({ className, variant = "default", ...props }: HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" }) {
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold transition-colors",
        {
          "bg-accent text-accent-foreground": variant === "default",
          "border border-border bg-transparent text-foreground": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}