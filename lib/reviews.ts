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
    author: "Constanza Ceparo",
    rating: 5,
    text: "Desde que llegué, me sentí muy bien, me recibieron con mates, el espacio es super luminoso y con olorcito rico. Las y los chicos, muy atentos y empáticos. En Al Estilo te hacen sentir suuuper cómoda/o. El lugar es atendido por el dueño y eso suma muchos puntos, se nota el amor por lo que hace! Mención especial para Meink, mi tatuadora, que me dejó el brazo increíble! Ya voy tatuándome 6 veces con ella. Sigan como vienen, que no tienen techo!",
    date: "Hace 2 meses",
  },
  {
    id: 2,
    author: "Agustina B",
    rating: 5,
    text: "Me hice 4 tatuajes y todo fue excelente. Desde dedicarle el tiempo para hacerlo a mi gusto, escucharme y tenerme paciencia (lo cual valoro un montón!) hasta cómo quedaron los tatuajes, tal cual lo que quería. Gracias Gringo, y a todos los chicos del estudio que son súper divinos.",
    date: "Hace 2 meses",
  },
  {
    id: 3,
    author: "Catalina Gutierrez",
    rating: 5,
    text: "Me llevé 5 tatuajes hermosos, prolijos y super fineline como quería. Un estudio luminoso, lleno de arte y artistas con gran calidad humana. Un placer visitarlos y todos mis próximos tatus serán ahí! Gracias.",
    date: "Hace 2 meses",
  },
  {
    id: 4,
    author: "Mateo Diaz",
    rating: 5,
    text: "Gran estudio y mejores personas las que lo conforman y le dan vida. Viajé un mes a Bariloche y me recibieron como Guest — un placer, un orgullo y un honor haber elegido a Al Estilo para tatuar ahí. Gracias amigos, nos vemos pronto nuevamente.",
    date: "Hace un mes",
  },
  {
    id: 5,
    author: "Vicky Carnevale",
    rating: 5,
    text: "Hermoso estudio, la atención que ofrecen es excelente. Te sentís acompañada y comprendida desde el momento uno y no solo por tu tatuador sino también por el resto de los tatuadores del estudio. Lo recomiendo 100%.",
    date: "Hace 2 meses",
  },
  {
    id: 6,
    author: "Albertina Wanger",
    rating: 5,
    text: "Gracias Male por tu trabajo! Excelente ambiente, me sentí muy cómoda y te regalan caramelos de premiooo por el aguante. Volveré mil veces más.",
    date: "Hace un mes",
  },
  {
    id: 7,
    author: "Pamela Quiñenao",
    rating: 5,
    text: "Excelente experiencia! Manen fue muy amable y profesional, el ambiente es súper agradable y los tatuajes quedaron increíbles. Sin duda volvería, totalmente recomendado.",
    date: "Hace 2 meses",
  },
  {
    id: 8,
    author: "jessica fernandez",
    rating: 5,
    text: "Excelente atención y las chicas un amor. Gracias a Emma por dejar su arte en nuestros brazos. Nosotras felices con nuestras nutrias.",
    date: "Hace 2 meses",
  },
];
