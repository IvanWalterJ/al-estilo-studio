"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { reviews } from "@/lib/reviews";
import { stagger, fadeUp } from "@/lib/animations";

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-pink-miami fill-current" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="reviews"
      className="relative bg-white py-24 md:py-36 overflow-hidden"
    >
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(247,37,133,0.04) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl text-black-deep tracking-wide"
          >
            LO QUE DICEN{" "}
            <span className="text-gradient-pink">NUESTROS CLIENTES</span>
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-none w-[340px] md:w-[380px]"
                >
                  <div className="glass-light rounded-2xl p-6 h-full flex flex-col gap-4 border border-black-deep/5">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <GoogleIcon />
                    </div>

                    {/* Review text */}
                    <p className="text-black-deep/70 text-sm leading-relaxed flex-1">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-2 border-t border-black-deep/5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-miami to-pink-light flex items-center justify-center text-white font-bold text-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-black-deep text-sm font-semibold">
                          {review.author}
                        </p>
                        <p className="text-black-deep/40 text-xs">{review.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-black-deep/20 flex items-center justify-center text-black-deep hover:border-pink-miami hover:text-pink-miami transition-colors"
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-black-deep/20 flex items-center justify-center text-black-deep hover:border-pink-miami hover:text-pink-miami transition-colors"
            >
              →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
