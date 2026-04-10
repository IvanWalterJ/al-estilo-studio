"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
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

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function IconRealism() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="12" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function IconBlackwork() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <polygon points="16,4 28,10 28,22 16,28 4,22 4,10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="16,9 23,12.5 23,19.5 16,23 9,19.5 9,12.5" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
      <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="4" y1="10" x2="28" y2="22" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="28" y1="10" x2="4" y2="22" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    </svg>
  );
}

function IconWatercolor() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 6 C 10 10, 6 14, 6 18 C 6 23, 10.5 27, 16 27 C 21.5 27, 26 23, 26 18 C 26 14, 22 10, 16 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 18 C 12 15, 14 13, 16 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <circle cx="22" cy="9" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="10" cy="11" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function IconGeometric() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <polygon points="16,4 28,28 4,28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="16,11 23,28 9,28" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
      <line x1="16" y1="4" x2="16" y2="28" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
    </svg>
  );
}

function IconOther() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 6 L18.5 13.5 L26 16 L18.5 18.5 L16 26 L13.5 18.5 L6 16 L13.5 13.5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconSmall() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconMedium() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function IconLarge() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function IconSleeve() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <rect x="10" y="4" width="12" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="10" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <line x1="10" y1="22" x2="22" y2="22" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
    </svg>
  );
}

function IconFirstYes() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 6 L18 11 L23 11 L19 14.5 L20.5 20 L16 17 L11.5 20 L13 14.5 L9 11 L14 11 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconFirstNo() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M8 20 C 8 14, 12 10, 16 8 C 20 10, 24 14, 24 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 23 C 11 21, 13 19, 16 19 C 19 19, 21 21, 21 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="26" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconFire() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 28 C 10 28, 7 23, 7 19 C 7 15, 10 12, 13 10 C 12 14, 14 15, 14 15 C 14 12, 16 9, 19 7 C 18 11, 20 13, 21 16 C 22 14, 22 12, 21 10 C 24 13, 25 16, 25 19 C 25 23, 22 28, 16 28Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <rect x="5" y="8" width="22" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="14" x2="27" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="5" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="5" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="21" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="21" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconHourglass() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M10 5 H22 L16 16 L22 27 H10 L16 16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="10" y1="5" x2="22" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="27" x2="22" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M4 16 C 8 10, 12 7, 16 7 C 20 7, 24 10, 28 16 C 24 22, 20 25, 16 25 C 12 25, 8 22, 4 16Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Step definitions ────────────────────────────────────────────────────────

type OptionItem = {
  value: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
};

const STEP_STYLE: OptionItem[] = [
  { value: "Realismo / Micro-realismo", label: "Realismo", sublabel: "Micro-realismo", icon: <IconRealism /> },
  { value: "Blackwork / Linework", label: "Blackwork", sublabel: "Linework", icon: <IconBlackwork /> },
  { value: "Acuarela", label: "Acuarela", icon: <IconWatercolor /> },
  { value: "Geométrico", label: "Geométrico", icon: <IconGeometric /> },
  { value: "Otro estilo", label: "Otro", icon: <IconOther /> },
];

const STEP_SIZE: OptionItem[] = [
  { value: "Pequeño (hasta 5cm)", label: "Pequeño", sublabel: "hasta 5 cm", icon: <IconSmall /> },
  { value: "Mediano (5-15cm)", label: "Mediano", sublabel: "5 – 15 cm", icon: <IconMedium /> },
  { value: "Grande (15cm+)", label: "Grande", sublabel: "15 cm+", icon: <IconLarge /> },
  { value: "Manga / Proyecto largo", label: "Manga", sublabel: "proyecto largo", icon: <IconSleeve /> },
];

const STEP_FIRST: OptionItem[] = [
  { value: "Sí, es mi primer tatuaje", label: "Sí", sublabel: "primer tatuaje", icon: <IconFirstYes /> },
  { value: "No, ya tengo tatuajes", label: "No", sublabel: "ya tengo tatuajes", icon: <IconFirstNo /> },
];

const STEP_TIMELINE: OptionItem[] = [
  { value: "Lo antes posible", label: "Lo antes posible", icon: <IconFire /> },
  { value: "Próximo mes", label: "Próximo mes", icon: <IconCalendar /> },
  { value: "En 2-3 meses", label: "En 2-3 meses", icon: <IconHourglass /> },
  { value: "Solo explorando", label: "Solo explorando", icon: <IconEye /> },
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
  enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: easeOut } },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0, transition: { duration: 0.22, ease: easeOut } }),
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
};

// ─── OptionCards ─────────────────────────────────────────────────────────────

interface OptionCardsProps {
  options: OptionItem[];
  selected: string;
  onSelect: (value: string) => void;
}

