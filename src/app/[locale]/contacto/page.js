import Navbar from '@/components/navbar/Navbar';
import HeroPage from '@/components/hero/HeroPage';
import SectionForm from '@/components/sections/SectionForm';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('ContactPage.seo');
  const locale = await getLocale();

  const baseUrl = 'https://ctrl365.com';
  const canonicalUrl = locale === 'es' ? `${baseUrl}/contacto` : `${baseUrl}/en/contacto`;
  const ogImageUrl = `${baseUrl}${t('ogImage')}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/contacto`,
        en: `${baseUrl}/en/contacto`,
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

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-40">
        <HeroPage />
        <SectionForm />
      </main>
    </>
  );
}
