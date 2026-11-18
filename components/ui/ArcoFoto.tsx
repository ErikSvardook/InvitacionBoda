import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    sizes?: string;
    className?: string;
    priority?: boolean;
    //Forma del marco. Por defecto, arco completo; se puede cambiar desde cada sección.
    forma?: string;
};

export default function ArcoFoto({
    src,
    alt,
    sizes = "(min-width: 1024px) 33vw, 90vw",
    className = "",
    priority = false,
    forma = "rounded-t-full",
}: Props) {
    return (
        <div className={`relative overflow-hidden bg-sand/30 ${forma} ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes={sizes}
                className="object-cover"/>

            {/*Velo cálido para integrar la foto con la paleta*/}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-coffee/45 via-transparent to-terracotta/10"/>
        </div>
    );
}
