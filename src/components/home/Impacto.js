"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import DelayedNumberFlow from "@/components/animations/DelayedNumberFlow";
// import Spline from "@splinetool/react-spline"; // Comentado temporalmente

const Impacto = () => {
  const t = useTranslations("Home.impacto");
  const cards = t.raw("cards");
  const [currentCard, setCurrentCard] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const containerRef = useRef(null);
  const lastCardRef = useRef(0);
  const percentageRef = useRef(null);
  const splineContainerRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Detectar cuando la sección sticky está en pantalla completa
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Activar cuando la sección esté casi completamente visible
          if (entry.intersectionRatio >= 0.9) {
            setIsVideoVisible(true);
          }
        });
      },
      {
        threshold: 0.9, // 90% visible
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e) => {
      setIsDesktop(e.matches);
      if (!e.matches) {
        setShouldLoadSpline(false);
      }
    };

    const isDesktopMatch = mediaQuery.matches;
    setIsDesktop(isDesktopMatch);

    // Solo cargar Spline si es desktop y cuando esté cerca del viewport
    if (isDesktopMatch) {
      // Usar Intersection Observer para detectar cuando está cerca
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              setShouldLoadSpline(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: "300px", // Cargar cuando esté a 300px de entrar al viewport
          threshold: 0,
        }
      );

      // Pequeño delay para asegurar que el ref esté disponible
      const timeoutId = setTimeout(() => {
        if (containerRef.current) {
          observer.observe(containerRef.current);
        }
      }, 100);

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
        mediaQuery.removeEventListener("change", handleChange);
      };
    } else {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Centrar la escena de Spline respecto al porcentaje
  useEffect(() => {
    if (
      !isDesktop ||
      !shouldLoadSpline ||
      !percentageRef.current ||
      !splineContainerRef.current
    )
      return;

    const updateSplinePosition = () => {
      // Usar requestAnimationFrame para asegurar que el DOM esté actualizado
      requestAnimationFrame(() => {
        if (!percentageRef.current || !splineContainerRef.current) return;

        const percentageRect = percentageRef.current.getBoundingClientRect();
        const section = percentageRef.current.closest("section");
        if (!section) return;

        const sectionRect = section.getBoundingClientRect();

        // Calcular el centro del porcentaje relativo a la sección
        const percentageCenterX =
          percentageRect.left + percentageRect.width / 2 - sectionRect.left;
        const percentageCenterY =
          percentageRect.top + percentageRect.height / 2 - sectionRect.top;

        // Ajustar la posición de la escena de Spline
        const splineContainer = splineContainerRef.current;
        splineContainer.style.left = `${percentageCenterX}px`;
        splineContainer.style.top = `${percentageCenterY}px`;
      });
    };

    // Pequeño delay para asegurar que las animaciones de cambio de card hayan comenzado
    const timeoutId = setTimeout(updateSplinePosition, 50);
    window.addEventListener("resize", updateSplinePosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateSplinePosition);
    };
  }, [isDesktop, shouldLoadSpline, currentCard]);

  const updateCard = useCallback(
    (latest) => {
      const cardIndex = Math.min(
        Math.floor(latest * cards.length),
        cards.length - 1
      );
      if (cardIndex !== lastCardRef.current) {
        lastCardRef.current = cardIndex;
        setCurrentCard(cardIndex);
      }
    },
    [cards]
  );

  useMotionValueEvent(scrollYProgress, "change", updateCard);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${cards.length * 80}vh` }}
      data-dark-section="true"
    >
      <section 
        ref={sectionRef}
        className="sticky top-0 bg-grey-40 overflow-hidden h-screen px-[16px] md:px-[146px] lg:px-[128px] xxl:px-[256px] py-[64px] flex flex-col items-center justify-center"
      >
        {/* Spline Scene - Comentado temporalmente, reemplazado por video */}
        {/* {shouldLoadSpline && (
          <div className="hidden lg:block absolute inset-0 w-full h-full z-0 overflow-hidden">
            <div
              ref={splineContainerRef}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh]"
              style={{ left: "50%", top: "50%" }}
            >
              <Spline
                scene="https://prod.spline.design/yZDPtNcHsclFcFsd/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        )} */}

        {/* Área del porcentaje - posición absoluta fija */}
        <div 
          className="relative h-[400px] md:h-[547px] w-full lg:flex lg:items-center lg:h-auto lg:min-h-[400px] lg:gap-[64px] lg:justify-center lg:w-[870px] z-10"
        >
          {/* Blur - animación de entrada desde abajo */}
          <motion.div 
            className="absolute top-0 left-0 w-[309px] h-[175px] lg:w-[450px] lg:h-[384px] bg-orange rounded-full blur-3xl will-change-transform"
            initial={{ y: 200, opacity: 0 }}
            animate={isVideoVisible ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
          />

          {/* Video orb-full - Visible en mobile/tablet, animación de entrada desde abajo */}
          <motion.div 
            className="lg:hidden absolute top-[-55px] md:top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl flex items-center justify-center" 
            style={{ height: '230px' }}
            initial={{ y: 290, opacity: 0 }}
            animate={isVideoVisible ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
          >
            <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] aspect-square flex-shrink-0 rounded-full overflow-hidden">
              <video
                className="w-full h-full object-cover pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/videos/orb-full.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
          <div
            ref={percentageRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl lg:relative lg:translate-y-0 lg:translate-x-0 lg:top-0 lg:left-0 lg:w-[470px]"
          >
            {/* Video orb-full - Visible en desktop, animación de entrada desde abajo */}
            <motion.div 
              className="hidden lg:flex absolute inset-0 items-center justify-center z-0 pointer-events-none"
              initial={{ y: 200, opacity: 0 }}
              animate={isVideoVisible ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1,
              }}
            >
              <div className="w-[420px] h-[420px] min-w-[420px] min-h-[420px] aspect-square flex-shrink-0 rounded-full overflow-hidden">
                <video
                  className="w-full h-full object-cover scale-100"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/videos/orb-full.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
            <div className="relative w-full md:h-[230px] pb-[55px] md:pb-0 md:mb-[128px] flex items-center justify-center lg:mb-0 z-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ 
                    opacity: 0, 
                    y: currentCard === 0 ? 0 : 50 
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0 
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -50 
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="flex items-center gap-2 will-change-transform"
                >
                  {cards[currentCard].symbol && (
                    <p className="text-grey-00 text-[36px]! leading-[110%]! tracking-[-0.72px]!">
                      {cards[currentCard].symbol}
                    </p>
                  )}
                  {cards[currentCard].percentage && (
                    <div className="flex items-center gap-2">
                      <p className="text-grey-00 font-sora text-[96px]! leading-[110%]! tracking-[-0.96px]!">
                        <DelayedNumberFlow 
                          value={cards[currentCard].percentage}
                          delay={500}
                        />
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
            <div className="lg:flex lg:flex-col lg:items-start lg:justify-center lg:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="lg:flex lg:flex-col lg:items-start will-change-transform"
                >
                  {/* Indicador número - círculo y número escalan */}
                  {cards[currentCard].number && (
                    <div className="flex items-center gap-2 pl-[4px] mb-[20px]">
                      <motion.div 
                        className="bg-orange w-[12px] h-[12px] rounded-full"
                        variants={{
                          hidden: { scale: 0, opacity: 0 },
                          visible: { scale: 1, opacity: 1 },
                          exit: { scale: 0, opacity: 0 }
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      />
                      <motion.p 
                        className="text-grey-00 font-inter text-base! leading-[120%]! font-medium"
                        variants={{
                          hidden: { scale: 0, opacity: 0 },
                          visible: { scale: 1, opacity: 1 },
                          exit: { scale: 0, opacity: 0 }
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: 0.1,
                        }}
                      >
                        {cards[currentCard].number}
                      </motion.p>
                    </div>
                  )}
                  
                  {/* Título - entra después del número */}
                  <motion.p 
                    className="text-grey-00 h2 pb-[16px] gradient-text"
                    variants={{
                      hidden: { opacity: 0, y: currentCard === 0 ? 0 : 40 },
                      visible: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -40 }
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.2,
                    }}
                  >
                    {cards[currentCard].title}
                  </motion.p>
                  
                  {/* Textos - entran después */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: currentCard === 0 ? 0 : 30 },
                      visible: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -30 }
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.35,
                    }}
                  >
                    <p className="text-grey-00 pb-[16px] text-xl font-semibold xxl:w-[550px]">
                      {cards[currentCard].desc1}
                    </p>
                    <p className="text-grey-00 text-lg xxl:w-[550px]">
                      {cards[currentCard].desc2}
                    </p>
                  </motion.div>
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
