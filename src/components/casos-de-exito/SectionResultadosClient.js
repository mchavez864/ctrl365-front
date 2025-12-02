'use client';

import { useState, useEffect } from 'react';
import SliderCasosDeExito from '@/components/sliders/SliderCasosDeExito';
import WordReveal from '../animations/WordReveal';
import FadeInUp from '../animations/FadeInUp';

export default function SectionResultadosClient({ slides, sectionData }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    // Check inicial
    checkIsDesktop();

    // Listener para resize
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <section className="bg-grey-10 overflow-hidden px-4 py-16 md:px-16 xl:py-32 xxl:px-32">
      <div className="mb-16 text-center lg:text-left xl:flex xl:items-start xl:justify-between">
        <h2 className="mt-3 text-3xl font-semibold text-grey-40 md:text-4xl lg:text-5xl lg:max-w-[648px] xxl:max-w-[1000px]">
          <WordReveal wordGap={5} delay={0.2}>
          {sectionData.title}
          </WordReveal>
        </h2>
        <p className="mt-4 max-w-xl text-base text-grey-20 md:text-lg">
        <WordReveal wordGap={2} delay={0.4}>
          {sectionData.description}
          </WordReveal>
        </p>
      </div>

      <div className="flex flex-col gap-10 rounded-[48px]  p-6 md:flex-row md:items-start md:p-10">
        <div className="hidden lg:block justify-center items-start lg:w-1/3">
          <video
            className="max-h-[320px] w-auto object-contain pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/orb-mesh.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="w-full lg:w-2/3">
          <SliderCasosDeExito
            slides={slides}
            variant="list"
            swiperConfig={{
              slidesPerView: 1,
              spaceBetween: 0,
              className: '',
              effect: 'fade',
              fadeEffect: { crossFade: true },
              autoHeight: !isDesktop, // Solo en mobile/tablet
            }}
            footerClassName="bg-transparent mt-8 "
            labelClassName="!text-grey-30 "
            progressTrackClassName="max-w-md"
          />
        </div>
      </div>
    </section>
  );
}

