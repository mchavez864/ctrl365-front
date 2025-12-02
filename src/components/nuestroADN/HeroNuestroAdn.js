import { getTranslations } from 'next-intl/server';
import SmallCard from '../cards/SmallCard';
import BigCard from '../cards/BigCard';
import WordReveal from '../animations/WordReveal';
import FadeInUp from '../animations/FadeInUp';

export default async function HeroNuestroAdn() {
  const t = await getTranslations('NuestroAdnPage.hero');

  return (
    <section
      className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 bg-grey-40 relative overflow-hidden rounded-bl-2xl rounded-br-2xl md:rounded-bl-4xl md:rounded-br-4xl z-10 bg-dots-flying"
      data-dark-section="true"
    >
      <div className="text-center relative z-10 py-16 lg:flex lg:items-center lg:justify-between lg:pt-64 lg:pb-32">
        <h1 className="text-grey-10 mb-8 lg:mb-0">
          <WordReveal
            applyGradient
            centered
          >
            {t('title')}
          </WordReveal>
        </h1>
        <p className="text-white !text-[18px] lg:max-w-[500px] text-left">
          <WordReveal
            delay={0.3}
            wordGap={2}
          >
            {t('description')}
          </WordReveal>
        </p>
      </div>
      <div className="relative z-20 pt-16 pb-32 lg:pt-32 lg:max-w-[824px] xxl:max-w-[1226px]">
        <SmallCard
          animated
          animationDelay={0.6}
          copy={t('smallCard')}
          colorCopy="text-white"
          className="uppercase mb-4"
        />
        <h2 className="text-white mb-8">
          <WordReveal
            delay={0.6}
            wordGap={5}
          >
            {t('subtitle')}
          </WordReveal>
        </h2>
        <p className="text-white !text-[18px]">
          <WordReveal
            delay={0}
            wordGap={2.5}
          >
            {t('content')}
          </WordReveal>
        </p>
      </div>
      <div className="relative z-20 flex flex-col gap-4 lg:flex-row">
        <FadeInUp
          delay={0}
          yOffset={100}
          className="lg:w-[50%]"
        >
          <BigCard
            title={t('mission.title')}
            copy={t('mission.description')}
            image="/images/pages/nuestro-adn/adn-mision.webp"
          />
        </FadeInUp>
        <FadeInUp
          delay={0.3}
          yOffset={100}
          className="lg:w-[50%]"
        >
          <BigCard
            title={t('vision.title')}
            copy={t('vision.description')}
            image="/images/pages/nuestro-adn/adn-vision.webp"
          />
        </FadeInUp>
      </div>
      <video
        className="opacity-10 absolute top-[495px] left-0 w-full z-10 overflow-hidden md:top-[295px] pointer-events-none object-cover"
        style={{
          transform: 'scale(1.3)',
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/videos/mesh-white.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
      <span className="z-0 absolute rounded-full filter blur-[150px] bottom-[-120px] left-[20%] w-[948px] h-[470px] bg-purple xxl:w-[1388px] lg:blur-[200px] xxl:h-[686px]"></span>
    </section>
  );
}
