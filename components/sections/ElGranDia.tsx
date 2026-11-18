import ArcoFoto from "@/components/ui/ArcoFoto";
import { ceremony, event, reception, schedule } from "@/data/wedding-data";

type IconoProps = { className?: string };

function IconoCalendario({ className }: IconoProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2"/>
            <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round"/>
        </svg>
    );
}

function IconoReloj({ className }: IconoProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden="true">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function IconoUbicacion({ className }: IconoProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden="true">
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" strokeLinejoin="round"/>
            <circle cx="12" cy="10" r="2.5"/>
        </svg>
    );
}

export default function ElGranDia(){
    const venue = ceremony;
    const mapsUrl = venue.mapsUrl;

    //Tres puntos verticales con sus iconos: fecha, hora y dirección
    const datos = [
        { id: "fecha", etiqueta: "Fecha", valor: event.dateLabel, Icono: IconoCalendario },
        { id: "hora", etiqueta: "Hora", valor: `${ceremony.time} · ${reception.time}`, Icono: IconoReloj },
        { id: "direccion", etiqueta: "Dirección", valor: venue.address, Icono: IconoUbicacion },
    ];

    return (
        <section id="gran-dia" className="scroll-mt-24 bg-cream py-16 lg:py-20">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:items-center lg:gap-10">
                {/*Columna izquierda: dos títulos y los tres datos con icono*/}
                <div className="lg:col-span-4">
                    <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-terracotta">
                        Ceremonia
                    </p>

                    <h2 className="mt-5 font-serif italic text-4xl leading-[1.1] text-coffee md:text-5xl">
                        {ceremony.name}
                    </h2>

                    <div className="mt-6 h-px w-16 bg-sand/60" />

                    <ul className="relative mt-8 space-y-6">
                        <span aria-hidden="true" className="absolute bottom-4 left-[19px] top-4 w-px bg-sand/70"/>

                        {datos.map(({ id, etiqueta, valor, Icono }) => (
                            <li key={id} className="relative flex items-start gap-4">
                                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand/60 bg-coffee/5 text-cinnamon">
                                    <Icono className="h-5 w-5"/>
                                </span>

                                <div className="pt-0.5">
                                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-terracotta">
                                        {etiqueta}
                                    </p>
                                    <p className="mt-1 font-serif text-lg text-coffee">
                                        {valor}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/*Botón centrado dentro de la columna*/}
                    <div className="mt-8 flex justify-center">
                        {mapsUrl ? (
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-full bg-terracotta px-7 py-3 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-cinnamon">
                                    Cómo llegar
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        className="h-4 w-4"
                                        aria-hidden="true">
                                            <path
                                                d="M7 17L17 7M17 7H9M17 7v8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"/>
                                    </svg>
                            </a>
                        ) : (
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-ink/50">
                                Ubicación próximamente
                            </p>
                        )}
                    </div>
                </div>

                {/*Columna central: foto del lugar en arco*/}
                <div className="lg:col-span-4">
                    {venue.image ? (
                        <ArcoFoto
                            src={venue.image}
                            alt={venue.imageAlt ?? venue.name}
                            sizes="(min-width: 1024px) 33vw, 90vw"
                            className="aspect-[3/4] w-full"/>
                    ) : (
                        <div className="aspect-[3/4] w-full rounded-t-full bg-sand/30"/>
                    )}
                </div>

                {/*Columna derecha: programa centrado dentro de su celda para repartir el espacio*/}
                <div className="lg:col-span-4">
                    <div className="mx-auto max-w-[16rem]">
                        <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-terracotta">
                            Programa del día
                        </p>

                        <div className="relative mt-6">
                            <span aria-hidden="true" className="absolute inset-y-2 left-[7px] w-px bg-sand/70"/>

                            <ol className="space-y-7">
                                {schedule.map((item) => (
                                    <li key={item.time} className="relative pl-9">
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-cream bg-terracotta"/>

                                        <p className="font-serif text-xl text-coffee">
                                            {item.time}
                                        </p>

                                        <h3 className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.2em] text-terracotta">
                                            {item.title}
                                        </h3>

                                        {item.description && (
                                            <p className="mt-0.5 font-sans text-xs leading-relaxed text-ink/70">
                                                {item.description}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
