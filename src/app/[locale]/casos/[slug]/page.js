// src/app/[locale]/casos/[slug]/page.js
import HeroCaso from "@/components/caso-page/HeroCaso";
import ImpactCaso from "@/components/caso-page/ImpactCaso";
import SolutionCaso from "@/components/caso-page/SolutionCaso";
import Navbar from "@/components/navbar/Navbar";
import { getCase } from "@/actions/getCases";

// Función para obtener datos del caso desde getCase
async function getCasoData(slug, locale = "es") {
  const caseData = await getCase(slug, locale);

  if (!caseData) {
    return null;
  }

  // Función helper para obtener URLs de imágenes
  const getImageUrl = (imageData) => {
    if (!imageData) return "";
    const url =
      imageData.url ||
      imageData.data?.attributes?.url ||
      imageData.attributes?.url ||
      "";
    return url || "";
  };

  return {
    title: caseData.HeroTitle || "",
    description: caseData.HeroText || "",
    slug: caseData.Slug || "",

    // Datos para HeroCaso
    heroData: {
      brandLogo: getImageUrl(caseData.Logo),
      heroImage: getImageUrl(caseData.Image),
      brandLogoBlack: getImageUrl(caseData.BlackLogo),
      subtitle:
        caseData.HeroText || "",
      description:
        caseData.HeroText || "",
      metricValue:
        caseData.HeroNumber ||
        "",
      metricPrefix:
        caseData.HeroSymbol ||
        "",
      metricSuffix:
        caseData.HeroCurrency ||
        "",
      metricDescription:
        caseData.HeroNumberText || "",
      challengeTitle: caseData.ChallengeTitle  || "",
      challengeDescription:
        caseData.ChallengeText || "",
    },

    // Datos para SolutionCaso
    solutionData: {
      title: caseData.SolutionTitle || "",
      text1:
        caseData.SolutionText1 || "",
      text2:
        caseData.SolutionText2 || "",
    },

    // Datos para ImpactCaso
    impactData: {
      metrics: [
        {
          value:
            caseData.ImpactNumberList[0].Number || "",
          suffix:
            caseData.ImpactNumberList[0].Text || "",
          description:
            caseData.ImpactNumberList[0].Description || "",
        },
        {
          value:
            caseData.ImpactNumberList[1].Number || "",
          suffix:
            caseData.ImpactNumberList[1].Text || "",
          description:
            caseData.ImpactNumberList[1].Description || "",
        },
        {
          value:
            caseData.ImpactNumberList[2].Number || "",
          suffix:
            caseData.ImpactNumberList[2].Text || "",
          description:
            caseData.ImpactNumberList[2].Description || "",
        },
      ],
      impactTitle:
        caseData.ImpactTextListTitle || "",
      results: (caseData.ImpactTextList || []).map((item, index) => ({
        number: String(index + 1).padStart(2, "0"),
        description: item.Text || item.text || "",
      })),
    },

    // Metadatos para SEO
    // metaTitle:
    //   caseData.MetaTitle ||
    //   caseData.metaTitle ||
    //   caseData.Title ||
    //   caseData.title ||
    //   "",
    // metaDescription:
    //   caseData.MetaDescription ||
    //   caseData.metaDescription ||
    //   caseData.Description ||
    //   caseData.description ||
    //   "",
    // metaImage: getImageUrl(
    //   caseData.Image ||
    //     caseData.image ||
    //     caseData.MetaImage ||
    //     caseData.metaImage
    // ),
  };
}

// Función para generar metadatos dinámicos (SEO)
// export async function generateMetadata({ params }) {
//   const { slug, locale } = await params;
//   const data = await getCasoData(slug, locale);

//   if (!data) {
//     return {
//       title: "Caso no encontrado",
//       description: "El caso de éxito que buscas no existe.",
//     };
//   }

//   return {
//     title: data.metaTitle || data.title,
//     description: data.metaDescription || data.description,
//     openGraph: {
//       title: data.metaTitle || data.title,
//       description: data.metaDescription || data.description,
//       images: data.metaImage ? [data.metaImage] : ["/og-image.jpg"],
//       locale: locale,
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: data.metaTitle || data.title,
//       description: data.metaDescription || data.description,
//     },
//   };
// }

// Componente de página (Server Component)
export default async function CasoDeExitoPage({ params }) {
  const { slug, locale } = await params;
  const data = await getCasoData(slug, locale);

  // Si no se encuentra el caso, mostrar error
  if (!data) {
    return (
      <>
        <Navbar />
        <main className="pt-16 lg:pt-32 px-4">
          <h1 className="text-3xl font-semibold text-grey-40">
            Caso no encontrado
          </h1>
          <p className="mt-4 text-grey-20">
            El caso de éxito que buscas no existe.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-32">
        <HeroCaso slug={slug} title={data.title} data={data.heroData} />
        <SolutionCaso slug={slug} title={data.title} data={data.solutionData} />
        <ImpactCaso slug={slug} title={data.title} data={data.impactData} />
      </main>
    </>
  );
}
