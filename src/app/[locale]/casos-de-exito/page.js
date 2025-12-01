import Navbar from '@/components/navbar/Navbar';
import SectionCasosDeExito from '@/components/casos-de-exito/SectionCasosDeExito';
import SectionResultadosCasosdeExito from '@/components/casos-de-exito/SectionResultadosCasosdeExito';
import ResultadosWrapper from '@/components/casos-de-exito/ResultadosWrapper';
import SectionForm from '@/components/sections/SectionForm';
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('CasosDeExitoPage.seo');
  const locale = await getLocale();

  const baseUrl = 'https://ctrl365.com';
  const canonicalUrl =
    locale === 'es'
      ? `${baseUrl}/casos-de-exito`
      : `${baseUrl}/en/casos-de-exito`;
  const ogImageUrl = `${baseUrl}${t('ogImage')}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/casos-de-exito`,
        en: `${baseUrl}/en/casos-de-exito`,
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
        <ResultadosWrapper />
        <SectionCasosDeExito />
        <SectionResultadosCasosdeExito />
        <SectionForm
          subject="Llega a jaubetete?"
          destination="matias@jaubet.com"
        />
      </main>
    </>
  );
}
