"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stagger, slideLeft, fadeUp } from "@/lib/animations";

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
          {/* Left: questions */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex flex-col gap-6">
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
          </motion.div>

          {/* Right: philosophy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="border-l border-pink-miami/20 pl-10"
          >
            <motion.p
              variants={fadeUp}
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-6"
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
              className="text-white/60 text-base leading-relaxed mb-6"
            >
              Es como un mensaje oculto que descubrimos juntos en una sesión de
              diseño. Una marca para la eternidad que debe representar tu
              identidad y el cierre o inicio de una etapa de vida.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-base leading-relaxed"
            >
              La piel es un lienzo que se trata con{" "}
              <span className="text-pink-light">respeto y dedicación</span>.
            </motion.p>

            {/* Decorative line */}
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
        </div>
      </div>
    </section>
  );
}
