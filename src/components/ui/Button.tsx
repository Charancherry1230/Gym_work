"use client";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-2xl text-sm font-black transition-all disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider outline-none",
    {
        variants: {
            variant: {
                primary: "bg-lime-400 text-black hover:bg-lime-300 btn-glow border border-lime-400",
                secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
                outline: "bg-transparent border-2 border-lime-400/30 text-lime-400 hover:bg-lime-400/5 hover:border-lime-400",
                ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
                danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white",
            },
            size: {
                default: "h-12 px-6",
                sm: "h-9 px-4 text-xs",
                lg: "h-14 px-10 text-lg",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <motion.button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
