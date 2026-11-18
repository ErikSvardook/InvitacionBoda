import { event, eventParts } from "@/data/wedding-data";

type Props = {
    className?: string;
};

export default function FechaVertical({ className = "" }: Props){
    return (
        <time
            dateTime={event.dateIso}
            aria-label={event.dateLabel}
            className={`flex flex-col gap-3 ${className}`}>
                {/*El nombre del día en tinta, muy visible, sin la línea de separación*/}
                <span className="font-serif text-2xl italic uppercase tracking-[0.18em] text-ink md:text-3xl">
                    {eventParts.weekday}
                </span>

                {/*Día, mes y año apilados en vertical, como al principio*/}
                <span className="flex items-center gap-3 lg:flex-col lg:items-center lg:gap-1">
                    <span className="font-serif text-5xl italic leading-none text-coffee md:text-6xl">
                        {eventParts.day}
                    </span>
                    <span className="font-serif text-3xl italic leading-none text-coffee/80 md:text-4xl">
                        {eventParts.month}
                    </span>
                    <span className="font-serif text-2xl italic leading-none text-coffee/60 md:text-3xl">
                        {eventParts.year}
                    </span>
                </span>
        </time>
    );
}
