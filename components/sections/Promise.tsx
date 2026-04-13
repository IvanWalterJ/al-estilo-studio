"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { stagger, fadeUp, scaleIn } from "@/lib/animations";

const features = [
  {
    image: "/images/tattoos/9593EF33-4200-4882-937E-DA12CE217516_Original.JPG",
    title: "Realismo de Élite",
    desc: "Técnicas avanzadas de hiperrealismo que transforman tu piel en un lienzo de museo.",
  },
  {
    image: "/images/tattoos/85844985-620A-4AD1-97AA-545A92C9E785.JPG",
    title: "Piezas Grandes",
    desc: "Especialistas en trabajos de gran formato que cuentan historias completas en tu cuerpo.",
  },
  {
    image: "/images/tattoos/1EF16A9F-1BFC-459E-A685-75F162521517.JPG",
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
            <motion.div
              key={f.title}
              variants={scaleIn}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 20px 60px rgba(247, 37, 133, 0.2), 0 0 0 1px rgba(247, 37, 133, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-light rounded-2xl overflow-hidden text-center group"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col items-center gap-4 p-8">
                <h3 className="font-display text-2xl text-black-deep tracking-wide">
                  {f.title}
                </h3>
                <p className="text-black-deep/60 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pink accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-miami to-transparent" />
    </section>
  );
}
