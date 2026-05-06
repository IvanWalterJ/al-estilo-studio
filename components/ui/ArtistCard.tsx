"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type { Artist } from "@/lib/artists";

interface ArtistCardProps {
  artist: Artist;
  onOpen: (artist: Artist) => void;
}

export function ArtistCard({ artist, onOpen }: ArtistCardProps) {
  const accent = `linear-gradient(${artist.accentDeg}deg, rgba(247,37,133,0.45) 0%, rgba(255,107,174,0.18) 55%, rgba(0,0,0,0) 100%)`;

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onClick={() => onOpen(artist)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-miami/70 rounded-2xl"
      aria-label={`Ver biografía de ${artist.displayName}`}
    >
      {/* Outer glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(247,37,133,0.55) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Card frame */}
      <div
        className="relative aspect-[3/4] rounded-2xl border border-pink-miami/30 overflow-hidden transition-colors duration-300 group-hover:border-pink-miami/80"
        style={{
          background:
            "linear-gradient(160deg, rgba(17,17,17,0.95) 0%, rgba(8,8,8,0.95) 100%)",
        }}
      >
        {/* Accent gradient (per-artist hue shift via angle) */}
        <div
          className="absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          style={{ background: accent }}
        />

        {/* Diagonal stripes */}
        <div
          className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(247,37,133,0.6) 0px, rgba(247,37,133,0.6) 1px, transparent 1px, transparent 12px)",
          }}
        />

        {/* Soft radial glow that brightens on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-70 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, rgba(247,37,133,0.18) 0%, transparent 65%)",
          }}
        />

        {/* Animated shine sweep on hover */}
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

        {/* Decorative corner brackets that grow on hover */}
        <span className="absolute top-2 left-2 w-5 h-5 border-t border-l border-pink-miami/70 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-pink-miami" />
        <span className="absolute top-2 right-2 w-5 h-5 border-t border-r border-pink-miami/70 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-pink-miami" />
        <span className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-pink-miami/70 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-pink-miami" />
        <span className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-pink-miami/70 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-pink-miami" />

        {/* Photo placeholder content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <div className="w-14 h-14 rounded-full border border-pink-miami/60 flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:border-pink-miami">
            <svg
              className="w-6 h-6 text-pink-miami"
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
          <h3 className="font-display text-2xl md:text-3xl text-white tracking-wider leading-none">
            {artist.displayName}
          </h3>
          <span className="mt-2 text-white/40 text-[10px] tracking-widest uppercase">
            Foto próximamente
          </span>
        </div>

        {/* Bottom info strip */}
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
          <p className="text-white/85 text-[11px] tracking-[0.18em] uppercase font-medium leading-tight">
            {artist.specialty}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-pink-miami text-[10px] tracking-widest uppercase">
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
        <span className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-7 h-7 rounded-full bg-pink-miami/15 border border-pink-miami/40 backdrop-blur-sm text-pink-miami transition-all duration-300 group-hover:bg-pink-miami group-hover:text-white group-hover:scale-110">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
}
