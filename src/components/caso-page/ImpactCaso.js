'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
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

export default function ImpactCaso({ slug, title, data }) {
  return (
    <section className="px-4 mb-16  md:px-16 lg:mb-32 xxl:px-32">
      <div className="flex mb-16 lg:mb-32">
        <div className="w-1/3 md:w-1/4">
          <SmallCard copy="IMPACT" />
        </div>
        <div className="w-2/3 md:w-3/4">
          <div className="flex gap-8 flex-col md:flex-row md:flex-wrap lg:justify-end">
            {data?.metrics?.map((metric, index) => (
              <article key={index} className="md:w-[45%] lg:w-[30%]">
                <p className="!font-sora flex items-center gap-2 font-medium text-grey-40 !text-[64px] !leading-[120%] xl:!text-[128px]">
                  <AnimatedCounter
                    value={parseFloat(metric.value) || 0}
                    decimals={metric.value?.toString().includes('.') ? 1 : 0}
                  />{' '}
                  {metric.suffix && (
                    <span className="!text-[28px] xl:!text-[40px]">
                      {metric.suffix}
                    </span>
                  )}
                </p>
                <p className="!text-[20px] text-grey-30 max-w-[150px] xl:!text-[24px] xl:max-w-[210px]">
                  {metric.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
      {data?.impactTitle && (
        <motion.h2
          className="mb-8 lg:max-w-[1046px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {data.impactTitle}
        </motion.h2>
      )}
      <div className="lg:flex ">
        <motion.div
          className="flex gap-8 flex-col md:gap-x-16 md:flex-row md:flex-wrap lg:gap-8  lg:w-[850px] xxl:w-[1046px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {data?.results?.map((result, index) => (
            <motion.article
              key={index}
              className="md:w-[45%] lg:w-[250px] xxl:w-[307px]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <SmallCard copy={result.number} className="mb-4" />
              <p className="!text-[16px] lg:!text-[18px] text-grey-30">
                {result.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
