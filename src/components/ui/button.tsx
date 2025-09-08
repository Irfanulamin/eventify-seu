import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap rounded-full font-medium outline-none " +
    "transition-all duration-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 " +
    "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring " +
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 " +
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-white/90 font-normal text-lg",

        primary:
          "border-2 border-primary text-primary bg-gray-200 hover:bg-primary/10 " +
          "hover:shadow-[0_0_40px_theme(colors.primary/50)] active:shadow-[0_0_60px_theme(colors.primary/70)]",

        glow:
          "bg-white text-black border border-white/50 hover:border-white " +
          "hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] active:shadow-[0_0_60px_rgba(255,255,255,0.8)]",

        outline:
          "bg-transparent text-gray-300 border border-gray-500/30 hover:bg-gray-700/30 " +
          "hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:shadow-[0_0_40px_rgba(255,255,255,0.3)]",

        outline_glow:
          "bg-transparent text-gray-300 border border-white hover:bg-gray-700/30 " +
          "hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:shadow-[0_0_40px_rgba(255,255,255,0.3)]",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-xs " +
          "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",

        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",

        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-11 px-6 text-base",
        sm: "h-9 px-4 text-sm gap-1.5",
        lg: "h-12 px-8 text-lg",
        icon: "size-11",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
