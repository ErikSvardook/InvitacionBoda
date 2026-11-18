"use client";

import Image from "next/image";
import { useRef } from "react";
import { history } from "@/data/wedding-data";

export default function HistoriaModal() {
    const dialogo = useRef<HTMLDialogElement>(null);

    return (
        <>
            <button
                type="button"
                onClick={() => dialogo.current?.showModal()}
                className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-terracotta px-7 py-3 font-sans text-xs uppercase tracking-[0.2em] text-terracotta transition-colors duration-300 hover:border-cinnamon hover:bg-terracotta/10 hover:text-cinnamon">
                <span>{history.button}</span>
                <Image
                    src="/icons/derecha.png"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"/>
            </button>

            <dialog
                ref={dialogo}
                aria-labelledby="historia-modal-titulo"
                onClick={(event) => {
                    //Clic fuera del contenido (en el ::backdrop) cierra el modal
                    if (event.target === dialogo.current) dialogo.current?.close();
                }}
                className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-sand/60 bg-cream p-8 text-ink shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-sm md:p-12">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-terracotta">
                            {history.kicker}
                        </p>
                        <h2 id="historia-modal-titulo" className="mt-4 font-serif italic text-3xl leading-tight text-coffee md:text-4xl">
                            {history.title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => dialogo.current?.close()}
                        aria-label="Cerrar la historia"
                        className="-mt-2 shrink-0 cursor-pointer rounded-full p-2 font-sans text-2xl leading-none text-terracotta transition-colors duration-300 hover:bg-terracotta/10 hover:text-cinnamon">
                        &times;
                    </button>
                </div>

                <div className="mt-8 h-px w-16 bg-sand" />

                <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-ink/80 md:text-justify">
                    <p>{history.intro}</p>
                    {history.full.map((parrafo) => (
                        <p key={parrafo}>{parrafo}</p>
                    ))}
                </div>
            </dialog>
        </>
    );
}
