'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import SmallCard from '../cards/SmallCard';

// Componente para animar números
function AnimatedCounter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals) + suffix;
      }
    });
  }, [springValue, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function ImpactCaso() {
  return (
    <section className="px-4 mb-16  md:px-16 lg:mb-32 xxl:px-32">
      <div className="flex mb-16 lg:mb-32">
        <div className="w-1/3 md:w-1/4">
          <SmallCard copy="IMPACT" />
        </div>
        <div className="w-2/3 md:w-3/4">
          <div className="flex gap-8 flex-col md:flex-row md:flex-wrap lg:justify-end">
            <article className="md:w-[45%] lg:w-[30%]">
              <p className="!font-sora flex items-center gap-2 font-medium text-grey-40 !text-[64px] !leading-[120%] xl:!text-[128px]">
                <AnimatedCounter value={20} />{' '}
                <span className="!text-[28px] xl:!text-[40px]">min</span>
              </p>
              <p className="!text-[20px] text-grey-30 max-w-[150px] xl:!text-[24px] xl:max-w-[210px]">
                Decisiones en el punto de venta
              </p>
            </article>
            <article className="md:w-[45%] lg:w-[30%]">
              <p className="!font-sora flex items-center gap-2 font-medium text-grey-40 !text-[64px] !leading-[120%] xl:!text-[128px]">
                <AnimatedCounter
                  value={1.5}
                  decimals={1}
                />{' '}
                <span className="!text-[28px] xl:!text-[40px]">M</span>
              </p>
              <p className="!text-[20px] text-grey-30 max-w-[150px] xl:!text-[24px] xl:max-w-[210px]">
                Originación nueva por día
              </p>
            </article>
            <article className="md:w-[45%] lg:w-[30%]">
              <p className="!font-sora flex items-center gap-2 font-medium text-grey-40 !text-[64px] !leading-[120%] xl:!text-[128px]">
                <AnimatedCounter value={400} />{' '}
                <span className="!text-[28px] xl:!text-[40px]">k</span>
              </p>
              <p className="!text-[20px] text-grey-30 max-w-[150px] xl:!text-[24px]">
                Préstamos en 2024
              </p>
            </article>
          </div>
        </div>
      </div>
      <h2 className="mb-8 lg:max-w-[1046px]">
        Los resultados obtenidos fueron muy significativos y cubren varios
        frentes:
      </h2>
      <div className="lg:flex lg:justify-end">
        <div className="flex gap-8 flex-col md:gap-x-16 md:flex-row md:flex-wrap lg:gap-8 lg:justify-end lg:w-[850px] xxl:w-[1046px]">
          <article className="md:w-[45%] lg:w-[250px] xxl:w-[307px]">
            <SmallCard
              copy="01"
              className="mb-4"
            />
            <p className="!text-[16px] lg:!text-[18px] text-grey-30">
              Se procesan &gt;350 solicitudes por día sin sacrificar calidad ni
              control.
            </p>
          </article>
          <article className="md:w-[45%] lg:w-[250px] xxl:w-[307px]">
            <SmallCard
              copy="02"
              className="mb-4"
            />
            <p className="!text-[16px] lg:!text-[18px] text-grey-30">
              El ciclo de aprobación bajó de hasta 7 semanas a ~20 minutos en el
              punto de venta.
            </p>
          </article>
          <article className="md:w-[45%] lg:w-[250px] xxl:w-[307px]">
            <SmallCard
              copy="03"
              className="mb-4"
            />
            <p className="!text-[16px] lg:!text-[18px] text-grey-30">
              Santander incrementó conversión y velocidad de alta de nuevos
              clientes.
            </p>
          </article>
          <article className="md:w-[45%] lg:w-[250px] xxl:w-[307px]">
            <SmallCard
              copy="04"
              className="mb-4"
            />
            <p className="!text-[16px] lg:!text-[18px] text-grey-30">
              Escala probada: de 10.000 préstamos (2020) a 400.000+ (2024), con
              &gt;1M proyectados.
            </p>
          </article>
          <article className="md:w-[45%] lg:w-[250px] xxl:w-[307px]">
            <SmallCard
              copy="05"
              className="mb-4"
            />
            <p className="!text-[16px] lg:!text-[18px] text-grey-30">
              Mejoró NPS y uso de talento: las personas enfocadas en tareas de
              valor y la plataforma en el trabajo repetible.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
