import Image from "next/image";
import ArcoFoto from "@/components/ui/ArcoFoto";
import FechaVertical from "@/components/ui/FechaVertical";
import { couple, welcome, featuredPhotos } from "@/data/wedding-data";

export default function Bienvenida() {
    return (
        <section id="bienvenida" className="relative scroll-mt-24 overflow-hidden bg-linear-to-br from-cream via-cream to-sand/30 pb-10 lg:pb-0">
            {/*Halo cálido de fondo*/}
            <div 
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl"/>

            <div className="relative mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-12 lg:items-stretch lg:gap-20">
                {/*Columna izquierda: texto más hacia el borde, con el tope derecho fijo*/}
                <div className="flex items-center pt-14 lg:col-span-5 lg:pl-4 lg:pt-16">
                    <div className="max-w-xl">
                        <h2 className="font-serif italic text-4xl leading-[1.08] text-coffee md:text-5xl">
                            {welcome.title}
                        </h2>

                        <div className="mt-6 h-px w-16 bg-sand" />

                        <p className="mt-6 text-justify font-sans text-base leading-relaxed text-ink/80 md:text-lg">
                            {welcome.message}
                        </p>

                        <p className="mt-8 font-serif text-2xl italic text-terracotta">
                            {couple.bride} &amp; {couple.groom}
                        </p>
                    </div>
                </div>

                {/*Columna central: arco del ancho de la foto de El Gran Día (4 columnas)*/}
                <div className="flex flex-col justify-end pt-14 lg:col-span-4 lg:pt-16">
                    <ArcoFoto
                        src={featuredPhotos.welcome}
                        alt="Sonia y David en un día especial"
                        sizes="(min-width: 1024px) 30vw, 90vw"
                        className="aspect-square w-full max-w-[26rem] lg:aspect-auto lg:min-h-0 lg:flex-1"
                    />
                </div>

                {/*Columna derecha: fecha más estrecha y desplazada hacia la derecha*/}
                <div className="relative flex items-center justify-center lg:col-span-3 lg:-mr-10">
                    <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
                        <Image
                            src={featuredPhotos.hero}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 25vw, 90vw"
                            className="object-cover object-[65%_center]"/>
                        {/*La imagen se desvanece hacia el crema, como si cayera del Hero*/}
                        <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-cream/70 to-cream"/>
                        {/*El borde izquierdo se funde con el arco*/}
                        <div className="absolute inset-0 bg-linear-to-r from-cream via-cream/25 to-transparent"/>
                    </div>

                    <FechaVertical className="relative z-10" />
                </div>
            </div>
        </section>
    );
}
