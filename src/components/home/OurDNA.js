'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DNACard from './Cards/DnaCard';
import useMeasure from 'react-use-measure';
import Button from '../buttons/Button';
import { useTranslations } from 'next-intl';

const BREAKPOINTS = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1440,
  xl: 1920,
};

const OurDNA = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);
  const t = useTranslations('Home.OurDNA');

  const dnaCards = [
    {
      id: 1,
      title: t('Cards.card1.title'),
      icon: './images/pages/home/ourDNA/ChallengersIcon.svg',
      description: t('Cards.card1.description'),
    },
    {
      id: 2,
      title: t('Cards.card2.title'),
      icon: './images/pages/home/ourDNA/HumanIcon.svg',
      description: t('Cards.card2.description'),
    },
    {
      id: 3,
      title: t('Cards.card3.title'),
      icon: './images/pages/home/ourDNA/IAIcon.svg',
      description: t('Cards.card3.description'),
    },
    {
      id: 4,
      title: t('Cards.card4.title'),
      icon: '',
      description: t('Cards.card4.description'),
    },
  ];
  // Calcular el tamaño de la tarjeta según el breakpoint actual
  const getCardSize = () => {
    if (width >= BREAKPOINTS.xl) {
      return 400 + 20; // 2xl:w-[400px] + xl:mr-5 (20px)
    } else if (width >= BREAKPOINTS.md) {
      return 394 + 16; // md:w-[394px] + mr-4 (16px)
    } else {
      return 328 + 16; // w-[328px] + mr-4 (16px)
    }
  };

  const CARD_SIZE = getCardSize();
  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (dnaCards.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section
      data-dark-section="true"
      className="relative bg-grey-40 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background con opacidad */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.1,
          background: 'url(/images/white-mesh.webp)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />

      <div
        className="relative z-10"
        ref={ref}
      >
        {/* Header con título y botones */}
        <div className="flex justify-between mb-12 md:mb-16 pl-4 md:pl-16 lg:pl-[285px] xl:pl-[400px]">
          <motion.h2
            className="h2 text-grey-00 font-sora"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* Slider de tarjetas */}
        <div className="overflow-hidden pl-4 md:pl-16 lg:pl-[285px] xl:pl-[400px]">
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: 'easeInOut',
            }}
            className="flex"
          >
            {dnaCards.map((card, index) => (
              <DNACard
                key={card.id}
                title={card.title}
                id={card.id}
                icon={card.icon}
                description={card.description}
                index={index}
              />
            ))}
          </motion.div>
        </div>
        {/* Botones de navegación */}
        <div className="flex items-center justify-between pl-4 md:pl-16 lg:pl-[285px] xl:pl-[400px] mr-4 xl:mr-[128px] mt-8 xl:mt-[64px]">
          <Button
            variant="white"
            url="/nuestro-adn"
            copy={t('button')}
          />
          <div className="relative flex items-center gap-4">
            <Button
              disabled={!CAN_SHIFT_LEFT}
              onClick={shiftLeft}
              variant="glass"
              size="md"
              className="absolute -right-10 rotate-180"
            />
            <Button
              disabled={!CAN_SHIFT_RIGHT}
              onClick={shiftRight}
              variant="glass"
              size="md"
              className="absolute right-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurDNA;
