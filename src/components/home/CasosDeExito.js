import SliderCasosDeExito from '../sliders/SliderCasosDeExito';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Button from '../buttons/Button';

const SLIDER_MEDIA = [
  {
    id: 1,
    translationKey: 'santander',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-santander.svg',
    image:
      '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-santander.webp',
    link: '/casos/example-case',
  },
  {
    id: 2,
    translationKey: 'galicia',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-galicia.svg',
    image: '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-galicia.webp',
    link: '/casos/example-case',
  },
  {
    id: 3,
    translationKey: 'howden',
    brand: '/images/pages/casos-de-uso/slider-casos-de-uso/logo-howden.svg',
    image: '/images/pages/casos-de-uso/slider-casos-de-uso/imagen-howden.webp',
    link: '/casos/example-case',
  },
];

export default async function SectionCasosDeExito() {
  const t = await getTranslations('SuccessStoriesSlider');
  const tPage = await getTranslations('Home.SuccessStories');

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
    <section className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 overflow-hidden relative bg-grey-10">
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
      <div className="mb-[32px] text-center flex flex-col items-center gap-[16px] lg:gap-[32px]">
        <Image
          src="/images/elements/over.png"
          alt=""
          width={156}
          height={60}
          className="md:w-[230px] lg:w-[333px]"
        />
        <h2 className="h1 md:max-w-[400px] lg:max-w-[800px]">
          {tPage('section.title')} <br />
          <span className="text-grey-20">{tPage('section.span')}</span>
        </h2>
        <Button
          variant="black"
          copy={tPage('section.button')}
          url="/casos-de-exito"
        />
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
