"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { stagger, fadeUp } from "@/lib/animations";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-pink-miami">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Realismo de Élite",
    desc: "Técnicas avanzadas de hiperrealismo que transforman tu piel en un lienzo de museo.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-pink-miami">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Piezas Grandes",
    desc: "Especialistas en trabajos de gran formato que cuentan historias completas en tu cuerpo.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-pink-miami">
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Diseño Exclusivo",
    desc: "Cada pieza es única e irrepetible. No hacemos diseños genéricos ni copiamos referencias.",
  },
];

export function Promise() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="promise"
      className="relative bg-white py-24 md:py-36 overflow-hidden"
    >
      {/* Pink accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-miami to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Headline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-pink-miami text-xs tracking-[0.25em] uppercase font-medium mb-4"
          >
            Por qué elegirnos
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-black-deep tracking-wide leading-none"
          >
            LO QUE NOS
            <br />
            <span className="text-gradient-pink">HACE ÚNICOS</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl mx-auto text-black-deep/60 text-lg leading-relaxed"
          >
            Para quienes buscan un tatuaje que hable de ellos, a otro nivel.
            Diseño personalizado que fusiona arte, ideas y tecnología para
            resultados extraordinarios.
          </motion.p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <GlassCard key={f.title} variant="light" className="text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 rounded-xl bg-pink-miami/10">{f.icon}</div>
                <h3 className="font-display text-2xl text-black-deep tracking-wide">
                  {f.title}
                </h3>
                <p className="text-black-deep/60 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>

      {/* Pink accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-miami to-transparent" />
    </section>
  );
}
