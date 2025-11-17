// src/app/[locale]/casos/[slug]/page.js
import HeroCaso from '@/components/caso-page/HeroCaso';
import SolutionCaso from '@/components/caso-page/SolutionCaso';
import Navbar from '@/components/navbar/Navbar';

// Función para obtener datos de Strapi (hardcodeado por ahora)
async function getCasoData(slug) {
  // Por ahora retorna datos hardcodeados
  // En el futuro: const res = await fetch(`${STRAPI_URL}/api/casos/${slug}`)
  return {
    title: `Automatización inteligente de créditos`,
    description: 'Descripción del caso de éxito',
    heroData: {
      /* datos del hero */
    },
    imageData: {
      /* datos de imágenes */
    },
    textData: {
      /* datos de textos */
    },
  };
}

// Función para generar metadatos dinámicos (SEO)
export async function generateMetadata({ params }) {
  const { slug, locale } = params;
  const data = await getCasoData(slug);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: ['/og-image.jpg'],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
    },
  };
}

// Componente de página (Server Component)
export default async function CasoDeExitoPage({ params }) {
  const { slug } = params;
  const data = await getCasoData(slug);

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-32">
        <HeroCaso
          slug={slug}
          title={data.title}
          data={data.heroData}
        />
        <SolutionCaso />
      </main>
    </>
  );
}
