export interface GalleryItem {
  src: string;
  alt: string;
  category: "realism" | "blackwork" | "micro" | "studio";
  width: number;
  height: number;
}

export const galleryItems: GalleryItem[] = [
  // Large tattoos - realism/blackwork
  {
    src: "/images/tattoos/197170EC-7664-46C7-9BA4-87CD6E6C96A9.jpg",
    alt: "Tatuaje de realismo",
    category: "realism",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/1EF16A9F-1BFC-459E-A685-75F162521517.JPG",
    alt: "Pieza grande de realismo",
    category: "realism",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/4D4116D1-B328-4B64-B822-025910C5A725_Original.JPG",
    alt: "Tatuaje artístico",
    category: "blackwork",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/5B730783-F6AB-43D4-B2FA-D6EB3C42B7DC.JPG",
    alt: "Black work exclusivo",
    category: "blackwork",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/60C465AF-B2EC-43BA-8819-6D9A3444917A.jpg",
    alt: "Tatuaje de lujo",
    category: "realism",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/85844985-620A-4AD1-97AA-545A92C9E785.JPG",
    alt: "Arte en la piel",
    category: "realism",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/9593EF33-4200-4882-937E-DA12CE217516_Original.JPG",
    alt: "Pieza de realismo",
    category: "realism",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/A13FD5F4-69B3-4E6B-B953-C8045D431134.jpg",
    alt: "Tatuaje exclusivo",
    category: "blackwork",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/BD47CD33-0365-43CF-9B1A-99CB64BC07F5.JPG",
    alt: "Obra de arte",
    category: "realism",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/C02AE173-16A7-44D1-8B6A-63D9313A09C9.jpg",
    alt: "Tatuaje artístico",
    category: "blackwork",
    width: 800,
    height: 1000,
  },
  {
    src: "/images/tattoos/FC7A6151-44CD-4A1B-A88F-253CC6CD60C6_Original.JPG",
    alt: "Pieza grande",
    category: "realism",
    width: 800,
    height: 1000,
  },
  // Design previews
  {
    src: "/images/tattoos/Tatuajes de lujo - 4.png",
    alt: "Diseño de lujo",
    category: "realism",
    width: 800,
    height: 800,
  },
  {
    src: "/images/tattoos/Untitled design - 1.png",
    alt: "Diseño exclusivo",
    category: "blackwork",
    width: 800,
    height: 800,
  },
  {
    src: "/images/tattoos/Untitled design - 2.png",
    alt: "Arte corporal",
    category: "blackwork",
    width: 800,
    height: 800,
  },
  // Micro realism
  {
    src: "/images/micro/06DCDAFE-4EF0-49C4-BF5E-AC43DB7165A9.JPG",
    alt: "Micro realismo",
    category: "micro",
    width: 600,
    height: 800,
  },
  {
    src: "/images/micro/9B2654BF-58CE-4709-BBA2-D8074D5C6C96.JPG",
    alt: "Micro realismo detallado",
    category: "micro",
    width: 600,
    height: 800,
  },
  // Studio
  {
    src: "/images/studio/IMG_3514.jpg",
    alt: "El estudio",
    category: "studio",
    width: 800,
    height: 600,
  },
  {
    src: "/images/studio/IMG_4784.jpg",
    alt: "Ambiente del estudio",
    category: "studio",
    width: 800,
    height: 600,
  },
  {
    src: "/images/studio/IMG_5953.jpg",
    alt: "Espacio de trabajo",
    category: "studio",
    width: 800,
    height: 600,
  },
  {
    src: "/images/studio/IMG_5954.jpg",
    alt: "El artista en acción",
    category: "studio",
    width: 800,
    height: 600,
  },
  {
    src: "/images/studio/Tatuajes de lujo - 1.png",
    alt: "Tatuaje de lujo",
    category: "realism",
    width: 800,
    height: 800,
  },
];

export type GalleryCategory = "all" | "realism" | "blackwork" | "micro" | "studio";

export const categoryLabels: Record<GalleryCategory, string> = {
  all: "Todo",
  realism: "Realismo",
  blackwork: "Black Work",
  micro: "Micro",
  studio: "Estudio",
};
