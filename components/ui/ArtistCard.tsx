"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type { Artist } from "@/lib/artists";

interface ArtistCardProps {
  artist: Artist;
  onOpen: (artist: Artist) => void;
}

export function ArtistCard({ artist, onOpen }: ArtistCardProps) {
  const accent = `linear-gradient(${artist.accentDeg}deg, rgba(247,37,133,0.45) 0%, rgba(255,107,174,0.10) 50%, rgba(0,0,0,0) 100%)`;
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
            "radial-gradient(circle at 50% 0%, rgba(247,37,133,0.6) 0%, transparent 70%)",
          filter: "blur(22px)",
        }}
      />

      {/* Card frame */}
      <div
        className="relative aspect-[2/3] rounded-3xl border border-pink-miami/30 overflow-hidden bg-black-deep transition-colors duration-300 group-hover:border-pink-miami/80"
      >
        {/* Black & white photo (default) */}
        <Image
          src={artist.photoBw}
          alt={`${artist.displayName} — retrato en blanco y negro`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-opacity duration-700 group-hover:opacity-0"
          priority={false}
        />
        {/* Color photo (revealed on hover) */}
        <Image
          src={artist.photoColor}
          alt={`${artist.displayName} — retrato a color`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
          priority={false}
        />

        {/* Per-artist accent gradient */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: accent }}
        />

        {/* Top-to-bottom darkener for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

        {/* Diagonal stripes (subtle) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(247,37,133,0.6) 0px, rgba(247,37,133,0.6) 1px, transparent 1px, transparent 14px)",
          }}
        />

        {/* Giant graffiti watermark — sprays over the photo on hover */}
        <span
          className="font-graffiti pointer-events-none absolute -left-2 top-[38%] text-[110px] sm:text-[130px] lg:text-[140px] leading-none whitespace-nowrap select-none transition-all duration-500 opacity-0 group-hover:opacity-90"
          style={{
            transform: "rotate(-8deg)",
            color: "rgba(255,107,174,0.85)",
            mixBlendMode: "screen",
            textShadow:
              "0 0 14px rgba(247,37,133,0.9), 0 0 30px rgba(247,37,133,0.6)",
          }}
        >
          {watermark}
        </span>

        {/* Shine sweep on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.10) 50%, transparent 60%)",
              animation: "shimmer 2.4s linear infinite",
              backgroundSize: "200% 100%",
            }}
          />
        </div>

        {/* Corner brackets */}
        <span className="absolute top-3 left-3 w-6 h-6 border-t border-l border-pink-miami/80 transition-all duration-300 group-hover:w-10 group-hover:h-10" />
        <span className="absolute top-3 right-3 w-6 h-6 border-t border-r border-pink-miami/80 transition-all duration-300 group-hover:w-10 group-hover:h-10" />
        <span className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-pink-miami/80 transition-all duration-300 group-hover:w-10 group-hover:h-10" />
        <span className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-pink-miami/80 transition-all duration-300 group-hover:w-10 group-hover:h-10" />

        {/* Top label */}
        <div className="absolute inset-x-0 top-0 px-5 pt-5 text-center">
          <span className="text-pink-miami text-[10px] tracking-[0.3em] uppercase font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            El Artista
          </span>
        </div>

        {/* Bottom info strip */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-14 bg-gradient-to-t from-black via-black/95 to-transparent">
          <h3 className="font-display text-3xl md:text-4xl text-white tracking-wider leading-none mb-2">
            {artist.displayName}
          </h3>
          <p
            className="font-graffiti text-xl md:text-[22px] leading-[1.05] text-pink-light text-shadow-pink"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            {artist.specialty}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {artist.shortTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border border-pink-miami/40 bg-black/40 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-pink-miami text-[10px] tracking-widest uppercase font-semibold">
              @{artist.handle}
            </span>
            <span className="inline-flex items-center gap-1 text-white/80 text-[10px] tracking-widest uppercase transition-colors duration-300 group-hover:text-pink-miami">
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
        <span className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/50 border border-pink-miami/50 backdrop-blur-sm text-pink-miami transition-all duration-300 group-hover:bg-pink-miami group-hover:text-white group-hover:scale-110">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
}
