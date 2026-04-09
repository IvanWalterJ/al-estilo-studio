"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  galleryItems,
  categoryLabels,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";
import { stagger, fadeUp } from "@/lib/animations";

const categories: GalleryCategory[] = [
  "all",
  "realism",
  "blackwork",
  "micro",
  "studio",
];

function LightBox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative max-w-3xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="object-contain w-full h-full rounded-2xl max-h-[85vh]"
            unoptimized
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-pink-miami transition-colors"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="bg-black-deep py-24 md:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-pink-miami text-sm tracking-[0.3em] uppercase mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl text-white tracking-wide"
          >
            NUESTRO <span className="text-gradient-pink">TRABAJO</span>
          </motion.h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-pink-miami text-white"
                  : "border border-white/20 text-white/50 hover:border-pink-miami hover:text-pink-miami"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="break-inside-avoid mb-3 relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightboxItem(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                  <span className="text-white text-sm tracking-widest uppercase font-semibold">
                    Ver trabajo →
                  </span>
                </div>
                {/* Pink border glow on hover */}
                <div className="absolute inset-0 rounded-xl border border-pink-miami/0 group-hover:border-pink-miami/40 transition-all duration-400 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA below gallery */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-3 px-8 py-4 bg-pink-miami text-white font-semibold tracking-widest uppercase text-sm rounded-full hover:bg-pink-light transition-colors duration-200 glow-pink"
          >
            Quiero mi Pieza
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <LightBox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </section>
  );
}
