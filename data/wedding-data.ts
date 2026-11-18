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

export const reception: Venue = {
    name: "Centro Cristiano Izcalli",
    address,
    time: "8:00 PM",
    mapsUrl,
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
    { time: "9:00 PM", title: "Convivencia"},
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

//Lugares para quedarse
export type Hotel = {
    name: string;
    note: string;
    url: string | null;
    image?: string;
    imageAlt?: string;
}

export const hotels: Hotel[] = [
    //Agregar los hoteles recomendados
    //{ name: "Hotel ejemplo", note: "A 10 minutos del evento", url: "https://..." }
    { 
        name: "Hotel campanario", 
        note: "A 10 minutos del evento", 
        url: "https://www.google.com/search?q=hoteles+en+miahuatlan&sca_esv=f0ad64fcc536899c&rlz=1C1GCEA_enMX1150MX1150&sxsrf=AKL5yDj-p0a18evDDxw8qb_gM_4WxICLxg%3A1794498025679&ei=6d31at76KNDukPIPvtDlwQM&biw=1366&bih=599&llpgabe=CgovbS8wNjYwZzFu&oq=hoteles+&gs_lp=Egxnd3Mtd2l6LXNlcnAiCGhvdGVsZXMgKgsIABiABBiKBRiSAzILEAAYgAQYigUYkgMyDhAAGIAEGLEDGIMBGJIDMg0QABiABBiKBRhDGMkDMhAQABiABBiKBRhDGLEDGIMBMgoQABiABBiKBRhDMhAQABiABBiKBRhDGLEDGIMBMhAQABiABBiKBRhDGLEDGIMBMgoQABiABBiKBRhDMgoQABiABBiKBRhDMgoQABiABBiKBRhDSIIXUKwHWKwHcAF4AZABAJgB0gKgAdICqgEDMy0xuAEDyAEA-AEBmAICoAL2AsICChAAGEcY1gQYsAPCAg0QABhHGNYEGMkDGLADwgIOEAAYgAQYigUYkgMYsAPCAg4QABiABBjnBBiSAxiwA8ICDRAAGIAEGIoFGEMYsAPCAg4QABjkAhjWBBiwA9gBAcICFxAuGNwGGLgGGNoGGNgCGMgDGLAD2AEBmAMAiAYBkAYTugYGCAEQARgJkgcFMS4zLTGgB_gFsgcDMy0xuAfeAsIHBTMtMS4xyAcbgAgB&sclient=gws-wiz-serp",
        image: "/imagesPrueba/hotel1.jpg",
        imageAlt: "Hotel 5 sstrellas cerca del mar",
     },
     { 
        name: "Hotel vasilica", 
        note: "A 10 minutos del evento", 
        url: "https://www.google.com/search?q=hoteles+en+miahuatlan&sca_esv=f0ad64fcc536899c&rlz=1C1GCEA_enMX1150MX1150&sxsrf=AKL5yDj-p0a18evDDxw8qb_gM_4WxICLxg%3A1794498025679&ei=6d31at76KNDukPIPvtDlwQM&biw=1366&bih=599&llpgabe=CgovbS8wNjYwZzFu&oq=hoteles+&gs_lp=Egxnd3Mtd2l6LXNlcnAiCGhvdGVsZXMgKgsIABiABBiKBRiSAzILEAAYgAQYigUYkgMyDhAAGIAEGLEDGIMBGJIDMg0QABiABBiKBRhDGMkDMhAQABiABBiKBRhDGLEDGIMBMgoQABiABBiKBRhDMhAQABiABBiKBRhDGLEDGIMBMhAQABiABBiKBRhDGLEDGIMBMgoQABiABBiKBRhDMgoQABiABBiKBRhDMgoQABiABBiKBRhDSIIXUKwHWKwHcAF4AZABAJgB0gKgAdICqgEDMy0xuAEDyAEA-AEBmAICoAL2AsICChAAGEcY1gQYsAPCAg0QABhHGNYEGMkDGLADwgIOEAAYgAQYigUYkgMYsAPCAg4QABiABBjnBBiSAxiwA8ICDRAAGIAEGIoFGEMYsAPCAg4QABjkAhjWBBiwA9gBAcICFxAuGNwGGLgGGNoGGNgCGMgDGLAD2AEBmAMAiAYBkAYTugYGCAEQARgJkgcFMS4zLTGgB_gFsgcDMy0xuAfeAsIHBTMtMS4xyAcbgAgB&sclient=gws-wiz-serp",
        image: "/imagesPrueba/hotel2.jpg",
        imageAlt: "Hotel 5 sstrellas cerca del centro de ceremonia",
     },
     { 
        name: "Hotel beach", 
        note: "A 10 minutos del evento", 
        url: "https://www.google.com/search?q=hoteles+en+miahuatlan&sca_esv=f0ad64fcc536899c&rlz=1C1GCEA_enMX1150MX1150&sxsrf=AKL5yDj-p0a18evDDxw8qb_gM_4WxICLxg%3A1794498025679&ei=6d31at76KNDukPIPvtDlwQM&biw=1366&bih=599&llpgabe=CgovbS8wNjYwZzFu&oq=hoteles+&gs_lp=Egxnd3Mtd2l6LXNlcnAiCGhvdGVsZXMgKgsIABiABBiKBRiSAzILEAAYgAQYigUYkgMyDhAAGIAEGLEDGIMBGJIDMg0QABiABBiKBRhDGMkDMhAQABiABBiKBRhDGLEDGIMBMgoQABiABBiKBRhDMhAQABiABBiKBRhDGLEDGIMBMhAQABiABBiKBRhDGLEDGIMBMgoQABiABBiKBRhDMgoQABiABBiKBRhDMgoQABiABBiKBRhDSIIXUKwHWKwHcAF4AZABAJgB0gKgAdICqgEDMy0xuAEDyAEA-AEBmAICoAL2AsICChAAGEcY1gQYsAPCAg0QABhHGNYEGMkDGLADwgIOEAAYgAQYigUYkgMYsAPCAg4QABiABBjnBBiSAxiwA8ICDRAAGIAEGIoFGEMYsAPCAg4QABjkAhjWBBiwA9gBAcICFxAuGNwGGLgGGNoGGNgCGMgDGLAD2AEBmAMAiAYBkAYTugYGCAEQARgJkgcFMS4zLTGgB_gFsgcDMy0xuAfeAsIHBTMtMS4xyAcbgAgB&sclient=gws-wiz-serp",
        image: "/imagesPrueba/hotel3.jpg",
        imageAlt: "Hotel 5 sstrellas",
     },
];

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
    //Las fotos se guardan en public/images/ y se agrega así:
    //{ src: "/images/galeria-01.jpg", alt: "Sonia y David en la playa"}
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

//Preguntas frecuentes
export type FaqItem = {
    question: string;
    answer: string;
};

export const faqItems: FaqItem[] = [
    {
        question: "¿A qué hora debo llegar?",
        answer: "La ceremonia comienza a las 5:00 PM. Te recomendamos llegar entre 4:30 o 4:45 PM para acomodarte sin prisa y no perderte el inicio.",
    },
    {
        question: "¿Qué pasa si tengo alguna restricción alimenticia?",
        answer: "Cuéntanoslo al confirmar tu asistencia. Avisaremos a quien prepara el banquete para que tengas una opción que puedas disfrutar.",
    },
    {
        question: "¿Hasta cuándo puedo confirmar mi asistencia?",
        //Ajustar esta fecha cuando definan el límite real del RSVP
        answer: "Hasta el 1 de diciembre de 2026. Después de esa fecha ya no podremos asegurar tu lugar, así que te pedimos no dejarlo para el final.",
    },
    {
        question: "¿Cómo llego al lugar?",
        answer: "En la sección \"El gran día\" está el botón \"Cómo llegar\", que abre la ubicación exacta en Google Maps. La ceremonia y la recepción son en el mismo lugar.",
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

