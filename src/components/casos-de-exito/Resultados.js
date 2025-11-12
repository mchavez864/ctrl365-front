"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const resultados = [
  {
    id: 1,
    number: "70",
    symbol: "+",
    modifier: "%",
    desc: "Mayor productividad operativa en servicios financieros.",
  },
  {
    id: 2,
    number: "90",
    symbol: "-",
    modifier: "%",
    desc: "Menos costos en back-office y emisión de pólizas.",
  },
  {
    id: 3,
    number: "35",
    symbol: "+",
    modifier: "%",
    desc: "Más ingresos con decisiones ágiles y procesos optimizados.",
  },
  {
    id: 4,
    number: "94",
    symbol: "-",
    modifier: "%",
    desc: "Primas nuevas en seguros agrícolas con IA geoespacial.",
  },
  {
    id: 5,
    number: "3,2",
    symbol: "+",
    modifier: "M",
    desc: "Aprobación de créditos reducida de 7 semanas a 20 minutos.",
  },
  {
    id: 6,
    number: "30",
    symbol: "+",
    modifier: "%",
    desc: "Mayor capacidad exportadora y eficiencia logística.",
  },
  {
    id: 7,
    number: "24",
    modifier: "h",
    desc: "Pagos automatizados a productores en un día.",
  },
  {
    id: 8,
    number: "600",
    symbol: "+",
    modifier: "%",
    desc: "Más pólizas emitidas sin ampliar estructura de costos.",
  },
];

const Resultados = () => {
  const [activeId, setActiveId] = useState(null);

  const handleCardClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="relative bg-grey-40 px-[16px] pt-[128px] overflow-hidden" data-dark-section="true">
      <div className=" mx-auto flex flex-col items-center max-w-[295px] pb-[64px]">
        <h2 className=".h1 text-grey-00 text-center mb-[32px] ">
          Resultados que hablan
        </h2>
        <p className=".lg text-grey-00 text-center mb-[24px] ">
          En Ctrl365 convertimos desafíos en resultados medibles. Cada proyecto
          de IA y automatización crea valor real: eficiencia, ahorro,
          crecimiento y velocidad.
        </p>
        <p className=".lg text-grey-00 text-center mb-[64px]">
          No implementamos tecnología: diseñamos impacto.
        </p>
        <div className="relative w-[156px] h-[156px]">
          <div className="absolute top-0 left-0 w-[156px] h-[156px] bg-orange rounded-full blur-2xl"></div>
          <Image
            src="/images/orb.webp"
            alt="Resultados"
            width={405}
            height={405}
            className="w-[156px] h-auto z-30 relative"
          />
          <div className="absolute top-0 left-0 w-[156px] h-[156px] bg-orange rounded-full opacity-90 mix-blend-soft-light z-40 pointer-events-none"></div>
        </div>
      </div>
      <div className="flex flex-col gap-[13px]">
        {resultados.map((resultado) => (
          <div
            key={resultado.id}
            onClick={() => handleCardClick(resultado.id)}
            className={`relative flex flex-col p-[16px] items-center cursor-pointer overflow-hidden transition-all duration-300 ${
              activeId === resultado.id
                ? ""
                : "border-b border-grey-20 border-solid"
            }`}
          >
            {/* Fondo gris animado con efecto cortina */}
            <AnimatePresence>
              {activeId === resultado.id && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: 1,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                      delay: 0,
                    },
                  }}
                  exit={{
                    scaleY: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                      delay: 0.3,
                    },
                  }}
                  className="absolute inset-0 glass rounded-[12px] origin-top "
                />
              )}
            </AnimatePresence>

            <div
              className={`relative w-full z-10 flex transition-all duration-400 ${
                activeId === resultado.id ? "justify-start" : "justify-center"
              }`}
            >
              <motion.div
                layout
                className="flex gap-[8px] items-center"
                transition={{
                  layout: {
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                    delay: activeId === resultado.id ? 0.2 : 0.3,
                  },
                }}
              >
                {resultado.symbol && (
                  <p className="text-grey-00 h2">{resultado.symbol}</p>
                )}
                <h3 className="text-grey-00 text-center h1">
                  {resultado.number}
                </h3>
                {resultado.modifier && (
                  <p className="text-grey-00 lg">{resultado.modifier}</p>
                )}
              </motion.div>

              {/* Descripción con fade */}
              <AnimatePresence mode="wait">
                {activeId === resultado.id && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      delay: activeId === resultado.id ? 0.4 : 0,
                    }}
                    className="text-grey-00 text-[14px]! absolute right-0 top-1/2 -translate-y-1/2 max-w-[168px]"
                  >
                    {resultado.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <div className="py-[64px]">
        <h5 className="text-grey-00 text-center h5 z-20 relative">
          Transformación visible. <br />
          Impacto real.
        </h5>
      </div>
      <div className="absolute bottom-[-81px] 
      left-1/2 -translate-x-1/2 z-10 bg-purple rounded-full 
      w-[256px] h-[179px] blur-2xl
      "></div>
      {/* gradient-circle-purple  */}
    </section>
  );
};

export default Resultados;
