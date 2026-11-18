import ArcoFoto from "@/components/ui/ArcoFoto";
import HistoriaModal from "@/components/ui/HistoriaModal";
import { history, historyPhotos } from "@/data/wedding-data";

export default function NuestraHistoria(){
    const foto = historyPhotos[0];

    return (
        <section id="historia" className="relative scroll-mt-24 overflow-hidden bg-cream pb-0 pt-12 lg:h-[30rem] lg:pt-0">
            {/*Texto arriba: el botón queda lejos del borde inferior de la sección*/}
            <div className="relative z-10 grid items-start gap-10 lg:h-full lg:grid-cols-2 lg:gap-0">
                <div className="px-6 lg:pl-20 lg:pr-12 lg:pt-12">
                    <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-terracotta">
                        {history.kicker}
                    </p>

                    <h2 className="mt-4 font-serif italic text-4xl leading-[1.1] text-coffee md:text-5xl">
                        {history.title}
                    </h2>

                    <div className="mt-6 h-px w-16 bg-sand"/>

                    <p className="mt-6 text-justify font-sans text-base leading-relaxed text-ink/80">
                        {history.intro}
                    </p>

                    <div className="mt-6">
                        <HistoriaModal />
                    </div>
                </div>

                {/*En móvil el arco sigue debajo del texto, como antes*/}
                <div className="flex justify-end px-6 lg:hidden">
                    <ArcoFoto
                        src={foto.src}
                        alt={foto.alt}
                        sizes="90vw"
                        className="aspect-square w-full max-w-[26rem]"
                    />
                </div>
            </div>

            {/*
              En escritorio la foto es solo el lado derecho del arco:
              mide media sección de alto (h-1/2) y queda anclada abajo (bottom-0),
              el borde izquierdo baja recto y rounded-tl-[6rem] hace la pequeña onda.
            */}
            <div className="absolute bottom-0 right-0 hidden h-1/2 w-1/2 lg:block">
                <ArcoFoto
                    src={foto.src}
                    alt={foto.alt}
                    sizes="(min-width: 1024px) 50vw, 90vw"
                    forma="rounded-tl-[6rem]"
                    className="h-full w-full"
                />
            </div>
        </section>
    );
}
