'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Button from '../buttons/Button';
import SliderBase from '../sliders/SliderBase';
import WordReveal from '../animations/WordReveal';
import FadeInUp from '../animations/FadeInUp';

const PremiosReconocimientos = () => {
  const t = useTranslations('NuestroAdnPage.premios');
  const sliderRef = useRef(null);
  const titleContainerRef = useRef(null);

  // Scroll-based animation for "avalados por" and "365"
  const { scrollYProgress } = useScroll({
    target: titleContainerRef,
    offset: ["start end", "center center"],
  });

  // "avalados por" comes from left (-100% to 0%)
  const avaladosX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  
  // "365" comes from right (100% to 0%)
  const num365X = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  useEffect(() => {
    let interval = null;

    // Esperar a que el slider se monte
    const timeout = setTimeout(() => {
      const forceButtonsEnabled = () => {
        if (sliderRef.current) {
          const prevButton = sliderRef.current.querySelector(
            'button[aria-label="Slide anterior"]'
          );
          const nextButton = sliderRef.current.querySelector(
            'button[aria-label="Slide siguiente"]'
          );

          if (prevButton) {
            prevButton.disabled = false;
            if (prevButton.classList.contains('border-[#9E9E9E]')) {
              prevButton.classList.remove('border-[#9E9E9E]', 'bg-transparent');
              prevButton.classList.add('bg-none', 'bg-grey-30');
            }
            prevButton.style.pointerEvents = 'auto';
            prevButton.style.cursor = 'pointer';

            const prevArrow = prevButton.querySelector('svg path');
            if (prevArrow) {
              prevArrow.setAttribute('fill', '#FFFFFF');
              prevArrow.style.fill = '#FFFFFF';
            }
          }

          if (nextButton) {
            nextButton.disabled = false;
            if (nextButton.classList.contains('border-[#9E9E9E]')) {
              nextButton.classList.remove('border-[#9E9E9E]', 'bg-transparent');
              nextButton.classList.add(
                'bg-gradient-to-br',
                'from-[#c2bfbf]',
                'to-[#d2cfce]',
                'border-grey-20/40'
              );
            }
            nextButton.style.pointerEvents = 'auto';
            nextButton.style.cursor = 'pointer';

            const nextArrow = nextButton.querySelector('svg path');
            if (nextArrow) {
              nextArrow.setAttribute('fill', '#FFFFFF');
              nextArrow.style.fill = '#FFFFFF';
            }
          }
        }
      };

      // Verificar periódicamente
      interval = setInterval(forceButtonsEnabled, 200);
      forceButtonsEnabled();
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

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
              style={{ x: avaladosX }}
              className="h1 lg:text-[128px]! lg:tracking-[-5.12px]! lg:leading-[120%]! text-grey-00 text-center py-[56px] z-30 relative lg:py-0 lg:text-right"
            >
              {t('avaladosPor')}
            </motion.p>
            <motion.div 
              style={{ x: num365X }}
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
        <div
          className="w-full relative z-20 "
          ref={sliderRef}
        >
          <p className="h2 text-grey-00 mb-[32px] px-[16px] md:max-w-[328px] md:px-[64px] lg:max-w-[1000px] xxl:px-[128px]">
            <WordReveal wordGap={5}>{t('premiosY')}</WordReveal>{' '}
            <span className="text-grey-20"><WordReveal wordGap={5}>{t('reconocimientos')}</WordReveal></span>
          </p>
          <SliderBase
            slides={premios}
            footerClassName="bg-transparent py-[32px]"
            progressTrackClassName="hidden"
            progressBarClassName="hidden"
            buttonClassName="mr-[16px] lg:mr-[64px]"
            buttonArrowColor="#FFFFFF"
            buttonPrevClassName="bg-none bg-grey-30"
            buttonNextClassName="bg-none glass"
            renderSlide={(premio) => (
              <div className="flex items-center justify-center h-full">
                <Image
                  src={premio.imgUrl}
                  alt={`Premio ${premio.id}`}
                  width={200}
                  height={100}
                  className="object-contain max-h-[100px] w-auto"
                />
              </div>
            )}
            swiperConfig={{
              slidesPerView: 2.5,
              spaceBetween: 24,
              loop: true,

              allowSlidePrev: true,
              allowSlideNext: true,
              breakpoints: {
                768: {
                  slidesPerView: 4.5,
                  spaceBetween: 16,
                  slidesOffsetBefore: 64,
                },
                1280: {
                  slidesPerView: 6.5,
                  spaceBetween: 40,
                },
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default PremiosReconocimientos;
