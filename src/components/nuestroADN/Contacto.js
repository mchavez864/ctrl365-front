'use client';

import { useTranslations } from 'next-intl';

const Contacto = () => {
  const t = useTranslations('NuestroAdnPage.contacto');
  return (
    <section
      className="relative h-[475px] md:h-[387px] lg:h-[468px] xxl:h-[468px] bg-grey-10 px-[16px] md:px-[64px] pt-[128px] pb-[64px] lg:py-[128px]  overflow-hidden lg:flex 
    lg:justify-end xxl:justify-center"
    >
      <div className="lg:w-[869px] xxl:w-[684px]">
        <h2 className="text-grey-40 pb-[8px] lg:text-[32px]! lg:max-w-[648px]">
          {t('title')}
        </h2>
        <p className="text-grey-40 opacity-60 mb-[64px] lg">
          {t('description')}
        </p>
        <a href="mailto:rpa_recruiting@ctrl365.com">
          <p className="text-[24px]! md:text-[28px]! lg:text-[40px]! text-grey-40">
            rpa_recruiting@ctrl365.com
          </p>
        </a>
      </div>
    </section>
  );
};

export default Contacto;
