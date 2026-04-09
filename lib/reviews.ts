export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    author: "María González",
    rating: 5,
    text: "Una experiencia increíble de principio a fin. El artista entendió exactamente lo que quería y lo llevó a otro nivel. Mi tatuaje es una obra de arte que recibe elogios cada vez que lo muestro.",
    date: "Hace 2 semanas",
  },
  {
    id: 2,
    author: "Carlos Martínez",
    rating: 5,
    text: "Jamás pensé que un tatuaje podría representarme tan perfectamente. La sesión de diseño fue reveladora — encontramos juntos el concepto que nunca hubiera imaginado solo.",
    date: "Hace 1 mes",
  },
  {
    id: 3,
    author: "Valentina Ríos",
    rating: 5,
    text: "El nivel de detalle en el realismo es impresionante. Cada sesión fue cuidadosa, con total dedicación a los detalles. Definitivamente volvería para mi próxima pieza.",
    date: "Hace 1 mes",
  },
  {
    id: 4,
    author: "Andrés López",
    rating: 5,
    text: "No es solo un tatuaje, es una historia plasmada en mi piel. El proceso de diseño fue tan importante como el resultado final. Totalmente profesional y artístico.",
    date: "Hace 2 meses",
  },
  {
    id: 5,
    author: "Daniela Torres",
    rating: 5,
    text: "Buscaba algo único y diferente, y lo encontré aquí. El artista tiene una visión especial para transformar ideas en piezas extraordinarias. Superó todas mis expectativas.",
    date: "Hace 2 meses",
  },
  {
    id: 6,
    author: "Sebastián Vargas",
    rating: 5,
    text: "La atención al cliente es excepcional. Me guió en todo el proceso con paciencia y profesionalismo. El resultado final es simplemente magnífico.",
    date: "Hace 3 meses",
  },
];
