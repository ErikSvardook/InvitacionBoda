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

//Página principal(unión de todas las secciones)
export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero/>
                <Bienvenida/>
                {/*Franja divisoria de color, sin texto*/}
                <div aria-hidden="true" className="h-1 bg-terracotta"/>
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
