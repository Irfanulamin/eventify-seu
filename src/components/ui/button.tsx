import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-white/90 transition-all duration-300 p-8 rounded-full font-normal text-lg",

        primary:
          "border-2 border-primary text-primary bg-gray-200 hover:bg-primary/10 hover:border-primary hover:text-primary hover:shadow-[0_0_40px_theme(colors.primary/50)] active:shadow-[0_0_60px_theme(colors.primary/70)] transition-all duration-300 p-6 rounded-full font-medium",

        glow: "p-8 rounded-full font-normal text-lg bg-white text-black border border-white/50 hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] active:shadow-[0_0_60px_rgba(255,255,255,0.8)] transition-all duration-300 p-6 rounded-full",

        outline:
          "bg-transparent text-gray-300 border border-gray-500/30 hover:bg-gray-700/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:shadow-[0_0_40px_rgba(255,255,255,0.3)] p-6 rounded-full transition-all duration-300",
        outline_glow:
          "p-8 font-normal text-lg bg-transparent text-gray-300 border border-white hover:bg-gray-700/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:shadow-[0_0_40px_rgba(255,255,255,0.3)] p-6 rounded-full transition-all duration-300",

        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",

        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",

        link: "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
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
