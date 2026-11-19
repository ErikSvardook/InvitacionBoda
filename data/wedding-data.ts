//Fuente única de verdad de la boda
//Si un dato cambia(fecha, lugar, link) se cambia solo aquí
export type Venue = { 
    name: string;
    address: string;
    time: string;
    //null mientras no tengamos el link de Google Maps
    mapsUrl: string | null;
    //Foto del lugar
    image?: string;
    imageAlt?: string;
};

export const couple = {
    groom: "David",
    bride: "Sonia",
} as const;

export const event = {
    /**
     * Fecha y hora del evento en formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ) con zona horaria
     * Cuautitlán Izcalli usa UTC-6 todo el año (desde 2022 ya no hay horario de verano)
     * Apunta al inicio de la ceremonia (5:00 PM), que es cuando arranca el gran día.
     */
    dateIso: "2026-12-28T17:00:00-06:00",
    dateLabel: "28 de diciembre de 2026",
    timeLabel: "5:00 de la tarde",
    city: "Cuautitlán Izcalli, Estado de México"
} as const;

//Partes de la fecha derivadas de dateIso
//Así el día de la semana, el día, el mes y el año nunca se desincronizan
export const eventParts = (() => {
    const fecha = new Date(event.dateIso);

    const formato = (opciones: Intl.DateTimeFormatOptions) => 
        new Intl.DateTimeFormat("es-MX", {timeZone: "America/Mexico_City", ...opciones}).format(fecha);

    return {
        weekday: formato({weekday: "long"}),
        day: formato({day: "2-digit"}),
        month: formato({month: "2-digit"}),
        year: formato({year: "numeric"})
    }
})();

//Bienvenida: mensaje de los novios al inicio de la página
export const welcome = {
    kicker: "Bienvenidos",
    title: "Un día para celebrar",
    message: "Con mucha alegría queremos invitarte a celebrar con nosotros el comienzo de una nueva etapa. Este día no estaría completo sin las personas que han caminado a nuestro lado, así que guarda la fecha y acompáñanos a brindar por todo lo que viene.",
} as const;

export const history = {
    kicker: "Nuestra historia",
    title: "Dos caminos, un mismo propósito",
    intro: "Nos conocimos en una tarde de lluvia de 2020, cuando ninguno de los dos esperaba encontrar algo así. Desde entonces, cada momento compartido se ha convertido en nuestro lugar favorito. Hoy queremos invitarte a caminar con nosotros el siguiente tramo de este camino.",
    full: [
        "Todo empezó con una conversación que se alargó hasta la madrugada. Entre risas, planes y cafés, nos dimos cuenta de que queríamos seguir contándonos la vida.",
        "Desde entonces hemos aprendido que el amor también está en las cosas pequeñas: una llamada a media tarde, un plato compartido, una mano que se busca sin pensar.",
        "Hoy, después de todo ese camino, elegimos celebrar juntos el comienzo de una nueva etapa. Y queremos que tú estés ahí.",
    ],
    button: "Conoce nuestra historia",
} as const;

//Un solo link y una sola dirección para la ceremonia y recepción
const mapsUrl = "https://www.google.com/maps/place/Centro+Cristiano+Izcalli/@19.6608527,-99.216204,17z/data=!3m1!4b1!4m6!3m5!1s0x85d21e4b94ff5c1b:0xa22b683567e9db6!8m2!3d19.6608527!4d-99.216204!16s%2Fg%2F11c32b2fyd?entry=ttu&g_ep=EgoyMDI2MTEwMy4wIKXMDSoASAFQAw%3D%3D";
const address = "Jacarandas 6, Santa Rosa de Lima, 54740 Cuautitlán Izcalli, Méx.";

export const ceremony: Venue = {
    name: "Centro Cristiano Izcalli",
    address,
    time: "5:00 PM",
    mapsUrl,
    image: "/imagesPrueba/gale4.jpg",
    imageAlt: "Foto de prueba del lugar de la ceremonia",
};


//Cronograma: los momentos del día, en orden
export type ScheduleItem = {
    time: string;
    title: string;
    description?: string;
};

