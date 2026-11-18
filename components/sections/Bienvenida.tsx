import Image from "next/image";
import type { CSSProperties } from "react";
import ArcoFoto from "@/components/ui/ArcoFoto";
import FechaVertical from "@/components/ui/FechaVertical";
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
              Una sola capa de Hero va desde el centro de la sección hasta el borde derecho.
              El arco se dibuja encima: tapa la parte baja y deja ver el mismo tono del Hero
              en la cuña curva de la esquina superior derecha, sin costura con el bloque derecho.
            */}
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 right-0 hidden lg:block">
                <Image
                    src={featuredPhotos.hero}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 90vw"
                    className="object-cover object-center"/>

                {/*Mismos velos del Hero, para que la continuación no se note*/}
                <div className="absolute inset-0 bg-ink/55"/>
                <div className="absolute inset-0 bg-linear-to-r from-ink/70 via-ink/40 to-ink/20"/>
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink/70 via-ink/20 to-transparent"/>
            </div>

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
                <div className="relative z-10 flex justify-center lg:absolute lg:right-10 lg:top-1/2 lg:w-64 lg:-translate-y-1/2">
                    <FechaVertical />
                </div>
            </div>
        </section>
    );
}
