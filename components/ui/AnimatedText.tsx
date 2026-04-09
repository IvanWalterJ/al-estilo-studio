"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "char";
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  splitBy = "word",
}: AnimatedTextProps) {
  const items = splitBy === "word" ? text.split(" ") : text.split("");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {items.map((piece, i) => (
        <motion.span key={i} variants={item} className="inline-block">
          {piece}
        </motion.span>
      ))}
    </motion.span>
  );
}
