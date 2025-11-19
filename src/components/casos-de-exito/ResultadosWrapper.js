import { getTranslations } from 'next-intl/server';
import Resultados from './Resultados';

// Server Component - Obtiene las traducciones
export default async function ResultadosWrapper() {
  const t = await getTranslations('CasosDeExitoPage.resultados');

  // Obtener las cards del JSON
  const cards = [];
  for (let i = 0; i < 8; i++) {
    cards.push({
      id: i + 1,
      number: t(`cards.${i}.number`),
      symbol: t(`cards.${i}.symbol`),
      modifier: t(`cards.${i}.modifier`),
      desc: t(`cards.${i}.desc`),
    });
  }

  return (
    <Resultados
      title={t('title')}
      paragraph1={t('paragraph1')}
      paragraph2={t('paragraph2')}
      tagline={t('tagline')}
      cards={cards}
    />
  );
}

