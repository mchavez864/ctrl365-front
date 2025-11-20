'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import ArrowLeft from '@/svg/arrow-left';

export default function SliderBase({
  slides = [],
  variant = 'custom',
  renderSlide,
  swiperConfig = {},
  footerClassName = '',
  labelClassName = '',
  progressTrackClassName = '',
  progressBarClassName = '',
  buttonClassName = '',
  buttonArrowColor = '#161616',
  buttonPrevClassName = '',
  buttonNextClassName = '',
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(slides.length > 1);
  const [navReady, setNavReady] = useState(false);

  const totalSlides = slides.length;
  const label = `${String(activeIndex + 1).padStart(2, '0')}/${String(
    totalSlides || 1
  ).padStart(2, '0')}`;
  const progress =
    totalSlides > 1 ? ((activeIndex + 1) / totalSlides) * 100 : 0;

  const updateControls = (swiper) => {
    setCanPrev(!swiper.isBeginning);
    setCanNext(!swiper.isEnd);
  };

  const attachNavigation = () => {
    if (!swiperRef.current || !prevRef.current || !nextRef.current) return;

    const swiper = swiperRef.current;

    swiper.params.navigation = {
      ...(swiper.params.navigation || {}),
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    };

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  };

  useEffect(() => {
    if (!navReady) return;
    attachNavigation();
  }, [navReady, slides.length]);

  useEffect(() => {
    if (!swiperRef.current) return;
    setCanNext(slides.length > 1);
    updateControls(swiperRef.current);
  }, [slides.length]);

  if (!slides.length) {
    return null;
  }

  const listRenderer = (slide) => (
    <div className="">
      <ul className="flex flex-col divide-y divide-grey-10">
        {slide.items?.map((item) => (
          <li
            key={item.id || item.title}
            className="py-4 first:pt-0 last:pb-0"
          >
            <p className="flex items-center gap-2 font-inter font-medium uppercase text-grey-40 mb-4">
              <span className="inline-flex h-3 w-3 rounded-full bg-orange" />
              {item.title}
            </p>
            <p className="font-inter text-grey-40">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const slideRenderer =
    variant === 'list' ? listRenderer : renderSlide ?? (() => null);

  if (variant !== 'list' && !renderSlide) {
    console.warn(
      '[SliderBase] Without providing renderSlide, only variant="list" will render content.'
    );
  }

  const {
    slidesPerView = 1,
    spaceBetween = 0,
    direction = 'horizontal',
    className: swiperClassName = '!w-full',
    breakpoints = {},
    effect,
    fadeEffect,
    modules = [],
    ...restSwiperConfig
  } = swiperConfig;

  const resolvedModules = [Navigation, ...modules];
  if (effect === 'fade' && !resolvedModules.includes(EffectFade)) {
    resolvedModules.push(EffectFade);
  }

  return (
    <section className="w-full">
      <Swiper
        modules={resolvedModules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        direction={direction}
        effect={effect}
        fadeEffect={fadeEffect}
        className={`${swiperClassName} w-full`}
        breakpoints={breakpoints}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateControls(swiper);
          setNavReady(true);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          updateControls(swiper);
        }}
        {...restSwiperConfig}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>{slideRenderer(slide)}</SwiperSlide>
        ))}
      </Swiper>

      <footer
        className={`flex w-full items-center justify-between gap-4 rounded-full bg-grey-00/5 py-4 backdrop-blur ${footerClassName}`}
      >
        <div className="w-full">
          <div className="flex w-full">
            <span
              className={`mb-2 block w-full text-sm text-black ${labelClassName}`}
            >
              {label}
            </span>
          </div>
          <div
            className={`relative h-[2px] w-full flex-1 rounded-full bg-grey-20/20 ${progressTrackClassName}`}
          >
            <span
              className={`absolute left-0 top-0 h-full rounded-full bg-orange transition-all duration-500 ease-out ${progressBarClassName}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            ref={prevRef}
            aria-label="Slide anterior"
            className={`relative right-[-30px] z-0 flex h-[56px] w-[88px] items-center justify-center rounded-full border border-grey-20/40 ${
              canPrev
                ? `bg-gradient-to-br from-[#c2bfbf] to-[#d2cfce] ${buttonPrevClassName}`
                : 'border-[#9E9E9E] bg-transparent '
            }`}
            disabled={!canPrev}
          >
            <ArrowLeft
              width="22"
              height="18"
              color={canPrev ? `${buttonArrowColor}` : '#9E9E9E'}
              className="relative right-1 rotate-180"
            />
          </button>
          <button
            ref={nextRef}
            aria-label="Slide siguiente"
            className={`${buttonClassName} relative z-10 flex h-[56px] w-[88px] items-center justify-center rounded-full border border-gray-200 ${
              canNext
                ? `border-grey-20/40 bg-gradient-to-br from-[#c2bfbf] to-[#d2cfce] ${buttonNextClassName} `
                : 'border-[#9E9E9E] bg-transparent'
            }`}
            disabled={!canNext}
          >
            <ArrowLeft
              width="22"
              height="18"
              color={canNext ? `${buttonArrowColor}` : '#9E9E9E'}
              className="relative top-[1px]"
            />
          </button>
        </div>
      </footer>
    </section>
  );
}
