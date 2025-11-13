"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Impacto real",
    desc1: "Medible. Escalable. Humana.",
    desc2:
      "La IA ya no es una promesa — es negocio real. Ctrl365 convierte la estrategia en impacto medible.",
  },
  {
    id: 2,
    percentage: "70",
    symbol: "+",
    number: "01",
    title: "Aumentar la productividad",
    desc1:
      "Las empresas que trabajan con Ctrl365 logran +70% más productividad, liberando equipos para enfocarse en tareas de mayor valor.",
    desc2:
      "La productividad es inteligencia humana amplificada a escala.",
  },
  {
    id: 3,
    percentage: "90",
    symbol: "-",
    number: "02",
    title: "Reducir costos",
    desc1:
      "Nuestros programas de automatización alcanzan hasta un 90% de reducción de costos, mejorando la eficiencia y la precisión operativa.",
    desc2:
      "La eficiencia es hacer más con menos.",
  },
  {
    id: 4,
    percentage: "35",
    symbol: "+",
    number: "03",
    title: "Impulsar ingresos",
    desc1:
      "Las empresas que integran IA con estrategia clara alcanzan hasta +35 % de crecimiento en ingresos, acelerando decisiones y resultados.",
    desc2:
      "La IA significa aceleración — no experimentación.",
  },
  {
    id: 5,
    percentage: "50",
    number: "04",
    title: "Liderar el cambio",
    desc1:
      "Para 2026, la mitad de las decisiones empresariales estarán impulsadas por IA. Ctrl365 ayuda a anticiparse, con foco, retorno e impacto medible.",
    desc2:
      "Liderar no es adoptar la IA — es dominarla.",
  },
];

const Impacto = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef(null);
  const lastCardRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
    const handleChange = (e) => {
      setIsDesktop(e.matches);
    };
    
    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
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

  useMotionValueEvent(scrollYProgress, "change", updateCard);

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
                    ease: "easeOut",
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
          
          <div
            className="absolute lg:relative top-[200px] md:top-auto md:bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl lg:w-[380px] lg:max-w-full lg:translate-y-0 lg:translate-x-0 lg:top-0 lg:left-0"

          >
            <div className="lg:flex lg:flex-col lg:items-start lg:justify-start lg:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ 
                    opacity: 0,
                    y: isDesktop && currentCard === 0 ? '20%' : '0%'
                  }}
                  animate={{ 
                    opacity: 1,
                    y: isDesktop && currentCard === 0 ? '20%' : '0%'
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
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
