'use client';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/forms/Checkbox';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SectionForm() {
  const t = useTranslations('Form');

  const goalOptions = t.raw('goals.options') ?? [];
  const serviceOptions = t.raw('services.options') ?? [];

  return (
    <section className="px-4 py-16 md:px-16 xl:py-32 xxl:px-32 bg-grid-white">
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
          <form className="flex flex-col gap-16">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label={t('fields.name')}
                name="firstName"
                autoComplete="given-name"
                required
                defaultValue=""
                placeholder={t('fields.name')}
              />
              <Input
                label={t('fields.lastName')}
                name="lastName"
                autoComplete="family-name"
                required
                placeholder={t('fields.lastName')}
              />
              <Input
                label={t('fields.company')}
                name="company"
                autoComplete="organization"
                required
                defaultValue=""
                placeholder={t('fields.company')}
              />
              <Input
                label={t('fields.role')}
                name="role"
                autoComplete="organization-title"
                required
                defaultValue=""
                placeholder={t('fields.role')}
              />
              <Input
                label={t('fields.phone')}
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                defaultValue=""
                placeholder={t('fields.phone')}
              />
              <Input
                label={t('fields.email')}
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue=""
                placeholder={t('fields.email')}
              />

              <Input
                label={t('fields.country')}
                name="country"
                autoComplete="country"
                required
                defaultValue=""
                wrapperClassName="md:col-span-2"
                placeholder={t('fields.country')}
              />
              <div className="md:col-span-2 md:order-4">
                <Textarea
                  label={t('fields.message')}
                  name="message"
                  rows={5}
                  placeholder={t('fields.message')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="!text-2xl lg:!text-[32px] lg:mb-8">
                ¿Qué estás buscando lograr con Ctrl365?*
              </h2>
              <div className="lg:hidden">
                <Select
                  label={t('goals.label')}
                  name="goals-mobile"
                  placeholder={t('goals.placeholder')}
                  defaultValue=""
                  options={goalOptions}
                />
              </div>
              <div className="hidden flex-wrap gap-2 lg:flex">
                {goalOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    name="goals"
                    value={option.value}
                    label={option.label}
                    chip
                    wrapperClassName="md:w-auto"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="!text-2xl lg:!text-[32px] lg:mb-8">
                ¿Que tipo de servicio buscás?*
              </h2>
              <div className="lg:hidden">
                <Select
                  label={t('services.label')}
                  name="services-mobile"
                  placeholder={t('services.placeholder')}
                  defaultValue=""
                  options={serviceOptions}
                />
              </div>
              <div className="hidden flex-wrap gap-2 lg:flex">
                {serviceOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    name="services"
                    value={option.value}
                    label={option.label}
                    chip
                    wrapperClassName="md:w-auto"
                  />
                ))}
              </div>
            </div>

            <div>
              <Button
                copy={t('submit')}
                type="submit"
                className="w-full md:w-auto"
              />
              <p className="mt-16 font-inter">
                {t('policy')}
                <Link
                  href={t('policyLink')}
                  className="underline"
                >
                  {t('policy2')}
                </Link>
                {t('policy3')}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
