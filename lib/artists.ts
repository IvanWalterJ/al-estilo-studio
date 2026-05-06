export interface Artist {
  id: string;
  handle: string;
  displayName: string;
  role: string;
  specialty: string;
  shortTags: string[];
  bio: string;
  imagePath?: string;
  accentDeg: number;
}

export const artists: Artist[] = [
  {
    id: "el-gringo",
    handle: "ALESTILOGRINGO",
    displayName: "EL GRINGO",
    role: "Fundador · Tatuador Principal",
    specialty: "Realismo y Diseño de Autor",
    shortTags: ["Realismo", "Diseño de Autor", "Exclusividad"],
    bio: "Con cinco años de trayectoria transformando ideas en piel, su trabajo se define por la precisión técnica y la fidelidad absoluta al detalle. No cree en las piezas de catálogo: cada proyecto es una obra única, diseñada específicamente para quien la porta. Trabaja bajo un esquema de exclusividad para asegurar que cada cliente reciba la dedicación y el tiempo que una pieza de realismo de alto nivel exige.",
    accentDeg: 135,
  },
  {
    id: "doblemme",
    handle: "DOBLEMME",
    displayName: "DOBLEMME",
    role: "Ilustración de Autor",
    specialty: "Estilo de Autor · Ilustración",
    shortTags: ["Ilustración", "Líneas finas", "Trazo grueso"],
    bio: "Doblemme traslada su universo de ilustración propia directamente a la piel a través de un estilo de autor único. Su técnica se define por un juego de contrastes entre líneas finas y trazos gruesos. Con un enfoque 100% personalizado, desarrolla piezas exclusivas que se adaptan a cualquier escala, desde detalles mínimos hasta proyectos de gran formato con una identidad visual inconfundible.",
    accentDeg: 200,
  },
  {
    id: "manen-tatts",
    handle: "MANEN.TATTS",
    displayName: "MANEN TATTS",
    role: "Botánica · Color · Fine Line",
    specialty: "Botánica, Color y Fine Line",
    shortTags: ["Botánica", "Color", "Fine Line"],
    bio: "Artista cuya formación como actriz le otorga una sensibilidad especial para entender el movimiento y la expresión. Se especializa en diseños botánicos personalizados que destacan por su trazado fino, sombras sutiles, colores y una adaptación perfecta a la anatomía, resaltando la belleza natural a través del detalle.",
    accentDeg: 65,
  },
  {
    id: "nxn-tatuero",
    handle: "NXN.TATUERO",
    displayName: "NXN TATUERO",
    role: "Blackwork · Whipshading",
    specialty: "Blackwork y Whipshading",
    shortTags: ["Blackwork", "Whipshading", "Lettering"],
    bio: "Nico domina la precisión del blackwork y la textura única del whipshading. Sus piezas destacan por la fusión de agujas finas y un detallismo meticuloso, creando composiciones sólidas donde el lettering urbano y las sombras dinámicas definen una estética ruda y pulida.",
    accentDeg: 300,
  },
];
