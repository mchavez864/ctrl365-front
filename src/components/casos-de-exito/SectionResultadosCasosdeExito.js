import SliderCasosDeExito from '@/components/sliders/SliderCasosDeExito';
import { getTranslations } from 'next-intl/server';
import SectionResultadosClient from './SectionResultadosClient';

const RESULTADOS_SLIDES_KEYS = ['list-1', 'list-2'];

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

  const sectionData = {
    title: t('section.title'),
    description: t('section.description'),
  };

  return (
    <SectionResultadosClient
      slides={slides}
      sectionData={sectionData}
    />
  );
}
