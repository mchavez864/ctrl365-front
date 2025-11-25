"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/buttons/Button";
import Image from "next/image";
import RevealTextAnimation from "@/components/animations/RevealTextAnimation";
import FadeInUp from "@/components/animations/FadeInUp";

const Hero = () => {
  const t = useTranslations("Home.hero");
  const words = t.raw("words");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 300);
    }, 1700);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="bg-grey-10 overflow-hidden">
      <div className="relative px-[16px] py-[128px] md:px-[64px] md:pt-[168px] lg:pt-[232px] lg:pb-[64px] overflow-hidden xxl:px-[128px]">
        <div className="absolute bottom-[-100px] md:bottom-[-200px] right-0 overflow-hidden lg:w-[700px] lg:h-[1273px] lg:rotate-30 lg:top-[-100px] lg:bottom-auto lg:right-[200px] xxl:right-[500px]">
          <video
            width="999"
            height="935"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-[500px] md:w-[600px] lg:w-[700px] h-full object-cover"
          >
            <source src="/videos/mesh-orange.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative z-10 lg:flex lg:justify-between lg:h-[610px]">
          <div>
            <h1 className="lg:max-w-[800px]">
              <RevealTextAnimation>{t("title1")} </RevealTextAnimation>
              <RevealTextAnimation delay={0.2}>{t("title2")} </RevealTextAnimation>
              <RevealTextAnimation delay={0.4}>
              <span className="lg:hidden">{words.join(", ")}.</span></RevealTextAnimation>
            </h1>
            <FadeInUp delay={0.4} className="lg my-[16px]">{t("subtitle")}</FadeInUp>
            <FadeInUp delay={0.6} className="mb-[64px]">
              <Button copy={t("cta")} variant="black" />
            </FadeInUp>
          </div>
          <div className="lg:self-end lg:flex lg:flex-col lg:items-end">
            <p
              className={`display hidden lg:block transition-opacity duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {words[currentWordIndex]}
            </p>
            <FadeInUp delay={0.8} className="w-full h-full lg:h-auto lg:w-[426px] rounded-[16px] overflow-hidden">
            <div className="w-full h-full lg:h-auto lg:w-[426px] rounded-[16px] overflow-hidden">
              <Image
                src="/images/hero/video.webp"
                alt="video"
                width={640}
                height={360}
                className="object-cover"
              />
            </div>
            </FadeInUp>
          </div>
        </div>
        {/* <div className="hidden lg:flex lg:justify-between lg:mt-[16px]">
          <div className="flex items-center gap-[8px]">
            <div className="w-[12px] h-[12px] rounded-full bg-grey-30"></div>
            <p className="xs text-grey-30 font-medium! text-[16px]! leading-[100%]!">Scroll</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[12px] h-[12px] rounded-full bg-grey-30"></div>
            <p className="xs text-grey-30 font-medium! text-[16px]! leading-[100%]!">Ver video</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
