type Props = {
    className?: string;
    //Voltea la composición 180° para abrazar el texto desde la otra esquina
    volteada?: boolean;
};

/**
 * Ramas con hojas estáticas, dibujadas con SVG en código.
 * No es una imagen, no trae animación y no necesita archivos nuevos:
 * el color se hereda (currentColor) y se ajusta desde la sección que lo usa.
 */
export default function Ramas({ className = "", volteada = false }: Props) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            className={`pointer-events-none ${volteada ? "rotate-180" : ""} ${className}`}>

            {/*Tallos: curvas abiertas que salen de la esquina y rodean el texto*/}
            <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
                <path d="M-12 26C52 30 84 62 126 104c34 34 64 56 110 70" />
                <path d="M56 44c12-20 30-30 52-32" />
                <path d="M104 82c20-18 44-22 66-16" />
                <path d="M162 132c22-8 44-6 62 4" />
                <path d="M92 62c-2 20-14 34-32 44" />
                <path d="M150 112c-4 18-16 30-34 38" />
            </g>

            {/*Hojas: la misma forma repetida con giros y tamaños distintos*/}
            <g fill="currentColor">
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(74 30) rotate(-28)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(96 24) rotate(12) scale(.78)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(120 70) rotate(-18)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(142 66) rotate(22) scale(.85)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(170 110) rotate(-12)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(194 122) rotate(26) scale(.8)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(224 154) rotate(-22)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(60 84) rotate(158) scale(.8)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(116 128) rotate(150) scale(.75)" />
                <path d="M0 0c9-9 23-10 34-1-11 9-25 8-34 1Z" transform="translate(152 148) rotate(162) scale(.7)" />
            </g>
        </svg>
    );
}
