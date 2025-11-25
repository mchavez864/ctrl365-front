import Image from "next/image";
import Button from "@/components/buttons/Button";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import Impacto from "@/components/home/Impacto";
import OurDNA from "@/components/home/OurDNA";
import Quote from "@/components/home/Quote";
import CasosDeExito from "@/components/home/CasosDeExito";
import Soluciones from "@/components/soluciones/Soluciones";
import SectionForm from '@/components/sections/SectionForm';
import FadeInUp from "@/components/animations/FadeInUp";

export default async function Home() {
  const t = await getTranslations("Home");
  return (
    <main className="bg-grey-40 relative">
      <FadeInUp animateOnMount delay={0} duration={0.6} yOffset={20}>
        <Navbar />
      </FadeInUp>
      <Hero />
      <Soluciones/>
      <CasosDeExito />
      <Impacto />
      <OurDNA />
      <Quote />
      <SectionForm
        subject="Llega a jaubetete?"
        destination="matias@jaubet.com"
      />
    </main>
  );
}
