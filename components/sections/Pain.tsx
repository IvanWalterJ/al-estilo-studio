"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stagger, fadeUp, staggerFast } from "@/lib/animations";
import { artists, type Artist } from "@/lib/artists";
import { ArtistCard } from "@/components/ui/ArtistCard";
import { ArtistModal } from "@/components/ui/ArtistModal";

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
  const [openArtist, setOpenArtist] = useState<Artist | null>(null);

  return (
    <section
      id="pain"
      className="relative bg-black-deep py-24 md:py-36 overflow-hidden"
    >
      {/* Background texture gradients */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(247,37,133,0.10) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(247,37,133,0.08) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="relative px-6">
        {/* Centered text block */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="flex flex-col gap-6 mb-12">
            {painPoints.map((point, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
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
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-pink-miami/50" />
            <span className="text-pink-miami text-2xl font-display tracking-widest">
              AL ESTILO
            </span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-pink-miami/50" />
          </motion.div>
        </motion.div>

        {/* Artists grid — wider container to use horizontal space */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-24 md:mt-28 max-w-[1400px] mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <span className="text-pink-miami text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
              · El Equipo ·
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-white tracking-wider">
              ARTISTAS <span className="text-gradient-pink">AL ESTILO</span>
            </h2>
            <p className="mt-4 text-white/60 text-base md:text-lg max-w-2xl mx-auto">
              Cada uno con su lenguaje. Tocá sobre cualquier tarjeta para
              conocer su estilo, su trayectoria y reservar tu consulta.
            </p>
          </div>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onOpen={setOpenArtist}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <ArtistModal artist={openArtist} onClose={() => setOpenArtist(null)} />
    </section>
  );
}
