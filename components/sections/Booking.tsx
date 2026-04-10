"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stagger, fadeUp, slideLeft, slideRight } from "@/lib/animations";
import { useBookingModal } from "@/components/providers/BookingModalProvider";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "50000000000";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com/alestiloestudio";

export function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openModal } = useBookingModal();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20agendar%20mi%20consulta%20de%20dise%C3%B1o`;

  return (
    <section
      id="booking"
      className="relative bg-black-deep py-24 md:py-36 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(247,37,133,0.12) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={slideLeft}
              className="font-display text-5xl md:text-7xl text-white tracking-wide leading-none mb-8"
            >
              RESERVA TU
              <br />
              <span className="text-gradient-pink">CONSULTA</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg leading-relaxed mb-6"
            >
              Una sesión presencial de 30 minutos en el estudio para crear el
              diseño inicial. Discutimos ideas, referencias, tamaños y
              ubicación.
            </motion.p>
            <motion.ul
              variants={stagger}
              className="flex flex-col gap-3 mb-10"
            >
              {[
                "Sesión de diseño personalizada",
                "Boceto inicial incluido",
                "Sin compromiso inmediato",
                "Presupuesto detallado",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-white/70"
                >
                  <span className="w-5 h-5 rounded-full bg-pink-miami/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-miami text-xs">✓</span>
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/40 hover:text-pink-miami transition-colors text-sm tracking-widest uppercase"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
            </motion.div>
          </motion.div>

          {/* Right: booking options */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-5"
          >
            {/* Calendly CTA */}
            <div className="glass-dark rounded-3xl p-8 border border-pink-miami/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-miami/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-miami" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Agendar Online</p>
                  <p className="text-white/40 text-xs">Selecciona tu horario</p>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-6">
                Reserva directamente en nuestro calendario. Sesiones de consulta
                de 30 minutos en el estudio.
              </p>
              <button
                onClick={openModal}
                className="block w-full py-4 bg-pink-miami text-white text-center font-semibold tracking-widest uppercase text-sm rounded-2xl hover:bg-pink-light transition-colors duration-200 glow-pink"
              >
                Reservar Consulta →
              </button>
            </div>

            {/* WhatsApp option */}
            <div className="glass-dark rounded-3xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">WhatsApp</p>
                  <p className="text-white/40 text-xs">Respuesta inmediata</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 border border-white/10 text-white text-center font-semibold tracking-widest uppercase text-sm rounded-2xl hover:border-green-400 hover:text-green-400 transition-colors duration-200"
              >
                Escribir por WhatsApp →
              </a>
            </div>

            {/* Pricing note */}
            <p className="text-white/30 text-xs text-center tracking-wide">
              Cada tatuaje tiene un precio único porque cada pieza es única.
              <br />
              El presupuesto detallado se entrega en la consulta.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
