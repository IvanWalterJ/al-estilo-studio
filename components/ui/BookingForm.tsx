"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useBookingModal,
  type BookingAnswers,
} from "@/components/providers/BookingModalProvider";

// ─── Constants ───────────────────────────────────────────────────────────────

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/alestiloestudio/consulta";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "50000000000";

const TOTAL_STEPS = 5;

// ─── Step definitions ────────────────────────────────────────────────────────

type OptionItem = { value: string; label: string; emoji?: string };

const STEP_STYLE: OptionItem[] = [
  { value: "Realismo / Micro-realismo", label: "Realismo", emoji: "🎨" },
  { value: "Blackwork / Linework", label: "Blackwork", emoji: "⬛" },
  { value: "Acuarela", label: "Acuarela", emoji: "💧" },
  { value: "Geométrico", label: "Geométrico", emoji: "◆" },
  { value: "Otro", label: "Otro", emoji: "✦" },
];

const STEP_SIZE: OptionItem[] = [
  { value: "Pequeño (hasta 5cm)", label: "Pequeño", emoji: "·" },
  { value: "Mediano (5-15cm)", label: "Mediano", emoji: "◉" },
  { value: "Grande (15cm+)", label: "Grande", emoji: "●" },
  { value: "Manga / Proyecto largo", label: "Manga", emoji: "▬" },
];

const STEP_FIRST: OptionItem[] = [
  { value: "Sí, es mi primer tatuaje", label: "Sí", emoji: "✨" },
  { value: "No, ya tengo tatuajes", label: "No, ya tengo", emoji: "🖤" },
];

const STEP_TIMELINE: OptionItem[] = [
  { value: "Lo antes posible", label: "Lo antes posible", emoji: "🔥" },
  { value: "Próximo mes", label: "Próximo mes", emoji: "📅" },
  { value: "En 2-3 meses", label: "En 2-3 meses", emoji: "⏳" },
  { value: "Solo explorando", label: "Solo explorando", emoji: "👀" },
];

const STEP_META = [
  { question: "¿Qué estilo te interesa?", answerKey: "style" as keyof BookingAnswers, options: STEP_STYLE },
  { question: "¿Qué tamaño estás pensando?", answerKey: "size" as keyof BookingAnswers, options: STEP_SIZE },
  { question: "¿Es tu primer tatuaje?", answerKey: "firstTattoo" as keyof BookingAnswers, options: STEP_FIRST },
  { question: "¿Cuándo te gustaría hacerlo?", answerKey: "timeline" as keyof BookingAnswers, options: STEP_TIMELINE },
];

// ─── Animations ──────────────────────────────────────────────────────────────

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const stepVariants = {
  enter: (dir: number) => ({
    x: dir * 60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: easeOut },
  },
  exit: (dir: number) => ({
    x: dir * -60,
    opacity: 0,
    transition: { duration: 0.22, ease: easeOut },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressDots({ current }: { current: number }) {
  return (
    <div
      className="flex items-center justify-center gap-2 mb-8"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemax={TOTAL_STEPS}
      aria-label={`Paso ${current + 1} de ${TOTAL_STEPS}`}
    >
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: i === current ? 1.25 : 1,
            backgroundColor:
              i < current
                ? "rgba(247,37,133,0.5)"
                : i === current
                ? "#F72585"
                : "rgba(255,255,255,0.15)",
            boxShadow:
              i === current
                ? "0 0 10px rgba(247,37,133,0.6)"
                : "none",
          }}
          transition={{ duration: 0.3 }}
          className="w-2 h-2 rounded-full"
        />
      ))}
    </div>
  );
}

interface OptionCardsProps {
  options: OptionItem[];
  selected: string;
  onSelect: (value: string) => void;
  columns?: 2 | 3;
}

function OptionCards({ options, selected, onSelect, columns = 2 }: OptionCardsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid gap-3 ${
        columns === 3 ? "grid-cols-3" : "grid-cols-2"
      } ${options.length === 5 ? "grid-cols-2 sm:grid-cols-3" : ""}`}
    >
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <motion.button
            key={opt.value}
            variants={cardVariants}
            onClick={() => onSelect(opt.value)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border text-center transition-colors duration-200 ${
              isSelected
                ? "border-pink-miami bg-pink-miami/10 ring-1 ring-pink-miami/40"
                : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8"
            }`}
          >
            {opt.emoji && (
              <span className="text-2xl" aria-hidden="true">
                {opt.emoji}
              </span>
            )}
            <span
              className={`text-sm font-medium tracking-wide ${
                isSelected ? "text-white" : "text-white/70"
              }`}
            >
              {opt.label}
            </span>
            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-4 h-4 rounded-full bg-pink-miami flex items-center justify-center text-[10px] text-white font-bold"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

// ─── Contact step ────────────────────────────────────────────────────────────

interface ContactStepProps {
  answers: BookingAnswers;
  status: "idle" | "submitting" | "success" | "error";
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof BookingAnswers, value: string) => void;
}

