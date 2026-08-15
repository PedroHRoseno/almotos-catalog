import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium leading-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-line bg-surface px-3 py-1.5 text-xs text-ink-muted",
        accent:
          "border border-accent/30 bg-accent/12 px-3 py-1.5 text-xs text-accent",
        glass:
          "border border-white/15 bg-black/45 px-3 py-1.5 text-xs text-white backdrop-blur-md",
        dot: "gap-2 px-0 py-0 text-xs text-ink-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
