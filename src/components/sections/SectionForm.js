'use client';

import { useTranslations } from 'next-intl';
import Form from '../forms/Form';

export default function SectionForm({ subject, destination }) {
  const t = useTranslations('Form');

  return (
    <section className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 bg-grey-10 bg-grid-white">
      <div className="xl:flex">
        <div className="xl:w-1/3 space-y-6">
          <img
            src="/images/orb.webp"
            alt=""
            width={408}
            height={378}
            className="ml-auto mb-14 max-w-[167px] md:mb-0 md:max-w-[230px] xl:mx-auto xl:mt-[270px] lg:max-w-[324px] xxl:mt-[170px] xxl:max-w-[408px] "
          />
        </div>

        <div className="xl:w-2/3">
          <h2 className="mb-3 text-3xl font-sora font-semibold text-grey-40 md:text-4xl lg:text-[42px] lg:leading-[110%]">
            {t('title')} <br /> {t('title2')}
          </h2>
          <p className="font-inter text-grey-30 mb-4 lg:mb-8">
            {t('subtitle')}
          </p>
          <Form
            subject={subject}
            destination={destination}
          />
        </div>
      </div>
    </section>
  );
}
