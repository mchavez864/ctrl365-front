'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';

const Impacto = () => {
  const t = useTranslations('Home.impacto');
  const cards = t.raw('cards');
  const [currentCard, setCurrentCard] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef(null);
  const lastCardRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (e) => {
      setIsDesktop(e.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const updateCard = useCallback((latest) => {
    const cardIndex = Math.min(
      Math.floor(latest * cards.length),
      cards.length - 1
    );
    if (cardIndex !== lastCardRef.current) {
      lastCardRef.current = cardIndex;
      setCurrentCard(cardIndex);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', updateCard);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${cards.length * 80}vh` }}
      data-dark-section="true"
    >
      <section className="sticky top-0 bg-grey-40 overflow-hidden h-screen px-[16px] md:px-[146px] lg:px-[128px] xxl:px-[256px] py-[64px] flex flex-col items-center justify-center ">
        {/* Área del porcentaje - posición absoluta fija */}
        <div className="relative h-[400px] md:h-[547px] w-full lg:flex lg:items-center lg:h-auto lg:min-h-[400px] lg:gap-[64px] lg:justify-center lg:w-[870px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2  w-full max-w-4xl lg:relative lg:translate-y-0 lg:translate-x-0 lg:top-0 lg:left-0 lg:w-[470px]">
            <div className="w-full md:h-[230px] pb-[55px] md:pb-0 md:mb-[128px] flex items-center justify-center lg:mb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="flex items-center gap-2"
                >
                  {cards[currentCard].symbol && (
                    <p className="text-grey-00 text-[36px]! leading-[110%]! tracking-[-0.72px]!">
                      {cards[currentCard].symbol}
                    </p>
                  )}
                  {cards[currentCard].percentage && (
                    <div className="flex items-center gap-2">
                      <p className="text-grey-00 font-sora text-[96px]! leading-[110%]! tracking-[-0.96px]!">
                        {cards[currentCard].percentage}
                      </p>
                      <p className="text-grey-00 text-[36px]! leading-[110%]! tracking-[-0.72px]!">
                        %
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Contenedor del contenido de texto - posición absoluta fija desde un punto */}

          <div className="absolute lg:relative top-[200px] md:top-auto md:bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl lg:w-[380px] lg:max-w-full lg:translate-y-0 lg:translate-x-0 lg:top-0 lg:left-0">
            <div className="lg:flex lg:flex-col lg:items-start lg:justify-start lg:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{
                    opacity: 0,
                    y: isDesktop && currentCard === 0 ? '20%' : '0%',
                  }}
                  animate={{
                    opacity: 1,
                    y: isDesktop && currentCard === 0 ? '20%' : '0%',
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="lg:flex lg:flex-col lg:items-start"
                >
                  {cards[currentCard].number && (
                    <div className="flex items-center gap-2 pl-[4px] mb-[20px]">
                      <div className="bg-orange w-[12px] h-[12px] rounded-full"></div>
                      <p className="text-grey-00 font-inter text-base! leading-[120%]! font-medium ">
                        {cards[currentCard].number}
                      </p>
                    </div>
                  )}
                  <p className="text-grey-00 h2 pb-[16px] gradient-text">
                    {cards[currentCard].title}
                  </p>
                  <p className="text-grey-00 pb-[16px] text-xl font-semibold xxl:w-[550px]">
                    {cards[currentCard].desc1}
                  </p>
                  <p className="text-grey-00 text-lg xxl:w-[550px]">
                    {cards[currentCard].desc2}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impacto;
