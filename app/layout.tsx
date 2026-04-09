import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al Estilo Studio — Tatuajes de Lujo",
  description:
    "Estudio de tatuajes especializado en piezas grandes de realismo y Black Work. Diseño exclusivo, sesiones únicas, resultados que perduran.",
  openGraph: {
    title: "Al Estilo Studio — Tatuajes de Lujo",
    description:
      "Tatuajes de realismo y Black Work. Una obra de arte en tu piel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebas.variable} ${inter.variable}`}
    >
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
