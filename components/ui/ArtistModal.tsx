"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Artist } from "@/lib/artists";
import { useBookingModal } from "@/components/providers/BookingModalProvider";
import { ArtistGalleryModal } from "@/components/ui/ArtistGalleryModal";

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
}

export function ArtistModal({ artist, onClose }: ArtistModalProps) {
  const [mounted, setMounted] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { openModal: openBookingModal } = useBookingModal();
  const isOpen = artist !== null;

  // Reset nested gallery state whenever the bio modal closes
  useEffect(() => {
    if (!isOpen) setGalleryOpen(false);
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {artist && (
        <>
          <motion.div
            key="artist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="artist-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Biografía de ${artist.displayName}`}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed inset-0 z-[201] flex items-center justify-center pointer-events-none px-4"
          >
            <div
              data-lenis-prevent
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain pointer-events-auto rounded-3xl border border-pink-miami/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(17,17,17,0.98) 0%, rgba(8,8,8,0.98) 100%)",
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(247,37,133,0.12), 0 0 80px rgba(247,37,133,0.18)",
                WebkitOverflowScrolling: "touch",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-pink-miami/40 hover:border-pink-miami/60 transition-colors duration-200 text-white/70 hover:text-white"
                aria-label="Cerrar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-[340px_1fr] gap-0 md:min-h-[72vh]">
                {/* Left: artist photo (color) */}
                <div className="relative aspect-[3/4] md:aspect-auto md:min-h-full overflow-hidden md:rounded-l-3xl rounded-t-3xl md:rounded-tr-none border-b md:border-b-0 md:border-r border-pink-miami/20">
                  <Image
                    src={artist.photoColor}
                    alt={`${artist.displayName} — retrato`}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover object-center"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
                    style={{
                      background: `linear-gradient(${artist.accentDeg}deg, rgba(247,37,133,0.5) 0%, rgba(0,0,0,0) 60%)`,
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="absolute top-4 left-4 text-pink-miami text-[10px] tracking-[0.3em] uppercase font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    El Artista
                  </span>
                </div>

                {/* Right: info */}
                <div className="p-6 md:p-8 pb-4 md:pb-6">
                  <a
                    href={artist.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-pink-miami text-[10px] tracking-[0.3em] uppercase font-medium hover:text-pink-light transition-colors duration-200 group/ig"
                    aria-label={`Ver perfil de Instagram de ${artist.displayName}`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <span className="group-hover/ig:underline underline-offset-2">
                      @{artist.handle}
                    </span>
                  </a>
                  <h2 className="mt-2 font-display text-3xl md:text-[2.75rem] text-white tracking-wider leading-none">
                    {artist.displayName}
                  </h2>
                  <p
                    className="mt-2.5 font-graffiti text-xl md:text-[1.75rem] text-pink-light text-shadow-pink leading-tight"
                    style={{ transform: "rotate(-1.5deg)" }}
                  >
                    {artist.specialty}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {artist.shortTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-pink-miami/30 bg-pink-miami/5 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 h-px bg-gradient-to-r from-pink-miami/40 via-pink-miami/10 to-transparent" />

                  <p className="mt-5 text-white/75 text-[14px] md:text-[15px] leading-relaxed">
                    {artist.bio}
                  </p>
                </div>
              </div>

              {/* Sticky CTA footer — siempre visible */}
              <div
                className="sticky bottom-0 left-0 right-0 z-20 px-5 md:px-7 py-3.5 md:py-4 border-t border-pink-miami/15 backdrop-blur-md flex flex-col sm:flex-row gap-2.5 rounded-b-3xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.96) 60%, rgba(8,8,8,0.98) 100%)",
                }}
              >
                <button
                  onClick={() => setGalleryOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-pink-miami/60 text-pink-miami text-[12px] md:text-sm tracking-widest uppercase font-semibold hover:bg-pink-miami hover:text-white transition-colors duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                  </svg>
                  Ver galería
                </button>
                <button
                  onClick={() => {
                    onClose();
                    openBookingModal();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-pink-miami text-white text-[12px] md:text-sm tracking-widest uppercase font-semibold hover:bg-pink-light transition-colors duration-200 glow-pink"
                >
                  Reservar consulta
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          <ArtistGalleryModal
            artist={galleryOpen ? artist : null}
            onClose={() => setGalleryOpen(false)}
          />
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
