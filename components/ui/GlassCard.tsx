"use client";

import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";

interface GlassCardProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  variant = "dark",
  className = "",
  hover = true,
}: GlassCardProps) {
  const base =
    variant === "dark"
      ? "glass-dark rounded-2xl p-6"
      : "glass-light rounded-2xl p-6";

  return (
    <motion.div
      variants={scaleIn}
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow:
                "0 20px 60px rgba(247, 37, 133, 0.2), 0 0 0 1px rgba(247, 37, 133, 0.15)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${base} ${className}`}
    >
      {children}
    </motion.div>
  );
}