export const schedule: ScheduleItem[] = [
    { time: "5:00 PM", title: "Ceremonia"},
    { time: "6:30 PM", title: "Recepción"},
    { time: "7:00 PM", title: "Cena"},
    { time: "8:30 PM", title: "Convivencia"},
];

export const dressCode = {
    title: "Formal",
    description: "Te pedimos venir con vestimenta formal. ¡Gracias por tu comprensión!",
    groom: {
        label: "Ellos",
        title: "Traje azul",
        note: "El azul está reservado para el novio.",
    },
    bride: {
        label: "Ellas",
        title: "Vestido blanco",
        note: "El blanco está reservado para la novia",
    },
} as const;

//Galería
export type GalleryPhoto = {
    src: string;
    alt: string;
    //Texto que se ve en el lightbox; si falta, se usa el alt
    caption?: string;
    //Tamaño en el collage: normal (1x1), ancho (2x1), alto (1x2) o grande (2x2)
    size?: "normal" | "ancho" | "alto" | "grande"
};

export const galleryPhotos: GalleryPhoto[] = [
    //Las fotos se guardan en public/images/
    {src: "/imagesPrueba/gale1.jpg", alt: "Sonia y David", caption: "Nuestro primer viaje juntos.", size: "grande"},
    {src: "/imagesPrueba/gale2.jpg", alt: "Sonia y David", caption: "Una tarde de café y conversación.", size: "alto"},
    {src: "/imagesPrueba/gale3.jpg", alt: "Sonia y David", caption: "Celebrando en familia.", size: "normal"},
    {src: "/imagesPrueba/gale4.jpg", alt: "Sonia y David", caption: "Ese día que no queremos olvidar.", size: "normal"},
    {src: "/imagesPrueba/gale5.jpg", alt: "Sonia y David", caption: "La pedida, por fin.", size: "ancho"},
    {src: "/imagesPrueba/gale6.jpg", alt: "Sonia y David", caption: "Listos para el siguiente capítulo.", size: "ancho"},
];

//Rutas para las fotos destacadas
//Al pasar a las fotos definitivas: cambiar imagesPrueba -> images, solo aquí
export const featuredPhotos = {
    hero: "/imagesPrueba/hero.jpg",
    welcome: "/imagesPrueba/gale2.jpg",
    //Fondo de la banda entre Bienvenida e Historia, y del contador
    banda: "/imagesPrueba/casados.jpg",
    countdown: "/imagesPrueba/casados.jpg",
    //Foto del lado derecho de Vestimenta (forma exponencial)
    dressCode: "/imagesPrueba/vestidoNovia.png",
}

//Carrusel de historia: cada foto con su descripción
export type HistoryPhoto = {
    src: string;
    alt: string;
    caption: string;
};

export const historyPhotos: HistoryPhoto[] = [
    {
        src: "/imagesPrueba/historias.jpg",
        alt: "Sonia y David en su primera salida",
        caption: "Nuestra primera salida, 2020.",
    },
    {
        src: "/imagesPrueba/historia2.png",
        alt: "Sonia y David en el parque",
        caption: "El parque donde caminamos tantas tardes.",
    },
];

//Despedida
export const farewell = {
    kicker: "Gracias",
    title: "Por ser parte de nuestra historia",
    message: "Llegamos al final de esta invitación, pero al comienzo de una nueva etapa. Esperamos contar con tu presencia."
};

//Música de fondo: la cortina la activa el clic de "Entrar"
export const music = {
    src: "/music/Opalite.mp3",
} as const;


//Pie de página: identidad del sitio y contacto de quien desarrolló la página
export const site = {
    developer: {
        name: "Erik Jarquín Sánchez",
        collaborator: "David Alexander Gómez Jarquín",
        role: "Diseñado y desarrollado por",
        email: "soportetiav@gmail.com",
        phone: "+52 951 161 74 12",
        location: "Ciudad de Oaxaca de Juárez"
    },
    note: "Diseño y desarrollo web, limpio y a la medida."
} as const;