function OptionCards({ options, selected, onSelect }: OptionCardsProps) {
  const cols = options.length === 2 ? "grid-cols-2" : "grid-cols-2";

  return (
    <motion.div
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
      className={`grid ${cols} gap-3`}
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
            className={`relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border text-center transition-all duration-200 ${
              isSelected
                ? "border-pink-miami bg-pink-miami/10 ring-1 ring-pink-miami/30"
                : "border-white/8 bg-white/4 hover:border-white/20 hover:bg-white/6"
            }`}
          >
            <span className={`transition-colors duration-200 ${isSelected ? "text-pink-miami" : "text-white/45"}`}>
              {opt.icon}
            </span>
            <div>
              <p className={`text-sm font-semibold tracking-wide leading-tight ${isSelected ? "text-white" : "text-white/70"}`}>
                {opt.label}
              </p>
              {opt.sublabel && (
                <p className={`text-[11px] mt-0.5 ${isSelected ? "text-pink-miami/80" : "text-white/30"}`}>
                  {opt.sublabel}
                </p>
              )}
            </div>

            {/* Selected checkmark */}
            <AnimatePresence>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute top-2 right-2 w-4 h-4 rounded-full bg-pink-miami flex items-center justify-center"
                >
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

// ─── ContactStep ─────────────────────────────────────────────────────────────

interface ContactStepProps {
  answers: BookingAnswers;
  status: "idle" | "submitting" | "success" | "error";
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof BookingAnswers, value: string) => void;
}

function ContactStep({ answers, status, onSubmit, onChange }: ContactStepProps) {
  const inputClass =
    "w-full bg-white/5 border border-white/10 focus:border-pink-miami rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none transition-colors duration-200 focus:ring-1 focus:ring-pink-miami/30 text-sm";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="nombre" className="block text-white/40 text-[11px] tracking-[0.15em] uppercase mb-2">
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
        <label htmlFor="email" className="block text-white/40 text-[11px] tracking-[0.15em] uppercase mb-2">
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
        <label htmlFor="telefono" className="block text-white/40 text-[11px] tracking-[0.15em] uppercase mb-2">
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
        <p className="text-red-400 text-xs text-center bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3">
          Algo salió mal. Intentá de nuevo o escribinos por WhatsApp.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-2 w-full py-4 bg-pink-miami text-white font-semibold tracking-widest uppercase text-sm rounded-2xl hover:bg-pink-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: "0 0 28px rgba(247,37,133,0.25), 0 0 56px rgba(247,37,133,0.08)" }}
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

// ─── SuccessScreen ────────────────────────────────────────────────────────────

function SuccessScreen() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20agendar%20mi%20consulta%20de%20dise%C3%B1o`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className="flex flex-col items-center text-center gap-6 py-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-pink-miami/15 flex items-center justify-center border border-pink-miami/20"
        style={{ boxShadow: "0 0 40px rgba(247,37,133,0.2)" }}
      >
        <svg className="w-10 h-10 text-pink-miami" fill="none" viewBox="0 0 24 24">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            stroke="currentColor"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        <h3 className="font-display text-3xl text-white tracking-wide mb-3">¡LISTO!</h3>
        <p className="text-white/55 text-sm leading-relaxed max-w-xs">
          Recibimos tus datos. Ahora elegí tu horario o escribinos directo por WhatsApp.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.45 }}
        className="flex flex-col gap-3 w-full"
      >
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 bg-pink-miami text-white text-center font-semibold tracking-widest uppercase text-sm rounded-2xl hover:bg-pink-light transition-colors duration-200"
          style={{ boxShadow: "0 0 28px rgba(247,37,133,0.25)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Elegir horario en Calendly
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 border border-white/10 text-white text-center font-semibold tracking-widest uppercase text-sm rounded-2xl hover:border-green-400 hover:text-green-400 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Escribir por WhatsApp
        </a>
      </motion.div>
    </motion.div>
  );
}

// ─── BookingForm ──────────────────────────────────────────────────────────────

export function BookingForm() {
  const { state, nextStep, prevStep, setStatus } = useBookingModal();
  const { currentStep, answers, status } = state;
  const [direction, setDirection] = useState(1);
  const [localAnswers, setLocalAnswers] = useState<BookingAnswers>(answers);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOptionSelect = (field: keyof BookingAnswers, value: string) => {
    setLocalAnswers((prev) => ({ ...prev, [field]: value }));

    if (advanceTimer.current) clearTimeout(advanceTimer.current);

    advanceTimer.current = setTimeout(() => {
      setDirection(1);
      nextStep({ [field]: value });
    }, 280);
  };

  const handleContactChange = (field: keyof BookingAnswers, value: string) => {
    setLocalAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDirection(-1);
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
      <div className="mb-7 pr-8">
        <p className="text-pink-miami text-[11px] tracking-[0.22em] uppercase font-medium mb-1.5">
          Al Estilo Studio
        </p>
        <h2 className="font-display text-[2rem] text-white tracking-wide leading-none">
          RESERVAR CONSULTA
        </h2>
      </div>

      {status !== "success" && (
        /* Progress dots */
        <div
          className="flex items-center justify-center gap-2 mb-7"
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemax={TOTAL_STEPS}
          aria-label={`Paso ${currentStep + 1} de ${TOTAL_STEPS}`}
        >
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === currentStep ? 1.3 : 1,
                backgroundColor:
                  i < currentStep
                    ? "rgba(247,37,133,0.45)"
                    : i === currentStep
                    ? "#F72585"
                    : "rgba(255,255,255,0.12)",
                boxShadow: i === currentStep ? "0 0 8px rgba(247,37,133,0.5)" : "none",
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>
      )}

      {/* Back button */}
      {currentStep > 0 && status !== "success" && (
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-white/35 hover:text-white/70 text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 mb-5"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Atrás
        </button>
      )}

      {/* Step content */}
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
                <h3 className="text-white text-lg font-semibold mb-5 leading-snug">
                  {stepMeta.question}
                </h3>
                <OptionCards
                  options={stepMeta.options}
                  selected={localAnswers[stepMeta.answerKey]}
                  onSelect={(value) => handleOptionSelect(stepMeta.answerKey, value)}
                />
              </div>
            ) : (
              <div>
                <h3 className="text-white text-lg font-semibold mb-5 leading-snug">
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
