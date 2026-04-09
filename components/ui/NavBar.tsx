"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Galería", href: "#portfolio" },
  { label: "El Estudio", href: "#solution" },
  { label: "Reseñas", href: "#reviews" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="font-display text-2xl text-white tracking-widest">
            AL ESTILO
            <span className="text-pink-miami">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="px-5 py-2 bg-pink-miami text-white text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-pink-light transition-colors duration-200"
            >
              Reservar
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-all"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black-deep flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="font-display text-5xl text-white tracking-widest hover:text-pink-miami transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#booking"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: navLinks.length * 0.07 + 0.1, duration: 0.4 }}
              className="mt-4 px-8 py-3 bg-pink-miami text-white font-display text-2xl tracking-widest uppercase rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              Reservar
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
