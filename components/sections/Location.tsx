"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stagger, fadeUp } from "@/lib/animations";

const ADDRESS = "Palacios 156, R8400 San Carlos de Bariloche, Río Negro";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Palacios+156,+San+Carlos+de+Bariloche,+R%C3%ADo+Negro&output=embed";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Palacios+156+San+Carlos+de+Bariloche+R%C3%ADo+Negro";

export function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="location"
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(247,37,133,0.04) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-pink-miami text-xs tracking-[0.25em] uppercase font-medium mb-4"
          >
            Visítanos
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl text-black-deep tracking-wide"
          >
            NUESTRA <span className="text-gradient-pink">UBICACIÓN</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-black-deep/60 text-lg"
          >
            {ADDRESS}
          </motion.p>
          <motion.a
            variants={fadeUp}
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 px-8 py-3 bg-black-deep text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-pink-miami transition-colors duration-300"
          >
            Cómo llegar
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative rounded-2xl overflow-hidden border border-black-deep/10 shadow-lg"
          style={{ height: 460 }}
        >
          <iframe
            title="Al Estilo Studio — Ubicación"
            src={MAPS_EMBED}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
