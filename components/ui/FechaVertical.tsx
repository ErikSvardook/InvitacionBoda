import { event, eventParts } from "@/data/wedding-data";

type Props = {
    className?: string;
};

export default function FechaVertical({ className = "" }: Props){
    return (
        <time
            dateTime={event.dateIso}
            aria-label={event.dateLabel}
            className={`flex flex-col items-center gap-3 ${className}`}>
                {/*El nombre del día en tinta sobre crema y en crema sobre el fondo oscuro*/}
                <span className="font-serif text-2xl italic uppercase tracking-[0.18em] text-ink md:text-3xl lg:text-cream">
                    {eventParts.weekday}
                </span>

                {/*Día, mes y año apilados y centrados bajo el nombre del día*/}
                <span className="flex flex-col items-center gap-3 lg:gap-1">
                    <span className="font-serif text-5xl italic leading-none text-coffee md:text-6xl lg:text-cream">
                        {eventParts.day}
                    </span>
                    <span className="font-serif text-3xl italic leading-none text-coffee/80 md:text-4xl lg:text-cream/80">
                        {eventParts.month}
                    </span>
                    <span className="font-serif text-2xl italic leading-none text-coffee/60 md:text-3xl lg:text-cream/60">
                        {eventParts.year}
                    </span>
                </span>
        </time>
    );
}
