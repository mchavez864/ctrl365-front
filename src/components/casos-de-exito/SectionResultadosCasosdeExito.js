import SliderCasosDeExito from '@/components/sliders/SliderCasosDeExito';
import { getTranslations } from 'next-intl/server';

const RESULTADOS_SLIDES_KEYS = ['list-1', 'list-2', 'list-3', 'list-4'];

export default async function SectionResultadosCasosdeExito() {
  const t = await getTranslations('ResultadosCasosdeExitoSlider');

  const slides = RESULTADOS_SLIDES_KEYS.map((key) => {
    const rawSlide = t.raw(`slides.${key}`);
    const itemKeys = Array.isArray(rawSlide) ? rawSlide : [];
    return {
      id: key,
      items: itemKeys.map((itemKey) => ({
        id: itemKey,
        title: t(`items.${itemKey}.title`),
        description: t(`items.${itemKey}.description`),
      })),
    };
  });

  return (
    <section className="overflow-hidden px-4 py-16 md:px-16 xl:py-32 xxl:px-32">
      <div className="mb-16 text-center lg:text-left xl:flex xl:items-start xl:justify-between">
        <h2 className="mt-3 text-3xl font-semibold text-grey-40 md:text-4xl lg:text-5xl">
          {t('section.title')}
        </h2>
        <p className="mt-4 max-w-xl text-base text-grey-20 md:text-lg">
          {t('section.description')}
        </p>
      </div>

      <div className="flex flex-col gap-10 rounded-[48px] bg-grey-00/6 p-6 md:flex-row md:items-start md:p-10">
        <div className="hidden lg:block justify-center items-start lg:w-1/3">
          <img
            src="/images/animaciones/orbe-de-particulas.gif"
            alt=""
            width={340}
            height={340}
            className="max-h-[320px] w-auto object-contain"
            loading="lazy"
          />
        </div>
        <div className="w-full lg:w-2/3">
          <SliderCasosDeExito
            slides={slides}
            variant="list"
            swiperConfig={{
              slidesPerView: 1,
              spaceBetween: 0,
              className: '',
              effect: 'fade',
              fadeEffect: { crossFade: true },
            }}
            footerClassName="bg-transparent mt-8 lg:px-6"
            labelClassName="!text-grey-30 "
            progressTrackClassName="max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
