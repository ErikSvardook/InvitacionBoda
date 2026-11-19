import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Bienvenida from "@/components/sections/Bienvenida";
import CodigoVestimenta from "@/components/sections/CodigoVestimenta";
import CuentaRegresiva from "@/components/sections/CuentaRegresiva";
import Despedida from "@/components/sections/Despedida";
import ElGranDia from "@/components/sections/ElGranDia";
import Galeria from "@/components/sections/Galeria";
import Hero from "@/components/sections/Hero";
import NuestraHistoria from "@/components/sections/NuestraHistoria";
import { featuredPhotos } from "@/data/wedding-data";

//Página principal(unión de todas las secciones)
export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero/>
                <Bienvenida/>
                {/*Banda divisoria: foto tenue con la misma altura que el contador, sin texto*/}
                <div aria-hidden="true" className="relative h-[var(--altura-banda)] overflow-hidden bg-coffee">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${featuredPhotos.banda}')` }}/>
                    <div className="absolute inset-0 bg-coffee/55"/>
                </div>
                <NuestraHistoria/>
                <CuentaRegresiva/>
                <ElGranDia/>
                <Galeria/>
                <CodigoVestimenta/>
                <Despedida/>
            </main>
            <Footer/>
        </>
    );
}
