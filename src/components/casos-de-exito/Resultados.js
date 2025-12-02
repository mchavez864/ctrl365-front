'use client';
import React, { useState, memo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import WordReveal from '../animations/WordReveal';

// Componente Card memoizado para evitar re-renders innecesarios
const ResultadoCard = memo(
  ({ resultado, index, isActive, onCardClick, onCardHover, onCardLeave }) => {
    // Ref para detectar cuando la card entra en viewport
    const cardRef = React.useRef(null);
    const cardInView = useInView(cardRef, { once: true, amount: 0.5 });

    // Convertir el número a formato numérico (manejar casos con coma)
    const numericValue = parseFloat(resultado.number.replace(',', '.'));

    return (
      <div
        ref={cardRef}
        onClick={onCardClick}
        onMouseEnter={onCardHover}
        onMouseLeave={onCardLeave}
        className={`relative flex flex-col p-[16px] items-center cursor-pointer overflow-hidden transition-[border-color] duration-300                ${
          resultado.id === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
        }
    ${resultado.id === 2 ? 'lg:col-start-3 lg:row-start-2' : ''}
    ${resultado.id === 3 ? 'lg:col-start-5 lg:row-start-3' : ''}
    ${resultado.id === 4 ? 'lg:col-start-7 lg:row-start-1' : ''}
    ${resultado.id === 5 ? 'lg:col-start-1 lg:row-start-6' : ''}
    ${resultado.id === 6 ? 'lg:col-start-3 lg:row-start-5' : ''}
    ${resultado.id === 7 ? 'lg:col-start-5 lg:row-start-6' : ''}
    ${resultado.id === 8 ? 'lg:col-start-7 lg:row-start-5' : ''}
            ${
              isActive
                ? ''
                : 'border-b border-grey-20 border-solid md:border-none'
            }`}
      >
        {/* Animación MOBILE: Tipo cortina simple*/}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: 1,
                transition: {
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: 0,
                },
              }}
              exit={{
                scaleY: 0,
                transition: {
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: 0.3,
                },
              }}
              className="absolute inset-0 glass-results rounded-[12px] origin-top md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Contenedor principal con layout responsivo */}
        <div
          className={`relative w-full z-10 flex transition-all duration-400 ${
            isActive ? 'justify-start' : 'justify-center'
          } md:justify-center md:items-center`}
        >
          <motion.div
            layout
            className="flex gap-[8px] items-center"
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
                delay: isActive ? 0.2 : 0.3,
              },
            }}
          >
            {resultado.symbol && (
              <p
                className={`${
                  isActive
                    ? 'text-grey-00 md:text-grey-40 md:opacity-0'
                    : 'text-grey-00 md:opacity-100'
                } h2 md:text-[32px] transition-all duration-300`}
              >
                {resultado.symbol}
              </p>
            )}
            <h3
              className={`${
                isActive
                  ? 'text-grey-00 md:text-grey-40 md:opacity-0'
                  : 'text-grey-00 md:opacity-100'
              } text-center md:text-left md:text-[96px]! md:tracking-[-0.96px] md:leading-[110%] transition-all duration-300`}
            >
              <NumberFlow
                value={cardInView ? numericValue : 0}
                format={{
                  minimumFractionDigits: resultado.number.includes(',') ? 1 : 0,
                  maximumFractionDigits: resultado.number.includes(',') ? 1 : 0,
                }}
                locales="es-ES"
              />
            </h3>
            {resultado.modifier && (
              <p
                className={`${
                  isActive
                    ? 'text-grey-00 md:text-grey-40 md:opacity-0'
                    : 'text-grey-00 md:opacity-100'
                } lg md:uppercase transition-all duration-300`}
              >
                {resultado.modifier}
              </p>
            )}
          </motion.div>

          {/* Descripción MOBILE con fade */}
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: isActive ? 0.4 : 0,
                }}
                className="text-grey-00 text-[14px]! absolute right-0 top-1/2 -translate-y-1/2 max-w-[168px] md:hidden"
              >
                {resultado.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Animación TABLET+: Card cortina que aparece encima (clipPath) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
              transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className="hidden md:flex absolute inset-0 glass-results rounded-[12px] z-20 flex-col justify-between p-[16px]"
            >
              <motion.div
                className="flex gap-[8px] items-center"
                initial={{ opacity: 0, y: -5 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: 0.2,
                    ease: 'easeOut',
                  },
                }}
              >
                {resultado.symbol && (
                  <p className="text-grey-00 text-[18px]">{resultado.symbol}</p>
                )}
                <h3 className="text-grey-00 text-[36px] leading-[110%] tracking-[-0.36px]">
                  <NumberFlow
                    value={cardInView ? numericValue : 0}
                    format={{
                      minimumFractionDigits: resultado.number.includes(',')
                        ? 1
                        : 0,
                      maximumFractionDigits: resultado.number.includes(',')
                        ? 1
                        : 0,
                    }}
                    locales="es-ES"
                  />
                </h3>
                {resultado.modifier && (
                  <p className="text-grey-00 uppercase text-[18px]">
                    {resultado.modifier}
                  </p>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: 0.3,
                    ease: 'easeOut',
                  },
                }}
                className="text-grey-00 text-[16px] lg:text-right"
              >
                {resultado.desc}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ResultadoCard.displayName = 'ResultadoCard';

