import type { CSSProperties } from "react";
import ArcoFoto from "@/components/ui/ArcoFoto";
import FechaVertical from "@/components/ui/FechaVertical";
import Ramas from "@/components/ui/Ramas";
import { couple, welcome, featuredPhotos } from "@/data/wedding-data";

export default function Bienvenida() {
    //El ancho del arco manda: desde él se calculan el texto y la cuña del Hero.
    const medidasArco = {
        "--ancho-arco": "clamp(18rem, 27vw, 24rem)",
    } as CSSProperties;

    return (
        <section
            id="bienvenida"
            style={medidasArco}
            className="relative scroll-mt-24 overflow-hidden bg-linear-to-br from-cream via-cream to-sand/30 pb-10 lg:min-h-[30rem] lg:pb-0">
            {/*Halo cálido de fondo*/}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl"/>

            {/*
              Continuidad de COLOR: la capa nace en el centro y llega al borde derecho con
              un gris cálido más tenue. El Hero termina en el mismo gris, así que no hay costura.
            */}
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 right-0 hidden bg-gris lg:block">
                <div className="absolute inset-0 bg-linear-to-r from-gris via-gris/95 to-gris/90"/>
            </div>

            {/*Ramas estáticas en los márgenes: no tapan el texto porque este lleva z-10*/}
            <Ramas className="absolute -left-16 -top-10 hidden h-[26rem] w-[26rem] text-terracotta/20 lg:block"/>
            <Ramas volteada className="absolute bottom-0 right-0 hidden h-80 w-80 text-sand/25 lg:block"/>

            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 lg:block">
                {/*Columna izquierda: mismo párrafo justificado que Historia y más horizontal*/}
                <div className="relative z-10 flex flex-col justify-center pt-14 lg:absolute lg:left-[3.25rem] lg:top-1/2 lg:w-[calc(50%-var(--ancho-arco)/2-4rem)] lg:pr-6 lg:-translate-y-1/2 lg:pt-0">
                    <div className="max-w-2xl">
                        <h2 className="font-serif italic text-4xl leading-[1.1] text-coffee md:text-5xl">
                            {welcome.title}
                        </h2>

                        <div className="mt-6 h-px w-16 bg-sand"/>

                        <p className="mt-6 text-justify font-sans text-base leading-relaxed text-ink/80">
                            {welcome.message}
                        </p>

                        <p className="mt-4 font-serif text-2xl italic text-terracotta">
                            {couple.bride} &amp; {couple.groom}
                        </p>
                    </div>
                </div>

                {/*Centro: arco centrado, con la misma altura que la sección y el bloque derecho*/}
                <div className="relative z-10 flex justify-center pt-14 lg:absolute lg:inset-y-0 lg:left-1/2 lg:pt-0 lg:-translate-x-1/2">
                    <ArcoFoto
                        src={featuredPhotos.welcome}
                        alt="Sonia y David en un día especial"
                        sizes="(min-width: 1024px) 33vw, 90vw"
                        className="aspect-square w-full max-w-[26rem] lg:aspect-auto lg:h-full lg:w-[var(--ancho-arco)] lg:max-w-none"/>
                </div>

                {/*Derecha: fecha clara sobre el continuo del Hero*/}
                <div className="relative z-10 flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:w-1/2 lg:translate-x-20 lg:-translate-y-1/2">
                    <FechaVertical />
                </div>
            </div>
        </section>
    );
}
