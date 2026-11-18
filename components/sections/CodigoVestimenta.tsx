import { couple, dressCode } from "@/data/wedding-data";

export default function CodigoVestimenta(){
    return (
        <section id="vestimenta" className="scroll-mt-24 bg-cream py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-6">
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

                {/*Una línea por cada novio, sin fotos*/}
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
        </section>
    );
}
