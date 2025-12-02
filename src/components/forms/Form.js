'use client';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/forms/Checkbox';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import CountrySelect from '@/components/forms/CountrySelect';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';

// Lista de dominios de email públicos/genéricos bloqueados
const BLOCKED_EMAIL_DOMAINS = [
  // Google
  'gmail.com',
  'googlemail.com',
  // Microsoft
  'hotmail.com',
  'hotmail.es',
  'hotmail.co.uk',
  'hotmail.fr',
  'hotmail.de',
  'hotmail.it',
  'outlook.com',
  'outlook.es',
  'outlook.co.uk',
  'outlook.fr',
  'outlook.de',
  'live.com',
  'live.es',
  'live.co.uk',
  'live.fr',
  'msn.com',
  // Yahoo
  'yahoo.com',
  'yahoo.es',
  'yahoo.co.uk',
  'yahoo.fr',
  'yahoo.de',
  'yahoo.it',
  'yahoo.com.ar',
  'yahoo.com.mx',
  'yahoo.com.br',
  'ymail.com',
  'rocketmail.com',
  // Apple
  'icloud.com',
  'me.com',
  'mac.com',
  // AOL
  'aol.com',
  'aim.com',
  // Proton
  'protonmail.com',
  'proton.me',
  'pm.me',
  // Zoho (personal)
  'zohomail.com',
  // Otros populares
  'mail.com',
  'email.com',
  'usa.com',
  'gmx.com',
  'gmx.net',
  'gmx.de',
  'gmx.es',
  'yandex.com',
  'yandex.ru',
  'mail.ru',
  'inbox.ru',
  'list.ru',
  'bk.ru',
  'tutanota.com',
  'tutanota.de',
  'tuta.io',
  'fastmail.com',
  'fastmail.fm',
  // Latam específicos
  'terra.com',
  'terra.com.ar',
  'terra.com.br',
  'terra.com.mx',
  'uol.com.br',
  'bol.com.br',
  'speedy.com.ar',
  'fibertel.com.ar',
  'arnet.com.ar',
  'ciudad.com.ar',
  'fullzero.com.ar',
  // Temporales/desechables comunes
  'tempmail.com',
  'guerrillamail.com',
  'mailinator.com',
  '10minutemail.com',
  'throwaway.email',
];
import { useEffect, useMemo, useRef, useState } from 'react';
import { sendContactEmail } from '@/actions/sendContactEmail';

// Función para validar email corporativo
const isPersonalEmail = (email) => {
  if (!email) return false;
  const domain = email.toLowerCase().split('@')[1];
  return BLOCKED_EMAIL_DOMAINS.includes(domain);
};

