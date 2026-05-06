"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Artist } from "@/lib/artists";
import { useBookingModal } from "@/components/providers/BookingModalProvider";

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
}

export function ArtistModal({ artist, onClose }: ArtistModalProps) {
  const [mounted, setMounted] = useState(false);
  const { openModal: openBookingModal } = useBookingModal();
  const isOpen = artist !== null;

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
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto pointer-events-auto rounded-3xl border border-pink-miami/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(17,17,17,0.98) 0%, rgba(8,8,8,0.98) 100%)",
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(247,37,133,0.12), 0 0 80px rgba(247,37,133,0.18)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-pink-miami/30 transition-colors duration-200 text-white/60 hover:text-white"
                aria-label="Cerrar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-[260px_1fr] gap-0">
                {/* Left: photo placeholder */}
                <div
                  className="relative aspect-[3/4] md:aspect-auto md:min-h-full overflow-hidden md:rounded-l-3xl rounded-t-3xl md:rounded-tr-none border-b md:border-b-0 md:border-r border-pink-miami/20"
                  style={{
                    background: `linear-gradient(${artist.accentDeg}deg, rgba(247,37,133,0.45) 0%, rgba(255,107,174,0.18) 50%, rgba(0,0,0,0.6) 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(247,37,133,0.6) 0px, rgba(247,37,133,0.6) 1px, transparent 1px, transparent 14px)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 35%, rgba(247,37,133,0.25) 0%, transparent 65%)",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-16 h-16 rounded-full border border-pink-miami/60 flex items-center justify-center mb-3">
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
                    <span className="text-pink-miami text-[10px] tracking-[0.3em] uppercase font-medium">
                      El Artista
                    </span>
                    <span className="mt-3 text-white/40 text-[10px] tracking-widest uppercase">
                      Foto próximamente
                    </span>
                  </div>
                </div>

                {/* Right: info */}
                <div className="p-7 md:p-9">
                  <span className="inline-block text-pink-miami text-[10px] tracking-[0.3em] uppercase font-medium">
                    @{artist.handle}
                  </span>
                  <h2 className="mt-2 font-display text-4xl md:text-5xl text-white tracking-wider leading-none">
                    {artist.displayName}
                  </h2>
                  <p className="mt-3 text-pink-light text-sm md:text-base tracking-widest uppercase">
                    {artist.specialty}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {artist.shortTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border border-pink-miami/30 bg-pink-miami/5 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 h-px bg-gradient-to-r from-pink-miami/40 via-pink-miami/10 to-transparent" />

                  <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">
                    {artist.bio}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        openBookingModal();
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-pink-miami text-white text-sm tracking-widest uppercase font-semibold hover:bg-pink-light transition-colors duration-200"
                    >
                      Reservar consulta
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm tracking-widest uppercase hover:border-pink-miami/60 hover:text-white transition-colors duration-200"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
