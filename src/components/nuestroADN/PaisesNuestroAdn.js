import { getTranslations } from 'next-intl/server';
import PaisesNuestroAdnClient from './PaisesNuestroAdnClient';

// Server Component - Obtiene las traducciones
export default async function PaisesNuestroAdn() {
  const t = await getTranslations('NuestroAdnPage.paises');

  return (
    <PaisesNuestroAdnClient
      paragraph1={t('paragraph1')}
      paragraph2={t('paragraph2')}
    />
  );
}
