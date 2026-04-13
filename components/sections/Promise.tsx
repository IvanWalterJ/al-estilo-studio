"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { stagger, fadeUp, scaleIn } from "@/lib/animations";

const features = [
  {
    image: "/images/tattoos/9593EF33-4200-4882-937E-DA12CE217516_Original.JPG",
    label: "Realismo",
    title: "Realismo de Élite",
    desc: "Técnicas avanzadas de hiperrealismo que transforman tu piel en un lienzo de museo.",
  },
  {
    image: "/images/tattoos/85844985-620A-4AD1-97AA-545A92C9E785.JPG",
    label: "Formato",
    title: "Piezas Grandes",
    desc: "Especialistas en trabajos de gran formato que cuentan historias completas en tu cuerpo.",
  },
  {
    image: "/images/tattoos/1EF16A9F-1BFC-459E-A685-75F162521517.JPG",
    label: "Diseño",
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

      <div ref={ref} className="max-w-[1400px] mx-auto px-6">
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
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={scaleIn}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(247,37,133,0.08)",
              }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-black-deep">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Dark gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Top-left index */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="font-display text-pink-miami text-3xl tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block w-8 h-px bg-pink-miami/60" />
                </div>

                {/* Top-right expand */}
                <span
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-pink-miami text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0 transition-all duration-400"
                  aria-hidden
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14M5 12h14"
                    />
                  </svg>
                </span>

                {/* Bottom overlay content */}
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="block text-pink-miami text-[10px] tracking-[0.3em] uppercase font-medium mb-3">
                    {f.label}
                  </span>
                  <h3 className="font-display text-white text-3xl md:text-4xl tracking-wide leading-tight mb-4">
                    {f.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[90%]">
                    {f.desc}
                  </p>
                </div>

                {/* Hover ring */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-pink-miami/0 group-hover:ring-pink-miami/50 transition-all duration-500 pointer-events-none" />
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
