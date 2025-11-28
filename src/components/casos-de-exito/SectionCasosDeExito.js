import SliderCasosDeExito from '../sliders/SliderCasosDeExito';
import { getTranslations, getLocale } from 'next-intl/server';
import { getCases } from '@/actions/getCases';

export default async function SectionCasosDeExito() {
  const t = await getTranslations('SuccessStoriesSlider');
  const locale = await getLocale();
  const cases = await getCases(locale);

  // Función helper para construir URLs de Strapi
  const getImageUrl = (imageData) => {
    if (!imageData) return '';

    // La estructura de Strapi tiene url directamente en el objeto Image
    // url ya viene como URL absoluta desde Azure Blob Storage
    const url =
      imageData.url ||
      imageData.data?.attributes?.url ||
      imageData.attributes?.url ||
      '';
    if (!url) return '';

    // Si la URL ya es absoluta, retornarla directamente
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // Si es relativa, construir la URL completa
    const cmsBaseUrl = process.env.CMS_URL_API?.replace('/api', '') || '';
    return `${cmsBaseUrl}${url}`;
  };

  // // Validar que cases sea un array válido
  // if (!cases || !Array.isArray(cases) || cases.length === 0) {
  //   return null;
  // }

  // Mapear los casos de la API a la estructura esperada por CaseCard
  const slides = cases.map((caseItem, index) => {
    // Construir URLs de imágenes
    const imageUrl = getImageUrl(caseItem.Image);
    const brandUrl = getImageUrl(caseItem.Logo);

    // Construir el link usando el slug
    const link =
      caseItem.Slug || caseItem.slug
        ? `/casos/${caseItem.Slug || caseItem.slug}`
        : caseItem.link || '/casos/example-case';

    // Detectar si el caso es el de geoespacial/geospatial
    const title = (caseItem.CardTitle || '').trim();
    const description = (caseItem.CardText || '').trim();
    const slug = (caseItem.Slug || caseItem.slug || '').toLowerCase();

    // Búsqueda simple en minúsculas (sin normalización compleja)
    const titleLower = title.toLowerCase();
    const descriptionLower = description.toLowerCase();

    const isGeospatial =
      titleLower.includes('geoespacial') ||
      titleLower.includes('geospatial') ||
      descriptionLower.includes('geoespacial') ||
      descriptionLower.includes('geospatial') ||
      slug.includes('geoespacial') ||
      slug.includes('geospatial');

    // Debug log - MIRA LA TERMINAL DEL SERVIDOR
    console.log('🔍 Case Debug:', {
      id: caseItem.id,
      title: title.substring(0, 40),
      slug,
      isGeospatial,
      postmetric: isGeospatial ? '% M' : '%',
    });

    return {
      id: caseItem.id || index + 1,
      brand: brandUrl,
      image: imageUrl,
      link: link,
      pre: t('slides.results'),
      title: title,
      description: description,
      premetric: caseItem.CardSymbol || '',
      metric: caseItem.CardNumber || '',
      postmetric: isGeospatial ? '% M' : '%',
      metricDescription: caseItem.CardNumberText || '',
      ctaLabel: t('slides.ctaLabel'),
    };
  });

  return (
    <section className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 overflow-hidden relative">
      <img
        src="/images/pages/casos-de-uso/slider-casos-de-uso/left.png"
        alt=""
        className="absolute top-0 left-[50%] translate-x-[-50%] opacity-50 xl:translate-x-[-20%] xl:left-0"
      />
      <img
        src="/images/pages/casos-de-uso/slider-casos-de-uso/right.png"
        alt=""
        className="hidden absolute top-0 right-0 opacity-50 xl:block xl:translate-x-[20%]"
      />
      <div className="mb-16 text-center lg:text-left xl:flex xl:justify-between xl:items-start">
        <h2 className="mt-3 text-3xl font-semibold text-grey-40 md:text-4xl lg:text-5xl">
          {t('section.title')}
        </h2>
        <p className="mt-4 max-w-xl text-base text-grey-20 md:text-lg">
          {t('section.description')}
        </p>
      </div>
      <SliderCasosDeExito
        swiperConfig={{
          slidesPerView: 1.1,
          spaceBetween: 16,
          className: '!overflow-visible',
        }}
        slides={slides}
        footerClassName="mt-8"
        progressTrackClassName="max-w-md"
      />
    </section>
  );
}
