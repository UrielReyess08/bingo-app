import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-xl bg-card text-card-foreground shadow border border-border",
        className
      )}
      {...props}
    />
  );
}