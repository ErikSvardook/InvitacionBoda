import { couple, farewell } from "@/data/wedding-data";

export default function Despedida() {
    return (
        <section id="despedida" className="relative scroll-mt-24 overflow-hidden bg-linear-to-b from-coffee to-ink py-16 lg:py-20">
            {/*Halo cálido en la esquina inferior derecha*/}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-terracotta/20 blur-3xl"/>

            <div className="relative mx-auto max-w-4xl px-6">
                <div className="border-l border-terracotta/60 pl-6 md:pl-8">
                    <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-terracotta">
                        {farewell.kicker}
                    </p>

                    <h2 className="mt-5 font-serif italic text-3xl leading-[1.2] text-cream md:text-4xl">
                        {farewell.title}
                    </h2>

                    <div className="mt-6 h-px w-16 bg-terracotta/60" />

                    <p className="mt-6 max-w-2xl text-justify font-sans text-base leading-relaxed text-cream/75 md:text-lg">
                        {farewell.message}
                    </p>

                    <p className="mt-10 font-serif text-2xl italic text-terracotta">
                        {couple.bride} &amp; {couple.groom}
                    </p>
                </div>
            </div>
        </section>
    );
}
