"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Artist } from "@/lib/artists";

interface ArtistGalleryModalProps {
  artist: Artist | null;
  onClose: () => void;
}

export function ArtistGalleryModal({ artist, onClose }: ArtistGalleryModalProps) {
  const [mounted, setMounted] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const isOpen = artist !== null;
  const gallery = artist?.gallery ?? [];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset lightbox whenever the artist changes / modal closes
  useEffect(() => {
    if (!isOpen) setLightboxIdx(null);
  }, [isOpen]);

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

  // Keyboard: ESC closes (lightbox first, then modal); arrows navigate lightbox
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIdx !== null) {
          setLightboxIdx(null);
        } else {
          onClose();
        }
        return;
      }
      if (lightboxIdx !== null && gallery.length > 0) {
        if (e.key === "ArrowLeft") {
          setLightboxIdx((lightboxIdx + gallery.length - 1) % gallery.length);
        } else if (e.key === "ArrowRight") {
          setLightboxIdx((lightboxIdx + 1) % gallery.length);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, lightboxIdx, gallery.length, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {artist && (
        <>
          <motion.div
            key="gallery-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="gallery-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Tatuajes de ${artist.displayName}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-[301] flex items-stretch justify-center pointer-events-none p-3 md:p-6"
          >
            <div
              className="relative w-full max-w-6xl max-h-[94vh] overflow-y-auto pointer-events-auto rounded-3xl border border-pink-miami/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(17,17,17,0.98) 0%, rgba(8,8,8,0.98) 100%)",
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(247,37,133,0.12)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-6 md:px-9 py-5 border-b border-white/5 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md rounded-t-3xl">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-white/70 hover:text-pink-miami text-xs tracking-widest uppercase transition-colors duration-200"
                  aria-label="Volver al perfil"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver al perfil
                </button>

                <div className="text-center min-w-0 flex-1">
                  <span className="block text-pink-miami text-[10px] tracking-[0.3em] uppercase font-semibold">
                    Tatuajes de
                  </span>
                  <h2 className="font-display text-xl md:text-3xl text-white tracking-wider truncate">
                    {artist.displayName}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-pink-miami/30 transition-colors duration-200 text-white/60 hover:text-white"
                  aria-label="Cerrar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 md:px-9 py-8">
                {gallery.length === 0 ? (
                  <EmptyState artistName={artist.displayName} />
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {gallery.map((item, i) => (
                      <button
                        key={item.src}
                        onClick={() => setLightboxIdx(i)}
                        className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-pink-miami/70 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-miami/70"
                        aria-label={`Ampliar: ${item.alt}`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute bottom-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-pink-miami/40 text-pink-miami opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
                          </svg>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIdx !== null && gallery[lightboxIdx] && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[400] bg-black/95 flex items-center justify-center p-4"
                onClick={() => setLightboxIdx(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className="relative max-w-5xl w-full max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={gallery[lightboxIdx].src}
                    alt={gallery[lightboxIdx].alt}
                    width={gallery[lightboxIdx].width}
                    height={gallery[lightboxIdx].height}
                    className="object-contain w-full h-auto max-h-[88vh] rounded-2xl mx-auto"
                    unoptimized
                  />

                  {/* Close */}
                  <button
                    onClick={() => setLightboxIdx(null)}
                    aria-label="Cerrar imagen"
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur text-white flex items-center justify-center hover:bg-pink-miami transition-colors"
                  >
                    ✕
                  </button>

                  {/* Counter */}
                  <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur text-white text-[11px] tracking-widest font-display">
                    {String(lightboxIdx + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                  </span>

                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setLightboxIdx(
                            (lightboxIdx + gallery.length - 1) % gallery.length
                          )
                        }
                        aria-label="Anterior"
                        className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-pink-miami hover:border-pink-miami transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setLightboxIdx((lightboxIdx + 1) % gallery.length)
                        }
                        aria-label="Siguiente"
                        className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-pink-miami hover:border-pink-miami transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

function EmptyState({ artistName }: { artistName: string }) {
  return (
    <div className="text-center py-16 md:py-24 max-w-xl mx-auto">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-pink-miami/40 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-pink-miami"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
      <p className="font-display text-2xl md:text-3xl text-white tracking-wider mb-3">
        Galería <span className="text-gradient-pink">Próximamente</span>
      </p>
      <p className="text-white/60 text-base md:text-lg leading-relaxed">
        Estamos curando la selección de tatuajes de {artistName}. Volvé en
        unos días o reservá tu consulta para conocer su trabajo en detalle.
      </p>
    </div>
  );
}
