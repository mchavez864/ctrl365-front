import Image from 'next/image';
import Button from '@/components/buttons/Button';
// import { useTranslations } from "next-intl";
import { getTranslations, getLocale } from 'next-intl/server';
import Hero from '@/components/hero/Hero';
import Navbar from '@/components/navbar/Navbar';
import Impacto from '@/components/home/Impacto';
import OurDNA from '@/components/home/OurDNA';
import Quote from '@/components/home/Quote';
import CasosDeExito from '@/components/home/CasosDeExito';
import Soluciones from '@/components/soluciones/Soluciones';
import SectionForm from '@/components/sections/SectionForm';
import FadeInUp from '@/components/animations/FadeInUp';

export async function generateMetadata() {
  const t = await getTranslations('Home.seo');
  const locale = await getLocale();

  const baseUrl = 'https://ctrl365.com';
  const canonicalUrl = locale === 'es' ? baseUrl : `${baseUrl}/${locale}`;
  const ogImageUrl = `${baseUrl}${t('ogImage')}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: baseUrl,
        en: `${baseUrl}/en`,
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

export default async function Home() {
  const t = await getTranslations('Home');
  return (
    <main className="bg-grey-40 relative">
      <FadeInUp
        animateOnMount
        delay={0}
        duration={0.6}
        yOffset={20}
      >
        <Navbar />
      </FadeInUp>
      <Hero />
      <Soluciones />
      <CasosDeExito />
      <Impacto />
      <OurDNA />
      <Quote />
      <div id="contact"></div>
      <SectionForm
        subject="Llega a jaubetete?"
        destination="matias@jaubet.com"
      />
    </main>
  );
}
