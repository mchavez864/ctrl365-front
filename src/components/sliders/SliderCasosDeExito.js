'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import ArrowLeft from '@/svg/arrow-left';
import CaseCard from '../cards/CaseCard';

export default function SliderCasosDeExito({ slides = [] }) {
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

  return (
    <section className="">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.06}
        spaceBetween={24}
        className="!overflow-visible mb-16"
        breakpoints={{
          768: { slidesPerView: 1.08, spaceBetween: 28 },
          1280: { slidesPerView: 1.1, spaceBetween: 32 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateControls(swiper);
          setNavReady(true);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          updateControls(swiper);
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <CaseCard {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      <footer className="flex w-full items-center justify-between gap-4 rounded-full bg-grey-00/5 px-6 py-4 backdrop-blur">
        <div className="w-full">
          <div className="flex w-full">
            <span className="w-full block mb-2 text-sm  text-black">
              {label}
            </span>
          </div>
          <div className="relative w-full h-[2px] flex-1 rounded-full bg-grey-20/20 md:max-w-[460px]">
            <span
              className="absolute left-0 top-0 h-full rounded-full bg-orange transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            ref={prevRef}
            aria-label="Caso anterior"
            className={`relative right-[-30px] z-0 flex w-[88px] h-[56px] items-center justify-center rounded-full border border-grey-20/40  ${
              canPrev ? 'bg-gray-200' : 'bg-transparent border border-[#9E9E9E]'
            }`}
            disabled={!canPrev}
          >
            <ArrowLeft
              width="22"
              height="18"
              color={canPrev ? '#161616' : '#9E9E9E'}
              className="rotate-180 relative right-1"
            />
          </button>
          <button
            ref={nextRef}
            aria-label="Caso siguiente"
            className={`relative z-10 flex w-[88px] h-[56px] items-center justify-center rounded-full border border-gray-200  ${
              canNext
                ? 'bg-gray-200 border-grey-20/40'
                : 'bg-transparent border border-[#9E9E9E]'
            }`}
            disabled={!canNext}
          >
            <ArrowLeft
              width="22"
              className="relative top-[1px]"
              height="18"
              color={canNext ? '#161616' : '#9E9E9E '}
            />
          </button>
        </div>
      </footer>
    </section>
  );
}
