import { event } from "@/data/wedding-data";
import Countdown from "@/components/ui/Countdown";

export default function CuentaRegresiva() {
    return (
        <section id="countdown" className="scroll-mt-24 bg-coffee py-16 lg:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-5 lg:items-center lg:gap-16">
                {/*Información a la izquierda*/}
                <div className="lg:col-span-2">
                    <h2 className="mt-5 font-serif italic text-4xl leading-[1.1] text-cream md:text-5xl">
                        El gran día
                    </h2>

                    <div className="mt-6 h-px w-16 bg-terracotta/60" />
                </div>

                {/*Números a la derecha*/}
                <div className="lg:col-span-3">
                    <Countdown
                        targetDate={event.dateIso}
                        className="grid grid-cols-2 gap-y-10 sm:grid-cols-4"/>
                </div>
            </div>
        </section>
    )
}
