"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import ShuffleCards from "./ShuffleCards";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const diferenciales = [
  {
    id: 1,
    title: "Challengers",
    desc: "Somos challengers por naturaleza: cuestionamos nuestro éxito, aprendemos más rápido y empoderamos con tecnología para generar valor real.",
  },
  {
    id: 2,
    title: "IA con sentido",
    desc: "Vivimos la IA desde la realidad del negocio. Diseñamos estrategias prácticas, medibles y alineadas a resultados concretos.",
  },
  {
    id: 3,
    title: "Human+",
    desc: "IA que amplifica la inteligencia humana, no que la reemplaza. Creamos soluciones que empoderan personas y generan impacto medible.",
  },
  {
    id: 4,
    title: "Nuestro equipo",
    desc: "Somos thinkers, builders y problem solvers con curiosidad, foco y ejecución.",
    desc2:
      "Combinamos visión estratégica con experiencia real para transformar la IA y la automatización en impacto tangible de negocio.",
  },
];

const NuestroDiferencial = () => {
  return (
    <section className="bg-grey-10 relative overflow-hidden  w-full px-[16px] py-[64px] md:pb-[32px] md:px-[64px] lg:pt-[128px] lg:mb-[64px] xxl:px-[268px]">
      <div className="block absolute top-0 right-0 w-[400px] h-[300px] bg-[url('/images/elements/grid.svg')]"></div>
      <div>
        <h2 className="max-w-[282px] mb-[64px] lg:mb-[128px] lg:max-w-full">
          Cada compañía avanza a su ritmo.
        </h2>
        <div className="md:flex gap-[32px] lg:items-center lg:gap-0 lg:justify-between">
          <div className="w-full h-[184px] rounded-[16px] overflow-hidden md:flex-1 lg:h-[385px] lg:max-w-[684px]">
            <Image
              src="/images/hero/video.webp"
              alt=""
              width={684}
              height={385}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[#474747] lg mt-[16px] md:mt-0 md:flex-1 lg:max-w-[408px]">
            Nuestro rol es acelerar ese camino con visión, método y ejecución,
            para que la inteligencia aplicada se traduzca en crecimiento real.
          </p>
        </div>
      </div>
      <div className="mt-[64px] lg:flex lg:justify-between lg:h-full ">
        <div className="flex items-center justify-between  mb-[12px] md:mb-[32px] md:h-[111px] lg:pt-[55px] lg:flex-col lg:w-[264px] lg:items-start lg:h-full lg:gap-[100px]">
          <h2 className="max-w-[190px] lg:max-w-[264px]">Nuestro diferencial</h2>
          <div className="w-[99px] h-[75px] overflow-hidden rounded-[8px] md:h-full md:w-[148px] lg:-h-[200px] lg:w-full md:rounded-[16px]">
            <Image
              src="/images/pages/nuestro-adn/img-misc.webp"
              alt=""
              width={200}
              height={264}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <ShuffleCards />
      </div>
    </section>
  );
};

export default NuestroDiferencial;
