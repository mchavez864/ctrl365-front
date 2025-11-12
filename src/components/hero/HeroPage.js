import { getTranslations } from 'next-intl/server';

export default async function HeroPage() {
  const t = await getTranslations('ContactPage.hero');

  return (
    <section className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 relative">
      <img
        src="/images/elements/grid.svg"
        alt=""
        width={576}
        height={432}
        className="hidden md:block absolute top-0 -translate-x-1/2 left-[50%] lg:w-[686px] lg:h-[516px]"
      />
      <div className="md:flex">
        <div className="md:w-1/2 lg:w-2/3">
          <h1 className="mb-8 md:mb-0">{t('title')}</h1>
        </div>
        <div className="md:w-1/2 lg:w-1/3">
          <img
            src="/images/elements/over.png"
            alt=""
            width={206}
            height={79}
            className="max-w-[99px] md:max-w-[148px] lg:max-w-[206px] mb-4 md:mb-8"
          />
          <p className="!text-[18px] opacity-[66%]">{t('description')}</p>
        </div>
      </div>
    </section>
  );
}
