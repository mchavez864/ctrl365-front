import Navbar from '@/components/navbar/Navbar';
import NuestroDiferencial from '@/components/nuestroADN/NuestroDiferencial';
import Frameworks from '@/components/nuestroADN/Frameworks';
import HeroNuestroAdn from '@/components/nuestroADN/HeroNuestroAdn';
import PaisesNuestroAdn from '@/components/nuestroADN/PaisesNuestroAdn';
import PremiosReconocimientos from '@/components/nuestroADN/PremiosReconocimientos';
import Contacto from '@/components/nuestroADN/Contacto';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('NuestroAdnPage.seo');
  const locale = await getLocale();

  const baseUrl = 'https://ctrl365.com';
  const canonicalUrl = locale === 'es' ? `${baseUrl}/nuestro-adn` : `${baseUrl}/en/nuestro-adn`;
  const ogImageUrl = `${baseUrl}${t('ogImage')}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/nuestro-adn`,
        en: `${baseUrl}/en/nuestro-adn`,
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonicalUrl,
      siteName: 'Ctrl365',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
        },
      ],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [ogImageUrl],
    },
  };
}

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main className="">
        <HeroNuestroAdn />
        <PaisesNuestroAdn />
        <Frameworks />
        <NuestroDiferencial />
        <PremiosReconocimientos />
        <Contacto />
      </main>
    </>
  );
}
