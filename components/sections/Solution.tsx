"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { stagger, fadeUp, slideLeft, slideRight } from "@/lib/animations";

const steps = [
  {
    num: "01",
    title: "Sesión de Diseño",
    desc: "30 minutos en el estudio para crear el diseño inicial. Discutimos ideas, tamaños, referencias y ubicación exacta.",
  },
  {
    num: "02",
    title: "Boceto Único",
    desc: "Creamos el boceto de tu pieza exclusiva. Sin diseños genéricos — cada trabajo parte de cero.",
  },
  {
    num: "03",
    title: "La Obra Final",
    desc: "Sesiones dedicadas con seguimiento completo. Valorizamos el tiempo necesario para lograr resultados meticulosos.",
  },
];

export function Solution() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="solution"
      className="relative bg-white py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(247,37,133,0.04) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-pink-miami text-sm tracking-[0.3em] uppercase mb-4"
          >
            La Solución
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl text-black-deep tracking-wide"
          >
            EL PROCESO{" "}
            <span className="text-gradient-pink">PERFECTO</span>
          </motion.h2>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: steps */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-8"
          >
            {steps.map((step) => (
              <motion.div
                key={step.num}
                variants={slideLeft}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0">
                  <span className="font-display text-5xl text-pink-miami/30 group-hover:text-pink-miami transition-colors duration-300">
                    {step.num}
                  </span>
                </div>
                <div className="border-l border-black-deep/10 group-hover:border-pink-miami/40 pl-6 transition-colors duration-300">
                  <h3 className="font-display text-2xl text-black-deep mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-black-deep/60 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.a
              variants={fadeUp}
              href="#booking"
              className="mt-4 inline-flex items-center gap-3 px-8 py-3 bg-black-deep text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-pink-miami transition-colors duration-300 self-start"
            >
              Reservar Consulta
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: studio photo */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            ref={imgRef}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
              <Image
                src="/images/studio/IMG_3514.jpg"
                alt="Al Estilo Studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="glass-dark px-4 py-2 rounded-full text-white text-sm tracking-widest uppercase">
                El Estudio
              </span>
            </div>
          </motion.div>
        </div>

        {/* Value props row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6 p-8 rounded-3xl bg-black-deep"
        >
          {[
            { label: "Piezas Únicas", value: "100%" },
            { label: "Sin Diseños Genéricos", value: "0" },
            { label: "Acompañamiento Completo", value: "✓" },
          ].map((item) => (
            <GlassCard key={item.label} variant="dark" className="text-center">
              <p className="font-display text-5xl text-pink-miami mb-2">
                {item.value}
              </p>
              <p className="text-white/60 text-sm tracking-widest uppercase">
                {item.label}
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
