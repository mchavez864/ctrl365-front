// src/app/[locale]/casos/[slug]/page.js
import Navbar from '@/components/navbar/Navbar';

export default function CasoDeExitoPage({ params }) {
  const { slug } = params;

  return (
    <>
      <Navbar />
      <main className="pt-40">
        <h1>Caso de Éxito: {slug}</h1>
        {/* Aquí puedes hardcodear contenido mientras esperas Strapi */}
      </main>
    </>
  );
}
