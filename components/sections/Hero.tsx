import Image from "next/image";
import { couple, event, featuredPhotos } from "@/data/wedding-data";

export default function Hero() {
    return (
        <section id="inicio" className="relative flex min-h-[90svh] items-end overflow-hidden">
            {/*Fondo: hoy un placeholder, después la foto real*/}
            <div className="absolute inset-0">
                <Image 
                    src={featuredPhotos.hero}
                    alt="Sonia y David"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"/>

                {/*Oscurece la izquieda para que el texto tenga contraste*/}
                <div className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/45 to-ink/10"/>

                {/*Oscurece la parte inferior: termina en el mismo gris de Bienvenida para que no haya costura*/}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gris via-ink/25 to-transparent"/>

                {/*El Header se lee sobre la foto*/}
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/50 to-transparent"/>
            </div>

            {/*Contenido: alineado a la izquierda, sin centrar el contenedor*/}
            <div className="relative z-10 max-w-6xl px-6 pb-16 pt-40 text-left text-white md:px-12 lg:pl-20 lg:pr-6">
                <div className="max-w-xl">
                    <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-sand">
                        Nuestra boda
                    </p>

                    <h1 className="mt-6 font-serif italic text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">
                        {couple.bride}
                        <span className="mx-2 inline-block text-camel md:mx-4">
                            &
                        </span>
                        {couple.groom}
                    </h1>

                    <div className="mt-8 border-l border-terracotta/80 pl-6">
                        <p className="font-sans text-xs uppercase tracking-[0.35em] text-cream">
                            {event.dateLabel}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
