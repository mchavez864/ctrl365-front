import { getTranslations } from 'next-intl/server';
import SmallCard from '../cards/SmallCard';
import BigCard from '../cards/BigCard';

export default async function HeroNuestroAdn() {
  const t = await getTranslations('ContactPage.hero');

  return (
    <section
      className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 bg-grey-40 relative overflow-hidden rounded-bl-2xl rounded-br-2xl md:rounded-bl-4xl md:rounded-br-4xl z-10"
      data-dark-section="true"
    >
      <div className="text-center relative z-10 py-16 lg:flex lg:items-center lg:justify-between lg:pt-64 lg:pb-32">
        <h1 className="text-white mb-8 lg:mb-0">Nuestro ADN</h1>
        <p className="text-white !text-[18px] lg:max-w-[500px] text-left">
          Somos un aliado estratégico para organizaciones que buscan resultados
          reales, no promesas.
        </p>
      </div>
      <div className="relative z-10 py-16 lg:py-32 lg:max-w-[824px]">
        <SmallCard
          copy="Transformamos con propósito"
          colorCopy="text-white"
          className="uppercase mb-4"
        />
        <h2 className="text-white mb-8">
          En Ctrl365 no implementamos tecnología: diseñamos impacto
        </h2>
        <p className="text-white !text-[18px]">
          Integramos automatización, inteligencia artificial y estrategia de
          negocio para generar eficiencia, crecimiento y transformación medible.
        </p>
      </div>
      <div className="relative z-10 flex flex-col gap-4 lg:flex-row">
        <BigCard
          title="Misión"
          copy="Extender las capacidades humanas con inteligencia aplicada."
          image="/images/pages/nuestro-adn/adn-mision.webp"
          className="lg:w-[50%]"
        />
        <BigCard
          title="Visión"
          copy="Crear soluciones reales que transformen la vida de las personas y del planeta."
          image="/images/pages/nuestro-adn/adn-vision.webp"
          className="lg:w-[50%]"
        />
      </div>
      <span className="z-0 absolute rounded-full filter blur-[150px] bottom-[-120px] left-[20%] w-[948px] h-[470px] bg-purple xxl:w-[1388px] lg:blur-[200px] xxl:h-[686px]"></span>
    </section>
  );
}
