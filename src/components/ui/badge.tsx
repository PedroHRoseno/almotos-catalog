import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-transparent bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50",
        className
      )}
      {...props}
    />
  );
}

