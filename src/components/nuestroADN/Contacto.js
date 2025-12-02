"use client";

import { useTranslations } from "next-intl";

const Contacto = () => {
  const t = useTranslations("NuestroAdnPage.contacto");
  return (
    <section
      className="relative h-[475px] md:h-[387px] lg:h-[468px] xxl:h-[468px] bg-grey-10 px-[16px] md:px-[64px] pt-[128px] pb-[64px] lg:py-[128px]  overflow-hidden lg:flex 
    lg:justify-end xxl:justify-center">
      <video
        className="absolute top-4 right-4 w-[80px] h-[80px] lg:top-1/2 lg:left-[64px] lg:-translate-y-1/2 lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] xxl:left-[128px] object-contain pointer-events-none grayscale z-10"
        style={{
          clipPath: "circle(50%)",
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto">
        <source src="/videos/orb-full.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="lg:w-[869px] xxl:w-[684px]">
        <h2 className="text-grey-40 pb-[8px] lg:text-[32px]! lg:max-w-[648px]">{t("title")}</h2>
        <p className="text-grey-40 opacity-60 mb-[64px] lg">{t("description")}</p>
        <a href="mailto:recruiting@ctrl365.com">
          <h3 className="text-[24px]! md:text-[28px]! lg:text-[40px]! text-grey-40 underline">recruiting@ctrl365.com</h3>
        </a>
      </div>
    </section>
  );
};

export default Contacto;
