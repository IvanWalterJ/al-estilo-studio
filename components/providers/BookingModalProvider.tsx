"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

export type BookingAnswers = {
  style: string;
  size: string;
  firstTattoo: string;
  timeline: string;
  nombre: string;
  email: string;
  telefono: string;
};

type ModalStatus = "idle" | "submitting" | "success" | "error";

type ModalState = {
  isOpen: boolean;
  currentStep: number;
  answers: BookingAnswers;
  status: ModalStatus;
};

type ModalAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "NEXT_STEP"; payload: Partial<BookingAnswers> }
  | { type: "PREV_STEP" }
  | { type: "SET_STATUS"; payload: ModalStatus }
  | { type: "RESET" };

const initialAnswers: BookingAnswers = {
  style: "",
  size: "",
  firstTattoo: "",
  timeline: "",
  nombre: "",
  email: "",
  telefono: "",
};

const initialState: ModalState = {
  isOpen: false,
  currentStep: 0,
  answers: initialAnswers,
  status: "idle",
};

function reducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1,
        answers: { ...state.answers, ...action.payload },
      };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

type ModalContextValue = {
  state: ModalState;
  openModal: () => void;
  closeModal: () => void;
  nextStep: (answers: Partial<BookingAnswers>) => void;
  prevStep: () => void;
  setStatus: (status: ModalStatus) => void;
};

const BookingModalContext = createContext<ModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = useCallback(() => dispatch({ type: "OPEN" }), []);

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE" });
    // Reset after exit animation completes
    setTimeout(() => dispatch({ type: "RESET" }), 400);
  }, []);

  const nextStep = useCallback((answers: Partial<BookingAnswers>) => {
    dispatch({ type: "NEXT_STEP", payload: answers });
  }, []);

  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);

  const setStatus = useCallback(
    (status: ModalStatus) => dispatch({ type: "SET_STATUS", payload: status }),
    []
  );

  return (
    <BookingModalContext.Provider
      value={{ state, openModal, closeModal, nextStep, prevStep, setStatus }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): ModalContextValue {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used inside BookingModalProvider");
  }
  return ctx;
}
