export interface ArtistGalleryItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Artist {
  id: string;
  handle: string;
  displayName: string;
  role: string;
  specialty: string;
  shortTags: string[];
  watermark: string;
  bio: string;
  photoBw: string;
  photoColor: string;
  accentDeg: number;
  gallery: ArtistGalleryItem[];
}

const elGringoGallery: ArtistGalleryItem[] = [
  { src: "/images/artists-gallery/el-gringo/el-gringo-01.jpg", alt: "Tatuaje por El Gringo", width: 1206, height: 1600 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-02.jpg", alt: "Tatuaje por El Gringo", width: 1200, height: 1600 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-03.jpg", alt: "Tatuaje por El Gringo", width: 1429, height: 1600 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-04.jpg", alt: "Tatuaje por El Gringo", width: 1440, height: 1591 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-05.jpg", alt: "Tatuaje por El Gringo", width: 1200, height: 1600 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-06.jpg", alt: "Tatuaje por El Gringo", width: 1200, height: 1600 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-07.jpg", alt: "Tatuaje por El Gringo", width: 1200, height: 1600 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-08.jpg", alt: "Tatuaje por El Gringo", width: 1200, height: 1600 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-09.jpg", alt: "Diseño por El Gringo", width: 1080, height: 1350 },
  { src: "/images/artists-gallery/el-gringo/el-gringo-10.jpg", alt: "Diseño por El Gringo", width: 1080, height: 1350 },
];

const doblemmeGallery: ArtistGalleryItem[] = [
  { src: "/images/artists-gallery/doblemme/doblemme-01.jpg", alt: "Tatuaje por Doblemme", width: 900, height: 1600 },
  { src: "/images/artists-gallery/doblemme/doblemme-02.jpg", alt: "Tatuaje por Doblemme", width: 1115, height: 1600 },
  { src: "/images/artists-gallery/doblemme/doblemme-03.jpg", alt: "Tatuaje por Doblemme", width: 900, height: 1600 },
  { src: "/images/artists-gallery/doblemme/doblemme-04.jpg", alt: "Tatuaje por Doblemme", width: 900, height: 1600 },
  { src: "/images/artists-gallery/doblemme/doblemme-05.jpg", alt: "Tatuaje por Doblemme", width: 900, height: 1600 },
  { src: "/images/artists-gallery/doblemme/doblemme-06.jpg", alt: "Tatuaje por Doblemme", width: 900, height: 1600 },
  { src: "/images/artists-gallery/doblemme/doblemme-07.jpg", alt: "Tatuaje por Doblemme", width: 900, height: 1600 },
  { src: "/images/artists-gallery/doblemme/doblemme-08.jpg", alt: "Tatuaje por Doblemme", width: 900, height: 1600 },
];

const manenGallery: ArtistGalleryItem[] = [
  { src: "/images/artists-gallery/manen-tatts/manen-tatts-01.jpg", alt: "Tatuaje por Manen Tatts", width: 1200, height: 1600 },
  { src: "/images/artists-gallery/manen-tatts/manen-tatts-02.jpg", alt: "Tatuaje por Manen Tatts", width: 844, height: 1600 },
  { src: "/images/artists-gallery/manen-tatts/manen-tatts-03.jpg", alt: "Tatuaje por Manen Tatts", width: 1180, height: 1600 },
  { src: "/images/artists-gallery/manen-tatts/manen-tatts-04.jpg", alt: "Tatuaje por Manen Tatts", width: 1200, height: 1600 },
  { src: "/images/artists-gallery/manen-tatts/manen-tatts-05.jpg", alt: "Tatuaje por Manen Tatts", width: 900, height: 1600 },
  { src: "/images/artists-gallery/manen-tatts/manen-tatts-06.jpg", alt: "Tatuaje por Manen Tatts", width: 900, height: 1600 },
];

