"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SprayPaint } from "@/components/ui/SprayPaint";

const LOGO_W = 500;
const LOGO_H = 300;

export function Hero() {
  const [sprayDone, setSprayDone] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0]
  );

  useEffect(() => {
    if (sprayDone) {
      const t = setTimeout(() => setShowTagline(true), 200);
      return () => clearTimeout(t);
    }
  }, [sprayDone]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black-deep"
    >
      {/* Radial pink glow */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse-pink"
          style={{
            background:
              "radial-gradient(circle, rgba(247,37,133,0.15) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Logo container with parallax */}
      <motion.div
        style={{ y: logoY, opacity: bgOpacity }}
        className="relative z-10 flex flex-col items-center gap-10"
      >
        {/* Logo + spray canvas */}
        <div
          className="relative"
          style={{ width: LOGO_W, height: LOGO_H, maxWidth: "90vw" }}
        >
          <Image
            src="/images/logo/Ilustración_sin_título.png"
            alt="Al Estilo Studio Logo"
            width={LOGO_W}
            height={LOGO_H}
            priority
            className="object-contain"
            style={{
              opacity: sprayDone ? 1 : 0,
              transition: "opacity 0.8s ease-out",
            }}
          />
          {!sprayDone && (
            <SprayPaint
              src="/images/logo/Ilustración_sin_título.png"
              width={LOGO_W}
              height={LOGO_H}
              onComplete={() => setSprayDone(true)}
            />
          )}
        </div>

        {/* Tagline */}
        <div className="text-center overflow-hidden">
          {showTagline && (
            <div>
              <AnimatedText
                text="UNA OBRA DE ARTE EN TU PIEL"
                className="font-display text-3xl md:text-5xl lg:text-6xl text-white tracking-widest leading-tight"
                stagger={0.06}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-4 text-white/50 text-sm md:text-base tracking-widest uppercase"
              >
                Realismo · Black Work · Diseño Exclusivo
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="#booking"
                  className="px-8 py-3 bg-pink-miami text-white font-semibold tracking-widest uppercase text-sm rounded-full hover:bg-pink-light transition-colors duration-200 glow-pink"
                >
                  Reserva tu Consulta
                </a>
                <a
                  href="#portfolio"
                  className="px-8 py-3 border border-white/20 text-white text-sm tracking-widest uppercase rounded-full hover:border-pink-miami hover:text-pink-miami transition-colors duration-200"
                >
                  Ver Galería
                </a>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-pink-miami to-transparent"
        />
      </motion.div>
    </section>
  );
}
