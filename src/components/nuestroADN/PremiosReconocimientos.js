'use client';
import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import WordReveal from '../animations/WordReveal';
import FadeInUp from '../animations/FadeInUp';

const PremiosReconocimientos = () => {
  const t = useTranslations('NuestroAdnPage.premios');
  const titleContainerRef = useRef(null);

  // Scroll-based animation for "avalados por" and "365"
  const { scrollYProgress } = useScroll({
    target: titleContainerRef,
    offset: ["start end", "center center"],
  });

  // "avalados por" comes from left (-100% to 0%)
  const avaladosX = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  
  // "365" comes from right (100% to 0%)
  const num365X = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);

  // Opacity goes from 0 to 1
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const premios = [
    {
      id: 1,
      imgUrl: '/images/pages/nuestro-adn/iqnet.svg',
    },
    {
      id: 2,
      imgUrl: '/images/pages/nuestro-adn/microsoft-modern-work.svg',
    },
    {
      id: 3,
      imgUrl: '/images/pages/nuestro-adn/microsoft-innovation.svg',
    },
    {
      id: 4,
      imgUrl: '/images/pages/nuestro-adn/microsoft-ai.svg',
    },
    {
      id: 5,
      imgUrl: '/images/pages/nuestro-adn/blueprism-platinum.svg',
    },
    {
      id: 6,
      imgUrl: '/images/pages/nuestro-adn/award.svg',
    },
    {
      id: 7,
      imgUrl: '/images/pages/nuestro-adn/iram.svg',
    },
  ];

  return (
    <section
      data-dark-section="true"
      className="relative h-[715px]  lg:h-[1071px] bg-grey-10  overflow-hidden "
    >
      <div className="relative z-30 w-full h-full bg-grey-40 rounded-[16px] lg:rounded-[32px] py-[64px] lg:py-[128px] ">
        <div
          className="absolute bottom-[-81px] md:bottom-[-121px] left-1/2 -translate-x-1/2 z-10 bg-purple 
      rounded-full w-[256px] md:w-[386px] h-[179px] md:h-[269px] lg:w-[980px] lg:h-[686px]  lg:bottom-[-500px] 
      blur-2xl will-change-transform lg:blur-3xl"
        ></div>
        <div className="lg:flex lg:h-[351px] lg:justify-between lg:items-center lg:px-[64px] lg:mb-[128px] xxl:px-[128px]">
          <div 
            ref={titleContainerRef}
            className="w-[328px] h-[151px] mx-auto relative z-10 px-[16px] md:px-[64px] md:w-[365px] md:h-[145px] lg:px-0 lg:w-[558px] lg:h-[308px] lg:mx-0 "
          >
            <motion.p 
              style={{ x: avaladosX, opacity: titleOpacity }}
              className="h1 lg:text-[128px]! lg:tracking-[-5.12px]! lg:leading-[120%]! text-grey-00 text-center py-[56px] z-30 relative lg:py-0 lg:text-right"
            >
              {t('avaladosPor')}
            </motion.p>
            <motion.div 
              style={{ x: num365X, opacity: titleOpacity }}
              className="absolute flex items-center justify-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[365px] h-[147px] lg:w-[548px] lg:h-[218px] lg:-bottom-[43px] lg:top-auto lg:left-auto lg:-right-[90px] lg:translate-x-0 lg:translate-y-0 lg:justify-end "
            >
              <p className=" text-grey-30 text-[220px]! opacity-10 font-bold! lg:text-[300px]! lg:tracking-[-21px]! lg:leading-[100%]!">
                365
              </p>
            </motion.div>
          </div>
          <div className="flex items-center justify-between md:justify-center md:gap-[32px] lg:gap-[64px] mt-[32px] mb-[64px] px-[16px]">
            <FadeInUp delay={0.2}>
            <Image
              src="/images/pages/nuestro-adn/blueprism.svg"
              alt=""
              width={200}
              height={67}
              className="w-[150] h-[50px] lg:w-[200px] lg:h-[67px]"
            />
            </FadeInUp>
            <FadeInUp delay={0.4}>
            <Image
              src="/images/pages/nuestro-adn/microsoft.svg"
              alt=""
              width={200}
              height={67}
              className="w-[150] h-[50px] lg:w-[200px] lg:h-[67px]"
            />
            </FadeInUp>
          </div>
        </div>
        <div className="w-full relative z-20">
          <p className="h2 text-grey-00 mb-[32px] px-[16px] md:max-w-[328px] md:px-[64px] lg:max-w-[1000px] xxl:px-[128px]">
            <WordReveal wordGap={5}>{t('premiosY')}</WordReveal>{' '}
            <span className="text-grey-20"><WordReveal wordGap={5}>{t('reconocimientos')}</WordReveal></span>
          </p>
          
          {/* Marquesina infinita */}
          <div className="relative overflow-hidden w-full marquee-container">
            {/* Gradient fades en los bordes */}
            <div className="absolute left-0 top-0 bottom-0 w-[60px] lg:w-[120px] bg-gradient-to-r from-grey-40 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-[60px] lg:w-[120px] bg-gradient-to-l from-grey-40 to-transparent z-10 pointer-events-none" />
            
            <div className="marquee-track">
              {/* Múltiples copias para cubrir cualquier ancho de pantalla */}
              {[...Array(4)].map((_, copyIndex) => (
                <div 
                  key={copyIndex} 
                  className="marquee-content"
                  aria-hidden={copyIndex > 0}
                >
                  {premios.map((premio) => (
                    <div 
                      key={`${copyIndex}-${premio.id}`} 
                      className="flex-shrink-0 flex items-center justify-center px-[24px] lg:px-[40px]"
                    >
                      <Image
                        src={premio.imgUrl}
                        alt={`Premio ${premio.id}`}
                        width={200}
                        height={100}
                        className="object-contain h-[60px] lg:h-[100px] w-auto"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiosReconocimientos;
