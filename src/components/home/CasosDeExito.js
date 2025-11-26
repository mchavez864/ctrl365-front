import SliderCasosDeExito from "../sliders/SliderCasosDeExito";
import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import Button from "../buttons/Button";
import FadeInUp from "../animations/FadeInUp";
import RevealTextAnimation from "../animations/RevealTextAnimation";
import { getCases } from "@/actions/getCases";

export default async function SectionCasosDeExito() {
  const t = await getTranslations("SuccessStoriesSlider");
  const tPage = await getTranslations("Home.SuccessStories");
  const locale = await getLocale();
  const cases = await getCases(locale);

  // Función helper para construir URLs de Strapi
  const getImageUrl = (imageData) => {
    if (!imageData) return "";
    
    // La estructura de Strapi tiene url directamente en el objeto Image
    // url ya viene como URL absoluta desde Azure Blob Storage
    const url = imageData.url || imageData.data?.attributes?.url || imageData.attributes?.url || "";
    if (!url) return "";
    
    // Si la URL ya es absoluta, retornarla directamente
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    
    // Si es relativa, construir la URL completa
    const cmsBaseUrl = process.env.CMS_URL_API?.replace("/api", "") || "";
    return `${cmsBaseUrl}${url}`;
  };

  // // Validar que cases sea un array válido
  // if (!cases || !Array.isArray(cases) || cases.length === 0) {
  //   return null;
  // }

  // Mapear los casos de la API a la estructura esperada por CaseCard
  const slides = cases.map((caseItem, index) => {
    // Construir URLs de imágenes
    const imageUrl = getImageUrl(caseItem.Image);
    const brandUrl = getImageUrl(caseItem.Logo);
    
    
    // Construir el link usando el slug
    const link = caseItem.Slug || caseItem.slug
      ? `/casos/${caseItem.Slug || caseItem.slug}`
      : caseItem.link || "/casos/example-case";

    return {
      id: caseItem.id || index + 1,
      brand: brandUrl,
      image: imageUrl,
      link: link,
      pre: t("slides.results"),
      title: caseItem.CardTitle || "",
      description: caseItem.CardText || "",
      premetric: caseItem.CardSymbol || "",
      metric: caseItem.CardNumber || "",
      postmetric: "%",
      metricDescription: caseItem.CardNumberText || "",
      ctaLabel: t("slides.ctaLabel"),
    };
  });

console.log("slides", slides);
console.log("cases", cases);

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
          <RevealTextAnimation>{tPage("section.title")} </RevealTextAnimation>
          <RevealTextAnimation delay={0.2}>
            <span className="text-grey-20">{tPage("section.span")}</span>
          </RevealTextAnimation>
        </h2>
        <FadeInUp>
        <Button
          variant="black"
          copy={tPage("section.button")}
          url="/casos-de-exito"
        />
        </FadeInUp>
      </div>
      <SliderCasosDeExito
        swiperConfig={{
          slidesPerView: 1.1,
          spaceBetween: 16,
          className: "!overflow-visible",
        }}
        slides={slides}
        footerClassName="mt-8"
        progressTrackClassName="max-w-md"
      />
    </section>
  );
}
