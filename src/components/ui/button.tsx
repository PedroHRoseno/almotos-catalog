import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium",
    "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out-expo",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:shrink-0 [&_svg]:size-4"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-ink text-canvas hover:opacity-90 shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset]",
        accent:
          "bg-accent text-accent-ink hover:bg-accent-hover shadow-[0_8px_24px_-12px_var(--color-accent)]",
        outline:
          "border border-line bg-transparent text-ink hover:border-ink-subtle hover:bg-surface-hover",
        ghost: "bg-transparent text-ink-muted hover:bg-surface-hover hover:text-ink",
        whatsapp:
          "bg-whatsapp text-[#04180c] font-semibold hover:bg-whatsapp-hover shadow-[0_10px_30px_-16px_var(--color-whatsapp)]",
        glass:
          "border border-white/15 bg-black/40 text-white backdrop-blur-md hover:bg-black/60",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
