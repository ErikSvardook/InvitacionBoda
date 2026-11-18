"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Lightbox from "@/components/ui/Lightbox";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { galleryPhotos } from "@/data/wedding-data";

const VISIBLES = 3;

export default function Galeria(){
    const [inicio, setInicio] = useState(0);
    const [indice, setIndice] = useState<number | null>(null);

    //useCallback para que el lightbox no vuelva a suscribirse a cada render
    const cerrar = useCallback(() => setIndice(null), []);
    const navegar = useCallback((nuevo: number) => setIndice(nuevo), []);

    const total = galleryPhotos.length;

    //Las tres fotos visibles se calculan con módulo: al pasar la última vuelve al inicio
    const visibles = Array.from(
        { length: Math.min(VISIBLES, total) },
        (_, i) => (inicio + i) % total
    );

    const siguiente = () => {
        if (total === 0) return;
        setInicio((i) => (i + 1) % total);
    };

    return (
        <section id="galeria" className="scroll-mt-24 bg-linear-to-br from-ink via-coffee to-cinnamon py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
                    {/*Texto a la izquierda*/}
                    <div className="lg:col-span-3">
                        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-camel">
                            Galería
                        </p>

                        <h2 className="mt-5 font-serif italic text-4xl leading-[1.1] text-cream md:text-5xl">
                            Nuestros recuerdos
                        </h2>

                        <div className="mt-6 h-px w-16 bg-sand/60" />
                    </div>

                    {/*Tres fotos cuadradas enmarcadas*/}
                    <div className="lg:col-span-7">
                        <div
                            role="group"
                            aria-label={`Galería de ${total} fotos`}
                            className="grid grid-cols-3 gap-3 md:gap-4">
                            {total > 0 ? visibles.map((indiceReal) => {
                                const photo = galleryPhotos[indiceReal];

                                return (
                                    <button
                                        key={photo.src}
                                        type="button"
                                        onClick={() => setIndice(indiceReal)}
                                        aria-label={`Ampliar: ${photo.alt}`}
                                        className="group aspect-square rounded-xl border border-sand/40 bg-sand/10 p-1.5 transition-colors duration-300 hover:border-camel">
                                        <span className="relative block h-full w-full overflow-hidden rounded-lg bg-sand/20">
                                            <Image
                                                src={photo.src}
                                                alt={photo.alt}
                                                fill
                                                sizes="(min-width: 1024px) 20vw, 30vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"/>
                                        </span>
                                    </button>
                                );
                            }) : Array.from({ length: VISIBLES }).map((_, i) => (
                                <PhotoPlaceholder
                                    key={i}
                                    label={`Foto ${String(i + 1).padStart(2, "0")}`}
                                    className="aspect-square w-full rounded-xl"/>
                            ))}
                        </div>
                    </div>

                    {/*Botón circular que avanza de una en una*/}
                    <div className="flex justify-center lg:col-span-2 lg:justify-end">
                        <button
                            type="button"
                            onClick={siguiente}
                            aria-label="Ver más fotos"
                            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-sand/50 bg-cream/5 text-cream transition-colors duration-300 hover:border-camel hover:bg-terracotta hover:text-white">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                                aria-hidden="true">
                                    <path d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <Lightbox
                photos={galleryPhotos}
                index={indice}
                onClose={cerrar}
                onNavigate={navegar}/>
        </section>
    );
}