const Resultados = ({ title, paragraph1, paragraph2, tagline, cards }) => {
  const [activeId, setActiveId] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Ref para detectar cuando las líneas entran en viewport
  const linesRef = React.useRef(null);
  const smallLineRef = React.useRef(null);
  const smallLineInView = useInView(smallLineRef, { once: true, amount: 0.3 });
  const linesInView = useInView(linesRef, { once: true, amount: 0.3 });

  // Detectar si es desktop (lg breakpoint = 1024px)
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Check inicial
    checkIsDesktop();

    // Listener para resize
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Click handler para móvil
  const handleCardClick = useCallback(
    (id) => {
      if (!isDesktop) {
        setActiveId((prevId) => (prevId === id ? null : id));
      }
    },
    [isDesktop]
  );

  // Hover handlers para desktop
  const handleCardHover = useCallback(
    (id) => {
      if (isDesktop) {
        setActiveId(id);
      }
    },
    [isDesktop]
  );

  const handleCardLeave = useCallback(() => {
    if (isDesktop) {
      setActiveId(null);
    }
  }, [isDesktop]);

  return (
    <section
      className="relative bg-grey-40 px-[16px] md:px-[64px] pt-[128px] lg:pt-[104px] overflow-hidden"
      data-dark-section="true"
    >
      <div className="relative z-30">
        <div className="mx-auto flex flex-col items-center max-w-[295px] pb-[64px] md:max-w-[640px] lg:relative lg:flex-row lg:items-center lg:justify-between lg:max-w-full lg:py-[128px]">
          <h1 className="h1 text-grey-00 text-center mb-[32px] lg:w-[482px] lg:text-left lg:mb-0">
            <WordReveal
              applyGradient={true}
              delay={0.2}
              wordDelay={0.08}
              duration={0.8}
              wordGap={4}
            >
              {title}
            </WordReveal>
          </h1>
          <div className="lg:w-[434px]">
            <p className="lg text-grey-00 text-center mb-[24px] lg:text-left">
              <WordReveal wordGap={2} delay={0.2}>
              {paragraph1}
              </WordReveal>
            </p>
            <p className="lg text-grey-00 text-center mb-[64px] lg:text-left lg:mb-0">
              <WordReveal wordGap={2} delay={0.6}>
              {paragraph2}
              </WordReveal>
            </p>
          </div>
          <div className="relative z-30 w-[156px] h-[156px] lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:w-[316px] lg:h-[316px]">
            <div className="absolute top-0 left-0 w-[156px] h-[156px] lg:w-[316px] lg:h-[316px] bg-orange rounded-full blur-3xl will-change-transform"></div>
            <video
              className="w-[156px] h-auto z-30 relative lg:w-[316px] object-contain pointer-events-none"
              style={{
                clipPath: 'circle(50%)',
              }}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source
                src="/videos/orb-full.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-0 left-0 w-[156px] h-[156px] lg:w-[315.9px] lg:h-[315.9px] bg-orange rounded-full opacity-90 mix-blend-soft-light z-40 pointer-events-none"></div>
          </div>
        </div>
        <video
          className="hidden lg:block absolute left-0 w-full z-0 pointer-events-none object-cover opacity-5"
          style={{
            top: '50%',
            transform: 'translateY(-50%) scale(1.4)',
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
        <div
          ref={linesRef}
          className="flex flex-col gap-[13px] md:grid md:grid-cols-2 
      md:gap-[13px] md:py-[64px] md:h-[670px] lg:py-[128px] lg:h-[1664px] lg:gap-[32px] 
      lg:grid-rows-[198px_198px_198px_256px_198px_200px] 
      lg:grid-cols-[minmax(0,1fr)_2px_minmax(0,1fr)_2px_minmax(0,1fr)_2px_minmax(0,1fr)] 
      lg:self-stretch xxl:px-[128px] xxl:h-[1579px]"
        >
          {cards.map((resultado, index) => (
            <ResultadoCard
              key={resultado.id}
              resultado={resultado}
              index={index}
              isActive={activeId === resultado.id}
              onCardClick={() => handleCardClick(resultado.id)}
              onCardHover={() => handleCardHover(resultado.id)}
              onCardLeave={handleCardLeave}
            />
          ))}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:col-start-3 lg:row-start-4 lg:col-span-3">
            <h5 className="text-grey-00 text-center z-20 relative h2 flex flex-col items-center">
              {tagline.split('. ').map((line, i, arr) => (
                <span key={i} className="block">
                  <WordReveal
                    delay={0.2 + i * 0.3}
                    wordDelay={0.05}
                    duration={0.7}
                    wordGap={3}
                    insideClassName={i === 0 ? 'text-grey-20' : undefined}
                    centered={true}
                  >
                    {i === 0 ? `${line}.` : line}
                  </WordReveal>
                </span>
              ))}
            </h5>
          </div>
          {/* Líneas verticales con animación de dibujo */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: linesInView ? 1 : 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0 }}
            className="hidden lg:block bg-grey-30 w-[2px] h-full row-start-1 col-start-2 row-span-6 origin-top"
          />
          <motion.div
            ref={smallLineRef}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: smallLineInView ? 1 : 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0 }}
            className="hidden lg:block bg-grey-30 w-[2px] h-full row-start-5 col-start-4 row-span-2 origin-top"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: linesInView ? 1 : 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }}
            className="hidden lg:block bg-grey-30 w-[2px] h-full row-start-1 col-start-6 row-span-6 origin-top"
          />
        </div>
        <div className="py-[64px] lg:hidden">
          <h5 className="text-grey-00 text-center h5 z-20 relative flex flex-col items-center">
            {tagline.split('. ').map((line, i, arr) => (
              <span key={i} className="block">
                <WordReveal
                  delay={0.2 + i * 0.3}
                  wordDelay={0.05}
                  duration={0.7}
                  wordGap={2}
                  centered={true}
                >
                  {i === 0 ? `${line}.` : line}
                </WordReveal>
              </span>
            ))}
          </h5>
        </div>
      </div>
      <div
        className="absolute bottom-[-81px] md:bottom-[-121px] left-1/2 -translate-x-1/2 z-10 bg-purple 
      rounded-full w-[256px] md:w-[386px] h-[179px] md:h-[269px] lg:w-[980px] lg:h-[686px]  lg:bottom-[-400px] 
      blur-2xl will-change-transform lg:blur-3xl"
      ></div>
    </section>
  );
};

export default Resultados;
