import SliderCasosDeExito from '../sliders/SliderCasosDeExito';
import { getTranslations } from 'next-intl/server';

const SLIDER_MEDIA = [
  {
    id: 1,
    translationKey: 'santander',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-santander.svg',
    image:
      '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-santander.webp',
    link: '/casos/',
  },
  {
    id: 2,
    translationKey: 'galicia',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-galicia.svg',
    image: '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-galicia.webp',
    link: '/casos/',
  },
  {
    id: 3,
    translationKey: 'howden',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-howden.svg',
    image: '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-howden.webp',
    link: '/casos/',
  },
];

export default async function SectionCasosDeExito() {
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
