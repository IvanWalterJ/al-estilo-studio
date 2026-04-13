"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stagger, slideLeft, fadeUp, slideRight } from "@/lib/animations";

const painPoints = [
  {
    prefix: "¿Cansado de tatuajes que",
    highlight: " no dicen nada",
    suffix: "?",
  },
  {
    prefix: "¿De tatuadores que no entienden tu idea o",
    highlight: " solo quieren tu dinero",
    suffix: " y te apuran la sesión?",
  },
  {
    prefix: "¿De obras que merecen",
    highlight: " tiempo y dedicación",
    suffix: " pero nadie se la da?",
  },
];

export function Pain() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pain"
      className="relative bg-black-deep py-24 md:py-36 overflow-hidden"
    >
      {/* Background texture gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(247,37,133,0.08) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: questions + philosophy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex flex-col gap-6 mb-12">
              {painPoints.map((point, i) => (
                <motion.p
                  key={i}
                  variants={slideLeft}
                  className="font-display text-3xl md:text-4xl text-white leading-tight"
                >
                  {point.prefix}
                  <span className="text-gradient-pink">{point.highlight}</span>
                  {point.suffix}
                </motion.p>
              ))}
            </div>

            <motion.p
              variants={fadeUp}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-6"
            >
              Cada persona tiene una historia que expresar. El tatuaje correcto
              se{" "}
              <span className="text-pink-miami font-semibold">
                encuentra y descifra
              </span>
              , no se hace en un solo día.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg md:text-xl leading-relaxed"
            >
              La piel es un lienzo que se trata con{" "}
              <span className="text-pink-light">respeto y dedicación</span>.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-pink-miami/50 to-transparent" />
              <span className="text-pink-miami text-2xl font-display tracking-widest">
                AL ESTILO
              </span>
            </motion.div>
          </motion.div>

          {/* Right: El Gringo portrait placeholder */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Decorative corner frames */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-pink-miami" />
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-pink-miami" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-pink-miami" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-pink-miami" />

            {/* Portrait frame */}
            <div
              className="relative aspect-[3/4] rounded-2xl border border-pink-miami/40 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(247,37,133,0.08) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            >
              {/* Diagonal stripes pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(247,37,133,0.4) 0px, rgba(247,37,133,0.4) 1px, transparent 1px, transparent 14px)",
                }}
              />

              {/* Soft glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(247,37,133,0.15) 0%, transparent 60%)",
                }}
              />

              {/* Label stack */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="w-16 h-16 rounded-full border border-pink-miami/50 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-pink-miami"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  </svg>
                </div>
                <span className="text-pink-miami text-[10px] tracking-[0.3em] uppercase font-medium">
                  El Artista
                </span>
                <h3 className="font-display text-5xl md:text-6xl text-white tracking-wider">
                  EL <span className="text-gradient-pink">GRINGO</span>
                </h3>
                <span className="text-white/40 text-xs tracking-widest uppercase">
                  Foto próximamente
                </span>
              </div>
            </div>

            {/* Caption below frame */}
            <p className="mt-6 text-center text-white/50 text-sm tracking-widest uppercase">
              Fundador · Tatuador Principal
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
