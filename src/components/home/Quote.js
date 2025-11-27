"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Character from "./quote/Character";
import FadeInUp from "../animations/FadeInUp";

const Quote = () => {
  const t = useTranslations("Home.quote");
  return (
    <section
      data-dark-section="true"
      className="relative h-[655px] md:h-[438px] lg:h-[603px] xxl:h-[651px] bg-grey-40 px-[16px] md:px-[64px] py-[64px] lg:py-[128px] xxl:px-[408px] overflow-hidden "
    >
      <div
        className="absolute bottom-[-81px] md:bottom-[-121px] left-1/2 -translate-x-1/2 z-10 bg-purple 
      rounded-full w-[256px] md:w-[386px] h-[179px] md:h-[269px] lg:w-[980px] lg:h-[686px]  lg:bottom-[-500px] 
      blur-2xl will-change-transform lg:blur-3xl"
      ></div>
      <div className="relative z-30 flex flex-col items-start justify-between h-full">
        <div className="flex items-center gap-2 ">
          <div className="bg-orange w-[12px] h-[12px] rounded-full"></div>
          <p className="text-grey-00 font-inter text-base! leading-[120%]! font-medium uppercase">
            {t("tagline")}
          </p>
        </div>
        <p className="h3 text-grey-20">
          <Character value={t("text")} />
          {/* <span className="text-grey-20 inline">{t("text2")}</span> */}
        </p>
        <FadeInUp className="flex items-center gap-[16px] self-end">
            <div className="flex items-center">
              <div className="hidden md:block glass-results w-[98px] h-[64px] rounded-[46px] mr-[-16px]"></div>
              <div className=" rounded-full overflow-hidden">
                <Image
                  src="/images/pages/home/erik.webp"
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
            </div>
            <div className="flex flex-col text-grey-00 max-w-[200px] z-30 md:max-w-full">
              <p className="font-bold!">{t("author.name")}</p>
              <p>{t("author.role")}</p>
            </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default Quote;
