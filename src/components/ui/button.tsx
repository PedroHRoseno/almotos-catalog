import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "whatsapp";
  size?: "default" | "sm" | "lg";
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:focus-visible:ring-zinc-50/20 disabled:pointer-events-none disabled:opacity-50",
        size === "sm" && "h-9 px-3",
        size === "default" && "h-10 px-4 py-2",
        size === "lg" && "h-11 px-6",
        variant === "default" &&
          "bg-zinc-900 text-white hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
        variant === "outline" &&
          "border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
        variant === "ghost" && "hover:bg-zinc-100 dark:hover:bg-zinc-900",
        variant === "whatsapp" &&
          "bg-[#25D366] text-black hover:bg-[#1fb85a] font-semibold",
        className
      )}
      {...props}
    />
  );
}