const nxnGallery: ArtistGalleryItem[] = [
  { src: "/images/artists-gallery/nxn-tatuero/nxn-tatuero-01.jpg", alt: "Tatuaje por Nxn Tatuero", width: 1199, height: 1600 },
  { src: "/images/artists-gallery/nxn-tatuero/nxn-tatuero-02.jpg", alt: "Tatuaje por Nxn Tatuero", width: 1200, height: 1600 },
  { src: "/images/artists-gallery/nxn-tatuero/nxn-tatuero-03.jpg", alt: "Tatuaje por Nxn Tatuero", width: 900, height: 1600 },
  { src: "/images/artists-gallery/nxn-tatuero/nxn-tatuero-04.jpg", alt: "Tatuaje por Nxn Tatuero", width: 901, height: 1600 },
  { src: "/images/artists-gallery/nxn-tatuero/nxn-tatuero-05.jpg", alt: "Tatuaje por Nxn Tatuero", width: 900, height: 1600 },
  { src: "/images/artists-gallery/nxn-tatuero/nxn-tatuero-06.jpg", alt: "Tatuaje por Nxn Tatuero", width: 900, height: 1600 },
];

export const artists: Artist[] = [
  {
    id: "el-gringo",
    handle: "ALESTILOGRINGO",
    displayName: "EL GRINGO",
    role: "Fundador · Tatuador Principal",
    specialty: "Realismo y Diseño de Autor",
    shortTags: ["Realismo", "Diseño de Autor", "Exclusividad"],
    watermark: "Realismo",
    bio: "Con cinco años de trayectoria transformando ideas en piel, su trabajo se define por la precisión técnica y la fidelidad absoluta al detalle. No cree en las piezas de catálogo: cada proyecto es una obra única, diseñada específicamente para quien la porta. Trabaja bajo un esquema de exclusividad para asegurar que cada cliente reciba la dedicación y el tiempo que una pieza de realismo de alto nivel exige.",
    photoBw: "/images/artists/gringo-bw.jpg",
    photoColor: "/images/artists/gringo-color.jpg",
    accentDeg: 135,
    gallery: elGringoGallery,
  },
  {
    id: "doblemme",
    handle: "DOBLEMME",
    displayName: "DOBLEMME",
    role: "Ilustración de Autor",
    specialty: "Estilo de Autor · Ilustración",
    shortTags: ["Ilustración", "Líneas finas", "Trazo grueso"],
    watermark: "Ilustración",
    bio: "Doblemme traslada su universo de ilustración propia directamente a la piel a través de un estilo de autor único. Su técnica se define por un juego de contrastes entre líneas finas y trazos gruesos. Con un enfoque 100% personalizado, desarrolla piezas exclusivas que se adaptan a cualquier escala, desde detalles mínimos hasta proyectos de gran formato con una identidad visual inconfundible.",
    photoBw: "/images/artists/doblemme-bw.jpg",
    photoColor: "/images/artists/doblemme-color.jpg",
    accentDeg: 200,
    gallery: doblemmeGallery,
  },
  {
    id: "manen-tatts",
    handle: "MANEN.TATTS",
    displayName: "MANEN TATTS",
    role: "Botánica · Color · Fine Line",
    specialty: "Botánica, Color y Fine Line",
    shortTags: ["Botánica", "Color", "Fine Line"],
    watermark: "Color",
    bio: "Artista cuya formación como actriz le otorga una sensibilidad especial para entender el movimiento y la expresión. Se especializa en diseños botánicos personalizados que destacan por su trazado fino, sombras sutiles, colores y una adaptación perfecta a la anatomía, resaltando la belleza natural a través del detalle.",
    photoBw: "/images/artists/manen-bw.jpg",
    photoColor: "/images/artists/manen-color.jpg",
    accentDeg: 65,
    gallery: manenGallery,
  },
  {
    id: "nxn-tatuero",
    handle: "NXN.TATUERO",
    displayName: "NXN TATUERO",
    role: "Blackwork · Whipshading",
    specialty: "Blackwork y Whipshading",
    shortTags: ["Blackwork", "Whipshading", "Lettering"],
    watermark: "Blackwork",
    bio: "Nico domina la precisión del blackwork y la textura única del whipshading. Sus piezas destacan por la fusión de agujas finas y un detallismo meticuloso, creando composiciones sólidas donde el lettering urbano y las sombras dinámicas definen una estética ruda y pulida.",
    photoBw: "/images/artists/nxn-bw.jpg",
    photoColor: "/images/artists/nxn-color.jpg",
    accentDeg: 300,
    gallery: nxnGallery,
  },
];
