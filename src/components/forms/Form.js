'use client';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/forms/Checkbox';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

export default function Form() {
  const t = useTranslations('Form');

  const goalOptions = useMemo(() => t.raw('goals.options') ?? [], [t]);
  const serviceOptions = useMemo(() => t.raw('services.options') ?? [], [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      company: '',
      role: '',
      phone: '',
      email: '',
      country: '',
      message: '',
      goal: '',
      servicesMob: '',
      services: {},
    },
  });

  const selectedGoal = watch('goal');
  const selectedServiceMob = watch('servicesMob');
  const selectedServices = watch('services');

  const submitHandler = (data) => {
    const hasDesktopServices = Object.values(data.services || {}).includes(
      true
    );
    const hasMobileSelection = Boolean(data.servicesMob);

    if (!hasDesktopServices && !hasMobileSelection) {
      setValue('servicesError', true, { shouldValidate: true });
      return;
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-[48px] bg-grey-00/6 px-8 py-16 text-center">
        <h2 className="text-3xl font-sora font-semibold text-grey-40 md:text-4xl">
          {t('success.title')}
        </h2>
        <p className="mt-4 text-sm font-inter text-grey-30 md:text-base">
          {t('success.subtitle')}
        </p>
        <button
          type="button"
          className="mt-10 text-sm underline decoration-grey-30"
          onClick={() => reset()}
        >
          {t('success.reset')}
        </button>
      </div>
    );
  }

  const renderError = (message) =>
    message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

  return (
    <form
      className="flex flex-col gap-16"
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          placeholder={t('fields.name')}
          {...register('firstName', {
            required: t('errors.required'),
          })}
          hint={errors.firstName?.message}
        />
        <Input
          placeholder={t('fields.lastName')}
          {...register('lastName', {
            required: t('errors.required'),
          })}
          hint={errors.lastName?.message}
        />
        <Input
          placeholder={t('fields.company')}
          {...register('company', {
            required: t('errors.required'),
          })}
          hint={errors.company?.message}
        />
        <Input
          placeholder={t('fields.role')}
          {...register('role', {
            required: t('errors.required'),
          })}
          hint={errors.role?.message}
        />
        <Input
          placeholder={t('fields.phone')}
          {...register('phone', {
            required: t('errors.required'),
          })}
          hint={errors.phone?.message}
        />
        <Input
          placeholder={t('fields.email')}
          type="email"
          {...register('email', {
            required: t('errors.required'),
            pattern: {
              value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
              message: t('errors.email'),
            },
          })}
          hint={errors.email?.message}
        />

        <Input
          placeholder={t('fields.country')}
          wrapperClassName="md:col-span-2"
          {...register('country', {
            required: t('errors.required'),
          })}
          hint={errors.country?.message}
        />
        <div className="md:col-span-2 md:order-4">
          <Textarea
            placeholder={t('fields.message')}
            {...register('message')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="!text-2xl lg:!text-[32px] lg:mb-8">
          {t('goals.title')}
        </h2>
        <div className="lg:hidden">
          <Select
            name="goal"
            placeholder={t('goals.placeholder')}
            options={goalOptions}
            value={selectedGoal}
            onChange={(value) => {
              setValue('goal', value, { shouldValidate: true });
              trigger('goal');
            }}
          />
          {renderError(errors.goal?.message)}
        </div>
        <div className="hidden flex-wrap gap-2 lg:flex">
          {goalOptions.map((option) => (
            <Checkbox
              key={option.value}
              chip
              name={`services.${option.value}`}
              label={option.label}
              checked={!!selectedServices?.[option.value]}
              onChange={(event) => {
                const checked = event.target.checked;
                setValue(`services.${option.value}`, checked, {
                  shouldValidate: true,
                });
              }}
            />
          ))}
        </div>
        {renderError(errors.goal?.message) ||
          renderError(errors.services?.message)}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="!text-2xl lg:!text-[32px] lg:mb-8">
          {t('services.title')}
        </h2>
        <div className="lg:hidden">
          <Select
            name="servicesMob"
            placeholder={t('services.placeholder')}
            options={serviceOptions}
            value={selectedServiceMob}
            onChange={(value) => {
              setValue('servicesMob', value, { shouldValidate: true });
              trigger('servicesMob');
            }}
          />
          {renderError(errors.servicesMob?.message)}
        </div>
        <div className="hidden flex-wrap gap-2 lg:flex">
          {serviceOptions.map((option) => (
            <Checkbox
              key={option.value}
              chip
              name={`services.${option.value}`}
              label={option.label}
              checked={!!selectedServices?.[option.value]}
              onChange={(event) => {
                const checked = event.target.checked;
                setValue(`services.${option.value}`, checked, {
                  shouldValidate: true,
                });
              }}
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
        <p className="mt-16 text-sm font-inter text-grey-30">
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
  );
}
