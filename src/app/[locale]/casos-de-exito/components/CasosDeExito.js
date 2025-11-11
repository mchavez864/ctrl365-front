import SliderCasosDeExito from '../../../../components/sliders/SliderCasosDeExito';
import { getTranslations } from 'next-intl/server';

const SLIDER_MEDIA = [
  {
    id: 1,
    translationKey: 'santander',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-santander.svg',
    image:
      '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-santander.webp',
    link: '#',
  },
  {
    id: 2,
    translationKey: 'galicia',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-galicia.svg',
    image: '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-galicia.webp',
    link: '#',
  },
  {
    id: 3,
    translationKey: 'howden',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-howden.svg',
    image: '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-howden.webp',
    link: '#',
  },
];

export default async function CasosDeExito() {
  const t = await getTranslations('SuccessStoriesSlider');

  const slides = SLIDER_MEDIA.map(({ translationKey, ...slide }) => {
    return {
      ...slide,
      pre: t(`slides.${translationKey}.pre`),
      title: t(`slides.${translationKey}.title`),
      description: t(`slides.${translationKey}.description`),
      premetric: t(`slides.${translationKey}.metric.prefix`),
      metric: t(`slides.${translationKey}.metric.value`),
      postmetric: t(`slides.${translationKey}.metric.suffix`),
      metricDescription: t(`slides.${translationKey}.metricDescription`),
      ctaLabel: t(`slides.${translationKey}.ctaLabel`),
    };
  });

  return (
    <section className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 overflow-hidden">
      <div className="mb-16 text-center lg:text-left xl:flex xl:justify-between xl:items-start">
        <h2 className="mt-3 text-3xl font-semibold text-grey-40 md:text-4xl lg:text-5xl">
          {t('section.title')}
        </h2>
        <p className="mt-4 max-w-xl text-base text-grey-20 md:text-lg">
          {t('section.description')}
        </p>
      </div>
      <SliderCasosDeExito slides={slides} />
    </section>
  );
}
