"use client";

import Lenis from "lenis";
import { useEffect } from "react";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // ── Smooth anchor navigation ──────────────────────────────────────────
    // Intercept clicks on <a href="#..."> and delegate to Lenis so the scroll
    // is smooth instead of an instant browser jump.
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.5 });
    };
    document.addEventListener("click", handleAnchorClick);

    // ── Scroll-reveal mask effect ─────────────────────────────────────────
    // All sections except the first (Hero) start hidden with a bottom clip-path.
    // An IntersectionObserver removes the clip as each section enters the
    // viewport, creating the "content bleeding in" reveal effect.
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section")
    );

    sections.forEach((section, i) => {
      if (i === 0) return; // Hero is always in view on load
      section.classList.add("sr-hidden");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // One rAF delay so the hidden state is painted before transition starts
          requestAnimationFrame(() => {
            el.classList.remove("sr-hidden");
            el.classList.add("sr-visible");
          });
          observer.unobserve(el);
        });
      },
      { threshold: 0.04 }
    );

    sections.forEach((section, i) => {
      if (i > 0) observer.observe(section);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
