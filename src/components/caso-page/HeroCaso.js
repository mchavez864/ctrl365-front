'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import SmallCard from '../cards/SmallCard';

// Componente para animar números
function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Convertir value a número y detectar decimales automáticamente
  const numValue = parseFloat(value) || 0;
  const hasDecimals = numValue % 1 !== 0;
  const decimals = hasDecimals ? 1 : 0;

  useEffect(() => {
    if (isInView) {
      motionValue.set(numValue);
    }
  }, [motionValue, isInView, numValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals) + suffix;
      }
    });
  }, [springValue, decimals, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function HeroCaso({ slug, title, data }) {
  return (
    <>
      <section className="px-4 pt-16 md:px-16 xl:pt-32 xxl:px-32 overflow-hidden relative">
        <motion.div
          className="mb-8 md:mb-16 md:flex md:items-start lg:mb-24 lg:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            className="flex flex-col md:w-1/2 lg:w-2/3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <h1 className="mb-16 md:mb-8 order-2 md:order-1 lg:max-w-[648px] xxl:max-w-[1000px]">
              {title}
            </h1>
            <img
              src={data.brandLogoBlack}
              alt=""
              width={149}
              height={26}
              className="max-w-[98px] mb-4 md:max-w-full md:mb-0 order-1 md:order-2"
            />
          </motion.div>
          <motion.div
            className="md:w-1/2 lg:w-1/3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <p className="mb-8 lg:mb-16 lg:!text-[18px]">{data.subtitle}</p>
            <div className="border-l-4 border-orange pl-4 py-2 mb-8 lg:py-1 lg:mb-16">
              <p className="!font-sora mb-2 text-xl flex items-center gap-2 lg:!text-2xl">
                {data.metricPrefix}{' '}
                <span className="text-[32px] lg:!text-[48px]">
                  <AnimatedCounter value={data.metricValue} />
                </span>{' '}
                {data.metricSuffix}
              </p>
              <small className="block text-sm text-grey-30 max-w-[186px] leading-[120%] font-inter lg:text-base">
                {data.metricDescription}
              </small>
            </div>
            <SmallCard
              copy="SCROLL"
              colorCircle="bg-grey-30"
              colorCopy="text-grey-30"
            />
          </motion.div>
        </motion.div>
        <motion.figure
          className="h-[218px] rounded-4xl overflow-hidden mb-8 md:mb-16 md:h-[462px] lg:h-[786px] lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img
            src={data.heroImage}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </motion.figure>
        <motion.div
          className="mb-8 md:mb-16 lg:mb-24 lg:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            className="lg:w-1/6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <SmallCard
              copy="CHALLENGE"
              className="mb-4  lg:mb-0"
            />
          </motion.div>
          <motion.div
            className="lg:w-5/6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <h2 className="mb-8 xxl:max-w-[1050px]">{data.challengeTitle}</h2>
            <p className="!text-[18px] text-grey-30 lg:max-w-[544px]">
              {data.challengeDescription}
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
