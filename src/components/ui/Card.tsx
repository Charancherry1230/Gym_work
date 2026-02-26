"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export const Card = ({ children, className, animate = true, ...props }: CardProps) => {
    const content = (
        <div className={cn("glass-card p-6 h-full", className)}>
            {children}
        </div>
    );

    if (!animate) return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{content}</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: "rgba(190, 242, 100, 0.2)" }}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {content}
        </motion.div>
    );
};
