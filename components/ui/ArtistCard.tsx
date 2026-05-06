"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type { Artist } from "@/lib/artists";

interface ArtistCardProps {
  artist: Artist;
  onOpen: (artist: Artist) => void;
}

export function ArtistCard({ artist, onOpen }: ArtistCardProps) {
  const accent = `linear-gradient(${artist.accentDeg}deg, rgba(247,37,133,0.55) 0%, rgba(255,107,174,0.20) 55%, rgba(0,0,0,0) 100%)`;
  const watermark = artist.shortTags[0] ?? artist.specialty;

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onClick={() => onOpen(artist)}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-miami/70 rounded-3xl"
      aria-label={`Ver biografía de ${artist.displayName}`}
    >
      {/* Outer glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(247,37,133,0.55) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Card frame */}
      <div
        className="relative aspect-[4/5] rounded-3xl border border-pink-miami/30 overflow-hidden transition-colors duration-300 group-hover:border-pink-miami/80"
        style={{
          background:
            "linear-gradient(160deg, rgba(17,17,17,0.95) 0%, rgba(8,8,8,0.95) 100%)",
        }}
      >
        {/* Per-artist accent gradient */}
        <div
          className="absolute inset-0 opacity-60 group-hover:opacity-95 transition-opacity duration-500"
          style={{ background: accent }}
        />

        {/* Diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.16] transition-opacity duration-500"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(247,37,133,0.6) 0px, rgba(247,37,133,0.6) 1px, transparent 1px, transparent 12px)",
          }}
        />

        {/* Soft radial glow */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-70 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(247,37,133,0.20) 0%, transparent 65%)",
          }}
        />

        {/* Giant graffiti watermark behind everything */}
        <span
          className="font-graffiti pointer-events-none absolute -left-2 -bottom-1 text-[120px] sm:text-[140px] lg:text-[150px] leading-none whitespace-nowrap select-none text-pink-miami/10 group-hover:text-pink-miami/20 transition-colors duration-500"
          style={{ transform: "rotate(-6deg)" }}
        >
          {watermark}
        </span>

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,107,174,0.18) 50%, transparent 60%)",
              animation: "shimmer 2.4s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </div>

        {/* Corner brackets */}
        <span className="absolute top-3 left-3 w-6 h-6 border-t border-l border-pink-miami/70 transition-all duration-300 group-hover:w-10 group-hover:h-10 group-hover:border-pink-miami" />
        <span className="absolute top-3 right-3 w-6 h-6 border-t border-r border-pink-miami/70 transition-all duration-300 group-hover:w-10 group-hover:h-10 group-hover:border-pink-miami" />
        <span className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-pink-miami/70 transition-all duration-300 group-hover:w-10 group-hover:h-10 group-hover:border-pink-miami" />
        <span className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-pink-miami/70 transition-all duration-300 group-hover:w-10 group-hover:h-10 group-hover:border-pink-miami" />

        {/* Photo placeholder content */}
        <div className="absolute inset-x-0 top-0 bottom-[40%] flex flex-col items-center justify-center px-5 text-center">
          <div className="w-16 h-16 rounded-full border border-pink-miami/60 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:border-pink-miami">
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
          <span className="text-pink-miami text-[10px] tracking-[0.3em] uppercase font-medium mb-1">
            El Artista
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-white tracking-wider leading-none">
            {artist.displayName}
          </h3>
          <span className="mt-2 text-white/40 text-[10px] tracking-widest uppercase">
            Foto próximamente
          </span>
        </div>

        {/* Bottom info strip — graffiti style */}
        <div className="absolute inset-x-0 bottom-0 px-5 pt-10 pb-5 bg-gradient-to-t from-black via-black/90 to-transparent">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {artist.shortTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border border-pink-miami/40 bg-pink-miami/10 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <p
            className="font-graffiti text-2xl md:text-[26px] leading-[1.05] text-pink-light text-shadow-pink"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            {artist.specialty}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-pink-miami text-[10px] tracking-widest uppercase font-semibold">
              @{artist.handle}
            </span>
            <span className="inline-flex items-center gap-1 text-white/70 text-[10px] tracking-widest uppercase transition-colors duration-300 group-hover:text-pink-miami">
              Ver más
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Expand badge top-right */}
        <span className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-miami/15 border border-pink-miami/40 backdrop-blur-sm text-pink-miami transition-all duration-300 group-hover:bg-pink-miami group-hover:text-white group-hover:scale-110">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
}
