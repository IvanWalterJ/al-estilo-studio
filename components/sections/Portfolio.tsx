"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
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

const TWEEN_FACTOR = 1.1;

function numberWithinRange(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    dragFree: false,
  });

  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__inner") as HTMLElement;
    });
  }, []);

  const tweenScale = useCallback((api: EmblaCarouselType) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrollEvent = engine.options.loop;

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
        const scale = numberWithinRange(tweenValue, 0.7, 1).toString();
        const opacity = numberWithinRange(tweenValue, 0.35, 1).toString();
        const node = tweenNodes.current[slideIndex];
        if (node) {
          node.style.transform = `scale(${scale})`;
          node.style.opacity = opacity;
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    tweenScale(emblaApi);

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setTweenNodes(emblaApi);
      tweenScale(emblaApi);
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    emblaApi.on("scroll", tweenScale);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
      emblaApi.off("scroll", tweenScale);
    };
  }, [emblaApi, setTweenNodes, tweenScale]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  const total = filtered.length;
  const current = total > 0 ? (selectedIndex % total) + 1 : 0;
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <section
      id="portfolio"
      className="relative bg-black-deep py-24 md:py-36 overflow-hidden"
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(247,37,133,0.06) 0%, transparent 60%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-miami/40 to-transparent" />

      <div ref={ref} className="relative max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-10"
        >
          <motion.p
            variants={fadeUp}
            className="text-pink-miami text-xs tracking-[0.25em] uppercase font-medium mb-4"
          >
            Portafolio
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
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setTimeout(() => emblaApi?.scrollTo(0), 0);
              }}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-pink-miami text-white glow-pink"
                  : "border border-white/15 text-white/50 hover:border-pink-miami hover:text-pink-miami"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {filtered.map((item, i) => (
                <div
                  key={`${activeCategory}-${item.src}`}
                  className="embla__slide relative flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_48%] lg:flex-[0_0_40%] min-w-0 px-3 md:px-5"
                >
                  <div
                    className="embla__slide__inner relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group transition-[transform,opacity] duration-300 ease-out"
                    onClick={() => {
                      if (i === selectedIndex) setLightboxItem(item);
                      else scrollTo(i);
                    }}
                    style={{
                      boxShadow:
                        "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(247,37,133,0.12)",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 48vw, 40vw"
                      unoptimized
                      priority={i < 3}
                    />

                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                    {/* Hover ring */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-pink-miami/0 group-hover:ring-pink-miami/40 transition-all duration-500 pointer-events-none" />

                    {/* Meta label */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                      <div>
                        <span className="block text-pink-miami text-[10px] tracking-[0.3em] uppercase font-medium mb-1">
                          {categoryLabels[item.category]}
                        </span>
                        <h3 className="font-display text-white text-xl md:text-2xl tracking-wide leading-tight">
                          {item.alt}
                        </h3>
                      </div>
                      <span
                        className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 w-10 h-10 rounded-full bg-pink-miami text-white flex items-center justify-center flex-shrink-0"
                        aria-hidden
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7"
                          />
                        </svg>
                      </span>
                    </div>

                    {/* Corner index */}
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span className="text-pink-miami font-display text-2xl tracking-widest">
                        {String((i % total) + 1).padStart(2, "0")}
                      </span>
                      <span className="block w-8 h-px bg-pink-miami/60" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white items-center justify-center hover:bg-pink-miami hover:border-pink-miami transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            aria-label="Siguiente"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white items-center justify-center hover:bg-pink-miami hover:border-pink-miami transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>

        {/* Footer: counter + progress + mobile arrows */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 flex items-center gap-5 md:gap-8 max-w-3xl mx-auto"
        >
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="md:hidden w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:border-pink-miami hover:text-pink-miami transition-colors flex-shrink-0"
          >
            ←
          </button>

          <span className="font-display text-white text-2xl tracking-widest tabular-nums flex-shrink-0">
            {String(current).padStart(2, "0")}
          </span>

          <div className="flex-1 relative h-[2px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-miami to-pink-light rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            />
          </div>

          <span className="font-display text-white/40 text-2xl tracking-widest tabular-nums flex-shrink-0">
            {String(total).padStart(2, "0")}
          </span>

          <button
            onClick={scrollNext}
            aria-label="Siguiente"
            className="md:hidden w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:border-pink-miami hover:text-pink-miami transition-colors flex-shrink-0"
          >
            →
          </button>
        </motion.div>

        {/* Thumbnail strip */}
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {filtered.slice(0, 12).map((item, i) => (
            <button
              key={`thumb-${item.src}`}
              onClick={() => scrollTo(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`relative w-12 h-14 rounded-md overflow-hidden transition-all duration-300 ${
                selectedIndex === i
                  ? "ring-2 ring-pink-miami scale-110"
                  : "opacity-40 hover:opacity-100"
              }`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover"
                sizes="48px"
                unoptimized
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-14"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-3 px-8 py-4 bg-pink-miami text-white font-semibold tracking-widest uppercase text-sm rounded-full hover:bg-pink-light transition-colors duration-200 glow-pink"
          >
            Quiero mi Pieza
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
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