function ContactStep({ answers, status, onSubmit, onChange }: ContactStepProps) {
  const inputClass =
    "w-full bg-white/5 border border-white/10 focus:border-pink-miami rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:ring-1 focus:ring-pink-miami/40 text-sm";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="nombre" className="block text-white/50 text-xs tracking-widest uppercase mb-2">
          Nombre *
        </label>
        <input
          id="nombre"
          type="text"
          required
          autoComplete="name"
          placeholder="Tu nombre completo"
          value={answers.nombre}
          onChange={(e) => onChange("nombre", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-white/50 text-xs tracking-widest uppercase mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          value={answers.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="telefono" className="block text-white/50 text-xs tracking-widest uppercase mb-2">
          Teléfono
        </label>
        <input
          id="telefono"
          type="tel"
          autoComplete="tel"
          placeholder="+54 9 11 0000-0000"
          value={answers.telefono}
          onChange={(e) => onChange("telefono", e.target.value)}
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center bg-red-400/10 rounded-xl px-4 py-3">
          Algo salió mal. Intentá de nuevo o escribinos por WhatsApp.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 w-full py-4 bg-pink-miami text-white font-semibold tracking-widest uppercase text-sm rounded-2xl hover:bg-pink-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ boxShadow: "0 0 30px rgba(247,37,133,0.3), 0 0 60px rgba(247,37,133,0.1)" }}
        aria-busy={status === "submitting"}
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </span>
        ) : (
          "Confirmar Consulta →"
        )}
      </motion.button>
    </form>
  );
}

// ─── Success screen ──────────────────────────────────────────────────────────

function SuccessScreen() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20agendar%20mi%20consulta%20de%20dise%C3%B1o`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center gap-6 py-4"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-pink-miami/20 flex items-center justify-center"
        style={{ boxShadow: "0 0 40px rgba(247,37,133,0.3)" }}
      >
        <svg className="w-10 h-10 text-pink-miami" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="font-display text-3xl text-white tracking-wide mb-3">
          ¡LISTO!
        </h3>
        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
          Recibimos tus datos. Ahora elegí tu horario o escribinos directo por WhatsApp.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col gap-3 w-full"
      >
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 bg-pink-miami text-white text-center font-semibold tracking-widest uppercase text-sm rounded-2xl hover:bg-pink-light transition-colors duration-200"
          style={{ boxShadow: "0 0 30px rgba(247,37,133,0.3)" }}
        >
          Reservar horario →
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 border border-white/10 text-white text-center font-semibold tracking-widest uppercase text-sm rounded-2xl hover:border-green-400 hover:text-green-400 transition-colors duration-200"
        >
          Escribir por WhatsApp →
        </a>
      </motion.div>
    </motion.div>
  );
}

// ─── Main BookingForm ─────────────────────────────────────────────────────────

export function BookingForm() {
  const { state, nextStep, prevStep, setStatus } = useBookingModal();
  const { currentStep, answers, status } = state;
  const [direction, setDirection] = useState(1);
  const [localAnswers, setLocalAnswers] = useState<BookingAnswers>(answers);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOptionSelect = (field: keyof BookingAnswers, value: string) => {
    const updated = { ...localAnswers, [field]: value };
    setLocalAnswers(updated);

    // Cancel any pending auto-advance
    if (advanceTimer.current) clearTimeout(advanceTimer.current);

    // Auto-advance after 300ms
    advanceTimer.current = setTimeout(() => {
      setDirection(1);
      nextStep({ [field]: value });
    }, 300);
  };

  const handleContactChange = (field: keyof BookingAnswers, value: string) => {
    setLocalAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDirection(-1);
    // Small delay so direction state is set before transition
    setTimeout(() => prevStep(), 10);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const payload: BookingAnswers = {
      ...answers,
      nombre: localAnswers.nombre,
      email: localAnswers.email,
      telefono: localAnswers.telefono,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const isOptionStep = currentStep < 4;
  const stepMeta = isOptionStep ? STEP_META[currentStep] : null;

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-pink-miami text-xs tracking-[0.2em] uppercase font-medium mb-1">
          Al Estilo Studio
        </p>
        <h2 className="font-display text-3xl text-white tracking-wide">
          RESERVAR CONSULTA
        </h2>
      </div>

      {status !== "success" && <ProgressDots current={currentStep} />}

      {/* Back button */}
      {currentStep > 0 && status !== "success" && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors duration-200 mb-6"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Atrás
        </button>
      )}

      {/* Steps */}
      <AnimatePresence mode="wait" custom={direction}>
        {status === "success" ? (
          <motion.div key="success">
            <SuccessScreen />
          </motion.div>
        ) : (
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {stepMeta ? (
              <div>
                <h3 className="text-white text-xl font-semibold mb-6">
                  {stepMeta.question}
                </h3>
                <OptionCards
                  options={stepMeta.options}
                  selected={localAnswers[stepMeta.answerKey]}
                  onSelect={(value) =>
                    handleOptionSelect(stepMeta.answerKey, value)
                  }
                  columns={stepMeta.options.length === 2 ? 2 : 2}
                />
              </div>
            ) : (
              <div>
                <h3 className="text-white text-xl font-semibold mb-6">
                  Casi listo — ¿cómo te contactamos?
                </h3>
                <ContactStep
                  answers={localAnswers}
                  status={status}
                  onSubmit={handleSubmit}
                  onChange={handleContactChange}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