export default function Form({ subject, destination } = {}) {
  const t = useTranslations('Form');
  const locale = useLocale();

  const goalOptions = useMemo(() => t.raw('goals.options') ?? [], [t]);
  const serviceOptions = useMemo(() => t.raw('services.options') ?? [], [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: false,
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
      goalDesktop: {},
      servicesMob: '',
      services: {},
    },
  });

  useEffect(() => {
    register('goalDesktop');
    register('services');
    register('goal', {
      validate: () =>
        Boolean(getValues('goal')) ||
        Object.values(getValues('goalDesktop') || {}).some(Boolean) ||
        t('goals.required'),
    });
    register('servicesMob', {
      validate: () =>
        Boolean(getValues('servicesMob')) ||
        Object.values(getValues('services') || {}).some(Boolean) ||
        t('services.required'),
    });
    register('services', {
      validate: () =>
        Object.values(getValues('services') || {}).some(Boolean) ||
        Boolean(getValues('servicesMob')) ||
        t('services.required'),
    });
  }, [register, getValues, t]);

  const selectedGoal = watch('goal');
  const selectedGoalDesktop = watch('goalDesktop');
  const selectedServiceMob = watch('servicesMob');
  const selectedServices = watch('services');

  const [serverState, setServerState] = useState('idle');
  const [serverError, setServerError] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (serverState === 'success' && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [serverState]);

  const collectLabels = (values, options) =>
    values.map(
      (value) =>
        options.find((option) => option.value === value)?.label || value
    );

  const submitHandler = async (data) => {
    setServerError('');

    const goalValues = new Set();
    if (data.goal) {
      goalValues.add(data.goal);
    }
    Object.entries(data.goalDesktop || {}).forEach(([key, checked]) => {
      if (checked) goalValues.add(key);
    });

    const serviceValues = new Set();
    if (data.servicesMob) {
      serviceValues.add(data.servicesMob);
    }
    Object.entries(data.services || {}).forEach(([key, checked]) => {
      if (checked) serviceValues.add(key);
    });

    const goalsValid = goalValues.size > 0;
    const servicesValid = serviceValues.size > 0;

    if (!goalsValid) {
      await trigger('goal');
    }
    if (!servicesValid) {
      await trigger(['services', 'servicesMob']);
    }
    if (!goalsValid || !servicesValid) {
      setServerState('idle');
      return;
    }

    const goalLabels = collectLabels([...goalValues], goalOptions);
    const serviceLabels = collectLabels([...serviceValues], serviceOptions);

    const payload = {
      Nombre: data.firstName,
      Apellido: data.lastName,
      Empresa: data.company,
      'Puesto de trabajo': data.role,
      Teléfono: data.phone,
      Email: data.email,
      País: data.country,
      Objetivos: goalLabels.join(', '),
      Servicios: serviceLabels.join(', '),
      Consulta: data.message || '—',
    };

    try {
      setServerState('loading');
      await sendContactEmail({
        subject,
        to: destination,
        fields: payload,
      });

      setServerState('success');
      reset({
        firstName: '',
        lastName: '',
        company: '',
        role: '',
        phone: '',
        email: '',
        country: '',
        message: '',
        goal: '',
        goalDesktop: {},
        servicesMob: '',
        services: {},
      });
    } catch (error) {
      console.error(error);
      setServerError(t('errors.server'));
      setServerState('error');
    }
  };

  const renderError = (message) =>
    message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

  if (serverState === 'success') {
    return (
      <div
        ref={containerRef}
        className="rounded-[48px] bg-grey-00/6 px-8 py-16 text-center min-h-[500px]"
      >
        <h2 className="text-3xl font-sora font-semibold text-grey-40 md:text-4xl">
          {t('success.title')}
        </h2>
        <p className="mt-4 text-sm font-inter text-grey-30 md:text-base">
          {t('success.subtitle')}
        </p>
        <button
          type="button"
          className="mt-10 text-sm underline decoration-grey-30"
          onClick={() => {
            reset({
              firstName: '',
              lastName: '',
              company: '',
              role: '',
              phone: '',
              email: '',
              country: '',
              message: '',
              goal: '',
              goalDesktop: {},
              servicesMob: '',
              services: {},
            });
            setServerState('idle');
          }}
        >
          {t('success.reset')}
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <form
        className="flex flex-col gap-16"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            placeholder={t('fields.name')}
            maxLength={25}
            limitHint={t('errors.maxChars')}
            {...register('firstName', {
              required: t('errors.required'),
              minLength: {
                value: 3,
                message: t('errors.minChars'),
              },
              maxLength: {
                value: 25,
                message: t('errors.maxChars'),
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/,
                message: t('errors.onlyLetters'),
              },
            })}
            hint={errors.firstName?.message}
          />
          <Input
            placeholder={t('fields.lastName')}
            maxLength={25}
            limitHint={t('errors.maxChars')}
            {...register('lastName', {
              required: t('errors.required'),
              minLength: {
                value: 3,
                message: t('errors.minChars'),
              },
              maxLength: {
                value: 25,
                message: t('errors.maxChars'),
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/,
                message: t('errors.onlyLetters'),
              },
            })}
            hint={errors.lastName?.message}
          />
          <Input
            placeholder={t('fields.company')}
            maxLength={30}
            limitHint={t('errors.maxCharsCompany')}
            {...register('company', {
              required: t('errors.required'),
              minLength: {
                value: 3,
                message: t('errors.minChars'),
              },
              maxLength: {
                value: 30,
                message: t('errors.maxCharsCompany'),
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-zÁÉÍÓÚáéíóúÜüÑñ])[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9\s&.,'"-]+$/,
                message: t('errors.alphaNumeric'),
              },
            })}
            hint={errors.company?.message}
          />
          <Input
            placeholder={t('fields.role')}
            maxLength={25}
            limitHint={t('errors.maxChars')}
            {...register('role', {
              required: t('errors.required'),
              minLength: {
                value: 3,
                message: t('errors.minChars'),
              },
              maxLength: {
                value: 25,
                message: t('errors.maxChars'),
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/,
                message: t('errors.onlyLetters'),
              },
            })}
            hint={errors.role?.message}
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
              validate: (value) =>
                !isPersonalEmail(value) || t('errors.corporateEmail'),
            })}
            hint={errors.email?.message}
          />
          <Input
            placeholder={t('fields.phone')}
            maxLength={12}
            limitHint={t('errors.maxDigits')}
            {...register('phone', {
              required: t('errors.required'),
              pattern: {
                value: /^[0-9]+$/,
                message: t('errors.onlyNumbers'),
              },
              minLength: {
                value: 6,
                message: t('errors.minDigits'),
              },
              maxLength: {
                value: 12,
                message: t('errors.maxDigits'),
              },
            })}
            hint={errors.phone?.message}
          />

          <CountrySelect
            placeholder={t('fields.country')}
            wrapperClassName="md:col-span-2"
            name="country"
            locale={locale}
            value={watch('country')}
            onChange={(value) => {
              setValue('country', value, { shouldValidate: true });
            }}
            hint={errors.country?.message}
          />
          <input
            type="hidden"
            {...register('country', {
              required: t('errors.required'),
            })}
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
                name={`goalDesktop.${option.value}`}
                label={option.label}
                checked={!!selectedGoalDesktop?.[option.value]}
                onChange={(event) => {
                  const checked = event.target.checked;
                  const updated = {
                    ...(selectedGoalDesktop || {}),
                    [option.value]: checked,
                  };
                  setValue('goalDesktop', updated, { shouldValidate: true });
                  trigger('goal');
                }}
              />
            ))}
          </div>
          {renderError(errors.goal?.message)}
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
                trigger(['services', 'servicesMob']);
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
                  const updated = {
                    ...(selectedServices || {}),
                    [option.value]: checked,
                  };
                  setValue('services', updated, { shouldValidate: true });
                  trigger(['services', 'servicesMob']);
                }}
              />
            ))}
          </div>
          {renderError(errors.services?.message)}
        </div>

        <div>
          <Button
            copy={isSubmitting ? t('sending') : t('submit')}
            type="submit"
            className="w-full md:w-auto"
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
          {serverError && (
            <p className="mt-4 text-sm text-red-500">{serverError}</p>
          )}
          <p className="mt-16 text-sm font-inter text-grey-30">
            {t('policy')}
            <Link
              href={t('policyLink')}
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('policy2')}
            </Link>
            {t('policy3')}
          </p>
        </div>
      </form>
    </div>
  );
}
