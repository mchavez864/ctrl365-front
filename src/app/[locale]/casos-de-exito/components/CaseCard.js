import ArrowLeft from '@/svg/arrow-left';

export default function CaseCard({
  brand,
  title,
  description,
  metric,
  metricDescription,
  image,
  ctaLabel = 'Conocer más',
}) {
  return (
    <article className="relative flex h-[420px] flex-col overflow-hidden rounded-[40px] bg-grey-30 text-grey-00 shadow-lg transition-transform duration-500 hover:-translate-y-1 sm:h-[460px] lg:h-[520px]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
      <img
        src={image}
        alt={`Imagen del caso ${brand}`}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-grey-00/15 px-4 py-1 text-xs uppercase tracking-[0.3em]">
            {brand}
          </span>
          <span className="text-xs uppercase tracking-[0.35em] text-orange">
            Resultados
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-orange">
              Caso destacado
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
              {title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-grey-00/85 sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-x-4 gap-y-2 text-grey-00">
            <p className="text-4xl font-semibold sm:text-5xl">{metric}</p>
            <p className="max-w-xs text-sm uppercase tracking-[0.25em] text-grey-00/70 sm:text-base">
              {metricDescription}
            </p>
          </div>

          <button className="inline-flex w-fit items-center gap-2 rounded-full bg-grey-00/15 px-6 py-3 text-sm font-semibold text-grey-00 backdrop-blur transition hover:bg-grey-00/30">
            {ctaLabel}
            <ArrowLeft
              width="16"
              height="12"
              color="currentColor"
              className="-rotate-180"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

