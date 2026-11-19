import ArcoFoto from "@/components/ui/ArcoFoto";
import Ramas from "@/components/ui/Ramas";
import { couple, dressCode, featuredPhotos } from "@/data/wedding-data";

export default function CodigoVestimenta(){
    return (
        <section id="vestimenta" className="relative scroll-mt-24 overflow-hidden bg-cream py-16 lg:h-[32rem] lg:py-0">
            {/*
              Foto de fondo en toda la sección, con un velo cálido de la paleta para
              que combine con el resto de la página. La onda del panel crema revela
              esta misma imagen difuminada.
            */}
            <div
                aria-hidden="true"
                className="absolute inset-0 hidden bg-cover bg-center lg:block"
                style={{ backgroundImage: `url('${featuredPhotos.dressCode}')` }}/>
            <div
                aria-hidden="true"
                className="absolute inset-0 hidden bg-linear-to-br from-sand/45 via-terracotta/25 to-coffee/50 lg:block"/>

            {/*Bloque de texto crema con la onda apuntando a la foto*/}
            <div className="relative z-10 mx-auto grid max-w-[1400px] px-6 lg:absolute lg:inset-y-0 lg:left-0 lg:mx-0 lg:h-full lg:w-1/2 lg:max-w-none lg:grid-cols-1 lg:rounded-br-[21rem_60%] lg:bg-cream lg:px-0">
                {/*Ramas dentro del panel crema, detrás del texto y sin animación*/}
                <Ramas className="absolute right-0 top-6 hidden h-64 w-64 text-sand/25 lg:block"/>
                <Ramas volteada className="absolute bottom-0 left-0 hidden h-40 w-40 text-sand/20 lg:block"/>

                <div className="lg:-translate-y-8 lg:self-center lg:pl-20 lg:pr-28">
                    <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-terracotta">
                        Código de vestimenta
                    </p>

                    <h2 className="mt-5 font-serif italic text-4xl leading-[1.1] text-coffee md:text-5xl">
                        {dressCode.title}
                    </h2>

                    <div className="mt-6 h-px w-16 bg-sand/60"/>

                    <p className="mt-6 max-w-xl text-justify font-sans text-base leading-relaxed text-ink/80">
                        {dressCode.description}
                    </p>

                    {/*Una línea por cada novio, sin fotos dentro del texto*/}
                    <dl className="mt-10 space-y-6 border-l border-sand/70 pl-6">
                        <div>
                            <dt className="font-serif text-2xl text-coffee">
                                {couple.groom}
                            </dt>
                            <dd className="mt-1 font-sans text-base leading-relaxed text-ink/80">
                                {dressCode.groom.title}. {dressCode.groom.note}
                            </dd>
                        </div>

                        <div>
                            <dt className="font-serif text-2xl text-coffee">
                                {couple.bride}
                            </dt>
                            <dd className="mt-1 font-sans text-base leading-relaxed text-ink/80">
                                {dressCode.bride.title}. {dressCode.bride.note}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/*Ramas estáticas en el margen del texto*/}
            <Ramas className="absolute -left-16 -top-6 hidden h-96 w-96 text-terracotta/15 lg:block"/>

            {/*En móvil la foto queda debajo del texto, con la curva más cerrada*/}
            <div className="relative z-10 mt-10 flex justify-end px-6 lg:hidden">
                <ArcoFoto
                    src={featuredPhotos.dressCode}
                    alt="Traje formal del novio"
                    sizes="90vw"
                    forma="rounded-bl-[8rem_60%]"
                    className="aspect-[4/3] w-full max-w-sm [&_img]:object-top"
                />
            </div>
        </section>
    );
}
